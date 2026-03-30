# Algorithm Pattern Cheat Sheet

Lean recall sheet built from the solved `solve/*` worktrees.

## Balanced Brackets

Pattern: stack / delimiter matching

Use it when:
- You must validate nested pairs like `()`, `[]`, `{}`
- Every closing token must match the most recent unmatched opener
- Order matters more than counts

Implementation hints:
- Push openers
- On a closer, pop once and compare against the expected opener
- Fail immediately on mismatch
- At the end, the stack must be empty

Brute hints:
- Repeatedly remove direct pairs `()`, `[]`, `{}`
- Stop when a full pass makes no change
- Empty string means valid, leftovers mean invalid

Brute snippet:

```ts
let current = s;

while (true) {
  const next = current.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");

  if (next === current) {
    return next.length === 0 ? "YES" : "NO";
  }

  current = next;
}
```

Optimized snippet:

```ts
const matchingOpenBracket: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
};

const openBrackets = new Set(["(", "[", "{"]);

const stack: string[] = [];

for (const bracket of s) {
  if (openBrackets.has(bracket)) {
    stack.push(bracket);
    continue;
  }

  if (stack.pop() !== matchingOpenBracket[bracket]) {
    return "NO";
  }
}

return stack.length === 0 ? "YES" : "NO";
```

## Ice Cream Parlor

Pattern: two-sum with hash map

Use it when:
- You need two values that add to a target
- Lookups matter more than sorted order
- Duplicates may exist and indices matter

Implementation hints:
- Store `cost -> list of 1-based indices`
- For each cost, compute `target - cost`
- Handle the `same cost twice` case separately
- Return stored indices, not values

Brute hints:
- Try every pair of indices
- Check whether their sum matches the target
- Return the first valid 1-based pair

Brute snippet:

```ts
for (let idxA = 0; idxA < prices.length; idxA++) {
  for (let idxB = idxA + 1; idxB < prices.length; idxB++) {
    if (prices[idxA]! + prices[idxB]! === money) {
      return [idxA + 1, idxB + 1];
    }
  }
}

return [];
```

Optimized snippet:

```ts
const hashPrices = buildMap(prices);

for (const [price, idxs] of hashPrices) {
  const expectedPrice = money - price;

  if (expectedPrice === price && idxs.length >= 2) {
    return [idxs[0]!, idxs[1]!];
  }

  const secondPrice = hashPrices.get(expectedPrice);
  if (secondPrice && expectedPrice !== price) {
    return [idxs[0]!, secondPrice[0]!];
  }
}

return [];
```

## Making Anagrams

Pattern: frequency counting

Use it when:
- Two strings must be compared by character inventory
- You only care about counts, not positions
- The answer is "how many extras remain?"

Implementation hints:
- Increment counts from the first string
- Decrement counts from the second
- Sum absolute leftovers

Brute hints:
- Treat one string as a mutable pool of characters
- For each character in the other string, remove one match if present
- Missing matches and leftover characters both contribute to deletions

Brute snippet:

```ts
let deletions = 0;
const remainingA = a.split("");

for (const charB of b) {
  const idxA = remainingA.indexOf(charB);
  if (idxA === -1) deletions++;
  else remainingA.splice(idxA, 1);
}

return deletions + remainingA.length;
```

Optimized snippet:

```ts
const matches = new Map<string, number>();

for (const char of a) {
  matches.set(char, (matches.get(char) || 0) + 1);
}

for (const char of b) {
  matches.set(char, (matches.get(char) || 0) - 1);
}

let count = 0;
matches.forEach((value) => {
  count += Math.abs(value);
});

return count;
```

## The Maximum Subarray

Pattern: Kadane + positive-sum subsequence

Use it when:
- You need the best contiguous sum
- Local negative prefixes should be discarded
- There is also a separate non-contiguous maximum subsequence answer

