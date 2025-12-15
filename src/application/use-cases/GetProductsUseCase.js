/**
 * Use case: Pobieranie listy produktów
 * Zawiera logikę biznesową związaną z pobieraniem produktów
 */
export class GetProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  /**
   * Wykonuje use case
   * @returns {Promise<Product[]>}
   */
  async execute() {
    try {
      const products = await this.productRepository.getAll()
      return products
    } catch (error) {
      throw new Error(`Błąd podczas pobierania produktów: ${error.message}`)
    }
  }
}


