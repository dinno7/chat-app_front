import { socket } from '@/socket';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerStore = defineStore('messenger', () => {
  const onlineUsers = ref<string[]>([]);
  function clearOnlineUsers() {
    onlineUsers.value = [];
  }

  function bindEvents() {
    socket.on('getOnlineUsers', (data) => {
      onlineUsers.value = JSON.parse(JSON.stringify(data));
    });
  }

  return { onlineUsers, clearOnlineUsers, bindEvents };
});
