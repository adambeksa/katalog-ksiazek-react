import { productFacade } from "../application/ProductFacade";

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
import { useQuery } from "@tanstack/react-query";

/**
 * Hook do zarządzania produktami
 * Łączy warstwę prezentacji z warstwą aplikacji
 */
export function useProductsCollectionQuery() {
  const query = useQuery({
    queryKey: ["productsCollection"],
    queryFn: () => productFacade.getAllProducts(),
    staleTime: Infinity,
  });

  return query;
}
