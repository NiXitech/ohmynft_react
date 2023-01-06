const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/common',
    createProxyMiddleware({
      target: 'http://34.226.70.245:8889',
      changeOrigin: true,
    })
  );
};