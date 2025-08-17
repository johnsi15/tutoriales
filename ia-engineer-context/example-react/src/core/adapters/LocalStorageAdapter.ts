export class LocalStorageAdapter {
  private readonly storage: Storage

  constructor(storage: Storage = localStorage) {
    this.storage = storage
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  clear(): void {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null
  }
}
