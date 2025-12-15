/**
 * Use case: Pobieranie produktu po ID
 */
export class GetProductByIdUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  /**
   * Wykonuje use case
   * @param {number|string} id - ID produktu
   * @returns {Promise<Product|null>}
   */
  async execute(id) {
    if (!id) {
      throw new Error('ID produktu jest wymagane')
    }

    try {
      const product = await this.productRepository.getById(id)
      return product
    } catch (error) {
      throw new Error(`Błąd podczas pobierania produktu: ${error.message}`)
    }
  }
}


