import { useQuery } from '@tanstack/react-query'
import { productFacade } from '../../application/ProductFacade'

export function useProductQuery(id?: string) {

  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => productFacade.getProductById(id!),
    enabled: !!id,
  })

  return query
}