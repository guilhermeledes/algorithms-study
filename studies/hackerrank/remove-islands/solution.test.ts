import { describe, expect, it } from "vitest";

import { removeIslandsBrute, removeIslandsOptimized, type BinaryMatrix } from "./solution.js";

function cloneMatrix(matrix: BinaryMatrix): BinaryMatrix {
  return matrix.map((row) => [...row]);
}

const cases = [
  {
    name: "removes interior islands from the transcript sample",
    input: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 1, 1],
      [0, 0, 1, 0, 1, 0],
      [1, 1, 0, 0, 1, 0],
      [1, 0, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 1],
    ] satisfies BinaryMatrix,
    expected: [
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 0],
      [1, 1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1],
    ] satisfies BinaryMatrix,
  },
  {
    name: "keeps 1s that are connected to the border through a path",
    input: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
    ] satisfies BinaryMatrix,
    expected: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
    ] satisfies BinaryMatrix,
  },
  {
    name: "does not count diagonal contact as border connectivity",
    input: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ] satisfies BinaryMatrix,
    expected: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ] satisfies BinaryMatrix,
  },
  {
    name: "leaves matrices unchanged when every 1 touches the border",
    input: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ] satisfies BinaryMatrix,
    expected: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ] satisfies BinaryMatrix,
  },
  {
    name: "clears a fully enclosed single-cell island",
    input: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ] satisfies BinaryMatrix,
    expected: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ] satisfies BinaryMatrix,
  },
  {
    name: "handles a single-row matrix where every cell is on the border",
    input: [[1, 0, 1, 1, 0]] satisfies BinaryMatrix,
    expected: [[1, 0, 1, 1, 0]] satisfies BinaryMatrix,
  },
  {
    name: "handles a single-column matrix where every cell is on the border",
    input: [[1], [0], [1], [1], [0]] satisfies BinaryMatrix,
    expected: [[1], [0], [1], [1], [0]] satisfies BinaryMatrix,
  },
  {
    name: "keeps a long winding path of 1s when it eventually reaches the border",
    input: [
      [0, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 1],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
    ] satisfies BinaryMatrix,
    expected: [
      [0, 0, 0, 0, 0, 1],
      [0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 1],
      [0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
    ] satisfies BinaryMatrix,
  },
] as const;

describe("removeIslandsBrute", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(removeIslandsBrute(cloneMatrix(testCase.input))).toEqual(testCase.expected);
    });
  }
});

describe("removeIslandsOptimized", () => {
  for (const testCase of cases) {
    it(testCase.name, () => {
      expect(removeIslandsOptimized(cloneMatrix(testCase.input))).toEqual(testCase.expected);
    });
  }
});
