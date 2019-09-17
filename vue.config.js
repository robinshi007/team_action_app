module.exports = {
  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true,
    },
  },
  transpileDependencies: [
    /\/node_modules\/quasar\//,
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
