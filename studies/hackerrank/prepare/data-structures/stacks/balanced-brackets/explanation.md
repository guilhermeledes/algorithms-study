# Balanced Brackets

## Problem Summary
Given a string containing only `()`, `[]`, and `{}`, return `YES` if every opening bracket is closed by the correct type in the correct order. Otherwise return `NO`.

HackerRank Path: `Prepare > Data Structures > Stacks > Balanced Brackets`

## Pattern
Stack / balanced delimiter matching.

## Recognition Clues
- The input is a sequence of opening and closing symbols.
- Order matters, not just counts.
- Nested structure must be validated from the inside out.
- The prompt asks whether brackets are "balanced", which is a classic stack signal.

## Brute Force Approach
One naive idea is to repeatedly remove direct pairs like `()`, `[]`, and `{}` from the string until either:
- the string becomes empty, or
- no more replacements are possible.

Concrete brute-force loop:
- start with the original string
- replace all occurrences of `()`, `[]`, and `{}` with the empty string
- if the string changed, repeat
- if it stops changing, the answer is `YES` only when the string is now empty

That can work, but it repeatedly scans and rebuilds the string, so it trends toward `O(n^2)` time in the worst case and is less natural to explain than the stack solution.

## Optimized Approach
Scan left to right once:
- push opening brackets onto a stack
- when a closing bracket appears, pop the stack and verify the types match
- if they do not match, return `NO` immediately
- after the scan, return `YES` only if the stack is empty

## Core Idea
The most recent unmatched opening bracket must be the first one closed next. That is exactly LIFO behavior, so a stack is the right data structure.

## Step-by-Step Reasoning
1. Start with an empty stack.
2. For each character:
3. If it is an opening bracket, push it.
4. If it is a closing bracket, the stack must not be empty.
5. Pop the top opening bracket and verify it is the matching type.
6. If any mismatch happens, the string is unbalanced.
7. After processing all characters, any remaining opening brackets mean the string is unbalanced.
8. Otherwise it is balanced.

## Data Structures Used
- `string[]` stack to store unmatched opening brackets
- lookup map from closing bracket to expected opening bracket
- set of opening brackets for quick membership checks

## Algorithm
1. Create a map: `)` -> `(`, `]` -> `[`, `}` -> `{`.
2. Traverse the string once.
3. Push opening brackets onto the stack.
4. For each closing bracket:
5. Pop the stack.
6. Compare the popped value with the expected opening bracket from the map.
7. If they differ, return `NO`.
8. When traversal ends, return `YES` if the stack is empty, otherwise `NO`.

## Complexity
- Time: `O(n)`
- Space: `O(n)`

Brute-force reference:
- Time: `O(n^2)` worst case
- Space: `O(n)` because each replacement pass builds a new string

## Edge Cases
- A closing bracket appears first, like `"]"`.
- Types cross, like `"([)]"`.
- The string ends with unmatched openings, like `"{[("`.
- Deeply nested but valid input, like `"{{[[(())]]}}"`.
- For local study purposes, an empty string is balanced because it contains no unmatched brackets.

## Common Mistakes
- Checking only counts of each bracket type instead of order.
- Forgetting to reject a closing bracket when the stack is empty.
- Forgetting to check that the stack is empty after the loop.
- Using the wrong matching direction and comparing closers to closers.

## How to Explain It Live
This is a stack problem. Every time I see an opening bracket, I push it. Every time I see a closing bracket, it must match the most recent unmatched opener, so I pop and compare. If there is any mismatch or I try to close before opening, the answer is `NO`. If I finish and the stack is empty, the sequence is balanced.

## Interview Notes
The key insight is that nesting creates a last-opened, first-closed relationship. That makes a stack more appropriate than counting. This solution is easy to reason about, easy to code under pressure, and optimal for a single pass.
