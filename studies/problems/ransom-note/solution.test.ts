import { describe, expect, it } from "vitest";

import {
  canConstructRansomNoteBrute,
  canConstructRansomNoteOptimized,
  checkMagazine,
} from "./solution.js";

const cases = [
  {
    name: "matches the yes sample",
    magazine: ["give", "me", "one", "grand", "today", "night"],
    note: ["give", "one", "grand", "today"],
    expected: "Yes",
  },
  {
    name: "matches the no sample with a missing duplicate",
    magazine: ["two", "times", "three", "is", "not", "four"],
    note: ["two", "times", "two", "is", "four"],
    expected: "No",
  },
  {
    name: "matches the no sample with a missing word",
    magazine: ["ive", "got", "a", "lovely", "bunch", "of", "coconuts"],
    note: ["ive", "got", "some", "coconuts"],
    expected: "No",
  },
  {
    name: "fails when case does not match exactly",
    magazine: ["attack", "at", "dawn"],
    note: ["Attack", "at", "dawn"],
    expected: "No",
  },
  {
    name: "succeeds when duplicates are available in sufficient quantity",
    magazine: ["hello", "world", "hello"],
    note: ["hello", "hello"],
    expected: "Yes",
  },
  {
    name: "handles an empty note",
    magazine: ["any", "words", "here"],
    note: [],
    expected: "Yes",
  },
] as const;

describe("canConstructRansomNoteBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(canConstructRansomNoteBrute(testCase.magazine, testCase.note)).toBe(
        testCase.expected,
      );
    });
  }
});

describe("canConstructRansomNoteOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(canConstructRansomNoteOptimized(testCase.magazine, testCase.note)).toBe(
        testCase.expected,
      );
    });
  }
});

describe("checkMagazine", () => {
  for (const testCase of cases) {
    it(`returns the correct answer when it ${testCase.name}`, () => {
      expect(checkMagazine([...testCase.magazine], [...testCase.note])).toBe(testCase.expected);
    });
  }
});
