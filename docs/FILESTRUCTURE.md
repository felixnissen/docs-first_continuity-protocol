# File Structure

The repository map. Update it in the same change as the structure it describes.

```text
docs-first_continuity-protocol/
├── .github/
│   └── workflows/
│       ├── docs-check.yml           changed-line whitespace/conflict verification
│       └── conformance.yml          Node 20/22 × Ubuntu/Windows validator CI
├── AGENTS.md                        entry point and operating rules
├── README.md                        what this is, for a first-time reader
├── SPEC.md                          fork normative core, C-01 to C-18
├── continuity.config.json           non-normative local semantic-role mapping
├── package.json                     dependency-free validator commands
├── conformance/
│   ├── cli.mjs                      text/JSON conformance CLI
│   ├── lib.mjs                      deterministic requirement engine/reporting
│   └── test/
│       └── validator.test.mjs       positive/negative validator fixtures
├── docs/
│   ├── CURRENT_TASK.md              active task surface, clean after DFC-0002
│   ├── template_CURRENT_TASK.md     charter form
│   ├── TASK_WORKFLOW.md             states, freeze, routing, identity
│   ├── PROJECT_BRIEF.md             approved direction and non-goals
│   ├── CONTRIBUTING.md              how work is done here
│   ├── CURRENT_STATUS.md            what exists now, and the gaps
│   ├── SYSTEMDOC.md                 durable shape of protocol + tooling boundary
│   ├── JOURNAL.md                   dated, signed work waves, append-only
│   ├── FILESTRUCTURE.md             this file
│   ├── TASK_IDS.md                  identity claims, allocation only
│   ├── adr/                         decisions
│   ├── backlog/                     non-activated proposals
│   ├── paused/                      frozen parents awaiting a condition
│   ├── finished/
│   │   ├── DFC-0001_protocol-specification.md
│   │   └── DFC-0002_conformance-validator.md
│   └── concepts_sandbox/            excluded ideas, explicitly non-authoritative
├── baseline/
│   ├── README.md                    provenance and what was not copied
│   └── acme-2026-08-19/             fifteen files, verbatim, never edited
└── extraction/
    └── ledger.md                    baseline rules mapped CORE/PROFILE/PROJECT
```

## Conventions

Every collection under `docs/` declares one discoverability mode in its
`README.md`: `index`, meaning every member is listed there, or a naming
convention that makes every member addressable without a list. `docs/finished/`
uses the convention `DFC-NNNN_task-slug.md`; the others are indexed.

Collections whose members carry lifecycle state also declare
`Member state: required`, and each member declares a `Status:` line under its
title. State lives in content and in the index, never in a filename.

A record cited by `docs/JOURNAL.md`, `docs/finished/` or an accepted decision
keeps its path. Renaming it cannot be repaired, because the citations live in
records that may not be edited.

`continuity.config.json` maps this repository's concrete paths to semantic roles
for the validator. Its path choices are implementation configuration, not
normative protocol filenames.

## Not yet present

Reference templates, profiles, case studies and the evidence report do not
exist. When they arrive they will sit beside `docs/` as `templates/`,
`profiles/`, `examples/` and `case-studies/`, and this map must be updated in the
same change.
