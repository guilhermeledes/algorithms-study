import { describe, expect, it } from "vitest";

import {
  combineArrays,
  combineArraysBruteForce,
  combineArraysOptimized,
} from "./solution.js";

const cases = [
  {
    name: "merges the sample sorted arrays",
    a: [1, 3, 5],
    b: [2, 4, 6],
    expected: [1, 2, 3, 4, 5, 6],
  },
  {
    name: "returns the second array when the first is empty",
    a: [],
    b: [1, 2, 3],
    expected: [1, 2, 3],
  },
  {
    name: "returns the first array when the second is empty",
    a: [1, 2, 3],
    b: [],
    expected: [1, 2, 3],
  },
  {
    name: "preserves duplicates from both arrays",
    a: [1, 2, 2, 5],
    b: [2, 2, 3],
    expected: [1, 2, 2, 2, 2, 3, 5],
  },
  {
    name: "handles negative values and zero",
    a: [-5, -1, 3],
    b: [-4, 0, 2],
    expected: [-5, -4, -1, 0, 2, 3],
  },
  {
    name: "handles one array entirely smaller than the other",
    a: [1, 2, 3],
    b: [10, 11],
    expected: [1, 2, 3, 10, 11],
  },
] as const;

describe("combineArraysBruteForce", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(combineArraysBruteForce([...testCase.a], [...testCase.b])).toEqual(
        testCase.expected,
      );
    });
  }
});

describe("combineArraysOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(combineArraysOptimized([...testCase.a], [...testCase.b])).toEqual(
        testCase.expected,
      );
    });
  }
});

describe("combineArrays", () => {
  for (const testCase of cases) {
    it(`matches the optimized implementation for ${testCase.name.toLowerCase()}`, () => {
      expect(combineArrays([...testCase.a], [...testCase.b])).toEqual(
        testCase.expected,
      );
    });
  }
});
