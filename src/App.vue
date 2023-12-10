<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarHeader from './components/NavbarHeader.vue';
</script>

<template>

  <div class="flex flex-col bg-base-200 min-h-screen">
    <NavbarHeader />

    <div class="flex-grow">
      <RouterView />
    </div>
  </div>

</template>