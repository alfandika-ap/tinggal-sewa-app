export interface Customer {
  id: string;
  username: string;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  customer: Customer;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullname: string;
  phone: string;
  address: string;
} 