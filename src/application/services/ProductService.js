import { GetProductsUseCase } from '../use-cases/GetProductsUseCase'
import { GetProductByIdUseCase } from '../use-cases/GetProductByIdUseCase'
import { FilterProductsUseCase } from '../use-cases/FilterProductsUseCase'
import { GetCategoriesUseCase } from '../use-cases/GetCategoriesUseCase'

/**
 * Serwis produktów - koordynuje use cases
 * Warstwa aplikacyjna łącząca use cases z prezentacją
 */
export class ProductService {
  constructor(productRepository) {
    this.getProductsUseCase = new GetProductsUseCase(productRepository)
    this.getProductByIdUseCase = new GetProductByIdUseCase(productRepository)
    this.filterProductsUseCase = new FilterProductsUseCase(productRepository)
    this.getCategoriesUseCase = new GetCategoriesUseCase(productRepository)
  }

  /**
   * Pobiera wszystkie produkty
   */
  async getAllProducts() {
    return await this.getProductsUseCase.execute()
  }

  /**
   * Pobiera produkt po ID
   */
  async getProductById(id) {
    return await this.getProductByIdUseCase.execute(id)
  }

  /**
   * Filtruje i sortuje produkty
   */
  async filterProducts(filters) {
    return await this.filterProductsUseCase.execute(filters)
  }

  /**
   * Pobiera listę kategorii
   */
  async getCategories() {
    return await this.getCategoriesUseCase.execute()
  }
}


