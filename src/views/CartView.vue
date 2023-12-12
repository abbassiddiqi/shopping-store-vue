<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCartStore } from '@/stores/cart';
import type { Product } from '@/services/productsService';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import QuantityButton from '@/components/QuantityButton.vue';

const cartStore = useCartStore();
const currencyFormatter = useCurrencyFormatter();

const { items, total, grandTotal, salesTax } = storeToRefs(cartStore);

function removeProduct(product: Product) {
  cartStore.removeFromCart(product);
}

const handleIncrement = (productId: number) => {
  cartStore.increaseQuantity(productId);
}

const handleDecrement = (productId: number) => {
  cartStore.decreaseQuantity(productId);
}

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8 pt-4">

    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li>Cart</li>
      </ul>
    </div>

    <div class="text-center mt-2" v-if="items.length == 0">There are no products in the cart.</div>

    <!-- Items List on Mobile -->
    <div class="grid grid-cols-1 gap-4 md:hidden mb-4" v-if="items.length">
      <div class="flex flex-row items-center rounded-lg gap-4 shadow bg-base-100 p-4" v-for="item of items" :key="item.productId">
        <div class="avatar">
          <div class="mask mask-square w-14 h-14 rounded-sm">
            <RouterLink :to="`/products/${item.productId}`">
              <img :src="item.product.images[0]" alt="Product Image" />
            </RouterLink>
          </div>
        </div>
        <div class="flex-grow">
          <div class="flex justify-between">
            <RouterLink :to="`/products/${item.productId}`" class="mb-2 pr-1">
              <div class="font-bold line-clamp-2">{{ item.product.title }}</div>
              <div>
                <span class="text-gray-600">{{ currencyFormatter.format(item.product.price) }} •</span>
                <span class="opacity-70 ml-1">{{ item.product.category }}</span>
              </div>
            </RouterLink>
            <button @click="removeProduct(item.product)" class="btn btn-circle btn-sm h-9 w-9">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
          <div class="flex items-center justify-between mt-1">
            <QuantityButton :quantity="item.quantity" @increment="handleIncrement(item.productId)" @decrement="handleDecrement(item.productId)" />
            <span class="font-bold text-gray-600">{{ currencyFormatter.format(item.product.price * item.quantity) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-base-100 p-4 md:p-8 rounded-lg shadow" v-if="items.length">
      <!-- Items Table on Large Screens -->
      <div class="overflow-x-auto hidden md:block">
        <table class="table cart-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="item of items" :key="item.productId">
              <td>
                <div class="flex items-center gap-3 min-w-[230px]">
                  <div class="avatar">
                    <div class="mask mask-square w-12 h-12">
                      <RouterLink :to="`/products/${item.productId}`">
                        <img :src="item.product.images[0]" alt="Product Image" />
                      </RouterLink>
                    </div>
                  </div>
                  <div>
                    <RouterLink :to="`/products/${item.productId}`" class="mb-2">
                      <div class="font-bold line-clamp-2">{{ item.product.title }}</div>
                      <div class="text-sm opacity-50">{{ item.product.category }}</div>
                    </RouterLink>
                  </div>
                </div>
              </td>
              <td>
                {{ currencyFormatter.format(item.product.price) }}
              </td>
              <td>
                <QuantityButton :quantity="item.quantity" @increment="handleIncrement(item.productId)" @decrement="handleDecrement(item.productId)" />
              </td>
              <td class="font-medium">
                {{ currencyFormatter.format(item.product.price * item.quantity) }}
              </td>
              <td class="text-right">
                <button @click="removeProduct(item.product)" class="btn btn-circle btn-sm h-9 w-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
          
        </table>

      </div>

      <!-- Grand Total -->
      <div class="flex flex-row-reverse mt-4">
        <table class="table md:max-w-sm">
          <tbody>
            <tr>
              <th class="font-medium">Subtotal:</th>
              <td class="text-right">{{ currencyFormatter.format(total) }}</td>
            </tr>
            <tr>
              <th class="font-medium">Sales Tax:</th>
              <td class="text-right">{{ currencyFormatter.format(salesTax) }}</td>
            </tr>
            <tr>
              <th class="font-medium text-lg">Grand total:</th>
              <td class="font-medium text-lg text-right">{{ currencyFormatter.format(grandTotal) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-row-reverse mt-4">
        <RouterLink to="/checkout" class="btn btn-primary text-right">Checkout</RouterLink>
      </div>
    </div>

  </main>
</template>

<style scoped>
.table.cart-table :where(thead, tbody) :where(tr:last-child), .table :where(thead, tbody) :where(tr:first-child:last-child) {
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-bottom-color: var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)));
}
</style>