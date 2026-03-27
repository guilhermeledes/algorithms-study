# AGENTS.md

## Repository Overview

This repository is a coding-practice workspace for interview-style algorithm and data-structure problems. It is platform-agnostic by default: problems may originate from HackerRank, LeetCode, AlgoExpert, screenshots, transcripts, or handwritten prompts, but the repository stores them in one neutral study layout.

The default workflow is TypeScript-first. Keep validation lightweight and local to each problem. Do not assume there is an application, service, deployment flow, or broader platform architecture.

The branch model is intentional:

- `main` is the scaffold branch and should keep problem folders ready for future practice rather than storing completed solutions.
- Completed or in-progress solved implementations should live on separate branches, preferably named `solve/<problem-slug>`, and those branches should be created and used through separate git worktrees.
- Store challenge worktrees under `/Users/guilhermeledes/projects/_worktrees/algorithms-study/` so worktrees from different repositories do not mix together.
- If a long-lived branch is ever used to accumulate solved work, prefer a name such as `solutions/archive`.

## Where To Start

At the beginning of each session:

1. Inspect the repository contents and `git status`.
2. Read this `AGENTS.md` before making structural changes.
3. Identify whether the task is:
   - adding a new problem
   - refining an existing solution
   - tightening or extending repository conventions
4. Follow the default study layout in this file unless the repository later documents an exception.
5. Preserve original source details when they are available, but keep them in metadata and study materials rather than in the folder hierarchy.
6. Add only the minimum new structure needed for the task at hand.

## Workflow

Use this sequence unless the repository later adopts a more specific documented workflow:

1. Inspect current repository state and existing conventions.
2. Create or update a study case under `studies/problems/<problem-slug>/`.
3. Capture the problem summary, source platform, original source path or URL when known, constraints, examples, assumptions, and acceptance expectations in the study-case materials.
4. Implement the smallest TypeScript solution that satisfies those expectations.
5. Add or run lightweight problem-level validation alongside the solution.
6. Update `studies/index.md` when a new problem study case is added or its status changes.
7. Update `studies/roadmap.md` only when planned-study ordering or future target problems actually change.
8. When a problem naturally has a brute-force baseline and a stronger optimized approach, preserve both explicitly in code and tests.
9. Promote repeated structural conventions into repository docs only after they become stable across multiple problems.

When working against `main`:

1. Treat `main` as the branch for reusable scaffolding and study planning.
2. Keep `solution.ts` scaffolded with explicit stubs such as `Not implemented` when the actual solution should remain unsolved on `main`.
3. Keep the real behavioral tests on `main` even when the implementation is scaffolded, so unsolved challenges fail loudly until they are solved in their dedicated worktrees.
4. Use a dedicated git worktree on a branch such as `solve/<problem-slug>` for real solved implementations and finished solution notes, and place that worktree under `/Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-<problem-slug>`.
5. Merge back only scaffold improvements, metadata improvements, or workflow/docs changes if `main` must remain unsolved.

Testing command rules:

- On `main`, keep `test` and `test:watch` global so they cover the full repository and expose unsolved scaffold failures.
- In each `solve/<problem-slug>` worktree, scope both `test` and `test:watch` to `studies/problems/<problem-slug>` so the worktree stays green for its own challenge only.
- Do not add duplicate testing aliases such as `study:test` or `study:file`.

## Repository Layout

The default study layout is:

- `studies/index.md`
- `studies/roadmap.md`
- `studies/problems/<problem-slug>/`

Each problem directory should contain this standard study package:

- `solution.ts`
- `solution.test.ts`
- `explanation.md`
- `notes.md`
- `meta.md`

Layout rules:

- Use one folder per problem under `studies/problems/`.
- Use lowercase slugified problem names with words separated by `-`.
- Keep source-platform details in `meta.md` and the study Markdown files, not in the directory tree.
- Preserve the original source taxonomy or URL when it is known.
- If the source is unknown or informal, record that explicitly in `meta.md`.
- Keep problem scaffolds on `main` even when solved implementations exist on separate branches.
- Keep temporary scratch work out of the study directory.
- If the repository later adds other languages, document that explicitly before changing the default TypeScript-first layout.

## Durable Operating Rules

