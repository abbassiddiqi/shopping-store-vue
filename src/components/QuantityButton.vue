<template>
  <div class="flex items-center max-w-fit border border-gray-100 rounded-lg overflow-hidden touch-manipulation">
    <button class="btn btn-sm h-9 w-9 btn-square rounded-none" @click="decrement" :disabled="quantity === 1">-</button>
    <Transition name="quantity-scale" mode="out-in">
      <span :key="quantity" class="w-full text-center px-4 select-none quantity-animation">{{ quantity }}</span>
    </Transition>
    <button class="btn btn-sm h-9 w-9 btn-square rounded-none" @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  quantity: number
}>();

const emit = defineEmits<{
  increment: [],
  decrement: []
}>();

const decrement = () => {
  if (props.quantity > 1) {
    emit('decrement')
  }
};

const increment = () => {
  emit('increment')
};

</script>

<style scoped>
.quantity-scale-enter-active, .quantity-scale-leave-active {
  transition: transform 120ms;
}
.quantity-scale-enter, .quantity-scale-leave-to {
  transform: scale(1.2);
}
</style>