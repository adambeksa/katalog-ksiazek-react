import { useState } from 'react'
import './DownloadModal.css'

function DownloadModal({ product, onClose, title, formats }) {
  const [selectedFormat, setSelectedFormat] = useState(null)
  
  const formatsToDisplay = formats || (product && product.formats)
  if (!formatsToDisplay) return null

  // Filter out formats that are missing (null or empty)
  const availableFormats = Object.entries(formatsToDisplay).filter(([_, val]) => {
    if (Array.isArray(val)) return val.length > 0
    return !!val
  })

  // Handle click on a format
  const handleFormatClick = (key, val, e) => {
    if (Array.isArray(val)) {
      e.preventDefault()
      setSelectedFormat({ key, files: val })
    }
  }

  // Back to format list
  const handleBack = () => {
    setSelectedFormat(null)
  }

  return (
    <div className="download-modal-overlay" onClick={onClose}>
      <div className="download-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        
        {!selectedFormat ? (
          <>
            <h2>{title || 'Wybierz format pobierania'}</h2>
            <p>Książka: <strong>{product.name}</strong></p>
            
            <div className="formats-list">
              {availableFormats.length > 0 ? (
                availableFormats.map(([key, val]) => (
                  <a 
                    key={key} 
                    href={Array.isArray(val) ? '#' : val} 
                    target={Array.isArray(val) ? undefined : "_blank"}
                    rel={Array.isArray(val) ? undefined : "noopener noreferrer"}
                    className="format-link"
                    onClick={(e) => handleFormatClick(key, val, e)}
                  >
                    {Array.isArray(val) ? `Pobierz ${key.toUpperCase()}` : `Pobierz ${key.toUpperCase()}`}
                  </a>
                ))
              ) : (
                <p className="no-formats">Brak dostępnych formatów do pobrania.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="modal-header-actions">
              <button className="back-button-modal" onClick={handleBack}>← Wróć</button>
              <h2>Format: {selectedFormat.key.toUpperCase()}</h2>
            </div>
            <p>Wybierz plik do pobrania:</p>
            <div className="files-list">
              {selectedFormat.files.map((file, index) => (
                <a 
                  key={index} 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="file-link"
                >
                  <span className="file-name">{file.name}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DownloadModal
