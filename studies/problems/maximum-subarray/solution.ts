/*
 * The Maximum Subarray
 */

export function maxSubarrayBruteForce(arr: number[]): [number, number] {
  let bestSubarraySum = Number(arr[0]);
  let bestSubsequenceSum = Number(arr[0]);
  let positiveSum = 0;
  let hasPositive = false;

  for (let i = 0; i < arr.length; i++) {
    let currentSubarraySum = 0;
    const currI = Number(arr[i])

    if (currI > 0) {
      positiveSum += currI;
      hasPositive = true;
    } else if (currI > bestSubsequenceSum) {
      bestSubsequenceSum = currI;
    }

    for (let j = i; j < arr.length; j++) {
      currentSubarraySum += Number(arr[j]);

      if (currentSubarraySum > bestSubarraySum) {
        bestSubarraySum = currentSubarraySum;
      }
    }
  }

  if (hasPositive) {
    bestSubsequenceSum = positiveSum;
  }

  return [bestSubarraySum, bestSubsequenceSum];
}

export function maxSubarrayOptimized(arr: number[]): [number, number] {
  let currentSubarraySum = 0
  let bestSubarraySum = Number(arr[0])
  let maxSequence = bestSubarraySum
  let positiveSum = 0
  let hasPositive = false
  for (const curr of arr) {
    currentSubarraySum += curr
    if (curr > 0) {
      hasPositive = true
      positiveSum += curr
    } else if (curr > maxSequence) {
      maxSequence = curr
    }
    if (currentSubarraySum > bestSubarraySum) {
      bestSubarraySum = currentSubarraySum
    }
    if (currentSubarraySum < 0) {
      currentSubarraySum = 0
    }
  }
  if (hasPositive) {
    maxSequence = positiveSum
  }
  return [bestSubarraySum, maxSequence]
}

export function maxSubarray(arr: number[]): [number, number] {
  return maxSubarrayOptimized(arr);
}
