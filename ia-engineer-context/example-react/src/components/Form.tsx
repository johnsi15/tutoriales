import { useState } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  mensaje: z.string().min(5, 'El mensaje es obligatorio'),
})

interface FormData {
  nombre: string
  email: string
  mensaje: string
}

export function Form() {
  const [form, setForm] = useState<FormData>({ nombre: '', email: '', mensaje: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = formSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<FormData> = {}
      const issues = (result.error.issues ?? []) as Array<{ path: (string | number)[]; message: string }>
      issues.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message
      })
      setErrors(fieldErrors)
      setSuccess('')
      return
    }
    setSuccess('¡Mensaje enviado correctamente!')
    setErrors({})
    // Aquí podrías enviar los datos a una API
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md w-[420px] text-left mx-auto flex flex-col gap-6 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md'
    >
      <div>
        <label htmlFor='nombre' className='block mb-1 font-medium text-gray-700 dark:text-gray-200'>
          Nombre
        </label>
        <input
          id='nombre'
          name='nombre'
          type='text'
          value={form.nombre}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          aria-invalid={!!errors.nombre}
          aria-describedby='nombre-error'
        />
        {errors.nombre && (
          <p id='nombre-error' className='mt-1 text-sm text-red-400 dark:text-red-400'>
            {errors.nombre}
          </p>
        )}
      </div>
      <div>
        <label htmlFor='email' className='block mb-1 font-medium text-gray-700 dark:text-gray-200'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={form.email}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          aria-invalid={!!errors.email}
          aria-describedby='email-error'
        />
        {errors.email && (
          <p id='email-error' className='mt-1 text-sm text-red-400 dark:text-red-400'>
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor='mensaje' className='block mb-1 font-medium text-gray-700 dark:text-gray-200'>
          Mensaje
        </label>
        <textarea
          id='mensaje'
          name='mensaje'
          value={form.mensaje}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100'
          aria-invalid={!!errors.mensaje}
          aria-describedby='mensaje-error'
        />
        {errors.mensaje && (
          <p id='mensaje-error' className='mt-1 text-sm text-red-400 dark:text-red-400'>
            {errors.mensaje}
          </p>
        )}
      </div>
      <button
        type='submit'
        className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800'
        aria-label='Enviar formulario'
      >
        Enviar
      </button>
      {success && <p className='mt-2 text-green-600 dark:text-green-400 text-center'>{success}</p>}
    </form>
  )
}
