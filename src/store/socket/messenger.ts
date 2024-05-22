import { socket } from '@/socket';
import type { ConversationList, Message, User } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessengerStore = defineStore('messenger', () => {
  const messages = ref<Message[]>([]);
  const receiverUser = ref<User | null>(null);
  const onlineUsers = ref<string[]>([]);
  const conversations = ref<ConversationList[]>([]);

  function clearAllStates() {
    onlineUsers.value = [];
    messages.value = [];
    receiverUser.value = null;
    conversations.value = [];
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

  function getConversations() {
    socket.emit('getChatConversations');
  }
  function bindEvents() {
    socket.on('message', (msgs: Message[]) => {
      messages.value = msgs;

      const lastMsg = msgs[msgs.length - 1];
      if (receiverUser.value?.id === lastMsg.sender) socket.emit('seen', receiverUser.value.id);
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
    clearAllStates,
    getConversations,
    sendMessage,
    bindEvents,
  };
});
