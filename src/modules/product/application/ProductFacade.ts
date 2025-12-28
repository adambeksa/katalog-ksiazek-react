import { Product } from '../domain/Product';
import { ProductDataService } from '../infrastructure/data-services/ProductDataService';

export interface ProductFilters {
  author?: string;
  epoch?: string;
  genre?: string;
  kind?: string;
}

export interface FilterOptions {
  authors: string[];
  epochs: string[];
  genres: string[];
  kinds: string[];
}

export class ProductFacade {
  private productDataService: ProductDataService;

  constructor(productDataService: ProductDataService) {
    this.productDataService = productDataService
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productDataService.getAll()
  }

  async getProductById(id: string): Promise<Product | null> {
    if (!id) {
      return null
    }
    return await this.productDataService.getById(id)
  }

  async filterProducts({ filters = {}, page = 1, limit = 20 }: { filters?: ProductFilters, page?: number, limit?: number }) {
    let products = await this.productDataService.getAll()

    if (filters.author && filters.author !== 'Wszystkie') {
      products = products.filter(p => p.author === filters.author)
    }
    if (filters.epoch && filters.epoch !== 'Wszystkie') {
      products = products.filter(p => p.epoch === filters.epoch)
    }
    if (filters.genre && filters.genre !== 'Wszystkie') {
      products = products.filter(p => p.genre === filters.genre)
    }
    if (filters.kind && filters.kind !== 'Wszystkie') {
      products = products.filter(p => p.kind === filters.kind)
    }

    const total = products.length
    const start = (page - 1) * limit
    const end = start + limit
    const items = products.slice(start, end)

    return { items, total }
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
export const productFacade = new ProductFacade(productDataService)
