import { describe, expect, it } from "vitest";

import { bruteForce, optimized } from "./solution.js";

const cases = [
  {
    name: "matches the first sample case",
    money: 4,
    costs: [1, 4, 5, 3, 2],
    expected: [1, 4],
  },
  {
    name: "matches the second sample case with duplicate costs",
    money: 4,
    costs: [2, 2, 4, 3],
    expected: [1, 2],
  },
  {
    name: "returns the pair when the cheaper flavor appears before the complement",
    money: 8,
    costs: [2, 7, 6, 5, 3],
    expected: [1, 3],
  },
  {
    name: "returns ascending 1-based indices even when the match is discovered out of order",
    money: 9,
    costs: [4, 3, 2, 5, 7],
    expected: [1, 4],
  },
  {
    name: "uses two distinct indices when the same cost must be chosen twice",
    money: 6,
    costs: [6, 3, 1, 3],
    expected: [2, 4],
  },
  {
    name: "handles a valid pair that includes the first and last flavors",
    money: 10,
    costs: [4, 1, 9, 7, 6],
    expected: [1, 5],
  },
  {
    name: "returns exactly two indices when the matching cost appears more than twice",
    money: 4,
    costs: [2, 2, 2, 9],
    expected: [1, 2],
  },
  {
    name: "does not return a single index when only one matching half exists",
    money: 6,
    costs: [1, 3, 4],
    expected: [],
  },
] as const;

describe("bruteForce", () => {
  for (const testCase of cases) {
    it(`${testCase.name}: money=${testCase.money} and costs=${testCase.costs}`, () => {
      expect(bruteForce(testCase.money, [...testCase.costs])).toEqual(testCase.expected);
    });
  }
});

describe("optimized", () => {
  for (const testCase of cases) {
    it(`${testCase.name}: money=${testCase.money} and costs=${testCase.costs}`, () => {
      expect(optimized(testCase.money, [...testCase.costs])).toEqual(testCase.expected);
    });
  }
});

describe("bruteForce and optimized parity", () => {
  for (const testCase of cases) {
    it(`returns the same answer for ${testCase.name.toLowerCase()}`, () => {
      expect(optimized(testCase.money, [...testCase.costs])).toEqual(
        bruteForce(testCase.money, [...testCase.costs]),
      );
    });
  }
});
