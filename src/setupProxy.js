const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://161.35.239.157:8000',
            target: 'http://192.168.0.8:8000',
            changeOrigin: true,
        })
    );
    app.use(
        '/live',
        createProxyMiddleware({
            // target: 'http://161.35.239.157:8000',
            target: 'http://192.168.0.8:8000',
            changeOrigin: true,
        })
    );
};