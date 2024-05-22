<script setup lang="ts">
import { socket } from '@/socket';
import { useMessengerStore } from '@/store/socket/messenger';
import { useUserStore } from '@/store/user';
import { normalizeImageUrl } from '@/utils';
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import Avatar from '../Avatar.vue';
import Icon from '../Icon.vue';

const userStore = useUserStore();
const messengerStore = useMessengerStore();

const sortedConversations = computed(() =>
  [...messengerStore.conversations].sort((a, b) => {
    if (new Date(a.updatedAt).valueOf() <= new Date(b.updatedAt).valueOf()) return 1;
    return -1;
  }),
);

onMounted(() => {
  socket.emit('getChatConversations');
});
</script>

<template>
  <div class="w-full">
    <div class="border-b-2 border-brand-primary/50 bg-brand-base/30 p-6">
      <p class="flex items-baseline gap-2 text-xl font-bold">
        <span class="line-clamp-1 text-brand-action tracking-wider"
          >{{ userStore.currentUser?.name }}'s</span
        >
        Messages
      </p>
    </div>
    <div class="flex flex-col items-stretch justify-start gap-3 overflow-auto px-3 py-5">
      <RouterLink
        v-for="{ user, lastMessage, updatedAt, unseenMessagesCount } in sortedConversations"
        :key="user.id"
        :to="{ name: 'user_messages', params: { user_id: user.id } }"
        v-slot="{ isActive }"
        :title="user.name"
      >
        <div
          class="cursor-pointer rounded-lg bg-brand-primary p-3 transition-colors"
          :class="[isActive ? 'bg-opacity-20' : 'bg-opacity-5 hover:bg-opacity-10']"
        >
          <div class="flex items-center justify-start gap-3">
            <div class="Avatar">
              <div
                v-if="user.id === userStore.currentUser?.id"
                class="max-h-14' size-14 max-w-14 flex items-center justify-center rounded-50% bg-brand-action"
              >
                <Icon name="i-eva:bookmark-outline" size="34" />
              </div>
              <Avatar
                v-else
                size="md"
                :src="normalizeImageUrl(user.profilePicture)"
                :alt="user.name"
                :status="messengerStore.onlineUsers.includes(user.id) ? 'online' : 'offline'"
              />
            </div>
            <div
              class="Chat-Summery flex flex-1 flex-col items-center justify-between gap-2 overflow-hidden"
            >
              <div class="Top w-full flex items-center justify-between">
                <p
                  v-if="user.id === userStore.currentUser?.id"
                  class="line-clamp-1 max-w-15rem basis-8/12 overflow-hidden text-ellipsis whitespace-pre text-lg"
                  :class="[
                    isActive ? 'font-bold text-brand-action' : 'font-semibold text-brand-primary',
                  ]"
                >
                  Saved messages
                </p>
                <p
                  v-else
                  class="line-clamp-1 max-w-15rem basis-8/12 overflow-hidden text-ellipsis whitespace-pre text-lg"
                  :class="[
                    isActive ? 'font-bold text-brand-action' : 'font-semibold text-brand-primary',
                  ]"
                >
                  {{ user.name }}
                </p>
                <p class="ml-auto text-sm">
                  {{
                    new Date(updatedAt).toLocaleString('en-ir', {
                      weekday: 'short',
                    })
                  }}
                </p>
              </div>
              <div class="Bottom w-full flex items-center justify-between">
                <p
                  v-if="lastMessage?.text"
                  class="line-clamp-1 max-w-10rem basis-8/12 overflow-hidden text-ellipsis whitespace-pre text-sm text-gray"
                >
                  {{ lastMessage.text }}
                </p>
                <span
                  v-if="unseenMessagesCount > 0"
                  class="size-5 flex items-center justify-center rounded-50% bg-brand-action pt-0.5 text-xs text-brand-base font-bold line-height-none"
                  >{{ unseenMessagesCount }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
