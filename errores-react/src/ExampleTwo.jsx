import { useState } from 'react'

function ExampleTwo() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count + 1)
    console.log(count) // ❌ Muestra el valor anterior
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>increase</button>
    </div>
  )
}

function ExampleTwoFix() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(prevCount => {
      const newValue = prevCount + 1
      console.log(newValue) // ✅ Ahora muestra el valor correcto
      return newValue
    })
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>increase</button>
    </div>
  )
}

export { ExampleTwo, ExampleTwoFix }
