# Current Task

Task ID: DFC-0002
Parent Task: None
Status: Complete
Owner: felixnissen (fork contribution)
Created: 2026-08-26
Last updated: 2026-08-26
Charter frozen at: 2026-08-26

## Read First

- `AGENTS.md`
- `SPEC.md`
- `docs/TASK_WORKFLOW.md`
- `docs/PROJECT_BRIEF.md`
- `docs/CONTRIBUTING.md`
- `docs/CURRENT_STATUS.md`
- `docs/SYSTEMDOC.md`
- `docs/JOURNAL.md`
- `docs/FILESTRUCTURE.md`
- `docs/finished/DFC-0001_protocol-specification.md`

## Task Summary

Build the first dependency-free conformance validator and report generator for
the protocol core. The validator must check machine-checkable obligations,
identify git-history/review obligations honestly, and never turn a conventional
filename into an accidental normative protocol requirement.

## Task Charter

The charter is frozen at `Ready`.

### Goal

Turn the C-01 through C-18 specification into useful executable evidence while
preserving the distinction between mechanical checks, git-history checks and
review rituals.

### Primary Deliverable

A `conformance/` tool that validates a repository from a semantic-role config and
emits both human-readable and JSON reports with requirement-by-requirement
results and the highest claimable conformance level.

### In Scope

- Dependency-free Node 20+ CLI and library.
- A non-normative semantic-role config mapping project-specific paths to
  protocol roles such as entry point, active task, task register, archive,
  non-authority material and durable collections.
- Mechanical checks for the validator-checkable portions of C-01, C-04, C-05,
  C-08, C-09, C-11, C-12, C-13, C-14, C-17 and C-18 where evidence is available.
- Honest `manual`/`git-history` results for obligations that v1 cannot prove.
- Stable JSON report shape suitable for Verket or CI consumption.
- Self-validation config for this repository.
- Positive and negative automated fixtures/tests.
- CI command that validates tests and this repository.

### Out of Scope

- Profiles and profile-specific checks.
- Embeddings/LLMs or fuzzy semantic judgment.
- Automatically claiming review rituals passed.
- Treating current repository filenames as normative protocol filenames.
- Rewriting `SPEC.md` or weakening a requirement to make the validator easier.
- Publishing a release or claiming upstream adoption.

### Definition of Done

- `node conformance/cli.mjs .` returns a deterministic report for this repo.
- `--format json` returns machine-readable requirement results and claimability.
- Invalid fixtures demonstrate meaningful failures for task-register ordering,
  status leakage, missing charter sections, missing non-authority boundary and
  undiscoverable collections.
- Manual/history obligations remain visible rather than silently passing.
- Automated tests pass on GitHub Actions.
- Current status, file structure, system documentation and journal describe the
  new capability truthfully.

### Minimum Verification Gates

- [x] Built-in Node test suite green on Node 20/22 × Ubuntu/Windows
- [x] Self-validation runs without validator implementation errors on all four CI matrix jobs
- [x] Negative fixtures fail the intended requirements
- [x] `git diff --check` clean
- [x] Generated JSON is parseable and stable enough for Verket integration

## References

- `SPEC.md`
- `extraction/ledger.md`
- `docs/TASK_WORKFLOW.md`
- `docs/TASK_IDS.md`
- `continuity.config.json`
- `conformance/lib.mjs`
- `conformance/cli.mjs`

## Checklist

- [x] Define non-normative semantic-role config schema
- [x] Implement file/task/register/collection checks
- [x] Implement requirement result + level calculation
- [x] Implement text and JSON CLI output
- [x] Add self-validation config
- [x] Add positive/negative tests
- [x] Add CI execution
- [x] Update durable docs and first-reader README
- [x] Re-run full matrix on the final documentation state
- [x] Archive DFC-0002 and restore the clean active-task surface as the close-out change

## Decisions and Notes

- The validator maps semantic roles to project paths; config filenames and
  mapped filenames are tooling choices, not protocol requirements.
- A result is one of `pass`, `fail`, or `manual` in v1. A manual result remains
  an explicit unmet evidence obligation until separately supplied/reviewed.
- External evidence may resolve `manual` to `pass`/`fail`; it cannot override a
  deterministic mechanical failure.
- V1 prefers deterministic conservative checks over heuristic false confidence.
- Self-validation initially exposed that the sandbox's authority boundary was
  semantically strong but unnecessarily implicit for tooling. Its README now
  includes an explicit `Authority: non-authoritative` declaration while
  retaining the stronger prose boundary.

## Charter Amendment Log

- 2026-08-26: implementation note narrowed v1's emitted status vocabulary to
  `pass`, `fail`, and `manual`; this does not change Goal, deliverable, scope,
  Definition of Done, or the rule that only evidenced passes support a claim.

## Verification

- [x] `npm test` — eight positive/negative validator tests
- [x] `node conformance/cli.mjs .` — self-validation without mechanical failures
- [x] `node conformance/cli.mjs . --format json` — parseable 18-result report
- [x] GitHub Actions run `32917919827`: Node 20/22 × Ubuntu/Windows all green
- [x] GitHub Actions run `32918167452`: post-documentation Node 20/22 × Ubuntu/Windows all green
- [x] `git diff --check` in all matrix jobs
- [x] Close-out/archive diff remains gated by the PR's same conformance + docs-check workflows before merge

## Documentation Updates

- [x] `docs/CURRENT_STATUS.md`
- [x] `docs/SYSTEMDOC.md`
- [x] `docs/JOURNAL.md`
- [x] `docs/FILESTRUCTURE.md`
- [x] `README.md` because its current-state capability table had become stale

## Handoff and Follow-ups

- Current state: DFC-0002 is complete in this fork. The executable validator has two independent full cross-platform green matrices; this archived close-out is itself required to pass the same PR checks before merge.
- Next recommended step: consume the stable JSON report from Verket's Docs-First adapter instead of duplicating validator logic.
- Blockers: none in this fork. Upstream review is deliberately a separate maintainer decision.
- Child tasks: none.
- Resume condition: not applicable.
- Open questions: whether future protocol releases standardize a config schema or keep validator configs implementation-specific.

## Finalize When Complete

- [x] Archive this file under `docs/finished/`.
- [x] Restore `docs/CURRENT_TASK.md` from the template.
- [x] Add a signed `docs/JOURNAL.md` entry.
