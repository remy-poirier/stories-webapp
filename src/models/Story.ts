import { Message } from "models/Message";

export interface Story {
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  witnessName: string;
  victimName: string;
  authorId: string;
  authorName: string;
  category: string;
  isVisible: boolean;
}

export interface Conversation {
  name: string;
  id: string;
  description: string;
  imageUrl: string;
  witnessName: string;
  victimName: string;
  authorId: string;
  authorName: string;
  category: string;
  isVisible: boolean;
  messages: Message[];
}
