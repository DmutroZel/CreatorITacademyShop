export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  stock: number;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderData {
  products: { productId: string; quantity: number }[];
  customerName: string;
  email: string;
  phone: string;
  address: string;
}