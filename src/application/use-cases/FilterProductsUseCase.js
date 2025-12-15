/**
 * Use case: Filtrowanie i sortowanie produktów
 */
export class FilterProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  /**
   * Wykonuje use case
   * @param {Object} filters - Obiekt z filtrami
   * @param {string} filters.category - Kategoria do filtrowania (opcjonalne)
   * @param {string} filters.sortBy - Sposób sortowania: 'name', 'price-asc', 'price-desc'
   * @returns {Promise<Product[]>}
   */
  async execute({ category, sortBy = 'name' }) {
    try {
      let products

      if (category && category !== 'Wszystkie') {
        products = await this.productRepository.getByCategory(category)
      } else {
        products = await this.productRepository.getAll()
      }

      // Sortowanie
      const sortedProducts = this.sortProducts(products, sortBy)

      return sortedProducts
    } catch (error) {
      throw new Error(`Błąd podczas filtrowania produktów: ${error.message}`)
    }
  }

  /**
   * Sortuje produkty według podanego kryterium
   * @private
   */
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


