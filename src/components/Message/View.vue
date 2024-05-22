<script setup lang="ts">
import { useMessengerStore } from '@/store/socket/messenger';
import { useUserStore } from '@/store/user';
import { useScroll } from '@vueuse/core';
import { nextTick, ref, watch } from 'vue';
import Icon from '../Icon.vue';
const messengerStore = useMessengerStore();
const userStore = useUserStore();

const messageBox = ref<HTMLDivElement | null>(null);
const showGoToBottom = ref(true);
const { y } = useScroll(messageBox, {
  behavior: 'smooth',
  onScroll(e) {
    showGoToBottom.value = y.value < (e.target as HTMLDivElement)?.scrollHeight - 1300;
  },
});

const isCurrentUserMsg = (id: string = '') => id && userStore.currentUser?.id === id;
const scrollToEnd = async () => {
  await nextTick();
  if (!messageBox.value) return;
  y.value = messageBox.value.scrollHeight + 3000;
};

watch(() => messengerStore.messages[messengerStore.messages.length - 1]?.id, scrollToEnd);
</script>

<template>
  <div
    class="messages flex flex-col gap-3 overflow-x-hidden overflow-y-auto rounded-lg bg-brand-base/10 px-32 py-5 backdrop-blur"
    ref="messageBox"
  >
    <template v-if="messengerStore?.messages?.length > 0">
      <div
        v-for="message in messengerStore.messages"
        :key="message.id"
        class="block max-w-xs min-w-100px w-fit break-words rounded-md p-3 lg:max-w-md"
        :class="[
          isCurrentUserMsg(message.sender as string)
            ? 'ml-auto bg-brand-action text-gray-950'
            : 'bg-brand-primary/10 backdrop-blur',
        ]"
      >
        <p
          class="mb-3 block text-sm font-semibold"
          :class="[isCurrentUserMsg(message.sender as string) && 'text-end']"
        >
          {{
            isCurrentUserMsg(message.sender as string) ? 'You' : messengerStore.receiverUser?.name
          }}
        </p>
        <p class="block px-3 text-xl">{{ message.text }}</p>
        <p
          class="flex items-end gap-1 pt-2 text-sm"
          :class="[!isCurrentUserMsg(message.sender as string) ? 'justify-end' : 'justify-start']"
        >
          <span :class="[isCurrentUserMsg(message.sender as string) ? 'order-2' : 'order-1']">
            {{
              new Date(message.createdAt).toLocaleString('ir-en', {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </span>
          <Icon
            v-if="isCurrentUserMsg(message.sender as string)"
            class="order-1 text-gray-950"
            :name="message.seen ? 'i-eva:done-all-outline' : 'i-eva:checkmark-outline'"
            size="20"
          />
        </p>
      </div>
    </template>
    <div v-else class="size-full flex items-center justify-center">
      <p class="text-4xl font-bold font-hand">No any message yet</p>
    </div>
    <button
      v-show="showGoToBottom"
      @click="scrollToEnd"
      class="sticky bottom-3 left-3 size-7 flex items-center justify-center rounded-50% bg-brand-action p-3"
    >
      <Icon size="32" name="i-eva:arrow-downward-outline" />
    </button>
  </div>
</template>
