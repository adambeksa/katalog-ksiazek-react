import { useState, useEffect } from 'react'
import { ProductService } from '../../application/services/ProductService'
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  return { product, loading, error }
}


