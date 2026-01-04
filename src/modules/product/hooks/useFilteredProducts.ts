import { useState, useEffect } from "react";
import { productFilterFacade } from "../application/ProductFilterFacade";
import { Product } from "../domain/Product";
import { IProductFilters } from "../domain/interfaces/IProductFilters.interface";
import { IFilterOptions } from "../domain/interfaces/IFilterOptions.interface";
import { useProductContext } from "../application/context/ProductContext";

export function useFilteredProducts(filters: IProductFilters = {}) {
  const { productsCollection, loading, error } = useProductContext();

  const [products, setFilteredProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    authors: [],
    epochs: [],
    genres: [],
    kinds: [],
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    if (loading || error) return;

    // Generuj opcje filtrów na podstawie wszystkich produktów
    const options = productFilterFacade.deriveFilterOptions(productsCollection);
    setFilterOptions(options);

    // Filtruj i paginuj produkty
    const { items, total } = productFilterFacade.filterProducts(
      productsCollection,
      { filters, page },
    );
    setFilteredProducts(items);
    setTotalPages(Math.ceil(total / 20));
  }, [productsCollection, JSON.stringify(filters), page, loading, error]);

  return { products, filterOptions, loading, error, page, setPage, totalPages };
}
