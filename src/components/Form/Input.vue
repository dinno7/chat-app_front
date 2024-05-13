<script setup lang="ts">
interface IProps {
  lable?: string
}
const props = defineProps<IProps>()
const model = defineModel()
defineOptions({
  inheritAttrs: false
})

const labelId = Math.random().toString(16).slice(2)
</script>

<template>
  <div class="w-full">
    <label v-if="props.lable" class="block pb-3" :for="labelId">
      {{ props.lable }}
    </label>
    <input
      class="focus:(border-2 text-brand-base border-solid border-brand-action outline-none bg-brand-primary/80 placeholder-gray-500) text-brand-primary backdrop-blur rounded px-3 py-2 w-full block caret-brand-base bg-brand-primary/30 backdrop-blur-lg text-brand-base"
      :id="labelId"
      v-bind="$attrs"
      v-model="model"
    />
  </div>
</template>
