
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

  mapToProduct(data) {
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

    const product = new Product({
      id: data.slug,
      name: data.title,
      image: data.simple_thumb || data.cover,
      description: `<strong>Autor:</strong> ${author}<br/><strong>Epoka:</strong> ${epoch}<br/><strong>Rodzaj:</strong> ${kind}<br/><strong>Gatunek:</strong> ${genre}`,
      fullDescription: `<strong>Tytuł:</strong> ${data.title}<br/><strong>Autor:</strong> ${author}<br/><strong>Epoka:</strong> ${epoch}<br/><strong>Rodzaj:</strong> ${kind}<br/><strong>Gatunek:</strong> ${genre}<br/><br/>${data.fragment_data ? data.fragment_data.html : ''}`,
      author: author,
      epoch: epoch,
      genre: genre,
      kind: kind,
      inStock: true,
    })

    product.formats = {
      epub: data.epub,
      mobi: data.mobi,
      pdf: data.pdf,
      html: data.html,
      txt: data.txt,
      fb2: data.fb2,
      xml: data.xml
    }

    return product
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
