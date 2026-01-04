import './ProductListingPage.scss'

interface ProductListingErrorProps {
  message?: string;
}

function ProductListingError({ message }: ProductListingErrorProps) {
  return (
    <div className="product-listing">
      <div className="container">
        <div className="product-listing__error">Błąd: {message}</div>
      </div>
    </div>
  )
}

export default ProductListingError
