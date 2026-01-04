import { Product } from '../Product';
import { IProductFilters } from '../interfaces/IProductFilters.interface';
import { IFilterOptions } from '../interfaces/IFilterOptions.interface';

export class ProductFilterService {
  filterAndPaginate(products: Product[], { filters = {}, page = 1, limit = 20 }: { filters?: IProductFilters, page?: number, limit?: number }) {
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

  deriveFilterOptions(products: Product[]): IFilterOptions {
    const authors = this.getDistinctValues(products, (p) => p.author)
    const epochs = this.getDistinctValues(products, (p) => p.epoch)
    const genres = this.getDistinctValues(products, (p) => p.genre)
    const kinds = this.getDistinctValues(products, (p) => p.kind)
    
    return {
      authors: ['Wszystkie', ...authors],
      epochs: ['Wszystkie', ...epochs],
      genres: ['Wszystkie', ...genres],
      kinds: ['Wszystkie', ...kinds]
    }
  }

  private getDistinctValues(products: Product[], selector: (p: Product) => string): string[] {
    const values = new Set(products.map(selector))
    return Array.from(values).sort()
  }
}
