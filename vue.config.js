/* const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
 */
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 引入CompressionWebpackPlugin进行gzip压缩
module.exports = {
  // Webpack 性能优化
  /* configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        // [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径，[query] 会被替换成查询字符串  // 压缩后的文件名(保持原文件名，后缀加.gz)
        filename: "[path][base].gz[query]",
        // 压缩成gzip
        algorithm: "gzip",
        // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体做压缩
        test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/,
        // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8,
      }),
    ],
  }, */
  lintOnSave: false, //关闭语法检查
  chainWebpack: (config) => {
    // 当前所处的模式
    // 生产模式
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.entry("app").clear().add("./src/main-prod.js");
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        axios: "axios",
        echarts: "echarts",
        'wangeditor': 'editor'
      });
    });

    // 开发模式
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.entry("app").clear().add("./src/main-dev.js");
    });
    config
      .plugin("webpack-bundle-analyzer")
      .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
  },
};
