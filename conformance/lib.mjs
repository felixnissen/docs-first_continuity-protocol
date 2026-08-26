import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const REQUIREMENTS = [
  ["C-01", "Known entry point", "validator"],
  ["C-02", "One owner per semantic truth", "review-ritual"],
  ["C-03", "Reality, direction, and history are distinct", "review-ritual"],
  ["C-04", "One active task per branch", "validator"],
  ["C-05", "Minimum task charter", "validator"],
  ["C-06", "Charter freeze at Ready", "git-history"],
  ["C-07", "Discoveries are routed, not absorbed silently", "review-ritual"],
  ["C-08", "Durable pause and handoff", "validator"],
  ["C-09", "Task state is explicit", "validator"],
  ["C-10", "Documentation changes with the work", "review-ritual"],
  ["C-11", "Completion restores resumable state", "validator+git-history"],
  ["C-12", "Verification gaps are explicit", "validator+review-ritual"],
  ["C-13", "Undecided material has a named home", "validator"],
  ["C-14", "Non-authority material cannot override truth", "validator+review-ritual"],
  ["C-15", "Repository-only resumption", "review-ritual"],
  ["C-16", "Stable cited records", "validator+git-history"],
  ["C-17", "Collections are discoverable", "validator"],
  ["C-18", "Task identities are collision-resistant and status-free", "validator+git-history"]
].map(([id, title, checkingMeans]) => ({ id, title, checkingMeans }));

const LEVELS = {
  1: REQUIREMENTS.slice(0, 5).map((item) => item.id),
  2: REQUIREMENTS.slice(0, 12).map((item) => item.id),
  3: REQUIREMENTS.map((item) => item.id)
};

const ACTIVE_STATES = new Set(["Ready", "In Progress", "Paused"]);
const VALID_STATES = new Set([
  "Draft",
  "Ready",
  "In Progress",
  "Paused",
  "Complete",
  "Cancelled",
  "Superseded"
]);

function normalizePath(path) {
  return path.replaceAll("\\", "/").replace(/^\.\//, "");
}

function absolute(root, path) {
  return resolve(root, path);
}

function fileExists(root, path) {
  try {
    return statSync(absolute(root, path)).isFile();
  } catch {
    return false;
  }
}

function directoryExists(root, path) {
  try {
    return statSync(absolute(root, path)).isDirectory();
  } catch {
    return false;
  }
}

function read(root, path) {
  return readFileSync(absolute(root, path), "utf8");
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function lineValue(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.match(new RegExp(`^${escaped}:\\s*(.*)$`, "mi"))?.[1]?.trim() ?? "";
}

function listValue(text, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.match(new RegExp(`^\\s*-\\s*${escaped}:\\s*(.*)$`, "mi"))?.[1]?.trim() ?? "";
}

function hasHeading(text, title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^#{2,4}\\s+${escaped}\\s*$`, "mi").test(text);
}

function result(id, status, summary, evidence = []) {
  const requirement = REQUIREMENTS.find((item) => item.id === id);
  return {
    id,
    title: requirement.title,
    checkingMeans: requirement.checkingMeans,
    status,
    summary,
    evidence
  };
}

function manual(id, summary, evidence = []) {
  return result(id, "manual", summary, evidence);
}

function applyExternalEvidence(item, externalEvidence) {
  if (item.status !== "manual") return item;
  const supplied = externalEvidence?.[item.id];
  if (!supplied) return item;
  if (!['pass', 'fail'].includes(supplied.status)) return item;
  return {
    ...item,
    status: supplied.status,
    summary: supplied.note || item.summary,
    evidence: [
      ...item.evidence,
      {
        kind: "external-evidence",
        reviewer: supplied.reviewer ?? null,
        at: supplied.at ?? null,
        reference: supplied.reference ?? null
      }
    ]
  };
}

function validateConfig(config) {
  const requiredStrings = ["entryPoint", "activeTask", "taskRegister", "finishedTasks", "nonAuthority"];
  if (config.schemaVersion !== 1) throw new Error("continuity config schemaVersion must be 1");
  for (const key of requiredStrings) {
    if (typeof config[key] !== "string" || !config[key].trim()) {
      throw new Error(`continuity config '${key}' must be a non-empty string`);
    }
  }
  if (!Array.isArray(config.readOrder) || config.readOrder.some((item) => typeof item !== "string")) {
    throw new Error("continuity config 'readOrder' must be an array of paths");
  }
  if (!Array.isArray(config.collections) || config.collections.some((item) => typeof item !== "string")) {
    throw new Error("continuity config 'collections' must be an array of paths");
  }
  if (typeof config.taskIdPattern !== "string") {
    throw new Error("continuity config 'taskIdPattern' must be a regex string with the numeric sequence in capture group 1");
  }
  return config;
}

function ignoredPrefixes(config) {
  return [
    ...(config.ignore ?? []),
    config.finishedTasks,
    config.nonAuthority,
    ...(config.collections ?? []).filter((path) => /\/(backlog|paused|adr)$/.test(normalizePath(path)))
  ].map((path) => `${normalizePath(path).replace(/\/$/, "")}/`);
}

function walkMarkdown(root, config) {
  const files = [];
  const ignored = ignoredPrefixes(config);
  const visit = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      const rel = normalizePath(relative(root, full));
      if (ignored.some((prefix) => `${rel}/`.startsWith(prefix))) continue;
      if (entry.isDirectory()) visit(full);
      else if (entry.isFile() && entry.name.endsWith(".md")) files.push(rel);
    }
  };
  visit(root);
  return files;
}

