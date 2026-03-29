# Quick Notes

## Difficulty
Easy

## Tags
strings, hashing, set-intersection, substring-check

## Pattern
Character set intersection.

## Recognition Clues
- Source note: `Problem Solving > Two Strings`
- The prompt says a substring can be length `1`
- That turns the problem into checking for any shared character
- Only a yes-or-no answer is required

## Template
Brute force:
Compare every character in `s1` with every character in `s2`.

Optimized:
Put characters from one string in a set and scan the other for any overlap.

## Things to Memorize
- If a substring can be length `1`, look for a simpler membership formulation.
- This is not a full substring-search problem.
- A set is enough because counts and positions do not matter.
- Return as soon as the first shared character is found.

## Pitfalls
- Generating substrings unnecessarily
- Treating this like longest common substring
- Forgetting to return `YES` or `NO` exactly
- Missing that repeated letters add no extra value here

## Variants
- Ransom Note
- Making Anagrams
- Common Child
- Valid Anagram

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Character set intersection.
- Q: What is the key optimization?
  A: Reduce substring matching to shared-character detection and use a set.
- Q: What data structure makes the solution efficient?
  A: A `Set<string>` holding characters from one string.
- Q: What is the most important edge case?
  A: The only overlap is a single shared character, which is still enough for `YES`.
