<route lang="json5">
{
  name: 'user_messages',
}
</route>

<script setup lang="ts">
import MessageInput from '@/components/Message/Input.vue';
import MessageView from '@/components/Message/View.vue';
</script>

<template>
  <div class="h-full flex flex-col justify-between gap-5 px-3 py-5">
    <MessageView class="flex-grow-1" />
    <MessageInput />
  </div>
</template>

<style scoped></style>
