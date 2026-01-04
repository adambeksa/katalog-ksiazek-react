import { Link } from 'react-router-dom'
import './ProductBox.css'
import { Product } from '../../../domain/Product'
import { ROUTES } from '../../../../../routes'
import { memo } from 'react'

interface ProductBoxProps {
  product: Product;
}

/**
 * Komponent prezentacyjny boxu produktu w liście
 * Używany w liście produktów
 */
function ProductBox({ product }: ProductBoxProps) {
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
        <Link to={ROUTES.PRODUCT_DETAILS(product.id)} className="product-link">
          Zobacz szczegóły
        </Link>
      </div>
    </div>
  )
}

export default memo(ProductBox)
