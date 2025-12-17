import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './ProductCardPage.css'
import { useProductQuery } from '../../hooks/useProductQuery'

function ProductCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { data: product, isLoading, error } = useProductQuery(id)


  if (isLoading) {
    return (
      <div className="product-card-page">
        <div className="container">
          <div className="loading">Ładowanie produktu...</div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-card-page">
        <div className="container">
          <div className="product-not-found">
            <h2>{error || 'Produkt nie został znaleziony'}</h2>
            <Link to="/produkty" className="back-button">
              Powrót do listy produktów
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    alert(`Dodano ${quantity} szt. produktu "${product.name}" do koszyka!`)
  }

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div className="product-card-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Powrót
        </button>

        <div className="product-details">
          <div className="product-image-section">
            <div className="product-main-image">{product.image}</div>
            <div className="product-badge">{product.category}</div>
          </div>

          <div className="product-info-section">
            <h1>{product.name}</h1>
            <p className="product-price-large">{product.getFormattedPrice()}</p>
            
            <div className="stock-status">
              {product.isAvailable() ? (
                <span className="in-stock">✓ Dostępny</span>
              ) : (
                <span className="out-of-stock">✗ Niedostępny</span>
              )}
            </div>

            <div className="product-description-section">
              <h3>Opis produktu</h3>
              <p>{product.fullDescription}</p>
            </div>

            <div className="product-features">
              <h3>Specyfikacja</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Ilość:</label>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable()}
                className="add-to-cart-button"
              >
                {product.isAvailable() ? 'Dodaj do koszyka' : 'Produkt niedostępny'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardPage

