const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Disable the X-Powered-By header
app.disable('x-powered-by');

// Define the routes to proxy
app.use('/default', proxy('http://localhost:4001'));
app.use('/secure', proxy('http://localhost:4002'));

// Start the proxy server
app.listen(4000, () => {
  console.log('🚀🚀🚀 Starting proxy on http://localhost:4000 🚀🚀🚀');
});
