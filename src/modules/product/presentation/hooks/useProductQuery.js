import { useQuery } from '@tanstack/react-query'
import { productFacade } from '../../application/ProductFacade'

export function useProductQuery(id) {


  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => productFacade.getProductById(id),
  })

  return query
}