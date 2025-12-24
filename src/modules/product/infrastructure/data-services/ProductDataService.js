
import axios from 'axios'
import { Product } from '../../domain/Product'

export class ProductDataService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://wolnelektury.pl/api',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  /**
   * Generuje losową cenę dla książki (bo API nie zwraca ceny)
   */
  generatePrice(id) {
    // Prosty algorytm haszujący string na liczbę, żeby cena była stała dla danego ID
    let hash = 0
    const str = String(id)
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    const normalized = Math.abs(hash) % 8000 // 0 - 7999
    return 20 + (normalized / 100) // 20.00 - 99.99
  }

  /**
   * Konwertuje dane z API na encję Product
   */
  mapToProduct(data) {
    const price = this.generatePrice(data.slug)
    const salePrice =  0  // MOCK - All Books are for free

    return new Product({
      id: data.slug,
      name: data.title,
      price: price,
      salePrice: salePrice,
      image: data.simple_thumb || data.cover,
      description: `Autor: ${data.author}, Epoka: ${data.epoch}, Rodzaj: ${data.kind}, Gatunek: ${data.genre}`,
      fullDescription: `Tytuł: ${data.title}\nAutor: ${data.author}\nEpoka: ${data.epoch}\nRodzaj: ${data.kind}\nGatunek: ${data.genre}\n\n${data.fragment_data ? data.fragment_data.html : ''}`,
      category: 'Książki', // Domyślna kategoria dla sklepu
      author: data.author,
      epoch: data.epoch,
      genre: data.genre,
      kind: data.kind,
      inStock: true,
    })
  }

  async getAll() {
    if (!this.productsCache) {
      this.productsCache = this.client.get('/books/')
        .then(response => response.data.map(data => this.mapToProduct(data)))
        .catch(error => {
          this.productsCache = null // Clear cache on error so we can try again
          throw error
        })
    }
    return this.productsCache
  }

  async getById(id) {
    try {
      const response = await this.client.get(`/books/${id}/`)
      return this.mapToProduct(response.data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null
      }
      throw error
    }
  }

  // Metody pomocnicze do filtrów (pobieramy wszystko i filtrujemy w fasadzie, 
  // ale tutaj możemy przygotować listy unikalnych wartości)
  
  async getAuthors() {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.author))).sort()
  }

  async getEpochs() {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.epoch))).sort()
  }

  async getGenres() {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.genre))).sort()
  }

  async getKinds() {
    const products = await this.getAll()
    return Array.from(new Set(products.map(p => p.kind))).sort()
  }
}
