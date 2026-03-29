/*
 * Making Anagrams
 */

const notImplementedMessage =
  "Not implemented on main; use the solve/making-anagrams worktree.";

export function makeAnagramBrute(a: string, b: string): number {
  let deletions = 0
  const remainingA = a.split('')
  
  for (const charB of b) {
    const idxA = remainingA.indexOf(charB)
    if (idxA === -1) {
      deletions++
      continue
    }
    remainingA.splice(idxA, 1)
  }

  return deletions + remainingA.length
}

export function makeAnagramOptimized(a: string, b: string): number {
  const matches = new Map<string,number>()
  for (const char of a) {
    matches.set(char, (matches.get(char) || 0) + 1)
  }
  for (const char of b) {
    matches.set(char, (matches.get(char) || 0) - 1)
  }
  let count = 0
  matches.forEach(val => {
    if (val < 0) {
      count += -val
      return
    }
    count += val
  })
  return count  
}

export function makeAnagram(a: string, b: string): number {
  return makeAnagramOptimized(a,b)
}
