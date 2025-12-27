import { useParams, Link, useNavigate } from 'react-router-dom'
import './ProductCardPage.css'
import { useProductQuery } from '../../hooks/useProductQuery'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import { useState } from 'react'
import DownloadModal from '../../components/DownloadModal/DownloadModal'

function ProductCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDownloadModal, setShowDownloadModal] = useState(false)
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

  const handleDownload = () => {
    setShowDownloadModal(true)
  }

  return (
    <div className="product-card-page">
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Strona Główna', path: '/' },
          { label: 'Katalog książek', path: '/products' },
          { label: product.name }
        ]} />
        <button onClick={() => navigate(-1)} className="back-link">
          ← Powrót
        </button>

        <div className="product-details">
          <div className="product-image-section">
            <img className="product-main-image" src={product.image} alt={product.name}/>
          </div>

          <div className="product-info-section">
            <h2>{product.author}</h2>
            <h1>{product.name}</h1>
            
            <div className="stock-status">
              {product.isAvailable() ? (
                <span className="in-stock">✓ Dostępny</span>
              ) : (
                <span className="out-of-stock">✗ Niedostępny</span>
              )}
            </div>

            <div className="product-description-section">
              <h3>Opis produktu</h3>
              <div 
                className="product-description-content"
                dangerouslySetInnerHTML={{ __html: product.fullDescription }} 
              />
            </div>

            <div className="product-actions">
              <button
                onClick={handleDownload}
                disabled={!product.isAvailable()}
                className="read-button"
              >
                {product.isAvailable() ? 'Przeczytaj książkę' : 'Produkt niedostępny'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDownloadModal && (
        <DownloadModal 
          product={product} 
          onClose={() => setShowDownloadModal(false)} 
        />
      )}
    </div>
  )
}

export default ProductCardPage