- `AGENTS.md` defines repository operating guidance, not problem-specific requirements.
- Treat the standard study package as the default contract for each problem in this repository.
- Keep problem requirements, assumptions, and acceptance expectations in the study-case materials.
- Add validation alongside each solution whenever practical.
- On `main`, prefer validation that preserves the real behavioral expectations, even if that means unsolved challenges fail with `Not implemented`.
- Do not invent formal process artifacts before there is repeated need for them.
- Promote repeated conventions into docs only after they become stable across more than one problem.
- Prefer one source of truth per topic.
- Keep structural changes small and consistent with the repository's current maturity.
- Prefer interview-friendly TypeScript solutions over clever or highly abstract implementations.

## Sources Of Truth

Current source of truth:

- `AGENTS.md`: durable repository operating instructions for future agents
- `studies/index.md`: global index of completed or in-progress study cases
- `studies/roadmap.md`: future problem checklist and prioritization
- `README.md`: public-facing overview, including the solved-problems branch table

Required study-case artifacts for each problem:

- `studies/problems/<slug>/solution.ts`: TypeScript implementation used for interview practice
- `studies/problems/<slug>/solution.test.ts`: lightweight local validation
- `studies/problems/<slug>/explanation.md`: didactic explanation of brute force, optimized reasoning, pattern, and interview framing
- `studies/problems/<slug>/notes.md`: compact revision sheet for later review
- `studies/problems/<slug>/meta.md`: canonical metadata including source platform and original taxonomy or URL when known

Preferred study-case code and test pattern when applicable:

- In `solution.ts`, export separate brute-force and optimized functions when the problem meaningfully supports both approaches.
- Use explicit names such as `<problemName>Brute` and `<problemName>Optimized` instead of overloading one function name with changing meaning.
- If `main` should remain unsolved, scaffold future implementations with a `Not implemented` stub rather than omitting the export.
- In `solution.test.ts`, define one shared `cases` table and reuse it across implementations.
- Prefer looped `describe` blocks over hand-written duplicated tests when the same expectations should hold for multiple implementations.
- On `main`, keep the real test expectations present so scaffolded implementations fail until they are solved in their dedicated worktrees.
- On solution worktrees, enable the real behavioral assertions for the solved implementation and scope both `test` and `test:watch` to that worktree's own problem folder.

## Session Discipline

### Start

- Inspect repository contents before adding structure.
- Read `AGENTS.md` before changing conventions.
- Match any new study work to `studies/problems/<problem-slug>/`.
- Preserve source details exactly when they are provided in the prompt or source material.
- Confirm whether the current task is intended for scaffold-only `main` or for a dedicated `solve/<problem-slug>` worktree.

### End

- Ensure any new structure remains consistent with this file.
- Run the relevant lightweight validation for changed study cases.
- When multiple implementations exist, verify which suites are expected to pass and which are intentionally scaffolded.
- Update `studies/index.md` status entries to reflect the final state of the study case.
- Update `studies/roadmap.md` only when planning data changed.
- Update the solved-problems table in `README.md` whenever a challenge gains or loses a public solve branch.
- Update documentation only when the change introduces a durable convention.
- Do not merge solved implementations back into `main` unless the repository workflow is intentionally being changed.

## Parallel Work

Parallel work is not currently operationally necessary in this repository, but default guardrails apply if multiple branches or sessions are used:

- Keep parallel work scoped to disjoint problem folders whenever possible.
- Do not change shared naming or layout conventions casually in parallel.
- Reconcile structural convention changes before broad repository reorganization.

## Change Discipline

- Keep `AGENTS.md`, future `README.md`, and any future templates aligned as the repository matures.
- Keep the repo-local skill at `.codex/skills/algorithm-study-case/SKILL.md` aligned with the repository workflow when study-package conventions change.
- Update workflow guidance only when repository practice has actually changed.
- Do not treat assumptions in this file as permanent decisions.
- Capture new durable rules once they recur often enough to be worth standardizing.
- Keep source-specific details attached to the relevant problem, not baked into global structure.
- Keep scaffold conventions consistent once they recur, especially shared case tables and explicit brute/optimized export naming.
- Use `solve/<problem-slug>` as the default naming pattern for worktree branches that contain completed solutions.
- Keep the solved-problems table in `README.md` aligned with the actual published `solve/*` branches.
- Use Conventional Commits for every git commit message, such as `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`, or `chore: ...`.

## Current State

- TypeScript, Vitest, and local problem-level validation are already configured.
- The current study folders live under `studies/problems/`.
- `main` is intended to preserve reusable scaffolding and study planning rather than act as the long-lived home for finished solutions.
- The repository intentionally stays lightweight and does not require extra process files beyond the study materials and top-level indexes.
