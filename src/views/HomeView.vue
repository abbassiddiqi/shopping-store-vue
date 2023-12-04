<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductsStore } from '@/stores/products';
import { storeToRefs } from 'pinia';
import ProductItem from '@/components/ProductItem.vue';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

onMounted(async () => {
  await productsStore.fetchProducts();
});

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8">
    
    <input type="text" placeholder="Search products..." class="input input-bordered max-md:my-2 mt-6 md:mb-4 w-full max-w-md" />
    
    <div class="grid grid-cols-3 gap-4 max-md:grid-cols-2">
      <ProductItem v-for="product in products" :key="product.id" :product="product" />
    </div>
    
  </main>
</template>
