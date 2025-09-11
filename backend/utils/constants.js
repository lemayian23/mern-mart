module.exports = {
  ROLES: {
    USER: 'user',
    ADMIN: 'admin'
  },
  
  CATEGORIES: [
    'Electronics',
    'Clothing',
    'Home',
    'Books',
    'Sports',
    'Beauty',
    'Toys',
    'Food',
    'Accessories'
  ],
  
  ORDER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  },
  
  PAYMENT_METHODS: {
    CREDIT_CARD: 'credit_card',
    PAYPAL: 'paypal',
    STRIPE: 'stripe'
  },
  
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50
  }
};