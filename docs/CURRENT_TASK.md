# Current Task

Task ID: DFC-0002
Parent Task: None
Status: Ready
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

- [ ] Built-in Node test suite green
- [ ] Self-validation runs without validator implementation errors
- [ ] Negative fixtures fail the intended requirements
- [ ] `git diff --check` clean
- [ ] Generated JSON is parseable and stable enough for Verket integration

## References

- `SPEC.md`
- `extraction/ledger.md`
- `docs/TASK_WORKFLOW.md`
- `docs/TASK_IDS.md`

## Checklist

- [ ] Define non-normative semantic-role config schema
- [ ] Implement file/task/register/collection checks
- [ ] Implement requirement result + level calculation
- [ ] Implement text and JSON CLI output
- [ ] Add self-validation config
- [ ] Add positive/negative tests
- [ ] Add CI execution
- [ ] Update durable docs
- [ ] Verify and archive

## Decisions and Notes

- The validator maps semantic roles to project paths; config filenames and
  mapped filenames are tooling choices, not protocol requirements.
- A result is one of `pass`, `fail`, `manual`, or `not_applicable`. Only `pass`
  satisfies a requirement for an automated conformance claim; `manual` remains
  an explicit unmet evidence obligation until separately supplied/reviewed.
- V1 prefers deterministic conservative checks over heuristic false confidence.

## Charter Amendment Log

-none

## Verification

- [ ] `node --test conformance/test/*.test.mjs`
- [ ] `node conformance/cli.mjs .`
- [ ] `node conformance/cli.mjs . --format json`
- [ ] GitHub Actions
- [ ] `git diff --check`

## Documentation Updates

- [ ] `docs/CURRENT_STATUS.md`
- [ ] `docs/SYSTEMDOC.md`
- [ ] `docs/JOURNAL.md`
- [ ] `docs/FILESTRUCTURE.md`

## Handoff and Follow-ups

- Current state: task identity DFC-0002 is claimed on `main`; implementation is beginning on this branch.
- Next recommended step: implement deterministic semantic-role checks before adding UI/integration consumers.
- Blockers: none.
- Child tasks: none.
- Resume condition: repository state alone is sufficient.
- Open questions: whether future protocol releases standardize a config schema or keep validator configs implementation-specific.

## Finalize When Complete

- Archive this file under `docs/finished/`.
- Restore `docs/CURRENT_TASK.md` from the template.
- Add a signed `docs/JOURNAL.md` entry.
