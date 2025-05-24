import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BookmarkRequest, BookmarkResponse } from '@/types/bookmark';
import api from '@/lib/api';

export function useBookmarks() {
  return useQuery<BookmarkResponse[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const response = await api.get(`${api.defaults.baseURL}/customer/bookmarks/`);
      return response.data;
    },
  });
}

export function useBookmark(id: string) {
  return useQuery<BookmarkResponse>({
    queryKey: ['bookmarks', id],
    queryFn: async () => {
      const response = await api.get(`${api.defaults.baseURL}/customer/bookmarks/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation<BookmarkResponse, Error, BookmarkRequest>({
    mutationFn: async bookmarkData => {
      // Process string facilities and rules into arrays if they're not already
      const processedData = {
        ...bookmarkData,
        facilities: Array.isArray(bookmarkData.facilities)
          ? bookmarkData.facilities
          : typeof bookmarkData.facilities === 'string'
            ? bookmarkData.facilities.split(',').map((item: string) => item.trim())
            : [],
        rules: Array.isArray(bookmarkData.rules)
          ? bookmarkData.rules
          : typeof bookmarkData.rules === 'string'
            ? bookmarkData.rules.split(',').map((item: string) => item.trim())
            : [],
      };

      const response = await api.post(`${api.defaults.baseURL}/customer/bookmarks/`, processedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async id => {
      await api.delete(`${api.defaults.baseURL}/customer/bookmarks/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
    },
  });
}
