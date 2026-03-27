# Quick Notes

## Difficulty
Unknown

## Tags
queues, stacks, simulation, amortized-analysis

## Pattern
Queue simulation using two stacks.

## Recognition Clues
- FIFO behavior must be implemented from LIFO primitives
- Prompt explicitly names both queues and stacks
- Efficient answer depends on lazy transfer between two containers
- HackerRank Path: `Prepare > Data Structures > Queues > Queue using Two Stacks`

## Template
Keep two stacks:
- `inStack` for enqueue
- `outStack` for dequeue/peek

Before dequeue or peek:
- if `outStack` is empty, pour everything from `inStack` into `outStack`

Then:
- dequeue = `outStack.pop()`
- peek = last value in `outStack`

## Things to Memorize
- One reversal changes stack order into queue order.
- Transfer only when `outStack` is empty.
- Each element moves from `inStack` to `outStack` at most once.
- This is amortized `O(1)`, not worst-case `O(1)` for every single query.

## Pitfalls
- Rebuilding the output stack on every print or dequeue
- Accidentally removing on a print query
- Using array `shift()` and missing the intended pattern
- Forgetting the queue can empty out and later be reused

## Variants
- Implement stack using queues
- Min queue / max queue
- Sliding window with deque
- Browser history with stacks

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Queue simulation with two stacks and lazy transfer.
- Q: What is the key optimization?
  A: Move values from the input stack to the output stack only when the output stack is empty.
- Q: What data structure makes the solution efficient?
  A: Two stacks, one for enqueue and one for dequeue/front access.
- Q: What is the most important edge case?
  A: Repeated front checks after a transfer, because `3` must not remove the value.
