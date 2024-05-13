<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import NavLinks from '@/components/NavLinks.vue'
</script>

<template>
  <header class="block p-1">
    <div class="flex items-center justify-center">
      <Logo size="70" />
      <p class="text-4xl font-black font-hand">Dinno chat</p>
    </div>
    <NavLinks class="" />
  </header>
</template>
