# Quick Notes

## Difficulty
Easy

## Tags
stack, strings, parsing, balanced-parentheses

## Pattern
Stack matching for nested delimiters.

## Recognition Clues
- Opening and closing symbols
- Nested validity matters
- Need to validate recent unmatched opener first
- HackerRank Path: `Prepare > Data Structures > Stacks > Balanced Brackets`

## Template
Use a stack.
Push openers.
On a closer, pop and compare expected opener.
If mismatch or empty stack, fail.
At the end, stack must be empty.

Brute-force fallback:
Repeatedly remove `()`, `[]`, `{}` until the string stops changing.

## Things to Memorize
- Order matters more than counts.
- Stack models "most recent unmatched opener".
- Final empty-stack check is mandatory.
- Brute force is "repeated pair removal", but it is slower than the stack pass.

## Pitfalls
- Accepting correct counts with wrong order like `([)]`
- Forgetting the empty-stack case for an early closer
- Forgetting leftover openers

## Variants
- Valid Parentheses
- Remove minimum invalid parentheses
- Longest valid parentheses
- HTML/XML tag matching

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Stack-based delimiter matching.
- Q: What is the key optimization?
  A: Replace repeated string reductions with one left-to-right stack pass.
- Q: What data structure makes the solution efficient?
  A: A stack of opening brackets.
- Q: What is the most important edge case?
  A: A closing bracket appearing when the stack is empty or mismatched nesting like `([)]`.
