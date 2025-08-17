import type { Product } from '../../core/products/domain/Product'
import { useFavoriteProducts } from '../../hooks/useFavoriteProducts'

interface ProductCardProps {
  product: Omit<Product, 'id'>
  id: number
}

export function ProductCard({ product, id }: ProductCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteProducts()
  const isProductFavorite = isFavorite(id)

  const handleToggleFavorite = () => {
    if (isProductFavorite) {
      removeFavorite(id)
    } else {
      addFavorite({ ...product, id })
    }
  }

  return (
    <div className='product-card' data-testid={`product-id-${id}`}>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button
        onClick={handleToggleFavorite}
        style={{
          backgroundColor: isProductFavorite ? '#ff4444' : '#44ff44',
        }}
      >
        {isProductFavorite ? '💔 Remove' : '❤️ Favorite'}
      </button>
    </div>
  )
}
