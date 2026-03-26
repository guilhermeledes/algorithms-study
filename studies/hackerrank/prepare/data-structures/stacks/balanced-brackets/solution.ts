/*
 * Balanced Brackets
 * HackerRank path: Prepare > Data Structures > Stacks > Balanced Brackets
 *
 * HackerRank expects the exact function signature `isBalanced(s: string): string`,
 * so this file keeps that wrapper while also exporting explicit brute-force and
 * optimized study functions for local comparison.
 *
 * Main idea:
 * Use a stack to track opening brackets and match each closing bracket as it appears.
 *
 * Pattern:
 * Stack / delimiter matching.
 *
 * Brute force vs optimized:
 * This file includes both:
 * - `isBalancedBruteForce`: repeatedly remove adjacent pairs until the string stops changing
 * - `isBalancedOptimized`: the optimized one-pass stack solution used as the final answer
 *
 * The brute-force version works, but repeated string rebuilding is less direct and can degrade
 * toward quadratic time. A stack solves it in one left-to-right pass.
 *
 * Important edge cases:
 * - A closing bracket appears before any matching opener.
 * - Bracket types cross, such as "{[(])}".
 * - Openers remain in the stack after the scan ends.
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 */

const matchingOpenBracket: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
};

const openBrackets = new Set(["(", "[", "{"]);

export function isBalancedBruteForce(s: string): string {
  let current = s;

  while (true) {
    const next = current.replaceAll("()", "").replaceAll("[]", "").replaceAll("{}", "");

    if (next === current) {
      return next.length === 0 ? "YES" : "NO";
    }

    current = next;
  }
}

export function isBalancedOptimized(s: string): string {
  const stack: string[] = [];

  for (const bracket of s) {
    if (openBrackets.has(bracket)) {
      stack.push(bracket);
      continue;
    }

    const expectedOpenBracket = matchingOpenBracket[bracket];
    const top = stack.pop();

    if (top !== expectedOpenBracket) {
      return "NO";
    }
  }

  return stack.length === 0 ? "YES" : "NO";
}

export function isBalanced(s: string): string {
  return isBalancedOptimized(s);
}
