# AGENTS.md

## Repository Overview

This repository is a coding-practice workspace for HackerRank-style algorithm and problem-solving tasks. It is intended to hold self-contained study packages with problem solutions, lightweight validation, explanation material, revision notes, durable workflow guidance, and the original HackerRank learning path context for future agent sessions.

The default study workflow in this repository is TypeScript-first. Unless a task explicitly says otherwise, implement solutions in TypeScript and keep validation lightweight and local to each study case. Do not assume the presence of an application, service, deployment flow, or broader platform architecture.

## Where To Start

At the beginning of each session:

1. Inspect the repository contents and `git status`.
2. Read this `AGENTS.md` before making structural changes.
3. Identify whether the task is:
   - adding a new problem
   - refining an existing solution
   - tightening or extending repository conventions
4. Follow the default study layout in this file unless the repository later documents an exception.
5. Preserve the HackerRank path when it is available, for example `Prepare > Data Structures > Stacks > Balanced Brackets`.
6. Add only the minimum new structure needed for the task at hand.

## Workflow

Use this operating sequence unless the repository later adopts a more specific documented workflow:

1. Inspect current repository state and existing conventions.
2. For each problem, create or update a study case under a directory that mirrors the HackerRank path, such as `studies/hackerrank/prepare/data-structures/stacks/balanced-brackets/`.
3. Capture the problem statement or source, constraints, examples, assumptions, acceptance expectations, and HackerRank path in the study-case materials.
4. Implement the smallest TypeScript solution that satisfies those expectations.
5. Add or run lightweight problem-level validation alongside the solution.
6. Update `studies/hackerrank/index.md` when a new problem study case is added.
7. Promote repeated structural conventions into repository docs only after they become stable across multiple problems.
8. If future handoff or spec files are introduced, record continuity there rather than in `AGENTS.md`.

Some workflow artifacts referenced here may be added later. They are expected future patterns, not current required files.

## Repository Layout

The repository is intentionally minimal right now. The default study layout is:

- `studies/hackerrank/<slugified-hackerrank-path>/`
- `studies/hackerrank/index.md`

Example:

- `Prepare > Data Structures > Stacks > Balanced Brackets`
- `studies/hackerrank/prepare/data-structures/stacks/balanced-brackets/`

Each problem directory should contain this standard study package:

- `solution.ts`
- `solution.test.ts`
- `explanation.md`
- `notes.md`

Layout rules:

- Use one folder per problem under `studies/hackerrank/`.
- Mirror the HackerRank hierarchy in the directory structure when that path is known.
- Keep the standard five study files together in that folder.
- Use lowercase slugified directory names with words separated by `-` for each path segment.
- Keep temporary scratch work out of the study directory.
- If the repository later adds other languages, document that explicitly before changing the default TypeScript-first layout.
- Preserve the original HackerRank taxonomy path in the study materials when it is known, using the exact hierarchy format `Prepare > Category > Subcategory > Problem`.
- If the HackerRank path is unknown, fall back to `studies/hackerrank/<slugified-problem-title>/`.

## Durable Operating Rules

- `AGENTS.md` defines repository operating guidance, not problem-specific requirements.
- Treat the standard study package as the default contract for each HackerRank problem in this repository.
- Keep problem requirements, assumptions, and acceptance expectations in the study-case materials.
- Record the original HackerRank taxonomy path when available instead of replacing it with an invented local pattern label.
- Add validation alongside each solution whenever practical.
- Do not invent formal process artifacts before there is repeated need for them.
- Promote repeated conventions into docs only after they become stable across more than one problem.
- Prefer one source of truth per topic.
- Keep structural changes small and consistent with the repository's current maturity.
- Prefer interview-friendly TypeScript solutions over clever or highly abstract implementations.

## Sources Of Truth

Current source of truth:

- `AGENTS.md`: durable repository operating instructions for future agents
- `studies/hackerrank/index.md`: global index of completed study cases once it exists

Required study-case artifacts for each problem:

- `studies/hackerrank/<path>/solution.ts`: TypeScript implementation used for interview practice
- `studies/hackerrank/<path>/solution.test.ts`: lightweight local validation
- `studies/hackerrank/<path>/explanation.md`: didactic explanation of brute force, optimized reasoning, pattern, and interview framing
- `studies/hackerrank/<path>/notes.md`: compact revision sheet for later review
- study-case Markdown files: the place to preserve the original HackerRank path such as `Prepare > Data Structures > Stacks > Balanced Brackets`

Other future sources of truth, if and when they are introduced:

- `README.md`: repository overview and contributor-facing quick start
- future handoff or spec files: continuity and task-specific behavior details

These supporting files do not currently exist and should not be treated as present until they are actually added.

## Session Discipline

### Start

- Inspect repository contents before adding structure.
- Read `AGENTS.md` before changing conventions.
- Match any new study work to the mirrored HackerRank directory layout and standard file set.
- Preserve the HackerRank path exactly when it is provided in the prompt or source material.

### End

- Ensure any new structure remains consistent with this file.
- Run the relevant lightweight validation for changed study cases.
- Update documentation only when the change introduces a durable convention.
- Update `studies/hackerrank/index.md` whenever a new study case is added.
- Put continuity notes in designated future handoff files if those are later added; do not store session state in `AGENTS.md`.

## Parallel Work

Parallel work is not currently operationally necessary in this repository, but default guardrails apply if multiple branches or sessions are used:

- Keep parallel work scoped to disjoint problem folders whenever possible.
- Do not change shared naming or layout conventions casually in parallel.
- Reconcile structural convention changes before broad repository reorganization.

## Change Discipline

- Keep `AGENTS.md`, future `README.md`, and any future templates aligned as the repository matures.
- Keep `AGENTS.md` aligned with the `hackerrank-study-case` skill workflow if that skill remains the default way this repository is populated.
- Update workflow guidance only when repository practice has actually changed.
- Do not treat assumptions in this file as permanent decisions.
- Capture new durable rules once they recur often enough to be worth standardizing.
- Keep naming and categorization aligned with HackerRank's own hierarchy when that information is available.

## Open Ambiguities

The following points are assumptions or unresolved setup decisions, not settled facts:

- TypeScript is the current default study language, but no project-wide toolchain or runner has been added yet
- the standard study layout is defined, but no study cases have been created yet
- no `README.md`, spec files, handoff files, or templates exist yet
- no remote or formal collaboration model is configured
- the repository is assumed to be for coding-practice work based on its name and current workflow decisions
