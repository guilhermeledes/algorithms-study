# Quick Notes

## Difficulty
Easy

## Tags
hashing, strings, frequency-counting, word-count, case-sensitive

## Pattern
Frequency counting over whole words.

## Recognition Clues
- Source note: `Hash Tables: Ransom Note`
- Need to reuse magazine words at most once
- Word order is irrelevant
- Case-sensitive equality means exact string matching

## Template
Brute force:
Search the magazine array for each note word and remove the first match.

Optimized:
Count magazine words in a hash map, then decrement counts while scanning the note.

## Things to Memorize
- Inventory-style problems usually become frequency maps.
- Duplicates matter more than order here.
- Exact case-sensitive matches must be preserved.
- Early return on the first missing word keeps the logic simple.

## Pitfalls
- Using a set instead of counts
- Ignoring case sensitivity
- Forgetting to decrement after consuming a word
- Treating substrings as valid when only whole words count

## Variants
- Valid Anagram
- Two Strings
- Sherlock and Anagrams
- Any inventory-fulfillment problem with duplicates

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Frequency counting with a hash map of whole words.
- Q: What is the key optimization?
  A: Replace repeated magazine scans with direct word-count lookups.
- Q: What data structure makes the solution efficient?
  A: A `Map<string, number>` storing remaining word frequencies.
- Q: What is the most important edge case?
  A: A required word appears, but not enough times, or only with different casing.
