<script setup lang="ts">
interface IProps {
  name: string
  size?: number | string
  color?: string
}
const props = withDefaults(defineProps<IProps>(), {
  size: 25,
  color: 'text-blue-500'
})
</script>

<template>
  <span
    class="inline-block transition-colors duration-300 icon-el"
    :class="[props.name, props.color]"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px'
    }"
  ></span>
</template>

<style scoped></style>
