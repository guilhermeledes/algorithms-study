import { describe, expect, it } from "vitest";

import { makeAnagram, makeAnagramBrute, makeAnagramOptimized } from "./solution.js";

const cases = [
  {
    name: "matches the sample case",
    a: "cde",
    b: "abc",
    expected: 4,
  },
  {
    name: "returns zero when the strings are already anagrams",
    a: "bacdc",
    b: "dcbac",
    expected: 0,
  },
  {
    name: "counts the extra character mismatch from the prompt explanation",
    a: "bacdc",
    b: "dcbad",
    expected: 2,
  },
  {
    name: "deletes every character when one string is empty",
    a: "",
    b: "abc",
    expected: 3,
  },
  {
    name: "handles repeated letters with uneven frequencies",
    a: "aabbcc",
    b: "abdd",
    expected: 6,
  },
  {
    name: "handles completely disjoint strings",
    a: "abc",
    b: "def",
    expected: 6,
  },
] as const;

describe("makeAnagramBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(makeAnagramBrute(testCase.a, testCase.b)).toBe(testCase.expected);
    });
  }
});

describe("makeAnagramOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(makeAnagramOptimized(testCase.a, testCase.b)).toBe(testCase.expected);
    });
  }
});

describe("makeAnagram", () => {
  for (const testCase of cases) {
    it(`delegates correctly when it ${testCase.name}`, () => {
      expect(makeAnagram(testCase.a, testCase.b)).toBe(testCase.expected);
    });
  }
});
