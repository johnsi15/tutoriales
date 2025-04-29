import { ShoppingCart, Plus, Trash2, Check } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from './store/useCartStore'

export interface Product {
  id: number
  name: string
  price: number
  image: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Zapatillas deportivas',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdG9zfGVufDB8fDB8fHww',
  },
  {
    id: 2,
    name: 'Auriculares inalámbricos',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1574920164507-e651b363da83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fEF1cmljdWxhcmVzJTIwaW5hbCVDMyVBMW1icmljb3N8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Camiseta premium',
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWlzYSUyMHByZW1pdW18ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'Reloj inteligente',
    price: 199.99,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3Rvc3xlbnwwfHwwfHx8MA%3D%3D',
  },
]

export function ProductList() {
  const { items, addToCart, clearCart, getTotalItems, getTotalPrice, removeFromCart } = useCartStore()
  const [addedProduct, setAddedProduct] = useState<number | null>(null)

  const handleAddToCart = (product: Product) => {
    addToCart(product)

    setAddedProduct(product.id)
    setTimeout(() => setAddedProduct(null), 1000)
  }

  return (
    <section className='max-w-6xl mx-auto p-4'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <div className='bg-white rounded-xl shadow-md overflow-hidden p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>Productos</h2>
              <div className='text-sm text-gray-500'>{sampleProducts.length} productos disponibles</div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {sampleProducts.map(product => (
                <div
                  key={product.id}
                  className='bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='h-48 overflow-hidden relative'>
                    <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                    {addedProduct === product.id && (
                      <div className='absolute inset-0 bg-emerald-500 bg-opacity-80 flex items-center justify-center'>
                        <Check className='text-white' size={48} />
                      </div>
                    )}
                  </div>
                  <div className='p-4'>
                    <h3 className='font-bold text-lg text-gray-800 mb-1'>{product.name}</h3>
                    <p className='text-xl font-semibold text-blue-600'>${product.price.toFixed(2)}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className='mt-3 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded-lg flex items-center justify-center transition-colors'
                    >
                      <Plus size={18} className='mr-1' />
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='md:col-span-1'>
          <div className='bg-white rounded-xl shadow-md overflow-hidden p-6 sticky top-4'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-800 flex items-center'>
                <ShoppingCart className='mr-2' size={24} />
                Carrito
              </h2>
              <span className='bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full'>
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
              </span>
            </div>

            {items.length === 0 ? (
              <div className='text-center py-8'>
                <div className='text-gray-400 mb-2'>
                  <ShoppingCart size={48} className='mx-auto' />
                </div>
                <p className='text-gray-500'>Tu carrito está vacío</p>
                <p className='text-sm text-gray-400 mt-1'>Añade algunos productos para continuar</p>
              </div>
            ) : (
              <>
                <div className='space-y-4 max-h-96 overflow-y-auto mb-4'>
                  {items.map(item => (
                    <div key={item.product.id} className='flex justify-between items-center p-3 bg-gray-50 rounded-lg'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-12 h-12 rounded overflow-hidden flex-shrink-0'>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div>
                          <h4 className='font-medium text-gray-800'>{item.product.name}</h4>
                          <div className='text-sm text-gray-500'>
                            ${item.product.price.toFixed(2)} x {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <span className='font-medium text-slate-600 mr-2'>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className='text-rose-500 hover:text-rose-700 transition-colors'
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t border-gray-200 pt-4 mt-4'>
                  <div className='flex justify-between items-center text-lg font-bold mb-4'>
                    <span>Total:</span>
                    <span className='text-blue-600'>${getTotalPrice().toFixed(2)}</span>
                  </div>

                  <div className='space-y-2'>
                    <button className='w-full py-2 px-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors'>
                      Finalizar compra
                    </button>
                    <button
                      onClick={clearCart}
                      className='w-full py-2 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg flex items-center justify-center transition-colors'
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
