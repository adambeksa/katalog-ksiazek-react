import { useProducts } from '../../hooks/useProducts'
import ProductBox from '../ProductBox/ProductBox'
import './PopularProducts.css'

function PopularProducts() {
  const { products, loading } = useProducts()
  const popularProducts = products.slice(0, 3)  // It's mock. Download first 3 products as popular products

  return (
    <section className="popular-products">
      <h2>Popularne lektury</h2>
      {loading ? (
        <div className="loading">Ładowanie...</div>
      ) : (
        <div className="products-preview">
          {popularProducts.map(product => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default PopularProducts
