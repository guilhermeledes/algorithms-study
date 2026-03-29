# Quick Notes

## Difficulty
Medium

## Tags
arrays, dynamic-programming, greedy, kadane, subsequence

## Pattern
Kadane for contiguous sum, greedy positive accumulation for subsequence.

## Recognition Clues
- "Maximum subarray" usually means Kadane.
- One answer requires contiguity and the other does not.
- The all-negative case decides whether `0` is illegal.
- Source: HackerRank `The Maximum Subarray`

## Template
For subarray:
keep `currentBest` and `globalBest`
restart when the current prefix becomes worse than starting fresh

For subsequence:
sum all positive numbers
if none exist, return the maximum element

## Things to Memorize
- Kadane decides between `value` and `current + value`.
- Subsequence answer is not DP-heavy here; it is mostly greedy.
- All-negative input is the main trap.
- Contiguous and non-contiguous answers can differ a lot after a large negative dip.

## Pitfalls
- Returning `0` for arrays like `[-3, -2, -5]`
- Forgetting the subsequence must be non-empty
- Confusing subarray and subsequence rules
- Not tracking the maximum element while summing positives

## Variants
- Kadane with start/end indices
- Circular subarray sum
- Maximum product subarray
- Best time to buy and sell stock

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Kadane's algorithm for the contiguous answer, plus greedy positive accumulation for the subsequence answer.
- Q: What is the key optimization?
  A: Replace all subarray enumeration with one running best-vs-extend decision at each index.
- Q: What data structure makes the solution efficient?
  A: No special data structure; just running numeric state over the array.
- Q: What is the most important edge case?
  A: An all-negative array, where both answers must be the largest element instead of `0`.
