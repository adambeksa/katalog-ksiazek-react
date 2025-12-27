/**
 * Encja produktu - reprezentuje domenę produktu w systemie
 */
export class Product {
  constructor({
    id,
    name,
    image,
    description,
    fullDescription,
    author,
    epoch,
    genre,
    kind,
    inStock = true,
    features = [],
  }) {
    this.id = id
    this.name = name
    this.image = image
    this.description = description
    this.fullDescription = fullDescription || description
    this.author = author
    this.epoch = epoch
    this.genre = genre
    this.kind = kind
    this.inStock = inStock
    this.features = features
    this.formats = {} // e.g. { epub: 'url', pdf: 'url' }
  }

  /**
   * Sprawdza czy produkt jest dostępny
   */
  isAvailable() {
    return this.inStock
  }

  /**
   * Waliduje dane produktu
   */
  validate() {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Nazwa produktu jest wymagana')
    }
    return true
  }
}


