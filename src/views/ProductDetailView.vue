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

    <div class="text-sm breadcrumbs mb-8">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/">Products</RouterLink></li>
        <li>Product Detail</li>
      </ul>
    </div>

    <div class="flex justify-center p-8" v-if="isLoading"><span class="loading loading-spinner loading-lg"></span></div>

    <div class="grid gap-8 grid-cols-1 md:grid-cols-2" v-if="product && !isLoading">

      <div class="flex justify-center items-center relative">
        <img class="max-h-96" :src="product.images[0]" v-if="product.images.length > 0" alt="Product Image" />
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
          <button v-if="isInCart" class="btn" @click="removeFromCart(product)">Remove from Cart</button>
          <button v-else class="btn" @click="addToCart(product)">Add to Cart</button>
        </div>
        
      </div>

    </div>

  </main>
</template>