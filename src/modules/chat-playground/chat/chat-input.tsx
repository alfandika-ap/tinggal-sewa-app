import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useChatStreaming } from "@/hooks/api-hooks/use-chat";
import { useQueryClient } from "@tanstack/react-query";
import { type ChatItem } from "@/types/chat";
import { toast } from "sonner";

function ChatInput() {
  const [message, setMessage] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { streamChat, isLoading } = useChatStreaming();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate input
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      toast.error("Pesan tidak boleh kosong");
      return;
    }

    setIsStreaming(true);
    
    try {
      // Create optimistic user message
      const userMessage: ChatItem = {
        id: `temp-${Date.now()}`,
        role: "user",
        content: trimmedMessage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Create a placeholder for AI response
      const aiMessage: ChatItem = {
        id: `temp-ai-${Date.now()}`,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Optimistically update chat history
      queryClient.setQueryData<ChatItem[]>(["chatHistory"], (oldData = []) => {
        return [...oldData, userMessage, aiMessage];
      });

      // Clear input field immediately
      setMessage("");

      // Start streaming
      let responseText = "";
      await streamChat(
        trimmedMessage,
        (chunk) => {
          queryClient.setQueryData<ChatItem[]>(["chatHistory"], (oldData = []) => {
            return oldData.map((item) => {
              if (item.id === aiMessage.id) {
                return { ...item, content: responseText + chunk };
              }
              return item;
            });
          });
          responseText += chunk;
        },
        (fullResponse) => {
          queryClient.setQueryData<ChatItem[]>(["chatHistory"], (oldData = []) => {
            return oldData.map((item) => {
              if (item.id === aiMessage.id) {
                return { ...item, content: fullResponse, id: `final-${Date.now()}` };
              }
              return item;
            });
          });
        }
      );
    } catch (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      queryClient.setQueryData<ChatItem[]>(["chatHistory"], (oldData = []) => {
        return oldData.filter((item) => item.id !== `temp-ai-${Date.now()}`);
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center space-x-2"
    >
      <Input
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Cari properti..."
        className="flex-1"
        autoComplete="off"
        disabled={isLoading || isStreaming}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || isStreaming || !message.trim()}
      >
        {isLoading || isStreaming ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
}

export default ChatInput;
