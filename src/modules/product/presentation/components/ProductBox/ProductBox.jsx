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
    <div className="product-box">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <div 
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <Link to={`/produkt/${product.id}`} className="product-link">
          Zobacz szczegóły
        </Link>
      </div>
    </div>
  )
}

export default ProductBox
