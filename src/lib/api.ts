// src/lib/api.ts
import axios, { AxiosResponse } from 'axios';
import { OrderData } from '@/types';   // переконайся, що типи імпортовані
import { Product } from '@/types';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  // timeout: 10000,               // опціонально
  // withCredentials: true,        // якщо пізніше додасте cookies/auth
});

// Інтерфейс для відповіді (якщо хочеш повернення тільки data)
type ApiResponse<T> = Promise<AxiosResponse<T>>;

// Функції з типізацією та поверненням .data (найзручніше для сторінок Next.js)

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data || [];  // завжди повертаємо масив, навіть якщо нічого не прийшло
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createOrder = async (data: OrderData): Promise<any> => {  // або типізуй повернення, якщо Order має інтерфейс
  const response = await api.post('/orders', data);
  return response.data;
};

// Додай, якщо потрібен для адмінки (в /admin/orders)
export const getOrders = async (): Promise<any[]> => {   // краще типізувати як Order[]
  const response = await api.get('/orders');
  return response.data;
};

// Опціонально: функція для оновлення статусу замовлення
export const updateOrderStatus = async (
  id: string,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
): Promise<any> => {
  const response = await api.put(`/orders/${id}`, { status });
  return response.data;
};

export default api;