# Quick Notes

## Difficulty
Medium

## Tags
strings, subsequence, binary-search, preprocessing, two-pointers

## Pattern
Repeated subsequence queries against one source string.

## Recognition Clues
- One base string, many query words
- Order matters, adjacency does not
- Repeated checks against the same `s` suggest preprocessing
- No HackerRank path was provided in the prompt screenshot

## Template
Brute force:
For each word, use two pointers over `s` and the word.

Optimized:
Store every index of every character in `s`.
For each word character, binary-search the next usable index.

## Things to Memorize
- Subsequence is about relative order, not contiguity.
- One fixed `s` plus many words is the clue to preprocess `s`.
- Duplicate words count separately unless the problem explicitly says otherwise.
- Binary search must find the first index strictly greater than the previous match.

## Pitfalls
- Accidentally solving substring instead of subsequence
- Reusing the same index in `s` more than once
- Forgetting that repeated words each count
- Mishandling repeated characters like many `a`s in a row

## Variants
- Is Subsequence
- Find the longest dictionary word through deleting
- Stream of characters
- Distinct subsequences

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Repeated subsequence checking with preprocessing.
- Q: What is the key optimization?
  A: Precompute character positions in `s` and jump with binary search.
- Q: What data structure makes the solution efficient?
  A: A map from character to sorted occurrence indices.
- Q: What is the most important edge case?
  A: Repeated characters and duplicate words, because both can hide indexing bugs.
