import { useState } from 'react'

function ExampleThree() {
  const [state, setState] = useState({
    name: 'John',
    age: 25,
  })

  const handleUpdate = () => {
    // ❌ Se reemplaza el estado completo y se pierde 'age'
    setState({
      name: 'Amy',
    })
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <h2>{state.age}</h2>

      <button onClick={handleUpdate}>Update Name</button>
    </div>
  )
}

function ExampleThreeFix() {
  const [state, setState] = useState({
    name: 'John',
    age: 25,
  })

  const handleUpdate = () => {
    // ✅ Se conserva el estado previo y se actualiza solo 'name'
    setState(prevState => ({
      ...prevState,
      name: 'Amy',
    }))
  }

  return (
    <div>
      <h1>{state.name}</h1>
      <h2>{state.age}</h2>

      <button onClick={handleUpdate}>Update Name</button>
    </div>
  )
}

export { ExampleThree, ExampleThreeFix }
