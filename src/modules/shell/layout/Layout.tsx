import { Link } from 'react-router-dom'
import './Layout.scss'
import { ROUTES } from '../../../routes'

import { ReactNode } from 'react'
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="header__container">
          <Link to={ROUTES.HOME} className="header__logo">
            <h1>Biblioteka ABE</h1>
          </Link>
          <nav className="header__nav">
            <Link to={ROUTES.HOME} className="nav__link">Strona Główna</Link>
            <Link to={ROUTES.PRODUCTS} className="nav__link">Katalog książek</Link>
          </nav>
        </div>
      </header>
      <main className="layout__main">
        {children}
      </main>
      <footer className="layout__footer">
        <div className="footer__container">
          <p>&copy; PetProject Biblioteka ABE 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
