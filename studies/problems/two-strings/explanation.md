# Two Strings

## Problem Summary
Given two lowercase strings, return `YES` if they share any common substring and `NO` otherwise.

Source note: `Problem Solving > Two Strings`

HackerRank expects the exact function signature `twoStrings(s1: string, s2: string): string`.

## Pattern
Set intersection on characters.

## Recognition Clues
- The prompt says a substring may be as small as one character.
- That means the problem reduces to asking whether the strings share at least one letter.
- The inputs are lowercase English letters, so membership checks can be very cheap.
- The output is only a yes-or-no decision, not the substring itself.

## Brute Force Approach
Try every character in `s1` against every character in `s2`.

As soon as any pair matches, return `YES`. If all pairs are checked without a match, return `NO`.

This is easy to reason about, but it does unnecessary repeated comparisons.

## Optimized Approach
Store every character from one string in a set, then scan the other string and stop on the first match.

Because a one-character overlap is enough, we do not need to build substrings or compare longer ranges. We only need to know whether any character appears in both strings.

## Core Idea
The minimum possible common substring length is one, so shared substring detection becomes shared character detection.

## Step-by-Step Reasoning
1. Notice that any shared character is already a valid common substring.
2. Insert every character from `s1` into a set.
3. Iterate through `s2`.
4. If the current character already exists in the set, return `YES`.
5. If the loop finishes with no match, return `NO`.

## Data Structures Used
- `Set<string>` in the optimized solution for constant-time membership checks

## Algorithm
1. Create an empty set of characters.
2. Add each character from `s1` to the set.
3. Iterate through `s2`.
4. If any character from `s2` is in the set, return `YES`.
5. Otherwise return `NO`.

## Complexity
- Time: `O(n + m)`
- Space: `O(min(n, 26))`, which is effectively `O(1)` for lowercase English letters

## Edge Cases
- The strings share exactly one letter, so the answer is still `YES`.
- Repeated letters do not change the answer once a match exists.
- Completely disjoint alphabets should return `NO`.
- The match may appear late in either string, so the scan should not stop too early.

## Common Mistakes
- Overthinking the problem and trying to generate all substrings.
- Forgetting that a single shared character already counts as a substring.
- Using frequency counting when only existence is required.
- Returning the shared character instead of the required `YES` or `NO`.

## How to Explain It Live
The key observation is that the substring can be just one character long. So I do not need substring generation at all. I put all characters from the first string into a set, scan the second string, and return `YES` on the first overlap. If I never find one, the answer is `NO`.

## Interview Notes
Lead with the reduction: shared substring becomes shared character. Mention the brute-force double loop first, then upgrade to a set because we only need fast membership checks. Since the input is lowercase letters, the auxiliary structure stays small and the solution is easy to explain live.
