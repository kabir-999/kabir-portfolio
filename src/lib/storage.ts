/**
 * Safe localStorage wrappers. Storage may be disabled, full, or contain malformed
 * data; none of that may break the app. Failures are logged, never silently hidden.
 * Only non-sensitive preferences are stored.
 */
export function readStored<T>(key: string, fallback: T, validate: (v: unknown) => v is T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (validate(parsed)) return parsed
    console.warn(`[kabir-fc] Ignoring invalid stored value for "${key}".`)
    return fallback
  } catch (err) {
    console.warn(`[kabir-fc] Could not read "${key}" from storage; using defaults.`, err)
    return fallback
  }
}

export function writeStored(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`[kabir-fc] Could not persist "${key}"; continuing in memory only.`, err)
    return false
  }
}

export function removeStored(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch (err) {
    console.warn(`[kabir-fc] Could not clear "${key}".`, err)
  }
}

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export const isPreferences = (v: unknown): v is import('../types').Preferences =>
  isRecord(v) &&
  typeof v.formationId === 'string' &&
  typeof v.reduceMotion === 'boolean'
