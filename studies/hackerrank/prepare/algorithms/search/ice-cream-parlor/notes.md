# Quick Notes

## Difficulty
Easy

## Tags
arrays, hashing, two-sum, search

## Pattern
Two-sum with a cost-to-indices hash map.

## Recognition Clues
- HackerRank path: `Prepare > Algorithms > Search > Ice Cream Parlor`
- Need exactly two numbers that sum to a target
- Output asks for indices, not values
- Unique answer guarantee means one clean return path

## Template
Brute force:
Try every pair of indices `(i, j)` with `i < j`.

Optimized:
Store cost -> all 1-based indices.
For each unique cost, check whether `m - cost` exists.
If the complement is the same cost, use the first two stored indices.

## Things to Memorize
- This is a direct two-sum pattern.
- Store indices as 1-based if the platform expects them that way.
- If `m - cost === cost`, you need at least two indices for that price.
- Return exactly two indices even if the same price appears many times.
- Return indices in ascending order.

## Pitfalls
- Accidentally returning prices instead of positions
- Returning 0-based indices
- Using one flavor twice when the same cost appears only once
- Returning all duplicate indices instead of only the first two valid ones
- Mishandling duplicate costs like `[2, 2, 4, 3]`

## Variants
- Two Sum
- Pair with given sum
- Count pairs with target sum
- Unsorted array complement lookup problems

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Two-sum with a hash map from cost to its indices.
- Q: What is the key optimization?
  A: Replace pair scanning with complement lookups after preprocessing costs into a map.
- Q: What data structure makes the solution efficient?
  A: A map from cost to its 1-based index list.
- Q: What is the most important edge case?
  A: Duplicate costs, because the answer can require the same numeric value at two different indices.
