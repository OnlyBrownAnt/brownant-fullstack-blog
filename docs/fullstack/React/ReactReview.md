# React 总结

React 相关的知识点，以及常见的解决方案总结。

## Docs

- [react(zh)](https://zh-hans.react.dev/)
- [react](https://react.dev/)
- [react-learn](https://react.dev/learn/describing-the-ui)
- [react-reference](https://react.dev/reference/react)
- [react-chrome-plugin](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related?hl=en)
- [react-installation](https://react.dev/learn/installation)
- [whats-a-jsx-transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)
  > react blog
- [react-lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [react/v16](https://legacy.reactjs.org/blog/2017/09/26/react-v16.0.html)
  > React v16 的官方说明文档
- [react/hooks-intro](https://legacy.reactjs.org/docs/hooks-intro.html)
  > React 的 Hooks 指导文档(旧版本)
- [react/CHANGELOG.md](https://github.com/facebook/react/blob/main/CHANGELOG.md#1680-february-6-2019)
  > react 版本变更文档，了解各个版本更新了什么内容，以及修复问题。在老项目下开发时，也需要注意别用到不支持的过新的特性。
## React 生态

### Web 生态文档

- [MDN Web(mozilla)](https://developer.mozilla.org/zh-CN/)

### React 脚手架

- [create-react-app](https://github.com/facebook/create-react-app)
- [next.js](https://nextjs.org/docs/getting-started/installation)
- [remix](https://remix.run/)
- [gatsbyjs](https://www.gatsbyjs.com/)
- [umijs](https://v3.umijs.org/zh-CN/docs)
  > 阿里蚂蚁金服开源的 React 企业级框架，相对于 Next.js 更偏向于业务性的高度集成化。

## React 组件库

- [material-ui](https://github.com/mui/material-ui)
- [ant.design](https://ant.design/index-cn)
  > 阿里蚂蚁金服企业级 UI 设计语言和 React UI 库
- [procomponents](https://procomponents.ant.design/docs/intro)
  > ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。React UI 库
- [ant-design-pro](https://github.com/ant-design/ant-design-pro)
  > 阿里蚂蚁金服开箱即用的中台前端/设计解决方案

## 常见解决方案

### React 异常捕获和处理方案

- [MDN/Window: unhandledrejection event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)
- [MDN/Window: error event](https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [react/error-boundaries](https://legacy.reactjs.org/docs/error-boundaries.html)
- [全网最详细的React异常捕获及处理机制](https://github.com/lizuncong/mini-react/issues/19)
- [JS异常捕获基础](https://github.com/lizuncong/mini-react/blob/master/docs/%E5%BC%82%E5%B8%B8/JS%E5%BC%82%E5%B8%B8%E6%8D%95%E8%8E%B7%E5%9F%BA%E7%A1%80.md)
- [面试官：说说你在React项目是如何捕获错误的？](https://vue3js.cn/interview/React/capture%20error.html#%E9%9D%A2%E8%AF%95%E5%AE%98-%E8%AF%B4%E8%AF%B4%E4%BD%A0%E5%9C%A8react%E9%A1%B9%E7%9B%AE%E6%98%AF%E5%A6%82%E4%BD%95%E6%8D%95%E8%8E%B7%E9%94%99%E8%AF%AF%E7%9A%84)

#### 错误边界(error-boundaries)不会捕获以下错误

- 事件处理程序
- 异步代码（例如setTimeout回调requestAnimationFrame）
- 服务端渲染
- 错误边界本身（而不是其子级）抛出的错误

#### 具体异常处理方式

- try catch
  - 局部区域代码的异常
  - 同步代码、异步代码都支持。
- error-boundaries(错误边界)
  - React 官方支持的一种 React 组件错误捕获方式。
  - 但是只支持捕获 React 组件。
  - 包裹 App 根结点组件时就支持全局 React 组件异常的捕获。
- error event
  - 全局异常捕获
  - 主要捕获同步错误，无法捕获异步错误(例如 Promise、setTimeout、事件处理程序等)
- unhandledrejection event
  - 全局异常捕获
  - 是对 error event 的功能补充。
  - 支持捕获异步错误(例如 Promise、setTimeout、事件处理程序等)

#### 异常处理实例

- [webpack-react-cli](https://github.com/OnlyBrownAnt/webpack-react-cli)

### useEffect 内异步代码写法推荐(官方)

- [react/useEffect](https://react.dev/reference/react/useEffect)

```javascript
useEffect(() => {
  async function startFetching() {
    const json = await fetchTodos();
  }

  startFetching();
}, []);
```
