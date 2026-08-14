import {
  Apple,
  BookOpenText,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Brand from '../components/Brand'
import { useAuth } from '../context/AuthContext'
import { apiMode } from '../services/api'

const navigation = [
  { to: '/dashboard', label: 'Panel principal', icon: LayoutDashboard },
  { to: '/rutinas', label: 'Rutinas', icon: Dumbbell },
  { to: '/nutricion', label: 'Alimentación', icon: Apple },
  { to: '/suplementos', label: 'Suplementos', icon: Pill },
  { to: '/membresia', label: 'Membresía', icon: WalletCards },
  { to: '/tutorial', label: 'Guía de entrenamiento', icon: BookOpenText },
]

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <Brand />
        <p className="sidebar__caption">Entrena. Progresa. Supera.</p>

        <nav className="sidebar__nav" aria-label="Navegación principal">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span className="connection-badge">
            <span aria-hidden="true" /> API: {apiMode}
          </span>
          <button className="sidebar__logout" type="button" onClick={logout}>
            <LogOut size={19} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="sidebar-overlay"
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="workspace">
        <header className="topbar">
          <div>
            <span className="topbar__label">Área personal</span>
            <strong>OlympusGym</strong>
          </div>
          <div className="user-chip">
            <span className="user-chip__avatar">
              <UserRound size={20} />
            </span>
            <div>
              <strong>{user?.nombreCompleto ?? 'Cliente'}</strong>
              <small>{user?.rol ?? 'usuario'}</small>
            </div>
          </div>
        </header>

        <main className="workspace__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
