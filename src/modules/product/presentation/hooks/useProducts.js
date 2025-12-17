import { useState, useEffect } from 'react'
import { productFacade } from '../../application/ProductFacade'

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productFacade.getAllProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}


