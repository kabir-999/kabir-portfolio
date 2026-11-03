import { useCallback, useEffect, useState } from 'react'
import { readStored, writeStored } from '../lib/storage'

/** useState that hydrates from, and persists to, localStorage with validation. */
export function usePersistentState<T>(
  key: string,
  initial: T,
  validate: (v: unknown) => v is T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => readStored(key, initial, validate))

  useEffect(() => {
    writeStored(key, value)
  }, [key, value])

  const set = useCallback((updater: T | ((prev: T) => T)) => setValue(updater), [])
  return [value, set]
}
