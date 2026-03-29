# Quick Notes

## Difficulty
Easy

## Tags
strings, hashing, frequency-counting, anagrams

## Pattern
Frequency counting across two strings.

## Recognition Clues
- Source note: `Strings > Making Anagrams`
- Order does not matter, only character counts
- Only deletions are allowed
- Lowercase English letters suggest a fixed-size frequency array

## Template
Brute force:
Try to match each character from one string inside a mutable copy of the other.

Optimized:
Count each letter in `a`, subtract each letter in `b`, then sum absolute differences.

## Things to Memorize
- Anagram questions usually reduce to frequency equality.
- When the alphabet is fixed, prefer a small array over a map.
- The total deletions equal the sum of absolute count differences.
- Empty-string cases fall out naturally from the same frequency logic.

## Pitfalls
- Using a set instead of counts
- Missing repeated-letter mismatches
- Overcomplicating the solution with sorting
- Forgetting that deletions can happen from both strings

## Variants
- Valid Anagram
- Group Anagrams
- Ransom Note
- Minimum steps to make two strings anagrams

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Frequency counting on a fixed alphabet.
- Q: What is the key optimization?
  A: Replace repeated character searches with a 26-slot count-difference array.
- Q: What data structure makes the solution efficient?
  A: A fixed-size numeric array for letter frequencies.
- Q: What is the most important edge case?
  A: Repeated letters with different frequencies in the two strings.
