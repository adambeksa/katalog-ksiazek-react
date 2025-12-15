import { useState, useEffect } from 'react'
import { ProductService } from '../../application/services/ProductService'
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository'

/**
 * Hook do filtrowania i sortowania produktów
 */
export function useFilteredProducts(category = 'Wszystkie', sortBy = 'name') {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Pobierz kategorie i produkty równolegle
        const [categoriesData, productsData] = await Promise.all([
          productService.getCategories(),
          productService.filterProducts({ category, sortBy })
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


