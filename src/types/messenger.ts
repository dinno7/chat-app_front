import type { User } from './user';

export interface Message {
  id: string;
  text: string;
  seen: boolean;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string | Date;
  conversation: Conversation | string;
  sender: User | string;
  receiver: User | string;
}

export interface Conversation {
  id: string;
  user: User | string;
  from: User | string;
  to: User | string;
  messages?: Message[];
  lastMessage: Message;
  updatedAt: string;
}

export interface ConversationList {
  id: string;
  user: User;
  lastMessage: Message;
  updatedAt: string;
  unseenMessagesCount: number;
}
