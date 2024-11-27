import { toast } from 'sonner'

export function Toast() {
  const toast1 = () => {
    toast('My content toast')
  }

  const toast2 = () => {
    toast('My action toast', {
      action: {
        label: 'Action',
        onClick: () => console.log('Action!'),
      },
    })
  }

  const toast3 = () => {
    toast.success('Event has been created')
  }

  return (
    <button onClick={toast3} className='border boder-gray-500 px-4 py-2 rounded'>
      Render my Toast
    </button>
  )
}
