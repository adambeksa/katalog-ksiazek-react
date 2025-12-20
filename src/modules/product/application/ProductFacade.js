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

  async filterProducts({ filters = {}, sortBy = 'name', page = 1, limit = 20 }) {
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

    const sortedProducts = this.sortProducts(products, sortBy)
    const total = sortedProducts.length
    const start = (page - 1) * limit
    const end = start + limit
    const items = sortedProducts.slice(start, end)

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

  sortProducts(products, sortBy) {
    const sorted = [...products]

    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }
}

//  TODO:  Check if this is the best way to do it
import { ProductDataService } from '../infrastructure/data-services/ProductDataService'
const productDataService = new ProductDataService()
export const productFacade = new ProductFacade(productDataService)
