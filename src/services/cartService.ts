import { apiService } from './api';

export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    slug: string;
  };
  quantity: number;
  total_price: number;
  color?: string;
  size?: string;
}

export interface Cart {
  total_items: number;
  total_price: number;
  items: CartItem[];
}

export interface AddToCartData {
  product: number;
  quantity: number;
  color?: string;
  size?: string;
}

export interface UpdateCartItemData {
  quantity: number;
}

class CartService {
  async getCart(): Promise<Cart> {
    const response = await apiService.get<Cart>('/users/cart/');
    return response.data;
  }

  async addToCart(itemData: AddToCartData): Promise<CartItem> {
    const response = await apiService.post<CartItem>('/users/cart/items/', itemData);
    return response.data;
  }

  async updateCartItem(itemId: number, updateData: UpdateCartItemData): Promise<CartItem> {
    const response = await apiService.put<CartItem>(`/users/cart/items/${itemId}/`, updateData);
    return response.data;
  }

  async removeFromCart(itemId: number): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>(`/users/cart/items/${itemId}/`);
    return response.data;
  }

  async clearCart(): Promise<{ message: string }> {
    const response = await apiService.delete<{ message: string }>('/users/cart/clear/');
    return response.data;
  }

  async getCartItemCount(): Promise<{ count: number }> {
    const response = await apiService.get<{ count: number }>('/users/cart/count/');
    return response.data;
  }

  // Sync with local storage for offline functionality
  async syncWithLocalStorage(localCartItems: any[]): Promise<Cart> {
    const response = await apiService.post<Cart>('/users/cart/sync/', { items: localCartItems });
    return response.data;
  }
}

export const cartService = new CartService();
export default cartService;
