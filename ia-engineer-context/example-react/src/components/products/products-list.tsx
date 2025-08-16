import { useState, useEffect } from 'react'
import ListProducts from '../../core/products/application/ListProducts'
import type { Product } from '../../core/products/domain/Product'

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const productList = new ListProducts()

  useEffect(() => {
    productList.getProducts().then(setProducts)
  }, [])

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center tracking-tight'>
        Lista de Productos
      </h1>
      <ul>
        {products.slice(0, 2).map((product, index) => (
          <li key={product.title} data-testid={'product-id-' + index}>
            <div>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>Precio: ${product.price}</p>
              <p>Descripción: {product.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
