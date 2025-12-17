
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { Product } from '../../domain/Product'
import { mockProductsData } from '../mockedData/mockProducts'

export class ProductDataService {
  constructor() {
    
    this.client = axios.create({
      baseURL: 'https://api.abe-project-v1.pl/v1',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.mock = new AxiosMockAdapter(this.client, { delayResponse: 500 })

    // Mock of listing products
    this.mock.onGet('/products').reply(config => {
      if (config.params && config.params.category) {
        const filtered = mockProductsData.filter(p => p.category === config.params.category)
        return [200, filtered]
      }
      return [200, mockProductsData]
    })

    // Mock of product by id
    this.mock.onGet(/\/products\/\d+/).reply(config => {
      const id = config.url.split('/').pop()
      const product = mockProductsData.find(p => p.id === Number(id))
      
      if (product) {
        return [200, product]
      } else {
        return [404, { message: 'Produkt nie znaleziony' }]
      }
    })

    // Mock of categories
    this.mock.onGet('/categories').reply(200, Array.from(new Set(mockProductsData.map(p => p.category))))
  }

  /**
   * Konwertuje dane surowe na encję Product
   */
  mapToProduct(data) {
    return new Product(data)
  }

  async getAll() {
    const response = await this.client.get('/products')
    return response.data.map(data => this.mapToProduct(data))
  }

  async getById(id) {
    try {
      const response = await this.client.get(`/products/${id}`)
      return this.mapToProduct(response.data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null
      }
      throw error
    }
  }

  async getByCategory(category) {
    const response = await this.client.get('/products', { params: { category } })
    return response.data.map(data => this.mapToProduct(data))
  }

  async getCategories() {
    const response = await this.client.get('/categories')
    return response.data
  }
}
