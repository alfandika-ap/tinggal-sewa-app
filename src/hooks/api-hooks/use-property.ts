import api from "@/lib/api";
import type { FunctionSearchPropertiesData } from "@/types/function-type";
import type { PropertyResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

const getSearchProperties = async (data: FunctionSearchPropertiesData) => {
  const response = await api.post<PropertyResponse>(`/chats/search-properties`, data);
  return response.data;
};

export const useSearchProperties = (params?: {
  data?: FunctionSearchPropertiesData;
  enabled?: boolean;
  keys?: any[];
}) => {
  const query = useQuery({
    queryKey: params?.keys ? params?.keys : ["searchProperties", params?.data],
    queryFn: () => params?.data ? getSearchProperties(params?.data) : Promise.resolve({
      results: [],
      success: false,
      count: 0
    }),
    initialData: {
      results: [],
      success: false,
      count: 0,
    },
    enabled: !!params?.data && params?.enabled,
  });

  return {
    data: query.data,
    isLoading: query.isFetching || query.isPending || query.isRefetching || query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};