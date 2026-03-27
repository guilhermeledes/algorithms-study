# Quick Notes

## Difficulty
Medium

## Tags
matrix, graph, dfs, bfs, flood-fill

## Pattern
Mark border-connected cells, then remove the rest.

## Recognition Clues
- Grid with 4-directional connectivity
- Need to remove enclosed regions
- Border-connected cells are special
- No HackerRank path was provided in the transcript source

## Template
1. Traverse the border.
2. DFS/BFS from every border `1`.
3. Mark all reachable `1`s as safe.
4. Sweep the matrix and flip unmarked `1`s to `0`.

## Things to Memorize
- The matrix is already a graph.
- Start from what must stay, not from what might be removed.
- Diagonal contact does not count.
- Single-row and single-column matrices have no removable islands.

## Pitfalls
- Counting diagonal neighbors
- Forgetting to mark visited cells
- Re-running DFS/BFS from cells already processed
- Missing border cells on rectangular matrices

## Variants
- Number of islands
- Surrounded regions
- Flood fill
- Count closed islands

## Self-Check Questions
- What is the brute-force solution?
- Why is the final solution better?
- Which data structure makes this solution efficient?
- What edge case could break a naive implementation?
- How would I explain this solution in under 2 minutes?

## Flashcards
- Q: What pattern does this problem use?
  A: Border-first graph traversal on a matrix.
- Q: What is the key optimization?
  A: Mark all border-connected `1`s first, then clear the rest in one pass.
- Q: What data structure makes the solution efficient?
  A: The matrix plus DFS/BFS state such as a visited set, stack, or queue.
- Q: What is the most important edge case?
  A: Diagonal-only contact, because it looks connected visually but should still be removed.
