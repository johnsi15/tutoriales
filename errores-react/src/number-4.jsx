import { useState } from 'react'

export function ErrorUser() {
  const [state, setState] = useState({
    name: 'John',
    age: 25,
    location: 'New York',
  })

  const handleUpdate = () => {
    setState({
      ...state,
      name: 'Andrey',
    })
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <h2>{state.age}</h2>
      <p>{state.location}</p>

      <button onClick={handleUpdate}>Update Name</button>
    </div>
  )
}
