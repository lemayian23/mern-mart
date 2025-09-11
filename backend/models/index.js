const User = require('./User');
const Product = require('./Product');
const Contact = require('./Contact');
const Order = require('./Order');
const Cart = require('./Cart');

// Define relationships between models
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  User,
  Product,
  Contact,
  Order,
  Cart
};