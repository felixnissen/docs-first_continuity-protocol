# Current Task

Task ID: DFC-0001
Parent Task: None
Status: In Progress
Owner: felixnissen (fork contribution)
Created: 2026-08-19
Last updated: 2026-08-26
Charter frozen at: 2026-08-26

## Read First

- `AGENTS.md`
- `docs/TASK_WORKFLOW.md`
- `docs/PROJECT_BRIEF.md`
- `docs/CONTRIBUTING.md`
- `docs/CURRENT_STATUS.md`
- `docs/SYSTEMDOC.md`
- `docs/JOURNAL.md`
- `docs/FILESTRUCTURE.md`
- `baseline/README.md` and `extraction/ledger.md`

## Task Summary

Write `SPEC.md`: the normative requirements of the protocol, numbered so that
conformance results, issues and profiles can cite them precisely.

The material already exists. `baseline/acme-2026-08-19/` holds the hardened
model verbatim and `extraction/ledger.md` classifies the baseline rule groups as
CORE, PROFILE or PROJECT with an intended destination for each. This task turns
the CORE rows into requirements without softening them, and leaves the PROFILE
rows for the profile documents.

## Task Charter

The charter was frozen when this contribution moved through `Ready`. The
semantic charter below remains the 2026-08-19 DFC-0001 charter.

### Goal

Produce the normative specification of the protocol core, traceable rule by rule
to the baseline it came from.

### Primary Deliverable

`SPEC.md`, containing numbered requirements grouped by entry and ownership,
active work, continuity, containment, addressing, multiple actors and
resumability, together with the conformance levels that map onto them.

### In Scope

- Write one requirement per CORE obligation in `extraction/ledger.md`, keeping
  the force of the baseline rule and parameterizing only project identity.
- Group requirements and assign stable identifiers. An identifier, once written,
  is cited by conformance output and may not be renumbered.
- Define the conformance levels and state which requirements each level covers,
  and by what means each is checked: validator, git history, or a named review
  ritual.
- State, for every requirement, whether it is machine-checkable or ritual-checked.
  A requirement that is neither does not belong in the specification.
- Mark the four requirements whose baseline rules are hours old rather than
  months, so that a reader can weigh them accordingly.
- Update `extraction/ledger.md` so every CORE row names the requirement it
  became.
- Update `docs/CURRENT_STATUS.md` and `docs/FILESTRUCTURE.md`.

### Out of Scope

- Templates, profiles, the validator, examples, case studies, the evidence
  report. Each is its own task.
- Editing anything under `baseline/`.
- Choosing the final project name or making a new licensing/publication
  decision. Correcting stale documents to match already-landed Apache/public
  repository reality is factual maintenance, not a new decision.
- Simplifying or merging baseline rules. If a rule seems redundant, record the
  observation in `docs/backlog/` rather than dropping it; the model was hardened
  by failures that the text does not always show.

### Definition of Done

- Every CORE row in the ledger names the requirement it became, and every
  requirement names the ledger row it came from.
- Each requirement states its checking means.
- The conformance levels cover every requirement exactly once.
- The specification is readable in one sitting.
- `docs/CURRENT_STATUS.md` no longer says the specification does not exist.
- `docs/JOURNAL.md` has a signed entry and this task is archived.

### Minimum Verification Gates

- [x] Every CORE ledger row maps to a requirement, checked by reading the ledger
      end to end after the C-09 traceability refinement
- [x] Every C-01 through C-18 requirement maps back to one or more ledger rows
- [x] Manual link and fence review of the candidate specification and changed
      authority documents
- [ ] `git diff --check` clean

## References

- `baseline/acme-2026-08-19/AGENTS.md`
- `baseline/acme-2026-08-19/docs/TASK_WORKFLOW.md`
- `extraction/ledger.md`

## Checklist

- [x] DFC-0001 identity exists on `main` before this contribution froze the charter
- [x] Draft the requirement groups and identifiers
- [x] Write the normative CORE requirements C-01 through C-18
- [x] Assign checking means to each requirement
- [x] Define the conformance levels
- [x] Mark the recently added requirements
- [x] Backfill/refine the ledger with requirement identifiers
- [x] Update status and file structure
- [x] Add a signed in-progress journal entry
- [ ] Run final diff/format verification
- [ ] Obtain review, then archive DFC-0001 and restore the active-task template

## Decisions and Notes

- Transcription, not redesign. A rewrite from memory keeps the parts that read
  well and drops the failure knowledge that is the actual value.
- Requirement identifiers are permanent once the candidate is accepted.
- The bootstrap ledger had no explicit destination for the task lifecycle state
  that C-06 and completion rules depend on. DFC-0001 records that existing
  baseline state model explicitly as C-09 rather than inventing new behavior.
- The sandbox ledger row contained two independently checkable obligations. It
  was split for traceability into C-13 (named home) and C-14 (non-authority)
  without changing baseline force.
- Repository license and visibility had already changed after bootstrap. The
  stale private/unlicensed claims were corrected as current-reality maintenance.

## Charter Amendment Log

Only non-semantic corrections are allowed after `Ready`.

- 2026-08-26: wording in the task notes clarifies that license/visibility
  corrections document already-landed repository reality; the Goal, Primary
  Deliverable, scope of the specification, and Definition of Done are unchanged.

## Verification

- [x] Ledger and specification cross-check, both directions
- [x] Manual link and fence review
- [ ] `git diff --check`
- [x] Document skipped checks and reasons

Skipped/pending: `git diff --check` has not been executed in a checked-out copy
of this contribution branch yet. DFC-0001 therefore remains `In Progress` and
must not be archived or called complete until that gate and review pass.

## Documentation Updates

- [x] `docs/CURRENT_STATUS.md`
- [x] `docs/FILESTRUCTURE.md`
- [x] `docs/JOURNAL.md`
- [x] `extraction/ledger.md`
- [x] stale repository-status statements in `AGENTS.md` and `docs/PROJECT_BRIEF.md`
- [x] status-bearing `Work` column removed from `docs/TASK_IDS.md`

## Handoff and Follow-ups

- Current state: candidate `SPEC.md` exists and C-01 through C-18 are traced to
  the extraction ledger. Current-reality contradictions discovered during the
  task have been corrected on this contribution branch.
- Next recommended step: check out this branch, run `git diff --check`, review
  the candidate wording against the frozen baseline, and only then archive the
  task and prepare the upstream pull request.
- Blockers: final checkout-based verification and maintainer review.
- Child tasks: none.
- Resume condition: a contributor can run the remaining verification gates.
- Open question retained from the approved brief: whether filenames themselves
  become normative in the future templates or only their semantic roles do.

## Finalize When Complete

- Archive this file under `docs/finished/`.
- Restore this template or populate the next approved task.
- Add a final signed `docs/JOURNAL.md` entry.
- If Goal or Definition of Done changed, supersede this task instead of
  rewriting it.
