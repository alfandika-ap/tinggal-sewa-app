import api from "@/lib/api";
import { saveParsedJson } from "@/lib/utils";
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

  const streamChat = async (
    message: string,
    onChunk: (chunk: string) => void,
    onDone: (fullResponse: string) => void
  ) => {
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
  
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';
  
          for (const event of events) {
            const lines = event.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
  
                if (data === '[DONE]') {
                  onDone(fullResponse);
                  return;
                }
  
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === 'text') {
                    const parsedFull = saveParsedJson(fullResponse, { type: 'text', data: '' });
                    const updatedText = parsedFull.data + parsed.data;
                    const delta = updatedText.slice(parsedFull.data.length); // hanya bagian yang baru
                    fullResponse = JSON.stringify({ type: 'text', data: updatedText });

                    if (delta) {
                      onChunk(`delta: ${JSON.stringify({ type: 'text', data: delta })}`);
                    }
                  } else if (parsed.type === 'function_result') {
                    // bisa tampilkan hasil function call kalau kamu mau
                    console.log("Function result:", parsed.data);
                  } else if (parsed.type === 'done') {
                    onDone(fullResponse);
                    return;
                  }
                } catch (err) {
                  console.warn('Failed to parse stream chunk', err);
                }
              }
            }
          }
        }
      };
  
      processStream().catch(error => {
        console.error('Error processing stream:', error);
        throw error;
      });
  
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