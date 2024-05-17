import { useAuthToken } from '@/composables/useAuthToken';
import { socket } from '@/socket';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useMessengerStore } from './messenger';

export const useSocketConnectionStore = defineStore('socket_connection', () => {
  const isConnected = ref(false);
  const { clearOnlineUsers } = useMessengerStore();
  const { accessToken } = useAuthToken();

  function bindEvents() {
    socket.on('connect', () => {
      isConnected.value = true;
    });

    socket.on('disconnect', () => {
      isConnected.value = false;
    });
  }

  function connect() {
    socket.auth = (cb) => cb({ token: accessToken.value });
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
    clearOnlineUsers();
  }

  return {
    isConnected,
    bindEvents,
    connect,
    disconnect,
  };
});
