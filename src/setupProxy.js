const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/common',
    createProxyMiddleware({
      target: 'http://192.168.6.245:8888',
      changeOrigin: true,
    })
  );
};