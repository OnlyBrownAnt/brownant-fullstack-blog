# Web性能优化

总结常见的Web性能处理技巧。

每个功能可能会有很多种实现方法，我觉得选择指标通常有两个，最优性能、最大平衡(业务和性能)。

只有知道如何实现最好性能效果下，才能做好取舍。

## Docs
- [Performance](https://developer.mozilla.org/zh-CN/docs/Learn/Performance)

## Web性能优化的理由

主要的方向有两个，用户体验和资源优化。
> 用户体验是为了赚，资源优化是为了省。

- 优化用户体验，提高用户留存率，提高业务转化率。
- 优化资源使用，减少服务压力，提高健壮性。

## 什么是Web性能优化

TODO

## 浏览器的工作原理
- [How_browsers_work](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- [Critical_rendering_path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)

根据MDN的[How_browsers_work](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)文档进行浏览器基本的工作原理的细节梳理和总结。

### 基本流程
1. [导航](./WebPerformance#导航)
2. [DNS查询](./WebPerformance#dns查询)
3. [TCP握手](./WebPerformance#tcp握手)
4. [TLS协商](./WebPerformance#tls协商)
5. [响应](./WebPerformance#响应)
6. [解析(Parsing)](./WebPerformance#解析)
    - 解析步骤
        - [构建DOM树(Building the DOM tree)](./WebPerformance#构建dom树)
        - [构建CSSOM树(Building the CSSOM tree)](./WebPerformance#构建cssom树)
        - [JavaScript编译](./WebPerformance#javascript编译)
    - 解析步骤附加
        - [预加载扫描器](./WebPerformance#预加载扫描器)
        - [无障碍树](./WebPerformance#无障碍树)
7. [渲染(Render)](./WebPerformance#渲染)
    - 渲染步骤
        - [样式(Style)](./WebPerformance#样式)
        - [布局(Layout)](./WebPerformance#布局)
        - [绘制(Paint)](./WebPerformance#绘制)
        - [合成(Compositing)](./WebPerformance#合成)
8. [交互](./WebPerformance#交互)

### 基本流程关键点
#### 导航
- 浏览器输入Url，提交链接。
- 浏览器进行Url格式检查。

#### DNS查询
- DNS解析获取实际IP地址。
- DNS解析过程涉及到缓存查询。

#### TCP握手
- 获取实际IP地址后，浏览器与服务器进行交互。发起HTTP/HTTPS协议请求。
- TCP三次握手建立连接。

#### TLS协商
- 请求是HTTPS协议时，需要进行TLS协商建立加密通讯连接。
- TLS五次握手建立安全连接。

#### 响应
- 浏览器建立成功后，浏览器就代表用户发送一个初始的HTTP GET请求。
- 对于网站来说，这个请求通常是一个 HTML 文件。一旦服务器收到请求，它将使用相关的响应头和HTML的内容进行回复。 

#### 解析(Parsing)
- “解析”是指浏览器将通过网络接收的数据转换为DOM和CSSOM的步骤，通过渲染器把DOM和CSSOM在屏幕上绘制成页面。
- 解析器解析时的特点
    - 解析器处理HTML文档，从上至下进行扫描处理，并执行具体的解析步骤。
    - 解析器处理过程中，构建DOM树、构建CSSOM树、JavaScript编译这三个步骤是同时进行的。但是存在阻塞情况。
    - 解析过程中存在的阻塞情况
        - 当解析器请求和下载JavaScript脚本时，会停止HTML解析，即会阻塞构建DOM树、构建CSSOM树这两个过程。
            >  \<script\> 标签（特别是没有 async 或者 defer 属性的）
        - 当解析器请求和下载CSS资源时，会阻塞JavaScript脚本的处理，但是不会阻塞HTML的解析或者下载。


##### 构建DOM树(Building the DOM tree)
- DOM = Document Object Model Tree
- 处理过程：处理HTML标记并构造DOM树。HTML解析涉及到符号化和树的构造。HTML标记包括开始和结束标记，以及属性名和值。如果文档格式良好，则解析它会简单而快速。解析器将标记化的输入解析到文档中，构建文档树。

##### 构建CSSOM树(Building the CSSOM tree)
- CSSOM = CSS Object Model Tree
- 处理过程：处理CSS并构建CSSOM 树。CSS对象模型和DOM是相似的。DOM和CSSOM是两棵树。它们是独立的数据结构。浏览器将CSS规则转换为可以理解和使用的样式映射。浏览器遍历CSS中的每个规则集，根据CSS选择器创建具有父、子和兄弟关系的节点树。
- CSSOM树包括来自用户代理样式表的样式。

##### JavaScript编译
- JavaScript 会被解析、编译和解释。脚本被解析为抽象语法树AST。有些浏览器引擎会将抽象语法树输入编译器，输出字节码。这就是所谓的JavaScript 编译。
- 大部分代码都是在主线程上解释的，但也有例外，例如在 web worker 中运行的代码。

##### 预加载扫描器
- 预加载扫描仪提供的优化减少了解析器处理过程中的阻塞。
- 浏览器构建DOM树时，这个过程占用了主线程。当这种情况发生时，预加载扫描仪将解析可用的内容并请求高优先级资源，如CSS、JavaScript和web字体。

##### 无障碍树
- 浏览器还构建辅助设备用于分析和解释内容的无障碍树。无障碍对象模型（AOM）类似于 DOM 的语义版本。

#### 渲染(Render)
- 渲染作用：解析步骤中创建的 CSSOM 树和 DOM 树组合成一个渲染树，然后用于计算每个可见元素的布局，然后将其绘制到屏幕上。
##### 样式(Style)
- 将 DOM 和 CSSOM 组合成渲染树。计算样式树或渲染树的构建从 DOM 树的根开始，遍历每个可见节点。

##### 布局(Layout)
- 布局是确定呈现树中所有节点的宽度、高度和位置，以及确定页面上每个对象的大小和位置的过程。
- 回流(重排)是对页面的任何部分或整个文档的任何后续大小和位置的确定。
- 第一次确定节点的大小和位置称为布局。随后对节点大小和位置的重新计算称为回流(重排)。
- 重绘是当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，叫做重绘。
- 每次回流必会触发重绘。但是重绘不一定是由回流引起。

##### 绘制(Paint)
- 将各个节点绘制到屏幕上，第一次出现的节点称为 first meaningful paint (en-US)。
- 在绘制或光栅化阶段，浏览器将在布局阶段计算的每个框转换为屏幕上的实际像素。绘画包括将元素的每个可视部分绘制到屏幕上，包括文本、颜色、边框、阴影和替换的元素（如按钮和图像）。
- 绘制可以将布局树中的元素分解为多个层。将内容提升到 GPU 上的层（而不是 CPU 上的主线程）可以提高绘制和重新绘制性能。分层确实可以提高性能，但是它以内存管理为代价，因此不应作为 web 性能优化策略的一部分过度使用。

##### 合成(Compositing)
- 当文档的各个部分以不同的层绘制，相互重叠时，必须进行合成，以确保它们以正确的顺序绘制到屏幕上，并正确显示内容。
- 当页面继续加载资源时，可能会发生回流（比如图像请求加载），回流会触发重新绘制和重新组合。

#### 交互(Interactivity)
- load 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。(页面 DOM 和依赖资源都加载完成就触发)
- load 事件也可以用onload事件处理器属性处理。
- DOMContentLoaded 事件，当 HTML 文档完全解析，且所有延迟脚本下载和执行完毕后，会触发 DOMContentLoaded 事件。它不会等待图片、子框架和异步脚本等其他内容完成加载。(页面 DOM 加载完成就触发，无需等待依赖资源的加载)
- 主线程绘制页面完成，触发load事件，可以执行滚动、触摸和其他交互操作。

### 基本流程总结
个人认为浏览器加载网页的过程有两个大的阶段。

一是浏览器与服务器建立连接的阶段。二是浏览器与服务器交互数据渲染网页页面的阶段。

### 关键渲染路径总结
- [Critical_rendering_path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path)
- [彻彻底底讲明白浏览器渲染面试细节](https://juejin.cn/post/6844904126451548173)

关键渲染路径就是浏览器将 HTML、CSS 和 JavaScript 转换为屏幕上的像素所需执行的一系列步骤。

核心就是 解析 + 渲染两个大步骤。有六个小步骤，其中DOM、CSSOM、Style、Layout、Paint就是必须的步骤。Compositing只是必要时才触发。

### 加载网页优化方向
- 优化HTML解析过程
    - 避免javasript资源下载阻塞解析主线程。使用async或者defer属性设置加载JS资源方式。
        - async表示js资源会和DOM解析同时进行，不影响DOM解析过程，DOM解析过程可以在js资源加载执行之前结束。
        - defer表示js资源会在DOM其他资源解析之后最后才进行，当js资源加载执行完成后，DOM解析过程全部完成。
        - 页面能显示并不代表DOM文档解析完成，只是部分DOM渲染完成结束了白屏时间。但是可能还有其他延迟脚本在加载执行中。这个时间段是无法进行交互操作的。及load事件还没触发。
    - 尽量减少HTML网页上需要处理的资源。比如较大的JS资源包。
    - 加载资源引入速度，采用CDN引入资源。
    - 避免DOM层数嵌套过多。过多过深的DOM节点层数会增加构建DOM树所需的时间。
- 减少回流(重排)现象
    - 懒加载，添加占位符避免回流

## 性能排查
### 性能排查工具

#### 谷歌开发者工具(Chrome Devtools)
- [Analyze runtime performance - Chrome for Developers](https://developer.chrome.com/docs/devtools/performance/)
- [Memory terminology - Chrome for Developers](https://developer.chrome.com/docs/devtools/memory-problems/memory-101/)
- [vitals](https://web.dev/articles/vitals?hl=zh-cn)
  > 核心网页指标，在Chrome Performance中使用。

##### Preformance标签
- 录制动作期间的性能参数变化，分析动态的性能变化，允许手动GC测试。
- 通过其中的Timeline 时序图查看性能参数变化趋势。

###### Performance图表
- Main: 查看页面主线程上发生的活动。
- Network: 查看资源的网络下载情况。

###### Performance参数
- Idle Frame: 空闲框架，可以简单认为是白屏时间。
- DCL: 指DomContentLoaded事件触发时间。
- L: 指load事件触发事件。

##### Memery
- 导入或者新建当前堆内存快照，分析内存快照，允许手动GC测试。
- 允许录制动作期间的堆内存变化，用于分析更具体的内存变化。

### 性能排查实战-内存问题
#### 浏览器
- [使用 Chrome Devtools 分析内存问题 - OKKI前端团队](https://fe.okki.com/post/62cbfea7136f570343d89416/) 
- [Js性能优化之内存问题的表现和监控 - 掘金](https://juejin.cn/post/7029477351310229541)

##### 排查步骤
TODO

#### Node
- [淘系前端团队](https://fed.taobao.org/blog/taofed/do71ct/how-to-find-memory-leak/)

TODO

### 性能排查实战-script标签的defer、async效果比较
#### 基本思路
增加引入jQuery.js脚本。比较默认、async、defer这三种情况下的Performance性能参数。来表示defer、async的特点。

#### 需要关注的Performance参数或者图表
- Network图表
    - jQuery.js的下载情况。
- Main图表
    - Idle Frame
    - DCL
    - L

#### 对比测试
##### 默认配置
###### 代码
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
  </head>
  <body>
    <div>Vite Demo Now</div> 
  </body>
</html>
```

###### 现象说明
![default png](/img/docs/extension/webPerformance/default.png)
- idle frame一直持续到JS下载加载执行完成之后才结束。
- DCL在JS下载加载完成之后触发。

##### defer配置
###### 代码
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script defer type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
  </head>
  <body>
    <div>Vite Demo Now</div> 
  </body>
</html>
```

###### 现象说明
![defer png](/img/docs/extension/webPerformance/defer.png)
- idle frame在JS下载加载执行完成之前就结束了。
- DCL在JS下载加载完成之后才触发。

##### async配置
###### 代码
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script async type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.0.js"></script>
  </head>
  <body>
    <div>Vite Demo Now</div> 
  </body>
</html>
```

###### 现象说明
![async test](/img/docs/extension/webPerformance/async.png)
- idle frame在JS下载加载执行完成之前就结束了。
- DCL在JS下载加载完成之前就触发了。

#### 分析和总结

##### 现象分析
- DCL指DomContentLoaded事件，表示DOM文档完成解析完成，而且延迟的脚本任务也全部加载执行完成。只是不会包括图片等资源加载完成。
- L指load事件，表示DOM文档解析完成，图片等资源也全部加载完成。
- JS脚本下载部分由预加载扫描器处理，但是加载执行部分在默认和defer情况下还是严格按照DOM解析流程的设置进行，如果是async情况下，会同时进行。
- 默认情况下，DOM文档解析过程，JS脚本下载加载执行之后，后续才解析到DOM节点部分，才能显示页面。所以白屏时间较长。
- defer情况下，JS脚本加载执行部分不影响DOM节点部分。不过最后在JS脚本加载执行完成后，才算DOM解析完成。触发DCL。
- async情况下，未等到JS脚本执行，当DOM解析完成后就直接触发了DCL。说明两部分是同时进行的。

##### 总结
JS脚本下载部分由预加载扫描器处理。

但是在JS加载执行部分，deder情况下会让JS加载执行排列到DOM解析流程作为最后一个步骤执行。
async情况下会让JS加载执行和DOM解析流程异步进行，互不干扰。