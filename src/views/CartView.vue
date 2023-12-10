<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useCartStore } from '@/stores/cart';
import type { Product } from '@/services/productsService';
import { useCurrencyFormatter } from '@/composables/currencyFormatter';
import QuantityButton from '@/components/QuantityButton.vue';

const cartStore = useCartStore();
const currencyFormatter = useCurrencyFormatter();

const { items, total } = storeToRefs(cartStore);

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

    <div v-else>
      <div class="overflow-x-auto">
        <table class="table cart-table">
          <!-- head -->
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
                <button @click="removeProduct(item.product)" class="btn btn-circle btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </td>
            </tr>


          </tbody>
          
        </table>

      </div>

      <div class="flex flex-row-reverse mt-4">
        <table class="table max-w-sm">
          <tbody>
            <!-- row 1 -->
            <tr>
              <th class="font-medium">Subtotal:</th>
              <td class="text-right">{{ currencyFormatter.format(total) }}</td>
            </tr>
            <tr>
              <th class="font-medium">Sales Tax:</th>
              <td class="text-right">$0</td>
            </tr>
            <tr>
              <th class="font-medium text-lg">Grand total:</th>
              <td class="font-medium text-lg text-right">{{ currencyFormatter.format(total) }}</td>
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