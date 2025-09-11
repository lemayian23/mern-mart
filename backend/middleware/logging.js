const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = 'logs/';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Request logging middleware
const requestLogger = (req, res, next) => {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    userId: req.user ? req.user._id : 'anonymous'
  };

  console.log(`${log.timestamp} - ${log.method} ${log.url} - IP: ${log.ip}`);

  // Append to log file
  const logEntry = JSON.stringify(log) + '\n';
  fs.appendFileSync(path.join(logsDir, 'requests.log'), logEntry);

  next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    error: err.message,
    stack: err.stack,
    userId: req.user ? req.user._id : 'anonymous'
  };

  console.error('Error:', errorLog);

  // Append to error log file
  const logEntry = JSON.stringify(errorLog) + '\n';
  fs.appendFileSync(path.join(logsDir, 'errors.log'), logEntry);

  next(err);
};

module.exports = {
  requestLogger,
  errorLogger
};