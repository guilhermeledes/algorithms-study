---
name: algorithm-study-case
description: Create or update a complete interview-study package for an algorithm or data-structure problem using this repository's platform-agnostic study layout. Use when Codex receives a problem title and statement and must generate or refine a dedicated `studies/problems/<problem-slug>/` package, create the corresponding `solve/<problem-slug>` git worktree when needed, and keep TypeScript scaffolding or solution work, lightweight tests, explanation notes, revision notes, metadata, and synchronized study indexes aligned.
---

# Algorithm Study Case

## Overview

Create a self-contained study package for one interview-style problem using this repository's conventions.

Treat the workflow as platform-agnostic by default. Problems may originate from HackerRank, LeetCode, AlgoExpert, screenshots, transcripts, or custom prompts. Preserve original source details in study metadata and Markdown, not in the filesystem layout.

Optimize for interview readiness, not just correctness: make the solution or scaffold easy to explain, compare brute force against the final approach when relevant, and leave behind compact revision material for later review.

## Inputs

Expect these inputs when available:

- `problem_title`
- `problem_statement`
- optional `source_platform`
- optional `source_path`
- optional `source_url`
- optional `examples`
- optional `constraints`
- optional `notes`
- optional `difficulty`
- optional `tags`
- optional `status`
- optional `target_branch_role`

Interpretation rules:

- `source_platform` may be values such as `HackerRank`, `LeetCode`, `AlgoExpert`, `Unspecified`, or another explicit source.
- If a HackerRank learning path is provided, preserve it exactly in Markdown and metadata using the original hierarchy format, for example `Prepare > Data Structures > Stacks > Balanced Brackets`.
- If `target_branch_role` is missing, infer it from the repository workflow:
  - on `main`, default to scaffold-first output
  - on a branch such as `solve/<problem-slug>`, default to a solved implementation
- If optional fields are missing, continue with reasonable assumptions and record them when they materially affect the explanation, metadata, or test coverage.

## Workflow

### 1. Normalize the problem

- Read the statement carefully before writing code.
- Infer the input and output contract explicitly.
- Detect whether the source platform requires a specific function signature. If yes, use that exact signature in `solution.ts`.
- Identify the likely pattern and whether a brute-force baseline is worth explaining.
- Preserve the original source taxonomy, URL, or prompt context when it is available.
- Note ambiguity early and carry those assumptions into `explanation.md` or `meta.md`.

### 2. Decide scaffold mode versus solved mode

- If the current branch is `main`, treat the study package as scaffold-first unless the user explicitly says otherwise.
- On `main`, prefer `Not implemented` stubs in `solution.ts` when the repository should preserve the problem for later practice.
- On `main`, keep tests aligned with the scaffold state by skipping unsolved suites or asserting stub behavior.
- If the current branch matches `solve/<problem-slug>` or the user explicitly asks for a real implementation, write the solved code and real assertions.
- Do not silently put completed solutions on `main` if the repository workflow says `main` should remain unsolved.

### 3. Create the solve worktree when a new challenge is introduced

When a new challenge is being added to the repository, also create the dedicated solve worktree unless it already exists.

Worktree rules:

- use branch name `solve/<problem-slug>`
- create the worktree under `/Users/guilhermeledes/projects/_worktrees/algorithms-study/`
- use directory name `/Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-<problem-slug>`
- if the worktree already exists, reuse it instead of creating a duplicate
- if the current task is only refining metadata or docs for an existing problem, do not create another worktree

Preferred command:

```bash
git worktree add /Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-<problem-slug> -b solve/<problem-slug>
```

If the branch already exists but the worktree does not, use:

```bash
git worktree add /Users/guilhermeledes/projects/_worktrees/algorithms-study/solve-<problem-slug> solve/<problem-slug>
```

If worktree creation fails because the branch or path is already in use, inspect existing worktrees and reuse or report the conflict clearly instead of guessing.

### 4. Create or update the study directory

Create or update:

- `studies/problems/<slugified-problem-title>/`

Path rules:

- use one folder per problem
- lowercase the slug
- separate words with `-`
- remove punctuation
- keep the slug short but unambiguous
- do not encode source platform hierarchy into the directory tree

Create or update exactly these files inside it:

1. `solution.ts`
2. `solution.test.ts`
3. `explanation.md`
4. `notes.md`
5. `meta.md`

Also create or update:

- `studies/index.md`
- `studies/roadmap.md` only when the plan actually changes

## Output Rules

- Never stop at code only.
- Always generate the five per-problem files plus required index updates.
- Prefer readability over cleverness.
- Prefer the easiest asymptotically sound approach to explain live.
- Keep explanations didactic and compact.
- Keep notes highly scannable.
- Make the package useful under interview pressure and later review.
- Preserve source details in `meta.md` and Markdown rather than in the directory tree.
- Follow this repository's scaffold-only `main` branch model unless the user explicitly requests a different workflow.
- When creating a new challenge, create or confirm the corresponding solve worktree as part of the task, not as a separate optional follow-up.

## File Guidance

### `solution.ts`

Implement TypeScript with interview-friendly naming and minimal abstraction.

If the branch should remain scaffold-only:

- export the expected functions
- use explicit `Not implemented` stubs where appropriate
- document that the file is intentionally scaffolded for later practice

