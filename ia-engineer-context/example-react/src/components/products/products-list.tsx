import { useState, useEffect } from 'react'
import ListProducts from '../../core/products/application/ListProducts'
import type { Product } from '../../core/products/domain/Product'
import { ProductCard } from './ProductCard'

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const productList = new ListProducts()

  useEffect(() => {
    productList.getProducts().then(setProducts)
  }, [])

  return (
    <section className='products-list'>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center tracking-tight'>
        Lista de Productos
      </h1>
      <div className='products-grid'>
        {products.slice(0, 2).map(({ id, ...product }) => (
          <ProductCard key={id} product={product} id={id} />
        ))}
      </div>
    </section>
  )
}
