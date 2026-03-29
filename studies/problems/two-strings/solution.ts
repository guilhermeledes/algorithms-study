/*
 * Two Strings
 */

export function twoStringsBrute(s1: string, s2: string): string {
  for (const c1 of s1) {
    for (const c2 of s2) {
      if (c1 === c2) {
        return "YES"
      }
    }
  }
  return "NO"
}

export function twoStringsOptimized(s1: string, s2: string): string {
  const m1 = new Set(s1)
  for (const c2 of s2) {
    if (m1.has(c2)) {
      return "YES"
    }
  }
  return "NO"
}

export function twoStrings(s1: string, s2: string): string {
  return twoStringsOptimized(s1, s2)
}
