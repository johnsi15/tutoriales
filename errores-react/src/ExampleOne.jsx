import { useState } from 'react'

function ExampleOne() {
  const [items, setItems] = useState([])

  const addItem = newItem => {
    items.push(newItem) // ❌ Esto no funciona como se espera...
    setItems(items)
  }

  return (
    <div>
      <button onClick={() => addItem('Item')}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function ExampleOneFix() {
  const [items, setItems] = useState([])

  const addItem = newItem => {
    // ✅ Crear un nuevo array con todos los items anteriores + el nuevo
    setItems([...items, newItem])
  }

  return (
    <div>
      <button onClick={() => addItem('Item')}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export { ExampleOne, ExampleOneFix }
