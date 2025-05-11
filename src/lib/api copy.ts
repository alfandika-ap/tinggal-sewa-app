import TokenService from "@/services/token-service";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface ApiOptions extends RequestInit {
  requireAuth?: boolean;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Base API fetch utility that handles authentication and common fetch options
 */
async function apiFetch<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { requireAuth = true, ...fetchOptions } = options;
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = new Headers(fetchOptions.headers);
  
  // Add default headers
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  
  // Add bearer token authentication if required
  if (requireAuth) {
    const token = TokenService.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }
  
  const config: RequestInit = {
    ...fetchOptions,
    headers
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        // Unauthorized - token might be invalid or expired
        TokenService.removeToken();
      }
      
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Error ${response.status}: ${response.statusText}`
      };
    }
    
    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { data };
    }
    
    // Handle non-JSON responses
    const textData = await response.text();
    return { data: textData as unknown as T };
    
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : "Network error occurred"
    };
  }
}

/**
 * API client with methods for making HTTP requests
 */
const api = {
  /**
   * HTTP GET request
   */
  get<T>(endpoint: string, options?: ApiOptions): Promise<ApiResponse<T>> {
    return apiFetch<T>(endpoint, { 
      ...options,
      method: "GET" 
    });
  },

  /**
   * HTTP POST request
   */
  post<T>(
    endpoint: string, 
    data?: any, 
    options?: ApiOptions
  ): Promise<ApiResponse<T>> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * HTTP PUT request
   */
  put<T>(
    endpoint: string, 
    data?: any, 
    options?: ApiOptions
  ): Promise<ApiResponse<T>> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * HTTP PATCH request
   */
  patch<T>(
    endpoint: string, 
    data?: any, 
    options?: ApiOptions
  ): Promise<ApiResponse<T>> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined
    });
  },

  /**
   * HTTP DELETE request
   */
  delete<T>(
    endpoint: string, 
    options?: ApiOptions
  ): Promise<ApiResponse<T>> {
    return apiFetch<T>(endpoint, {
      ...options,
      method: "DELETE"
    });
  }
};

export default api;
export type { ApiResponse, ApiOptions };
