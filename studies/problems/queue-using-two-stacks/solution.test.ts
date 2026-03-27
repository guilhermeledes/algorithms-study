import { describe, expect, it } from "vitest";

import {
  processQueueUsingTwoStacksBrute,
  processQueueUsingTwoStacksOptimized,
  type QueueQuery,
} from "./solution.js";

const cases = [
  {
    name: "matches the sample sequence",
    queries: [
      [1, 42],
      [2],
      [1, 14],
      [3],
      [1, 28],
      [3],
      [1, 60],
      [1, 78],
      [2],
      [2],
    ] satisfies readonly QueueQuery[],
    expected: [14, 14],
  },
  {
    name: "prints the oldest enqueued value before any dequeues",
    queries: [
      [1, 1],
      [1, 2],
      [1, 3],
      [3],
    ] satisfies readonly QueueQuery[],
    expected: [1],
  },
  {
    name: "handles alternating enqueue, dequeue, and print operations",
    queries: [
      [1, 5],
      [1, 7],
      [2],
      [1, 9],
      [3],
      [2],
      [3],
    ] satisfies readonly QueueQuery[],
    expected: [7, 9],
  },
  {
    name: "supports repeated front checks without mutating the queue",
    queries: [
      [1, 11],
      [1, 13],
      [3],
      [3],
      [2],
      [3],
    ] satisfies readonly QueueQuery[],
    expected: [11, 11, 13],
  },
  {
    name: "works when the queue becomes empty and is filled again",
    queries: [
      [1, 4],
      [2],
      [1, 8],
      [1, 10],
      [3],
      [2],
      [3],
    ] satisfies readonly QueueQuery[],
    expected: [8, 10],
  },
] as const;

describe("processQueueUsingTwoStacksBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(processQueueUsingTwoStacksBrute(testCase.queries)).toEqual(testCase.expected);
    });
  }
});

describe("processQueueUsingTwoStacksOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(processQueueUsingTwoStacksOptimized(testCase.queries)).toEqual(testCase.expected);
    });
  }
});

describe("processQueueUsingTwoStacks parity", () => {
  for (const testCase of cases) {
    it(`returns the same answer for ${testCase.name.toLowerCase()}`, () => {
      expect(processQueueUsingTwoStacksOptimized(testCase.queries)).toEqual(
        processQueueUsingTwoStacksBrute(testCase.queries),
      );
    });
  }
});
