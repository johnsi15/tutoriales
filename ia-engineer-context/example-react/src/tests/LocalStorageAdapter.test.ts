import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LocalStorageAdapter } from '../core/adapters/LocalStorageAdapter'

describe('LocalStorageAdapter', () => {
  let mockStorage: Storage
  let adapter: LocalStorageAdapter

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    }
    adapter = new LocalStorageAdapter(mockStorage)
  })

  it('should get item from storage', () => {
    const testData = { id: 1, name: 'test' }
    mockStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(testData))

    const result = adapter.get('test-key')

    expect(mockStorage.getItem).toHaveBeenCalledWith('test-key')
    expect(result).toEqual(testData)
  })

  it('should set item to storage', () => {
    const testData = { id: 1, name: 'test' }

    adapter.set('test-key', testData)

    expect(mockStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(testData))
  })

  it('should return null for non-existent key', () => {
    mockStorage.getItem = vi.fn().mockReturnValue(null)

    const result = adapter.get('non-existent')

    expect(result).toBeNull()
  })
})
