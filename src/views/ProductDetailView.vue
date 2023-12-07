<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const route = useRoute();

import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/services/productsService';
const productsStore = useProductsStore();
const cartStore = useCartStore();

const { product } = storeToRefs(productsStore);
const { items } = storeToRefs(cartStore);
const id = route.params.id as string;

let isLoading = ref(false);

const isInCart = computed(() => {
  return items.value.some(item => {
    return item.productId == parseInt(id);
  })
});


onMounted(async () => {
  isLoading.value = true;
  await productsStore.fetchProduct(id);
  isLoading.value = false;
});

const addToCart = (product: Product) => {
  cartStore.addToCart(product, 1);
}

const removeFromCart = (product: Product) => {
  cartStore.removeFromCart(product);
}

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8 pt-4">

    <div class="text-sm breadcrumbs mb-8">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/">Products</RouterLink></li>
        <li>Product Detail</li>
      </ul>
    </div>

    <div class="flex justify-center p-8" v-if="isLoading"><span class="loading loading-spinner loading-lg"></span></div>

    <div class="grid grid-cols-2 gap-8 max-md:grid-cols-none" v-if="product && !isLoading">

      <div class="flex justify-center items-center relative">
        <img class="max-h-96" :src="product.images[0]" v-if="product.images.length > 0" alt="Product Image" />
        <div class="absolute -z-10">
          <span class="loading loading-ring loading-lg"></span>
        </div>
      </div>
      
      <div>
        <h2 class="font-bold text-xl mb-2">{{ product.title }}</h2>
        
        <p class="font-medium">${{ product.price }}</p>
        <p class="text-sm mt-4">{{ parseFloat(product.rating.toString()).toFixed(2) }} ★</p>

        <p class="mt-4 mb-4">{{ product.description }}</p>
        
        <button v-if="isInCart" class="btn" @click="removeFromCart(product)">Remove from Cart</button>
        <button v-else class="btn" @click="addToCart(product)">Add to Cart</button>
      </div>

    </div>

  </main>
</template>