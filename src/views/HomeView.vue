<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { watchDebounced } from '@vueuse/core';

import { useProductsStore } from '@/stores/products';
import ProductCard from '@/components/ProductCard.vue';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

let isLoading = ref(false);
const searchInput = ref("");

onMounted(async () => {
  isLoading.value = true;
  await productsStore.fetchProducts();
  isLoading.value = false;
});

watchDebounced(searchInput, async () => {
  isLoading.value = true;
  await productsStore.searchProducts(searchInput.value);
  isLoading.value = false;
}, {
  debounce: 500,
  maxWait: 4000,
});

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8">

    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li>Products</li>
      </ul>
    </div>
    
    <input type="text" v-model="searchInput" placeholder="Search products..." class="input input-bordered mb-4 w-full max-w-md" />

    <div class="flex justify-center p-8" v-if="isLoading"><span class="loading loading-spinner loading-lg"></span></div>
    
    <div class="text-center p-8" v-if="!isLoading && !products.length">
      <div>No products found.</div>
      <div class="text-gray-600 text-sm mt-4">Try searching for something else.</div>
    </div>
    
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3" v-if="!isLoading && products.length">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    
  </main>
</template>
