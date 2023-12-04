import { ref } from 'vue';
import { defineStore } from "pinia";
import { ProductsService, type Product } from '@/services/productsService';

export const useProductsStore = defineStore('products', () => {
  const productsService = new ProductsService();
  const products = ref<Product[]>([]);

  const fetchProducts = async () => {
    products.value = await productsService.getProducts();
  };

  return {
    products,
    fetchProducts
  }
});