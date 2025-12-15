import { useState, useEffect } from 'react'
import { ProductService } from '../../application/services/ProductService'
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository'

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getAllProducts()
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


