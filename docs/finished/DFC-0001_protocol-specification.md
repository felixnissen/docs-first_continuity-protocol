# Current Task

Task ID: DFC-0001
Parent Task: None
Status: Complete
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
- Mark the recently added requirements so their lower evidence maturity remains visible.
- Update `extraction/ledger.md` so CORE obligations trace to requirements.
- Update current-reality and file-structure documentation.

### Out of Scope

- Templates, profiles, the validator, examples, case studies, the evidence report.
- Editing anything under `baseline/`.
- Choosing the final project name or making a new licensing/publication decision.
- Simplifying or merging baseline rules.

### Definition of Done

- Every CORE row in the ledger names the requirement it became, and every
  requirement names its source obligation.
- Each requirement states its checking means.
- The conformance levels cover C-01 through C-18.
- The specification is readable in one sitting.
- `docs/CURRENT_STATUS.md` describes the specification as existing.
- `docs/JOURNAL.md` records the completed contribution and this task is archived.

### Minimum Verification Gates

- [x] Every CORE ledger row maps to a requirement, checked end to end
- [x] Every C-01 through C-18 requirement maps back to baseline/ledger evidence
- [x] Manual link and fence review of the candidate specification and changed authorities
- [x] `git diff --check` clean via GitHub Actions `docs-check`

## References

- `baseline/acme-2026-08-19/AGENTS.md`
- `baseline/acme-2026-08-19/docs/TASK_WORKFLOW.md`
- `extraction/ledger.md`
- `SPEC.md`

## Checklist

- [x] DFC-0001 identity existed on `main` before charter freeze
- [x] Draft requirement groups and identifiers
- [x] Write C-01 through C-18
- [x] Assign checking means
- [x] Define conformance levels
- [x] Mark recently added requirements
- [x] Backfill/refine ledger traceability
- [x] Correct stale repository-status statements encountered in owned current surfaces
- [x] Remove task lifecycle status from the identity-only task register
- [x] Update status and file structure
- [x] Add journal evidence
- [x] Run final diff verification
- [x] Review candidate wording against baseline and ledger for fork acceptance

## Decisions and Notes

- Transcription, not redesign. A rewrite from memory would risk dropping failure knowledge.
- Requirement identifiers are permanent once this candidate is accepted in the fork.
- C-09 makes the existing baseline task lifecycle state explicit so C-06/C-08/C-11 are mechanically addressable; it does not invent a new transition rule.
- The sandbox ledger row contained two independently checkable obligations and is represented as C-13/C-14 without changing baseline force.
- Repository license and visibility had already changed after bootstrap; stale private/unlicensed claims were corrected as current-reality maintenance.

## Charter Amendment Log

Only non-semantic corrections are allowed after `Ready`.

- 2026-08-26: wording clarifies that license/visibility corrections document already-landed repository reality; Goal, Primary Deliverable, scope, and Definition of Done are unchanged.

## Verification

- [x] Ledger/specification cross-check in both directions
- [x] Manual link and fence review
- [x] `git diff --check` and conflict-marker check via GitHub Actions run `32917249679`
- [x] Fork acceptance review against baseline/ledger
- [x] Skipped checks documented: no conformance validator exists yet; building it is intentionally a later task

## Documentation Updates

- [x] `docs/CURRENT_STATUS.md`
- [x] `docs/FILESTRUCTURE.md`
- [x] `docs/JOURNAL.md`
- [x] `extraction/ledger.md`
- [x] stale repository-status statements in `AGENTS.md` and `docs/PROJECT_BRIEF.md`
- [x] status-bearing `Work` column removed from `docs/TASK_IDS.md`

## Handoff and Follow-ups

- Current state: candidate `SPEC.md` C-01 through C-18 exists and is accepted in this fork as the basis for validator work.
- Next recommended step: implement the conformance validator as its own bounded task and keep upstream review of the specification separate.
- Blockers: none in this fork. Rickard/upstream review is deliberately a separate contribution decision.
- Child tasks: none.
- Resume condition: not applicable.
- Open question retained from the approved brief: whether filenames themselves become normative in future templates or only semantic roles do.

## Finalize When Complete

- [x] Archive this completed charter under `docs/finished/`.
- [x] Restore `docs/CURRENT_TASK.md` from the template after archiving.
- [x] Add a final signed `docs/JOURNAL.md` entry.
