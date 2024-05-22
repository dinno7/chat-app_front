<route lang="json5">
{
  name: 'user_messages',
}
</route>

<script setup lang="ts">
import MessageHeader from '@/components/Message/Header.vue';
import MessageInput from '@/components/Message/Input.vue';
import MessageView from '@/components/Message/View.vue';
import { socket } from '@/socket';
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
watchEffect(() => {
  socket.emit('provideReceiverUserDetails', route.params.user_id || '');
  socket.emit('seen', route.params.user_id || '');
});
</script>

<template>
  <div class="h-full max-h-screen flex flex-col justify-between gap-2 px-3 py-5">
    <MessageHeader class="basis-5rem" />
    <MessageView ref="messages" class="flex-1" />
    <MessageInput
      class="sticky bottom-3 h-14 min-h-12 w-full flex basis-0.7/12 items-center justify-center"
    />
  </div>
</template>
