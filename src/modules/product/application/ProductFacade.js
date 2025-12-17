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

  async filterProducts({ category, sortBy = 'name' }) {
    let products

    if (category && category !== 'Wszystkie') {
      products = await this.productDataService.getByCategory(category)
    } else {
      products = await this.productDataService.getAll()
    }

    return this.sortProducts(products, sortBy)
  }

  async getCategories() {
    const categories = await this.productDataService.getCategories()
    return ['Wszystkie', ...categories]
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
