import { useState, useEffect } from 'react'
import { productFacade } from '../../application/ProductFacade'

/**
 * Hook do filtrowania i sortowania produktów
 */
export function useFilteredProducts(category = 'Wszystkie', sortBy = 'name') {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {


    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Pobierz kategorie i produkty równolegle
        const [categoriesData, productsData] = await Promise.all([
          productFacade.getCategories(),
          productFacade.filterProducts({ category, sortBy })
        ])

        setCategories(categoriesData)
        setProducts(productsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [category, sortBy])

  return { products, categories, loading, error }
}


