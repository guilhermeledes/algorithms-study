# The Maximum Subarray

## Problem Summary
Given an integer array, return two values:
- the largest possible sum of any non-empty contiguous subarray
- the largest possible sum of any non-empty subsequence

Source: HackerRank

This is the HackerRank problem usually titled `The Maximum Subarray`. The prompt distinguishes between contiguous picks for the subarray answer and any non-empty subset of elements for the subsequence answer.

## Pattern
Kadane's algorithm for the subarray part, plus greedy accumulation for the subsequence part.

## Recognition Clues
- The prompt asks for the best sum over all contiguous segments.
- "Maximum subarray" is a classic Kadane signal.
- The subsequence answer is separate and allows skipping values freely.
- The input may contain all-negative values, so the answer cannot default to `0`.

## Brute Force Approach
For the maximum subarray:
- start each subarray at every index
- extend it to the right
- keep a running sum
- track the best total seen

That gives `O(n^2)` time if you accumulate incrementally.

For the maximum subsequence:
- the literal brute-force method is to inspect every non-empty subset and take the largest sum
- that is `O(2^n)` and is not practical

This brute-force split is useful conceptually because it shows the two outputs behave differently.

## Optimized Approach
Compute the two answers independently in one pass:
- for the subarray answer, use Kadane's algorithm
- for the subsequence answer, add every positive value
- if there are no positive values, use the largest element for both answers

## Core Idea
The contiguous answer depends on whether extending the current segment still helps, which is exactly what Kadane tracks. The subsequence answer is easier: once contiguity is removed, every positive number helps and every negative number hurts, unless all values are negative.

## Step-by-Step Reasoning
1. Initialize the best subarray sum and current running subarray sum with the first element.
2. For each next value, decide whether to start fresh at that value or extend the current segment.
3. Update the global best subarray sum after each step.
4. Separately track the sum of positive values for the subsequence answer.
5. Also track the maximum element in case the array is all negative.
6. If at least one positive number exists, the subsequence answer is the sum of positives.
7. Otherwise, the subsequence answer is the maximum element.

## Data Structures Used
- A few numeric variables for running totals and best-so-far values
- No extra data structure is required beyond the input array

## Algorithm
1. Set `bestSubarray` and `currentSubarray` to `arr[0]`.
2. Set `maxElement` to `arr[0]`.
3. Set `positiveSum` to `0`.
4. Iterate through the array:
5. Update `currentSubarray = max(value, currentSubarray + value)`.
6. Update `bestSubarray = max(bestSubarray, currentSubarray)`.
7. If the value is positive, add it to `positiveSum`.
8. Update `maxElement = max(maxElement, value)`.
9. The subsequence answer is `positiveSum` when it is non-zero, otherwise `maxElement`.
10. Return both answers.

## Complexity
- Time: `O(n)`
- Space: `O(1)`

Brute-force reference:
- Time: `O(n^2)` for the subarray baseline, `O(2^n)` for the literal subsequence baseline
- Space: `O(1)` excluding subset enumeration details

## Edge Cases
- All values are negative, so both answers should be the single least-negative element.
- Zeros mixed with negatives should not force the answer negative if `0` is the best subarray.
- A large negative gap can split the best contiguous run from the best subsequence answer.
- A fully positive array makes both answers equal to the total array sum.

## Common Mistakes
- Returning `0` for all-negative input.
- Using the subarray logic for the subsequence answer.
- Forgetting that the subsequence must still be non-empty.
- Mixing up subsequence with subset and overcomplicating the second answer.

## How to Explain It Live
I treat the two outputs separately. For the contiguous answer, I use Kadane's algorithm: at each index I decide whether it is better to start a new segment here or extend the current one. For the subsequence answer, if I can skip elements freely, I should add every positive number. The only special case is when the array is all negative, where both answers become the largest element.

## Interview Notes
This is a strong pattern-recognition problem because the phrase "maximum subarray" should immediately suggest Kadane. The subsequence half is simpler and is mostly about handling the all-negative case cleanly. A concise explanation that separates the two outputs usually lands well in interviews.
