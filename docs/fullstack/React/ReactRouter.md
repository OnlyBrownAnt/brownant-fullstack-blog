# ReactRouter V6 总结

这片文档内容内容无特殊说明情况下只涉及 React Router V6版本。

## Docs

- [react-router/tutorial](https://reactrouter.com/en/main/start/tutorial)
- [remix](https://remix.run/)
  > "Just a compiler and server for React-Router"。Remix 路由是基于react-router 构建的，方向是全栈路由(客户端、服务端)。另外我喜欢 remix 的官网交互效果。
- [通过 React Router V6 源码，掌握前端路由](https://mp.weixin.qq.com/s/3DxZ0UdH9CKOMzfAo_x0XQ)
- [4k字介绍 React Router 6.4 超大变化：引入 Data API。你不纯粹了！(腾讯云)](https://cloud.tencent.com/developer/article/2246023)
- [面试题/router](https://fe.ecool.fun/search?keyword=react-router)

## React Router 安装脚本

```shell
# 浏览器端
npm install react-router-dom --save
# Hybrid 端
# npm install react-router-native --save
```

## React Router 使用教程

> 教程使用的创建路由器方式指官网推荐的 createBrowserRouter，所以扩展中部分也是在此基础上进行选配的。

### 基础

1. 定义路由器和路由

   - 路由器 createBrowserRouter History模式 (官方推荐)
   - 路由 使用JS对象方式表示

   ```javascript
   import React from "react";
   import { createBrowserRouter, RouterProvider } from 'react-router-dom';

   import App from '@/App';
   import ReduxDemo from '@/pages/ReduxDemo/index';
   import Error404 from '@/pages/Error404';

   // step 1
   const router = createBrowserRouter([
       {
           path: "/",
           element: <App />,
           children: [
               {
                   path: "/redux-demo",
                   element: <ReduxDemo />,
                   children: [],
               },
           ],
       },
       {
           path: "*",
           element: <Error404 />,
           children: [],
       }
   ], { basename: '/' });
   // step 2
   const ReactRouterProvider: React.FC = () => {
       return (
           <RouterProvider router={router}/>
       )
   }

   export default ReactRouterProvider;
   ```

2. 定义顶层组件和路由器
   - 定义顶层组件 RouterProvider
3. 在 render 中使用集成了路由器的 RouterProvider 替换原 Root/App 组件
   ```javascript
   import * as React from 'react'
   import * as ReactDOM from 'react-dom/client'
   import ReactRouterProvider from './router/router'
   const root = ReactDOM.createRoot(document.getElementById('root')!)
   root.render(<ReactRouterProvider/>)
   ```
4. 在 Root/App 组件中增加 `<Outlet />` 的使用。
   > Root/App 组件通常对应根路径，其他的组件可以认为都是它的子路径(除了额外的 '\*' 路由 )。所以存在嵌套关系，要使用 `<Outlet />` 组件，否则路由跳转失败。
   ```javascript
   const App: React.FC = () => {
   return (<>
       <Link to="/" replace={true}>back home link</Link>
       <Outlet/>
   </>);
   }
   ```

### 扩展

- 页面跳转滚动位置处理
  - 记住滚动位置 ScrollRestoration
    > 注意在代码上要和根路径组件同级
    ```javascript
    // 两者同级并行
    <App/>
    <ScrollRestoration
        getKey={(location, matches) => {
            const paths = [];
            return paths.includes(location.pathname)
            ? // home and notifications restore by pathname
                location.pathname
            : // everything else by location like the browser
                location.key;
        }}
    />
    ```
  - 取消记住滚动位置
    - Link 组件参数 preventScrollReset={true} 可以支持路由跳转不记住滚动位置
    - 设置 ScrollRestoration 组件对指定路径进行返回不匹配的值。
- webpack 5 工程下每次调试网页刷新都出现 404 报错
  > Webpack 5 工程的 devServer 配置 historyApiFallback 参数。
  >
  > 现象是在 history 模式路由器下，默认每次 webpack-dev-server 更新资源都会导致页面 404。
  >
  > 因为在 SPA React 应用下，客户端路由是有 React 应用的 React Router 功能控制，history 模式下先到根路径才能访问到 React 应用，从而调用处理控制。生产部署时可以通过 Nginx 代理进行处理协助访问资源。
- 配置 404 路由
  - 路由配置中与根路径同级，使用路径 '\*' 进行捕获。
- 配置应用程序的基本名称
  > 适用于无法部署到域根目录而是子目录的情况。
  >
  > createBrowserRouter 的 basename 参数支持设置。

### 配置实例

- [webpack-react-cli](https://github.com/OnlyBrownAnt/webpack-react-cli)

## Router Hooks

### 常用 Hooks

- useRoutes()
- useLocation()
- useNavigate()
- useParams()

### 其他 Hooks

- useRouteError
- useLoaderData
- useActionData
- useSubmit
- useFetcher

## Router Components

### 常用组件

- `<Link />`
- `<NavLink />`
- `<Navigate />`
- `<Outlet />`
- `<Routes />`
- `<Route>`

### 其他组件

- `<Form />`

## 常见问题和解决方案

### 路由库的路由模式中 Hash 和 History 的区别

- [MDN/history API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

### useRoutes 和 `<Routes>` `<Route>` 区别

useRoutes 方法，功能上等同于 `<Routes>` 组件，useRoutes 能够依据“路由配置对象”和当前路由做匹配，然后按匹配规则渲染对应的“组件”

useReotes 所接受的对象等同于 JS数据化的`<Route>`

### RouterProvider 如何配置比较好

推荐 RouterProvider 包裹 App，根路径组件是App，其他所有路径都是其子路由，然后需要嵌套组件注意设置`<Outlet>`。

这样的好处是根路径组件 App 也能使用路由导航功能，在这里处理全局异常跳转相关的业务需求就更方便。

### 如何处理 React 组件外的路由跳转(网络请求登陆失效跳转登陆页)

- [react-router/issues/8264](https://github.com/remix-run/react-router/issues/8264)
  由于因为 UI 分片（React 的并发模式和悬念问题，它会与外部存储（如 ）不同步history）原因，官方不推荐在组件外进行React-Router路由跳转。

但是存在很多场景需要在 React 组件外今天跳转，比如网络请求拦截器发现登陆失效需要跳转首页或者登陆页面。

### 解决方案

1. React Router unstable_HistoryRouter
2. React 全局异常捕获 + redux + useEffect (推荐)
   > 通过抛出登陆状态异常并捕获处理，在 React 组件内修改 redux 状态，从而触发包含预定跳转路由逻辑的useEffect()
   >
   > [React 异常捕获和处理方案](./ReactReview#react-异常捕获和处理方案)

### React 路由拦截控制方案

1. loader 拦截 + 异常抛出 + errorElement 拦截 loader 和 action 异常公共错误页显示 + sessionStorge or localStorge 作为权限相关数据缓存。
2. 对 route 数据源进行处理，然后使用 useRoutes 使用 JavaScript 对象进行路由的动态定义。
   - [react-router v6 路由统一管理及路由拦截方案(csdn)](https://blog.csdn.net/u010059669/article/details/122359412)

### 路由变化过程中的全局加载 UI

1. 通过 useNavigation 得到 navigation 的 state 状态，loading 状态就表示路由处理未结束。
2. 通过 Suspense 组件来处理异步加载资源时页面显示。

### 如何记住滚动位置

- [reactrouter/scroll-restoration](https://reactrouter.com/en/main/components/scroll-restoration)

- 建议您在应用程序的根路径中渲染它
- 另外注意页面的高度是提前可计算的，如果包含图片的自动展开高度可能会导致计算失败。
- 建议采用key，如果一些路径需要特殊处理可以采用pathname
- 防止滚动重置 通过 Link 方式跳转 增加 preventScrollReset={true} 参数

- ScrollRestoration Component
  > 使用了浏览器的ScrollRestoration特性，history.scrollRestoration。还可以使用window.scrollTo来处理滚动。

1. 设置 ScrollRestoration
   > 用户可以在堆栈中多次导航到相同的 URL，并且每个条目都有自己的滚动位置来恢复。默认情况下，它使用浏览器默认行为的属性location.key。但是测试过程中发现key是会变动的，所以推荐使用pathname，而且自定义返回路径，使用具体条目的滚动。
   >
   > 默认会回到顶部
   >
   > 组件位置通常和Root Path组件同级别。

```js
<ScrollRestoration
  getKey={(location, matches) => {
    const paths = [];
    return paths.includes(location.pathname)
      ? // home and notifications restore by pathname
        location.pathname
      : // everything else by location like the browser
        location.key;
  }}
/>
```

2.  跳转时屏蔽组件默认的 scrollRestoration 效果
    有时候出现跳转滚动重置到顶部时，可以在 Link 等路由组件上增加 preventScrollReset={true} 属性。

### 如何使用重定向

1. use redirect in loaders and actions
   > redirect 支持在非 React 组件中使用

```js
const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return null;
};
```

2. useNavigate 的 option 属性下有 replace 属性
   > 但是只能在 React 组件中使用。使用数字就支持 go(-1) 等效果的使用。
3. Link 等路由组件都支持 replace 参数
   > 只能在 React 组件中使用。

### 如何看待 loader、action、errorElement

- [优雅的react router 6，你惊艳到我了](https://zhuanlan.zhihu.com/p/617617455)

首先阐述个人态度，我是不习惯于在路由配置中加入组件内部相关的请求资源处理，主要原因如下。

1. 路由配置属于公共配置，不该加入一些业务定制化组件的内容，不利于代码质量维护和解耦合处理。

介绍 loader、action、errorElement

- loader: 每个路由都可以定义一个 loader 函数，以便在渲染之前向路由元素提供数据。action 的返回可以是它的数据来源。
- action: action 是 loader 的“读取”的“写入”。加载顺序，action > loader。
- errorElement: 只拦截路由中 loader 和 action 发生的异常。

不过虽然不推荐 action 的使用。但是对于 loader 还是觉得有尝试的方向，比如页面的权限控制功能、页面跳转时拦截取消请求。后面持续观察三者搭配的可用性。

### react-router 如何进行错误捕获

- loader、action 的异常只支持 errorElement 捕获。ErrorBoundary 无法成功捕获。
- React 组件的错误可以使用 ErrorBoundary 进行捕获。
