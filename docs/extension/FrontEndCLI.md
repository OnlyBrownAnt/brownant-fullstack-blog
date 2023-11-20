# 前端开发框架搭建总结

## 前端脚手架功能总结
### 基础功能
#### 脚手架打包工具
1. Webpack(CRA、VueCLI)
2. Vite
#### 状态管理
1. 状态缓存
2. 状态清理
#### 路由管理
1. 路由跳转
2. 路由缓存
3. 路由跳转拦截处理
#### 网络请求
1. 网络请求API业务封装(参数传入、报文组装、报文解析)
2. 支持API的默认场景错误码、特殊场景错误码、所有场景错误码捕获和处理
3. API支持取消(路由跳转场景、API取消场景)
4. 网络请求加解密方案(密钥交换处理、固定的双密钥加解密)
#### 错误捕获
1. 组件异常拦截
2. 网路请求异常拦截
3. 异常拦截和上送
#### 多环境配置
1. 依赖于脚手架工具(webpack、vite)
2. 最好是作为参数配置文件进行配置化
#### 请求代理配置
1. 依赖于脚手架工具(webpack、vite)

### 扩展功能
#### 首屏加载优化
#### 初始化CSS方案
#### 主题样式配置
#### 权限管理配置
#### 多语言配置
#### TypeScript集成
#### 脚手架打包配置
1. 兼容配置
2. 代码混淆
3. 代码切割
#### UI组件库
1. Material UI
    
    (Material-UI 是一个基于Google的Material Design 设计语言的React UI组件库)

## 前端脚手架功能实践-React
### 基础功能
#### 脚手架打包工具
1. Webpack(CRA、VueCLI)
2. Vite

```
CRA FaceBook的开发脚手架，基于Webpack

script: npx create-react-app project-name
```
#### 状态管理
1. 状态缓存
2. 状态清理

```
状态管理方案
1. useState + useReducer
2. createContext + \<SomeContext.Provider\>+ useContext
3. Redux + Redux ToolKit
```
#### 路由管理
```text
React-Router.js
```
1. 路由跳转
2. 路由缓存
3. 路由跳转拦截处理

#### 网络请求
```text
Axios 参考@umijs/max自定义Hooks
umijs基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。

axiox 用于请求的发起和拦截以及异常抛出处理。
useRequest 用于管理异步数据请求。

其实基于axiox封装一套请求拦截逻辑即可。以及错误处理逻辑。useRequest只是可以在调用者层进行操作时可以有扩展性，比如快捷的防抖、缓存、SWR等处理。
```
- [async(ahooks)](https://ahooks-v2.surge.sh/hooks/async)
- [请求(umijs)](https://umijs.org/docs/max/request#request)


1. 网络请求API业务封装(参数传入、报文组装、报文解析)
2. 场景错误码拦截: 支持API的默认场景错误码、特殊场景错误码、所有场景错误码捕获和处理
3. API支持取消(路由跳转场景、API取消场景)
4. 网络请求加解密方案(密钥交换处理、固定的双密钥加解密)

#### 错误捕获
```text
https://github.com/lizuncong/mini-react/issues/19
https://developer.aliyun.com/article/1249510
待定
``` 
1. 组件异常拦截
2. 网路请求异常拦截
3. 异常拦截和上送

#### 多环境配置
```text
Webpack支持 '.env.'、'.env.local'等配置文件获取Node参数
CRA本质还是以webpack作为基础进行配置的。
```  
- [adding-custom-environment-variables(CRA)](https://create-react-app.dev/docs/adding-custom-environment-variables)
1. 依赖于脚手架工具(webpack、vite)
2. 最好是作为参数配置文件进行配置化
- 请求代理配置
```text
需求
1. 支持请求地址配置
2. 支持多种请求路径匹配截取处理

- [configuring-the-proxy-manually(CRA)](https://create-react-app.dev/docs/proxying-api-requests-in-development#configuring-the-proxy-manually)
1. CRA支持代理
package.json增加proxy字段，但是只支持请求地址设置，不支持匹配路径匹配截取处理。
2. 使用http-proxy-middleware库设置代理
新增src/setupProxy.js
``` 
```javascript
// src/setupProxy.js
// 增加/api代理，并做路径匹配处理
// 推荐使用require方式引入，import引入时会导致网页服务访问被拒绝。
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
            pathRewrite: {'^/api' : ''}
        })
    );
};
```
1. 依赖于脚手架工具(webpack、vite)

### 扩展功能
#### 首屏加载优化
#### 初始化CSS方案
#### 主题样式配置
1. 基于CSS Variable的动态主题。
    
    参考Ant Design Pro的主题配置方案，修改顶层CSS Variable。参考链接 [动态主题(Ant Design Pro)](https://pro.ant.design/zh-CN/docs/dynamic-theme)
    
    - [Using CSS custom properties (variables)(MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

2. 封装ThemeProvider方式(例如 material-ui的@mui/material/styles)。
    
    material-ui的Emotion style引擎提供了ThemeProvider组件和createTheme、useTheme来获取主题的变量。本质上是对SomeContext.Provider和createContext、useContext的高度集成封装。

    material-ui的Emotion style引擎还提供了styled组件快速使用主题的变量。(封装的一套类似
    styled-components的工具)
    
    material-ui定义了常用主题变量参数(包括背景颜色、字体、间距、透明度等等)。允许进行动态修改。
    参考material-ui的主题配置方案，组件需要按照规则进行细致的定制化处理。
3. styled-components
    
    其实也是封装ThemeProvider组件，对ThemeProvider进行封装处理。不过是一种公共的解决方案，可以自定义具体的规则。

    material-ui也支持将styled-components替代自己默认的styled components引擎。(2021年，兼容性不好)

- 参考文档
    - [个人实践几种React在线主题切换方案(掘金)](https://juejin.cn/post/7003315163625422879)
    - [styled-components](https://styled-components.com/docs/basics#getting-started)

方式2相对于方式1更麻烦，对于第三方组件需要组件进行深度定制化。但是主题兼容性更强，可配置内容也更多了。

推荐方式3，由于material-ui对styled-components的兼容性不好，所以自己中间增加一层兼容层，这样可以对多个UI库进行更兼容式的定制化。而且方便React-Native的开发。

1. styled-components会自动合并样式，然后自动生成className以供组件使用
2. 支持attrs修改组件的属性，style也是属于样式。不过对于样式还是推荐class方式进行修改。


- 主题化思路
1. 定义一个公共ThemeProvider组件适配器，其中包含了styled-components的ThemeProvider组件和各家的UI组件ThemeProvider组件，(比如 material-ui)。然后各家的UI组件的主题变量和styled-components的主题变量存在映射关系。从而实现适配关系。
2. 适配性组件包裹最外层，用于传递主题变量
3. 默认的组件和各家的UI组件根据主题变量进行定制化
    1. styled-components的ThemeProvider组件传递主题变量。useContext可以获取ThemeContext的数据，而styled也支持props中读取Theme。
    2. material-ui的ThemeProvider组件传递主题变量，useTheme可以获取变量进行定制化。 


需要提供定义主题规则、主题初始化数据、修改主题的方法

- 初步封装

直接将主题作为最外面一层，主题和布局同在一个层次，因为切换主题的按钮可能是独立的，也可能在框架布局里。

- [Toggling color mode(material-ui)](https://mui.com/material-ui/customization/dark-mode/)

参考material-ui设计一套全局Theme，支持自定义局部UI库的映射关系。

#### 权限管理配置
#### 多语言配置
#### TypeScript集成
#### 脚手架打包配置
1. 兼容配置
2. 代码混淆
3. 代码切割