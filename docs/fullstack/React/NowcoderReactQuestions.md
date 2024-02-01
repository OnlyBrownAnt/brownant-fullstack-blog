# 牛客网 React 专项练习笔记

## 在React中渲染列表应该使用哪种方法？

- JavaScript高级程序设计(第4版) P138-P154
- [Children(react.dev)](https://react.dev/reference/react/Children)

`map()`

## 在React组件中的JSX里，如果要添加类选择器，可以给DOM节点和组件添加()属性

- [Common components(react.dev)](https://react.dev/reference/react-dom/components/common)
- [These special React props are supported for all built-in components(react.dev)](https://react.dev/reference/react-dom/components/common#common-props)

className: 一个字符串。指定元素的 CSS 类名称

style：具有 CSS 样式的对象，例如 `{ fontWeight: 'bold', margin: 20 }`

## 在componentWillUnmount()中以下哪个操作是错误的

## 以下哪项对react-router-dom中组件分类是错误的

- [react-router-dom(Github)](https://github.com/remix-run/react-router#readme)
- [browser-router(react-router-dom)](https://reactrouter.com/en/main/router-components/browser-router)
- [quick-start(react-router-dom-v5)](https://v5.reactrouter.com/core/guides/quick-start)

(V5)通常使用的组件

- 三种路由器组件: 如BrowserRouter和HashRouter

- 路由匹配组件: Route和Switch 组件

- 导航组件: Link和NavLink 组件

- [index-routes(react-router-dom)](https://reactrouter.com/en/main/start/concepts#index-routes)

  > 索引路由。索引路由在父路由路径的父路由出口中渲染。不会再增加path。

- [Redirect(react-router-dom-v5)](https://reactrouter.com/en/main/fetch/redirect)

  > 将导航到新位置。新位置将覆盖历史堆栈中的当前位置，就像服务器端重定向 (HTTP 3xx) 所做的那样。

- from

  > 要重定向的路径名。任何可以理解的有效 URL 路径path-to-regexp@^1.7.0。所有匹配的 URL 参数都提供给 中的模式to。必须包含 中使用的所有参数to。未使用的其他参数to将被忽略。

通配符的规则描述

- \*匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。(贪婪模式和非贪婪模式：贪婪模式在整个表达式匹配成功的前提下，尽可能多的匹配，而非贪婪模式在整个表达式匹配成功的前提下，尽可能少的匹配。)
- “()”： ()表示URL的这个部分是可选的。
- “:paramName”： 匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出
- “:paramName”： 匹配URL的一个部分，直到遇到下一个/、?、#为止。这个路径参数可以通过this.props.params.paramName取出

## 以下不属于React支持的键盘事件的是

- [keydown_event(mozilla)](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
- [Common components(react.dev)](https://react.dev/reference/react-dom/components/common)

支持的事件

- onKeyDown
- onKeyPress
- onKeyUp

## 在函数组件中使用哪个Hook可以包裹副作用（改变 DOM、添加订阅、设置定时器、记录日志等）

- [Built-in React Hooks(react.dev)](https://react.dev/reference/react)

- [React Hooks 入门教程(博客)](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)
  常用Hook

- [react hooks学习记录（官方hook、ahooks、自定义hook）(掘金)](https://juejin.cn/post/7090477289422454821)

- [hook函数之useEffect的使用——自定义hook函数网络请求——(CSDN)](https://blog.csdn.net/m0_46672781/article/details/127132838)

- useCallback

  > 让您在重新渲染之间缓存函数定义。

- useLayoutEffect

  > 在浏览器重新绘制屏幕之前触发的版本。

Hooks使用注意事项

1. 只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用；

2. 只能在React的函数组件或自定义的Hook中调用 Hook，不要在其他 JavaScript 函数中调用。

3. useCallback和useMemo之前的区别

   > useCallback在组件的顶层调用以在重新渲染之间缓存函数定义
   >
   > useMemo是一个 React Hook，可让您缓存重新渲染之间的计算结果。
   >
   > 一个是缓存函数定义，一个是缓存计算结果。避免高昂的计算和不必要的重复渲染

4. useLayoutEffect 和 useEffect 有什么区别

   > useLayoutEffect 要比 useEffect 更早的触发执行；useLayoutEffect 会阻塞浏览器渲染，切记执行同步的耗时操作。

   ## 下面是对refs使用不合适的是

- [useRef(react.dev)](https://react.dev/reference/react/useRef)

- 函数组件也支持直接写ref

  > React 创建 DOM 节点并将其放在屏幕上后，React 会将ref 对象的current属性设置为该 DOM 节点。

- 避免重新创建引用内容

  > React 会保存一次初始引用值，并在下一次渲染时忽略它。
  >
  > ref.current通常，渲染期间不允许写入或读取。然而，在这种情况下没关系，因为结果总是相同的，并且条件仅在初始化期间执行，因此它是完全可预测的。

- 设置自己的组件会向其中的 DOM 节点公开引用
  默认情况下，您自己的组件不会向其中的 DOM 节点公开引用。使用forwardRef包裹，父组件可以获得对它的引用。

适合使用refs的情况

1. 管理焦点，文本选择或媒体播放。
2. 触发强制动画。
3. 集成第三方 DOM 库

## 以下不属于StrictMode的作用或优点的是

- [StrictMode(react.dev)](https://react.dev/reference/react/StrictMode)

严格模式在开发中启用以下检查

> 所有这些检查仅限于开发，不会影响生产版本。严格模式可以对组件内的整个组件树进行额外的仅开发检查。这些检查可帮助您在开发过程的早期发现组件中的常见错误。

- 您的组件将重新渲染额外的时间来查找由不纯渲染引起的错误。
- 您的组件将重新运行 Effects 一段额外的时间，以查找因缺少 Effect 清理而导致的错误。
- 将检查您的组件是否使用了已弃用的 API。

区别特点

1. 与Fragment一样，一个组件返回多个元素。StrictMode不会渲染任何可见的UI。

2. 但是与Fragment不同的是，它为其后代元素触发额外的检查和警告。

   > (这两个解释看起来很抽象)

常用使用技巧

> 当抛出错误后，请使用static getDerivedStateFromError()渲染备用 UI ，使用componentDidCatch()打印错误信息。

## 以下哪个钩子可以使组件变成“错误边界”？

- [static getDerivedStateFromError(react.dev)](https://react.dev/reference/react/Component#static-getderivedstatefromerror)
- [componentDidCatch(react.dev)](https://react.dev/reference/react/Component#componentdidcatch)
- [catching-rendering-errors-with-an-error-boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

In the past, it was common to call setState inside componentDidCatch in order to update the UI and display the fallback error message. This is deprecated in favor of defining static getDerivedStateFromError.

componentDidCatchReact 的生产和开发版本在处理错误的方式上略有不同。

Implementing static getDerivedStateFromProps in a class component is equivalent to calling the set function from useState during rendering in a function component.

- static getDerivedStateFromError

1. 子组件错误捕获。当子组件（包括远处的子组件）在渲染过程中抛出错误时，React 将调用它。这使您可以显示错误消息而不是清除 UI。
2. 备用UI渲染工作。比如错误组件和弹窗的显示准备。

## 关于Context一下说法错误的是？

- [useContext(react.dev)](https://react.dev/reference/react/useContext)

Context的使用

1. createContext创建context
2. context通过provider传递数据。作为外层组件存在
3. 内部的所有组件都能通过useContext访问context

特点总结

- useContext返回调用组件的上下文值。它被确定为传递到树中value最靠近调用组件之上的组件。
- context虽然提高了数据的传递方便性，但是也增加了组件的耦合性，减少了复用效果。在设计的时候尽量提高context使用时的复用处理，在异常数据情况下保证正常显示效果，减少组件的耦合性。

## 以下关于Reducer的作用说法错误的是

> TODO ErrorTime: 1

- [useReducer(react.dev)](https://react.dev/reference/react/useReducer)

- useReducer在组件的顶层调用以使用Reducer管理其状态。

- 纯函数，通过旧数据的状态和动作来处理返回新的状态。

- 如果不需要做任何工作，它将返回以前的状态，而不是当前状态的浅拷贝

## class组件生命周期方法对应到函数组件和Hook，以下说法错误的是

> TODO ErrorTime: 1

- [react-lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [componentDidMount(react.dev)](https://react.dev/reference/react/Component#componentDidMount)
- [render(react.dev)](https://react.dev/reference/react-dom/render)
- [constructor(react.dev)](https://react.dev/reference/react/Component#constructor)
- [getSnapshotBeforeUpdate](https://react.dev/reference/react/Component#getsnapshotbeforeupdate)

For many use cases, defining componentDidMount, componentDidUpdate, and componentWillUnmount together in class components is equivalent to calling useEffect in function components. In the rare cases where it’s important for the code to run before browser paint, useLayoutEffect is a closer match.

- 生命周期
  三个阶段: Mounting、updating、unMounting

六个生命周期方法(常用):

1. componentDidMount、componentDidUpdate，componentWillUnmount
2. getDerivedStateFromProps、getSnapshotBeforeUpdate、shouldComponentUpdate

- 用useEffect Hoot替代常用Class生命周期componentDidMount，componentDidUpdate，componentWillUnmount
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法

易错点

1. 在组件更新时，componentDidUpdate不一定会被调用。因为生命周期中上面还有一层shouldComponentUpdate，如果返回为false就可以控制组件不更新。(有点钻字眼的感觉)

   ## 以下可以用来动态引入组件的是？

   > TODO ErrorTime: 1

- [Fragment(react.dev)](https://react.dev/reference/react/Fragment)
- [Suspense(react.dev)](https://react.dev/reference/react/Suspense)
- [lazy(react.dev)](https://react.dev/reference/react/lazy)
- [importing-and-exporting-components(react.dev)](https://react.dev/learn/importing-and-exporting-components)

React.lazy可以用于动态引入组件。

## 以下不属于React作者添加hook动机的是

> TODO ErrorTime: 1

- [hooks-intro(react.dev)](https://legacy.reactjs.org/docs/hooks-intro.html)

- 您可以在一些组件中尝试 Hook，而无需重写任何现有代码。但如果您不愿意，现在不必学习或使用 Hooks。

- 没有计划从 React 中删除类

- Hook 不会取代您对 React 概念的了解

- Hook是对HOC的替代。

## 从 DOM 中卸载组件，可以使用

- [unmountComponentAtNode(react.dev)](https://react.dev/reference/react-dom/unmountComponentAtNode)

ReactDOM.unmountComponentAtNode

> 调用unmountComponentAtNode以从 DOM 中删除已安装的 React 组件并清理其事件处理程序和状态。

- ReactDOM.unmountComponentAtNode，从DOM中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。
- 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
- 推荐用法: 从 DOM 元素中删除 React 应用程序

## 以下哪个选项不能作为Router组件的history属性值

- [create-browser-router(react-router-dom)](https://reactrouter.com/en/main/routers/create-browser-router)

Routers
Router Components
这两个模块内的API或者组件都可以用于创建History，提供Router功能。

react-router-v5: history属性，一共可以设置三种值:browserHistory、hashHistory和createMemoryHistory。

## 在Redux中，不属于store提供的方法的是

- [getting-started(redux)](https://redux.js.org/introduction/getting-started)
- [store-api(redux)](https://redux.js.org/api/api-reference#store-api)

Redux is a predictable state container for JavaScript apps

## 以下关于ReactDOM.findDOMNode说法错误的是

- [findDOMNode(react.dev)](https://react.dev/reference/react-dom/findDOMNode)

findDOMNode查找 React类组件实例的浏览器 DOM 节点。

- 在严格模式下，此方法已弃用。

## 关于“错误边界”，以下说法错误的是？

> TODO ErrorTime: 1
> like(以下哪个钩子可以使组件变成“错误边界”？)

## 以下关于ReactDOM.render说法错误的是

> TODO ErrorTime: 1

- [render(react.dev)](https://react.dev/reference/react-dom/render)

- 调用render以在浏览器 DOM 元素内显示 React 组件。所以每个容器都有render，渲染显示的是子组件的DOM元素。

- render将一段JSX（“React 节点”）渲染到浏览器 DOM 节点中。

- render通常会返回null. 但是，如果reactNode您传递的是类组件，那么它将返回该组件的实例

- 在 React 18 中，render被替换为createRoot. 在 React 18 中使用render会警告您的应用程序的行为就像运行 React 17 一样。在此处了解更多信息。

- render -> ReactDOM.render

- createElement -> React.createElement

## 以下关于useContext说法错误的是

> TODO ErrorTime: 1

like(关于Context一下说法错误的是？)

## 以下关于ref说法错误的是

> TODO ErrorTime: 1
> like(下面是对refs使用不合适的是)
> 题目存在问题，目前函数组件也支持写ref

## 要在下面代码中组件的props上进行类型检查，可以使用

- [propTypes](https://react.dev/reference/react/Component#static-proptypes)

常见static方法

- static childContextTypes

  > 将弃用，contextType来替代

- static contextTypes

  > 将弃用，contextType来替代

- static contextType

  > 如果您想this.context从类组件中读取数据，则必须指定它需要读取哪个上下文。您指定为 的上下文必须static contextType是 之前创建的值createContext。
  >
  > 在类组件中读取this.context与在函数组件中读取等效useContext。

- static defaultProps

  > 您可以定义static defaultProps设置类的默认属性。它们将用于undefined和缺少道具，但不能用于null道具。
  >
  > Defining defaultProps in class components is similar to using default values in function components.

- static propTypes

  > static getDerivedStateFromError函数内组件还没有直接等价的东西。如果您想避免创建类组件，请ErrorBoundary像上面那样编写一个组件并在整个应用程序中使用它。或者，使用react-error-boundary执行此操作的包。

- static getDerivedStateFromProps(props, state)

  > 如果你定义了static getDerivedStateFromError，当子组件（包括远处的子组件）在渲染过程中抛出错误时，React 将调用它。这使您可以显示错误消息而不是清除 UI。
  >
  > static getDerivedStateFromError函数内组件还没有直接等价的东西。如果您想避免创建类组件，请ErrorBoundary像上面那样编写一个组件并在整个应用程序中使用它。或者，使用react-error-boundary执行此操作的包。

## 以下不属于React支持的鼠标事件的是

> TODO ErrorTime: 1

- [mouseevent-handler(react.dev)](https://react.dev/reference/react-dom/components/common#mouseevent-handler)

> React中常见和触摸鼠标相关的事件对应的处理函数。

- DragEvent(拖拽事件)

  ```text
  <div
    draggable={true}
    onDragStart={e => console.log('onDragStart')}
    onDragEnd={e => console.log('onDragEnd')}
  >
    Drag source
  </div>

  <div
    onDragEnter={e => console.log('onDragEnter')}
    onDragLeave={e => console.log('onDragLeave')}
    onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
    onDrop={e => console.log('onDrop')}
  >
    Drop target
  </div>
  ```

  > onDragExit曾经是，已经被遗弃了。

- MouseEvent(鼠标事件)

  ```text
  <div
  onClick={e => console.log('onClick')}
  onMouseEnter={e => console.log('onMouseEnter')}
  onMouseOver={e => console.log('onMouseOver')}
  onMouseDown={e => console.log('onMouseDown')}
  onMouseUp={e => console.log('onMouseUp')}
  onMouseLeave={e => console.log('onMouseLeave')}
  />
  ```

- PointerEvent(指针事件)

  ```text
  <div
  onPointerEnter={e => console.log('onPointerEnter')}
  onPointerMove={e => console.log('onPointerMove')}
  onPointerDown={e => console.log('onPointerDown')}
  onPointerUp={e => console.log('onPointerUp')}
  onPointerLeave={e => console.log('onPointerLeave')}
  />
  ```

- TouchEvent(触摸事件)

  ```text
  <div
  onTouchStart={e => console.log('onTouchStart')}
  onTouchMove={e => console.log('onTouchMove')}
  onTouchEnd={e => console.log('onTouchEnd')}
  onTouchCancel={e => console.log('onTouchCancel')}
  />
  ```

- ClipboardEvent(剪切板事件)

  ```text
  <input
  onCopy={e => console.log('onCopy')}
  onCut={e => console.log('onCut')}
  onPaste={e => console.log('onPaste')}
  />
  ```

- CompositionEvent(复合事件)

  ```text
  <input
  onCompositionStart={e => console.log('onCompositionStart')}
  onCompositionUpdate={e => console.log('onCompositionUpdate')}
  onCompositionEnd={e => console.log('onCompositionEnd')}
  />
  ```

- AnimationEvent(动作事件)

  ```text
  <div
  onAnimationStart={e => console.log('onAnimationStart')}
  onAnimationIteration={e => console.log('onAnimationIteration')}
  onAnimationEnd={e => console.log('onAnimationEnd')}
  />
  ```

  ## 以下哪些不是react-router内置的组件

  > TODO ErrorTime: 1

- DefaultLink不存在

- RoutingContext被RouterContext替代，但是RouterContext已经弃用。

## 关于Redux，以下说法错误的是

- [getting-started(redux)](https://redux.js.org/introduction/getting-started)

- [basic-example(redux)](https://redux.js.org/introduction/getting-started#basic-example)

  > 通过一个简单的案例简单描述redux的使用方式和架构特点

The whole global state of your app is stored in an object tree inside a single store. The only way to change the state tree is to create an action, an object describing what happened, and dispatch it to the store. To specify how state gets updated in response to an action, you write pure reducer functions that calculate a new state based on the old state and the action.

> 解析说明redux模式特点

- 单例模式

  > 应用程序的整个全局状态存储在单个存储内的对象树中。对象数存在一个redux store。

- store

  > react store

- action

  > 更改状态树的唯一方法。指定在redux store中如何更新状态以响应操作。action描述的是已发生的事件对象(an object describing what happened)。

- reducer

  > 编写纯reducer函数，根据旧状态和操作计算新状态。

APIs
// Create a Redux store holding the state of your app.

- subscribe

  > You can use subscribe() to update the UI in response to state changes.

- dispatch

  > The only way to mutate the internal state is to dispatch an action.

- getState

  > get state from store

action，dispatch，reducer的区别

> action指定如何更新状态和响应操作，定义了任务逻辑。dispatch作为执行器，一次执行了任务。而reducer是更高层的dispatch，可以变相一次执行多个任务action。

三个基本原则

1. 单一数据源
2. State是只读的
3. 使用纯函数(reducer)来执行修改

## 每个路由都有自己的onEnter和onLeave钩子，观察以下代码，当从“/a”跳转到“/b”时，各路由的钩子被调用顺序为（）

> > TODO ErrorTime: 1

- [concepts-outlets(react-router-dom)](https://reactrouter.com/en/main/start/concepts#outlets)

路由只匹配最优先的第一个。

onEnter是当用户进入时触发和onLeave是用户离开时触发， 本题中从“/a”跳转到“/b”，应当为从“/a”中离开，紧接着在进入“/b”

## 关于Hook中的useDebugValue的作用是

- [useDebugValue(react.dev)](https://react.dev/reference/react/useDebugValue)

让您在 React DevTools 中向自定义 Hook 添加标签。比如格式化和其他处理，之后在React DevTools中显示。

## StrictMode组件的作用是

> TODO ErrorTime: 1
> like(以下不属于StrictMode的作用或优点的是)

## 使用哪个Hook可以为函数组件添加state

like(在函数组件中使用哪个Hook可以包裹副作用（改变 DOM、添加订阅、设置定时器、记录日志等）)

## 如果想要在组件第一次加载后获取该组件的dom元素，应当在以下哪个生命周期中进行

like(class组件生命周期方法对应到函数组件和Hook，以下说法错误的是)

## JSX代码最终会被转换成使用（）方法生成的react元素

- [react-lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [Legacy React APIs(react.dev)](https://react.dev/reference/react/legacy)

旧版本API React.APIs

- Children 允许您操纵和转换作为 prop 接收到的 JSX children。查看替代方案。
- cloneElement 允许您使用另一个元素作为起点创建一个 React 元素。查看替代方案。
- Component 允许您将 React 组件定义为 JavaScript 类。查看替代方案。
- createElement 让你创建一个 React 元素。通常，您将使用 JSX。
- createRef 创建一个可以包含任意值的 ref 对象。查看替代方案。
- isValidElement 检查一个值是否是 React 元素。通常与 一起使用cloneElement。
- PureComponent与 类似Component，但它会跳过使用相同入参(same props)的重新渲染。查看替代方案。

React渲染的流程

- [面试官：说说react的渲染过程(博客)](https://cloud.tencent.com/developer/article/2195798)

1. mount/update阶段

   > React.createElement -> JSX对象(虚拟DOM-VDOM)

2. render阶段

   > Scheduler调度器，调度计算和ReactDOM.render执行。计算指计算Fiber节点的差异（diff算法指的就是这个比较的过程）。

3. commit阶段

   > 各种渲染器(react-dom、react-art)。处理副作用Effect和生命周期等内容。

## 以下关于对Router组件设置history属性值解释正确的是

like(以下哪个选项不能作为Router组件的history属性值)

## 以下关于state和props说法错误的是

- [State(react.dev)](https://react.dev/learn/state-a-components-memory)

- [Passing Props to a Component(react.dev)](https://react.dev/learn/passing-props-to-a-component)

- State: A Component's Memory

  > 在 React 中，这种特定于组件的内存称为状态

- Familiar props

  > Props 是您传递给 JSX 标记的信息。

- state和props都可以控制组件的渲染输出

- props和state都是普通的JavaScript对象

state使用常见问题

1. 需要对一系列状态更新进行排队。

   > React 会等到事件处理程序中的所有代码都运行完毕后才处理状态更新。需要告诉 React“用状态值做某事”而不是仅仅替换它的方法，比如一个函数中的将箭头函数作为参数。
   >
   > n => n + 1称为更新函数。当您将其传递给状态设置器时
   >
   > 1. React 将此函数排队，以便在事件处理程序中的所有其他代码运行后进行处理。
   > 2. 在下一次渲染期间，React 会遍历队列并为您提供最终的更新状态。

```
   // out 1
   // 重新渲染仅在所有这些调用之后setNumber()发生。
   <>
   <h1>{number}</h1>
   <button onClick={() => {
    setNumber(number + 1);
    setNumber(number + 1);
    setNumber(number + 1);
   }}>+3</button>
   </>

// out 3
// 可以传递一个函数，该函数根据中的前一个状态来计算下一个状态
<>
  <h1>{number}</h1>
  <button onClick={() => {
    setNumber(number => number + 1);
    setNumber(number => number + 1);
    setNumber(number => number + 1);
  }}>+3</button>
</>

```

## React DOM在渲染之前，默认会对所有输入内容进行转义，这样做的目的是

React DOM在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

## 以下选项中，哪个不是Hook的优点

like(class组件生命周期方法对应到函数组件和Hook，以下说法错误的是)

## 以下不属于React支持的触摸事件的是

like(以下不属于React支持的鼠标事件的是)

## 以下不属于react支持的剪贴板事件的是

like(以下不属于React支持的鼠标事件的是)

## 在使用Redux时，如果想要监听State中的值变化，可以使用：

like(关于Redux，以下说法错误的是)

## Babel 会把 JSX 转译成一个名为（）函数调用。

like(JSX代码最终会被转换成使用（）方法生成的react元素)

## 以下不属于React复合事件的是

like(以下不属于React支持的鼠标事件的是)

## 传给useEffect的函数会在浏览器完成布局与绘制之后执行，如果想在在浏览器执行绘制之前执行，可以使用

like(在函数组件中使用哪个Hook可以包裹副作用（改变 DOM、添加订阅、设置定时器、记录日志等）)

## 以下不属于React支持的动画事件的是

like(以下不属于React支持的鼠标事件的是)

## 以下不是Redux的使用原则的是

like(关于Redux，以下说法错误的是)

## JSX只是（）的语法糖

like(JSX代码最终会被转换成使用（）方法生成的react元素)

## Class内部有一handleClick方法如下代码块，在点击事件中触发handleClick的正确方法是？

like(以下不属于React支持的鼠标事件的是)

## 关于Hook中里的useEffect的执行时机，下面说法正确的是

like(在函数组件中使用哪个Hook可以包裹副作用（改变 DOM、添加订阅、设置定时器、记录日志等）)

## 以下关于Fragments组件说法错误的是？

- [Fragment(react.dev)](https://react.dev/reference/react/Fragment)

- Fragment没有包装器节点的情况下对元素进行分组。
- 返回多个元素。将多个元素作为一个组进行返回。(只限于return返回时)
- 渲染片段列表时需要Fragment显式编写而不是使用<></>语法。
- 对 in 中的元素进行分组Fragment对生成的 DOM 没有影响；
- 使用显式Fragment语法声明的片段可以有key，隐式的也支持。
- 当您从渲染进入或返回，或者从渲染进入和返回时， React 不会重置状态。这仅适用于单层深度。
- Fragments组件不会生成额外的dom节点。

```text
<Fragment>...</Fragment> 等于 <>...</>
```

## 关于以下代码说法错误的是

- [Suspense(react.dev)](https://react.dev/reference/react/Suspense)

Suspense允许您显示回退，直到其子级完成加载。

- 加载内容时显示备用数据

- fallback加载loading组件，loading是非动态加载的。

- Suspense内包裹的组件Albums加载完成后，替换loading， Albums是动态加载的。

  ```text
  <Suspense fallback={<Loading />}>
  <Albums />
  </Suspense>
  ```

## 当使用ReactDOM.unmountComponentAtNode从DOM中卸载组件时，以下说法正确的是

like( 从 DOM 中卸载组件，可以使用)

## 在componentDidUpdate()中以下哪个说法是正确的

like(class组件生命周期方法对应到函数组件和Hook，以下说法错误的是)

## 关于Hook的使用，以下说法中不满足官方使用规则的是

like(在函数组件中使用哪个Hook可以包裹副作用（改变 DOM、添加订阅、设置定时器、记录日志等）)

## 以下关于ReactDOM.findDOMNode说法错误的是

like(以下关于ReactDOM.findDOMNode说法错误的是)

## 以下关于Mobx中原则说法错误的是

- [mobx概念与原则(第三方中文文档MobX5)](https://cn.mobx.js.org/intro/concepts.html)

Mobx原则

1. 单向数据流，也就是动作改变状态，而状态的改变会更新所有受影响的视图。
2. 当状态改变时，所有衍生都会进行原子级的自动更新。因此永远不可能观察到中间值。
3. 所有衍生默认都是同步更新。这意味着例如动作可以在改变状态之后直接可以安全地检查计算值。
4. 计算值 是延迟更新的。任何不在使用状态的计算值将不会更新，直到需要它进行副作用（I / O）操作时。 如果视图不再使用，那么它会自动被垃圾回收。
5. 所有的计算值都应该是纯净的。它们不应该用来改变状态。

## ReactDOM.createPortal(child, container)函数可以将子节点渲染到存在于父组件以外的DOM节点上，那么通过Portal进行事件冒泡时，会冒泡到

- [ReactDOM.createPortal(react.dev)](https://react.dev/reference/react-dom/createPortal)

- ReactDOM.createPortal允许您将一些子元素渲染到 DOM 的不同部分。

  > createPortal仅更改 DOM 节点的物理位置。在所有其他方式中，您渲染到createPortal中的 JSX 充当渲染它的 React 组件的子节点。
  >
  > 例如，子级可以访问父级树提供的上下文，事件根据 React 树从子级冒泡到父级，导致React树中的父级组件进行了事件响应。

- 来自createPortal的事件根据 React 树而不是 DOM 树传播。

  > 如果您在createPortal内部单击，并且该门户包含在 中div onClick，则该onClick处理程序将触发。如果这导致问题，请停止createPortal内部的事件传播，或将createPortal本身在 React 树中向上移动。

用法

- 可以将子节点渲染到父组件以外的DOM节点上

## 以下路由代码中，如果现在跳转到“/inbox/messages/3”，浏览器链接栏中显示的路由为

like(以下哪项对react-router-dom中组件分类是错误的)

## 可以使子节点渲染到存在于父组件以外的DOM节点上的方法是

like(ReactDOM.createPortal(child, container)函数可以将子节点渲染到存在于父组件以外的DOM节点上，那么通过Portal进行事件冒泡时，会冒泡到)

## 关于React中的“状态提升”说法错误的是

- [sharing-state-between-components(react.dev)](https://react.dev/learn/sharing-state-between-components)

解析知识点

- 提升组件之间共享状态

  > 通常的方法是将状态的控制处理提升到公共的父组件，最后通过单向流的方式以props的形式同步到子组件。

- 受控组件和非受控组件区别

## 验证对象是否为 React 元素可以使用（）方法

like(JSX代码最终会被转换成使用（）方法生成的react元素)

## Route中的path属性可以使用通配符，以下关于通配符的规则描述错误的是

like(以下哪项对react-router-dom中组件分类是错误的)
