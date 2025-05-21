import { cn, saveParsedJson } from '@/lib/utils';
import type { ChatContent, ChatItem } from '@/types/chat';
import ChatText from './chat-item/chat-text';
import { chatItemMap } from './chat-item/chat-item-map';
import { useMemo } from 'react';

function ChatBubble({ chat, isLast }: { chat: ChatItem; isLast?: boolean }) {

  const chatContent = useMemo(() => {
    if (chat.content.includes('delta: ')) {
      const merged = {
        type: "text",
        data: chat.content.split('delta: ').map(item => saveParsedJson<ChatContent>(item, { type: 'default', data: '' }).data).join("")
      };
      return merged as ChatContent;
    }
    return saveParsedJson(chat.content, { type: 'default', data: '' }) as ChatContent;
  }, [chat]);

  const ChatItemComponent = useMemo(() => {
    if (chatContent.type in chatItemMap) {
      return chatItemMap[chatContent.type as keyof typeof chatItemMap];
    }
    return chatItemMap["default"];
  }, [chatContent]);


  return (
    <div
      className={cn(
        'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
        chat.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted',
        chat.role === 'assistant' &&
          chat.id.includes('temp-ai-') &&
          !chat.content &&
          'animate-pulse'
      )}
    >
      {chat.content ? (
        <>
          {chat.role === 'user' ? (
            <ChatText
              chat={{
                type: 'text',
                data: chat.content,
              }}
            />
          ) : (
            <ChatItemComponent chat={chatContent} />
          )}
        </>
      ) : (
        isLast && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
            <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
          </div>
        )
      )}
    </div>
  );
}

export default ChatBubble;
