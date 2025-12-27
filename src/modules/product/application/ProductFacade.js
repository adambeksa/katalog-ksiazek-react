export class ProductFacade {
  constructor(productDataService) {
    this.productDataService = productDataService
  }

  async getAllProducts() {
    return await this.productDataService.getAll()
  }

  async getProductById(id) {
    if (!id) {
      return null
    }
    return await this.productDataService.getById(id)
  }

  async filterProducts({ filters = {}, page = 1, limit = 20 }) {
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

  async getFilterOptions() {
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

//  TODO:  Check if this is the best way to do it
import { ProductDataService } from '../infrastructure/data-services/ProductDataService'
const productDataService = new ProductDataService()
export const productFacade = new ProductFacade(productDataService)
