import { Link } from 'react-router-dom'
import './ProductBox.css'

/**
 * Komponent prezentacyjny boxu produktu w liście
 * Używany w liście produktów
 */
function ProductBox({ product }) {
  if (!product) {
    return null
  }

  return (
    <div className="product-box-listing">
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{product.getFormattedPrice()}</p>
        <Link to={`/produkt/${product.id}`} className="product-link">
          Zobacz szczegóły
        </Link>
      </div>
    </div>
  )
}

export default ProductBox
