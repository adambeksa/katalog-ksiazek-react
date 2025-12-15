import { useState } from 'react'
import { useFilteredProducts } from '../../hooks/useFilteredProducts'
import ProductBoxListing from '../../components/ProductBoxListing'
import './ProductListing.css'

function ProductListing() {
  const [filter, setFilter] = useState('Wszystkie')
  const [sortBy, setSortBy] = useState('name')
  
  const { products, categories, loading, error } = useFilteredProducts(filter, sortBy)

  if (loading) {
    return (
      <div className="product-listing">
        <div className="container">
          <div className="loading">Ładowanie produktów...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-listing">
        <div className="container">
          <div className="error">Błąd: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="product-listing">
      <div className="container">
        <h1>Nasze produkty</h1>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category">Kategoria:</label>
            <select
              id="category"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sortuj według:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nazwa A-Z</option>
              <option value="price-asc">Cena: od najniższej</option>
              <option value="price-desc">Cena: od najwyższej</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <ProductBoxListing key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="no-products">
            <p>Brak produktów w wybranej kategorii.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListing

