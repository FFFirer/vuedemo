module.exports = {
    devServer: {
        proxy: {
            '/spider': {
                target: 'http://localhost:56343/',    // 接口的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/spider': '/'
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}