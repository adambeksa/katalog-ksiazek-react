import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../../application/services/ProductService'
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository'

export function useProductQuery(id) {
  const productRepository = new ProductRepository()
  const productService = new ProductService(productRepository)

  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => productService.getProductById(id),
  })

  return query
}