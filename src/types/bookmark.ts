export interface BookmarkResponse {
  id: string;
  user: number;
  username: string;
  kost: {
    id: string;
    title: string;
    address: string;
    city: string;
    province: string;
    description: string;
    price: number;
    facilities: string[];
    rules: string[];
    contact: string;
    url: string;
    image_url: string;
    gender: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
}

export interface BookmarkRequest {
  title: string;
  address: string;
  city: string;
  province: string;
  description: string;
  price: number;
  facilities: string[] | string;
  rules: string[] | string;
  contact: string;
  url: string;
  image_url: string;
  gender: string;
}
