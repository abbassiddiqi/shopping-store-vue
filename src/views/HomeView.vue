<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import ProductCard from '@/components/ProductCard.vue';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

let isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await productsStore.fetchProducts();
  isLoading.value = false;
});

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8">

    <div class="text-sm breadcrumbs">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li>Products</li>
      </ul>
    </div>
    
    <input type="text" placeholder="Search products..." class="input input-bordered max-md:my-2 mt-6 md:mb-4 w-full max-w-md" />

    <div class="flex justify-center p-8" v-if="isLoading"><span class="loading loading-spinner loading-lg"></span></div>
    
    <div class="grid grid-cols-3 gap-4 max-md:grid-cols-2" v-else>
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    
  </main>
</template>
