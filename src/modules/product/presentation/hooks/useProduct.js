import { useState, useEffect } from 'react'
import { productFacade } from '../../application/ProductFacade'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productFacade.getProductById(id)
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


