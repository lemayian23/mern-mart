import { api } from './api';

export const orderService = {
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  // New method for real-time status updates
  subscribeToOrderUpdates: (orderId, callback) => {
    // This will be handled by the socket service directly
    console.log(`Subscribing to order updates for: ${orderId}`);
  }
};