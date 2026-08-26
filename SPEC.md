# Docs-First Continuity Protocol Specification

Status: Draft candidate produced under DFC-0001.

This document defines the normative core of the Docs-First Continuity Protocol.
It is intentionally domain-neutral and actor-neutral. A conforming project may
be software, research, operations, creative production, or another form of
long-running work, and its actors may be humans, AI systems, or both.

Normative terms **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are used in the
RFC 2119 sense. Requirement identifiers are stable once published.

## Conformance model

Conformance is evidence-based. A repository does not conform merely because it
contains files with familiar names. It conforms when the required semantic
roles, transitions, and evidence can be demonstrated.

Three conformance levels are defined:

- **Level 1 — Resumable:** C-01 through C-05. A newcomer can find the active
  work and the owning truth without private chat history.
- **Level 2 — Controlled:** C-06 through C-12 in addition to Level 1. Scope,
  blocking work, handoff, verification, and completion are explicit and
  durable.
- **Level 3 — Multi-actor:** C-13 through C-18 in addition to Levels 1 and 2.
  Non-authority material, actor-independent resumption, stable addressing,
  discoverability, and collision-resistant task identity are enforced.

A conformance report MUST identify the level claimed, the evidence inspected,
and every requirement that was not verified. A failed or skipped requirement
prevents claiming the level that contains it and every higher level.

Checking means are one of:

- **Validator:** mechanically inspectable repository state.
- **Git history:** a transition or ordering property requiring version-control
  evidence.
- **Review ritual:** a named human or agent review whose outcome is recorded.

A validator MAY automate a review ritual, but the semantic obligation remains
unchanged.

## Entry and ownership

### C-01 — Known entry point

A conforming project MUST name a single entry point for a newcomer and MUST
state the order in which the minimum authoritative project documents are read
before changing the project.

Checking means: Validator.

Source: `extraction/ledger.md`, baseline `AGENTS.md` “Start Here”.

### C-02 — One owner per semantic truth

Each category of mutable project truth MUST have exactly one owning authority.
Other documents MAY summarize or link to that truth but MUST NOT independently
restate it as another authority.

Checking means: Review ritual, supported by validator-declared ownership
metadata where available.

Source: ledger, baseline `AGENTS.md` “Documentation Ownership”.

### C-03 — Reality, direction, and history are distinct

Current reality, approved direction, and historical record MUST be represented
as distinct semantic roles. A plan MUST NOT masquerade as current reality, and
history MUST NOT be rewritten to match the present.

Checking means: Review ritual.

Source: ledger, baseline `AGENTS.md` “Documentation Ownership”.

## Active work

### C-04 — One active task per branch

A branch MUST contain at most one active task charter. The trunk MUST NOT infer
or publish a count of active work across branches from local branch state.

Checking means: Validator for branch state; git history when validating task
identity collisions across branches.

Source: ledger, baseline `AGENTS.md` “One Active Task, Per Branch”.

### C-05 — Minimum task charter

Before work is declared Ready, its charter MUST state at least: goal, primary
deliverable, in-scope work, out-of-scope work, definition of done, and minimum
verification gates.

Checking means: Validator.

Source: ledger, baseline `docs/template_CURRENT_TASK.md`.

### C-06 — Charter freeze at Ready

The semantic charter defined by C-05 MUST become immutable when task state
moves to `Ready`. A change to goal, primary deliverable, scope, or definition of
done after that point MUST create an explicit amendment permitted by the
project workflow or supersede the task; it MUST NOT silently redefine the
original task.

Checking means: Git history.

Source: ledger, baseline `AGENTS.md` “Task Workflow”.

## Containment and continuity

### C-07 — Discoveries are routed, not absorbed silently

Newly discovered work MUST be classified before execution. Work already inside
the frozen charter MAY become a checklist item. A blocking prerequisite MUST
pause or block the parent and be represented as bounded prerequisite work.
Non-blocking future work MUST be routed to a backlog or equivalent future-work
authority rather than expanding the active task implicitly.

Checking means: Review ritual, with validator support for required references
where the project declares them.

Source: ledger, baseline `docs/TASK_WORKFLOW.md` blocking prerequisites and
non-blocking discoveries.

### C-08 — Durable pause and handoff

A paused or handed-off task MUST record the blocker or reason for handoff, the
next actionable steps, known verification gaps, and a resume condition when a
condition is required.

Checking means: Validator.

Source: ledger, baseline `AGENTS.md` “Pause or Handoff”.

### C-09 — Task state is explicit

The active task authority MUST declare its lifecycle state explicitly, using a
project-defined state model whose transitions distinguish at least editable
planning, ready/frozen work, active work, and completion or terminal outcome.
The state MUST live in the task authority rather than being inferred from a
filename or directory location.

Checking means: Validator.

