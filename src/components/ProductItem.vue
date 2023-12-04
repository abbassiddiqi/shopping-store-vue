<script setup lang="ts">
import type { Product } from '@/services/productsService';

defineProps<{
  product: Product
}>();

</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <img class="w-full h-48 object-cover" :src="product.images[0]" />
    <div class="p-4">
      <h2 class="font-medium mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{{ product.title }}</h2>
      <div class="flex justify-between items-center text-gray-600">
        <span class="">${{ product.price }}</span>
        <span class="text-sm">{{ product.rating }} ★</span>
      </div>
    </div>
  </div>
</template>