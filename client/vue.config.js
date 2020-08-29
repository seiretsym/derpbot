module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3377",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      }
    },
  }
}