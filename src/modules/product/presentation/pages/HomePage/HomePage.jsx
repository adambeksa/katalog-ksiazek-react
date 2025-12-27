import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import './HomePage.css'

function HomePage() {
  const { products, loading } = useProducts()
  
  // Pobierz pierwsze 3 produkty jako popularne
  const popularProducts = products.slice(0, 3)

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1>Witamy w naszym sklepie!</h1>
          <p>Odkryj naszą szeroką gamę produktów wysokiej jakości</p>
          <Link to="/produkty" className="cta-button">
            Zobacz produkty
          </Link>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>🚚 Darmowa dostawa</h3>
            <p>Przy zamówieniach powyżej 200 zł</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Bezpieczne płatności</h3>
            <p>Wszystkie transakcje są szyfrowane</p>
          </div>
          <div className="feature-card">
            <h3>↩️ Zwroty do 30 dni</h3>
            <p>Możliwość zwrotu bez podania przyczyny</p>
          </div>
        </section>

        <section className="popular-products">
          <h2>Popularne produkty</h2>
          {loading ? (
            <div className="loading">Ładowanie produktów...</div>
          ) : (
            <div className="products-preview">
              {popularProducts.map(product => (
                <div key={product.id} className="product-preview">
                  <img className="product-image-placeholder" src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>

                  <Link to={`/produkt/${product.id}`} className="view-button">
                    Zobacz szczegóły
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage


