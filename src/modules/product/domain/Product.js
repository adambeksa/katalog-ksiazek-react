/**
 * Encja produktu - reprezentuje domenę produktu w systemie
 */
export class Product {
  constructor({
    id,
    name,
    price,
    image,
    description,
    fullDescription,
    category,
    inStock = true,
    features = []
  }) {
    this.id = id
    this.name = name
    this.price = price
    this.image = image
    this.description = description
    this.fullDescription = fullDescription || description
    this.category = category
    this.inStock = inStock
    this.features = features
  }

  /**
   * Sprawdza czy produkt jest dostępny
   */
  isAvailable() {
    return this.inStock
  }

  /**
   * Formatuje cenę do wyświetlenia
   */
  getFormattedPrice() {
    return `${this.price.toFixed(2)} zł`
  }

  /**
   * Waliduje dane produktu
   */
  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Nazwa produktu jest wymagana')
    }
    if (this.price < 0) {
      throw new Error('Cena nie może być ujemna')
    }
    if (!this.category || this.category.trim() === '') {
      throw new Error('Kategoria produktu jest wymagana')
    }
    return true
  }
}


