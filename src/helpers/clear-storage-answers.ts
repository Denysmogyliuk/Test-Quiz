import { QUIZ_STORAGE_KEY } from '@/constants'

export const clearStorageAnswers = (): void => {
  if (typeof window === 'undefined') return

  const prefix = `${QUIZ_STORAGE_KEY}_`

  const keysToRemove: string[] = []

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index)
    if (!key) continue

    if (key === QUIZ_STORAGE_KEY || key.startsWith(prefix)) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key))
}
