import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { validateRepository } from "../lib.mjs";

function write(root, path, content) {
  const full = join(root, path);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, content, "utf8");
}

function validFixture() {
  const root = mkdtempSync(join(tmpdir(), "dfc-validator-"));
  const config = {
    schemaVersion: 1,
    project: "fixture",
    entryPoint: "AGENTS.md",
    readOrder: ["docs/CURRENT_TASK.md", "docs/CURRENT_STATUS.md", "docs/JOURNAL.md"],
    activeTask: "docs/CURRENT_TASK.md",
    taskRegister: "docs/TASK_IDS.md",
    finishedTasks: "docs/finished",
    nonAuthority: "docs/concepts",
    authorities: {
      currentReality: "docs/CURRENT_STATUS.md",
      approvedDirection: "docs/BRIEF.md",
      history: "docs/JOURNAL.md",
      system: "docs/SYSTEM.md"
    },
    collections: ["docs/finished", "docs/concepts"],
    taskIdPattern: "^T-(\\d{4})$",
    ignore: []
  };

  write(root, "SPEC.md", "# Fixture spec\n");
  write(root, "AGENTS.md", "Read in order:\n1. docs/CURRENT_TASK.md\n2. docs/CURRENT_STATUS.md\n3. docs/JOURNAL.md\n");
  write(root, "docs/CURRENT_TASK.md", "# Current Task\n\nTask ID:\nStatus: Draft\n");
  write(root, "docs/CURRENT_STATUS.md", "# Current Status\n");
  write(root, "docs/BRIEF.md", "# Brief\n");
  write(root, "docs/JOURNAL.md", "# Journal\n");
  write(root, "docs/SYSTEM.md", "# System\n");
  write(root, "docs/TASK_IDS.md", "# Task IDs\n\n| Task ID | Title | Owner | Claimed |\n| --- | --- | --- | --- |\n| T-0001 | first | a | 2026-01-01 |\n| T-0002 | second | b | 2026-01-02 |\n");
  write(root, "docs/finished/README.md", "# Finished\n\nDiscoverability: naming convention `T-NNNN_slug.md`.\n");
  write(root, "docs/concepts/README.md", "# Concepts\n\nDiscoverability: index.\n\nThis directory is non-authoritative and must not be cited as approved truth.\n");
  return { root, config };
}

function byId(report, id) {
  return report.results.find((item) => item.id === id);
}

function withFixture(fn) {
  const fixture = validFixture();
  try {
    return fn(fixture);
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
}

test("valid structural fixture has no mechanical failures", () =>
  withFixture(({ root, config }) => {
    const report = validateRepository(root, { config });
    assert.deepEqual(report.failed, []);
    assert.equal(byId(report, "C-01").status, "pass");
    assert.equal(byId(report, "C-04").status, "pass");
    assert.equal(byId(report, "C-05").status, "pass");
    assert.equal(byId(report, "C-09").status, "pass");
    assert.equal(byId(report, "C-13").status, "pass");
    assert.equal(byId(report, "C-17").status, "pass");
    assert.equal(byId(report, "C-18").status, "manual");
  }));

test("task register rejects lifecycle status columns", () =>
  withFixture(({ root, config }) => {
    write(root, "docs/TASK_IDS.md", "| Task ID | Title | Status |\n| --- | --- | --- |\n| T-0001 | first | In Progress |\n");
    const report = validateRepository(root, { config });
    assert.equal(byId(report, "C-18").status, "fail");
    assert.match(byId(report, "C-18").summary, /status-free/i);
  }));

test("task register rejects non-ascending identities", () =>
  withFixture(({ root, config }) => {
    write(root, "docs/TASK_IDS.md", "| Task ID | Title |\n| --- | --- |\n| T-0002 | second |\n| T-0001 | first |\n");
    const report = validateRepository(root, { config });
    assert.equal(byId(report, "C-18").status, "fail");
  }));

test("Ready task without minimum charter sections fails C-05", () =>
  withFixture(({ root, config }) => {
    write(root, "docs/CURRENT_TASK.md", "# Current Task\n\nTask ID: T-0002\nStatus: Ready\n\n## In Scope\n- x\n");
    const report = validateRepository(root, { config });
    assert.equal(byId(report, "C-05").status, "fail");
    assert.match(JSON.stringify(byId(report, "C-05").evidence), /Goal/);
  }));

test("missing non-authority home fails C-13 and C-14", () =>
  withFixture(({ root, config }) => {
    const changed = structuredClone(config);
    changed.nonAuthority = "docs/missing-concepts";
    const report = validateRepository(root, { config: changed });
    assert.equal(byId(report, "C-13").status, "fail");
    assert.equal(byId(report, "C-14").status, "fail");
  }));

test("collection without discoverability declaration fails C-17", () =>
  withFixture(({ root, config }) => {
    write(root, "docs/finished/README.md", "# Finished\n\nSome files live here.\n");
    const report = validateRepository(root, { config });
    assert.equal(byId(report, "C-17").status, "fail");
  }));

test("external evidence can satisfy manual Level 1 obligations but cannot override failures", () =>
  withFixture(({ root, config }) => {
    const evidence = {
      "C-02": { status: "pass", reviewer: "reviewer-a", note: "Authority review passed" },
      "C-03": { status: "pass", reviewer: "reviewer-a", note: "Role separation review passed" }
    };
    const report = validateRepository(root, { config, evidence });
    assert.equal(report.levels[1].claimable, true);
    assert.equal(report.highestClaimableLevel, 1);

    write(root, "AGENTS.md", "No configured read order here.\n");
    const failed = validateRepository(root, { config, evidence });
    assert.equal(byId(failed, "C-01").status, "fail");
    assert.equal(failed.levels[1].claimable, false);
  }));

test("report shape is deterministic and machine-consumable", () =>
  withFixture(({ root, config }) => {
    const report = validateRepository(root, { config });
    assert.equal(report.reportVersion, 1);
    assert.equal(report.configSchemaVersion, 1);
    assert.equal(report.results.length, 18);
    assert.deepEqual(Object.keys(report.levels), ["1", "2", "3"]);
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(report)));
  }));
