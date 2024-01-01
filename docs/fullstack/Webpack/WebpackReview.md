# Webpack 总结
> 以[webpack-guide](https://webpack.js.org/guides/)为基本学习路线，同时以`"玩转Webpack"`课程进行进阶知识补充。
>
> 笔记中内容版本都是以 Webpack v5 版本为准。

## Docs
### 知识库文档
- [webpack](https://webpack.js.org/)
- [webpack-concepts](https://webpack.js.org/concepts/)
- [webpack-guide](https://webpack.js.org/guides/)
- [createapp](https://createapp.dev/)
    > 在线Webpack参考配置，可以通过勾选配置看到推荐配置
- "玩转Webpack" 84集 极客时间
- [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts)
    > Create React APP 脚手架的脚本工具源码。可以用于学习该库对 Webpack 的集成处理思路和技巧。

### 优化实战参考博文
- [前端工程化知识点](https://q.shanyue.tech/engineering)
- [学习 Webpack5 之路（优化篇）](https://jelly.jd.com/article/61179aa26bea510187770aa3)
- [手把手教你搭建 Webpack 5 + React 项目](https://juejin.cn/post/7228845572618371133)
- [都 2022 年了，手动搭建 React 开发环境很难吗？](https://cloud.tencent.com/developer/article/2061472)
- [学习 Webpack5 之路（实践篇）](https://jelly.jd.com/article/6107701c22a78f01a317cd05)

### 面试题参考
- [Webpack面试题](https://gugiegie.gitee.io/frontend/frontend/advance/webpack.html#webpack%E9%9D%A2%E8%AF%95%E9%A2%98)
- [webpack系列](https://vue3js.cn/interview/webpack/webpack.html#%E4%B8%80%E3%80%81%E8%83%8C%E6%99%AF)
- [webpack搜索](https://fe.ecool.fun/search?keyword=webpack)
- [当面试官问Webpack的时候他想知道什么](https://developers.weixin.qq.com/community/develop/article/doc/000262a80f0aa0bc74eb8cd3c5bc13)

## 入门(Getting Started)
> 这个入门Demo是以直接打包源码输出结果为演示目的，所以是一个极简化配置，webpack配置约定默认是生产，一些设置值配置相对简单基础。

1. 初始化Npm工程
    ```shell
    npm init

    # package.json
    # 删除 "index": "index.js"
    # 新增 "private": "true"
    ```
2. 安装webpack核心库
    ```shell
    npm install webpack webpack-cli --save-dev
    ```
3. 创建webpack配置文件
    > 定义三个基本的参数，模式(mode)、输入(entry)、输出(output)
    ```js
    // webpack.config.js
    const path = require('path');
    module.exports = {
        mode: "production", // 根据不同环境使用需要的模式
        entry: "./src/index.js",
        output: {
            filename: "main.js"
            path: path.resolve(__dirname, "dist");
        }
    }
    ```
4. 创建源代码资源
    ```
    /dist
        index.html
    /src
        index.js
    ```

## 资源管理(Asset Management)
Webpack处理资源的目的，是为了将这些资源作为依赖项进行一个动态的捆绑，即构建依赖关系图的过程。最终作为资源的打包的基础。

所以需要对资源进行一些处理可能使用到loader、自定义解析器、Bebel。

### 资源管理类型
1. [Webpack 资源模块](./WebpackReview#资源模块asset-module)
2. Webpack 默认支持
    > 比如json是webpack默认支持的，不需要额外增加管理处理。
3. loader

### 常见资源类型
- 代码资源(Code)
    - `js` `mjs` `jsx` `tx` `tsx`
- 样式代码资源(CSS)
    - `css` `sass` `less` `stylus`
- 图片(Image)
    - 常见图片类型 `png` `svg` `jpg` `jpeg` `gif` `webp`
- 字体(Font)
    - 常见字体类型 `woff` `woff2` `eot` `ttf` `otf`
- 其他数据(Data)
    - 常见其他数据类型 `csv` `xml` `json` `txt`

### 常见资源管理模版
```js
// webpack.conifg.js
const json5 = require('json5');

module.exports = {
    module: {
        rules: [
            // 代码资源(Code) 
            {
                test: /.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", // 
                                {
                                    targets: "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead", // 根据项目兼容设置具体配置，比如package.json的browserslist配置
                                    modules: false, // 是否对ES6模块化进行更改。如果保持不更改，有助于tree shaking 等优化措施。
                                    useBuiltIns: "usage", // 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本
                                },
                            ],
                            ["@babel/preset-typescript"], // typescript 环境
                            ["@babel/preset-react"], // react 环境
                        ],
                    },
                },
            },
            
            // 样式代码资源(CSS)
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(less)$/,
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader。开发模式使用 style-loader。因为MiniCssExtractPlugin.loader无法支持热更新。
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                        // 也包括会自动帮助我们添加 autoprefixer
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "less-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
            {
                test: /\.(sass)$/,
                use: [
                    "style-loader",
                    // MiniCssExtractPlugin.loader // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader。开发模式使用 style-loader。因为MiniCssExtractPlugin.loader无法支持热更新。
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                        // 也包括会自动帮助我们添加 autoprefixer
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "sass-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader', 
                    // MiniCssExtractPlugin.loader // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader。开发模式使用 style-loader。因为MiniCssExtractPlugin.loader无法支持热更新。
                    'css-loader', 
                    'stylus-loader'
                    ],
            },

            // 图片(Image)
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    },
                },
                generator: {
                    // 输出文件规则视具体要求而定
                    filename: "static/media/[name].[contenthash:8][ext]",
                },
            },

            // 字体(Font)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                // 字体文件不需要转换
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 25 * 1024, // 25kb
                //   },
                // },
                generator: {
                    // 输出文件规则视具体要求而定
                    filename: "static/fonts/[name].[contenthash:8][ext]",
                },
            },

            // 其他数据(Data)
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ],
    },
};
```

## 管理输出(Output Management)
打包输出相关配置
1. 输出(打包)参数
```js
// webpack.config.js
const path = require('path');
module.exports = {
    output: {
        path: path.resolve(__dirname, "../dist"), // 输出文件目录路径
        filename: "static/js/[name].[contenthash:8].js", // 输出文件命名规则
        clean: true, // 输出前是否清理之前的构建结果
   },
 };
```
2. [自动生成HTML模版功能](./WebpackReview#自动生成html模版功能)
3. [manifest映射功能](./WebpackReview#manifest映射功能)

## 开发(Development)
### 开发依赖相关配置
- webpack-dev-server
- HMR热更新
- source-map
- devServer
- proxy
    - http-proxy-middleware

### 配置
```javascript
// webpack.conifg.js
module.exports = merge(common, {
  mode: "development", // 开发模式
  devtool: "eval-cheap-module-source-map", // sourcemap
  devServer: {
    open: true, // 编译完自动打开浏览器
    hot: true, // 开启HMR热更新
    port: 8081, // 端口
    proxy: { // proxy 配置
      '/api': {
        target: 'http://127.0.0.1/',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      }
    }
  }
});
```

## 资源模块(asset module)
资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

### 资源模块类型(asset module type)和对应 loader 关系
|资源模块类型|资源模块类型描述|对应替换loader|loader描述|
|-|-|-|-|
|asset/resource|发送一个单独的文件并导出 URL|file-loader|将文件发送到输出目录|
|asset/inline|导出一个资源的 data URI|url-loader|将文件作为 data URI 内联到 bundle 中|
|asset/source|导出资源的源代码|raw-loader|将文件导入为字符串|
|asset|在导出一个 data URI 和发送一个单独的文件之间自动选择，默认8kb|url-loader|支持配置资源体积限制实现|

## 可替换模板字符串(substitution)
webpack 提供了一种称为 可替换模板字符串（substitution） 的方式，通过带括号字符串来模板化文件名。
- [template-strings](https://webpack.docschina.org/configuration/output/#template-strings)

### 常见 substitution 
> chunk 层面

|模版|描述|
|-|-|
|[id]|	此 chunk 的 ID|
|[name]|	如果设置，则为此 chunk 的名称，否则使用 chunk 的 ID|
|[chunkhash]|	此 chunk 的 hash 值，包含该 chunk 的所有元素|
|[contenthash]|	此 chunk 的 hash 值，只包括该内容类型的元素（受 optimization.realContentHash 影响）|

## 常用 loader
- style-loader
    > 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- css-loader
    > 加载 CSS，支持模块化、压缩、文件导入等特性
- less-loader
    > 处理less
- sass-loader
    > 处理sass
- autoprefixer-loader
    > 处理CSS3属性前缀，已被弃用，建议直接使用 postcss
- postcss-loader
    > 用postcss来处理CSS
- file-loader 
    > 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader
    > 和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader
    > 加载额外的 Source Map 文件，以方便断点调试
- image-loader
    > 加载并且压缩图片文件
- html-minify-loader
    > 压缩HTML
- babel-loader
    > 把 ES6 转换成 ES5
- eslint-loader
    > 通过 ESLint 检查 JavaScript 代码
- csv-loader
    > 处理csv
- xml-loader
    > 处理xml

## 常用 plugin
- html-webpack-plugin
    > 创建了一个全新的index.html文件，并且所有捆绑包都会自动添加上去。
- copy-webpack-plugin
    > 拷贝目录文件。比如模版html有直接关联了一些图标静态文件，还有爬虫说明文件，都可以通过该插件直接移动到打包目录。
- define-plugin
    > 定义环境变量
- uglifyjs-webpack-plugin
    > 通过UglifyES压缩ES6代码
- webpack-parallel-uglify-plugin
    > 多核压缩,提高压缩速度
- webpack-bundle-analyzer
    > 可视化webpack输出文件的体积
- mini-css-extract-plugin
    > CSS提取到单独的文件中,支持按需加载
- css-minimizer-webpack-plugin
    > 这个插件使用 cssnano 优化和压缩 CSS。
- terser-webpack-plugin
    > 该插件使用 terser 来压缩 JavaScript
- [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)
    > dotenv-webpack 包裹dotenv和Webpack.DefinePlugin。因此，它会在生成的包中对 的任何实例进行文本替换process.env。
- [dotenv](https://github.com/motdotla/dotenv)
    > dotenv-webpack 将 环境变量注入给应用，单独使用 dotenv 可以将环境变量赋值给process.env，在当前脚本执行期间。可以用在打包阶段

## Webpack 构建过程

## Webpack 热更新(HRM)原理
- Webpack Complie
- Bundle Server
- bundle.js
- HMR Server
- HMR Runtime

!["webpakc-1"](/img/docs/webpack/webpack-1.png "webpack-1")

## 移动端CSS px 自动转换 rem
解决媒体查询处理移动端适配的多套代码配置问题
- px2rem 库
- flexiable 自动计算获取 font-size

## Bebal 总结
[Babel 是一个帮助您使用最新版本的 JavaScript 编写代码的工具。当您支持的环境本身不支持某些功能时，Babel 将帮助您将这些功能编译为支持的版本。](https://github.com/babel/babel)
- [Babel](https://babeljs.io/)

### Bebal 作用
1. 转换语法: 转换 ES6+ 语法为低版本 ES 语法。
2. 提供 Polyfill 功能: 为新的 ES 特性提供高兼容性实现(比如Iterator、Generator、Set、Maps、Proxy、 Reflect、Symbol、Promise 等全局对象，以及一些方法比如 Array.form)。
3. 源代码转换（codemods）: 对源码进行批量转换，提高兼容性。

### 如何使用 Bebal
1. 基础 Bebal 功能需要引入 bebal-loader、@babel/core 以及 @babel/present-env 等三个预设库，并在 Webpack 进行配置。
2. Polyfill 功能需要引入 @babel/plugin-transform-runtime、@babel/runtime-corejs3。 
3. 并在 Webpack 中配置。

### 关于 @babel/present-env 和 @babel/plugin-transform-runtime 在 Polyfill 功能上区别 
- [吃一堑长一智系列: 99% 开发者没弄明白的 babel 知识](https://zhuanlan.zhihu.com/p/361874935)

@babel/present-env 可以通过 useBuiltIns、corejs 参数开启 Polyfill 功能。

通过 @babel/plugin-transform-runtime 插件实现的 polyfill 是不会影响全局的，所以更适合 Library 作者使用。业务开发者使用 @babel/preset-env 的 Polyfill 功能即可。

### 常用 Bebal 库
|库名|描述|
|-|-|
|babel-loader|bebal loader启动bebal处理 |
|@babel/core|Babel 的核心转码包，babel-loader依赖引入|
|@babel/plugin-transform-runtime|提供 ES6+ 的 api，如 es6 新的数组方法等，和 @babel/polyfill 不同的是该包可以实现按需加载，不会全部引入影响打包速度。需要依赖 runtime-corejs |
|@babel/runtime-corejs3|提供 Polyfill 功能，在 7.4.0 版本后的 babel 使用 runtime-core 代替了 babel/polyfill。|
|@babel/preset-env|使用最新的 JavaScript，支持目标环境所需的语法转换。|
|@babel/preset-react|提供 React 的语法转换支持 |
|@babel/preset-typescript|提供 TypeScript 的语法转换支持|

## 自动生成HTML模版功能
1. copy-webpack-plugin 移动预先的静态资源到打包文件夹
2. html-webpack-plugin 通过index.html模版生成新的index.html。
3. 并通过 webpack配置js文件 传入业务性的环境变量

### 插件
- html-webpack-plugin
- copy-webpack-plugin

### 案例
通过html模版自动生成处理后的html，通过会自动将输出JS作为关联到模版上，并支持变量传递，`<%= htmlWebpackPlugin.options.publicPath %>` 传递 publicPath 参数。
```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'),
                    to: path.resolve(__dirname, '../dist'),
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'React APP', // 标题
            publicPath: './', // 应用访问地址
            favicon: path.resolve(__dirname, '../public/favicon.ico'), // 网站图标
            template: path.resolve(__dirname, "../public/index.html"), // 自定义模板
        }),
    ],
 };
```

## manifest映射功能 
webpack 通过 manifest 追踪所有模块到输出的 bundle 之间的映射。可以通过 webpack-manifest-plugin 插件获取最终的 manifest 映射关系。

### 插件
- webpack-manifest-plugin

### 案例
```js
// webpack.config.js
const path = require('path');
const WebpackManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: formatEnvConifg(envConfig, 'process.env.REACT_APP_PUBLIC_URL')
        })
    ],
 };
```

## 业务环境变量注入方案
我们平时学习 Webpack，所了解的 development、production 的概念都是属于一种模式，webpack在不同模式下有不同的优化处理。

而在实际开发环境中通常有多套业务环境的需求，比如有三套环境，dev、sit、prod，这三套环境的访问地址不同，接口地址不同，加解密日志打印要求都不同。将配置进行代码继承明显增加了耦合和改动的风险，而且大多在打包阶段就需要使用到对应的配置。

所以为了解决这个问题，可以使用 dotenv、dotenv-webpack 分别处理打包准备和打包这两个阶段的环境变量注入。另外在脚本执行时 通过 cross-env 指定初始化的环境变量，可以确定具体使用哪一套业务环境变量。

1. 初始化业务环境变量: 设置运行、打包脚本，通过 cross-env 传入约定的业务环境变量。
    - 规范
        - 指定业务环境变量名 `APP_ENV`
        - 指定业务环境变量文件 `.env.${process.env.APP_ENV}`
    - 业务环境变量文件模版
        > 变量名前缀为 `APP`，也可以根据自己工程要求进行配置。
    ```
    APP_ENV=dev
    APP_PUBLIC_URL=./
    APP_BASE_URL_PROXY=https://jsonplaceholder.typicode.com
    ```
    - 脚本
    ```json
    {
        "dev": "cross-env NODE_ENV=development APP_ENV=dev webpack serve --config webpack/webpack.dev.js",
        "build": "cross-env NODE_ENV=production APP_ENV=prod webpack --config webpack/webpack.prod.js",
    }
    ```
2. 打包准备阶段: dotenv 通过指定文件名，配置业务环境变量。webpack 的 js 可以获取 process.env 环境变量。
```js
// 配置业务环境变量
require('dotenv').config({
  path: `.env.${process.env.APP_ENV}`
})
```
3. 打包阶段: dotenv-webpack 通过指定文件名，配置业务环境变量。webpack 打包后文件已经处理得到 process.env 环境变量。 
```js
// webpack.config.js
const Dotenv = require('dotenv-webpack')

module.exports = {
    plugins: [
        new Dotenv({
            path: `.env.${process.env.APP_ENV}`
        }), 
    ],
 };
```

## 源代码压缩
1. 使用 terser-webpack-plugin 进行JS代码压缩
2. 使用 css-minimizer-webpack-plugin 进行CSS代码压缩

### 插件
- terser-webpack-plugin
- css-minimizer-webpack-plugin 

### 案例
```js
// webpack.config.js
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    optimization: {
        minimize: true, // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle
        minimizer: [
            // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin({
                // 默认开启
                // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
            }),
            new TerserPlugin({
                terserOptions: {
                    // 压缩配置
                    compress: {
                        drop_console: false, // 去除 console
                        drop_debugger: true, // 去除 debugger
                        pure_funcs: ['console.log'] // 移除指定函数
                    },
                    // 匹配处理
                    format: {
                        comments: false, // 去除所有注释
                    },
                },
                extractComments: false, // 是否将注释剥离到单独的文件中
            }),
        ],
    }
 };
```

## CSS 代码拆分
通常在打包模式下才使用 mini-css-extract-plugin。默认使用 style-loader。因为 mini-css-extract-plugin 插件不支持热更新。

CSS代码拆分分为了两部分
1. 对 css 资源的处理
    1. 生产环境使用 mini-css-extract-plugin.loader。
    2. 开发环境使用 style-loader 
2. 插件 mini-css-extract-plugin 的配置。

### 插件
- mini-css-extract-plugin 

### 案例
```js
// webpack.config.js
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader, // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                            // 也包括会自动帮助我们添加 autoprefixer
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "less-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css", // 将css单独提测出来放在assets/css 下
        }),
    ],
 };
```

## CSS 兼容性
1. 采用 postcss-loader 进行 CSS 兼容性的设置
2. 同时还需要设置 package.json 的 browserslist 参数作为目标环境以供 postcss-loader处理。

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader, // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                            // 也包括会自动帮助我们添加 autoprefixer
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "less-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
        ],
    }
 };
```
```js
// package.json
{
    "browserslist": {
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ],
        "development": [
            "defaults",
            "not ie < 11",
            "last 2 versions",
            "> 1%",
            "iOS 9",
            "last 3 iOS versions"
        ]
    }
}
```

## source-map 的作用
devtool参数可以配置具体source-map，source-map的作用主要作用就是将经过压缩、混淆、合并的产物代码还原回未打包的原始形态,帮助开发者在生产环境中精确定位问题发生的行列位置。
- [devtool](https://webpack.docschina.org/configuration/devtool)

- 生产不推荐配置 source-map 
- 开发环境推荐配置 `devtool: "eval-cheap-module-source-map"`


## Tree Shaking
可以帮我们检测模块中没有用到的那块代码，并在 Webpack 打包时将没有使用到的代码块移除，减小打包后的资源体积。Webpack 5 默认是开启的。

它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块捆绑器 rollup 普及起来的。

## webpack 推荐配置管理方式
webpack 的配置文件是 JavaScript 文件，文件内导出了一个 webpack 配置的对象。
- [生产环境(webpack)](https://webpack.docschina.org/guides/production/#setup)

推荐按照 Webpack 模式进行分类，Webpack 主要有两种模式 development、production。可以抽成公共部分,通过 webpack-merge 进行配置合并，并在命令执行时作为 --config 参数进行配置传入指定不同的模式。
- webpack.common.js 公共配置
- webpack.dev.js 开发模式
- webpack.prod.js 生产模式

## Create-React-App 和 Webpack的区别
Create-React-App 通过 react-script 库对 Webpack 的配置进行了集成处理，react-dev-util 库还提供了针对 React 工程的一些优化插件。


## Webpack5 配置 CSS 模块化
- [webpack-contrib/css-loader/modules](https://github.com/webpack-contrib/css-loader?tab=readme-ov-file#modules)
    > 关于 css-loader 的配置项介绍。这里索引了css-loader的模块化配置介绍。
- [webpack-contrib/css-loader/modules/localidentname](https://github.com/webpack-contrib/css-loader?tab=readme-ov-file#localidentname)
    > css-loader 模块化配置参数localidentname介绍。 

### 配置思路
- 主要是设置css-loader的模块化配置。开发和生产模式配置不同。
- 同时需要设置对应的TS声明文件，通过TS检查。

### 配置分析
- TS声明文件
```typescript
// cssModule.d.ts

// 支持 less、sass 时需要增加对应的声明配置
declare module "*.module.less";
declare module "*.module.css";
```
- css-loader 配置
    > 主要配置 modules 参数，简单点的情况设置auto、localIdentName参数即可。
```javascript
{
    loader: "css-loader",
    options: {
        // modules 模块化配置 
        modules: {
            // auto 允许根据文件名自动启用 CSS 模块/ICSS modules
            auto: true,
            // localIdentName 允许配置生成的本地身份名称
            // 模版字符串说明
                // [name]资源的基本名称
                // [local]- 原始类
                // [hash]- 字符串的哈希值
                // [path]compiler.context资源相对于选项或选项的路径
            // 开发模式官方推荐    
            localIdentName: "[path][name]__[local]",
            // 生产模式官方推荐
            // localIdentName: "[hash:base64]"
        }
    }
},
```

### 配置实例
```javascript
// webpack.dev.js 开发
module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader", // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[path][name]__[local]"
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                            // 也包括会自动帮助我们添加 autoprefixer
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "less-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
        ],
    }
 };
```
```javascript
// webpack.prod.js 生产
module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader, // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: "[hash:base64]"
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                            // 也包括会自动帮助我们添加 autoprefixer
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            },
                        },
                    },
                    "less-loader",
                ],
                // 排除 node_modules 目录
                exclude: /node_modules/,
            },
        ],
    }
 };
```