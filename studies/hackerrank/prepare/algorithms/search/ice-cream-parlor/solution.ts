/*
 * Ice Cream Parlor
 * HackerRank path: Prepare > Algorithms > Search > Ice Cream Parlor
 *
 * HackerRank expects the exact function signature
 * `icecreamParlor(m: number, arr: number[]): number[]`.
 *
 * Contract:
 * - input: `m`, the exact amount of money to spend
 * - input: `arr`, the flavor costs
 * - output: the two 1-based flavor indices in ascending order
 *
 * Constraints from the prompt:
 * - choose two distinct flavors
 * - spend all the money
 * - there is always a unique solution
 *
 * Main idea:
 * Build a map from each cost to all of its 1-based indices, then look for the
 * complementary cost needed to reach `money`.
 *
 * Pattern:
 * Two-sum / hash lookup.
 *
 * Brute force vs optimized:
 * - `bruteForce`: try every pair of indices
 * - `optimized`: preprocess prices into a map, then match each unique price to
 *   its complement in O(1) lookup time
 *
 * Important edge cases:
 * - the solution can require the same numeric cost twice, so we need two
 *   distinct stored indices
 * - duplicate costs can appear more than twice, but the answer must still
 *   return exactly two indices
 * - returned indices must stay 1-based and ascending
 *
 * Time complexity:
 * - `bruteForce`: O(n^2)
 * - `optimized`: O(n)
 *
 * Space complexity:
 * - `bruteForce`: O(1) auxiliary space
 * - `optimized`: O(n)
 */

export function bruteForce(money: number, prices: number[]): number[] {
  const result: number[] = [];

  for (let idxA = 0; idxA < prices.length; idxA++) {
    for (let idxB = idxA + 1; idxB < prices.length; idxB++) {
      if (prices[idxA]! + prices[idxB]! === money) {
        result.push(idxA + 1, idxB + 1);
        break;
      }
    }

    if (result.length > 0) {
      break;
    }
  }

  return result;
}

function buildMap(arr: number[]): Map<number, number[]> {
  const result = new Map<number, number[]>();

  for (let i = 0; i < arr.length; i++) {
    const price = arr[i]!;
    const exists = result.get(price);

    if (exists) {
      exists.push(i + 1);
      continue;
    }

    // Indices are stored in encounter order, so each price keeps ascending
    // 1-based positions ready for the final answer format.
    result.set(price, [i + 1]);
  }

  return result;
}

export function optimized(money: number, prices: number[]): number[] {
  const hashPrices = buildMap(prices);

  for (const [price, idxs] of hashPrices) {
    const expectedPrice = money - price;

    // If the complement is the same value, we need two separate flavors with
    // that same cost.
    if (expectedPrice === price && idxs.length >= 2) {
      return [idxs[0]!, idxs[1]!];
    }

    const secondPrice = hashPrices.get(expectedPrice);

    // For different values, the first stored index for each price is enough
    // because the prompt guarantees a unique solution.
    if (secondPrice && expectedPrice !== price) {
      return [idxs[0]!, secondPrice[0]!];
    }
  }

  return [];
}

export function icecreamParlor(m: number, arr: number[]): number[] {
  return optimized(m, arr);
}
