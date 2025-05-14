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
    console.log("Sending registration request with data:", registerData);
    const response = await api.post<LoginResponse>("/customer/register", registerData);
    console.log("Registration response:", response);
    const data = response.data;
    
    // Store token and customer data if registration is successful
    if (data.token) {
      TokenService.setToken(data.token);
      CustomerService.setCustomer(data.customer);
      
      // Update auth store
      useAuthStore.getState().setAuth(data.customer);
    } else {
      console.error("Registration response missing token:", data);
      throw new Error("Token tidak diterima dari server");
    }
    
    return data;
  } catch (error: any) {
    // Log the error for debugging
    console.error("Registration error details:", {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      headers: error?.response?.headers,
      config: error?.config
    });
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
};


// Logout
const logout = () => {
  useAuthStore.getState().logout();
};

const useLogout = () => {
  return { logout };
};

// Update Profile
const updateProfile = async (profileData: Partial<Customer>) => {
  try {
    console.log("Sending profile update request with data:", profileData);
    const response = await api.put<Customer>("/customer/profile", profileData);
    console.log("Profile update response:", response);
    
    // Store the updated customer data
    const updatedCustomer = response.data;
    CustomerService.setCustomer(updatedCustomer);
    
    return updatedCustomer;
  } catch (error: any) {
    // Log the error for debugging
    console.error("Profile update error details:", {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      headers: error?.response?.headers,
      config: error?.config
    });
    throw error;
  }
};

const useUpdateProfile = () => {
  const mutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: Partial<Customer>) => updateProfile(data),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export { useLogin, useRegister, useLogout, useUpdateProfile };
export default useLogin;
