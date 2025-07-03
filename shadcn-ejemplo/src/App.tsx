import { useState } from 'react'
import { ProductCard } from './components/ProductCard'
// import { Button, buttonVariants } from './components/ui/button'
import { CartList } from './components/CartList'

const sampleProduct = {
  id: 1,
  name: 'Samsung S21 Ultra',
  description:
    'El Samsung Galaxy S21 es un smartphone de alta gama que destaca por su diseño innovador y sus potentes características.',
  price: 200.99,
  image:
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

function App() {
  const [cart, setCart] = useState<(typeof sampleProduct)[]>([])

  const handleAddToCart = (product: typeof sampleProduct) => {
    console.log({ product })
    const newId = Math.floor(Math.random() * 100)
    const newProduct = { ...product, id: newId }

    setCart(prev => [...prev, newProduct])
  }

  const handleRemoveFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  return (
    <main className='min-h-dvh flex justify-center items-center flex-col'>
      <section className='min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-50 max-w-4xl mx-auto'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Producto</h2>
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Carrito</h2>
          <CartList products={cart} onRemove={handleRemoveFromCart} />
        </div>
      </section>
    </main>
  )
}

export default App
