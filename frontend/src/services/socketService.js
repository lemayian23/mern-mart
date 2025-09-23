import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventCallbacks = new Map();
  }

  connect(token) {
    try {
      if (this.socket) {
        this.disconnect();
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      this.socket = io(apiUrl, {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling'] // Fallback support
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('✅ WebSocket connected');
      });

      this.socket.on('disconnect', (reason) => {
        this.isConnected = false;
        console.log('❌ WebSocket disconnected:', reason);
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        // Auto-reconnect will be handled by socket.io
      });

      return this.socket;
    } catch (error) {
      console.error('Error initializing WebSocket:', error);
      return null;
    }
  }

  joinUserRoom(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-user-room', userId);
      console.log(`👤 User ${userId} joined their room`);
    }
  }

  joinAdminRoom() {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-admin-room');
      console.log('🔧 Admin joined admin room');
    }
  }

  onOrderUpdated(callback) {
    this._addEventListener('order-updated', callback);
  }

  onNewOrder(callback) {
    this._addEventListener('new-order', callback);
  }

  _addEventListener(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      
      // Store callback for cleanup
      if (!this.eventCallbacks.has(event)) {
        this.eventCallbacks.set(event, []);
      }
      this.eventCallbacks.get(event).push(callback);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      // Remove all stored callbacks
      this.eventCallbacks.forEach((callbacks, event) => {
        callbacks.forEach(callback => {
          this.socket.off(event, callback);
        });
      });
      this.eventCallbacks.clear();
    }
  }

  disconnect() {
    if (this.socket) {
      this.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 WebSocket disconnected manually');
    }
  }

  // Utility method to check connection status
  getConnectionStatus() {
    return this.isConnected;
  }
}

// Export singleton instance
export default new SocketService();