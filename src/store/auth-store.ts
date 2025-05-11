import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Customer } from '@/types/customer';
import CustomerService from '@/services/customer-service';
import TokenService from '@/services/token-service';

interface AuthState {
  isAuthenticated: boolean;
  customer: Customer | null;
  setAuth: (customer: Customer) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const useAuthStore = create<AuthState>()(
  devtools(
    (set, _) => ({
      isAuthenticated: !!TokenService.getToken(),
      customer: CustomerService.getCustomer(),

      setAuth: (customer: Customer) => {
        set({ isAuthenticated: true, customer });
      },

      logout: () => {
        TokenService.removeToken();
        CustomerService.removeCustomer();
        set({ isAuthenticated: false, customer: null });
      },

      checkAuth: () => {
        const token = TokenService.getToken();
        const customer = CustomerService.getCustomer();
        
        const isAuthenticated = !!token && !!customer;
        set({ isAuthenticated, customer });
        
        return isAuthenticated;
      },
    }),
    { name: 'auth-store' }
  )
);

export default useAuthStore; 