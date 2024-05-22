<script setup lang="ts">
import { useMessengerStore } from '@/store/socket/messenger';
import { useRoute } from 'vue-router';
import Icon from '../Icon.vue';

const route = useRoute();
const { sendMessage } = useMessengerStore();

const handleSendMessage = async (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement);
  const data = Object.fromEntries(form) as { message: string };
  if (!data?.message) return;

  sendMessage(data.message).to((route.params.user_id as string) || '');

  (e.target as HTMLFormElement).reset();
};
</script>

<template>
  <form
    @submit.prevent="handleSendMessage"
    class="size-full flex items-center justify-center gap-3"
  >
    <input
      name="message"
      id="message"
      dir="auto"
      placeholder="Type your message"
      class="h-full w-6/12 resize-none rounded-lg bg-brand-primary/10 px-3 py-1 backdrop-blur focus:(outline-none)"
    />
    <button
      type="submit"
      class="flex cursor-pointer items-center justify-center rounded-lg bg-brand-action p-3 hover:bg-brand-action-400"
    >
      <Icon name="i-eva:navigation-2-outline" color="text-brand-primary" size="28" />
    </button>
  </form>
</template>
