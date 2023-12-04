<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarHeader from './components/NavbarHeader.vue';
</script>

<template>
  <NavbarHeader />

  <div>
    <RouterView />
  </div>
</template>