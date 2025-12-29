import { ProductDataService } from '../infrastructure/data-services/ProductDataService';
import { ProductFilterService } from '../domain/services/ProductFilterService';
import { ProductFilters } from '../domain/interfaces/ProductFilters';
import { FilterOptions } from '../domain/interfaces/FilterOptions';

export class ProductFilterFacade {
  private productDataService: ProductDataService;
  private productFilterService: ProductFilterService;

  constructor(productDataService: ProductDataService) {
    this.productDataService = productDataService
    this.productFilterService = new ProductFilterService()
  }

  async filterProducts({ filters = {}, page = 1, limit = 20 }: { filters?: ProductFilters, page?: number, limit?: number }) {
    const products = await this.productDataService.getAll()
    return this.productFilterService.filterAndPaginate(products, { filters, page, limit })
  }

  async getFilterOptions(): Promise<FilterOptions> {
    const [authors, epochs, genres, kinds] = await Promise.all([
      this.productDataService.getAuthors(),
      this.productDataService.getEpochs(),
      this.productDataService.getGenres(),
      this.productDataService.getKinds()
    ])
    
    return {
      authors: ['Wszystkie', ...authors],
      epochs: ['Wszystkie', ...epochs],
      genres: ['Wszystkie', ...genres],
      kinds: ['Wszystkie', ...kinds]
    }
  }
}

const productDataService = new ProductDataService()
export const productFilterFacade = new ProductFilterFacade(productDataService)
