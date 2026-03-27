/*
 * Queue using Two Stacks
 *
 * This file is intentionally scaffolded on `main`.
 * Use the corresponding `solve/queue-using-two-stacks` worktree for the completed implementation.
 */

export type QueueQuery = readonly [1, number] | readonly [2] | readonly [3];

export function processQueueUsingTwoStacksBrute(queries: readonly QueueQuery[]): number[] {
  const printResult: number[] = [];
  const queue: number[] = [];

  const queryProcessor = {
    1: (x: number) => queue.push(x),
    2: () => queue.shift(),
    3: () => printResult.push(queue[0]!),
  };

  for (const message of queries) {
    queryProcessor[message[0]](message[1]!);
  }

  return printResult;
}

export function processQueueUsingTwoStacksOptimized(
  queries: readonly QueueQuery[],
): number[] {
  const printResult: number[] = [];
  const inStack: number[] = [];
  const outStack: number[] = [];

  const refillOutStack = () => {
    if (outStack.length > 0) {
      return;
    }

    while (inStack.length > 0) {
      outStack.push(inStack.pop()!);
    }
  };

  for (const message of queries) {
    if (message[0] === 1) {
      inStack.push(message[1]);
      continue;
    }

    refillOutStack();

    if (message[0] === 2) {
      outStack.pop();
      continue;
    }

    printResult.push(outStack[outStack.length - 1]!);
  }

  return printResult;
}

export function processQueueUsingTwoStacks(queries: readonly QueueQuery[]): number[] {
  return processQueueUsingTwoStacksOptimized(queries);
}
