import { Product } from '../domain/Product';
import { ProductDataService } from '../infrastructure/data-services/ProductDataService';

export class ProductFacade {
  private productDataService: ProductDataService;

  constructor(productDataService: ProductDataService) {
    this.productDataService = productDataService;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productDataService.getAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productDataService.getById(id);
  }
}

const productDataService = new ProductDataService();
export const productFacade = new ProductFacade(productDataService);