function validateC01(root, config) {
  if (!fileExists(root, config.entryPoint)) {
    return result("C-01", "fail", `Entry point does not exist: ${config.entryPoint}`);
  }
  const entry = read(root, config.entryPoint);
  let cursor = -1;
  const missing = [];
  const outOfOrder = [];
  for (const path of config.readOrder) {
    if (!fileExists(root, path)) missing.push(path);
    const index = entry.indexOf(path);
    if (index < 0) missing.push(`${path} (not named by entry point)`);
    else if (index < cursor) outOfOrder.push(path);
    else cursor = index;
  }
  if (missing.length || outOfOrder.length) {
    return result("C-01", "fail", "Entry point/read order is incomplete or ambiguous", [
      { kind: "missing", paths: [...new Set(missing)] },
      { kind: "out-of-order", paths: outOfOrder }
    ]);
  }
  return result("C-01", "pass", `Entry point ${config.entryPoint} names the configured minimum read order`, [
    { kind: "entry-point", path: config.entryPoint },
    { kind: "read-order", paths: config.readOrder }
  ]);
}

function validateC02C03(root, config) {
  const authorities = config.authorities ?? {};
  const entries = Object.entries(authorities).filter(([, path]) => typeof path === "string");
  const missing = entries.filter(([, path]) => !fileExists(root, path));
  const paths = entries.map(([, path]) => normalizePath(path));
  const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);

  const c02 = missing.length || duplicates.length
    ? result("C-02", "fail", "Declared semantic authorities are missing or share the same path", [
        { kind: "missing-authorities", entries: missing },
        { kind: "duplicate-authority-paths", paths: [...new Set(duplicates)] }
      ])
    : manual(
        "C-02",
        "Distinct configured authority files exist; review must still confirm that mutable semantic truth is not duplicated elsewhere",
        [{ kind: "declared-authorities", authorities }]
      );

  const trio = [authorities.currentReality, authorities.approvedDirection, authorities.history].filter(Boolean);
  const trioMissing = trio.filter((path) => !fileExists(root, path));
  const trioDistinct = new Set(trio.map(normalizePath)).size === trio.length && trio.length === 3;
  const c03 = trioMissing.length || !trioDistinct
    ? result("C-03", "fail", "Current reality, approved direction and history are not three distinct existing authorities", [
        { kind: "paths", paths: trio },
        { kind: "missing", paths: trioMissing }
      ])
    : manual(
        "C-03",
        "Current reality, approved direction and history map to distinct files; semantic role separation still requires review",
        [{ kind: "paths", paths: trio }]
      );
  return [c02, c03];
}

function activeTask(root, config) {
  if (!fileExists(root, config.activeTask)) return { exists: false, text: "", id: "", status: "" };
  const text = read(root, config.activeTask);
  return {
    exists: true,
    text,
    id: lineValue(text, "Task ID"),
    status: lineValue(text, "Status")
  };
}

function validateC04(root, config) {
  const active = [];
  for (const path of walkMarkdown(root, config)) {
    const text = read(root, path);
    const id = lineValue(text, "Task ID");
    const status = lineValue(text, "Status");
    if (id && ACTIVE_STATES.has(status)) active.push({ path, id, status });
  }
  if (active.length > 1) {
    return result("C-04", "fail", `Found ${active.length} active task charters on this branch`, [
      { kind: "active-tasks", tasks: active }
    ]);
  }
  return result("C-04", "pass", active.length ? `One active task found: ${active[0].id}` : "No conflicting active task charters found", [
    { kind: "active-tasks", tasks: active }
  ]);
}

