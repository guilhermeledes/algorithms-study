/*
 * Number of Matching Subsequences
 *
 * No HackerRank path was provided in the prompt screenshot, so this study case
 * uses a title-based directory.
 *
 * Assumed contract:
 * - input: a source string `s`
 * - input: an array of candidate words `words`
 * - output: how many entries in `words` are subsequences of `s`
 *
 * Pattern:
 * Subsequences / two pointers / preprocessing + indexed lookup.
 *
 * Common interview directions:
 * - brute force: check every word against `s` with two pointers
 * - optimized: preprocess positions from `s`, then advance through each word efficiently
 *
 * Edge cases worth handling:
 * - empty `words`
 * - repeated words, which should be counted separately
 * - words longer than `s`
 * - repeated characters in `s`
 *
 * Expected complexity target for a strong solution:
 * - better than rebuilding subsequences explicitly
 * - usually O(|s| + total_word_characters * log |s|) with indexed positions
 */

export function countMatchingSubsequencesBrute(s: string, words: string[]): number {
  let count = 0
  for (const word of words) {
    const arrS = [...s].reverse()
    const arrWord = [...word].reverse()
    let valid = true
    while(arrWord.length){
      if (
        (arrWord.length>arrS.length) || 
        (arrS.length === 0) ||
        (arrWord.length === arrS.length && arrWord.join() !== arrS.join())
      ){
        valid = false
        break
      }
      let found = false
      const firstW = arrWord.pop()
      while(arrS.length){
        const firstS = arrS.pop()
        found = (firstS === firstW)
        if (found){
          break
        } else if (arrS.length === 0) {
          valid = false
        }
      }
    }
    if (valid) (
      count++
    )
  }
  return count
}

function findFirstIndexGreaterThan(indices: number[], previousIndex: number): number | undefined {
  let left = 0;
  let right = indices.length - 1;
  let answerIndex = -1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = indices[middle]!;

    // We need the first usable occurrence strictly after the last matched position.
    // When this index works, keep searching left to find the earliest valid one.
    if (value > previousIndex) {
      answerIndex = middle;
      right = middle - 1;
    } else {
      // This occurrence is too early, so every valid answer must be to the right.
      left = middle + 1;
    }
  }

  // Returning the earliest valid index is important:
  // choosing a later match would still work sometimes, but it would reduce the
  // remaining space for the rest of the word and can only make matching harder.
  return answerIndex === -1 ? undefined : indices[answerIndex];
}

export function countMatchingSubsequencesOptimized(s: string, words: string[]): number {
  const positionsByCharacter = new Map<string, number[]>();

  // Core idea:
  // turn `s` into a lookup table of sorted positions for each character.
  // Example for "abca":
  //   a -> [0, 3]
  //   b -> [1]
  //   c -> [2]
  //
  // Once we have that structure, checking a word becomes:
  // "for each character, jump to the next valid position in `s`"
  // instead of "scan `s` from scratch again".
  for (let index = 0; index < s.length; index++) {
    const character = s[index]!;
    const positions = positionsByCharacter.get(character);

    if (positions) {
      // Indices stay naturally sorted because we traverse `s` left to right.
      positions.push(index);
    } else {
      // Preprocess `s` once so repeated word checks do not rescan the whole string.
      positionsByCharacter.set(character, [index]);
    }
  }

  let count = 0;

  for (const word of words) {
    let previousIndex = -1;
    let isSubsequence = true;

    // Mental model:
    // build the subsequence one character at a time, always remembering where the
    // previous character was matched in `s`. Every next match must appear after it.
    for (const character of word) {
      const positions = positionsByCharacter.get(character);

      // If `s` never contains this character, the current word cannot match.
      if (!positions) {
        isSubsequence = false;
        break;
      }

      // Greedy mental model:
      // match each character as early as possible while still staying to the right
      // of the previous match. That preserves maximum room for the remaining letters.
      const nextIndex = findFirstIndexGreaterThan(positions, previousIndex);

      // No valid next position means the order required by the word cannot be formed.
      // This can happen even when the character exists in `s`, because all remaining
      // copies might be before the previously matched index.
      if (nextIndex === undefined) {
        isSubsequence = false;
        break;
      }

      // Lock in this match and continue building the subsequence from here.
      previousIndex = nextIndex;
    }

    if (isSubsequence) {
      // Every character in the word found a legal increasing position in `s`.
      count++;
    }
  }

  // Total number of words whose characters can be embedded in `s` in order.
  return count;
}

function buildPositionsByCharacter(s: string): Map<string, number[]> {
  const positionsByCharacter = new Map<string, number[]>();

  for (let index = 0; index < s.length; index++) {
    const character = s[index]!;
    const positions = positionsByCharacter.get(character);

    if (positions) {
      positions.push(index);
    } else {
      positionsByCharacter.set(character, [index]);
    }
  }

  return positionsByCharacter;
}

function findNextIndexLinear(indices: number[], previousIndex: number): number | undefined {
  for (const index of indices) {
    if (index > previousIndex) {
      return index;
    }
  }

  return undefined;
}

export function countMatchingSubsequencesVideoStyle(s: string, words: string[]): number {
  const positionsByCharacter = buildPositionsByCharacter(s);
  let count = 0;

  // This follows the transcript's main idea:
  // 1. Precompute character -> indices
  // 2. For each word, keep track of the previously matched index
  // 3. For each next character, linearly search that character's index list
  //    until we find the first occurrence that appears after the previous one
  //
  // It keeps the mental model simple:
  // "for each word, keep advancing to the next valid position in `s`."
  // The binary-search version below is the same idea with a faster lookup step.
  for (const word of words) {
    let previousIndex = -1;
    let isSubsequence = true;

    for (const character of word) {
      const indices = positionsByCharacter.get(character);

      if (!indices) {
        isSubsequence = false;
        break;
      }

      const nextIndex = findNextIndexLinear(indices, previousIndex);

      if (nextIndex === undefined) {
        isSubsequence = false;
        break;
      }

      previousIndex = nextIndex;
    }

    if (isSubsequence) {
      count++;
    }
  }

  return count;
}

export function countMatchingSubsequencesTwoPointers(s: string, words: string[]): number {
  let count = 0;

  for (const word of words) {
    let sIndex = 0;
    let wordIndex = 0;

    // Baseline interview mental model:
    // scan `s` once for this word and greedily match characters in order.
    while (sIndex < s.length && wordIndex < word.length) {
      if (s[sIndex] === word[wordIndex]) {
        wordIndex++;
      }

      sIndex++;
    }

    if (wordIndex === word.length) {
      count++;
    }
  }

  return count;
}
