<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const { items, total } = storeToRefs(cartStore);

</script>

<template>
  <main class="container max-w-5xl mx-auto p-4 pb-8 pt-4">
    
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/cart">Cart</RouterLink></li>
        <li>Checkout</li>
      </ul>
    </div>

    <div class="text-center mt-2" v-if="items.length == 0">There are no products in the cart.</div>

    <div class="flex gap-4 flex-col md:flex-row" v-else>
      <div class="md:w-[60%]">

        <div class="card card-compact card-bordered rounded-lg">
          <div class="card-body">
            <h2 class="card-title">Shipping Details</h2>
            <form>
              <div class="flex gap-4">
                <div class="w-1/2">
                  <div class="form-control mb-2">
                    <label class="label">
                      <span class="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="" class="input input-bordered" required />
                  </div>
                </div>
                <div class="w-1/2">
                  <div class="form-control mb-2">
                    <label class="label">
                      <span class="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="" class="input input-bordered" required />
                  </div>
                </div>
              </div>
              <div class="form-control mb-2">
                <label class="label">
                  <span class="label-text">Address</span>
                </label>
                <input type="text" placeholder="" class="input input-bordered" required />
              </div>
              <div class="form-control mb-2">
                <label class="label">
                  <span class="label-text">Phone</span>
                </label>
                <input type="email" placeholder="" class="input input-bordered" required />
              </div>
            </form>
          </div>
        </div>

        <div class="card card-compact card-bordered rounded-lg mt-4">
          <div class="card-body">
            <h2 class="card-title">Payment Information</h2>
            <form>
              <div class="form-control mb-2">
                <label class="label">
                  <span class="label-text">Name on Card</span>
                </label>
                <input type="text" placeholder="" class="input input-bordered" required />
              </div>
              <div class="form-control mb-2">
                <label class="label">
                  <span class="label-text">Card Number</span>
                </label>
                <input type="text" placeholder="" class="input input-bordered" required />
              </div>
              <div class="flex gap-4 mb-2">
                <div class="w-1/2">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Expiration Date</span>
                    </label>
                    <input type="month" placeholder="" class="input input-bordered" required />
                  </div>
                </div>
                <div class="w-1/2">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">CVV</span>
                    </label>
                    <input type="number" placeholder="" class="input input-bordered" required />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
      
      <div class="md:w-[40%]">
        <div class="card card-compact card-bordered rounded-lg">
          <div class="card-body">
            <h2 class="card-title">Summary</h2>
            <div class="border-b-gray-200">
              <div class="flex mb-2" v-for="item in items" :key="item.productId">
                <div class="flex-shrink-0">
                  {{ item.quantity }}<span class="ml-2 mr-0">x</span>
                </div>
                <div class="flex-grow text-left px-2">
                  {{ item.product.title }}
                </div>
                <div class="text-right">${{ item.quantity * item.product.price }}</div>
              </div>
            </div>
            <div class="divider my-0"></div>
            <div>
              <div class="flex mb-2 text-gray-600">
                <div class="flex-grow">Subtotal</div>
                <div>${{ total }}</div>
              </div>
              <div class="flex mb-2 text-gray-600">
                <div class="flex-grow">Sales Tax</div>
                <div>$0</div>
              </div>
              <div class="flex font-bold">
                <div class="flex-grow">Grand Total</div>
                <div>${{ total }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button class="btn btn-primary w-full">Place Order</button>
        </div>
      </div>
    </div>

  </main>
</template>