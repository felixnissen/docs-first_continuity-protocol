#!/usr/bin/env node
import { formatTextReport, validateRepository } from "./lib.mjs";

function usage() {
  return `Usage: node conformance/cli.mjs [root] [options]

Options:
  --config <path>        Semantic-role config relative to root (default: continuity.config.json)
  --evidence <path>      External review/git-history evidence JSON relative to root
  --format <text|json>   Output format (default: text)
  --require-level <1|2|3>
                         Exit non-zero unless the requested level is fully claimable
  --help                 Show this help
`;
}

function parseArgs(argv) {
  let root = ".";
  let rootSet = false;
  const options = { format: "text" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--config") options.configPath = argv[++i];
    else if (arg === "--evidence") options.evidencePath = argv[++i];
    else if (arg === "--format") options.format = argv[++i];
    else if (arg === "--require-level") options.requireLevel = Number(argv[++i]);
    else if (arg.startsWith("--")) throw new Error(`Unknown option: ${arg}`);
    else if (!rootSet) {
      root = arg;
      rootSet = true;
    } else throw new Error(`Unexpected positional argument: ${arg}`);
  }
  if (!["text", "json"].includes(options.format)) throw new Error("--format must be text or json");
  if (options.requireLevel !== undefined && ![1, 2, 3].includes(options.requireLevel)) {
    throw new Error("--require-level must be 1, 2, or 3");
  }
  if ((options.configPath === undefined && argv.includes("--config")) ||
      (options.evidencePath === undefined && argv.includes("--evidence"))) {
    throw new Error("Missing value for path option");
  }
  return { root, options, help: false };
}

try {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.help) {
    process.stdout.write(usage());
    process.exitCode = 0;
  } else {
    const report = validateRepository(parsed.root, parsed.options);
    if (parsed.options.format === "json") process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    else process.stdout.write(formatTextReport(report));

    if (report.failed.length > 0) process.exitCode = 1;
    if (parsed.options.requireLevel && !report.levels[parsed.options.requireLevel].claimable) {
      process.exitCode = 2;
    }
  }
} catch (error) {
  process.stderr.write(`conformance validator error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 64;
}
