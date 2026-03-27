# Queue using Two Stacks

## Problem Summary
Process a sequence of queue operations where:
- `1 x` enqueues `x`
- `2` dequeues the current front element
- `3` prints the current front element

The constraint is that the queue implementation should be built using two stacks.

HackerRank Path: `Prepare > Data Structures > Queues > Queue using Two Stacks`

## Pattern
Queue simulation with two stacks / amortized data-structure design.

## Recognition Clues
- The prompt explicitly asks for a queue built from another data structure.
- Queue operations must preserve FIFO order, but the allowed primitive is stack behavior.
- This is a classic "simulate one abstract data type with another" interview pattern.
- The efficient version depends on amortized analysis rather than making every single operation independently cheap.

## Brute Force Approach
The most direct baseline is to ignore the "two stacks" optimization and maintain queue order in a plain array:
- append on enqueue
- remove from the front with `shift()` on dequeue
- read index `0` on print

That is easy to reason about, but front removal is `O(n)` because all remaining elements shift left.

If you want a brute-force version that still mentions stacks, you could also rebuild one stack from another on every dequeue or print so the oldest item becomes visible. That also turns repeated front operations into unnecessary repeated work.

## Optimized Approach
Use two stacks:
- `inStack` receives new enqueues
- `outStack` serves dequeues and front checks

When `outStack` is empty and you need the front element, move everything from `inStack` to `outStack`. That reversal makes the oldest queued item appear on top of `outStack`.

## Core Idea
One reversal turns LIFO order into FIFO order. By delaying that transfer until `outStack` is empty, each element moves at most once from `inStack` to `outStack`, which gives amortized `O(1)` queue operations.

## Step-by-Step Reasoning
1. Start with two empty stacks.
2. On `1 x`, push `x` onto `inStack`.
3. On `2` or `3`, first check whether `outStack` is empty.
4. If it is empty, pop every value from `inStack` and push it onto `outStack`.
5. After that transfer, the oldest queued value sits on top of `outStack`.
6. For `2`, pop from `outStack`.
7. For `3`, read the top of `outStack` without removing it and append it to the output list.
8. Because each element is pushed and moved a constant number of times, the total cost stays linear across all queries.

## Data Structures Used
- `number[]` for `inStack`
- `number[]` for `outStack`
- `number[]` for collected print outputs

## Algorithm
1. Create empty arrays `inStack`, `outStack`, and `outputs`.
2. For each query:
3. If it is `1 x`, push `x` onto `inStack`.
4. Otherwise, if `outStack` is empty, move all items from `inStack` into `outStack`.
5. If the query is `2`, pop from `outStack`.
6. If the query is `3`, read the last value of `outStack` and append it to `outputs`.
7. Return `outputs` after all queries are processed.

## Complexity
- Time: `O(q)` total for `q` queries, with amortized `O(1)` per operation
- Space: `O(n)` for the queued elements

Brute-force reference:
- Time: up to `O(q * n)` if front removals repeatedly shift an array or if stacks are rebuilt every time
- Space: `O(n)`

## Edge Cases
- Multiple `3` queries in a row should print the same front value until a dequeue happens.
- The queue may become empty and later receive new values again.
- A long run of enqueues followed by dequeues should still preserve insertion order.
- Front checks may force the first transfer from `inStack` to `outStack`.
- The prompt guarantees every `3` query is valid, so the front always exists when printed.

## Common Mistakes
- Moving elements from `inStack` to `outStack` on every operation instead of only when needed.
- Popping from `inStack` directly on dequeue, which breaks FIFO order.
- Forgetting that `3` should inspect the front without removing it.
- Using `shift()` in the optimized version and losing the point of the exercise.

## How to Explain It Live
I use two stacks: one for incoming values and one for outgoing values. Enqueue just pushes into the input stack. When I need the queue front and the output stack is empty, I move everything over once, which reverses the order so the oldest value is now on top. That gives FIFO behavior with amortized constant time.

## Interview Notes
This is a good amortized-analysis problem. The key message is not that every single operation is always constant time, but that each element is transferred at most once between stacks. In an interview, lead with FIFO vs. LIFO mismatch, then explain that one lazy reversal fixes it cleanly.
