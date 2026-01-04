import { useState } from 'react'
import { useFilteredProducts } from '../../../hooks/useFilteredProducts'
import ProductBox from '../../components/ProductBox/ProductBox'
import Breadcrumbs from '../../../../shared/ui/components/Breadcrumbs/Breadcrumbs'
import ProductFilters from '../../components/ProductFilters/ProductFilters'
import './ProductListingPage.scss'
import { IProductFilters } from '../../../domain/interfaces/IProductFilters.interface'
import ProductListingSkeleton from './ProductListingSkeleton'
import ProductListingError from './ProductListingError'

function ProductListingPage() {
  const [filters, setFilters] = useState<IProductFilters>({
    author: 'Wszystkie',
    epoch: 'Wszystkie',
    genre: 'Wszystkie',
    kind: 'Wszystkie'
  })
  const { products, filterOptions, loading, error, page, setPage, totalPages } = useFilteredProducts(filters)

  const handleFilterChange = (key: keyof IProductFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (loading) {
    return (
      <ProductListingSkeleton 
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
    )
  }

  if (error) {
    return <ProductListingError message={error} />
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

        <div className="product-listing__grid">
          {products.map(product => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 ? (
          <div className="product-listing__empty">
            <p>Brak książek w wybranej kategorii.</p>
          </div>
        ) : (
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
              className="pagination__button"
            >
              Poprzednia
            </button>
            <span className="pagination__info">
              Strona {page} z {totalPages}
            </span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => p + 1)}
              className="pagination__button"
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
