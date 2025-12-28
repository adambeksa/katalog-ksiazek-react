import { productFacade } from '../../application/ProductFacade'

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
import { useQuery } from '@tanstack/react-query'

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
export function useProductsQuery() {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: () => productFacade.getAllProducts(),
  })

  return query
}
