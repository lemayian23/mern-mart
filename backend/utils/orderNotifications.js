const { io } = require('../server');

class OrderNotifications {
  // Notify user and admin about order status change
  static async notifyOrderStatusUpdate(order) {
    try {
      const notificationData = {
        orderId: order._id,
        userId: order.user.toString(),
        status: order.status,
        timestamp: new Date(),
        message: `Order status updated to: ${order.status}`
      };

      // Emit to WebSocket rooms
      io.to(`user-${order.user}`).emit('order-updated', notificationData);
      io.to('admin-room').emit('order-updated', notificationData);

      console.log(`Order status notification sent for order ${order._id}`);
    } catch (error) {
      console.error('Error sending order notification:', error);
    }
  }

  // Notify about new order creation
  static async notifyNewOrder(order) {
    try {
      const notificationData = {
        orderId: order._id,
        userId: order.user.toString(),
        status: order.status,
        timestamp: new Date(),
        message: 'New order created',
        isNew: true
      };

      // Notify admin about new order
      io.to('admin-room').emit('new-order', notificationData);

      console.log(`New order notification sent for order ${order._id}`);
    } catch (error) {
      console.error('Error sending new order notification:', error);
    }
  }
}

module.exports = OrderNotifications;