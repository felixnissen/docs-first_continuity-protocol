# docs-first continuity protocol

Licensed under the Apache License 2.0.

This repository is a technical preview until a versioned release is published.
The fork currently contains a working normative core and an executable
conformance validator; upstream maintainer acceptance remains a separate
contribution decision.

## The problem, in one story

A printer stops working and flashes red. A technician arrives and asks for the
manual and the service history.

Without docs-first, the answer is: "It might be in one of the twenty-five
binders on that shelf."

With docs-first, the answer is: "Start with the index in the yellow binder. It
points to the printer specification in the blue binder, page 99." Beside the
specification is a dated note: the same red light was a fuse, here is where the
fuse sits, here is how it was replaced, here is what was verified, and here is
who did it.

The technician does not read twenty-five binders and does not need to find the
person who did the last repair. The system routes one current problem to the
right specification, the relevant prior change and the next action.

Twenty-five binders are also documentation. They are not a knowledge system. The
difference is a known entry point, one owner per truth, a route to the
authority, and a dated record of what changed.

## What this repository is

The hardened working model lives frozen in `baseline/`, `extraction/ledger.md`
classifies and traces its rules, `SPEC.md` defines the C-01 through C-18 core,
and `docs/` is this project running that model on itself.

`conformance/` adds an executable evidence layer. It checks what can be checked
deterministically and reports review/git-history obligations as unresolved
evidence rather than pretending a file-presence check proves them.

That self-hosting is deliberate. A continuity protocol whose own repository
cannot be picked up and checked by a stranger has answered its own question.

## What exists today

| | |
| --- | --- |
| Frozen baseline, verified against a tag | yes |
| Extraction/traceability ledger | yes |
| Normative C-01 through C-18 specification in this fork | yes |
| Dependency-free Node 20+ conformance validator | yes |
| Text + machine-readable JSON conformance reports | yes |
| Self-validation on Node 20/22 × Ubuntu/Windows | yes |
| Reference templates | no |
| Profiles | no |
| Evidence report / versioned release | no |
| Upstream maintainer acceptance of fork contributions | no |

`docs/CURRENT_STATUS.md` is the authority on this table. If they disagree, this
README is stale.

## Try the validator

No third-party runtime dependencies are required beyond Node 20+.

```bash
npm test
npm run validate
npm run validate:json
```

Validate another repository using its semantic-role mapping:

```bash
node conformance/cli.mjs /path/to/project --config continuity.config.json
```

Ask CI/tooling to require a fully evidenced conformance level:

```bash
node conformance/cli.mjs . --evidence evidence.json --require-level 1
```

A normal report can contain `manual` requirements. That means the validator is
being honest about evidence it cannot prove mechanically; it is not silently
claiming conformance.

## Where to start reading

`AGENTS.md`, then the reading order it names. The active task is always
`docs/CURRENT_TASK.md`. Read `SPEC.md` for the protocol core and
`docs/SYSTEMDOC.md` for the boundary between the protocol and validator tooling.

## License

This repository is licensed under the Apache License 2.0.

Using the Docs-First Continuity Protocol does not cause a project's own
documents, source code, or other artifacts to become licensed under
Apache-2.0.

Files copied or adapted from this repository remain subject to the terms of the
Apache License 2.0.
