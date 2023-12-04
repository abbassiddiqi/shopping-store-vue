import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export class ProductsService {
  
  private baseUrl = 'https://dummyjson.com/products';

  async getProducts(): Promise<Product[]> {
    const response = await axios.get(this.baseUrl);
    return response.data.products;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }
}