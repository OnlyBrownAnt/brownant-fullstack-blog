# HTML总结

## Introduction
HTML的知识点总结，主要基于"HTML5权威指南"书籍进行学习总结。也包含HTML常见使用技巧总结。

## Docs
- "HTML5权威指南" Adam Freeman
- [开始学习 HTML - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/htmlreview/element-Introduction_to_htmlreview/element-Getting_started)
- [HTML Tutorial](https://www.w3schools.com/htmlreview/element-default.asp)
- [Glossary](https://developer.mozilla.org/en-US/docs/Glossary)
   > MDN Web 文档术语表：Web 相关术语的定义。

## 基础概念介绍
### HTML

[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)（HyperText Markup Language，超文本标记语言）是一种用来告知浏览器如何组织页面的*标记语言*。HTML 可复杂、可简单，一切取决于 web 开发者。

HTML 由一系列的[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)组成，这些元素可以用来包围或*标记*不同部分的内容，使其以某种方式呈现或者工作。

### HTML5
HTML5是由W3C(World Wide WebConsortium，万维网联盟)指定的HTML规范的最新版本，它是一系列用来制作现代富Web内容的相关技术的总称。

## HTML5基础
### HTML5概念解析
HTML5的变化方向是基本信念方面，倡导语义化原则。

### HTML5语义化
#### 介绍

   语义化就是将元素的语义与元素对其内容呈现结果的影响分离，呈现与语义分离原则是一种新的设计原则。

#### 解决了什么问题

   HTML5之前，部分标签存在语义和内容呈现结果混合的情况，比如`<b>`标签，用元素表示将文本加粗显示。
   
   而HTML5的语义化就是为了避免这种现象，让HTML元素负责文档内容的结构和含义，内容的呈现则由应用于元素上的CSS样式控制。

#### 优点
> 优点的核心是，呈现与语义分离原则的目的完全是为了让HTML文档更易于程序化处理。
>
> 随着HTML5的采用和实现愈加广泛，HTML内容的这种使用会日益增多。如果不关心标记的准确性和一致性，这样的HTML文档处理起来更为困难，用户能为其找到的用处也很有限。

1. 利于辅助技术处理
      
   （如视障用户的屏幕阅读器、屏幕阅读器）更好的阅读和转译你的网页，利于无障碍阅读。
2. 利于SEO

   爬虫程序处理。
3. 利于开发维护

   按照通用规范，开发者可以更快的理解并进行处理。

#### 语义化实践
- 不仅写 html 结构时，要用语义化标签，给元素写 css 类名时，JS 类名、方法名、变量命名等也要遵循语义化原则。不随意取名，不利于后期的代码重构和维护。同时，也最好不要用汉语拼音命名。
- 不要使用纯样式标签。如：b、font、u 等，改用 css 呈现样式。
- 尽可能少的使用无语义的标签 div 和 span。或者需要使用全局属性class进行语义化的声明。
- 需要强调的文本，可以包含在 strong 或 em 标签中，strong 默认样式是加粗（不要用 b），em 是斜体（不要用 i 标签）。
- 使用表格时，标题要用 caption，表头用 thead，主体部分用 tbody 包围，尾部用 tfoot 包围。表头和一般单元格要区分开，表头用 th，单元格用 td。
- 表单域要用 fieldset 标签包起来，并用 legend 标签说明表单的用途。
- 每个 input 标签对应的说明文本都需要使用 label 标签，并且通过为 input 设置 id 属性，在 lable 标签中设置 for=someld 来让说明文本和相对应的 input 关联起来。

#### 常见语义化元素
> 以一个博客为例子，从上至下，每个部分都可以用对应语义化元素。
> 
> 比如: 按照如下结构进行拆分，文章基本结构 头部(导航)、主体(简要描述、段落、插入评论、多媒体流内容、重点字体突出等)、页脚。
> - 头部区域header中存在导航nav。
> - 主体部分main和侧边栏aside部分并行显示，侧边栏aside作为一块独立区域显示评论等。
> - 文档描述details中需要有标题summary。
> - figcaption显示流内容时可以内嵌figure元素，显示标题文本。
> - 使用section分割文章段落，进行显示。
> - 使用footer作为页脚在元素底部显示内容。
> - mark标题元素用于突出文本，time元素用于格式化显示日期。

- `<header>`	定义了文档的头部区域
- `<nav>`	定义导航链接的部分
- `<main>`	定义文档的主体内容
- `<section>`	定义文档中的节（section、区段）
- `<article>`	定义页面独立的内容区域
- `<aside>`	定义页面的侧边栏内容
- `<details>`	用于描述文档或文档某个部分的细节
- `<summary>`	标签包含 details 元素的标题
- `<figure>`	规定独立的流内容（图像、图表、照片、代码等等）
- `<figcaption>`	定义 `<figure>` 元素的标题
- `<mark>`	定义带有记号的文本
- `<time>`	定义日期或时间
- `<footer>`	定义 section 或 document 的页脚

### HTML5元素
#### 元素类型
元素通常分为三大类。然后还有一些标签不属于任何类型，比如html、head、body它们属于文档框架描述相关的元素。

还有一种没有关闭标签或不需要关闭的HTML元素是Void元素。例如 `<br />`、`<img />`、`<hr />` 等。

- 元数据元素(metadataclement)

   元数据元素用来构建HTML文档的基本结构，以及就如何处理文档向浏览器提供信息和指示。
- 流元素(flowelement)

   流元素是短语元素的超集。这就是说，所有短语元素都是流元素，但并非所有流元素都是短语元素。
- 短语元素(phrasingelement)

   确定一个元素合法的父元素和子元素范围。

#### 元素选用原则
- 匹配语义选择元素。否则选择`div`、`span`这类通用元素，并使用全局属性class表示其含义。
- 不可滥用语义化元素。避免使用`b`这类非语义化元素。

#### 元素速览
按照使用场景进行分类，对大部分的元素进行简单说明和介绍。

##### Docs
- "HTML5权威指南" P92
- [HTML 元素参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

#### 元素组成
- 开始标签 + 内容 +  结束标签
- 自闭合标签

#### 元素属性
元素可以用属性(attribute)进行配置。

#### 元素属性特点
- 属性只能用在开始标签或单个标签 
- 属性具有名称和值两部分

##### 元素属性类型
###### 元素局部属性
某些元素有局部的属性和属性值。比如input元素具有type属性，定义input的类型。

###### HTML5全局属性
| 全局属性            | 说明                                       | 兼容性     |
| --------------- | ---------------------------------------- | ------- |
| accesskey       | 定义用于选择某个元素的快捷键                           |         |
| class           | 对元素进行分类，以便统 一其样式或用程序                     |         |
| contenteditable | 使元素的内容可被编辑                               |         |
| contextmenu     | 为元素添加快捷菜单                                | 暂无浏览器支持 |
| dir             | 指定元素内容的布局方向                              |         |
| draggable       | 声明元素可拖动                                  |         |
| dropzone        | 声明可将其他元素拖放到某个元素上                         |         |
| hidden          | 表示某个元素及其内容毋需关注，隐藏相关元素。                   |         |
| id              | 为元素分配一个独一无二的标识符                          |         |
| lang            | 声明元素内容所用语言。通常统一定义在html元素上，也可以单独定义在元素标签上。 |         |
| spellcheck      | 声明是否应检查元素内容的拼写错误                         |         |
| style           | 直接定义元素的样式(内联样式)                          |         |
| tabindex        | 指定HTML文档中元素的Tab键次序                       |         |
| title           | 为元素提供额外信息(通常显示为工具提示)                     |         |

###### 布尔属性
有些属性属于布尔属性，这种属性不需要设定一个值，也可以直接属性名添加到元素中即可。
```html
<!DOCTYPE html>
<html>
   <head>
      <body>
         Enter your name: <input disabled/>
      </body>
   </head>
</html>
```
###### 自定义属性(扩展属性)
   用户可自定义属性，这种属性必须以data- 开始。在这类属性名称之前添加前级data- 是为了避免与HTML的末来版本中可能增加的属性名冲突。可以使用自定义属性存放临时数据。

   这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过getAttribute方法获取。
```html
<!DOCTYPE html>
<html>
   <head>
      <body>
         Enter your name: <input disabled="true" data-creator="adam" data-purpose="collection"/>
      </body>
   </head>
</html>
```

### HTML5基本文档结构
HTML5的基本文档主要有四个元素(DOCTYPE、html、head、body)组成。

- DOCTYPE

   该元素的使用目的是为了标记文档内容所属的版本，并指定使用对应[浏览器的排版引擎模式](./HTMLReview#浏览器的排版引擎模式)
- html

   [HTML html元素表示一个 HTML 文档的根（顶级元素），所以它也被称为根元素。所有其他元素必须是此元素的后代。](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/html)
- head

   [HTML head 元素 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head)。常包含meta、link、style、script元素。
- body

   [HTML body 元素表示文档的内容。document.body 属性提供了可以轻松访问文档的 body 元素的脚本。](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body)
```html
<!DOCTYPE html>
<html>
   <head>
      <body>
         Enter your name: <input disabled/>
      </body>
   </head>
</html>
```

### HTML5实体
实体是浏览器用来替代特殊字符的一种代码。

比如`<`和`>`这两个字符。有时需要在文档内容中用到这些字符，但不想让它们被当做HTML处理。为此应该使 用HTML实体(entity) 。

![htmlreview/entity-1](@site/static/img/docs/htmlreview/entity-1.png "htmlreview/entity-1")

### HTML5元素使用
了解创建元素的使用场景和常用属性。

#### 创建HTML文档
![htmlreview/element-1](@site/static/img/docs/htmlreview/element-1.png "htmlreview/element-1")

#### 标记文字
![htmlreview/element-2](@site/static/img/docs/htmlreview/element-2.png "htmlreview/element-2")

#### 组织内容
![htmlreview/element-3](@site/static/img/docs/htmlreview/element-3.png "htmlreview/element-3")

#### 文档分节
![htmlreview/element-4](@site/static/img/docs/htmlreview/element-4.png "htmlreview/element-4")

#### 表格内容
![htmlreview/element-5](@site/static/img/docs/htmlreview/element-5.png "htmlreview/element-5")

#### 表单
![htmlreview/element-6](@site/static/img/docs/htmlreview/element-6.png "htmlreview/element-6")

#### 定制Input元素
![htmlreview/element-7](@site/static/img/docs/htmlreview/element-7.png "htmlreview/element-7")

#### 其他表单元素及输入验证
![htmlreview/element-8](@site/static/img/docs/htmlreview/element-8.png "htmlreview/element-8")

#### 嵌入内容
![htmlreview/element-9](@site/static/img/docs/htmlreview/element-9.png "htmlreview/element-9")


## 浏览器的排版引擎模式
[目前浏览器的排版引擎使用三种模式：怪异模式（Quirks mode）、接近标准模式（Almost standards mode）、以及标准模式（Standards mode）](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)

- 怪异模式（Quirks mode）

   在怪异模式下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。
- 标准模式（Standards mode）
   
   在标准模式下，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现。
   
   使用DOCTYPE元素可以进行声明，`<!DOCTYPE html>`唯一的作用是启用标准模式。大部分情况下浏览器默认的也是标准模式。
- 接近标准模式（Almost standards mode）

   在接近标准模式下，只有少数的怪异行为被实现。

## 常用元素解析
### DOCTYPE

该元素的使用目的是为了标记文档内容所属的版本，并指定使用对应[浏览器的排版引擎模式](./HTMLReview#浏览器的排版引擎模式)。

```html
<!DOCTYPE html>
```
> 使用标准模式

### meta
- "HTML5权威指南" P104 
- [meta: The metadata element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [Standard metadata names](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name)

meta是元数据元素，用于描述文档内容，不会呈现在页面上。一般是在head元素内部使用。

#### 局部属性
- name

   name和content属性一起使用。以名称-值形式提供文档元数据。name表示名称，content表示对应的值。
- content

   content通常和name、http-equiv属性一起使用。以名称-值形式提供文档元数据。name、http-equiv表示名称，content表示对应的值。 
- charset
   
   该属性声明文档的字符编码
- http-equiv

   指定特定 HTTP 标头的名称。搭配content属性使用。

   常用值
   - refresh
      - 重新加载页面之前的秒数 - 仅当content属性包含非负整数时。
      - 页面应重定向到另一个页面之前的秒数 - 仅当content属性包含非负整数后跟字符串`;url=`和有效 URL 时。
         ```html
         <meta http-equiv="refresh" content="3;url=https://www.mozilla.org" />
         ```
   - x-ua-compatible
      该content属性必须具有值"IE=edge"。表示要求IE8及以上的版本按照最新的标准去渲染。

#### 常用name值
- application-name 网页中运行的应用程序的名称。
- author 文档作者的姓名。
- description 页面内容的简短而准确的摘要。
- generator 生成页面的软件的标识符。
- keywords 与页面内容相关的单词，以逗号分隔。
- viewport 给出网页视口初始大小的规则。实现移动端浏览器的响应式布局。
   - width 让浏览器假定视口宽度，设备宽度参数有`device-width`纵向模式表示设备视口宽或`device-height`横向模式表示采用设备视口高度。
   - initial-scale 定义设备宽度（device-width纵向模式或device-height横向模式）与视口大小之间的比率。常用参数1.0。原则上当width=device-width时，设备宽度是网页的实际宽度，视口是实际看到的宽度。而实际设备宽度是不变的，所以如果设置initial-scale=2.0表示设备宽度比视口放大两倍，也就是视口缩小两倍，则内容会被放大2倍。
   - user-scalable 如果设置为no，用户将无法放大网页。默认为yes。浏览器设置可以忽略此规则，iOS10+默认忽略它。
   - viewport-fit 设置为cover值可以解决刘海屏的留白问题
- robots 声明爬虫或“机器人”应在页面上使用的行为。它的值采用逗号分隔列表。

### Link
#### 局部属性
- href 指定 link 元素指向的资源的URL。
- hreflang 指定 link 元素指向的资源的URL，所关联资源使用的语言。
- media 说明所关联的内容用于哪种设备。
- rel 说明文档与所关联资源的关系类型。
- size 指定图标的大小。
- type 指定所关联资源的MIME类型，如text/css、image/ x-icon。

## HTML5新特性概览
- 语义化标签（header、nav、main、section、article、aside、details、figcaption、figure、mark、summary、time、footer 等）
- Canvas 画布和 SVG 矢量图
- 拖放（Drag and drop）
- 音频、视频（audio、video）
- 地理定位（Geolocation）
- 本地离线存储（localStorage）长期存储数据，关闭浏览器后不丢失。
- 会话储存（sessionStorage）数据在关闭浏览器后自动删除。
- 表单控件（calendar、date、time、email、url、search）
- 新技术（Web Worker、Web Socket）
- 新的文档属性（document.visibilityState）

## SEO

### 什么是SEO？
搜索引擎优化 (SEO) 通常是指对网站的部分内容进行细微的修改。这些修改可能只是细微的改进，但与其他优化结合后，则可能会对网站的用户体验以及在自然搜索结果中的表现产生显著影响。

### Google Search
- [搜索引擎优化 (SEO) ](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?sjid=11435899345219434038-AP&hl=zh-cn)

## href、src的区别
- href 是 Hypertext Reference 的缩写，指向网络资源所在位置。会并行下载资源并且不会停止对当前文档的处理。
- src 是 source 的缩写，指向外部资源的位置。指向的内容将会嵌入到文档中当前标签所在位置或下载并应用到文档内，当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕。

## 常见图片格式
> 参考[img元素支持的图像格式](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#supported_image_formats)

- APNG（动画便携式网络图形） 无损动画序列的不错选择（GIF 性能较差）
- AVIF（AV1 图像文件格式）由于其高性能，对于图像和动画图像来说都是不错的选择。
- GIF（图形交换格式）简单图像和动画的不错选择。
- JPEG（联合摄影专家组图像）静态图像有损压缩的不错选择（目前最流行）。
- PNG（便携式网络图形）静态图像无损压缩的不错选择（质量比 JPEG 稍好）。
- SVG（可缩放矢量图形）矢量图像格式。用于必须以不同尺寸精确绘制的图像。
- WebP（网页图片格式）图像和动画图像的绝佳选择

## CSS精灵图技巧(sprite)
CSS精灵图也称为雪碧图，是一种图片拼接和裁剪技巧。

主要思路是在一张大图上通过background-position来设置定位点，然后固定大小元素进行显示。变相实现了在一张大图上进行小图的裁剪。

优点是节约了http请求，可以在一张大图上裁剪多个小图片。

准备工作是需要设计定义好大图片的大小，以及各个小图片位置和顺序，前端获取大图后进行定位显示。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <script  type="module" src="main.js"></script>
  </head>
  <body>
    <style>
      .bg {
        height: 400px;
        width: 400px;

        background-image: url(https://img1.baidu.com/it/u=3151123087,1494659345&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500);
        background-position: -100px 0px;
        background-repeat: no-repeat;
      }
    </style>
    <div class="bg">
    </div>
  </body>
</html>
```
## Canvas基础
### 介绍
- [Canvas-API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

Canvas API提供了一种通过JavaScript和HTML 元素绘制图形的方法`<canvas>`。除其他外，它还可用于动画、游戏图形、数据可视化、照片处理和实时视频处理。

Canvas API 主要关注 2D 图形。WebGL API也使用该`<canvas>`元素，绘制硬件加速的 2D 和 3D 图形。

### 基础使用
1. 获取指定canvas元素id
2. 访问对应canvas元素的渲染上下文(canvas.getContext)(CanvasRenderingContext2D的类型对象)
3. 进行绘制

### 常用Canvas API
- 基本绘图命令
```
设置开始绘图位置：ctx.moveTo(x,y);
设置直线到的位置：ctx.lineTo(x,y);
描边绘制：ctx.stroke();
填充绘制：ctx.fill();
自动闭合路径：ctx.closePath();
开启新的绘制：ctx.beginPath();
设置描边颜色：ctx.strokeStyle;
设置填充颜色：ctx.fillStyle;
保存开始设置：ctx.save();
重置到保存样式：ctx.restore();
```
- 线型相关属性
```
设置线宽：ctx.linewidth;(数字即可)
设置线末端类型：ctx.lineCap;('butt' 表示两端使用方形结束,'round' 表示两端使用圆角结束,'square' 表示突出的圆角结束)
设置相交线的拐点：ctx.lineJoin;('round' 使用圆角连接,'bevel' 使用平切连接,'miter' 使用直角转)
获得线段样式数组：ctx.getLineDash();
设置线段样式：ctx.setLineDash();(数组形式设置)
绘制线段偏移量：ctx.lineDashOffset;
```
- 矩形绘图命令
```
绘制矩形：ctx.rect;(因为还需要fill或者stroke才可以看见效果，所以直接使用下面两种)
绘制边框矩形：ctx.strokeRect(x,y,width,height);
绘制填充矩形：ctx.fillRect(x,y,width,height);
清除矩形区域：ctx.clearRect(x,y,width,height);
```
- 圆弧绘制命令
```
绘制圆弧：ctx.arc(x,y,r,startAngle,endAngle,anticlockwise);参数 anticlockwise 表示是否采用默认的正向角度, 如果传入 true 表示逆指针为正. 该参数可选
绘制文本命令
绘制填充文字：ctx.fillText(text,x,y);
绘制空心文字：ctx.strokeText(text,x,y);
设置字体样式：ctx.font;
设置字体水平位置：ctx.textAlign;(start(默认), end, left, right, center)
设置字体垂直位置：ctx.textBaseline;(top, middle, bottom, hanging, alphabetic, ideographic)
```
- 绘制图片命令
```
绘制图片(3参数)：ctx.drawImage(img,casx,casy);
绘制图片(5参数)：ctx.drawImage(img,casx,casy,width,height);
绘制图片(9参数)：ctx.drawImage(img,x,y,width,height,casx,casy,caswidth,casheight);
```
- 变换命令
```
平移变换：ctx.translate(x,y);(x 表示水平移动, 正数向右, 负数向左;y 表示垂直移动, 正数向下, 负数向上)
旋转变化：ctx.ratate(radian);(参数是弧度, 表示旋转的方式. 正数表示顺时针旋转, 负数表示逆时针旋转.)
缩放变化：ctx.scale(x,y);(x控制水平缩放倍率,y控制水平缩放倍率,传1不做缩放)
```
### 实例
```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Canvas experiment</title>
  </head>
  <body>
    <canvas id="canvas" width="150" height="150"></canvas>
    <script type="application/javascript">
      function draw() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "rgb(200, 0, 0)";
          ctx.fillRect(10, 10, 50, 50);

          ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
          ctx.fillRect(30, 30, 50, 50);
        }
      }
      draw();
    </script>
  </body>
</html>
```
## SVG基础
### 介绍
- [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [矢量图形](https://en.wikipedia.org/wiki/Vector_graphics)

可缩放矢量图形 (SVG)是一种基于XML的标记语言，用于描述基于二维的矢量图形。矢量图形是基于平面上的几何图像。

### 实例
```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle
    cx="100"
    cy="100"
    r="100"
    onclick="alert('You have clicked the circle.')" />
</svg>
```
## Canvas 和 SVG 有什么区别
> - [HTML5（十）——Canvas 与 SVG 区别](https://cloud.tencent.com/developer/article/1884491)

- svg 是一种矢量图，而 canvas 依赖于分辨率。所以 svg 放大不会失真，但是 canvas 绘制的图形会失真。
- svg 支持事件处理器，而 canvas 不支持事件处理器。

   比如svg支持onClick事件，canvas不支持。svg也支持支持DOM操作节点属性。

- svg 中的文字独立于图像，文字可保留，可编辑和可搜索，canvas 的文本渲染能力弱。
- canvas 适合图像密集型的游戏，频繁地重绘图像，svg 绘制的复杂度高时减慢渲染的速度。

   svg优势是矢量图，不容易失真，而且支持JS操作，但是每次JS操作就是真实操作DOM，所以会有性能问题。canvas在这一点就具有巨大优势。

- canvas 绘制的图形可以多种格式 (jpg、png) 保存图片，但是 svg 绘制的只能以 .svg 格式保存，使用时可以引入 html 文件。
- canvas 适合开发游戏，svg 不适合游戏应用。

   svg优势是矢量图，不容易失真，而且支持JS操作，但是每次JS操作就是真实操作DOM，所以会有性能问题。canvas在这一点就具有巨大优势。