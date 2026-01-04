import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../../routes'
import './ProductCardPage.css'

interface ProductCardErrorProps {
  message?: string;
}

function ProductCardError({ message }: ProductCardErrorProps) {
  return (
    <div className="product-card-page">
      <div className="container">
        <div className="product-not-found">
          <h2>{message || 'Książka nie została znaleziona'}</h2>
          <Link to={ROUTES.PRODUCTS} className="back-button">
            Powrót do listy książek
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCardError
