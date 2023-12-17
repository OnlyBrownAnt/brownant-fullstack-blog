# Flutter 资料

## 文档
- [flutter.dev](https://flutter.dev/)
- [flutter.dev-cn](https://flutter.cn/)

## 优质案例
- [Reflectly](https://www.agiratech.com/top-10-successful-apps-made-using-flutter)
- [Best-Flutter-UI-Templates](https://github.com/mitesh77/Best-Flutter-UI-Templates)
- [企业微信-flutter经验分享](https://www.cnblogs.com/88223100/p/Cross-terminal-integration-practice-of-WeChat-Flutter-and-large-native-projects.html)
- [gallery](https://gallery.flutter.cn/#/)
- [up主-B站](https://space.bilibili.com/589533168)


## 总结
### 为什么选择Flutter
技术选型是以需求作为判断标准的。审视自己的需求，主要有两个角度，角度一是个人创业，希望产品有精美的动画效果、有良好的跨端能力、有活跃的社区支持。角度二是职业发展需要，目前或者未来的市场需要什么职业，什么职业机会更多。

从个人创业角度来看，其实我更希望使用Swift、SwiftUI IOS原生开发技术，主要考虑到的是Apple生态的跨端适配和SwiftUI的优美动画效果。但是缺点是不支持Android的跨端。而且没有OC和UIKit的基础，需要花费更多的精力和时间。Flutter在跨端能力上很好，不过也有缺点，原生能力支持都依赖于第三方库进行实现。因为本质上Flutter只是UI层的跨段，调用原生功能并不是那么容易。目前大多方法都是通过第三方库支持，不过从社区的热度来看，这一块与原生交互的第三方包应该也能得到很好的发展。

从职业发展角度来看，目前各种前端框架的成熟也让入门更加容易，初中级前端内卷的实在太厉害。要想保持未来的竞争力(更重要的是保住头发)，提高跨端开发能力是个很好的主意。目前Flutter在国外比较火，国内用的相对没那么多。但是在经济复苏的阶段，这种效益高的技术我觉得会更流行，因为成本控制始终是个跨不过去的话题，特别是在新创企业中。通过Flutter实现跨端的功能，进行更快的业务验证。这也是为什么H5如此流行的原因之一。(但是太卷了，市场供给大于需求)

总而言之，Flutter在未来会有比较好的发展，不只是国内，还可以往国外发展。值得一学，之后还可以以此为基础向底层学习，提高综合跨端能力。

#### 附录
- [Flutter 会成为弃子吗？](https://www.zhihu.com/question/452367773)
- [Flutter 正在被悄悄放弃吗？](https://www.zhihu.com/question/485985051)
- [IOS开发选择Swift还是fluter-知乎](https://www.zhihu.com/question/371476171/answer/2413121232)
- [移动端混合开发选型方案分析-info](https://xie.infoq.cn/article/6090459ba86024fa54a7e7d22)

### 其他的跨端方案
国内比较火的跨端方案除了flutter有uni-app和React-Native。另外我在从事的一家公司之前使用过一个内部跨端方案Tiny，和React-Native的实现思路比较类似，采用虚拟Dom映射原生组件的方式来实现跨端，但是和uni-app相同的是都不开源。

在跨端方案上，目前看来无论是性能还是兼容性，Flutter无疑是潜力更大。但是uni-app的跨端还支持了微信小程序等应用，而且支持Vue技术栈，适合前端开发了解。

#### 附录
uni-app
- [uni-app](https://uniapp.dcloud.net.cn/)

React-Native
- [React Native Demo](https://reactnativeexample.com/)