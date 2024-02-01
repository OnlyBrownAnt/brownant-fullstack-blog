# React 问题集
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

## import React from 'react' 和 import * as React from 'react' 区别
- [ts下 import React from ‘react’ 和import * as React from 'react'的区别](https://juejin.cn/post/7000930676488798216)

## JSX 和 React 关联
[JSX 和 React 是两个不同的东西。它们经常一起使用，但您可以 单独使用它们。JSX 是一个语法扩展，而 React 是一个 JavaScript 库。](https://react.dev/learn/writing-markup-with-jsx)
- JavaScript XML(JavaScript语言扩展) 类XML语法的语法糖
- 构建虚拟DOM树时语义化能力更好

## React 生命周期
- [react-lifecycle](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [简述下 React 的生命周期？每个生命周期都做了什么？](https://fe.ecool.fun/topic-answer/f59d29a2-7ff8-41ca-8176-a24f1ca6d0f5?orderBy=updateTime&order=asc&tagId=13)

![react lifecycle](/img/docs/react/react-lifecycle.png)
- React生命周期
  
  - Mounting
  - Updating
  - Unmounting

- 关键函数
  
  - constructor()
    
    > React组件的构造函数
    > 
    > 1. 通过将对象分配，来初始化本地状态this.state。
    > 2. 将事件处理程序方法绑定到实例。
    > 3. 可以不实现该方法。如果不初始化状态并且不绑定方法，则无需为 React 组件实现构造函数。
    > 4. 在constructor()中修改状态时只能用this 而不是setState()。因为构造函数阶段，组件还没有完全初始化，也没有挂载到DOM中。使用this改变值不会出发render即不会影响到DOM的diffing和渲染。
    
    ```javascript
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }
    ```
  
  - static getDerivedStateFromProps()
    
    > 是React组件生命周期中的一个静态方法（static method），它用于根据传入的属性（props）来更新组件的状态（state），如果返回null就不更新。在方法里自定义处理逻辑，应该谨慎使用。在Mounting、Updating阶段可以被调用。
  
  - static getDerivedStateFromError()
    
    > 是React组件生命周期中的一个静态方法（static method），用于处理组件在渲染过程中发生的错误。当组件树中的任何子组件抛出异常时，React会调用父组件中的 getDerivedStateFromError() 方法。这个方法允许你捕获错误并返回一个新的状态对象，以更新组件的状态。比如触发展示一个备用的UI或错误提示。
  
  - shouldComponentUpdate()
    
    > React 组件生命周期中的一个方法，用于判断组件是否需要进行更新。增加对组件的状态和属性的判断，实现更加颗粒度的控制组件是否更新。 
  
  - render()
    
    > render()方法是类组件中唯一必需的方法。调用时，它应该检查this.props并this.state返回多种类型(React Element等)的数据。注意是纯函数，只返回数据不处理DOM渲染。
  
  - getSnapshotBeforeUpdate()
    
    > 在最近渲染的输出被提交到例如DOM之前调用。它使您的组件能够在DOM发生更改之前捕获一些信息（例如滚动位置）。此生命周期方法返回的任何值都将作为参数传递给componentDidUpdate()。
  
  - componentDidMount()
    
    > componentDidMount()在安装组件（插入树中）后立即调用。需要DOM节点的初始化应该放在此处。
  
  - componentDidUpdate()
    
    > componentDidUpdate()更新发生后立即调用。初始渲染不会调用此方法。
  
  - componentWillUnmount()
    
    > componentWillUnmount()在组件被卸载和销毁之前立即调用。在此方法中执行任何必要的清理，例如使计时器无效、取消网络请求或清理在componentDidMount()。
  
  - componentDidCatch()
    
    > 在后代组件抛出错误后调用此生命周期。它应该用于记录错误之类的事情。

## 什么是高阶组件？
- 高阶函数(HOC)
- HOC函数 higherOrderComponent()
- 作用
  > 复用组件，可以作为通用组件，实现动态的切换组件。
  
  ```javascript
  const EnhancedComponent = higherOrderComponent(WrappedComponent);
  ```

## constructor 中 super 与 props 参数一起使用的目的是什么?
- JavaScript的集成机制
- super调用父类构造函数之后子类实例this才能继承父类的属性和方法

## 什么是受控组件？
- 受控组件和非受控组件的区别就是组件状态是否受到React控制。
- 比如没有进行状态赋值控制的原生HTML标签，就是非受控组件。

## React.PureComponent 和 React.Component 有什么区别？
- React.PureComponent  
  > 自身实现了shouldComponentUpdate，但是只进行了浅层的对比。所以不适用于层级比较复杂的组件，只适合比较简单的组件，比如纯粹用于UI显示的组件。

- React.Component
- shouldComponentUpdate
  > React 组件生命周期中的一个方法，用于判断组件是否需要进行更新。增加对组件的状态和属性的判断，实现更加颗粒度的控制组件是否更新。
  
  ```javascript
  // nextProps = 待更新组件的Props
  // nextState = 待更新组件的状态State
  shouldComponentUpdate(nextProps, nextState) {
    if (
        // 更新判断逻辑
    ) {
        // Nothing has changed, so a re-render is unnecessary
        return false;
    }
    return true;
  }
  ```

## 什么是 React？

- React是一个JavaScript库(也可以认为是一个前端框架)

- 用于快速构建和高效维护界面

- 特点: 组件化、虚拟DOM、高效更新机制

- 库和框架的区别是框架有更多功能性的配套设置。库只是实现某个核心的功能。

- Vue和React都提供了响应式的机制，但它们的实现方式略有不同。
  
  > 总结: Vue利用浏览器的特性来实现响应式，而React是一个独立的库，在不依赖具体浏览器特性的情况下实现了自己的响应式机制。

在Vue中，其响应式是基于ES5的Object.defineProperty或ES6的Proxy进行实现的。Vue通过追踪数据的依赖关系来自动更新相关的组件。当数据发生变化时，Vue能够检测到并触发相应的更新操作，从而保证界面和数据的同步。Vue的响应式机制是基于浏览器提供的底层特性实现的。

React的响应式则是通过使用虚拟DOM和一种称为"reconciliation"（协调）的过程来实现的。React会将组件的状态与DOM进行比较，并根据差异进行局部更新。React并没有直接依赖浏览器的特性，它是一个纯JavaScript库，可以在浏览器环境以外的地方运行，例如服务器端。

## 如何在React中应用样式？

- 两种方式
  
  - 外部样式表: className = class String
  - 内联样式表: style = JavaScript Object

- className
  
  > 在 JSX 中，className 是在转换为普通 JavaScript 代码时会被转换成 HTML 的 class 属性

## 为什么不能直接使用 this.state 改变数据？
- React只支持setState()来修改状态并触发render以及虚拟DOM的diffing渲染。
- setState()通过一个队列机制来实现state更新。当执行setState的时候，会将需要更新的state合并后放入状态队列，而不会立刻更新this.state。队列机制可以高效的批量更新state。

## React 中如果绑定事件使用匿名函数有什么影响？
- 加载效果: 每次当成一个新的Props。
- 缓存优化: 无法进行缓存优化，性能增加了损耗。

## React 的事件代理机制和原生事件绑定混用会有什么问题？

- React事件代理机制
  
  > JSX中定义的无论是原生事件还是React自定义事件，都会在合成事件层上处理，并没有绑定到原生事件层上去。而是在合成事件层处理，原生事件可能导致合成事件层处理错误。
  > 
  > 比如e.stopPropagation()会阻止合成事件层的冒泡行为，但是却无法阻止原生DOM的冒泡行为。

- 原生事件

- React合成事件层

- 原生DOM

## React 的事件代理机制和原生事件绑定有什么区别？

- 事件传播与阻止事件的传播
- 事件类型
- 事件的绑定方式
- 事件对象

## React 中为什么要给组件设置 key？

- 避免不必要的渲染。React Diffing算法会参考key作为索引进行对比处理。
- React参考key用于判断元素和本地状态的关联。React在重新渲染组件时可以正确地保留和恢复每个元素的状态。

## setState 之后发生了什么?

- setState()
- 状态队列机制
- 实现异步更新状态，避免重复更新状态引发渲染处理。

## 在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？

- 形成死循环，会导致循环调用houldComponentUpdate或componentWillUpdate。
- 主要原因: shouldComponentUpdate或componentWillUpdate会清空state队列，导致state队列为null，从而触发updateComponent方法。 而updateComponent方法会再次调用shouldComponentUpdate或componentWillUpdate。

## react 的虚拟 dom 是怎么实现的？

- React Virtual DOM基本实现
1. React将真实DOM转换为Virtual DOM(JS对象)

2. React计算更新后的Virtual DOM

3. React当前的Virtual DOM与上一个版本的Virtual DOM比较。确认需要更新的内容。

4. 渲染到真实的DOM。
- Virtual DOM优点
  - 相对于直接处理原生DOM，性能更好。
  - 更容易与其他平台集成。比如React Native与APP平台集成。

## 为什么 React 的 VM 可以提高性能？

- Virtual DOM通过内存中的Diff算法计算处理，最后只会渲染必要的原生DOM操作。

## React 中的 VM 一定会提高性能吗？

- 不一定

- 总加载时间 = Virtual DOM计算时间 + 原生DOM渲染时间
  
  > 如果页面DOM十分庞大，但是某个场景实际更新DOM很少，这个时候反而耗时更加长，因为React每次Virtual DOM计算都会对照整个原生DOM生产对应的Virtual DOM。生成VDOM和计算的耗时就可能大于时间操作对应DOM的时间了。

## React Hooks 带来了什么便利？

- 增加React函数组件的能力(在函数组件里使用类组件的生命周期钩子等特性)
- 可以以更小颗粒度的处理UI和组件状态的隔离。
- 可以以更轻量的方式实现跨组件复用能力。

## 列举几个常见的 Hook ?

- 基础知识
  
  - 副作用
    
    > 在编程中，副作用（side effect）是指与纯粹的计算过程无关的操作。这些操作可以包括但不限于网络请求、访问本地存储、修改 DOM、订阅事件等。

- useState
  
  > 状态管理工具。useState 是一种用于函数组件的状态管理方式，具有更简洁的语法和更直接的状态更新机制。而setState 和 this.state 则是类组件中用于定义和管理状态的方式，但在更新状态时需要注意它的异步特性。

- useReducer
  
  > 一种用于管理状态和处理状态更新的管理工具。它接收当前状态和一个操作（action）作为输入，并返回新的状态。reducer能够根据操作的类型来决定更新状态的自定义逻辑，并返回更新后的状态。可以认为是useState的高阶工具。

- useContext
  
  > 获取Context的上下文内容。通常搭配createContext来使用，createContext用于创建上下文对象，并提供给组件。然后组件使用useContext来获取Contextd的上下文内容。通过ContextName.Provider的方式把Context提供给组件。
  
  ```javascript
  import { createContext, useContext } from 'react';
  ```
```
const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}

```
- useEffect
> 处理组件的副作用的工具。包括与外部系统通讯、网络请求、模拟类组件的生命周期钩子的效果等。
- useCallback
> 用于优化函数的性能。它的作用是在依赖项变化时，仅当需要时才返回相同的回调函数。
> 
> 通常情况下，每次组件重新渲染时，函数组件中的函数会被重新创建。这可能会导致传递给子组件的回调函数也会被重新创建，进而触发子组件的不必要的重新渲染。useCallback 的目的是避免这种不必要的函数重建，并确保只有在依赖项发生更改时，才会返回相同的回调函数引用。这可以减少子组件的重新渲染，提高整体性能。
```javascript
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存回调函数
  const handleClick = useCallback(() => {
    console.log('Button clicked');
    setCount(prevCount => prevCount + 1);
  }, [setCount]);

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

function ChildComponent({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
}
```

- useMemo
  
  > 缓存重新渲染之间的计算结果，优化作用。useMemo在组件的顶层调用以缓存重新渲染之间的计算，只要依赖项不变，就返回之前的缓存结果。
  
```javascript
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}

```
- useRef
> 引用不需要渲染的数据。比如创建DOM元素的真实引用、保存持久数据、在副作用的时候读取和存储值。
> 
> useState更强调数据响应式的渲染UI。useRef则可以避免数据与渲染的响应式关联，用于处理一下不需要数据和渲染关联的场景。
```javascript
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);
  let btnRef = useRef(null);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button ref={btnRef} onClick={handleClick}>
      Click me!
    </button>
  );
}
```

## 使用React Hooks有什么优势？

- 目标
  
  > 在组件中使用React的功能。

- 作用
1. 复用状态逻辑
2. 简化组件结构
3. 避免 Class 组件的限制
4. 改善性能优化 
- 作用详解
  
  > form chatgpt
1. 复用状态逻辑：在类组件中，复用组件之间的状态逻辑通常需要使用高阶组件 (Higher-Order Components) 或渲染属性 (Render Props) 等模式。Hooks 引入了 useState、useEffect、useContext 等钩子函数，使得在函数组件中可以更轻松地复用和共享状态逻辑。
2. 简化组件结构：在类组件中，组件的状态和生命周期方法都分散在不同的生命周期方法或实例方法中，导致代码分散和复杂。Hooks 通过将相关的状态和副作用逻辑组合到一个函数中，使得组件的结构更加清晰、简洁，并且易于理解和维护。
3. 避免 Class 组件的限制：使用类组件时，需要关注 this 的绑定、手动绑定回调函数、生命周期方法的正确使用等细节。Hooks 可以避免这些限制，使得函数组件的编写更加自然和简单。
4. 改善性能优化：在类组件中，为了优化性能，需要使用 shouldComponentUpdate 或 PureComponent 进行浅比较，以避免不必要的重新渲染。Hooks 中的 useMemo 和 useCallback 可以更精确地控制何时进行计算和更新，以提高性能。

## 简单介绍下 React 中的 diff 算法？

> 理解diff算法可以帮助理解和设计性能优化的处理。

- [reconciliation-diffing算法-react](https://zh-hans.legacy.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)
- [React源码揭秘3 Diff算法详解-掘金](https://juejin.cn/post/6844904167472005134)
- [为什么 React 的 Diff 算法不采用 Vue 的双端对比算法？](https://juejin.cn/post/7116141318853623839)

### React Reconciliation 思路

在某一时间节点调用React的render()方法，会创建一棵由React元素组成的树。在下一次state或props更新时，相同的 render()方法会返回一棵不同的树。React需要基于这两棵树之间的差别来判断如何高效的更新UI，以保证当前UI与最新的树保持同步。

### 通用 Diffing 算法

比较两棵树有通用的diff方案，但是算法的复杂程度仍为O(n的3次方)。

### React 的 Diffing 算法方案

> 在假设基础上优化的算法复杂度为O(n)

1. 设置假设条件
   1. 两个不同类型的元素会产生出不同的树.
   2. 开发者可以使用key属性标识哪些子元素在不同的渲染中可能是不变的。
2. 在假设条件下优化Diffing算法

### React 的 Diffing 算法优化内容-启发式算法

1. 对比不同类型的元素
   
   - 当根节点为不同类型的元素时，React会拆卸原有的树并且建立起新的树.
     
     > 当卸载一棵树时，对应的DOM节点也会被销毁。在根节点以下的组件也会被卸载，它们的状态会被销毁。

2. 对比同一类型的元素
   
   - 当对比两个相同类型的React元素时，React会保留DOM节点，仅比对及更新有改变的属性。
     
     > 通过对比这两个元素，React知道需要修改DOM元素上的className属性还是Style属性。在处理完当前节点之后，React 继续对子节点进行递归。

3. 对比同类型的组件元素
   
   - 当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持state一致。
     
     > 下一步，调用 render()方法，diff算法将在之前的结果以及新的结果中进行递归。

4. 对子节点进行递归
   
   - 默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。
     
     > 在子元素列表末尾新增元素时，更新开销比较小。如果只是简单的将新增元素插入到表头，那么更新开销会比较大。

5. Keys
   
   - React引入了key属性。当子元素拥有key时，React使用key来匹配原有树上的子元素以及最新树上的子元素。
     
     > 可以用来有效解决第4点的问题，减少性能消耗。这个key不需要全局唯一，但在列表中需要保持唯一，而且不是随机变化的，否则引起渲染的混乱。

### React 的性能优化建议

- 避免DOM层级变化。不要频繁卸载组件。采用CSS进行隐藏显示更好。
- 列表中使用同类型组件，而且有在列表中唯一且不随机变化的key。
- 避免过度使用嵌套的组件。过度嵌套组件可能导致组件层级过深，增加渲染成本和维护难度。尽量保持组件层级扁平，并考虑组件的拆分与复用。
- 使用shouldComponentUpdate来避免不必要的渲染。
- 用useCallback和useMemo。使用useCallback 缓存回调函数、使用useMemo缓存计算结果，以避免在每次渲染时重复创建函数或计算相同的值。
- 按需加载组件。使用 React 的代码分割功能（如 React.lazy和Suspense）按需加载组件，以减少初始加载时间并提升页面响应速度。
- 避免在渲染过程中进行昂贵的操作。将会造成阻塞的操作（如大量计算、数据请求等）放在渲染之外，例如使用 useEffect钩子处理异步操作。

## React中，能否直接将 props 的值复制给 state？

没有必要，可以直接以this.props的方式获取。

## React Hooks 当中的 useEffect 是如何区分生命周期钩子的？

- [useEffect-react](https://react.dev/reference/react/useEffect)
  
  > useEffect可以根据入参来确定useEffect的内部加载效果，可以替换掉一些生命周期函数的效果。下面是具体的替换示例代码。

- componentDidMount
  
  ```javascript
  useEffect(() => {
    // do something
  }, [])
  ```

- componentDidUpdate
  
  ```javascript
  useEffect(() => {
    // do something
  }, [stateVar])
  ```

- componentDidUnmount
  
  ```javascript
  useEffect(() => {
    return () => {
       // do something 
    }
  }, [])
  ```

## 为什么不能用数组下标来作为 react 组件中的 key ？

- 数组的索引是根据数据重新生产的，在列表更新的情况下会导致组件的key产生变化。
- 组件的key产生变化会对Diffing算法的结果产生负面影响。

## React Fiber 是什么？

- [React Fiber 原理介绍-segmentfault](https://segmentfault.com/a/1190000018250127)

### 背景

- 默认情况下，JS运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。一个任务长期占用主线程会导致其他任务等待。

- React框架内部的运作层数(三层)
  
  1. VirtualDOM层，描述页面长什么样。
  2. Reconciler层，负责调用组件生命周期方法，进行Diff运算等。
  3. Render层，根据不同的平台，渲染出相应的页面，比较常见的是ReactDOM和ReactNative。

- React15的Reconciler(也称为Stack Reconciler)面临JS运算对主线程的长时间占用问题。出现页面渲染卡顿掉帧现象，Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑，把DOM树递归处理完成才能结束对主线程的占用。
  
### 解决方案
  
  在React15基础上重构了Reconciler，增加了JS运算任务和页面绘制任务之间的主线程占用调度切换能力。

### 解决方案原理

- Fiber 
  
  > 一种数据结构。
  
  ```javascript
  // JS对象表示
  const fiber = {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
  }
  ```

- Fiber 树
  
  > 在VirtualDOM树的基础上增加额外的信息来生成Fiber树，本质来说是一个链表。

- Fiber Reconciler
  
  > 在React15基础上重构了Reconciler，所以称为Fiber Reconciler。Fiber Reconciler每执行一段时间，都会将控制权交回给浏览器，可以分段执行。而Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑。
  
  1. Fiber 树在首次渲染的时候会一次过生成。在后续需要 Diff 的时候，会根据已有树和最新 Virtual DOM 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程。
  2. 如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树，在空闲的时候再重新执行一遍。
  3. 在构造 Fiber 树的过程中，Fiber Reconciler 会将需要更新的节点信息保存在Effect List当中，在阶段二执行的时候，会批量更新相应的节点。

- Scheduler
  
  > 调度器，进行任务分配，让优先级更高的任务先执行。实现Fiber Reconciler高效的将控制权交回给浏览器，可以分段执行的效果。

## 虚拟DOM一定更快吗？

DOM操作是性能杀手，因为操作DOM会引起页面的回流或者重绘。相比起来，通过多一些预先计算来减少DOM的操作要划算的多。

所以在React中 实际DOM显示 = JS计算虚拟DOM + 原生DOM操作。其中如果原生操作DOM变化复杂的情况，先JS计算再操作是节约时间的。但是如果在较大的虚拟DOM计算后只需要更新很小的原生DOM操作。那么反而耗时更多。

## 不同版本的 React 都做过哪些优化？

[React17新特性：启发式更新算法-知乎](https://zhuanlan.zhihu.com/p/182411298)

- React15
1. 架构介绍
   
   1. Reconciler（协调器）
      
      > 分析待更新DOM。
   
   2. Renderer（渲染器）
      
      > 进行渲染。
- React16
1. 引入了Fiber架构
   
   1. Scheduler（调度器）
      
      > 调度协调和渲染任务
   
   2. Reconciler（协调器）
      
      > 分析待更新DOM，更新工作从递归变成了可以中断的循环过程。
   
   3. Renderer（渲染器）
      
      > 进行渲染。

2. 添加了错误边界（Error Boundaries）功能
- React17

- 启发式更新算法。
  
  > 更新区间模型更新为了lanes模型。可以选定一个更新区间，并且动态的向区间中增减优先级，可以处理更细粒度的更新。

## Fiber为什么是React性能的一个飞跃？

- 在概念上，Fiber 是一种协作的（Cooperative）编程模型（协程）。
- 在React中，React Fiber是React 16中引入的一种新的调度和渲染架构。
  - React16之前的渲染方式是递归。
  - 在Fiber架构中，React渲染是增量渲染。可以更颗粒度的调度JS计算任务和渲染任务之前的切换。提高渲染效率。
  - 主要特性
    1. 异步渲染。实现基于时间片（Time Slicing）的异步渲染机制
    2. 优先级调度。可以根据任务的紧急程度和重要性来调整任务的执行顺序。
    3. 错误边界。错误边界（Error Boundaries）的功能，可以捕获组件树中抛出的错误，并进行处理，避免整个应用崩溃。

## React Fiber 是如何实现更新过程可控？

- [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
