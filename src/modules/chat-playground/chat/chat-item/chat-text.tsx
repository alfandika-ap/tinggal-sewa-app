import type { ChatContent } from '@/types/chat';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ChatText({ chat }: { chat: ChatContent }) {
  return (
    <div className="prose dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="whitespace-pre-wrap">{children}</p>,
          ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          a: ({ children, href }) => (
            <a href={href} className="text-primary underline">
              {children}
            </a>
          ),
          img: ({ src, alt }) => <img src={src} alt={alt} className="" />,
          blockquote: ({ children }) => (
            <blockquote className=" whitespace-pre-wrap">{children}</blockquote>
          ),
          h1: ({ children }) => <h1 className="text-2xl font-bold ">{children}</h1>,
        }}
      >
        {chat.data}
      </Markdown>
    </div>
  );
}

export default ChatText;
