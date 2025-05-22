import type { ChatItem } from '@/types/chat';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ChatSearchResultState {
  chat?: ChatItem;
  setChat: (chat: ChatItem) => void;
  removeChat: () => void;
}

const useChatSearchResultStore = create<ChatSearchResultState>()(
  devtools<ChatSearchResultState>((set) => ({
    chat: undefined,
    setChat: (chat: ChatItem) => set({ chat }),
    removeChat: () => set({ chat: undefined })
  }), {
    name: 'chat-search-result-store',
  })
);

export default useChatSearchResultStore;