function validateC05(root, config, task) {
  if (!task.exists) return result("C-05", "fail", `Active task authority is missing: ${config.activeTask}`);
  if (!ACTIVE_STATES.has(task.status) && task.status !== "Complete") {
    return result("C-05", "pass", `Task state '${task.status || "empty"}' has not crossed the Ready precondition`);
  }
  const required = [
    "Goal",
    "Primary Deliverable",
    "In Scope",
    "Out of Scope",
    "Definition of Done",
    "Minimum Verification Gates"
  ];
  const missing = required.filter((heading) => !hasHeading(task.text, heading));
  if (missing.length) {
    return result("C-05", "fail", "Ready-or-later task charter is missing required sections", [
      { kind: "missing-headings", headings: missing },
      { kind: "task", path: config.activeTask, id: task.id, status: task.status }
    ]);
  }
  return result("C-05", "pass", "Ready-or-later task charter contains all minimum charter sections", [
    { kind: "task", path: config.activeTask, id: task.id, status: task.status }
  ]);
}

function validateC06(task) {
  if (!ACTIVE_STATES.has(task.status) && task.status !== "Complete") {
    return result("C-06", "pass", "No frozen active charter is present; freeze obligation is not currently triggered");
  }
  return manual(
    "C-06",
    "A frozen charter is present; git-history evidence must confirm Goal/Deliverable/Scope/DoD were not silently redefined after Ready"
  );
}

function validateC08(task) {
  if (task.status !== "Paused") return result("C-08", "pass", "Active task is not paused; pause/handoff fields are not currently required");
  const required = {
    blockers: listValue(task.text, "Blockers"),
    next: listValue(task.text, "Next recommended step"),
    resume: listValue(task.text, "Resume condition")
  };
  const missing = Object.entries(required).filter(([, value]) => !value).map(([key]) => key);
  const hasVerification = hasHeading(task.text, "Verification") && /\[[ xX]\]|skipp|gap/i.test(task.text);
  if (missing.length || !hasVerification) {
    return result("C-08", "fail", "Paused task does not contain a complete durable handoff", [
      { kind: "missing-handoff-fields", fields: missing },
      { kind: "verification-gap-evidence", present: hasVerification }
    ]);
  }
  return result("C-08", "pass", "Paused task records blocker, next step, resume condition and verification information");
}

function validateC09(root, config, task) {
  if (!task.exists) return result("C-09", "fail", `Active task authority is missing: ${config.activeTask}`);
  if (!task.status || !VALID_STATES.has(task.status)) {
    return result("C-09", "fail", `Task lifecycle state is missing or unknown: '${task.status || "<empty>"}'`);
  }
  return result("C-09", "pass", `Task lifecycle state is explicit in content: ${task.status}`, [
    { kind: "task-state", path: config.activeTask, status: task.status }
  ]);
}

function validateC11(root, config, task) {
  if (task.status !== "Complete") {
    return result("C-11", "pass", "Active task surface is not carrying a completed task that should have been restored/advanced");
  }
  const archiveEvidence = [];
  if (task.id && directoryExists(root, config.finishedTasks)) {
    for (const name of readdirSync(absolute(root, config.finishedTasks))) {
      if (!name.endsWith(".md") || name === "README.md") continue;
      const path = normalizePath(join(config.finishedTasks, name));
      if (read(root, path).includes(`Task ID: ${task.id}`)) archiveEvidence.push(path);
    }
  }
  return result(
    "C-11",
    "fail",
    "A completed task still occupies the active-task authority; archive it and restore a clean/next active state",
    [{ kind: "matching-archives", paths: archiveEvidence }]
  );
}

function validateC12(task) {
  if (!ACTIVE_STATES.has(task.status) && task.status !== "Complete") {
    return result("C-12", "pass", "No active Ready-or-later task currently requires verification accounting");
  }
  const hasVerification = hasHeading(task.text, "Verification");
  const hasChecksOrGap = /\[[ xX]\]|skipp|could not|not run|gap/i.test(task.text);
  if (!hasVerification || !hasChecksOrGap) {
    return result("C-12", "fail", "Active task lacks explicit verification checks/gaps");
  }
  return manual(
    "C-12",
    "Verification accounting is present; review must confirm that performed/skipped checks are adequate and truthful"
  );
}

