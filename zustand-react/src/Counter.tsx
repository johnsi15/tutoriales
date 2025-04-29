import { useEffect, useState } from 'react'
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  increment: () => {
    const currentCount = get().count // 1

    set({ count: currentCount + 1 })
  },
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

export function Counter() {
  const { increment, decrement, reset } = useCounterStore()

  const count = useCounterStore(state => state.count)

  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timeout = setTimeout(() => setAnimate(false), 300)

    return () => clearTimeout(timeout)
  }, [count])

  return (
    <section className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4'>
      <div className='p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4 text-center'>Contador Simple</h1>

        <div className='flex flex-col items-center'>
          <div className='text-center mb-6'>
            <div className='text-5xl font-bold text-gray-700 mb-2'>
              <span className={`inline-block transition-transform ${animate ? 'scale-125' : 'scale-100'}`}>
                {count}
              </span>
            </div>
            <p className='text-gray-500'>Valor actual del contador</p>
          </div>

          <div className='flex space-x-3'>
            <button
              onClick={decrement}
              className='px-4 py-2 bg-rose-500 text-white font-medium rounded-lg shadow hover:bg-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300'
            >
              Decrementar
            </button>

            <button
              onClick={reset}
              className='px-4 py-2 bg-gray-500 text-white font-medium rounded-lg shadow hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300'
            >
              Reiniciar
            </button>

            <button
              onClick={increment}
              className='px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300'
            >
              Incrementar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
