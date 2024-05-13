<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  THIS IS USER PAGE
  {{ route.params.id }}
</template>

<style scoped></style>
