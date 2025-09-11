// Temporary simplified security middleware
const securityMiddleware = (app) => {
  console.log('Security middleware loaded (simplified version)');
  
  // Basic CORS - you can add proper CORS later
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
};

module.exports = securityMiddleware;