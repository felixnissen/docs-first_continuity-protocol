# File Structure

The repository map. Update it in the same change as the structure it describes.

```text
docs-first_continuity-protocol/
├── .github/
│   └── workflows/
│       └── docs-check.yml           changed-line whitespace/conflict verification
├── AGENTS.md                        entry point and operating rules
├── README.md                        what this is, for a first-time reader
├── SPEC.md                          fork normative core, C-01 to C-18
├── docs/
│   ├── CURRENT_TASK.md              active task surface, clean after DFC-0001
│   ├── template_CURRENT_TASK.md     charter form
│   ├── TASK_WORKFLOW.md             states, freeze, routing, identity
│   ├── PROJECT_BRIEF.md             approved direction and non-goals
│   ├── CONTRIBUTING.md              how work is done here
│   ├── CURRENT_STATUS.md            what exists now, and the gaps
│   ├── SYSTEMDOC.md                 durable shape of the protocol
│   ├── JOURNAL.md                   dated, signed work waves, append-only
│   ├── FILESTRUCTURE.md             this file
│   ├── TASK_IDS.md                  identity claims, allocation only
│   ├── adr/                         decisions
│   ├── backlog/                     non-activated proposals
│   ├── paused/                      frozen parents awaiting a condition
│   ├── finished/
│   │   └── DFC-0001_protocol-specification.md
│   └── concepts_sandbox/            excluded ideas, never authority
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

## Not yet present

Reference templates, profiles, the conformance validator, case studies and the
evidence report do not exist. When they arrive they will sit beside `docs/` as
`templates/`, `profiles/`, `conformance/`, `examples/` and `case-studies/`, and
this map must be updated in the same change.
