import { socket } from '@/socket';
import type { Conversation, Message, User } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerStore = defineStore('messenger', () => {
  const messages = ref<Message[]>([]);
  const receiverUser = ref<User | null>(null);
  const onlineUsers = ref<string[]>([]);
  const conversations = ref<Conversation[]>([]);

  function clearOnlineUsers() {
    onlineUsers.value = [];
  }

  const sendMessage = (text: string, imageUrl = null, videoUrl = null) => ({
    to: (receiverId: string) =>
      socket.send({
        text,
        to: receiverId,
        videoUrl,
        imageUrl,
      }),
  });

  function bindEvents() {
    socket.on('message', (data) => {
      messages.value = data;
    });
    socket.on('consumeReceiverUserDetails', (data) => {
      receiverUser.value = data;
    });
    socket.on('getOnlineUsers', (data) => {
      onlineUsers.value = JSON.parse(JSON.stringify(data));
    });

    socket.on('getChatConversations', (data) => {
      conversations.value = data;
    });
  }

  return {
    onlineUsers,
    messages,
    receiverUser,
    conversations,
    clearOnlineUsers,
    sendMessage,
    bindEvents,
  };
});
