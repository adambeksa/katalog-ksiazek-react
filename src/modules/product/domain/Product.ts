import { IProduct, AudioFormat } from './interfaces/IProduct'

export type { AudioFormat } // Re-export for compatibility if needed elsewhere

/**
 * Encja produktu - reprezentuje domenę produktu w systemie
 */
export interface ProductConstructorParams {
  id: string;
  name: string;
  image: string;
  description: string;
  author: string;
  epoch: string;
  genre: string;
  kind: string;
  features?: string[];
  url?: string;
  license?: string;
  audioDirector?: string;
  audioArtist?: string;
}

export class Product implements IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  author: string;
  epoch: string;
  genre: string;
  kind: string;
  features: string[];
  url: string;
  license: string;
  audioDirector: string;
  audioArtist: string;
  formats: Record<string, string>;
  audioFormats: Record<string, AudioFormat[]>;

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
  }: ProductConstructorParams) {
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
