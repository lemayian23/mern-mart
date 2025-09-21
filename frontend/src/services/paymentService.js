import { api } from './api';

export const paymentService = {
  getPaymentMethods: async () => {
    return await api.get('/payment-methods');
  },

  getPaymentMethodById: async (id) => {
    return await api.get(`/payment-methods/${id}`);
  },

  createPaymentMethod: async (paymentData) => {
    return await api.post('/payment-methods', paymentData);
  },

  updatePaymentMethod: async (id, paymentData) => {
    return await api.put(`/payment-methods/${id}`, paymentData);
  },

  deletePaymentMethod: async (id) => {
    return await api.delete(`/payment-methods/${id}`);
  },

  setDefaultPaymentMethod: async (id) => {
    return await api.patch(`/payment-methods/${id}/default`);
  },

  processPayment: async (paymentData) => {
    return await api.post('/payments/process', paymentData);
  },

  getPaymentHistory: async () => {
    return await api.get('/payments/history');
  }
};