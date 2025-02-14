import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/geist-sans/300.css'
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/700.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
