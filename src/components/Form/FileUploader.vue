<script setup lang="ts">
import { ref } from 'vue';
import Avatar from '../Avatar.vue';

const props = withDefaults(
  defineProps<{
    defaultSrc: string;
    label?: string;
  }>(),
  {
    defaultSrc: '',
    label: '',
  },
);
const selectedImg = ref({
  src: '',
  name: '',
});
const emits = defineEmits<{
  change: [e: Event];
}>();

const handleUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedImg.value.name = input.files[0].name;
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileDataUrl = e?.target?.result || '';
      selectedImg.value.src = fileDataUrl as string;
    };

    reader.readAsDataURL(input.files[0]);

    emits('change', e);
  }
};

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <label class="block">
    <p v-if="props.label" class="block pb-3 font-bold">{{ props.label }}</p>
    <div
      class="h-20 flex cursor-pointer items-center justify-start rounded bg-brand-primary/5 p-3 transition-colors hover:bg-brand-primary/10"
    >
      <div class="flex items-center gap-3">
        <Avatar
          size="md"
          class="flex-basis-4/12"
          :src="selectedImg.src ? selectedImg.src : props.defaultSrc"
          alt="Image"
        />
        <span class="line-clamp-1 flex-grow-1 font-semibold tracking-wider">{{
          selectedImg.name ? selectedImg.name : 'Upload new one'
        }}</span>
      </div>
    </div>
    <input @change="handleUpload" type="file" class="hidden" v-bind="$attrs" />
  </label>
</template>
