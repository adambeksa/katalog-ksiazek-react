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
    url = '',
    license = '',
    licenseDescription = '',
    audioDirector = '',
    audioArtist = '',
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
    this.url = url
    this.license = license
    this.licenseDescription = licenseDescription
    this.audioDirector = audioDirector
    this.audioArtist = audioArtist
    this.formats = {} // e.g. { epub: 'url', pdf: 'url' }
    this.audioFormats = {} // e.g. { mp3: [{name: 'Chapter 1', url: 'url'}], ogg: [...] }
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


