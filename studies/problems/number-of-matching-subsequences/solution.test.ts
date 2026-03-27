import { describe, expect, it } from "vitest";

import {
  countMatchingSubsequencesBrute,
  countMatchingSubsequencesOptimized,
  countMatchingSubsequencesTwoPointers,
  countMatchingSubsequencesVideoStyle,
} from "./solution.js";

const cases = [
  {
    name: "matches the first sample case",
    s: "abcde",
    words: ["a", "bb", "acd", "ace"],
    expected: 3,
  },
  {
    name: "matches the second sample case",
    s: "dsahjpjauf",
    words: ["ahjpjau", "ja", "ahbwzgqnuk", "tnmlanowax"],
    expected: 2,
  },
  {
    name: "returns 0 when there are no candidate words",
    s: "abcde",
    words: [],
    expected: 0,
  },
  {
    name: "counts duplicate words separately when each is a valid subsequence",
    s: "abcde",
    words: ["a", "a", "ace", "ace", "aec"],
    expected: 4,
  },
  {
    name: "rejects words that require characters in the wrong order",
    s: "abcde",
    words: ["ed", "ca", "aec", "eabcdxy"],
    expected: 0,
  },
  {
    name: "handles repeated characters in the source string",
    s: "aaaaab",
    words: ["a", "aa", "aaa", "aaaaa", "aaaaaa", "ab", "ba"],
    expected: 5,
  },
] as const;

describe("countMatchingSubsequencesBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(countMatchingSubsequencesBrute(testCase.s, [...testCase.words])).toBe(
        testCase.expected,
      );
    });
  }
});

describe("countMatchingSubsequencesOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(countMatchingSubsequencesOptimized(testCase.s, [...testCase.words])).toBe(
        testCase.expected,
      );
    });
  }
});

describe("countMatchingSubsequencesVideoStyle", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(countMatchingSubsequencesVideoStyle(testCase.s, [...testCase.words])).toBe(
        testCase.expected,
      );
    });
  }
});

describe("countMatchingSubsequencesTwoPointers", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(countMatchingSubsequencesTwoPointers(testCase.s, [...testCase.words])).toBe(
        testCase.expected,
      );
    });
  }
});

describe("all implementations", () => {
  it("produce the same results on the representative cases", () => {
    for (const testCase of cases) {
      expect(countMatchingSubsequencesOptimized(testCase.s, [...testCase.words])).toBe(
        countMatchingSubsequencesBrute(testCase.s, [...testCase.words]),
      );
      expect(countMatchingSubsequencesVideoStyle(testCase.s, [...testCase.words])).toBe(
        countMatchingSubsequencesBrute(testCase.s, [...testCase.words]),
      );
      expect(countMatchingSubsequencesTwoPointers(testCase.s, [...testCase.words])).toBe(
        countMatchingSubsequencesBrute(testCase.s, [...testCase.words]),
      );
    }
  });
});
