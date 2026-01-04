import { useState, useEffect } from 'react'
import { productFilterFacade } from '../../application/ProductFilterFacade'
import { Product } from '../../domain/Product'
import { IProductFilters } from '../../domain/interfaces/ProductFilters'
import { FilterOptions } from '../../domain/interfaces/FilterOptions'
import { useProductContext } from '../context/ProductContext'

export function useFilteredProducts(filters: IProductFilters = {}) {
  const { products: allProducts, loading, error } = useProductContext()
  
  const [products, setProducts] = useState<Product[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    authors: [],
    epochs: [],
    genres: [],
    kinds: []
  })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [JSON.stringify(filters)])

  useEffect(() => {
    if (loading || error) return

    // Generuj opcje filtrów na podstawie wszystkich produktów
    const options = productFilterFacade.deriveFilterOptions(allProducts)
    setFilterOptions(options)

    // Filtruj i paginuj produkty
    const { items, total } = productFilterFacade.filterProducts(allProducts, { filters, page })
    
    setProducts(items)
    setTotalPages(Math.ceil(total / 20))

  }, [allProducts, JSON.stringify(filters), page, loading, error])

  return { products, filterOptions, loading, error, page, setPage, totalPages }
}


