import api from "@/lib/api";
import TokenService from "@/services/token-service";
import type { ChatItem } from "@/types/chat";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getChatHistory = async () => {
  const response = await api.get<ChatItem[]>(`/chats/history`);
  return response.data;
};

export const useChatHistory = () => {
  const query = useQuery({
    queryKey: ["chatHistory"],
    queryFn: getChatHistory,
    initialData: [],
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

import { useMutation } from "@tanstack/react-query";

interface SendChatMessageParams {
  message: string;
}

export const useChatStreaming = () => {
  const mutation = useMutation({
    mutationKey: ["chatStreaming"],
    mutationFn: async ({ message }: SendChatMessageParams) => {
      // Using fetch directly for streaming support
      const response = await fetch(`${api.defaults.baseURL}/chats/streaming`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TokenService.getToken()}`
        },
        body: JSON.stringify({ message })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response;
    },
  });

  const streamChat = async (message: string, onChunk: (chunk: string) => void, onDone: (fullResponse: string) => void) => {
    try {
      const response = await mutation.mutateAsync({ message });
      
      if (!response.body) {
        throw new Error('Response body is null');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';
      
      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
    
          // Decode chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });
    
          // Split by double newlines (event delimiter)
          const events = buffer.split('\n\n');
          buffer = events.pop() || ''; // keep last incomplete part
    
          for (const event of events) {
            const lines = event.split('\n');
            console.log(lines, 'lines');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6); // remove 'data: '
                if (data === '[DONE]') {
                  onDone(fullResponse);
                  return;
                }
                fullResponse += (data + '\n');
                onChunk(data);
              }
            }
          }
        }
      };
      
      processStream().catch(error => {
        console.error('Error processing stream:', error);
        throw error;
      });
      
      // Return cleanup function
      return () => {
        reader.cancel();
      };
    } catch (error) {
      console.error('Error in streaming chat:', error);
      throw error;
    }
  };

  return {
    streamChat,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};


const resetChatHistory = async () => {
  const response = await api.post(`/chats/reset`);
  return response.data;
};

export const useResetChatHistory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["resetChatHistory"],
    mutationFn: resetChatHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistory"] });
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};