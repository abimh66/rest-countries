<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <div
    class="dark:text-white dark:bg-v-dark-blue text-v-dark-blue h-full flex flex-col"
  >
    <Header />
    <RouterView />
    <!-- 
      nav
      ROuter View
     -->
  </div>
</template>
