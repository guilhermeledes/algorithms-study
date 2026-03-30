# Combine Arrays

## Problem Summary
Given two integer arrays that are each already sorted in increasing order, combine them into one array that remains sorted in increasing order.

Source note: HackerRank screenshot prompt for `Combine Arrays`.

The prompt also asks you to use array indexing while accessing elements, which points toward a manual merge instead of relying on higher-level helpers.

## Pattern
Two pointers / merge of sorted arrays.

## Recognition Clues
- Two sorted inputs must become one sorted output.
- You need to preserve ordering rather than search for one target value.
- The prompt hints at array indexing, which usually means advancing pointers through both arrays.
- This is the same merge step used inside merge sort.

## Brute Force Approach
Append both arrays into one result and sort the combined array afterward.

That works, but it ignores the fact that both inputs are already sorted. You pay extra sorting cost even though the relative order is mostly known.

## Optimized Approach
Walk both arrays with one pointer each:
- compare the current values
- push the smaller value into the result
- advance the pointer for the array that supplied that value
- once one array is exhausted, append the remaining tail of the other array

Because each value is visited once, the merge stays linear.

## Core Idea
Use the sorted property to decide the next output value greedily at each step.

## Step-by-Step Reasoning
1. Start one pointer at the beginning of `a` and one at the beginning of `b`.
2. Compare `a[i]` and `b[j]`.
3. Push the smaller value into the result.
4. Advance only the pointer that produced the chosen value.
5. Repeat until one pointer reaches the end of its array.
6. Copy the remaining values from the unfinished array.
7. Return the result.

## Data Structures Used
- Two integer indices, one per input array
- One result array to collect the merged values

## Algorithm
1. Create an empty result array.
2. Initialize `leftIndex = 0` and `rightIndex = 0`.
3. While both indices are still in bounds, compare `a[leftIndex]` and `b[rightIndex]`.
4. Push the smaller value and advance that index.
5. After the loop, append any leftover values from `a`.
6. Append any leftover values from `b`.
7. Return the merged result.

## Complexity
- Time: `O(a.length + b.length)` for the optimized merge, versus `O((n + m) log (n + m))` for concatenate-then-sort
- Space: `O(a.length + b.length)`

## Edge Cases
- One input array is empty.
- Both arrays contain duplicates.
- Negative numbers appear in the inputs.
- All values from one array come before all values from the other.
- Equal current values should both be preserved in the output.

## Common Mistakes
- Sorting again without using the sorted-input advantage.
- Forgetting to append the remaining tail after one pointer finishes.
- Dropping duplicates when values are equal.
- Advancing both pointers after choosing only one value.
- Accidentally mutating the input arrays when mutation is unnecessary.

## How to Explain It Live
This is the merge step from merge sort. Since both arrays are already sorted, I keep one pointer in each array and repeatedly take the smaller current value. That guarantees the next output element is correct, and each item is processed once. After one array finishes, I append the rest of the other array.

## Interview Notes
State the brute-force version first so the optimization is clear: concatenate plus sort is correct but wastes the sorted-input property. The real insight is that sorted arrays let you make a local greedy choice with two pointers. Mention that the prompt's array-indexing hint strongly suggests a manual merge implementation.
