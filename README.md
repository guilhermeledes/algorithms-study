# algorithms-study

Platform-agnostic study workspace for interview-style algorithm and data-structure problems.

This repository is organized around self-contained study cases. A problem may come from HackerRank, LeetCode, AlgoExpert, a screenshot, a transcript, or a custom prompt, but each problem is stored in the same neutral structure and documented with its source metadata.

The repository also uses a branch workflow designed for repeated study:

- `main` keeps the scaffolding, roadmap, metadata, and unsolved study packages.
- solved implementations should live on dedicated branches, preferably `solve/<problem-slug>`.
- if you want a long-lived branch with accumulated solved work, use something like `solutions/archive`.

## Stack

- TypeScript
- Vitest
- `pnpm`
- Node.js `>=22`

## Repository Layout

```text
studies/
  index.md
  roadmap.md
  problems/
    <problem-slug>/
      explanation.md
      meta.md
      notes.md
      solution.test.ts
      solution.ts
```

Key files:

- `studies/index.md`: inventory of completed or in-progress study cases
- `studies/roadmap.md`: future study plan grouped by pattern
- `studies/problems/<problem-slug>/meta.md`: source platform, original path or URL, tags, difficulty, and status

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run all validation:

```bash
pnpm verify
```

Other useful commands:

```bash
pnpm test
pnpm study:test
pnpm test:watch
pnpm check-types
```

## Adding a New Problem

1. Create a folder under `studies/problems/<problem-slug>/`.
2. Add these files:
   - `solution.ts`
   - `solution.test.ts`
   - `explanation.md`
   - `notes.md`
   - `meta.md`
3. Record the source platform and original taxonomy or URL in `meta.md`.
4. Keep the implementation interview-friendly and TypeScript-first.
5. Add lightweight local validation in `solution.test.ts`.
6. Update `studies/index.md`.
7. Update `studies/roadmap.md` only if the future study plan changed.

## Branch Workflow

Use this branch model by default:

- `main`: scaffold-only branch for future practice
- `solve/<problem-slug>`: completed or in-progress implementation for one problem
- `solutions/archive`: optional long-lived branch with accumulated solved work

Rules:

- keep `main` ready for re-study, not as the permanent home of finished solutions
- prefer `Not implemented` stubs in `solution.ts` on `main` when a problem should remain unsolved there
- keep tests on `main` aligned with the scaffold state by skipping unsolved suites or asserting stub behavior
- keep real solution assertions on the corresponding `solve/<problem-slug>` branch
- merge back only scaffold, docs, metadata, and workflow improvements if you want `main` to remain unsolved

## Study Package Conventions

- Use one folder per problem.
- Keep platform details in `meta.md` and study docs, not in the folder hierarchy.
- When applicable, include both brute-force and optimized implementations.
- Prefer explicit exports such as `<problemName>Brute` and `<problemName>Optimized`.
- Reuse a shared `cases` table in tests when the same expectations apply to multiple implementations.
- On `main`, prefer scaffold-friendly stubs and tests over completed implementations.

## Current Focus

The current repository emphasizes:

- pattern recognition
- interview-ready explanations
- lightweight repeatable validation
- durable notes for later review

## Contributing

- Keep structural changes small and consistent with the current layout.
- Prefer one source of truth per topic.
- Use Conventional Commits for git messages, for example `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`, or `chore: ...`.
- If you change repository conventions, update `AGENTS.md` and this README together.
