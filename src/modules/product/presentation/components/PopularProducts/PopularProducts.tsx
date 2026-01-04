import ProductBox from '../ProductBox/ProductBox'
import './PopularProducts.scss'
import { useProductContext } from '../../../application/context/ProductContext'
import ProductBoxSkeleton from '../ProductBox/ProductBoxSkeleton'

function PopularProducts() {
  const { productsCollection: products, loading: isLoading } = useProductContext()
  const popularProducts = products?.slice(0, 3)  // It's mock. Download first 3 products as popular products

  return (
    <section className="popular-products">
      <h2>Popularne lektury</h2>
      {isLoading ? (
        <div className="products-preview">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductBoxSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="products-preview">
          {popularProducts?.map(product => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default PopularProducts
