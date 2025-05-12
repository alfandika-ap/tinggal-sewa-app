import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import TokenService from "@/services/token-service";
import CustomerService from "@/services/customer-service";
import useAuthStore from "@/store/auth-store";
import type { Customer, LoginResponse, RegisterRequest } from "@/types/customer";


// Login
const login = async (username: string, password: string) => {
  const response = await api.post("/customer/login", { username, password });
  const data = response.data as LoginResponse;
  
  // Store token and customer data
  if (data.token) {
    TokenService.setToken(data.token);
    CustomerService.setCustomer(data.customer);
    
    // Update auth store
    useAuthStore.getState().setAuth(data.customer);
  }
  
  return data;
};

const useLogin = () => {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: { username: string, password: string }) => login(data.username, data.password),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  }
}

// Register
const register = async (registerData: RegisterRequest) => {
  try {
    const response = await api.post<Customer>("/customer/register", registerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const useRegister = () => {
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterRequest) => register(data),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}


// Logout
const logout = () => {
  useAuthStore.getState().logout();
};

const useLogout = () => {
  return { logout };
};

export { useLogin, useRegister, useLogout };
export default useLogin;
