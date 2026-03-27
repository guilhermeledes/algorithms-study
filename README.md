# algorithms-study

Platform-agnostic study workspace for interview-style algorithm and data-structure problems.

This repository is organized around self-contained study cases. A problem may come from HackerRank, LeetCode, AlgoExpert, a screenshot, a transcript, or a custom prompt, but each problem is stored in the same neutral structure and documented with its source metadata.

The repository also uses a branch workflow designed for repeated study:

- `main` keeps the scaffolding, roadmap, metadata, and unsolved study packages.
- solved implementations should live on dedicated git worktrees, preferably on branches named `solve/<problem-slug>`.
- if you want a long-lived branch with accumulated solved work, use something like `solutions/archive`.

Worktrees should be stored under a dedicated root so they do not get mixed with sibling repositories:

- `/Users/guilhermeledes/projects/_worktrees/algorithms-study/<worktree-name>`

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
- `solve/<problem-slug>` worktree: completed or in-progress implementation for one problem
- `solutions/archive`: optional long-lived branch with accumulated solved work

Rules:

- keep `main` ready for re-study, not as the permanent home of finished solutions
- create solution branches as separate git worktrees instead of solving directly inside the main worktree
- keep challenge worktrees under `/Users/guilhermeledes/projects/_worktrees/algorithms-study/`
- prefer `Not implemented` stubs in `solution.ts` on `main` when a problem should remain unsolved there
- keep the real behavioral tests on `main` so unsolved challenges fail until they are solved in their dedicated worktrees
- keep real solution assertions on the corresponding `solve/<problem-slug>` worktree branch
- merge back only scaffold, docs, metadata, and workflow improvements if you want `main` to remain unsolved

Suggested worktree naming:

- branch: `solve/<problem-slug>`
- directory: `/Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-<problem-slug>`

Example:

```bash
git worktree add /Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-balanced-brackets -b solve/balanced-brackets
```

## Solved Problems

`main` stays scaffold-only. Completed solutions are published on the dedicated solve branches below.

| Problem | Source | Solve Branch | Study Package |
| --- | --- | --- | --- |
| Balanced Brackets | HackerRank | [`solve/balanced-brackets`](https://github.com/guilhermeledes/algorithms-study/tree/solve/balanced-brackets) | [folder](https://github.com/guilhermeledes/algorithms-study/tree/solve/balanced-brackets/studies/problems/balanced-brackets) |
| Ice Cream Parlor | HackerRank | [`solve/ice-cream-parlor`](https://github.com/guilhermeledes/algorithms-study/tree/solve/ice-cream-parlor) | [folder](https://github.com/guilhermeledes/algorithms-study/tree/solve/ice-cream-parlor/studies/problems/ice-cream-parlor) |
| Number of Matching Subsequences | Unspecified | [`solve/number-of-matching-subsequences`](https://github.com/guilhermeledes/algorithms-study/tree/solve/number-of-matching-subsequences) | [folder](https://github.com/guilhermeledes/algorithms-study/tree/solve/number-of-matching-subsequences/studies/problems/number-of-matching-subsequences) |
| Remove Islands | Unspecified | [`solve/remove-islands`](https://github.com/guilhermeledes/algorithms-study/tree/solve/remove-islands) | [folder](https://github.com/guilhermeledes/algorithms-study/tree/solve/remove-islands/studies/problems/remove-islands) |

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
