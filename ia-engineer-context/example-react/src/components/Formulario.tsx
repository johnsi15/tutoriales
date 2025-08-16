import React, { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface FormData {
  nombre: string
  email: string
  mensaje: string
}

const Formulario: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    nombre: '',
    email: '',
    mensaje: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Aquí puedes manejar el envío del formulario
    alert(`Nombre: ${form.nombre}\nEmail: ${form.email}\nMensaje: ${form.mensaje}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <label>
        Nombre:
        <input type='text' name='nombre' value={form.nombre} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type='email' name='email' value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Mensaje:
        <textarea name='mensaje' value={form.mensaje} onChange={handleChange} required />
      </label>
      <button type='submit'>Enviar</button>
    </form>
  )
}

export default Formulario
