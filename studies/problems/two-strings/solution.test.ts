import { describe, expect, it } from "vitest";

import { twoStrings, twoStringsBrute, twoStringsOptimized } from "./solution.js";

const cases = [
  {
    name: "matches the sample yes case",
    s1: "hello",
    s2: "world",
    expected: "YES",
  },
  {
    name: "matches the sample no case",
    s1: "hi",
    s2: "world",
    expected: "NO",
  },
  {
    name: "returns yes when the common substring is a single repeated letter",
    s1: "aaab",
    s2: "zzza",
    expected: "YES",
  },
  {
    name: "returns no when the strings are completely disjoint",
    s1: "abc",
    s2: "def",
    expected: "NO",
  },
  {
    name: "returns yes when all characters overlap",
    s1: "abc",
    s2: "cba",
    expected: "YES",
  },
  {
    name: "returns yes when the only overlap is the last character checked",
    s1: "mnopqz",
    s2: "rstuvz",
    expected: "YES",
  },
] as const;

describe("twoStringsBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(twoStringsBrute(testCase.s1, testCase.s2)).toBe(testCase.expected);
    });
  }
});

describe("twoStringsOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(twoStringsOptimized(testCase.s1, testCase.s2)).toBe(testCase.expected);
    });
  }
});

describe("twoStrings", () => {
  for (const testCase of cases) {
    it(`delegates correctly when it ${testCase.name}`, () => {
      expect(twoStrings(testCase.s1, testCase.s2)).toBe(testCase.expected);
    });
  }
});
