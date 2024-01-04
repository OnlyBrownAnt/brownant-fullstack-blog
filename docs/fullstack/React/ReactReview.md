# React总结

## Introduction
React的知识点总结，以及实践技巧总结。

## Docs


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