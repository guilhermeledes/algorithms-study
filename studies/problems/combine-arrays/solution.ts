/*
 * Combine Arrays
 */

export function combineArraysBruteForce(a: number[], b: number[]): number[] {
  const result = [...a, ...b];

  for (let i = 0; i < result.length; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[j]! < result[i]!) {
        const temp = result[i]!;
        result[i] = result[j]!;
        result[j] = temp;
      }
    }
  }

  return result;
}

export function combineArraysOptimized(a: number[], b: number[]): number[] {
  const result: number[] = [];
  let i = 0,
    j = 0;

  while (i < a.length || j < b.length) {
    const currA = a[i];
    const currB = b[j];
    if (currB === undefined || currB > currA!) {
      result.push(currA!);
      i++;
      continue;
    }
    result.push(currB);
    j++;
  }

  return result;
}

export function combineArrays(a: number[], b: number[]): number[] {
  return combineArraysOptimized(a, b);
}
