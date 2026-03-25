# Ice Cream Parlor

## Problem Summary
Given a budget `m` and a list of ice cream costs, return the two distinct flavor indices whose costs add up exactly to `m`.

HackerRank path: `Prepare > Algorithms > Search > Ice Cream Parlor`

The result must use 1-based indexing and be sorted in ascending order.

## Pattern
Two-sum with index lookup.

## Recognition Clues
- You need exactly two values whose sum matches a target.
- The prompt guarantees there is one unique solution.
- The output is based on indices, not the values themselves.
- Duplicate costs are allowed, so index handling matters.

## Brute Force Approach
Check every pair of flavors:
- choose a first index
- choose every later index
- test whether the two costs sum to `m`
- return the matching pair

This is easy to reason about, but it compares too many pairs as the array grows.

## Optimized Approach
Preprocess the array into a map from each cost to all 1-based indices where that cost appears.

Then iterate through the unique prices in that map:
- compute the needed complement `m - price`
- if the complement is a different value and exists in the map, return the first index from each side
- if the complement is the same value, make sure there are at least two stored indices
- return the first two valid 1-based indices

Because the prompt guarantees a unique solution, the first valid match found is the answer.

## Core Idea
Turn repeated pair checks into constant-time complement lookups by preprocessing costs into a hash map.

## Step-by-Step Reasoning
1. Traverse the array once and build a map from `cost -> [indices]`.
2. Each cost stores its 1-based indices in ascending encounter order.
3. Iterate through each unique `price` in the map.
4. Compute `expectedPrice = m - price`.
5. If `expectedPrice` is different and exists in the map, return the first stored index from both price lists.
6. If `expectedPrice` equals `price`, confirm that the index list has at least two entries.
7. Return the first two indices from that list.
8. Since the prompt guarantees a unique solution, one valid pair will be found.

## Data Structures Used
- `Map<number, number[]>` to store each cost and all of its 1-based positions
- integer variables for the current price and its complement

## Algorithm
1. Create an empty `Map<number, number[]>`.
2. Traverse `arr` once and append each `index + 1` to that cost's index list.
3. Iterate through each `[price, indices]` pair in the map.
4. Compute `expectedPrice = m - price`.
5. If `expectedPrice === price`, return the first two indices only if `indices.length >= 2`.
6. If `expectedPrice !== price` and the complement exists in the map, return the first index from each cost list.
7. If no pair is found, return an empty array for local-study safety, even though HackerRank says a solution always exists.

## Complexity
- Time: `O(n)`
- Space: `O(n)`

## Edge Cases
- The correct answer uses the same numeric cost twice, so two different indices must be chosen.
- The matching pair can involve the first or last flavor.
- The smaller cost does not have to appear first in the list.
- The returned indices must be 1-based, not 0-based.

## Common Mistakes
- Returning the costs instead of the indices.
- Using 0-based indices in the answer.
- Reusing one flavor twice when the complement equals the current cost.
- Returning every index for a duplicated cost instead of exactly two indices.
- Forgetting to verify that the same-cost branch actually has at least two flavors available.

## How to Explain It Live
This is a two-sum problem with indices. I first group the array into a map from cost to the 1-based indices where that cost appears. Then for each unique cost, I look up the complement needed to reach the budget. If the complement is different, I return the first index from each list. If it is the same value, I make sure there are at least two indices stored and return the first two. That turns pair checking into constant-time lookups after one preprocessing pass.

## Interview Notes
Start with the brute-force pair scan to show correctness, then improve it by observing that each cost only needs one complement. In this version, preprocessing all positions makes the duplicate-cost case explicit and easy to explain. The key implementation detail is to keep indices 1-based and return exactly two distinct positions.
