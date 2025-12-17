import { Link } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>Sklep Internetowy</h1>
          </Link>
          <nav className="nav">
            <Link to="/">Strona Główna</Link>
            <Link to="/produkty">Produkty</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Sklep Internetowy. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout


