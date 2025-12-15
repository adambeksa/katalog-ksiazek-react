/**
 * Use case: Pobieranie listy kategorii
 */
export class GetCategoriesUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  /**
   * Wykonuje use case
   * @returns {Promise<string[]>}
   */
  async execute() {
    try {
      const categories = await this.productRepository.getCategories()
      return ['Wszystkie', ...categories]
    } catch (error) {
      throw new Error(`Błąd podczas pobierania kategorii: ${error.message}`)
    }
  }
}


