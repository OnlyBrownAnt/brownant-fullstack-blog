# React 主题方案

在一个前端应用中，通常而言会使用自己封装的组件库，因为可以更方便的定制化规范。但是总有些情况，比如因为时间或者实际效果的原因，需要引入第三方组件。所以需要一个公共的主题切换方案，来实现统一的主题切换效果。

## 主题方案调研

### 参考文档

- [个人实践几种React在线主题切换方案(掘金)](https://juejin.cn/post/7003315163625422879)
- [styled-components](https://styled-components.com/docs/basics#getting-started)

### 方案分析

#### 1.基于CSS Variable的动态主题。

- [Using CSS custom properties (variables)(MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

参考Ant Design Pro的主题配置方案，修改顶层CSS Variable。参考链接 [动态主题(Ant Design Pro)](https://pro.ant.design/zh-CN/docs/dynamic-theme)

#### 2. 封装ThemeProvider方式(例如 material-ui的@mui/material/styles)。

- [Toggling color mode(material-ui)](https://mui.com/material-ui/customization/dark-mode/)

material-ui的Emotion style引擎提供了ThemeProvider组件和createTheme、useTheme来获取主题的变量。本质上是对SomeContext.Provider和createContext、useContext的高度集成封装。

material-ui的Emotion style引擎还提供了styled组件快速使用主题的变量。(封装的一套类似
styled-components的工具)

material-ui定义了常用主题变量参数(包括背景颜色、字体、间距、透明度等等)。允许进行动态修改。
参考material-ui的主题配置方案，组件需要按照规则进行细致的定制化处理。

#### 3. styled-components

其实也是封装ThemeProvider组件，对ThemeProvider进行封装处理。不过是一种公共的解决方案，可以自定义具体的规则。

material-ui也支持将styled-components替代自己默认的styled components引擎。(2021年，兼容性不好)

### 总结

方案 2 相对于方案 1 更麻烦，对于第三方组件需要组件进行深度定制化。但是主题兼容性更强，可配置内容也更多了。

推荐方案3，由于 material-ui 对 styled-components 的兼容性不好，所以自己中间增加一层兼容层，这样可以对多个 UI 库进行更兼容式的定制化。而且方便 React-Native 的开发。

基本思路

- 参考material-ui 设计一套全局 Theme，支持自定义局部UI库的映射关系。
- styled-components 会自动合并样式，然后自动生成 className 以供组件使用
- 支持 attrs 修改组件的属性，style 也是属于样式。不过对于样式还是推荐 class 方式进行修改。

### 定制主题化方案

#### 基础方案

1. 定义一个公共 ThemeProvider 组件适配器，其中包含了 styled-components 的 ThemeProvider 组件和各家的 UI 组件ThemeProvider 组件，(比如 material-ui)。然后各家的UI组件的主题变量和 styled-components 的主题变量存在映射关系。从而实现适配关系。
2. 适配性组件包裹最外层，用于传递主题变量
3. 默认的组件和各家的UI组件根据主题变量进行定制化
   1. styled-components 的 ThemeProvider 组件传递主题变量。useContext 可以获取 ThemeContext 的数据，而 styled 也支持props 中读取 Theme。
   2. material-ui 的 ThemeProvider 组件传递主题变量，useTheme 可以获取变量进行定制化。

#### 进阶需求

- 需要提供定义主题规则
- 主题初始化数据
- 修改主题的方法
