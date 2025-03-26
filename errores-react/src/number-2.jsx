/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

export function ErrorProduct({ id }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${id}`)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [id])

  if (!id) {
    return 'No hay id'
  }

  console.log(product)

  return <section>Información del producto</section>
}
