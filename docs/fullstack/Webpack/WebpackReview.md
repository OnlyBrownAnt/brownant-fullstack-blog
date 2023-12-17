# Webpack 总结

## Docs
- [webpack](https://webpack.docschina.org/)
- [webpack5-concepts](https://webpack.docschina.org/concepts/)
- "玩转Webpack" 84集 极客时间

## init package
webpack
webpack-cli


## Webpack功能概览

### 关键词
- loader
- plugin
- loader和plugin有冲突情况

### 资源打包
- js、json、css、jsx
- 图片、字体

### 热更新
- Webpack Complie
- Bundle Server
- bundle.js
- HMR Server
- HMR Runtime

!["webpakc-1"](/img/docs/webpack/webpack-1.png "webpack-1")

### 文件指纹
文件指纹 打包之后，文件资源名称中的数字标识。

#### 作用
- 打包阶段 加快加载速度
- 生产阶段 加快网页加载

#### 类型
- hash
- chunkhash
- contenthash
### 代码压缩
- html
- css
- javascript

#### 优点
- 减少文件大小

### Webpack自动清理构建目录
clean-webpack-plugin

### CSS3增强
浏览器兼容性处理，自动增加前缀。loader，后置处理器
- PostCSS loader
- autoprefixer plugin

### 移动端CSS px自动转换rem
解决媒体查询处理移动端适配的多套代码配置问题
- px2rem
- flexiable 自动计算font-size

### 静态资源内联
资源、js代码、css代码内联到html文档中。

- 代码层面 
    - 页面初始化 比如rem计算flexiable
    - 上报埋点
    - css内联避免页面闪动
- 请求层面
    - 减少请求数量

- raw-loader
- babel-loader