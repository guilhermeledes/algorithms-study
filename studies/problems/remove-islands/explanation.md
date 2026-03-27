# Remove Islands

## Problem Summary
Given a rectangular matrix of `0`s and `1`s, remove every group of `1`s that is not connected to the border. Cells are connected only in the four cardinal directions: up, down, left, and right.

No HackerRank path was provided in the transcript source for this study case.

## Pattern
Matrix traversal with graph search on connected components.

## Recognition Clues
- The matrix can be treated as an implicit graph.
- The prompt defines connectivity using up, down, left, and right neighbors.
- You need to keep one kind of connected component and remove another.
- Border-connected cells have special meaning, which is a strong DFS/BFS signal.

## Brute Force Approach
For every `1` in the matrix:
- run a DFS or BFS to explore its whole component
- track whether that component touches the border
- if it does not, turn every cell in that component into `0`

This works, but it can repeat work across the same component unless you are careful with visited state.

## Optimized Approach
Instead of asking which `1`s should be removed first, ask which `1`s must be preserved:
- start from every border cell containing `1`
- DFS/BFS from those cells and mark all border-connected `1`s as safe
- scan the matrix once more
- turn every unmarked `1` into `0`

## Core Idea
Any `1` that survives must belong to a connected component that reaches the border. So the cleanest strategy is to mark all border-reachable `1`s, then delete everything else.

## Step-by-Step Reasoning
1. Treat the matrix as a graph where each cell can connect to up to four neighbors.
2. Visit the border cells only.
3. Whenever a border cell contains `1`, traverse its whole component.
4. Mark every visited `1` as safe.
5. After all border-connected components are marked, scan the whole matrix.
6. Any remaining `1` was enclosed and should be replaced with `0`.

## Data Structures Used
- the input matrix
- a visited or safe marker structure, or an in-place sentinel marking strategy
- a DFS recursion stack or BFS queue

## Algorithm
1. Read the matrix dimensions.
2. Iterate over the first row, last row, first column, and last column.
3. For each border cell equal to `1`, run DFS or BFS.
4. Mark every reachable `1` as border-connected.
5. Iterate through the entire matrix.
6. Replace each `1` that was never marked with `0`.
7. Convert temporary marks back to `1` if you used in-place marking.
8. Return the transformed matrix.

## Complexity
- Time: `O(rows * cols)`
- Space: `O(rows * cols)` with a visited set, or `O(rows * cols)` worst-case recursion/queue usage even with in-place marking

## Edge Cases
- Empty matrix
- Single row or single column, where every cell is automatically on the border
- Diagonally adjacent `1`s that are not actually connected
- One-cell islands surrounded by `0`s
- Large components that snake to the border through a narrow path

## Common Mistakes
- Treating diagonal neighbors as connected
- Starting a search from every `1` instead of focusing on border-connected components
- Forgetting that a long interior path can still reach the border
- Accidentally mutating visited cells without restoring them correctly
- Missing the single-row and single-column cases

## How to Explain It Live
I treat the matrix like a graph. A `1` should stay only if its component reaches the border. So instead of searching for islands to delete, I start from all border `1`s, mark every connected `1` as safe with DFS or BFS, then do one final pass and flip every unmarked `1` to `0`.

## Interview Notes
This problem is easier when framed as preservation instead of deletion. The matrix already gives you the graph, so there is no need to build an adjacency list. The strongest interview version is a clean border traversal followed by one cleanup pass.
