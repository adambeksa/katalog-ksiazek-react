import './ProductAttribution.scss'
import { Product } from '../../../domain/Product'

interface ProductAttributionProps {
  product: Product;
}

function ProductAttribution({ product }: ProductAttributionProps) {
  return (
    <div className="product-attribution">
      <div className="attribution-header">
        <img 
          src="/assets/wolne-lektury-logo.png" 
          alt="Wolne Lektury" 
          className="wl-logo"
        />
      </div>

      <div className="attribution-content">
        <div className="attribution-item">
          <strong>Źródło:</strong> Książka pochodzi z serwisu{' '}
          <a 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="wl-link"
          >
            Wolne Lektury
          </a>
        </div>

        {product.license && (
          <div className="attribution-item">
            <strong>Licencja:</strong> {product.license}
          </div>
        )}

        {product.audioArtist && (
          <div className="attribution-item">
            <strong>Lektor:</strong> {product.audioArtist}
          </div>
        )}

        {product.audioDirector && (
          <div className="attribution-item">
            <strong>Reżyser:</strong> {product.audioDirector}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductAttribution
