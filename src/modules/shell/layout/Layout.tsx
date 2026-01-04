import { Link } from 'react-router-dom'
import './Layout.scss'
import { ROUTES } from '../../../routes'

import { ReactNode } from 'react'
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to={ROUTES.HOME} className="logo">
            <h1>Biblioteka ABE</h1>
          </Link>
          <nav className="nav">
            <Link to={ROUTES.HOME}>Strona Główna</Link>
            <Link to={ROUTES.PRODUCTS}>Katalog książek</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; PetProject Biblioteka ABE 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