Implementation hints:
- Keep a running subarray sum
- Update the best seen sum each step
- Reset the running sum when it becomes negative
- For the subsequence answer, sum positives, or fall back to the largest value if all are negative

Brute hints:
- Start a subarray at every index
- Expand it to every possible end index
- Track the best contiguous sum seen across all ranges
- Separately accumulate the positive-value subsequence logic

Brute snippet:

```ts
let bestSubarraySum = Number(arr[0]);

for (let i = 0; i < arr.length; i++) {
  let currentSubarraySum = 0;

  for (let j = i; j < arr.length; j++) {
    currentSubarraySum += Number(arr[j]);
    if (currentSubarraySum > bestSubarraySum) {
      bestSubarraySum = currentSubarraySum;
    }
  }
}
```

Optimized snippet:

```ts
let currentSubarraySum = 0;
let bestSubarraySum = Number(arr[0]);
let bestSubsequenceSum = bestSubarraySum;
let positiveSum = 0;
let hasPositive = false;

for (const curr of arr) {
  currentSubarraySum += curr;

  if (curr > 0) {
    hasPositive = true;
    positiveSum += curr;
  } else if (curr > bestSubsequenceSum) {
    bestSubsequenceSum = curr;
  }

  if (currentSubarraySum > bestSubarraySum) {
    bestSubarraySum = currentSubarraySum;
  }

  if (currentSubarraySum < 0) {
    currentSubarraySum = 0;
  }
}

if (hasPositive) {
  bestSubsequenceSum = positiveSum;
}
```

## Number of Matching Subsequences

Pattern: preprocess positions + binary search

Use it when:
- Many candidate words are checked against the same source string
- Character order matters but adjacency does not
- Re-scanning the full source for each word is too expensive

Implementation hints:
- Build `char -> sorted positions[]`
- For each word, keep `previousIndex`
- For each next character, binary-search the first position greater than `previousIndex`
- If none exists, the word is not a subsequence

Brute hints:
- For each word, scan the source string from left to right
- Advance the word pointer only when characters match
- If the whole word is consumed, it is a subsequence

Brute snippet:

```ts
let sIndex = 0;
let wordIndex = 0;

while (sIndex < s.length && wordIndex < word.length) {
  if (s[sIndex] === word[wordIndex]) {
    wordIndex++;
  }
  sIndex++;
}

return wordIndex === word.length;
```

Optimized snippet:

```ts
const positionsByCharacter = new Map<string, number[]>();

for (let index = 0; index < s.length; index++) {
  const character = s[index]!;
  const positions = positionsByCharacter.get(character);

  if (positions) positions.push(index);
  else positionsByCharacter.set(character, [index]);
}

let previousIndex = -1;

for (const character of word) {
  const positions = positionsByCharacter.get(character);
  if (!positions) return false;

  const nextIndex = findFirstIndexGreaterThan(positions, previousIndex);
  if (nextIndex === undefined) return false;

  previousIndex = nextIndex;
}

return true;
```

## Queue Using Two Stacks

Pattern: queue simulation with amortized stack transfer

Use it when:
- The prompt forces queue behavior but gives stack primitives
- You need FIFO with cheap repeated front operations
- Moving elements every time would be wasteful

Implementation hints:
- Push new items into `inStack`
- Only refill `outStack` when it is empty
- After refill, the top of `outStack` is the queue front

Brute hints:
- Simulate the queue directly with one array
- `push` for enqueue
- `shift` for dequeue
- Read index `0` for front/print

Brute snippet:

```ts
const queue: number[] = [];

for (const message of queries) {
  if (message[0] === 1) queue.push(message[1]);
  else if (message[0] === 2) queue.shift();
  else printResult.push(queue[0]!);
}
```

Optimized snippet:

```ts
const inStack: number[] = [];
const outStack: number[] = [];

const refillOutStack = () => {
  if (outStack.length > 0) return;

  while (inStack.length > 0) {
    outStack.push(inStack.pop()!);
  }
};

if (query[0] === 1) inStack.push(query[1]);
else {
  refillOutStack();
  if (query[0] === 2) outStack.pop();
  else printResult.push(outStack[outStack.length - 1]!);
}
```

