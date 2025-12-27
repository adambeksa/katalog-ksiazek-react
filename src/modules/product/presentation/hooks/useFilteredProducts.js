import { useState, useEffect } from 'react'
import { productFacade } from '../../application/ProductFacade'

export function useFilteredProducts(filters = {}) {
  const [products, setProducts] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    authors: [],
    epochs: [],
    genres: [],
    kinds: []
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          productFacade.getFilterOptions(),
          productFacade.filterProducts({ filters, page })
        ])

        setFilterOptions(options)
        setProducts(items)
        setTotalPages(Math.ceil(total / 20))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), page])

  return { products, filterOptions, loading, error, page, setPage, totalPages }
}


