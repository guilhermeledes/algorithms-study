/*
 * Ransom Note
 */

export function canConstructRansomNoteBrute(
  magazine: readonly string[],
  note: readonly string[],
): "Yes" | "No" {
  const mutableList = [...magazine]
  for (const word of note) {
    const idx = mutableList.indexOf(word)
    if (idx === -1) {
      return "No"
    }
    mutableList.splice(idx, 1)
  }

  return "Yes"
}

export function canConstructRansomNoteOptimized(
  magazine: readonly string[],
  note: readonly string[],
): "Yes" | "No" {
  const magazineWords = new Map<string,number>
  for (const word of magazine) {
    magazineWords.set(word, (magazineWords.get(word) ?? 0) +1)
  }

  for (const word of note) {
    const exists = magazineWords.get(word)
    if (!exists) {
      return "No"
    }
    magazineWords.set(word, exists-1)
  }

  return "Yes"
}

export function checkMagazine(magazine: string[], note: string[]): string {
  return canConstructRansomNoteOptimized(magazine, note)
}
