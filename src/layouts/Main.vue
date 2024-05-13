<script setup type="ts">
import Header from '../components/Header.vue';
import Toast from '../components/Toast.vue';
</script>

<template>
  <Header class="border-b-2" />
  <main class="container px-10 mx-auto my-20">
    <RouterView />
  </main>
  <footer>
    <h1>This is footer</h1>
  </footer>
  <Toast />
</template>
