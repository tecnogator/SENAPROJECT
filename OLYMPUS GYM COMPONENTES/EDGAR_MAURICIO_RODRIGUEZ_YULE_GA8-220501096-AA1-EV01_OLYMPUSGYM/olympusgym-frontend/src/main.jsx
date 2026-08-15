import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './styles.css'

const Router = import.meta.env.VITE_ROUTER_MODE === 'memory' ? MemoryRouter : BrowserRouter
const routerProps = Router === MemoryRouter ? { initialEntries: ['/login'] } : {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router {...routerProps}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
)
