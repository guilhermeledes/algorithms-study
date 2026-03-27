/*
 * Remove Islands
 *
 * No HackerRank path was provided in the transcript, so this study case uses a
 * title-based directory.
 *
 * Problem contract inferred from the mock interview transcript:
 * - input: a rectangular matrix of 0s and 1s
 * - 1 represents a black pixel
 * - 0 represents a white pixel
 * - pixels are connected only horizontally and vertically
 * - remove every connected component of 1s that does not touch the border
 * - return the transformed matrix
 *
 * Visual examples:
 *
 * 1. Transcript-style sample
 *    Input:
 *    [
 *      [1, 0, 0, 0, 0, 0],
 *      [0, 1, 0, 1, 1, 1],
 *      [0, 0, 1, 0, 1, 0],
 *      [1, 1, 0, 0, 1, 0],
 *      [1, 0, 1, 1, 0, 0],
 *      [1, 0, 0, 0, 0, 1],
 *    ]
 *
 *    Output:
 *    [
 *      [1, 0, 0, 0, 0, 0],
 *      [0, 0, 0, 1, 1, 1],
 *      [0, 0, 0, 0, 1, 0],
 *      [1, 1, 0, 0, 1, 0],
 *      [1, 0, 0, 0, 0, 0],
 *      [1, 0, 0, 0, 0, 1],
 *    ]
 *
 * 2. Diagonal contact does not count
 *    Input:
 *    [
 *      [1, 0, 0],
 *      [0, 1, 0],
 *      [0, 0, 1],
 *    ]
 *
 *    Output:
 *    [
 *      [1, 0, 0],
 *      [0, 0, 0],
 *      [0, 0, 1],
 *    ]
 *
 * 3. Border-connected path must stay
 *    Input:
 *    [
 *      [1, 0, 0, 0],
 *      [1, 1, 0, 0],
 *      [0, 1, 1, 0],
 *      [0, 0, 1, 0],
 *    ]
 *
 *    Output:
 *    [
 *      [1, 0, 0, 0],
 *      [1, 1, 0, 0],
 *      [0, 1, 1, 0],
 *      [0, 0, 1, 0],
 *    ]
 *
 * Suggested interview framing:
 * - brute force: for every 1, search its component and check whether it reaches
 *   the border
 * - optimized: mark all border-connected 1s first, then clear the remaining 1s
 *
 * Important edge cases:
 * - empty matrix
 * - single row or single column
 * - all 1s already connected to the border
 * - isolated 1s fully enclosed by 0s
 *
 * Expected target:
 * - Time: O(rows * cols)
 * - Space: O(rows * cols) in a straightforward DFS/BFS solution
 */

export type BinaryMatrix = number[][];

export function removeIslandsBrute(matrix: BinaryMatrix): BinaryMatrix {
  const maxRows = matrix.length
  const maxCols = matrix[0]?.length ?? 0

  for (let row = 1; row < maxRows - 1; row++) {
    for (let col = 1; col < maxCols - 1; col++) {
      if (isIslandBrute(matrix, row, col)) {
        matrix[row]![col] = 0
      }
    }
  }
  return matrix
}

function isIslandBrute(matrix: BinaryMatrix, row: number, col: number, caller?: { row: number, col: number }): boolean {
  const curr = matrix[row]![col]
  if ((
    (row === 0) ||
    (row === matrix.length - 1) ||
    (col === 0) ||
    (col === matrix[0]!.length - 1)
  ) &&
    (curr === 1)) {
    return false
  }

  if (curr === 0) {
    return true
  }

  const left = { row, col: col - 1 }
  const right = { row, col: col + 1 }
  const top = { col, row: row - 1 }
  const botton = { col, row: row + 1 }

  if (((caller?.row !== left.row || caller?.col !== left.col) && !isIslandBrute(matrix, left.row, left.col, { row, col })) ||
    ((caller?.row !== right.row || caller?.col !== right.col) && !isIslandBrute(matrix, right.row, right.col, { row, col })) ||
    ((caller?.row !== top.row || caller?.col !== top.col) && !isIslandBrute(matrix, top.row, top.col, { row, col })) ||
    ((caller?.row !== botton.row || caller?.col !== botton.col) && !isIslandBrute(matrix, botton.row, botton.col, { row, col }))
  ) {
    return false
  }

  return true
}

function toKey(row: number, col: number): string {
  return `${row}:${col}`
}

function deepMarkFrom(row: number, col: number, validCells: Set<string>, matrix: BinaryMatrix): void {
  const rowCount = matrix.length
  const colCount = matrix[0]?.length ?? 0
  const key = toKey(row, col)

  if (
    row < 0 ||
    row >= rowCount ||
    col < 0 ||
    col >= colCount ||
    matrix[row]![col] === 0 ||
    validCells.has(key)
  ) {
    return
  }

  validCells.add(key)

  deepMarkFrom(row, col - 1, validCells, matrix)
  deepMarkFrom(row, col + 1, validCells, matrix)
  deepMarkFrom(row - 1, col, validCells, matrix)
  deepMarkFrom(row + 1, col, validCells, matrix)
}

export function removeIslandsOptimized(matrix: BinaryMatrix): BinaryMatrix {
  const rowCount = matrix.length
  const colCount = matrix[0]?.length ?? 0
  const validCells = new Set<string>()

  for (let col = 0; col < colCount; col++) {
    if (matrix[0]?.[col] === 1) {
      deepMarkFrom(0, col, validCells, matrix)
    }
    if (matrix[rowCount - 1]?.[col] === 1) {
      deepMarkFrom(rowCount - 1, col, validCells, matrix)
    }
  }

  for (let row = 0; row < rowCount; row++) {
    if (matrix[row]?.[0] === 1) {
      deepMarkFrom(row, 0, validCells, matrix)
    }
    if (matrix[row]?.[colCount - 1] === 1) {
      deepMarkFrom(row, colCount - 1, validCells, matrix)
    }
  }

  for (let row = 1; row < rowCount - 1; row++) {
    for (let col = 1; col < colCount - 1; col++) {
      if (matrix[row]![col] === 1 && !validCells.has(toKey(row, col))) {
        matrix[row]![col] = 0
      }
    }
  }

  return matrix
}
