import { describe, expect, it } from "vitest";

import { isBalancedBruteForce, isBalancedOptimized } from "./solution.js";

const cases = [
  {
    name: "returns YES for the first sample balanced case",
    input: "{[()]}",
    expected: "YES",
  },
  {
    name: "returns YES for the second sample balanced case",
    input: "{{[[(())]]}}",
    expected: "YES",
  },
  {
    name: "returns NO for the sample unbalanced case",
    input: "{[(])}",
    expected: "NO",
  },
  {
    name: "rejects a string that starts with a closing bracket",
    input: "]",
    expected: "NO",
  },
  {
    name: "rejects mismatched closing before matching openers",
    input: "}{",
    expected: "NO",
  },
  {
    name: "rejects leftover opening brackets",
    input: "(((",
    expected: "NO",
  },
  {
    name: "rejects a partial unfinished nesting",
    input: "{[(",
    expected: "NO",
  },
  {
    name: "accepts the empty string in the local study model",
    input: "",
    expected: "YES",
  },
  {
    name: "catches crossed nesting",
    input: "([)]",
    expected: "NO",
  },
  {
    name: "accepts nested and repeated valid pairs",
    input: "{[()()]}",
    expected: "YES",
  },
] as const;

describe("isBalancedBruteForce", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(isBalancedBruteForce(testCase.input)).toBe(testCase.expected);
    });
  }
});

describe("isBalancedOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(isBalancedOptimized(testCase.input)).toBe(testCase.expected);
    });
  }
});

describe("isBalanced parity", () => {
  for (const testCase of cases) {
    it(`returns the same answer for ${testCase.name.toLowerCase()}`, () => {
      expect(isBalancedOptimized(testCase.input)).toBe(isBalancedBruteForce(testCase.input));
    });
  }
});
