import { useState } from 'react'
import './App.css'
import { Modal } from './Modal'
import { Toast } from './Toast'

function App() {
  const [modal, setModal] = useState(false)

  const handleModal = () => {
    setModal(true)
  }

  return (
    <div className='flex justify-center min-h-dvh items-center flex-col gap-28'>
      <button id='anchor_1' popovertarget='tooltip' className='border border-gray-400 p-4 rounded flex justify-center'>
        <p aria-hidden='true'>❓</p>
      </button>

      <div id='tooltip' className='tooltip' popover='true'>
        <p className='text-sm'>This is a tooltip</p>
      </div>

      <button onClick={handleModal} className='border border-gray-400 p-4 rounded'>
        Open Modal
      </button>

      <Modal openModal={modal} closeModal={() => setModal(false)}>
        Contenido del modal
      </Modal>

      <Toast />
    </div>
  )
}

export default App
