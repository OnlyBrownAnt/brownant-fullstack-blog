# Redux 总结

## Docs

- [redux/quick-start](https://redux.js.org/tutorials/quick-start)
- [redux/quick-start(zh)](https://www.reduxjs.cn/tutorials/quick-start/)
- [Redux Toolkit TypeScript 快速开始](https://www.reduxjs.cn/tutorials/typescript-quick-start)
- [Redux 深入浅出，第 8 节：使用 Redux Toolkit 的现代 Redux](https://www.reduxjs.cn/tutorials/fundamentals/part-8-modern-redux#%E4%BD%BF%E7%94%A8-configurestore)
- [react-redux](https://cn.react-redux.js.org/)
- [react-redux/hooks](https://cn.react-redux.js.org/api/hooks)
- [面试题/redux](https://fe.ecool.fun/search?keyword=redux)
- [Redux 面试题](https://www.cnblogs.com/gqx-html/p/17368876.html)

## Redux 概念基础

### Redux 是什么

- Redux 是个单例式的状态管理工具。
- Redux 通常与 React-Redux 库一起使用，把 Redux 和 React 集成在一起。
- Redux Toolkit 是编写 Redux 逻辑的推荐方式。

### Redux 三个原则

- 全局应用状态保存在单个 store 中
- store 中的 state 是只读的
- Reducer 函数用于更新状态以响应 actions

### Redux 使用“单向数据流”

- State 描述了应用程序在某个时间点的状态，UI 基于该状态渲染
- 当应用程序中发生某些事情时：
  - UI dispatch 一个 action
  - store 调用 reducer，随后根据发生的事情来更新 state
  - store 通知 UI state 发生了变化
- UI 基于新 state 重新渲染

### Redux Middleware 中间件是什么

middleware 中间件的定义是在框架的流程中间步骤增加增加额外的功能处理。

redux middleware 它在 dispatch action 的时候和 action 到达 reducer 那一刻之间提供了三方的逻辑拓展点。可以使用 Redux middleware 进行日志记录、故障监控上报、与异步 API 通信、路由等。

所以可以理解 redux middleware 对 redux 的功能进行了一个增强作用。通常使用 redux 库的`applyMiddleware(...middleware)`方法来添加中间件，注意中间件添加也有顺序要求。

### React 项目如何使用 Redux

通常而言，React 不直接使用 Redux 的 API。而是使用 React Redux 这个库。

React Redux 是 Redux 的官方 React UI 绑定库。它使得你的 React 组件能够从 Redux store 中读取到数据，并且你可以通过dispatch actions去更新 store 中的 state。

### React Redux 中 connect() API 和 Hooks 式 API 的区别

两者的作用都是访问和操作 Redux store 中的数据，并以此实现 UI 上的状态更新。

不过官方推荐 Hooks 式 API 方式进行开发，可以与 React 官方的 Hooks 生态接壤。Hooks 开发方式也更清晰简单。

## Redux 安装依赖

> 适用于 React 项目

```shell
# Redux and React-Redux
npm install react-redux
# Redux ToolKit
npm install @reduxjs/toolkit
# TS 类型声明
npm install @types/react-redux
```

## Redux 用法总结

### Redux 基本用法

> 一般不会直接使用 Redux 的API，这里的介绍只是为了帮助熟悉 Redux 基本的使用概念。

1. 定义 reducer 编写 actions
   ```javascript
   // 创建一个“reducer”函数来确定应用程序中发生某些事情时的新状态
   function counterReducer(state = initialState, action) {
     // Reducers 通常会查看发生的action 的 type 来决定如何更新状态
     switch (action.type) {
       case "counter/incremented":
         return { ...state, value: state.value + 1 };
       case "counter/decremented":
         return { ...state, value: state.value - 1 };
       default:
         // 如果 reducer 不关心这个action type，原样返回现有状态
         return state;
     }
   }
   ```
2. createStore() 基于 reducer 创建 Redux store
   ```javascript
   // 通过 createStore 方法创建一个新的 Redux store，
   // 使用 counterReducer 进行更新逻辑
   const store = Redux.createStore(counterReducer);
   ```
3. Redux store API
   - getState()
     > 获取 store 数据
   - dispatch(action)
     > 执行动作，触发 state 变化
   - subscribe(listener)
     > 添加一个变化监听器。每当 dispatch action 的时候就会执行。
   - replaceReducer(nextReducer)
     > 替换 store 当前用来计算 state 的 reducer。
   ```javascript
   // Redux store API 综合案例
   // store 状态改变，通过读取最后一次的 store 状态并显示新数据进行更新 UI
   function render() {
     const state = store.getState();
     console.log(state);
     if (state.value == 0) {
       store.dispatch({ type: "counter/incremented" });
     }
   }
   // 进行订阅（subscribe），可以在将来数据变化时重绘
   store.subscribe(render);
   ```
4. Redux applyMiddleware API

   - applyMiddleware(...middleware)

     > 用于增加中间件，通常在创建 store 实例时进行处理

     ```javascript
     import { createStore, applyMiddleware } from "redux";
     import todos from "./reducers";

     function logger({ getState }) {
       return (next) => (action) => {
         console.log("will dispatch", action);

         // 调用 middleware 链中下一个 middleware 的 dispatch。
         const returnValue = next(action);

         console.log("state after dispatch", getState());

         // 一般会是 action 本身，除非
         // 后面的 middleware 修改了它。
         return returnValue;
       };
     }

     const store = createStore(todos, ["Use Redux"], applyMiddleware(logger));
     store.dispatch({
       type: "ADD_TODO",
       text: "Understand the middleware",
     });
     ```

### Redux-ToolKit 基本用法

1. createSlice() 创建 Redux 切片

   > 导出模块包括 reducer 和 actions
   >
   > - reducer 用于 创建 Redux stroe 实例时使用。
   > - actions 用于 dispatch 执行动作的时候使用。
   > - 同时允许不依赖createSlice()，而单独创建 actions 支持异步处理。但是注意创建独立的 action 时的写法，只能通过dispatch去更新状态。

   ```javascript
   import { createSlice } from "@reduxjs/toolkit";

   const postsSlice = createSlice({
     name: "posts",
     initialState: { value: 0 },
     reducers: {
       add: (state, action) => {
         state.id++;
       },
     },
   });
   // 导出 actions
   export const { add } = counterSlice.actions;

   // 导出 action (独立的action)
   export const addAsync = (param) => (dispatch) => {
     setTimeout(() => {
       dispatch(add(param));
     }, 3000);
   };

   // 导出 reducer
   export default postsSlice.reducer;
   ```

2. configureStore() 创建 Redux stroe 实例

   > 参数是 Redux 切片导出的 reducer
   >
   > 同时在创建实例的时候也支持添加自定义的中间件(要求包含默认中间件的情况)。

   ```javascript
   import { configureStore } from "@reduxjs/toolkit";

   import logger from "redux-logger";

   import rootReducer from "./reducer";

   const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware().concat(logger),
   });

   // Store 包含所有被添加进来的默认中间价，再 _加上_ logger 中间件
   ```

3. createAsyncThunk()
   > 生成一个 thunk 来替换 fetchTodos thunk。来自于 redux-thunk 中间件。
   >
   > 用于支持异步处理的 actions。

### React-Redux 基本用法

1. 创建 `<Provider>` 组件，并传入 Redux store 实例。
   > `<Provider>` 组件使 Redux store 可用于任何需要访问 Redux store 的嵌套组件。通过 React 的 Context 机制访问所提供的 store 实例。
2. React-Redux Hooks

   - useSelector()

     > 允许你使用一个 selector 函数从 Redux store state 中提取数据

     ```javascript
     import React from "react";
     import { useSelector } from "react-redux";

     export const CounterComponent = () => {
       const counter = useSelector((state) => state.counter);
       return <div>{counter}</div>;
     };
     ```

   - useDispatch()

     > 这个 hook 返回一个对 Redux store 中的 dispatch 函数的引用。你可以按需使用它来 dispatch action。

     ```javascript
     import React from "react";
     import { useDispatch } from "react-redux";

     export const CounterComponent = ({ value }) => {
       const dispatch = useDispatch();

       return (
         <div>
           <span>{value}</span>
           <button onClick={() => dispatch({ type: "increment-counter" })}>
             Increment counter
           </button>
         </div>
       );
     };
     ```

   - useStore()

     > 这个 hook 返回一个 Redux store 引用，该 store 与传递给 `<Provider>` 组件的 store 相同。
     >
     > 不推荐频繁使用，推荐 useSelector() 获取状态数据。

     ```javascript
     import React from "react";
     import { useStore } from "react-redux";

     export const CounterComponent = ({ value }) => {
       const store = useStore();

       // 仅仅是示例！不要在实际的应用中这么做。
       // 当 store state 变更时，组件不会自动更新
       return <div>{store.getState()}</div>;
     };
     ```

### Redux 使用总结

> > 适用于 React 项目

- [你学到了什么](https://www.reduxjs.cn/tutorials/quick-start/#%E4%BD%A0%E5%AD%A6%E5%88%B0%E4%BA%86%E4%BB%80%E4%B9%88)

- 使用`configureStore`创建 `Redux store`
  - `configureStore` 接受 reducer 函数作为命名参数
  - `configureStore` 使用的好用的默认设置自动设置 store
- 为 React 应用程序组件提供 `Redux store`
  - 使用 React-Redux `<Provider>` 组件包裹你的 `<App />`
  - 传递 Redux store 如 `<Provider store={store}>`
- 使用 `createSlice` 创建 Redux "slice" reducer
  - 使用字符串名称、初始状态和命名的 reducer 函数调用“createSlice”
  - Reducer 函数可以使用 Immer 来“改变”状态
  - 导出生成的 `slice reducer` 和 `action creators`
- 在 React 组件中使用 React-Redux `useSelector/useDispatch` 钩子
  - 使用 useSelector 钩子从 store 中读取数据
  - 使用 useDispatch 钩子获取 dispatch 函数，并根据需要 dispatch actions

## Redux 相关依赖库

### Redux 库和工具

- react-redux
- redux-toolkit
- redux-devtools-extension

### Redux Middleware 中间件

- redux-thunk
  > redux-toolkit 默认添加了该中间件。
- redux-promise
- redux-persist
  > 持久化存储
- redux-logger
  > actions 日志

## Redux 目录模版

参考VueX 的目录结构，支持模块划分。一个 store 实例配置文件加多个模块配置文件。

```
/store
    /store.ts store 实例配置文件
    /modules 综合模块文件夹
        /moduleName 单模块文件夹
            /slice.js 切片定义
        /moduleName
            /slice.js
```

## 常见问题总结

### Redux 如何处理异步数据

1. Redux-ToolKit createAsyncThunk() 定义异步thunk
2. 外部执行异步逻辑之后中处理同步的 redux actions，实现一个异步 actions 效果。
