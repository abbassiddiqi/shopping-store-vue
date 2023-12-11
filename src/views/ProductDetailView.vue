<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/services/productsService';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import QuantityButton from '@/components/QuantityButton.vue';

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const currencyFormatter = useCurrencyFormatter();

const { product } = storeToRefs(productsStore);
const { items } = storeToRefs(cartStore);
const id = route.params.id as string;
const productId = parseInt(id);

let isLoading = ref(false);

const isInCart = computed(() => {
  return items.value.some(item => {
    return item.productId == productId;
  })
});

const cartItem = computed(() => {
  return items.value.find(item => {
    if (item.productId == productId) return true;
    return false;
  });
})


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

const handleIncrement = () => {
  cartStore.increaseQuantity(productId);
}

const handleDecrement = () => {
  cartStore.decreaseQuantity(productId);
}

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8 pt-4">

    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/">Products</RouterLink></li>
        <li>Product Detail</li>
      </ul>
    </div>

    <div class="flex justify-center p-8" v-if="isLoading"><span class="loading loading-spinner loading-lg"></span></div>

    <div class="grid gap-8 grid-cols-1 md:grid-cols-2 bg-base-100 p-4 md:p-8 shadow rounded-lg" v-if="product && !isLoading">

      <div class="flex justify-center items-center relative">
        <img class="max-h-96 rounded" :src="product.images[0]" v-if="product.images.length > 0" alt="Product Image" />
        <div class="absolute -z-10">
          <span class="loading loading-ring loading-lg"></span>
        </div>
      </div>
      
      <div>
        <h2 class="font-bold text-xl mb-2">{{ product.title }}</h2>
        
        <p class="font-medium">{{ currencyFormatter.format(product.price) }}</p>
        <p class="text-sm mt-4">{{ parseFloat(product.rating.toString()).toFixed(2) }} ★</p>

        <p class="mt-4 mb-4">{{ product.description }}</p>
        
        <div class="flex items-center">
          <div>
            <QuantityButton class="mr-4" v-if="isInCart" :quantity="cartItem?.quantity || 0" @increment="handleIncrement" @decrement="handleDecrement" />
          </div>
          <button v-if="isInCart" class="btn btn-circle btn-sm h-9 w-9" @click="removeFromCart(product)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
          <button v-else class="btn" @click="addToCart(product)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
        
      </div>

    </div>

  </main>
</template>