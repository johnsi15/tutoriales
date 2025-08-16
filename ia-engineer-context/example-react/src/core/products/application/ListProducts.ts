import { APIClient } from '../../api-client'
import { type Product } from '../domain/Product'

class ListProducts {
  private readonly apiClient: APIClient

  constructor() {
    this.apiClient = new APIClient()
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.apiClient.get<{ products: Product[] }>('/products')

    return response.products
  }
}

export default ListProducts
