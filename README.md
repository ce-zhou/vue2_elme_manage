# elme_manage

## 项目详解

### 打包时的性能优化

#### cdn优化

**首先，我们可能会有个疑问：什么是cdn呢？**[参照视频](https://www.bilibili.com/video/BV1jS4y197zi/?spm_id_from=333.337.search-card.all.click&vd_source=d33de799b11664dc4c602e9532f08886)

cdn(Content Delivery Network) 内容分发网络，它还有另一个名字，叫做加速器。一个网络会有很多台边缘服务器提供服务，边缘服务器就是接近用户的这些服务器。通俗点说，cdn就是帮服务器近距离给用户发送**内容**的，使用户就近获取所需内容。

cdn发送的内容又包括静态内容和动态内容。

**静态内容**：一般指图标，图片，文档，多媒体文件之类的



<img src="https://i0.hdslb.com/bfs/note/9ba07039ced87e3f6c5556dacb92b3d99b0c2ebd.png" style="zoom: 33%;" />

像图标，图片这种不长改变的静态内容。源服务器会直接将它们存储到cdn中，用户可以直接从cdn中访问。若源服务器没有提前将静态内容备份到cdn中，cdn就得去问源服务器索取相应的静态内容了。

**动态内容**：php;jsp;asp;aspx 这种文件，需要连接你源服务器进行动态计算的内容。这种一般不缓存到CDN，或者只存短时间。

有了cdn之后，相当于在用户和源服务器之间加了一道墙。源服务器就不用担心DDos恶意攻击了。但是又出现了一个问题，虽然不攻击源服务器了，但转过来攻击cdn。那怎么办呢？

技术人员会布局多台cdn服务器在各个地方，然后监控这些cdn服务器的负载情况，若某台服务器超载了，就会把用户的请求转移到没有超载的cdn服务器那边，为的就是平均分配网络流量。

**好了，现在进入正题，vue项目优化之 cdn引入依赖，减少打包体积。**直接上代码

vue.config.js

```js
module.exports = {
  lintOnSave: false, //关闭语法检查
  chainWebpack: (config) => {
    // 当前所处的模式
    // 生产模式
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.entry("app").clear().add("./src/main-prod.js");
        // 我们是在生产模式中减少打包体积的
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
```

`externals` 配置选项提供了「从输出的 bundle 中排除依赖」的方法。**防止**将某些 `import` 的包(package)**打包**到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖(external dependencies)*。

index.html

```html
<!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link href="https://unpkg.com/@wangeditor/editor@latest/dist/css/style.css" rel="stylesheet">
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <!-- 引入 js -->
    <script src="https://unpkg.com/@wangeditor/editor@latest/dist/index.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js""></script>
    <script src="https://unpkg.com/vue-router@3.6.5/dist/vue-router.global.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.1/echarts.min.js"></script>
```

