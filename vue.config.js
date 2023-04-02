const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: true, // 热加载
    host: "172.40.3.116", // ip地址
    port: 8080, // 端口
    open: false, // 自动打开浏览器

//     public: '172.40.3.116:8080',

//     hot: true,

//     // disableHostCheck: true,
//     historyApiFallback: true,
//     allowedHosts: "all"
}

})
