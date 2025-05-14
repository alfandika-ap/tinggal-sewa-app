import { Skeleton } from "@/components/ui/skeleton";
import { useChatHistory } from "@/hooks/api-hooks/use-chat";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatList() {
  const { data: messages, isLoading } = useChatHistory();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
          Mulai percakapan dengan asisten kami untuk mencari properti yang sesuai dengan kebutuhan Anda
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
          message.role === "assistant" && 
          message.id.includes("temp-ai-") &&
          index === messages.length - 1;
          
        return (
          <div
            key={message.id}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted",
              isLastBotMessage && "animate-pulse"
            )}
          >
            {message.content ? <Markdown remarkPlugins={[remarkGfm]}>{Array.isArray(message.content) ? message.content.join(' ') : message.content}</Markdown> : (isLastBotMessage && 
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
