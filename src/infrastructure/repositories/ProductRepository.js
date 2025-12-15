import { IProductRepository } from '../../domain/repositories/IProductRepository'
import { Product } from '../../domain/entities/Product'
import { mockProductsData } from '../data/mockProducts'

/**
 * Implementacja repozytorium produktów
 * W rzeczywistej aplikacji komunikowałoby się z API
 */
export class ProductRepository extends IProductRepository {
  constructor() {
    super()
    // Symulacja opóźnienia sieci
    this.delay = 100
  }

  /**
   * Symuluje opóźnienie sieci
   */
  async simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, this.delay))
  }

  /**
   * Konwertuje dane surowe na encję Product
   */
  mapToProduct(data) {
    return new Product(data)
  }

  /**
   * Pobiera wszystkie produkty
   */
  async getAll() {
    await this.simulateDelay()
    return mockProductsData.map(data => this.mapToProduct(data))
  }

  /**
   * Pobiera produkt po ID
   */
  async getById(id) {
    await this.simulateDelay()
    const productData = mockProductsData.find(p => p.id === Number(id))
    if (!productData) {
      return null
    }
    return this.mapToProduct(productData)
  }

  /**
   * Pobiera produkty według kategorii
   */
  async getByCategory(category) {
    await this.simulateDelay()
    const filtered = mockProductsData.filter(p => p.category === category)
    return filtered.map(data => this.mapToProduct(data))
  }

  /**
   * Pobiera wszystkie dostępne kategorie
   */
  async getCategories() {
    await this.simulateDelay()
    const categories = new Set(mockProductsData.map(p => p.category))
    return Array.from(categories)
  }
}


