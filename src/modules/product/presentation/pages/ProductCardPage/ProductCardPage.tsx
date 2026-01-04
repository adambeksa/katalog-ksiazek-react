import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../../../../routes'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import { useProductQuery } from '../../../hooks/useProductQuery'
import DownloadModal from '../../components/DownloadModal/DownloadModal'
import ProductAttribution from '../../components/ProductAttribution/ProductAttribution'
import ProductCardError from './ProductCardError'
import ProductCardSkeleton from './ProductCardSkeleton'
import './ProductCardPage.css'

function ProductCardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showAudioModal, setShowAudioModal] = useState(false)
  const { data: product, isLoading, error } = useProductQuery(id)

  if (isLoading) {
    return <ProductCardSkeleton />
  }

  if (error || !product) {
    return <ProductCardError message={(error as Error)?.message} />
  }

  const handleDownload = () => {
    setShowDownloadModal(true)
  }

  const handleAudioDownload = () => {
    setShowAudioModal(true)
  }

  return (
    <div className="product-card-page">
      <div className="container">
        <Breadcrumbs items={[
          { label: 'Strona Główna', path: ROUTES.HOME },
          { label: 'Katalog książek', path: ROUTES.PRODUCTS },
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
              
              {product.hasAudio && (
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
