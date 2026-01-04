import { ProductDataService } from '../infrastructure/data-services/ProductDataService';
import { ProductFilterService } from '../domain/services/ProductFilterService';
import { ProductFilters } from '../domain/interfaces/ProductFilters';
import { FilterOptions } from '../domain/interfaces/FilterOptions';
import { Product } from '../domain/Product';

export class ProductFilterFacade {
  private productDataService: ProductDataService;
  private productFilterService: ProductFilterService;

  constructor(productDataService: ProductDataService) {
    this.productDataService = productDataService
    this.productFilterService = new ProductFilterService()
  }

  filterProducts(products: Product[], { filters = {}, page = 1, limit = 20 }: { filters?: ProductFilters, page?: number, limit?: number }) {
    return this.productFilterService.filterAndPaginate(products, { filters, page, limit })
  }

  deriveFilterOptions(products: Product[]): FilterOptions {
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

  async getFilterOptions(): Promise<FilterOptions> {
    const products = await this.productDataService.getAll()
    return this.deriveFilterOptions(products)
  }
}

const productDataService = new ProductDataService()
export const productFilterFacade = new ProductFilterFacade(productDataService)
