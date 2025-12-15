/**
 * Interfejs repozytorium produktów
 * Definiuje kontrakt dla dostępu do danych produktów
 */
export class IProductRepository {
  /**
   * Pobiera wszystkie produkty
   * @returns {Promise<Product[]>}
   */
  async getAll() {
    throw new Error('Method getAll() must be implemented')
  }

  /**
   * Pobiera produkt po ID
   * @param {number|string} id - ID produktu
   * @returns {Promise<Product|null>}
   */
  async getById(id) {
    throw new Error('Method getById() must be implemented')
  }

  /**
   * Pobiera produkty według kategorii
   * @param {string} category - Kategoria produktu
   * @returns {Promise<Product[]>}
   */
  async getByCategory(category) {
    throw new Error('Method getByCategory() must be implemented')
  }

  /**
   * Pobiera wszystkie dostępne kategorie
   * @returns {Promise<string[]>}
   */
  async getCategories() {
    throw new Error('Method getCategories() must be implemented')
  }
}


