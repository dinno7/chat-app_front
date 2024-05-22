<script setup lang="ts">
import { useMessengerStore } from '@/store/socket/messenger';
import { normalizeImageUrl } from '@/utils';
import Avatar from '../Avatar.vue';
import Icon from '../Icon.vue';

const messengerStore = useMessengerStore();
</script>

<template>
  <div
    v-if="messengerStore.receiverUser"
    class="w-full flex items-center justify-start gap-3 rounded-lg bg-brand-primary/20 px-5 backdrop-blur-lg"
  >
    <RouterLink
      to="/"
      class="size-10 flex items-center justify-center rounded-md p-2 transition-colors duration-300 lg:hidden hover:bg-brand-primary/10"
    >
      <Icon name="i-eva:arrow-ios-back-outline" />
    </RouterLink>
    <Avatar
      :src="normalizeImageUrl(messengerStore.receiverUser?.profilePicture)"
      :alt="messengerStore.receiverUser?.name"
      size="md"
      :status="
        messengerStore.onlineUsers.includes(messengerStore.receiverUser?.id || '')
          ? 'online'
          : 'offline'
      "
    />
    <p class="line-clamp-1 grow-1 text-xl font-bold">
      {{ messengerStore.receiverUser?.name }}
    </p>
    <button
      class="size-6 flex items-center justify-center rounded-md bg-brand-primary bg-opacity-0 p-2 transition-colors duration-300 hover:bg-opacity-10"
    >
      <Icon name="i-eva:more-vertical-outline" />
    </button>
  </div>
</template>
