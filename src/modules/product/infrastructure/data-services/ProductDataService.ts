import axios, { AxiosInstance } from 'axios'
import { Product } from '../../domain/Product'
import { ProductDto, ApiMediaDto } from '../../infrastructure/api/interfaces/ProductDto'
import { ProductListDto } from '../../infrastructure/api/interfaces/ProductListDto'

export class ProductDataService {
  private client: AxiosInstance;
  private productsCache: Product[] | null = null;
  private productsCacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minut

  constructor() {
    this.client = axios.create({
      baseURL: 'https://wolnelektury.pl/api',
    })
  }

  async getAll(): Promise<Product[]> {
    const now = Date.now()
    if (this.productsCache && (now - this.productsCacheTimestamp < this.CACHE_TTL)) {
      return this.productsCache
    }

    try {
      const res = await this.client.get<ProductListDto[]>('/books')
      this.productsCache = res.data.map(item => this.mapListToProduct(item))
      this.productsCacheTimestamp = now
      return this.productsCache
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const res = await this.client.get<ProductDto>(`/books/${id}`)
      return this.mapDetailToProduct(res.data)
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      return null
    }
  }

  async getAuthors(): Promise<string[]> {
    return this.getDistinctValues((p) => p.author)
  }

  async getEpochs(): Promise<string[]> {
    return this.getDistinctValues((p) => p.epoch)
  }

  async getGenres(): Promise<string[]> {
    return this.getDistinctValues((p) => p.genre)
  }

  async getKinds(): Promise<string[]> {
    return this.getDistinctValues((p) => p.kind)
  }

  private async getDistinctValues(selector: (p: Product) => string): Promise<string[]> {
    const products = await this.getAll()
    const values = new Set(products.map(selector))
    return Array.from(values).sort()
  }

  private mapListToProduct(data: ProductListDto): Product {
    const product = new Product({
      id: data.slug,
      name: data.title,
      image: data.simple_thumb || data.cover_thumb || '',
      description: '', 
      author: data.author,
      epoch: data.epoch,
      genre: data.genre,
      kind: data.kind,
      url: data.url,
      features: data.has_audio ? ['audiobook'] : [],
    })
    
    return product;
  }

  private mapDetailToProduct(data: ProductDto): Product {
    const product = new Product({
      id: data.slug,
      name: data.title,
      image: data.cover || data.simple_thumb || '',
      description: data.fragment_data?.html || data.description || '',
      author: data.authors?.[0]?.name || 'Nieznany autor',
      epoch: data.epochs?.[0]?.name || '',
      genre: data.genres?.[0]?.name || '',
      kind: data.kinds?.[0]?.name || '',
      url: data.url,
      features: [],
      license: '', 
    })

    if (data.media && data.media.length > 0) {
      data.media.forEach((m: ApiMediaDto) => {
        const type = m.type
        if (!product.audioFormats[type]) {
          product.audioFormats[type] = []
        }
        product.audioFormats[type].push({
          name: m.name || type || 'Audio',
          url: m.url
        })
      })
      
      if (Object.keys(product.audioFormats).length > 0) {
        product.features.push('audiobook')
      }
      
      const firstMedia = data.media[0]
      if (firstMedia) {
        product.audioDirector = firstMedia.director || ''
        product.audioArtist = firstMedia.artist || ''
      }
    }

    if (data.pdf) product.formats['pdf'] = data.pdf
    if (data.epub) product.formats['epub'] = data.epub
    if (data.mobi) product.formats['mobi'] = data.mobi
    if (data.txt) product.formats['txt'] = data.txt
    if (data.fb2) product.formats['fb2'] = data.fb2
    if (data.xml) product.formats['xml'] = data.xml
    if (data.html) product.formats['html'] = data.html

    return product
  }
}
