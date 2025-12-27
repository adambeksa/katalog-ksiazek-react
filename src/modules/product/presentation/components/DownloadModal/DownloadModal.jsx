import './DownloadModal.css'

function DownloadModal({ product, onClose }) {
  if (!product || !product.formats) return null

  // Filter out formats that are missing (null or empty)
  const availableFormats = Object.entries(product.formats).filter(([_, url]) => !!url)

  return (
    <div className="download-modal-overlay" onClick={onClose}>
      <div className="download-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>Wybierz format pobierania</h2>
        <p>Książka: <strong>{product.name}</strong></p>
        
        <div className="formats-list">
          {availableFormats.length > 0 ? (
            availableFormats.map(([key, url]) => (
              <a 
                key={key} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="format-link"
              >
                Pobierz {key.toUpperCase()}
              </a>
            ))
          ) : (
            <p className="no-formats">Brak dostępnych formatów do pobrania.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DownloadModal
