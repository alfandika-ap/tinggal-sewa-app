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
      
      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            onDone(fullResponse);
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          onChunk(chunk);
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