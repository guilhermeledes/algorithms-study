# Quick Notes

## Difficulty
Easy

## Tags
arrays, two-pointers, merge, sorted-arrays

## Pattern
Two pointers for merging two sorted arrays.

## Recognition Clues
- HackerRank source note: `Combine Arrays`
- Two sorted arrays in, one sorted array out
- Array indexing hint suggests advancing explicit pointers
- Same core move as merge sort's merge step

## Template
Brute force:
Concatenate both arrays and sort the result.

Optimized:
Keep one pointer in each array.
Push the smaller current value.
Append the leftover tail after one side finishes.

## Things to Memorize
- Sorted inputs usually mean two pointers.
- Only advance the pointer that supplied the chosen value.
- After the main loop, copy the remaining tail.
- Duplicates should stay in the output.
- This is the merge-sort merge pattern.

## Pitfalls
- Forgetting the leftover elements
- Removing duplicates by mistake
- Advancing both pointers on a single comparison
- Re-sorting instead of using the sorted property
- Off-by-one errors when one array is exhausted

## Variants
- Merge Sorted Array
- Merge step of merge sort
- Merge two linked lists
- K-way merge with a heap

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Two pointers to merge two sorted arrays in linear time.
- Q: What is the key optimization?
  A: Use the sorted order directly instead of concatenating and sorting again.
- Q: What data structure makes the solution efficient?
  A: Two array indices plus a result array.
- Q: What is the most important edge case?
  A: One array finishing early, because you still need to append the remaining tail.
