import { useParams, Link, useNavigate } from 'react-router-dom'
import './ProductCardPage.css'
import { useProductQuery } from '../../hooks/useProductQuery'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import { useState } from 'react'
import DownloadModal from '../../components/DownloadModal/DownloadModal'
import ProductAttribution from '../../components/ProductAttribution/ProductAttribution'

function ProductCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showAudioModal, setShowAudioModal] = useState(false)
  const { data: product, isLoading, error } = useProductQuery(id)

  if (isLoading) {
    return (
      <div className="product-card-page">
        <div className="container">
          <div className="loading">Ładowanie...</div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-card-page">
        <div className="container">
          <div className="product-not-found">
            <h2>{error ? (error as Error).message : 'Książka nie została znaleziona'}</h2>
            <Link to="/products" className="back-button">
              Powrót do listy książek
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    setShowDownloadModal(true)
  }

  const handleAudioDownload = () => {
    setShowAudioModal(true)
  }

  // Check if product has any audio formats
  const hasAudio = product && product.audioFormats && Object.keys(product.audioFormats).length > 0

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

            <div className="product-description-section">
              <h3>Opis lektury</h3>
              <div 
                className="product-description-content"
                dangerouslySetInnerHTML={{ __html: product.description }} 
              />
            </div>

            <ProductAttribution product={product} />

            <div className="product-actions">
              <button
                onClick={handleDownload}
                className="read-button"
              >
                Przeczytaj książkę
              </button>
              
              {hasAudio && (
                <button
                  onClick={handleAudioDownload}
                  className="audio-button"
                >
                  Posłuchaj audiobooka
                </button>
              )}
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

      {showAudioModal && (
        <DownloadModal 
          product={product} 
          onClose={() => setShowAudioModal(false)}
          title="Wybierz format audiobooka"
          formats={product.audioFormats}
        />
      )}
    </div>
  )
}

export default ProductCardPage
