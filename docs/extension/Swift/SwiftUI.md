# SwiftUI

## 文档
[官方快速教程](https://developer.apple.com/tutorials/swiftui#swiftui-essentials)

[官方快速教程首页](https://developer.apple.com/tutorials/swiftui)

[官方快速教程案例](https://developer.apple.com/tutorials/app-dev-training)

[官方基础概念教程](https://developer.apple.com/tutorials/swiftui-concepts/exploring-the-structure-of-a-swiftui-app)

[官方文档](https://developer.apple.com/documentation/swiftui/)

[优质教程-youtube](https://www.youtube.com/watch?v=mzJsd_e1JP4)

[优质教程平台(designcode)](https://designcode.io/)

[rive-ios](https://github.com/rive-app/rive-ios)

[IOS工具下载-官方](https://developer.apple.com/download/all/?q=for%20Xcode)

[swiftUI-开源案例-github](https://github.com/amosgyamfi/open-swiftui-animations)

[优质教程-hackingwithswift](https://www.hackingwithswift.com/100)

[优质教程-animations](https://twitter.com/gordonphayes/status/1617535312313610247)

## 总结
### 常见关键词
H horizontal 横向
V vertical 垂直
Z z-axis z轴
### swiftUI实践经验
[博客-info](https://www.infoq.cn/article/c5NSWBA003UHfvBpYu4Y)
这位开发人介绍了使用swiftUI完成项目的经历，以及比较特别的开发遇到的问题。

### SwiftUI动画教程
#### 文档
[优质动画教程平台](https://designcode.io/)
[推荐教程-designcode](https://designcode.io/swiftui-rive-animated-app)

### some Scene {}
#### 文档
https://swiftgg.gitbook.io/swift/yu-yan-can-kao/03_types?q=some+a

#### 总结
some的作用
文档引用: [1]
some定义不透明类型
不透明类型定义了一个遵循某个协议或者合成协议的类型，但不需要指明底层的具体类型
只有当一个值的类型遵循该协议或者组合协议，或者从该类继承的时候，这个值才能作为这个不透明类型的实例使用。

some Scene定义了Scene协议，其后的{}中表示Scene实例，实例中是符合Scene协议的场景。

### color
文档
[官方color文档](https://developer.apple.com/documentation/swiftui/color)

#### 总结

使用Color时颜色不生效
文档引用: [1]

#### 现象
Color(".yellow")  "NamedColor(name: ".yellow", bundle: nil)\n" 在backgroud中不生效
Color(.yellow)  "UIExtendedSRGBColorSpace 1 1 0 1\n" 在backgroud中生效

Color(".yellow")表示搜索颜色资源的捆绑包。如果您不指定捆绑包，则初始化程序默认会在您的应用程序的主捆绑包中查找。
而Color(.yellow)则是直接使用了颜色资源.yellow，所以是可以的。

奇怪的是既然有颜色资源.yellow，那么去主捆绑包找不到颜色资源又是为什么？

#### 动画

##### 可以使用riv图片实现更多局部的动态效果
减少程序上的设计花销

#### 卡片动画
##### 文档
https://www.hackingwithswift.com/books/ios-swiftui/moving-views-with-draggesture-and-offset

