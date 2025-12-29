import { Product } from '../Product';
import { ProductFilters } from '../interfaces/ProductFilters';

export class ProductFilterService {
  filterAndPaginate(products: Product[], { filters = {}, page = 1, limit = 20 }: { filters?: ProductFilters, page?: number, limit?: number }) {
    let filteredProducts = products;

    if (filters.author && filters.author !== 'Wszystkie') {
      filteredProducts = filteredProducts.filter(p => p.author === filters.author)
    }
    if (filters.epoch && filters.epoch !== 'Wszystkie') {
      filteredProducts = filteredProducts.filter(p => p.epoch === filters.epoch)
    }
    if (filters.genre && filters.genre !== 'Wszystkie') {
      filteredProducts = filteredProducts.filter(p => p.genre === filters.genre)
    }
    if (filters.kind && filters.kind !== 'Wszystkie') {
      filteredProducts = filteredProducts.filter(p => p.kind === filters.kind)
    }

    const total = filteredProducts.length
    const start = (page - 1) * limit
    const end = start + limit
    const items = filteredProducts.slice(start, end)

    return { items, total }
  }
}
