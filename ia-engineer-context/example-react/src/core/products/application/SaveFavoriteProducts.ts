import type { Product } from '../domain/Product'
import { LocalStorageAdapter } from '../../adapters/LocalStorageAdapter'

export class SaveFavoriteProducts {
  private readonly storage: LocalStorageAdapter
  private readonly STORAGE_KEY = 'favorite-products'

  constructor() {
    this.storage = new LocalStorageAdapter()
  }

  saveFavorite(product: Product): void {
    const favorites = this.getFavorites()
    const isAlreadyFavorite = favorites.some(fav => fav.id === product.id)

    if (!isAlreadyFavorite) {
      favorites.push(product)
      this.storage.set(this.STORAGE_KEY, favorites)
    }
  }

  removeFavorite(productId: number): void {
    const favorites = this.getFavorites()
    const filtered = favorites.filter(product => product.id !== productId)
    this.storage.set(this.STORAGE_KEY, filtered)
  }

  getFavorites(): Product[] {
    return this.storage.get<Product[]>(this.STORAGE_KEY) || []
  }

  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites()
    return favorites.some(product => product.id === productId)
  }

  clearFavorites(): void {
    this.storage.remove(this.STORAGE_KEY)
  }
}
