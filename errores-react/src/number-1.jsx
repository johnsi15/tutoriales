import { useState } from 'react'

export function ErrorCounter() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>La cuenta es: {count}</p>
    </div>
  )
}
