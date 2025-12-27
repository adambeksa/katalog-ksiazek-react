import './ProductPrice.css'

function ProductPrice({ product, priceClassName = 'product-price' }) {
  if (!product) return null

  return (
    <>
      {product.salePrice != null && (
        <p className="product-salePrice">{product.getFormattedSalePrice()}</p>
      )}
      <p className={priceClassName}>{product.getFormattedPrice()}</p>
    </>
  )
}

export default ProductPrice
