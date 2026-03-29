import { describe, expect, it } from "vitest";

import { maxSubarray, maxSubarrayBruteForce, maxSubarrayOptimized } from "./solution.js";

const cases = [
  {
    name: "returns the first sample result when every value is positive for [1, 2, 3, 4]",
    input: [1, 2, 3, 4],
    expected: [10, 10],
  },
  {
    name: "returns the second sample result when skipping a negative helps the subsequence for [2, -1, 2, 3, 4, -5]",
    input: [2, -1, 2, 3, 4, -5],
    expected: [10, 11],
  },
  {
    name: "uses the least negative value when all numbers are negative for [-2, -3, -1, -4]",
    input: [-2, -3, -1, -4],
    expected: [-1, -1],
  },
  {
    name: "allows the subsequence sum to beat the best contiguous segment for [1, -2, 0, 3]",
    input: [1, -2, 0, 3],
    expected: [3, 4],
  },
  {
    name: "restarts the best subarray after a large negative drop for [-1, 2, 3, -9, 5, 6]",
    input: [-1, 2, 3, -9, 5, 6],
    expected: [11, 16],
  },
] as const;

describe("maxSubarrayBruteForce", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(maxSubarrayBruteForce([...testCase.input])).toEqual(testCase.expected);
    });
  }
});

describe("maxSubarrayOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(maxSubarrayOptimized([...testCase.input])).toEqual(testCase.expected);
    });
  }
});

describe("maxSubarray", () => {
  for (const testCase of cases) {
    it(`matches the optimized answer for ${testCase.name.toLowerCase()}`, () => {
      expect(maxSubarray([...testCase.input])).toEqual(testCase.expected);
    });
  }
});
