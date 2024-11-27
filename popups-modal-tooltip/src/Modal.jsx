/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useRef } from 'react'

export function Modal({ openModal, closeModal, children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (openModal) {
      ref.current.showModal()
    } else {
      ref.current.close()
    }
  }, [openModal])

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className='relative pt-10 pb-7 px-7 rounded-md bg-sindybot-950 min-h-[300px] w-[full]'
    >
      {children}
      <button
        onClick={closeModal}
        className='absolute top-2 right-0 flex justify-center items-center text-red-600 hover:text-red-700 transition-all'
      >
        <svg
          width={32}
          height={32}
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='inline-flex'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </button>
    </dialog>
  )
}
