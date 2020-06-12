module.exports = {
    devServer: {
        proxy: {
            '/spider': {
                target: 'http://192.168.88.225:10080',    // 接口的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/spider': '/'
                }
            }
        }
    }
}