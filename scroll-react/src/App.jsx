import { useCallback, useEffect, useRef, useState } from 'react'
import { getPosts } from './services'
import './App.css'

function App() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const hasMore = useRef(true)
  const observer = useRef()

  const loadMorePosts = useCallback(async () => {
    setLoading(true)
    const newPosts = await getPosts(page, 10)
    if (newPosts.length === 0) {
      hasMore.current = false
    } else {
      setPosts(prev => [...prev, ...newPosts])
    }

    setLoading(false)
  }, [page])

  const lastPostElementRef = useCallback(
    node => {
      if (loading || !hasMore.current) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore.current) {
          setPage(prev => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    if (hasMore.current) {
      loadMorePosts()
    }
  }, [hasMore, loadMorePosts])

  return (
    <main>
      <h1>Mis publicaciones</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
