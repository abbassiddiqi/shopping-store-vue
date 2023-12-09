import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Product } from "@/services/productsService";

interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
};

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const total = computed(() => {
    let sum = 0;
    items.value.forEach(item => {
      sum += (item.product.price * item.quantity);
    });
    return sum;
  })

  const addToCart = (product: Product, quantiy: number): void => {
    items.value.push({
      productId: product.id,
      product: product,
      quantity: quantiy
    });
  }

  const removeFromCart = (product: Product): void => {
    items.value = items.value.filter((cartItem: CartItem) => {
      if (cartItem.productId == product.id) return false;
      return true;
    });
  }

  const increaseQuantity = (productId: number): void => {
    const targetItem = items.value.find((item) => {
      if (item.productId == productId) return true;
      return false;
    });
    if (targetItem) {
      targetItem.quantity++;
    }
  }

  const decreaseQuantity = (productId: number): void => {
    const targetItem = items.value.find((item) => {
      if (item.productId == productId) return true;
      return false;
    });
    if (targetItem) {
      targetItem.quantity--;
    }
  }

  return {
    total,
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }
}, {
  persist: true
});