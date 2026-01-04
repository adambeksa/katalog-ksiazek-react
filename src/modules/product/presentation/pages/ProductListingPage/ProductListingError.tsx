import './ProductListingPage.scss'

interface ProductListingErrorProps {
  message?: string;
}

function ProductListingError({ message }: ProductListingErrorProps) {
  return (
    <div className="product-listing">
      <div className="container">
        <div className="error">Błąd: {message}</div>
      </div>
    </div>
  )
}

export default ProductListingError
