# Current Status

Reality as of 2026-08-26 in this fork. This document describes what exists, not
what is planned. If it disagrees with the code or the tree, this document is
wrong and must be corrected.

## What exists

| Thing | State |
| --- | --- |
| `baseline/acme-2026-08-19/` | Fifteen files, copied verbatim from tag `protocol-baseline-2026-08-19` in the source repository, verified byte for byte at extraction |
| `baseline/README.md` | Provenance: source repository, revision, date, extractor, and what was deliberately not copied |
| `extraction/ledger.md` | Thirty classified traceability rows. The bootstrap count was twenty-eight; DFC-0001 made the task-state row explicit and split the sandbox boundary into two independently checkable obligations |
| `SPEC.md` | Normative core accepted in this fork under DFC-0001: C-01 through C-18, conformance levels, checking means, traceability and evidence-maturity notes |
| `docs/finished/DFC-0001_protocol-specification.md` | Archived completed charter and verification evidence for the specification task |
| `.github/workflows/docs-check.yml` | Deterministic changed-line whitespace and merge-conflict-marker verification for contribution branches/PRs |
| This repository's own docs-first instance | Operating entry point, workflow, brief, status, system document, journal, file map, identity register and collection indexes; active-task surface is clean after DFC-0001 |
| `LICENSE` | Apache License 2.0 |
| Repository visibility | Public |

## What does not exist

None of the following may be described as available yet:

- Reference templates in a distributable protocol package.
- The conformance validator or automated conformance report generator.
- The profiles: software, creative production, operations, research, or AI-systems.
- The case studies and evidence report.
- A versioned protocol release.
- Upstream maintainer acceptance of this fork's DFC-0001 contribution.

## Known gaps and risks

- **Fork acceptance is not upstream acceptance.** C-01 through C-18 are now the
  working normative core of this fork so validator development can proceed, but
  Rickard/upstream review remains a separate contribution decision.
- **Four baseline rules were hours old at extraction.** C-16, C-17, and the
  shared-trunk portion of C-18 preserve that lower evidence maturity explicitly.
- **No validator yet.** The specification identifies validator-, git-history-,
  and ritual-checked requirements, but automated conformance reporting is not
  yet available.
- **Evidence is not yet publishable.** The counting method has not been written,
  no consent has been obtained for excerpts, and no journal material has been
  anonymized.
- **Twenty-two links inside `baseline/` do not resolve**, because the baseline
  is a partial verbatim copy whose links point into the source repository. This
  is correct and future tooling must exclude `baseline/` from ordinary link
  repair.
- **The final project/brand name is undecided.** The descriptive repository name
  and DFC identity prefix remain valid; task identities must not be renamed.

## Boundaries that hold

- `baseline/` is never edited. Corrections belong in this project's documents.
- The source repository does not depend on this one. The relation is one way.
- The repository is public and licensed under Apache-2.0. Publication of a
  versioned protocol release remains a separate explicit decision.
- `SPEC.md` can be used as the basis for fork-local tooling without claiming
  upstream adoption.
