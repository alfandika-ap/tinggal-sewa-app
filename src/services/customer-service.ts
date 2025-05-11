import Cookies from "js-cookie";
import type { Customer } from "@/types/customer";

const CUSTOMER_KEY = "customer_data";

const CustomerService = {
  getCustomer: (): Customer | null => {
    const customerJSON = Cookies.get(CUSTOMER_KEY);
    if (!customerJSON) return null;
    
    try {
      return JSON.parse(customerJSON) as Customer;
    } catch (error) {
      console.error("Failed to parse customer data:", error);
      return null;
    }
  },
  
  setCustomer: (customer: Customer): void => {
    Cookies.set(CUSTOMER_KEY, JSON.stringify(customer));
  },
  
  removeCustomer: (): void => {
    Cookies.remove(CUSTOMER_KEY);
  }
};

export default CustomerService; 