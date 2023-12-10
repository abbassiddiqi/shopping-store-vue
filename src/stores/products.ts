import { ref } from 'vue';
import { defineStore } from "pinia";
import { ProductsService, type Product } from '@/services/productsService';

export const useProductsStore = defineStore('products', () => {
  const productsService = new ProductsService();
  const products = ref<Product[]>([]);
  const product = ref<Product|null>(null);

  const fetchProducts = async () => {
    products.value = await productsService.getProducts();
  };

  const fetchProduct = async (id: string) => {
    product.value = null;
    product.value = await productsService.getProduct(id);
  }

  const searchProducts = async (query: string) => {
    products.value = await productsService.searchProducts(query);
  }

  return {
    product,
    products,
    fetchProduct,
    fetchProducts,
    searchProducts,
  }
}, {
  persist: true
});