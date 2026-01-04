import './ProductAttribution.scss'
import { Product } from '../../../domain/Product'

interface ProductAttributionProps {
  product: Product;
}

function ProductAttribution({ product }: ProductAttributionProps) {
  return (
    <div className="product-attribution">
      <div className="product-attribution__header">
        <img 
          src="/assets/wolne-lektury-logo.png" 
          alt="Wolne Lektury" 
          className="product-attribution__logo"
        />
      </div>

      <div className="product-attribution__content">
        <div className="product-attribution__item">
          <strong>Źródło:</strong> Książka pochodzi z serwisu{' '}
          <a 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="product-attribution__link"
          >
            Wolne Lektury
          </a>
        </div>

        {product.license && (
          <div className="product-attribution__item">
            <strong>Licencja:</strong> {product.license}
          </div>
        )}

        {product.audioArtist && (
          <div className="product-attribution__item">
            <strong>Lektor:</strong> {product.audioArtist}
          </div>
        )}

        {product.audioDirector && (
          <div className="product-attribution__item">
            <strong>Reżyser:</strong> {product.audioDirector}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductAttribution
