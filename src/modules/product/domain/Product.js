/**
 * Encja produktu - reprezentuje domenę produktu w systemie
 */
export class Product {
  constructor({
    id,
    name,
    image,
    description,
    author,
    epoch,
    genre,
    kind,
    features = [],
    url = '',
    license = '',
    audioDirector = '',
    audioArtist = '',
  }) {
    this.id = id
    this.name = name
    this.image = image
    this.description = description
    this.author = author
    this.epoch = epoch
    this.genre = genre
    this.kind = kind
    this.features = features
    this.url = url
    this.license = license
    this.audioDirector = audioDirector
    this.audioArtist = audioArtist
    this.formats = {} // e.g. { epub: 'url', pdf: 'url' }
    this.audioFormats = {} // e.g. { mp3: [{name: 'Chapter 1', url: 'url'}], ogg: [...] }
  }
}
