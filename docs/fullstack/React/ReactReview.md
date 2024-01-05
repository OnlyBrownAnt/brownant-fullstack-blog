# React总结

## Introduction
React的知识点总结，以及实践技巧总结。

## Docs
- [react(zh)](https://zh-hans.react.dev/)

## Hooks 组件和 Class 组件的区别
- [hooks-intro](https://legacy.reactjs.org/docs/hooks-intro.html)
- [当谈论 React hook，我们究竟说的是什么？](https://www.upyun.com/tech/article/742/%E5%BD%93%E8%B0%88%E8%AE%BA%20React%20hook%EF%BC%8C%E6%88%91%E4%BB%AC%E7%A9%B6%E7%AB%9F%E8%AF%B4%E7%9A%84%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F.html)
- [React 函数式组件 vs 类组件](https://juejin.cn/post/7080888443865137188)
- [React的class组件及属性详解！](https://cloud.tencent.com/developer/article/1907198)
- [一文讲透 React Hooks 闭包陷阱](https://juejin.cn/post/7230819482012237861)
- [React Hooks 性能优化](https://juejin.cn/post/7076123870063198216)

### 区别总结
- Hooks 是一种用于替换 Class 组件的一种新的组件构建方式，目的是为了解决 Class 组件常见的复杂点，以及优化复杂组件开发方式。
- Class 采用 javascript class 以及 this 进行组件开发。只会实例化一次，之后组件状态就挂载在 this 上。每次使用状态时，如果是去 this 上取状态，那么得到的是最新的渲染结果，当然也可以采用闭包的方式。而且 React 提供一套生命周期钩子，用于在 React 进行渲染时触发对应生命周期钩子，让 class 实例进行相关操作。
- Hooks 是一种函数式的开发方式。每次 React 渲染都会执行 Hooks 函数，所以换句话而言 Hooks 都能获得 React 的每次的渲染结果"快照"。Hooks 可以从"快照"中获取状态，不需要像 Class 组件从 this 上获取状态，相对于 Class 组件而言，Hooks 就是一个闭包，一个函数里可以有多个 Hooks，这个函数被称为 Hooks 组件，每个 Hooks 闭包从渲染结果"快照"中使用当前"快照"的状态。

### Class 组件的问题
- 组件之间很难重用有状态逻辑
    - class 组件只会实例一次。如果有重用有状态逻辑的需求，需要 render props 和 higher-order components 来解决问题，提高了封装的复杂度。
- 复杂的组件变得难以理解
    - 复杂的 class 组件都需要设置生命周期钩子
    - 一些功能(设置订阅、获取数据等)的不同阶段，需要拆分到不同阶段的生命周期钩子进行处理。多个功能被迫实现了代码上的交叉分布。
- javascript class 和 this 的工作原理让人困惑 

### Hooks 组件的优缺点
#### 优点
- 解决和避免 Class 组件的复杂点(问题)
    - 重用有状态逻辑
    - 每个功能通过一个 Hooks 来实现，更利于维护。比如使用 useEffect()
    - 避免使用 class、this。通过闭包每次直接从"快照"获取状态。
#### 缺点
- 无法直接使用生命周期钩子，但是通过 useEffect() 变相实现生命周期钩子的效果。
- 无法直接使用 this，但是通过 useRef 变相实现 this 的一个效果。
- 性能上的问题
    - 由于 Hooks 组件渲染的逻辑就是每次 React 渲染就执行。相当于每次执行一批函数，所以如何让一些不需要执行的函数不去执行。React 提供了 useMemo、useCallBack 这类缓存Hooks，减少不必要的代码执行和计算。


## 常见问题和解决方案
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

### import React from 'react' 和 import * as React from 'react' 区别
- [ts下 import React from ‘react’ 和import * as React from 'react'的区别](https://juejin.cn/post/7000930676488798216)
