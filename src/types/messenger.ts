import type { User } from './user';

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  seen: boolean;
  imageUrl: string | null;
  videoUrl: string | null;
  createdAt: string | Date;
}

export interface Conversation {
  id: string;
  to: User;
  lastMessage: Message;
  updatedAt: Date | string;
}