If the branch is a solve branch:

- implement the final solution
- keep comments focused on reasoning and interview explanation

Include comments only when they add value, such as:

- the main idea
- the pattern
- why the chosen data structure fits
- how the reasoning moves from brute force to the final approach
- important edge cases
- time complexity
- space complexity

If brute force is relevant, explain it briefly in comments or Markdown, then explain why the final version is better.

If the source platform expects a fixed function name or signature, use it exactly and mention that choice in comments. Otherwise prefer a clear problem-specific function name.

### `solution.test.ts`

Write a lightweight TypeScript practice test file.

- Use the repository's existing test tooling and style.
- Import the solution directly.
- Prefer one shared `cases` table reused across implementations.
- Cover normal cases, edge cases, and at least one tricky case.
- Keep it runnable and easy to read.

Branch-aware behavior:

- on `main`, keep tests passing while preserving the unsolved scaffold state
- on solve branches, enable the real behavioral assertions for the completed implementation

### `explanation.md`

Use exactly this heading structure:

```md
# <Problem Title>

## Problem Summary
## Pattern
## Recognition Clues
## Brute Force Approach
## Optimized Approach
## Core Idea
## Step-by-Step Reasoning
## Data Structures Used
## Algorithm
## Complexity
## Edge Cases
## Common Mistakes
## How to Explain It Live
## Interview Notes
```

Content rules:

- explain the problem in plain language
- name the main pattern explicitly
- include the original source path or source note when available
- show how to recognize the pattern from the prompt
- compare naive and optimized thinking when applicable
- keep the spoken explanation realistic for a 30-60 second interview answer
- include mistakes and edge cases that matter in implementation
- if the branch is scaffold-only, it is still acceptable for the explanation to describe the intended final reasoning

For `## Complexity`, always format as:

- `Time:`
- `Space:`

### `notes.md`

Use exactly this heading structure:

```md
# Quick Notes

## Difficulty
## Tags
## Pattern
## Recognition Clues
## Template
## Things to Memorize
## Pitfalls
## Variants
## Self-Check Questions
## Flashcards
```

Content rules:

- keep it short
- optimize for quick recall
- make flashcards concrete, not generic
- keep tags and variants useful for interview prep
- include the original source path when available so the study note preserves source context

Under `## Self-Check Questions`, include exactly these prompts:

- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

Under `## Flashcards`, include these question forms:

- `Q: What pattern does this problem use?`
- `Q: What is the key optimization?`
- `Q: What data structure makes the solution efficient?`
- `Q: What is the most important edge case?`

### `meta.md`

Use this structure:

```md
# Metadata

- Title: <Problem Title>
- Slug: `<problem-slug>`
- Source: <Source Platform>
- Original Path: <Original taxonomy path or Unknown>
- Source URL: <URL or omit when unknown>
- Difficulty: <Difficulty or Unknown>
- Tags: tag-one, tag-two
- Pattern Group: <Pattern Group>
- Pattern: <Pattern>
- Status: <scaffolded|studied|reviewed|unknown>
```

Rules:

- prefer `Unspecified` when the source platform is unknown
- preserve the original HackerRank path exactly when it is available
- omit `Source URL` only when there is no reliable URL
- on `main`, default `Status` to `scaffolded` for unsolved work
- on solve branches, use a status such as `studied` when the package is actually complete

### `studies/index.md`

If the file does not exist, create:

```md
# Study Index

| Problem | Source | Difficulty | Tags | Pattern Group | Pattern | Status | Directory |
| --- | --- | --- | --- | --- | --- | --- | --- |
```

Append or update one row per problem using the current repository format:

```md
| Balanced Brackets | HackerRank | Easy | stack, strings | Stack | stack | scaffolded | studies/problems/balanced-brackets/ |
```

Keep the directory column platform-agnostic.

### `studies/roadmap.md`

- update this file only when the request changes future study planning
- do not modify it for routine solution-only work
- keep roadmap entries separated from the completed-study index

## Reasoning Standards

For every problem:

- identify the core pattern explicitly
- preserve original source context when the prompt includes it
- compare brute force versus optimized reasoning when that comparison teaches something useful
- explain why the selected data structure is appropriate
- choose the solution that is easiest to communicate while remaining asymptotically sound
- mention pitfalls that commonly appear in interviews
- make the final package enough for later self-review without rereading the original prompt
- respect the repository branch model so solved work and scaffold work do not get mixed accidentally

## Implementation Preferences

- Use clean, idiomatic TypeScript.
- Prefer explicit variable names.
- Avoid unnecessary abstractions and helper layers.
- Keep code comments useful, not noisy.
- If the problem is ambiguous, document the assumptions in Markdown instead of stalling.
- If multiple optimized solutions exist, choose the one with the best explainability-to-performance ratio.
- Follow repository-local conventions over generic skill defaults when the repository already documents them in `AGENTS.md`.

## Final Response Contract

When using this skill, return:

1. the directory path created or updated
2. the worktree branch and path created or reused, when applicable
3. the list of files created or updated
4. a concise summary of whether the work was scaffold-only or a solved implementation
5. validation status if tests or type checks were run

Do not default to dumping the full contents of every file unless the user explicitly asks for them.
