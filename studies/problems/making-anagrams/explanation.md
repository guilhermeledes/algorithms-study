# Making Anagrams

## Problem Summary
Given two lowercase strings, return the minimum total number of deletions needed to make them anagrams of each other.

Source note: `Strings > Making Anagrams`

HackerRank expects the exact function signature `makeAnagram(a: string, b: string): number`.

## Pattern
Frequency counting with character-difference balancing.

## Recognition Clues
- The order of characters does not matter.
- Only lowercase English letters are involved.
- The goal is to compare how often each character appears in both strings.
- The answer asks for a minimum edit count, but the only allowed edit is deletion.

## Brute Force Approach
Treat one string as a mutable pool of characters. For each character in the other string:
- search for a matching character in the pool
- remove it if found
- otherwise count one deletion

After processing all characters, any leftover characters in the pool also need to be deleted.

This works, but repeated searching and removal makes it much slower on long strings.

## Optimized Approach
Count how many times each letter appears in both strings, then add up the absolute difference for every letter.

If `a` has three `c` characters and `b` has one, then two `c` characters must be deleted overall. Repeating that reasoning for all 26 lowercase letters gives the minimum number of deletions directly.

## Core Idea
Anagrams require matching character frequencies, so the answer is the total mismatch across all letters.

## Step-by-Step Reasoning
1. Create a frequency array for the 26 lowercase letters.
2. Scan string `a` and increment the count for each character.
3. Scan string `b` and decrement the count for each character.
4. Each final array entry represents how far apart the two strings are for one letter.
5. Add the absolute value of every entry.
6. The sum is the minimum total deletions required.

## Data Structures Used
- `string[]` in the brute-force sketch to simulate deletions
- `number[]` of length 26 in the optimized solution for character frequencies

## Algorithm
1. Initialize an array of 26 zeroes.
2. For each character in `a`, increment its bucket.
3. For each character in `b`, decrement its bucket.
4. Sum `Math.abs(count)` for every bucket.
5. Return that sum.

## Complexity
- Time: `O(n + m)`
- Space: `O(1)`

## Edge Cases
- One string is empty, so every character in the other string must be deleted.
- The strings are already anagrams, so the answer is `0`.
- The strings share no characters, so every character from both strings must be deleted.
- Repeated letters can create larger frequency gaps than a naive set-based approach would catch.

## Common Mistakes
- Treating the problem like set intersection instead of frequency comparison.
- Forgetting to count repeated characters correctly.
- Sorting the strings first, which works but is less direct than frequency counting.
- Using only one-direction subtraction and missing deletions required in the other string.

## How to Explain It Live
Because order does not matter, the only thing that matters is frequency. I count each lowercase letter in the first string, subtract the counts from the second string, and then add the absolute differences. Every mismatch represents characters that must be deleted to make the frequencies identical, so the total mismatch is the minimum deletion count.

## Interview Notes
Start by saying anagrams are about matching counts, not positions. A brute-force solution can search and remove characters one by one, but the cleaner interview solution uses a fixed 26-letter frequency array because the input is restricted to lowercase English letters. That gives linear time and constant extra space.
