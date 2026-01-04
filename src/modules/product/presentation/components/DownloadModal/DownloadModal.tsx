import { useState } from "react";
import "./DownloadModal.scss";

import { Product } from "../../../domain/Product";

interface DownloadModalProps {
  product: Product;
  onClose: () => void;
  title?: string;
  formats?: any; // To allow flexibility for formats map or audioFormats map
}

function DownloadModal({
  product,
  onClose,
  title,
  formats,
}: DownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<any>(null);

  const formatsToDisplay = formats || (product && product.formats);
  if (!formatsToDisplay) return null;

  // Filter out formats that are missing (null or empty)
  const availableFormats = Object.entries(formatsToDisplay).filter(
    ([_, val]) => {
      if (Array.isArray(val)) return val.length > 0;
      return !!val;
    },
  );

  // Handle click on a format
  const handleFormatClick = (key: string, val: any, e: React.MouseEvent) => {
    if (Array.isArray(val)) {
      e.preventDefault();
      setSelectedFormat({ key, files: val });
    }
  };

  // Back to format list
  const handleBack = () => {
    setSelectedFormat(null);
  };

  return (
    <div className="download-modal" onClick={onClose}>
      <div
        className="download-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="download-modal__close" onClick={onClose}>
          &times;
        </button>

        {!selectedFormat ? (
          <>
            <h2>{title || "Wybierz format pobierania"}</h2>
            <p>
              Książka: <strong>{product.name}</strong>
            </p>

            <div className="download-modal__formats-list">
              {availableFormats.length > 0 ? (
                availableFormats.map(([key, val]) => (
                  <a
                    key={key}
                    href={Array.isArray(val) ? "#" : (val as string)}
                    target={Array.isArray(val) ? undefined : "_blank"}
                    rel={Array.isArray(val) ? undefined : "noopener noreferrer"}
                    className="download-modal__format-link"
                    onClick={(e) => handleFormatClick(key, val, e)}
                  >
                    {Array.isArray(val)
                      ? `Pobierz ${key.toUpperCase()}`
                      : `Pobierz ${key.toUpperCase()}`}
                  </a>
                ))
              ) : (
                <p className="download-modal__no-formats">
                  Brak dostępnych formatów do pobrania.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="download-modal__header-actions">
              <button
                className="download-modal__back-button"
                onClick={handleBack}
              >
                ← Wróć
              </button>
              <h2>Format: {selectedFormat.key.toUpperCase()}</h2>
            </div>
            <p>Wybierz plik do pobrania:</p>
            <div className="download-modal__files-list">
              {selectedFormat.files.map((file: any, index: number) => (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-modal__file-link"
                >
                  <span className="download-modal__file-name">{file.name}</span>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DownloadModal;
