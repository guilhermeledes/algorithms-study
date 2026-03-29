# Ransom Note

## Problem Summary
Given two word arrays, determine whether the ransom note can be formed exactly from the magazine words.

Source note: `Hash Tables: Ransom Note`

HackerRank expects the function signature `checkMagazine(magazine: string[], note: string[])`. The prompt says to print `Yes` or `No`; in this study package the function returns that same string for easier testing.

## Pattern
Frequency counting with word availability tracking.

## Recognition Clues
- You can use each magazine word at most once.
- Word order does not matter, only how many times each word is available.
- The prompt is case-sensitive, so `"Attack"` and `"attack"` are different keys.
- This is a direct "can inventory satisfy request?" question, which points to a hash map.

## Brute Force Approach
Copy the magazine words into a mutable array. For each word in the note:
- search for the first matching magazine word
- remove it if found
- fail immediately if it is missing

This is simple, but repeated searching and removal makes it slower as the inputs grow.

## Optimized Approach
Count how many times each word appears in the magazine with a hash map. Then walk through the note:
- if a word is absent or its remaining count is zero, return `No`
- otherwise decrement that word's count

If every note word is satisfied, return `Yes`.

## Core Idea
The only thing that matters is remaining word frequency. A hash map lets us track that in constant-time average lookups.

## Step-by-Step Reasoning
1. Build a map from `word -> available count` using the magazine.
2. Iterate through each word in the note.
3. Look up the word's remaining count.
4. If the word is missing or exhausted, the note cannot be formed.
5. Otherwise decrement the count because that copy is now used.
6. If the loop finishes, every note word was matched exactly once.

## Data Structures Used
- `string[]` in the brute-force sketch to simulate consuming magazine words
- `Map<string, number>` in the optimized solution for word frequencies

## Algorithm
1. Initialize an empty `Map<string, number>`.
2. Traverse the magazine and increment each word's count.
3. Traverse the note.
4. If a note word is not in the map with a positive count, return `No`.
5. Otherwise decrement its count.
6. Return `Yes` after all note words are processed.

## Complexity
- Time: `O(m + n)`
- Space: `O(m)`

## Edge Cases
- The note is empty, so the answer is immediately `Yes`.
- A needed word exists but not enough times, so duplicates matter.
- A case mismatch should fail even if the letters look similar.
- Extra magazine words do not matter as long as every note word is covered.

## Common Mistakes
- Treating words like a set instead of counting duplicates.
- Lowercasing words even though the prompt is case-sensitive.
- Forgetting to consume a word after using it once.
- Rebuilding searches from scratch instead of tracking remaining counts.

## How to Explain It Live
This is a frequency-counting problem over words. I count how many times each magazine word appears, then I scan the note and decrement the needed word each time I use one. If a word is missing or already used up, the answer is `No`; otherwise if I finish the note, it is `Yes`. That gives linear time and is easy to explain.

## Interview Notes
Lead with the observation that order is irrelevant and duplicates are the real constraint. A brute-force solution repeatedly searches the magazine, but the cleaner interview answer converts the magazine into a word-frequency map. Call out the case-sensitive requirement because it changes the equality rule and is an easy place to make a bug.
