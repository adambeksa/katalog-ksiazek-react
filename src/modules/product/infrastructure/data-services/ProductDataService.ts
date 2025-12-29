import axios, { AxiosInstance } from 'axios'
import { Product } from '../../domain/Product'
import { ProductDto } from '../../infrastructure/api/interfaces/ProductDto'
import { ProductListDto } from '../../infrastructure/api/interfaces/ProductListDto'
import { mapListToProduct } from '../adapters/ProductListAdapter'
import { mapDetailToProduct } from '../adapters/ProductDetailAdapter'

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
      this.productsCache = res.data.map(item => mapListToProduct(item))
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
      return mapDetailToProduct(res.data)
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
}
