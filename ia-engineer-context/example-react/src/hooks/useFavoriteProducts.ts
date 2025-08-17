import { useState, useEffect } from 'react'
import type { Product } from '../core/products/domain/Product'
import { SaveFavoriteProducts } from '../core/products/application/SaveFavoriteProducts'

export function useFavoriteProducts() {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [favoritesManager] = useState(() => new SaveFavoriteProducts())

  useEffect(() => {
    setFavoriteProducts(favoritesManager.getFavorites())
  }, [favoritesManager])

  const addFavorite = (product: Product) => {
    favoritesManager.saveFavorite(product)
    setFavoriteProducts(favoritesManager.getFavorites())
  }

  const removeFavorite = (productId: number) => {
    favoritesManager.removeFavorite(productId)
    setFavoriteProducts(favoritesManager.getFavorites())
  }

  const isFavorite = (productId: number): boolean => {
    return favoritesManager.isFavorite(productId)
  }

  const clearAllFavorites = () => {
    favoritesManager.clearFavorites()
    setFavoriteProducts([])
  }

  return {
    favoriteProducts,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAllFavorites,
  }
}
