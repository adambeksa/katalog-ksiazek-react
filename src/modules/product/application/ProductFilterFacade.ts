import { ProductFilterService } from "../domain/services/ProductFilterService";
import { IProductFilters } from "../domain/interfaces/IProductFilters.interface";
import { IFilterOptions } from "../domain/interfaces/IFilterOptions.interface";
import { Product } from "../domain/Product";

export class ProductFilterFacade {
  private productFilterService: ProductFilterService;

  constructor() {
    this.productFilterService = new ProductFilterService();
  }

  filterProducts(
    products: Product[],
    {
      filters = {},
      page = 1,
      limit = 20,
    }: { filters?: IProductFilters; page?: number; limit?: number },
  ) {
    return this.productFilterService.filterAndPaginate(products, {
      filters,
      page,
      limit,
    });
  }

  deriveFilterOptions(products: Product[]): IFilterOptions {
    return this.productFilterService.deriveFilterOptions(products);
  }
}

export const productFilterFacade = new ProductFilterFacade();
