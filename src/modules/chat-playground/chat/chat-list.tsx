import { Skeleton } from '@/components/ui/skeleton';
import { useChatHistory } from '@/hooks/api-hooks/use-chat';
import { MessageCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ChatBubble from './chat-bubble';
import useChatSearchResultStore from '@/store/chat-search-result-store';

export default function ChatList() {
  const { data: messages, isLoading } = useChatHistory();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const setChat = useChatSearchResultStore(state => state.setChat);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const findFunctionItem = messages.filter(message => message.role === 'function' && message.function_name === 'search_properties').at(-1);
      if (findFunctionItem) {
        setChat(findFunctionItem);
      }
    }
  }, [messages]);

  

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-1/2 ml-auto" />
        <Skeleton className="h-10 w-3/4" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
        <div className="relative">
          <div className="absolute top-0 right-0 size-6 flex items-center justify-center bg-primary text-white rounded-full animate-pulse">
            <span className="text-xs">?</span>
          </div>
          <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Belum Ada Percakapan</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          Mulai percakapan dengan asisten kami untuk mencari properti yang sesuai dengan kebutuhan
          Anda
        </p>
        <div className="w-full max-w-md bg-muted/50 rounded-lg p-4 border border-dashed border-muted-foreground/30">
          <p className="text-sm font-medium mb-2">Contoh pertanyaan:</p>
          <ul className="text-sm text-muted-foreground space-y-1.5 text-left">
            <li>"Cari kost dekat Universitas Indonesia"</li>
            <li>"Apartemen 2 kamar di Jakarta Selatan"</li>
            <li>"Rumah dengan 3 kamar tidur di Bandung"</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message, index) => {
        const isLastBotMessage =
          message.role === 'assistant' &&
          message.id.includes('temp-ai-') &&
          index === messages.length - 1;

        return (
          <ChatBubble key={message.id} chat={message} isLast={isLastBotMessage} />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