function validateC13C14(root, config) {
  const readme = normalizePath(join(config.nonAuthority, "README.md"));
  if (!directoryExists(root, config.nonAuthority) || !fileExists(root, readme)) {
    return [
      result("C-13", "fail", `Configured non-authority home or README is missing: ${config.nonAuthority}`),
      result("C-14", "fail", "Non-authority boundary cannot be verified because its declaration is missing")
    ];
  }
  const text = read(root, readme);
  const boundary = /never\s+authorit|non[- ]authorit|not\s+authorit|must\s+not\s+(?:be\s+)?cite|no\s+task\s+may\s+cite/i.test(text);
  return [
    result("C-13", "pass", `Named non-authority home exists: ${config.nonAuthority}`, [{ kind: "readme", path: readme }]),
    boundary
      ? manual(
          "C-14",
          "Non-authority boundary is explicitly declared; review must still confirm active work does not misuse citations from it",
          [{ kind: "readme", path: readme }]
        )
      : result("C-14", "fail", `Non-authority README does not clearly declare that its material cannot override project truth`, [
          { kind: "readme", path: readme }
        ])
  ];
}

function validateC17(root, config) {
  const problems = [];
  const evidence = [];
  for (const collection of config.collections) {
    const readme = normalizePath(join(collection, "README.md"));
    if (!directoryExists(root, collection)) {
      problems.push(`${collection}: directory missing`);
      continue;
    }
    if (!fileExists(root, readme)) {
      problems.push(`${collection}: README.md missing`);
      continue;
    }
    const text = read(root, readme);
    const declaration = text.match(/^Discoverability:\s*(.+)$/mi)?.[1]?.trim() ?? "";
    if (!declaration || !/(index|naming convention)/i.test(declaration)) {
      problems.push(`${collection}: Discoverability declaration missing/unsupported`);
    } else {
      evidence.push({ collection, declaration });
    }
  }
  if (problems.length) return result("C-17", "fail", "One or more durable collections are not discoverable by declared mode", [
    { kind: "problems", items: problems },
    { kind: "collections", items: evidence }
  ]);
  return result("C-17", "pass", "Every configured durable collection declares index or naming-convention discoverability", [
    { kind: "collections", items: evidence }
  ]);
}

function markdownTable(text, headerName) {
  const lines = text.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) => line.trim().startsWith("|") && line.toLowerCase().includes(headerName.toLowerCase()));
  if (headerIndex < 0 || headerIndex + 1 >= lines.length) return null;
  const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
  const headers = cells(lines[headerIndex]);
  const rows = [];
  for (let i = headerIndex + 2; i < lines.length; i++) {
    if (!lines[i].trim().startsWith("|")) break;
    const values = cells(lines[i]);
    if (values.length !== headers.length) continue;
    rows.push(Object.fromEntries(headers.map((header, index) => [header, values[index]])));
  }
  return { headers, rows };
}

function validateC18(root, config) {
  if (!fileExists(root, config.taskRegister)) {
    return result("C-18", "fail", `Task identity register is missing: ${config.taskRegister}`);
  }
  const table = markdownTable(read(root, config.taskRegister), "Task ID");
  if (!table) return result("C-18", "fail", "Task identity register does not contain a parseable Task ID table");
  const statusColumns = table.headers.filter((header) => /^(status|work|state|progress|lifecycle)$/i.test(header.trim()));
  const taskHeader = table.headers.find((header) => /^task id$/i.test(header.trim()));
  if (!taskHeader) return result("C-18", "fail", "Task register table lacks a Task ID column");

  let pattern;
  try {
    pattern = new RegExp(config.taskIdPattern);
  } catch (error) {
    throw new Error(`Invalid taskIdPattern: ${error.message}`);
  }
  const ids = [];
  const invalid = [];
  for (const row of table.rows) {
    const id = row[taskHeader];
    const match = id.match(pattern);
    if (!match || match[1] === undefined || !Number.isSafeInteger(Number(match[1]))) invalid.push(id);
    else ids.push({ id, sequence: Number(match[1]) });
  }
  const duplicateIds = ids.map((item) => item.id).filter((id, index, all) => all.indexOf(id) !== index);
  const notAscending = ids.filter((item, index) => index > 0 && item.sequence <= ids[index - 1].sequence);
  if (statusColumns.length || invalid.length || duplicateIds.length || notAscending.length) {
    return result("C-18", "fail", "Task register violates status-free, unique, parseable, strictly ascending identity allocation", [
      { kind: "status-columns", columns: statusColumns },
      { kind: "invalid-ids", ids: invalid },
      { kind: "duplicate-ids", ids: [...new Set(duplicateIds)] },
      { kind: "not-ascending", ids: notAscending.map((item) => item.id) }
    ]);
  }
  return manual(
    "C-18",
    "Register is status-free, unique and strictly ascending; git-history evidence must still prove shared-identity claim before Ready",
    [{ kind: "task-ids", ids: ids.map((item) => item.id) }]
  );
}

