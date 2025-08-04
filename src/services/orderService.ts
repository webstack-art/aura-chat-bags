import { apiService } from './api';

export interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total: number;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  created_at: string;
  updated_at: string;
  shipping_address: {
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone?: string;
  };
  items: OrderItem[];
  tracking_number?: string;
  estimated_delivery?: string;
}

export interface CreateOrderData {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone?: string;
  items: {
    product_id: number;
    quantity: number;
    color?: string;
    size?: string;
  }[];
  payment_method?: string;
  notes?: string;
}

export interface OrderListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}

class OrderService {
  async getOrders(page?: number): Promise<OrderListResponse> {
    const params = page ? { page } : {};
    const response = await apiService.get<OrderListResponse>('/orders/', params);
    return response.data;
  }

  async getOrder(orderNumber: string): Promise<Order> {
    const response = await apiService.get<Order>(`/orders/${orderNumber}/`);
    return response.data;
  }

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    const response = await apiService.post<Order>('/orders/create/', orderData);
    return response.data;
  }

  async cancelOrder(orderNumber: string): Promise<{ message: string }> {
    const response = await apiService.post<{ message: string }>(`/orders/${orderNumber}/cancel/`);
    return response.data;
  }

  async getOrderStatus(orderNumber: string): Promise<{ status: string; tracking_number?: string }> {
    const response = await apiService.get(`/orders/${orderNumber}/status/`);
    return response.data;
  }

  async updateOrderStatus(orderNumber: string, status: Order['status']): Promise<Order> {
    const response = await apiService.patch<Order>(`/orders/${orderNumber}/`, { status });
    return response.data;
  }

  async updatePaymentStatus(orderNumber: string, paymentStatus: Order['payment_status']): Promise<Order> {
    const response = await apiService.patch<Order>(`/orders/${orderNumber}/`, { payment_status: paymentStatus });
    return response.data;
  }

  async getOrderInvoice(orderNumber: string): Promise<Blob> {
    const response = await apiService.get(`/orders/${orderNumber}/invoice/`, { responseType: 'blob' });
    return response.data;
  }

  async trackOrder(orderNumber: string): Promise<{
    status: string;
    tracking_number?: string;
    tracking_events: {
      status: string;
      location: string;
      timestamp: string;
      description: string;
    }[];
  }> {
    const response = await apiService.get(`/orders/${orderNumber}/track/`);
    return response.data;
  }
}

export const orderService = new OrderService();
export default orderService;
