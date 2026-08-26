# Current Status

Reality as of 2026-08-26 on the DFC-0001 contribution branch. This document
describes what exists, not what is planned. If it disagrees with the code or
the tree, this document is wrong and must be corrected.

## What exists

| Thing | State |
| --- | --- |
| `baseline/acme-2026-08-19/` | Fifteen files, copied verbatim from tag `protocol-baseline-2026-08-19` in the source repository, verified byte for byte at extraction |
| `baseline/README.md` | Provenance: source repository, revision, date, extractor, and what was deliberately not copied |
| `extraction/ledger.md` | Thirty classified traceability rows. The bootstrap count was twenty-eight; DFC-0001 made the task-state row explicit and split the sandbox boundary into two independently checkable obligations |
| `SPEC.md` | DFC-0001 candidate normative core, C-01 through C-18, with conformance levels and checking means |
| This repository's own docs-first instance | Operating entry point, active task, workflow, brief, status, system document, journal, file map, identity register, collection indexes |
| `LICENSE` | Apache License 2.0 |
| Repository visibility | Public |

## What does not exist

None of the following may be described as available yet:

- Reference templates in a distributable protocol package.
- The conformance validator or automated conformance report generator.
- The profiles: software, creative production, operations, research, or
  AI-systems.
- The case studies and evidence report.
- A versioned protocol release.

## Known gaps and risks

- **The specification is a candidate until DFC-0001 is reviewed and merged.**
  Requirement identifiers C-01 through C-18 now exist on this branch, but no
  released conformance claim should depend on them before that review.
- **Four baseline rules were hours old at extraction.** C-16, C-17, and the
  shared-trunk portion of C-18 preserve that lower evidence maturity explicitly.
- **No validator yet.** The specification identifies validator-, git-history-,
  and ritual-checked requirements, but verification is still manual.
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
