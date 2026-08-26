# Journal

Newest first. Append only: entries are never edited or reflowed, because other
records cite them and because their value is that they record what was believed
at the time.

## 2026-08-26 — DFC-0001 candidate specification and consistency pass

- Date: 2026-08-26
- Author: felixnissen with ChatGPT acting as implementation/review assistant
- Task: DFC-0001
- Branch: `contrib/dfc-0001-spec-and-consistency`
- Change: wrote candidate `SPEC.md` requirements C-01 through C-18 with three
  conformance levels and explicit checking means; refined `extraction/ledger.md`
  so the baseline task-state model maps explicitly to C-09 and the sandbox
  boundary maps separately to C-13 and C-14; removed the status-bearing `Work`
  column from the identity-only task register; corrected current-reality claims
  that still described the repository as private and unlicensed after Apache-2.0
  licensing and public visibility had already landed; updated the repository map.
- Evidence maturity: C-16, C-17 and the shared-trunk portion of C-18 remain
  explicitly marked recent, preserving the extraction ledger's distinction
  between long-used rules and rules added hours before extraction.
- Verification: ledger-to-spec and spec-to-ledger traceability were manually
  checked; changed Markdown was manually reviewed for link/fence consistency.
  `git diff --check` has not yet been run in a checked-out copy of this branch,
  so DFC-0001 remains `In Progress` and is deliberately not archived.
- Handoff: run the remaining checkout-based verification, review requirement
  wording against the frozen baseline, then either amend the candidate before
  acceptance or archive DFC-0001 and restore the active-task template.
- Signature: ChatGPT / felixnissen contribution branch

## 2026-08-19 — Repository bootstrap from a frozen baseline

- Date: 2026-08-19
- Author: Claude
- Task: bootstrap, performed under `ACME-0173` in the source repository. This
  repository's own task numbering starts at DFC-0001, which is chartered but not
  started.
- Branch: `main`
- Change: this repository now exists as a docs-first instance running the model
  it intends to specify. `baseline/acme-2026-08-19/` holds fifteen files copied
  verbatim from tag `protocol-baseline-2026-08-19`
  (`75e4b5ee72201d02ad57f22b1a5fcfb3244d521e`) in `zackemannen81/acme-engine`,
  with provenance in `baseline/README.md`. `extraction/ledger.md` classifies
  twenty-eight rule groups as CORE, PROFILE or PROJECT.
- Verification: every copied file was compared by SHA-256 against
  `git show <tag>:<path>` at extraction. All fifteen matched. The comparison is
  repeatable against the tag, which is why the tag exists.
- Not copied, deliberately: the source repository's active charter, because it
  holds another contributor's in-progress work; `docs/JOURNAL.md`, because 6500
  lines of client, product and personal material must never be copied raw and
  journal evidence belongs to the evidence milestone, aggregated and anonymized;
  and the source project's status, architecture, brief and decisions, because
  the model is the workflow rather than the product it was used on.
- Identity prefix: `DFC`, encoding the descriptive method rather than a brand.
  The project name is undecided, and an identity carrying the name would need a
  rename that the addressing rule forbids.
- Honesty note: four rules in the baseline are hours old, not months.
  Path stability, collection discoverability, tense-aware citation validation
  and trunk identity claims were each added on 2026-08-19 after a real failure
  in the source repository. `extraction/ledger.md` marks them so that the
  evidence report does not treat them as equally proven.
- Handoff: DFC-0001 is chartered in `docs/CURRENT_TASK.md` as `Draft` and
  unassigned. It writes `SPEC.md` from the CORE rows of the ledger. Claim the
  identity on `main` before freezing it. This repository is private and
  unlicensed, and is therefore not open source.
- Signature: Claude
