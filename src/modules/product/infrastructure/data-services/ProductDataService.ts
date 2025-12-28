
import axios, { AxiosInstance } from 'axios'
import { Product } from '../../domain/Product'

interface ApiAuthor {
  name: string;
}
interface ApiTerm {
  name: string;
}
interface ApiMedia {
  type: string;
  url: string;
  director?: string;
  artist?: string;
  name?: string;
}
interface ApiProductData {
  slug: string;
  title: string;
  simple_thumb: string;
  fragment_data?: { html: string };
  authors?: ApiAuthor[];
  author?: string;
  epochs?: ApiTerm[];
  epoch?: string;
  genres?: ApiTerm[];
  genre?: string;
  kinds?: ApiTerm[];
  kind?: string;
  url?: string;
  license?: string;
  epub?: string;
  mobi?: string;
  pdf?: string;
  html?: string;
  txt?: string;
  fb2?: string;
  xml?: string;
  media?: ApiMedia[];
}

export class ProductDataService {
  private client: AxiosInstance;
  private productsCache: Promise<Product[]> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://wolnelektury.pl/api',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  mapToProduct(data: ApiProductData): Product {
    const author = data.authors && data.authors.length > 0 
      ? data.authors.map(a => a.name).join(', ') 
      : (data.author || 'Autor nieznany')
    
    const epoch = data.epochs && data.epochs.length > 0 
      ? data.epochs[0].name 
      : (data.epoch || '')
    
    const genre = data.genres && data.genres.length > 0 
      ? data.genres[0].name 
      : (data.genre || '')
    
    const kind = data.kinds && data.kinds.length > 0 
      ? data.kinds[0].name 
      : (data.kind || '')

    // Extract audio information from media array (first mp3 entry)
    const audioMedia = data.media && data.media.find(m => m.type === 'mp3')
    const audioDirector = audioMedia?.director || ''
    const audioArtist = audioMedia?.artist || ''

    const product = new Product({
      id: data.slug,
      name: data.title,
      image: data.simple_thumb,
      description: `<strong>Tytuł:</strong> ${data.title}<br/><strong>Autor:</strong> ${author}<br/><strong>Epoka:</strong> ${epoch}<br/><strong>Rodzaj:</strong> ${kind}<br/><strong>Gatunek:</strong> ${genre}<br/><br/>${data.fragment_data ? data.fragment_data.html : ''}`,
      author: author,
      epoch: epoch,
      genre: genre,
      kind: kind,
      url: data.url || '',
      license: data.license || 'Domena publiczna',  //TODO: connect real license
      audioDirector: audioDirector,
      audioArtist: audioArtist,
    })

    product.formats = {
      epub: data.epub || '',
      mobi: data.mobi || '',
      pdf: data.pdf || '',
      html: data.html || '',
      txt: data.txt || '',
      fb2: data.fb2 || '',
      xml: data.xml || ''
    }

    // Map audio formats from media
    if (data.media && data.media.length > 0) {
      data.media.forEach(medium => {
        if (medium.type && medium.url) {
          if (!product.audioFormats[medium.type]) {
            product.audioFormats[medium.type] = []
          }
          product.audioFormats[medium.type].push({
            name: medium.name || medium.type,
            url: medium.url
          })
        }
      })
    }

    return product
  }

  async getAll(): Promise<Product[]> {
    if (!this.productsCache) {
      this.productsCache = this.client.get('/books/')
        .then(response => response.data.map((data: ApiProductData) => this.mapToProduct(data)))
        .catch(error => {
          this.productsCache = null // Clear cache on error so we can try again
          throw error
        })
    }
    return this.productsCache as Promise<Product[]>
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const response = await this.client.get(`/books/${id}/`)
      return this.mapToProduct(response.data)
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return null
      }
      throw error
    }
  }

  // Metody pomocnicze do filtrów (pobieramy wszystko i filtrujemy w fasadzie, 
  // ale tutaj możemy przygotować listy unikalnych wartości)
  
  async getAuthors(): Promise<string[]> {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.author))).sort()
  }

  async getEpochs(): Promise<string[]> {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.epoch))).sort()
  }

  async getGenres(): Promise<string[]> {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.genre))).sort()
  }

  async getKinds(): Promise<string[]> {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.kind))).sort()
  }
}
