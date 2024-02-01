# echarts 总结

## Docs

- [echarts/get-started](https://echarts.apache.org/handbook/zh/get-started)
- [echarts/option](https://echarts.apache.org/zh/option.html#title)
- [echarts/api](https://echarts.apache.org/zh/api.html#echarts)
- [echarts-for-react](https://github.com/hustcc/echarts-for-react/tree/master)
  > 第三方 echarts React 组件库，可以参考实现思路进行项目定制。
- [React组件 -- echarts封装](https://juejin.cn/post/7295559402474815524?from=search-suggest#heading-0)
- [React hooks 封装 ECharts5 通用组件](https://juejin.cn/post/7235603140261937209?from=search-suggest)

## React 封装 echarts 容器型组件

### 封装思路

- 目的是封装一个容器型的 echarts 组件。
- 一些必要的参数，图表数据源、echarts宽高、渲染方式由父组件传入
- 考虑不同业务要求，需要通过 echarts 实例上处理不同事件。所以子组件需要传递 echarts 实例到父组件。因此组件封装采用 forwardRef 的方式。

### 封装步骤分析

1. echarts 定义系列类型和组件的TS类型(ComposeOption)
   - 基础组件
   - 图表组件
   - 系列类型
   - echarts 基础类型
   - echarts 图表类型 ComposeOption
2. echarts 注册必须的和可选的组件
   - 得到一个基础的 echarts 配置
3. 封装 echarts 组件
   - 组件封装成 forwardRef 类型
   - 定义入参 props 和出参 ref 的类型
   - 定义 echartsRef、echartsInstance 状态
   - echarts 组件初始化
     > 影响因素: props.options、ref
     - echarts.getInstanceByDom
     - echarts.getInstanceByDom 获取失败下进行 echart.init
   - 对父组件暴露实例
     - forwardRef
     - useImperativeHandle 只暴露 echarts 实例给父组件
   - 窗口变化监听
     > 影响因素: props.options
     - 重新设置窗口 resize 事件监听，重新适配窗口，开启过渡动画
   - 监听窗口位置参数
     > 影响因素: props.height、props.width
     - 重新适配窗口，开启过渡动画

### 封装实例

- [EChartsWrapper](https://github.com/OnlyBrownAnt/webpack-react-cli/tree/main/src/pages/EChartsWrapper)

## 常见问题

### vue3使用echarts

1. npm install echarts (可以先search查一下这个库是不是需要的)
2. 在mounted周期之后使用，因为涉及到dom调用。

### echarts设置图例组件的图标类型

文档:

1. https://echarts.apache.org/zh/option.html#legend.icon
   默认图标样式是跟随对应的数据类型(折线或者条形图)

### echarts挂载的element需要有明确的height和width，而且最好是在style中设置

文档:

1. https://blog.csdn.net/m0_67401228/article/details/123251834
   附加: 高度必须固定，宽度可以百分比

### 导包时推荐按需引入

导入echarts库的代码在执行时会很卡，在调试的时候每次加载都会很卡。
在打包的时候速度会很慢，然后包会更大。

所以无论从什么角度想，都最好进行按需引入。
具体需要引入什么内容，可以参考官方的示例工程，可以显示按需引入的代码。

### 在进行数据更新的时候，决定是否需要调用clear

如果是数据的递增，不需要clear，就不用再多渲染一次。
如果是查看新数据，那么可以clear，这样让效果重新加载，避免和之前的样式混乱。

### 封装拖动父组件使echarts子组件自适应的时候，echarts重复初始化闪烁

原因很简单，父组件传入子组件的props没有用useState进行控制，而子组件通过props的一些参数来控制useEffect内的echarts初始化代码执行。所以将父组件传入子组件的props增加useState受控即可。

### react-resizable 使用的时候注意要引入其配套 css

- css

```javascript
import "react-resizable/css/styles.css";
```

- webpack 的 css-loader 配置要增加该路径的css处理。
