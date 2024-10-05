import { useEffect, useState } from 'react'
import JsBarcode from 'jsbarcode'
import { getPosts } from './services'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getNewPosts = async () => {
      const data = await getPosts()
      setPosts(data)
    }

    getNewPosts()
  }, [])

  useEffect(() => {
    if (posts.length > 0) {
      const $container = document.querySelector('.container')

      posts.forEach(item => {
        const svgNS = 'http://www.w3.org/2000/svg'
        const svgElement = document.createElementNS(svgNS, 'svg')

        svgElement.dataset.format = 'CODE128'
        svgElement.dataset.value = item.title.slice(0, 10) // id or sku
        svgElement.dataset.text = item.title.slice(0, 30)
        svgElement.dataset.fontsize = '16'
        svgElement.classList.add('code')

        $container?.appendChild(svgElement)
      })

      JsBarcode('.code').init()
    }
  }, [posts])

  return (
    <main>
      <h1>Code Bar 🙂</h1>
      <div className='container'></div>
    </main>
  )
}

export default App
