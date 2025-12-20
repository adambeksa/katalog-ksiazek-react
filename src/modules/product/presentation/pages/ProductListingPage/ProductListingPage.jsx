import { useState } from 'react'
import { useFilteredProducts } from '../../hooks/useFilteredProducts'
import ProductBox from '../../components/ProductBox/ProductBox'
import './ProductListingPage.css'

function ProductListingPage() {
  const [filters, setFilters] = useState({
    author: 'Wszystkie',
    epoch: 'Wszystkie',
    genre: 'Wszystkie',
    kind: 'Wszystkie'
  })
  const [sortBy, setSortBy] = useState('name')
  
  const { products, filterOptions, loading, error, page, setPage, totalPages } = useFilteredProducts(filters, sortBy)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

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
            <label htmlFor="author">Autor:</label>
            <select
              id="author"
              value={filters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
            >
              {filterOptions.authors.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="epoch">Epoka:</label>
            <select
              id="epoch"
              value={filters.epoch}
              onChange={(e) => handleFilterChange('epoch', e.target.value)}
            >
              {filterOptions.epochs.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="genre">Gatunek:</label>
            <select
              id="genre"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
            >
              {filterOptions.genres.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="kind">Rodzaj:</label>
            <select
              id="kind"
              value={filters.kind}
              onChange={(e) => handleFilterChange('kind', e.target.value)}
            >
              {filterOptions.kinds.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
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
            <ProductBox key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>Brak produktów w wybranej kategorii.</p>
          </div>
        ) : (
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="pagination-button"
            >
              Poprzednia
            </button>
            <span className="pagination-info">
              Strona {page} z {totalPages}
            </span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="pagination-button"
            >
              Następna
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListingPage

