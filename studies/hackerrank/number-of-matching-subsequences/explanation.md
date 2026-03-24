# Number of Matching Subsequences

## Problem Summary
Given a string `s` and an array of strings `words`, return how many entries in `words` are subsequences of `s`.

No HackerRank path was provided in the prompt screenshot, so this study case preserves only the problem title.

## Pattern
Subsequence checking with repeated queries against one fixed source string.

## Recognition Clues
- The prompt asks whether each word can be formed by deleting characters from `s` without changing order.
- Relative order matters, but characters do not need to be adjacent.
- Many different words are checked against the same source string `s`.
- Repeated queries against one fixed string are a strong signal that preprocessing `s` can help.

## Brute Force Approach
The simplest idea is to check each word independently against `s`:
- start one pointer at the beginning of `s`
- start one pointer at the beginning of the current word
- move through `s` left to right
- whenever the characters match, advance the word pointer too
- if the word pointer reaches the end, that word is a subsequence

That is easy to explain and often a good first answer in an interview, but it rescans `s` again for every word.

There is also an even more naive idea of generating every possible subsequence of `s` and comparing against `words`, but that explodes exponentially and is not practical.

## Optimized Approach
Preprocess `s` by storing every index where each character appears.

Then for each word:
- track the last matched index in `s`
- for each character in the word, look up all positions where that character appears
- find the first position strictly greater than the last matched index
- if no such position exists, the word is not a subsequence

This keeps the same mental model as the simpler solution, but replaces repeated scans of `s` with fast jumps through precomputed index lists.

## Core Idea
Each word is valid only if its characters can be matched in strictly increasing index order inside `s`. Preprocessing `s` turns the problem into repeated "find the next usable index" queries.

## Step-by-Step Reasoning
1. Build a map from character to all indices where that character appears in `s`.
2. Start each word with `lastMatchedIndex = -1`.
3. For each character in the word:
4. Look up the sorted list of positions for that character.
5. Find the first position greater than `lastMatchedIndex`.
6. If none exists, the word cannot be a subsequence.
7. Otherwise update `lastMatchedIndex` and continue.
8. Count every word that successfully matches all of its characters.

## Data Structures Used
- `Map<string, number[]>` to store every occurrence index for each character
- integer pointer or `previousIndex` variable to track the last matched position
- binary search for the fastest version
- linear scan through the stored indices for the simpler interview version

## Algorithm
1. Traverse `s` once and store all positions for each character.
2. Initialize a counter to `0`.
3. For each word:
4. Set `previousIndex = -1`.
5. For each character in the word:
6. Look up that character's positions list.
7. Find the first position greater than `previousIndex`.
8. If none exists, stop and mark the word invalid.
9. Otherwise update `previousIndex`.
10. If the word finishes successfully, increment the counter.
11. Return the counter.

## Complexity
Brute-force subsequence generation:
- Time: exponential in `|s|` (simple notation: `O(2^n)`)
- Space: exponential in `|s|` (simple notation: `O(2^n)`)

Two-pointer-per-word solution:
- Time: `O(|words| * |s|)` in the worst case (simple notation: `O(m * n)`)
- Space: `O(1)` extra beyond the input

Transcript-style indexed solution:
- Time: `O(|s| + total_word_characters * average_occurrence_scan)` because each character lookup linearly scans its positions list (simple notation: often described loosely as `O(n + m * k)`)
- Space: `O(|s|)` (simple notation: `O(n)`)

Binary-search indexed solution:
- Time: `O(|s| + total_word_characters * log |s|)` (simple notation: often described loosely as `O(n + m log n)`)
- Space: `O(|s|)` (simple notation: `O(n)`)

## Edge Cases
- `words` is empty.
- Duplicate words should each contribute separately if they match.
- A word is longer than `s`.
- The required characters exist, but only in the wrong order, such as `"ba"` against `"aaaaab"`.
- `s` contains repeated letters, so the algorithm must choose a later occurrence when needed.
- A word contains a character that never appears in `s`.

## Common Mistakes
- Treating this like substring matching instead of subsequence matching.
- Forgetting that duplicates in `words` count multiple times.
- Reusing the same index in `s` more than once.
- Forgetting that the next matched index must be strictly greater than the previous one.
- Saying the brute-force solution is "all substrings" when the real naive idea is "all subsequences".

## How to Explain It Live
I have one fixed source string and many candidate words, so I do not want to scan the whole source from scratch every time. I preprocess `s` into character-to-index lists. Then for each word, I greedily match each character at the earliest valid position that comes after the previous one. If I can keep doing that until the word ends, it is a subsequence.

## Interview Notes
If time is short, start with the two-pointer-per-word solution because it is easy to justify and code. A strong follow-up is the transcript-style improvement: precompute character indices and linearly search those index lists. The final optimization is the same exact idea with binary search, which gives faster lookups while keeping the explanation simple.
