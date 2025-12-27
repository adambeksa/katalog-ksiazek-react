import { useState } from 'react'
import { useFilteredProducts } from '../../hooks/useFilteredProducts'
import ProductBox from '../../components/ProductBox/ProductBox'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import ProductFilters from '../../components/ProductFilters/ProductFilters'
import './ProductListingPage.css'

function ProductListingPage() {
  const [filters, setFilters] = useState({
    author: 'Wszystkie',
    epoch: 'Wszystkie',
    genre: 'Wszystkie',
    kind: 'Wszystkie'
  })
  const { products, filterOptions, loading, error, page, setPage, totalPages } = useFilteredProducts(filters)

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
        <Breadcrumbs items={[
          { label: 'Strona Główna', path: '/' },
          { label: 'Katalog książek' }
        ]} />
        
        <ProductFilters 
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />

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

