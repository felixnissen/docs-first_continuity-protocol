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
| `continuity.config.json` | Non-normative mapping from this repository's paths to protocol semantic roles; filenames remain project-specific |
| `conformance/` | Dependency-free Node 20+ validator/library/CLI with text and stable JSON reports, external evidence input, requirement results and conformance-level blockers |
| `conformance/test/validator.test.mjs` | Positive and negative fixtures covering entry/task/register/non-authority/discoverability behavior and machine-readable report shape |
| `.github/workflows/conformance.yml` | Node 20/22 × Ubuntu/Windows validator tests, self-validation, JSON smoke test and `git diff --check` |
| `.github/workflows/docs-check.yml` | Deterministic changed-line whitespace and merge-conflict-marker verification for contribution branches/PRs |
| `docs/finished/DFC-0001_protocol-specification.md` | Archived completed charter and verification evidence for the specification task |
| This repository's own docs-first instance | Operating entry point, workflow, brief, status, system document, journal, file map, identity register and collection indexes |
| `LICENSE` | Apache License 2.0 |
| Repository visibility | Public |

## Validator capability boundary

The validator deliberately distinguishes executable structural evidence from
human or git-history evidence. It does not convert an unprovable requirement
into a green check merely because a file exists.

- Mechanical evidence can produce `pass` or `fail` directly.
- Requirements whose remaining obligation is semantic review or git history are
  reported as `manual` until external evidence is supplied.
- External evidence can resolve a `manual` result to `pass`/`fail`, but it cannot
  override a mechanical failure.
- The JSON report includes all C-01 through C-18 results, blockers for Levels
  1–3, the highest currently claimable level, the repository revision when Git
  is available and the SHA-256 of `SPEC.md`.
- Project paths are supplied through a semantic-role configuration; this
  validator does not make this repository's filenames normative protocol rules.

The DFC-0002 implementation passed its full GitHub Actions matrix on Node 20 and
22 on both Ubuntu and Windows before final documentation/archive work. The final
post-documentation run remains the completion gate for the task.

## What does not exist

None of the following may be described as available yet:

- Reference templates in a distributable protocol package.
- The profiles: software, creative production, operations, research, or AI-systems.
- Automated proof for requirements whose specified checking means include git
  history or a review ritual; the validator exposes these evidence gaps instead.
- The case studies and evidence report.
- A versioned protocol release.
- Upstream maintainer acceptance of this fork's DFC-0001/DFC-0002 contributions.

## Known gaps and risks

- **Fork acceptance is not upstream acceptance.** C-01 through C-18 and the
  validator are working artifacts of this fork; Rickard/upstream review remains
  a separate contribution decision.
- **Four baseline rules were hours old at extraction.** C-16, C-17, and the
  shared-trunk portion of C-18 preserve that lower evidence maturity explicitly.
- **The validator is conservative by design.** It cannot prove semantic truth
  ownership, charter immutability or repository-only resumability from a static
  tree alone. Those obligations remain visible as required evidence rather than
  being guessed.
- **Evidence is not yet publishable.** The counting method has not been written,
  no consent has been obtained for excerpts, and no journal material has been
  anonymized.
- **Twenty-two links inside `baseline/` do not resolve**, because the baseline
  is a partial verbatim copy whose links point into the source repository. This
  is correct and ordinary repair tooling must exclude `baseline/`.
- **The final project/brand name is undecided.** The descriptive repository name
  and DFC identity prefix remain valid; task identities must not be renamed.

## Boundaries that hold

- `baseline/` is never edited. Corrections belong in this project's documents.
- The source repository does not depend on this one. The relation is one way.
- The repository is public and licensed under Apache-2.0. Publication of a
  versioned protocol release remains a separate explicit decision.
- `SPEC.md` and `conformance/` can be used as fork-local tooling without claiming
  upstream adoption.
