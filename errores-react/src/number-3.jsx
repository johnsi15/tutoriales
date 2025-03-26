import { useState } from 'react'

export function ErrorForm() {
  // const [firstName, setFirstName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: '',
  })

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(form)
  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <label htmlFor='name'>Nombre</label>
      <input type='text' id='name' name='firstName' onChange={handleChange} value={form.firstName} />
      <label htmlFor='email'>Correo</label>
      <input type='email' id='email' name='email' onChange={handleChange} value={form.email} />
      <label htmlFor='password'>Contraseña</label>
      <input type='password' id='password' name='password' onChange={handleChange} value={form.password} />
      <button type='submit'>Enviar</button>
    </form>
  )
}
