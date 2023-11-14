# Vue面试题总结一

> - [2022年前端Vue常见面试题大全（三万长文）持续更新(CSDN)](https://blog.csdn.net/weixin_53150999/article/details/122516253)
> - 

## 面试准备计划[目录]

- 项目问题(高频)
  
  - nginx参数
    
    - 转发
      
      - keepalive_requests
      
      - keepalive_timeout
      
      - rewrite
      
      - proxy_pass
    
    - 长连接
      
      > https://learnku.com/articles/36768
      
      - upstream
        
        - weight=权重
        
        - max_fails=失败次数
        
        - fail_timeout=失败时间
      
      - keepalive 线程池
    
    - 进程和连接数配置
      
      > 考虑点是内存和逻辑cpu数量，单个连接按最大800kb算。
      
      - worker_processes
      
      - worker_connections
      
      - use epoll
      
      - ulimit -n
  
  - tomcat线程池
    
    > - [详解tomcat的连接数与线程池 - 编程迷思 - 博客园](https://www.cnblogs.com/kismetv/p/7806063.html)
    
    - acceptCount 
      
      > accept队列的长度
    
    - maxConnections
      
      > Tomcat在任意时刻接收和处理的最大连接数
    
    - maxThreads
      
      > 请求处理线程的最大数量。默认值是200
  
  - 分析TCP/IP shell脚本
    
    - netstat -an | grep ESTABLISHED | wc -l
  
  - docker 本地https测试
    
    - 域名申请免费的ssl证书
    
    - 本地host配置域名转发到docker服务ip
    
    - 断网测试，MAC测试百度APP的网页显示
  
  - TCP三次握手、四次挥手
    
    三次握手状态
    
    - CLOSED
    
    - LISTEN
    
    - SYN_SENT
    
    - SYN_RECV
    
    - ESTABLISHED
    
    四次挥手状态
    
    > TCP 连接采取全双工的通信方式，因此每个方向都必须单独进行关闭。所以多了一次挥手关闭处理。
    
    - ESTABLISHED
    
    - FIN_WAIT_1
    
    - CLOSE_WAIT
    
    - FIN_WAIT_2
    
    - LAST_ACK
    
    - TIME_WAIT
      
      - 没有收到ACK报文还可以重传。
      
      - 2MSL（通常是两分钟)
      
      - MSL（Maximum Segment Lifetime）报文最大生存时间。维持 2MSL 时长的 TIME-WAIT 状态，保证至少一次报文的往返时间内端口是不可复用。
    
    - CLOSED
  
  - HTTPS和HTTP的区别
    
    - 有SSL认证的流程
  
  - 浏览器url加载简要过程
    
    - DNS解析(本地，远程，UDP协议，返回IP)
      
      > 本地Host会影响DNS解析
      
      - 本地域名服务器
      
      - 根域名服务器
      
      - 顶级域名服务器
    
    - 浏览器向 IP 地址发出 HTTP 请求
    
    - web服务器返回要在浏览器中呈现的网页

- 开放性问题
  
  - 为什么要做前端
    
    - 首先是个人喜好。
    
    - 其次是职业规划，5年是RN客户端方向。

- 计算机网络基础
  
  > [计算机网络 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/computer-networks)
  > 
  > https://coffe1891.gitbook.io/frontend-hard-mode-interview/1/1.5.5
  
  - TCP/IP四层协议
  
  - TCP常见状态码
  
  - TCP三次握手、四次挥手
  
  - 跨域问题
  
  - 网页安全

- HTML、JS、CSS基础题
  
  > [2023年最全前端面试题考点HTML5+CSS3+JS_尚硅谷javascript_参宿7的博客-CSDN博客](https://blog.csdn.net/qq_28838891/article/details/123741623?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22123741623%22%2C%22source%22%3A%22qq_28838891%22%7D)

- Vue面试题(150条)
  
  > [2022年前端Vue常见面试题大全（三万长文）持续更新(CSDN)](https://blog.csdn.net/weixin_53150999/article/details/122516253)

## 计算机网络基础

## HTML、JS、CSS基础题

## Vue面试题(150条)

> 平均一分钟一条。会不会太快？
> 
> V1
> 
> 20:40 - 21:40 50条 (超时，只完成10条)
> 
> 21:50 - 22:40 50条
> 
> 22:40 - 23: 40 50条
> 
> 时间预估太短需要提高5倍时间，15个小时
> 
> V2 完成50条 10条未完成 超时2个小时
> 
> 20:40 - 21:40 10条 完成
> 
> 21:50 - 22:40 20条 完成 超时，看视频到了11:30
> 
> 22:40 - 23: 40 30条 完成 20条
> 
> V3 建议早上加快复习速度
> 
> 5:00 - 6:00 30条
> 
> 7:00 - 8:00 30条
> 
> 9:00 - 10:00 30条
> 
> 11:00 - 12:00 10条
> 
> 12:00 - 13:00 计算机基础
> 
> 13:00 - 14:00 HTML、JS、CSS基础题
> 
> 14:00 - 15:00 模拟面试

### 1

> - [当面试官让我回答React和Vue框架的区别...... - 掘金](https://juejin.cn/post/7144648542472044558)

相同点

- 都采用虚拟DOM
  
  - diff策略最后都是生成render函数，而render函数执行返回VNode(虚拟DOM的数据结构，本质上是棵树。

- 都推崇组件化思想

不同点

- 虚拟DOM diff策略不同
  
  - Vue的Template模板 + options api 写法。vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树。
  
  - React的Class或者Function写法。React 会自顶向下全diff。

- 数据视图驱动策略不同
  
  > 其实就是响应式原理不同
  
  - Vue实现了双向绑定。
    
    - Vue2.0 使用 Object.defineProperty 对象以及对象属性的劫持+发布订阅模式，只要数据发生变化直接通知变化 并驱动视图更新
    
    - Vue3.0响应式采用了ES6中的 Proxy 方法，在目标对象之前架设一层 “拦截” ，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
  
  - React单向数据流，通过setState实现数据驱动视图，通过setState来引发一次组件的更新过程从而实现页面的重新渲染。

- 应用上的不同
  
  - React可以扩展为React Native的用法

### 4

> - [【Vue系列】Vue3.0 VS Vue2.0生命周期 - 掘金](https://juejin.cn/post/7019692533240299550)

### 5

避免多个实例使用到同一个组件的场景，出现引用对象变量共享的情况。所以采用函数方式进行拷贝数据。

### 6

- 组件嵌套存在父子组件样式冲突的情况。

- scoped的作用是进行样式隔离。

- scoped的效果是会给组件的html节点都加上一个id值标识，比如data-v4d5aa038。

### 7

- 控制元素的显示和隐藏。

- v-if = display: none;

- v-show = visibility: hidden;

- 附加 opacity: 0; 透明度。

### 8

model-view-viewModel(MVVM)是一个软件架构设计模式

- model 数据模型

- view 视图层

- viewModel 负责view层和model层的交互

### 9

> - https://segmentfault.com/a/1190000016786254
> 
> - [面试官：Vue常用的修饰符有哪些有什么应用场景 | web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/modifier.html#%E4%B8%80%E3%80%81%E4%BF%AE%E9%A5%B0%E7%AC%A6%E6%98%AF%E4%BB%80%E4%B9%88)

常用修饰符(高频)

> 表单
> 
> 时间
> 
> 键盘
> 
> 鼠标
> 
> v-bind

表单修饰符

> 高频指令v-model

- .lazy通过这个修饰符，转变为在change事件再同步

- .number 将自动过滤用户的输入值转化为数值类型

- .trim 自动过滤用户输入的首位空格

事件修饰符

- stop 阻止事件继续传播，等价于event.stopPropagation()。

- .prevent阻止标签默认行为，等价于event.stopPropagation()。

- .capture 使用事件捕获模式，即元素自身触发的事件先在此处处理，然后才交由内部素进行处理

- .self 只当在event.target 是当前元素自身时触发处理函数。(限制了点击区域)

- .once 事件将只会触发一次

- .passive 告诉浏览器你不想阻止事件的默认行为
  
  > DOM2 Events 规范规定事件流分为 3 个阶段:事件捕获(自上而下)-到达目标-事件冒泡(自下而上)。
  > 
  > 默认事件触发方式是事件冒泡，自下而上。
  > 
  > 就是在当前层，自上而下捕获事件，如果有.passive就触发，否则就走到底。然后实行默认的事件触发方式，自下而上，已经出发过的不再重复触发

- .native
  
  - 把一个vue组件转化为一个普通的HTML标签，使用.native修饰符来操作普通HTML标签是会令事件失效。

键盘修饰符

> 键盘修饰符是用来修饰键盘事件（onkeyup，onkeydown）的

- 普通键（enter、tab、delete、space、esc、up...）
- 系统修饰键（ctrl、alt、meta、shift...）

鼠标按钮修饰符

- left 左键点击
- right 右键点击
- middle 中键点击

v-bind修饰符

- async
- prop
- camel

### 10

- 无状态函数无生命周期

- 不需要实例化，无this指向

### 11

> - [不同的历史模式 | Vue Router](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
> - [浏览器对象history的pushState()_history.pushstate-CSDN博客](https://blog.csdn.net/yy168888/article/details/108792874?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108792874-blog-88563003.235%5Ev38%5Epc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-108792874-blog-88563003.235%5Ev38%5Epc_relevant_sort_base3&utm_relevant_index=1)

- hash模式
  
  - 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。内部传递的实际 URL 之前使用了一个哈希字符（#），在 SEO 中确实有不好的影响。

- history模式
  
  > [HTML5](https://so.csdn.net/so/search?q=HTML5&spm=1001.2101.3001.7020)为history对象添加了两个新方法，history.pushState()和history.replaceState()，用来在浏览历史中添加和修改记录。
  > 
  > 依赖 HTML5 History API 和服务器配置。
  
  - 由于我们的应用是一个单页的客户端应用，直接访问包含多段路径的url，会导致匹配失败，得到一个 404 错误。
  
  - 在你的服务器上添加一个简单的转发处理
    
    - nginx 增加 try_files \$uri \$uri/ /index.html;

### 14

跨域问题

> - [同源策略 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/computer-networks/web-security/same-origin-policy)

- 基础规则
  
  浏览器同源策略(协议、域名、端口)
  
  限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键的安全机制。

- 现象举例
  
  网站请求非同源请求，请求响应被浏览器屏蔽。

- 解决办法
  
  - CORS
    
    - 服务端设置相应报文请求头(允许请求服务器资源的域名，\*代表任意): Access-Control-Allow-Origin: \*;
    
    - 还有其他Access-Control开头的参数
  
  - vue-cli devServer proxy代理(只限于开发期间)
  
  - nginx反向代理转发请求
    
    - http层
    
    - server层
    
    - location层
    
    - rewrite
    
    - index
    
    - tryfiles
    
    - proxy_pass
    
    - upstream

### 15

> - https://fe.ecool.fun/topic/a88670ef-a898-4676-a272-cabf8bdfade7?orderBy=updateTime&order=desc&tagId=14
> 
> - [依赖注入 | Vue.js](https://cn.vuejs.org/guide/components/provide-inject.html)

- props

- \$emit和v-on

- 依赖注入
  
  > 更便捷的方式为后代组件提供数据
  
  - inject注入
    
    ```vue
    export default {
      inject: ['message'],
      data() {
        return {
          // 基于注入值的初始数据
          fullMessage: this.message
        }
      }
    }
    ```

- provide提供
  
  ```vue
  import { computed } from 'vue'
  
  export default {
    data() {
      return {
        message: 'hello!'
      }
    },
    provide() {
      return {
        // 显式提供一个计算属性
        // 使用函数的形式，可以访问到 `this`
        message: computed(() => this.message)
      }
    }
  }
  ```

- ref
  
  > 直接访问组件实例

- EventBus
  
  > 适合兄弟组件传值
  
  - 创建一个中央事件总线`EventBus`
  
  - 兄弟组件通过`$emit`触发自定义事件，`$emit`第二个参数为传递的数值
  
  - 另一个兄弟组件通过`$on`监听自定义事件
  
  ```javascript
  // 创建一个中央时间总线类  
  class Bus {  
    constructor() {  
      this.callbacks = {};   // 存放事件的名字  
    }  
    $on(name, fn) {  
      this.callbacks[name] = this.callbacks[name] || [];  
      this.callbacks[name].push(fn);  
    }  
    $emit(name, args) {  
      if (this.callbacks[name]) {  
        this.callbacks[name].forEach((cb) => cb(args));  
      }  
    }  
  }  
  
  // main.js  
  Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
  // 另一种方式  
  Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能  
  ```

- vuex
  
  > 单例模式数据存储源
  
  - state 数据
  
  - getters 获取数据
  
  - mutations 更新数据，支持同步，最小操作单元
  
  - actions 更新数据，支持异步，批量操作mutations

### 17

> - https://fe.ecool.fun/topic/d32689f1-49ec-4eae-97f4-583fe5362c3b?orderBy=updateTime&order=desc&titleKey=vue-loader

vue-loader 指vue加载器。通过vue-loader，webpack 可以将 .vue 文件转化为浏览器可识别的javascript。

主要作用是解析和转换.vue文件。提取出其中的script(js代码)、style(css代码)、template(HTML模版代码)，把它们交给对应的loader去处理。

### 18

> - [Vue中的v-el与v-ref-CSDN博客](https://blog.csdn.net/ZZY1078689276/article/details/83716459)

- v-el 通过`v-el`我们可以获取到`DOM`对象。this.els[key] = 该DOM对象字符串 

- v-ref 通过`v-ref`获取到整个组件（`component`）的对象。this.refs[key] = 对应组件对象

### 26

> - 
> 
> - [☀️Vue2.0为什么不能检查数组的变化？又该如何解决？_为什么vue2中无法改数组中单独索引的值_°PJ想做前端攻城狮的博客-CSDN博客](https://blog.csdn.net/weixin_43745075/article/details/117717010?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169980653616800211512968%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169980653616800211512968&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-1-117717010-null-null.142^v96^pc_search_result_base5&utm_term=Vue2.0%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E6%A3%80%E6%9F%A5%E6%95%B0%E7%BB%84%E7%9A%84%E5%8F%98%E5%8C%96%EF%BC%8C%E8%AF%A5%E6%80%8E%E4%B9%88%E8%A7%A3%E5%86%B3&spm=1018.2226.3001.4187)

Vue响应式不足

- 无法检测数组/对象的新增。

- 无法检测通过索引改变数组的操作。

vue2由于响应式原理实现方案和性能的平衡(需要进行遍历处理)的原因没有进行修复。

vue3通过proxy代理方式已经解决这个问题。

处理方法

- 无法检测数组/对象的新增
  
  - this.$set(obj, key ,value) - 可实现增、改
  
  - watch时添加`deep：true深度监听`，只能监听到属性值的变化，新增、删除属性无法监听
    
    ```javascript
    this.$watch('blog', this.getCatalog, {
        deep: true
        // immediate: true // 是否第一次触发
      });
    ```
  
  - watch时直接监听某个key
    
    ```javascript
    watch: {
      'obj.name'(curVal, oldVal) {
        // TODO
      }
    }
    ```

- 无法检测通过索引改变数组的操作问题
  
  - this.\$set(array, index, data)
  
  - splice 可监听
  
  - 利用临时变量进行中转

### 27

原型基本规则

- 函数创建过程中会按照特定的规则为这个函数创建一个 prototype 属性。该属性指向其原型对象。

- 默认情况下，所有原型对象自动获得一个名为constructor的属性，指回与之关联的构造函数。

- 实例对象有内部特性[[prototype]] (浏览器提供了_\_proto_\_)指向原型对象。

- 原型链都会终止于 Object 的原型对象，而Object 原型的原型是 null。

简单理解

- 实例对象指向原型对象

- 原型对象依赖于另一个原型对象

- 相互依赖的原型形成的一条链路就是原型链。可以通过原型链获取父级的属性方法。

- 作用可以作为实现继承的基础规则，常用的寄生组合式继承和class继承也是基于原型链。

### 28

- 箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。
  
  > 箭头函数没有原型，原型是undefined。

- 箭头函数this指向全局对象，而函数指向引用对象。
  
  所以call，apply，bind方法也改变不了箭头函数的指向
  
  > - 在标准函数中，this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值(在网页的全局上下文中调用函数时
  > 
  > - 在箭头函数中，this 引用的是定义箭头函数的上下文。this 引用的都是 window 对象。

### 30

```html
<transition :name="transitionName"> // 过度动画组件 
  <keepalive :include="keepAliveList"> // 缓存组件
    <router-view></router-view> // 路由组件
  </keepalive>
</transition>
```

### 36

主要是由于v-if和v-for的优先级的关系。当两个指令在同一个标签上时，导致在遍历的时候处理不必要的操作(计算v-if的处理)。

vue2 v-for > v-if

vue3 v-foe < v-if

推荐不要同时在一个标签上处理。

### 37

显示效果优化-懒加载

- v-clok指令 解决插值表达式页面闪烁问题

### 41

期约状态机Promise的状态

> Promise是一种常用的异步解决方案，解决回调地狱的问题。

- pending

- fulfilled(resolved)

- rejected

### 46

> - [Vue2 &amp; Vue3生命周期对比 - 暴躁老砚 - 博客园](https://www.cnblogs.com/Yan3399/p/17587182.html)

### 50

> - [API — Vue.js](https://v2.cn.vuejs.org/v2/api/#Vue-extend)

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

> 然后可以进行一个子类组件的挂载。

### 52

> - [API — Vue.js](https://v2.cn.vuejs.org/v2/api/#Vue-set)

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。

### 57

> - https://fe.ecool.fun/topic/d6b01c3c-e671-4edf-a739-35745ff5119e?orderBy=updateTime&order=desc&titleKey=%E5%BE%AE%E4%BB%BB%E5%8A%A1

在修改数据之后立即使用这个方法，获取更新后的 DOM数据。

主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法。DOM加载是宏任务，宏任务完成之后会立即执行微任务。

宏任务和微任务的区分是为了更好地协调任务的执行优先级，提高 JavaScript 的运行效率和代码的可读性。

宏任务的优先级要高于微任务，微任务的执行在当前宏任务执行结束后立即进行。

宏任务

- setTimeout 和 setInterval 定时器
- DOM 事件处理程序
- AJAX 请求的回调函数
- script 标签的加载和执行

微任务

- Promise 的 then 方法和 catch 方法
- async/await 中的 await 表达式
- MutationObserver 监听器

### 62

> - [vue——vuex中的辅助函数-CSDN博客](https://blog.csdn.net/YUHUI01/article/details/84201419)

vuex提供了辅助函数处理庞大的vuex数据，mapState，mapGetters，mapMutations，mapActions，实际就是把state、getters、mutations、actions整合成一个数组，一次性返回。

mapState绑定computed

mapGetters，mapMutations，mapActions绑定metheds

### 80

会：push() pop() shift() unshift() splice() sort() reverse()  能检测变动触发set，进行页面更新。

不会：filter() concat() slice() map()  新数组替换旧数组 不会改变原数组，不会触发set。页面不更新    不会被拦截。

不会：数组索引修改数据、对象未通过Object.defineProperty新增字段。

Vue.set / this.$set  重新赋予响应式能力，强制更新监听。

Vue2和3响应式原理和区别

- Object.defineProperty API 的局限性最大原因是它只能针对单例属性做监听。为每个属性设置了 getter、setter。所以Vue 只能对 data 中预定义过的属性做出响应。

- Proxy API的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作， 这就完全可以代理所有属性。拦截器会处理所有更新操作。

### 107

- 虚拟DOM diff处理key的规则

旧虚拟DOM中找到了与新虚拟DOM相同的key

1. 若虚拟DOM中的内容没有变，直接使用之前的真是DOM

2. 若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

旧虚拟DOM中未找到与新虚拟DOM相同的key

1. 根据数据创建新的真实DOM，随后渲染到页面
- key作为节点的标识帮助虚拟DOM进行更快的diff计算。

### 114

- 全局指令： 通过 Vue.directive() 函数注册一个全局的指令。
- 局部指令：通过组件的 directives 属性，对该组件添加一个局部的指令。

应用场景

一键复制

懒加载

防抖

自定义指令的钩子函数

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

钩子函数参数(即 el、binding、vnode 和 oldVnode)

- el：指令所绑定的元素，可以用来直接操作 DOM。

- binding：一个对象，包含以下 property：
  
  - name：指令名，不包括 v- 前缀。
  
  - value：指令的绑定值。
  
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中用。无论值是否改变都可用。
  
  - expression：字符串形式的指令表达式。
  
  - arg：传给指令的参数。
  
  - modifiers：一个包含修饰符的对象。
  
  - vnode：Vue 编译生成的虚拟节点。
  
  - oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

图片懒加载默认背景色功能

```html
<div id="app" v-image = "item " v-for="item in imageList"></div>
<script>
Vue.directive("image", {
    inserted: function(el，binding){
         var color = Math.floor(Math,random()*1000000)
         el.style.backgroundColor = "#" + color
         var img = new Image()
         img.src = binding.value
         img.onload = function(){ 
           el.style.backgroundImage =  “url(” + binding.vaule + ")"
         }
     }
 })
 new Vue({
        el: "#app",
        data: {
            imageList: [
                {
                    url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-p10-plus.jpg"
                },
                {
                    url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-watch2-pro-banner.jpg"
                },
                {
                    url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/homepage/section4/home-s4-matebook-x.jpg"
                }
            ]
        }
    })
 </script>
```

### 120

> - [导航守卫 | Vue Router](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B)

导航守卫钩子(三种)

- 全局钩子
  
  - beforeEach() 前置
  
  - beforeResolve() 解析
  
  - afterEach() 后置

- 路由独享守卫
  
  - beforeEnter

- 组件钩子
  
  - beforeRouteEnter()
    
    ```
    // 不！能！获取组件实例 `this`
    ```
  
  - beforeRouteUpdate()
    
    ```
    在当前路由改变，但是该组件被复用时调用
    ```
  
  - beforeRouteLeave()
    
    ```
    导航离开该组件的对应路由时调用
    ```

导航守卫解析流程
