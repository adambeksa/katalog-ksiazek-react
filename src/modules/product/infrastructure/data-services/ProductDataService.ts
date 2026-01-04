import axios, { AxiosInstance } from "axios";
import { Product } from "../../domain/Product";
import { IProductDto } from "../interfaces/IProductDto.interface";
import { IProductListDto } from "../interfaces/IProductListDto.interface";
import { mapListToProduct } from "../adapters/ProductListAdapter";
import { mapDetailToProduct } from "../adapters/ProductDetailAdapter";

export class ProductDataService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://wolnelektury.pl/api",
    });
  }

  async getAll(): Promise<Product[]> {
    try {
      const res = await this.client.get<IProductListDto[]>("/books");
      return res.data.map((item) => mapListToProduct(item));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const res = await this.client.get<IProductDto>(`/books/${id}`);
      return mapDetailToProduct(res.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  async getAuthors(): Promise<string[]> {
    return this.getDistinctValues((p) => p.author);
  }

  async getEpochs(): Promise<string[]> {
    return this.getDistinctValues((p) => p.epoch);
  }

  async getGenres(): Promise<string[]> {
    return this.getDistinctValues((p) => p.genre);
  }

  async getKinds(): Promise<string[]> {
    return this.getDistinctValues((p) => p.kind);
  }

  private async getDistinctValues(
    selector: (p: Product) => string,
  ): Promise<string[]> {
    const products = await this.getAll();
    const values = new Set(products.map(selector));
    return Array.from(values).sort();
  }
}
