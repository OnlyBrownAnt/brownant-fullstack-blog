# Webpack 搭建 React 脚手架

## Webpack 脚手架搭建思路
- Webpack 主要有两种模式 development、production，不同模式下 Webpack 优化配置有差异。
- 按照官方推荐使用 common、dev、prod 三个配置文件的方式在不同模式下分别使用。

## Webpack 脚手架功能分析
- 前端应用基础功能
    - 前端框架或库: React
    - 前端状态管理: Redux
    - 前端路由: React-Router
    - UI库: Material UI、Ant Design
    - 网络请求: Axios
    - CSS预处理器: Less、Sass
    - 样式组件库: styled-components
    - 全局默认样式: normalize.css
- 开发质量管理
    - 单元测试: Jest
    - 静态类型检查工具: TypeScript
- 开发规范
    - 编码风格配置: EditorConfig
    - 代码格式检查: ESlint
    - 代码格式化: Prettier
    - Git规范: Husky、lint-staged
- 脚手架基础功能
    - 打包工具: Webpack  
    - 多业务环境参数方案: cross-env、dotenv、dotenv-webpack
    - 自动创建html模版: html-webpack-plugin 
    - 资源管理(图片、字体、CSS、其他类型文件): Webpack mudule.rules
    - 兼容性
        - CSS自动增加浏览器前缀: postcss(postcss-loader、postcss-preset-env)
        - 浏览器目标版本的配置: package.json 配置文件中的 browserslist 参数
        - 代码兼容性转换: Babel(babel-loader、@babel/core、@babel/present-env、@babel/present-react、@babel/present-typescript)
    - 资源压缩
        - JS代码压缩: terser-webpack-plugin
        - CSS代码压缩: css-minimizer-webpack-plugin
    - 代码拆分
        - JS代码拆分: webpack默认支持 optimization.splitChunks
        - CSS代码拆分: mini-css-extract-plugin
    - Tree Shaking
        - webpack 5 默认支持
    - 打包性能优化
        - loader增加范围限制include、exclude
        - 优化resolve增加alias
        - 减少不必要的loader
        - 推荐使用 webpack5 的资源模块处理资源
        - 缓存cache
    - 开发调试配置
        - devServer
        - devServer.hot 热更新
        - devServer.proxy 代理服务实现避免浏览器访问跨域

## Webpack 脚手架实例
TODO
