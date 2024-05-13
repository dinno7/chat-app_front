<route lang="json5">
{
  name: 'not_found'
}
</route>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section>
    <h1 class="text-5xl">404</h1>
    <p class="text-2xl">
      The <strong>{{ route.fullPath }}</strong> does not found!
    </p>
  </section>
</template>