Source: baseline workflow model underlying the CORE task-transition rules; this
requirement makes the transition preconditions of C-06, C-08, and C-11
mechanically addressable without adding a new source rule.

### C-10 — Documentation changes with the work

When work changes an authoritative fact, the owning durable documentation MUST
be updated in the same task/change set. Documentation required to keep project
truth accurate MUST NOT be deferred as an unrelated follow-up chore.

Checking means: Review ritual.

Source: ledger, baseline `AGENTS.md` “Task Workflow”.

### C-11 — Completion restores resumable state

Before a task is considered complete, its required verification MUST be
recorded, the completed task MUST be archived in the project’s durable history,
and the active-task authority MUST be restored to a clean state or populated
with the next explicitly approved task.

Checking means: Validator plus git history for archival transition.

Source: ledger, baseline `AGENTS.md` “Finish”.

### C-12 — Verification gaps are explicit

A task MUST record which required or relevant checks were performed and MUST
record exactly which checks were skipped or could not be completed, including
the reason. An actor MUST NOT use an unqualified “done” claim as a substitute
for verification evidence.

Checking means: Validator for presence; review ritual for adequacy.

Source: ledger, baseline `AGENTS.md` “Verification Baseline”.

## Authority boundaries and resumability

### C-13 — Undecided material has a named home

A project MUST provide a named location or semantic role for concepts,
experiments, or undecided material that is intentionally outside current
project authority.

Checking means: Validator.

Source: ledger, baseline `docs/concepts_sandbox/README.md`.

### C-14 — Non-authority material cannot override truth

Material in the non-authority location defined by C-13 MUST be explicitly
marked non-authoritative and MUST NOT be cited by active work as if it were an
approved requirement, current reality, or decided architecture.

Checking means: Validator for declared boundary; review ritual for citations.

Source: ledger, baseline `docs/concepts_sandbox/README.md`.

### C-15 — Repository-only resumption

The durable project state MUST contain enough information for a competent new
actor to resume the active task without requiring private chat history or the
memory of the previous actor. At minimum the actor MUST be able to determine the
active task, relevant authority, current blocker/state, next action, and known
verification gaps.

Checking means: Named resumption review ritual performed by an actor that did
not rely on the previous actor’s private context.

Source: ledger, baseline `AGENTS.md` “Pause or Handoff”.

## Addressing, discoverability, and multiple actors

### C-16 — Stable cited records

A durable record that is cited from append-only history, archived task records,
or accepted decisions MUST retain a stable address. Lifecycle status MUST live
in record content or an authoritative index, not be encoded solely by moving or
renaming the record.

Present-tense validation MUST distinguish current references from historical or
charter text that intentionally names a past or future path.

Checking means: Validator plus git history.

Evidence maturity: **recent**. The baseline rule was added on 2026-08-19 after
a rename broke 39 historical links.

Source: ledger, baseline `AGENTS.md` “Addressing and Discoverability”, including
the tense-aware validation row.

### C-17 — Collections are discoverable

Every collection of durable records MUST declare how members are found: either
an authoritative index that lists members or a naming/addressing convention
that makes every member discoverable without such a list.

Checking means: Validator.

Evidence maturity: **recent**. The baseline rule was added on 2026-08-19 after
an unindexed operations collection escaped discovery.

Source: ledger, baseline `AGENTS.md` “Addressing and Discoverability”.

### C-18 — Task identities are collision-resistant and status-free

Task identities MUST be allocated from a durable register or equivalent
collision-resistant authority before a charter becomes Ready. Where sequential
human-readable identifiers are used, claims MUST be appended in strictly
ascending order and the claim MUST reach the shared trunk/identity authority
before the task freezes.

The identity register MUST record identity allocation only. It MUST NOT become a
second authority for task lifecycle state.

Checking means: Validator for register shape and ordering; git history for the
claim-before-Ready transition.

Evidence maturity: **recent** for the shared-trunk claim rule. It was added on
2026-08-19 after two actors froze different charters under the same identity.

Source: ledger, baseline `docs/TASK_WORKFLOW.md` “Task Identity” and
`docs/TASK_IDS.md`.

## Traceability and evolution

The extraction ledger is the source trace for this first specification. A
future change MAY improve wording or checking mechanics, but MUST preserve
stable requirement identifiers. Removing, weakening, or materially changing a
normative obligation requires an explicit protocol decision and migration note.

The four recently added baseline rules remain normative because DFC-0001 is a
transcription task, not a redesign task. Their lower evidence maturity is
reported in C-16, C-17, and C-18 and MUST remain visible in evidence reporting.

## Conformance report minimum

A conformance report MUST contain the protocol/specification revision, claimed
level, repository revision inspected, result for each requirement in that
level, checking means used, evidence references, and every skipped or
unavailable check with its reason.
