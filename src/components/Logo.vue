<script setup lang="ts">
  interface IProps {
    size?: number | string;
  }
  const props = defineProps<IProps>()

</script>

<template>
  <div
    :style="{ width: props.size + 'px' || '250px' }"
    class="aspect-ratio"
  >
    <img
      class="w-full h-full"
      src="@/assets/logo.png"
      alt="Dinno chat logo"
    >
  </div>
</template>

<style scoped></style>