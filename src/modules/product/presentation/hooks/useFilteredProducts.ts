import { useState, useEffect } from 'react'
import { productFilterFacade } from '../../application/ProductFilterFacade'
import { Product } from '../../domain/Product'
import { FilterOptions, ProductFilters } from '../../application/ProductFilterFacade'

export function useFilteredProducts(filters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    authors: [],
    epochs: [],
    genres: [],
    kinds: []
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [JSON.stringify(filters)])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Pobierz opcje filtrów i produkty równolegle
          const [options, { items, total }] = await Promise.all([
          productFilterFacade.getFilterOptions(),
          productFilterFacade.filterProducts({ filters, page })
        ])

        setFilterOptions(options)
        setProducts(items)
        setTotalPages(Math.ceil(total / 20))
      } catch (err: any) {
        setError(err.message || 'Wystąpił błąd')
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), page])

  return { products, filterOptions, loading, error, page, setPage, totalPages }
}