function gitRevision(root) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

function specDigest(root) {
  const path = absolute(root, "SPEC.md");
  if (!existsSync(path)) return null;
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function calculateLevels(results) {
  const byId = new Map(results.map((item) => [item.id, item]));
  const levels = {};
  let highestClaimableLevel = 0;
  for (const level of [1, 2, 3]) {
    const requirements = LEVELS[level];
    const blocking = requirements.filter((id) => byId.get(id)?.status !== "pass");
    const claimable = blocking.length === 0;
    levels[level] = { requirements, claimable, blocking };
    if (claimable) highestClaimableLevel = level;
  }
  return { levels, highestClaimableLevel };
}

export function loadConfig(root, configPath) {
  const path = configPath ? resolve(root, configPath) : resolve(root, "continuity.config.json");
  if (!existsSync(path)) throw new Error(`Continuity config not found: ${path}`);
  return validateConfig(readJson(path));
}

export function loadEvidence(root, evidencePath) {
  if (!evidencePath) return {};
  const path = resolve(root, evidencePath);
  if (!existsSync(path)) throw new Error(`Evidence file not found: ${path}`);
  const parsed = readJson(path);
  return parsed.requirements ?? parsed;
}

export function validateRepository(rootInput = ".", options = {}) {
  const root = resolve(rootInput);
  const config = options.config ?? loadConfig(root, options.configPath);
  const externalEvidence = options.evidence ?? loadEvidence(root, options.evidencePath);
  const task = activeTask(root, config);

  const raw = [];
  raw.push(validateC01(root, config));
  raw.push(...validateC02C03(root, config));
  raw.push(validateC04(root, config));
  raw.push(validateC05(root, config, task));
  raw.push(validateC06(task));
  raw.push(manual("C-07", "Routing discovered work is a semantic workflow obligation and requires recorded review evidence"));
  raw.push(validateC08(task));
  raw.push(validateC09(root, config, task));
  raw.push(manual("C-10", "Same-change documentation ownership requires review of the actual work/change set"));
  raw.push(validateC11(root, config, task));
  raw.push(validateC12(task));
  raw.push(...validateC13C14(root, config));
  raw.push(manual("C-15", "Repository-only resumption requires a named resumption review by an actor without prior private context"));
  raw.push(manual("C-16", "Stable cited records require present-state checks plus git-history evidence for renames/moves and tense-aware citations"));
  raw.push(validateC17(root, config));
  raw.push(validateC18(root, config));

  const results = raw.map((item) => applyExternalEvidence(item, externalEvidence));
  const failed = results.filter((item) => item.status === "fail").map((item) => item.id);
  const manualOutstanding = results.filter((item) => item.status === "manual").map((item) => item.id);
  const levelData = calculateLevels(results);

  return {
    reportVersion: 1,
    protocol: "Docs-First Continuity Protocol",
    specDigestSha256: specDigest(root),
    repositoryRevision: gitRevision(root),
    project: config.project ?? null,
    configSchemaVersion: config.schemaVersion,
    results,
    failed,
    manualOutstanding,
    ...levelData
  };
}

export function formatTextReport(report) {
  const lines = [];
  lines.push(`Docs-First Continuity Protocol conformance report`);
  lines.push(`Project: ${report.project ?? "(unnamed)"}`);
  lines.push(`Revision: ${report.repositoryRevision ?? "unknown"}`);
  lines.push(`Spec SHA-256: ${report.specDigestSha256 ?? "unknown"}`);
  lines.push("");
  for (const item of report.results) {
    lines.push(`${item.status.toUpperCase().padEnd(6)} ${item.id}  ${item.title}`);
    lines.push(`       ${item.summary}`);
  }
  lines.push("");
  for (const level of [1, 2, 3]) {
    const info = report.levels[level];
    lines.push(`Level ${level}: ${info.claimable ? "CLAIMABLE" : `blocked by ${info.blocking.join(", ")}`}`);
  }
  lines.push(`Highest claimable level: ${report.highestClaimableLevel || "none"}`);
  if (report.failed.length) lines.push(`Mechanical failures: ${report.failed.join(", ")}`);
  if (report.manualOutstanding.length) lines.push(`Evidence still required: ${report.manualOutstanding.join(", ")}`);
  return `${lines.join("\n")}\n`;
}

export { REQUIREMENTS, LEVELS };
