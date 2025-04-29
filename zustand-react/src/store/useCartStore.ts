import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type Product } from '../ProductList'

interface CartState {
  items: { product: Product; quantity: number }[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: product => {
        set(state => {
          const existingItem = state.items.find(item => item.product.id === product.id)

          if (existingItem) {
            return {
              items: state.items.map(item => {
                return item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              }),
            }
          } else {
            return {
              items: [...state.items, { product, quantity: 1 }],
            }
          }
        })
      },
      removeFromCart: (productId: number) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
    }),
    { name: 'cart-storage' }
  )
)
