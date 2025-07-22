const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        'webplay/auth/**',
        createProxyMiddleware({
            target: 'http://localhost:3000/api/webplay/',
            changeOrigin: true,
        })
    );
};