## Ransom Note

Pattern: word frequency map

Use it when:
- One multiset must be constructed from another
- Reuse is limited by available counts
- Matching exact words matters more than order

Implementation hints:
- Count all magazine words
- For each note word, consume one count
- Fail on missing or exhausted entries

Brute hints:
- Copy the magazine words into a mutable list
- For each note word, search linearly for one occurrence
- Remove matched words so they cannot be reused

Brute snippet:

```ts
const mutableList = [...magazine];

for (const word of note) {
  const idx = mutableList.indexOf(word);
  if (idx === -1) return "No";
  mutableList.splice(idx, 1);
}

return "Yes";
```

Optimized snippet:

```ts
const magazineWords = new Map<string, number>();

for (const word of magazine) {
  magazineWords.set(word, (magazineWords.get(word) ?? 0) + 1);
}

for (const word of note) {
  const exists = magazineWords.get(word);
  if (!exists) return "No";

  magazineWords.set(word, exists - 1);
}

return "Yes";
```

## Remove Islands

Pattern: border-first DFS on a grid

Use it when:
- Interior regions should be removed unless connected to the border
- Connectivity is 4-directional
- It is easier to preserve valid cells than to prove each interior region invalid

Implementation hints:
- Start DFS/BFS only from border `1`s
- Mark all border-connected cells as safe
- Sweep the interior and zero any unmarked `1`

Brute hints:
- For each interior `1`, explore its whole component
- If any cell in that component touches the border, keep it
- Otherwise flip the explored component to `0`
- This repeats a lot of work across overlapping searches

Brute snippet:

```ts
for (let row = 1; row < maxRows - 1; row++) {
  for (let col = 1; col < maxCols - 1; col++) {
    if (isIslandBrute(matrix, row, col)) {
      matrix[row]![col] = 0;
    }
  }
}

return matrix;
```

Optimized snippet:

```ts
const validCells = new Set<string>();

for (let col = 0; col < colCount; col++) {
  if (matrix[0]?.[col] === 1) deepMarkFrom(0, col, validCells, matrix);
  if (matrix[rowCount - 1]?.[col] === 1) {
    deepMarkFrom(rowCount - 1, col, validCells, matrix);
  }
}

for (let row = 1; row < rowCount - 1; row++) {
  for (let col = 1; col < colCount - 1; col++) {
    if (matrix[row]![col] === 1 && !validCells.has(`${row}:${col}`)) {
      matrix[row]![col] = 0;
    }
  }
}
```

## Two Strings

Pattern: set intersection

Use it when:
- You only need to know whether two inputs share at least one item
- Duplicates do not matter
- The fastest path is membership testing, not pair comparison

Implementation hints:
- Build a set from one string
- Scan the other string once
- Return as soon as one shared character is found

Brute hints:
- Compare every character in the first string against every character in the second
- Stop immediately on the first match
- If no pair matches, answer is negative

Brute snippet:

```ts
for (const c1 of s1) {
  for (const c2 of s2) {
    if (c1 === c2) {
      return "YES";
    }
  }
}

return "NO";
```

Optimized snippet:

```ts
const seen = new Set(s1);

for (const char of s2) {
  if (seen.has(char)) {
    return "YES";
  }
}

return "NO";
```

## Fast Pattern Picker

| If the prompt sounds like... | Reach for... |
| --- | --- |
| "valid nesting / matching open and close" | stack |
| "two values add to target" | hash map / two-sum |
| "can build from counts / deletions / inventory" | frequency map |
| "best contiguous sum" | Kadane |
| "many words against the same source string" | indexed subsequence lookup |
| "queue behavior from stack operations" | two stacks |
| "remove enclosed regions in a grid" | border-first DFS/BFS |
| "share at least one common character" | set intersection |
