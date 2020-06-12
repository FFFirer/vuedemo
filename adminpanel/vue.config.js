module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://flights.ctrip.com/itinerary/api/12808/products',
                changeOrigin: true,
                ws: true,
                secure: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}