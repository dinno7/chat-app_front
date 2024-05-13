<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

interface IProps {
  type?: 'action' | 'primary'
  loading?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'action',
  loading: false
})
const buttonColor = computed(() =>
  props.type === 'action'
    ? 'bg-gradient-to-rt from-[#EC4945] to-[#F68342] border-brand-primary'
    : 'bg-brand-primary/20 text-brand-primary border-brand-action'
)
</script>

<template>
  <button
    class="px-5 block py-2 flex items-center justify-center font-medium focus:(outline-none ring-none) border-2 border-solid hover:brightness-[110%] cursor-pointer rounded text-brand-base disabled:(from-transparent to-transparent bg-gray-100/10 backdrop-blur)"
    :class="[buttonColor]"
    :disabled="props.loading"
  >
    <Icon
      v-if="props.loading"
      name="i-eva:loader-outline"
      color="text-brand-primary"
      class="animate-spin animate-duration-1200"
    />
    <slot v-else />
  </button>
</template>
