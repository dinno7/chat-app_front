<route lang="json5">
{
  name: 'home',
  meta: {
    auth: true,
  },
}
</route>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import SideBar from '@/components/SideBar/Index.vue';
import { useSocketConnectionStore } from '@/store/socket/connection';
import { useMessengerStore } from '@/store/socket/messenger';
import { tryOnUnmounted } from '@vueuse/core';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isUserMessagePage = computed(() => (route.name as string)?.toLowerCase() === 'user_messages');

const socketStore = useSocketConnectionStore();
socketStore.bindEvents();
socketStore.connect();
tryOnUnmounted(socketStore.disconnect);

const messengerStore = useMessengerStore();
messengerStore.bindEvents();
</script>

<template>
  <div class="grid h-screen max-h-screen gap-5 lg:grid-cols-[3fr_9fr]">
    <section :class="[isUserMessagePage && '<lg:hidden']">
      <SideBar />
    </section>
    <section :class="[!isUserMessagePage && '<lg:hidden']">
      <!-- > Refers to src/pages/index/[user_id].vue -->
      <RouterView />
      <div v-if="!isUserMessagePage" class="size-full flex items-center justify-center">
        <div class="flex items-center justify-center">
          <Logo size="150" />
          <span class="flex flex-col items-center justify-center gap-2">
            <p class="text-5xl font-black font-hand">Dinno chat</p>
            <p>Select user to send message</p>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>
