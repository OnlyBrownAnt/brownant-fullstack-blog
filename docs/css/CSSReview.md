# CSS总结

## Introduction
CSS的知识点总结，主要基于"深入解析CSS"书籍进行学习总结。也包含CSS常见使用技巧总结。

## Docs
- "深入解析CSS" Keith J.Grant(基思·J.格兰特)

## 基础概念介绍
### CSS
CSS(Cascading Style Sheets)(层叠样式表) 本质上就是声明规则。浏览器会解析样式规则，并呈现画面。

CSS 开发很重要的一点就是以可预测的方式书写规则。

### CSS声明
以下是 CSS 中的一行。它被称作一个声明。该声明由一个属性(color)和一个值(black) 组成。
```
color: black;
```

### CSS选择器
包含在大括号内的一组声明被称作一个声明块。声明块前面有一个选择器(如下面的 body)。
```css
body {
    color: black;
    font-family: Helvetica;
}
```

### CSS规则集(ruleset)
选择器和声明块一起组成了规则集(ruleset)。一个规则集也简称一个规则，通常会用复数形式(rules)，用来指一系列样式的集合。

### CSS`@规则`(at-rules)
@规则(at-rules)是指用“@”符号开头的语法。比如@import 规则或者@media 查询

## CSS3特性概览
1. css3选择器
2. 边框特性
3. 多背景图
4. 颜色与透明度
5. 多列布局与弹性盒模型布局
6. 盒子的变形
7. 过渡与动画
8. web字体
9. 媒体查询
10. 阴影

## CSS基础
### 层叠
#### 什么是层叠
层叠就是CSS一系列的规则，它决定了如何解决规则的冲突，是 CSS 语言的基础。

#### 层叠解决冲突的依赖原则
1. [样式表来源](./CSSReview#样式表来源)
2. [选择器优先级](./CSSReview#选择器优先级)
3. [源码顺序](./CSSReview#源码顺序)

#### 样式表来源
样式表采用优先级从高往低，主要有三种。

1. !important 声明
2. 用户样式
    1. 内联样式
    2. 嵌入样式表
    3. 外部样式表
3. 用户代理样式(浏览器默认样式)

#### 选择器优先级
选择器是存在样式表中的。不过浏览器将优先级分为两部分: HTML 的行内样式和选择器的样式。

由于选择器具有可以叠加声明(比如.class div)的方式，所以判断选择器优先级常用数值形式来标记比较优先级。

##### 优先级
1. 行内样式
2. 选择器
    1. ID选择器
    2. 类选择器、伪类选择器、伪元素选择器、属性选择器
       > 同级别比较优先级时主要是靠源码顺序原则。
    3. 标签选择器

### 选择器(附录)
#### 基础选择器
- ID选择器
- 类选择器
- 标签选择器
- 通用选择器(*)

#### 组合器
组合器将多个基础选择器连接起来组成一个复杂选择器。

复合选择器多个基础选择器可以连起来(不使用空格或者其他组合器)组成一个复合(compound)选 择器(例如:h1.page-header)。复合选择器选中的元素将匹配其全部基础选择器。

- 后代组合器
    > - 两个基础选择器之间的空格。表示去第一代后代匹配是否有对应的选择器。
    > - 支持跨代匹配，即使是后代的后代
- 子组合器(>)
    > - 匹配的目标元素是其他元素的直接后代。例如:.parent > .child。
    > - 相对于后代处理器，不允许跨代匹配。
- 相邻兄弟组合器(+)
    > - 匹配的目标元素紧跟在其他元素后面。例如:p + h2。
    > - 文档流从上往下，匹配前半部分规则的元素后的第一个匹配后半部分的规则的元素。
- 通用兄弟组合器(~)
    > - 匹配所有跟随在指定元素之后的兄弟元素。注意，它不会选中目标元素之前的兄弟元素。例如:li.active ~ li。
    > - 文档流从上往下，匹配前半部分规则的元素后的所有匹配后半部分的规则的元素。
#### 伪类选择器
伪类选择器用于选中处于某个特定状态的元素。这种状态可能是由于用户交互，也可能是由于元素相对于其父级或兄弟元素的位置。伪类选择器始终以一个冒号(:)开始。优先级等于一个类选择器(0,1,0)。

- :first-child——匹配的元素是其父元素的第一个子元素。
- :last-child——匹配的元素是其父元素的最后一个子元素。
- :nth-child(an+b)——匹配的元素在兄弟元素中间有特定的位置。公式 an+b 里面的a和b是整数，该公式指定要选中哪个元素。
- :nth-last-child(an+b)——类似于:nth-child()，但不是从第一个元素往后数，而是从最后一个元素往前数。
- :focus——匹配通过鼠标点击、触摸屏幕或者按 Tab 键导航而获得焦点的元素。
- :hover——匹配鼠标指针正悬停在其上方的元素。
- :disabled——匹配已禁用的元素，包括 input、select 以及 button 元素。

#### 伪元素选择器
伪元素类似于伪类，但是它不匹配特定状态的元素，而是匹配在文档中没有直接对应 HTML 元素的特定部分。伪元素选择器可能只匹配元素的一部分，甚至向 HTML 标记中未定义的地方插入内容。

这些选择器以双冒号(::)开头，尽管大多数浏览器也支持单冒号的语法以便向后兼容。伪元素选择器的优先级与类型选择器(0,0,1)相等。

- ::before——创建一个伪元素，使其成为匹配元素的第一个子元素。该元素默认是行内元素。必须指定 content 属性才能让元素出现。
- ::after——创建一个伪元素，使其成为匹配元素的最后一个子元素。该元素默认是行内元素。必须指定 content 属性才能让元素出现。

#### 属性选择器
属性选择器用于根据 HTML 属性匹配元素。其优先级与一个类选择器(0,1,0)相等。遗下属性选择器默认都是区分大小写的。

- `[attr]` 匹配的元素拥有指定属性 attr，无论属性值是什么，例如:`input[disabled]`。
- `[attr="value"]`匹配的元素拥有指定属性 attr，且属性值等于指定的字符串值，例如:`input[type="radio"]`。
- `[attr[rule]="value"]`匹配的元素拥有指定属性 attr，且属性值符合指定的规则`[rule]`的字符串值，例如:`input[type="radio"]`。
    > `[rule]`类似于正则匹配。`^` -> 开头、`$` -> 结尾、`*` -> 包含、`~` -> 空格分隔

##### 优先级标记法
常用三位的数字标记法判断叠加选择的优先级。

三位数字分别代值ID选择器的数量、类选择器的数量、标签选择器的数量。从左往右比较，左边越大的情况，优先级越高。

##### 标记法判断选择器优先级案例
```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <style>
      .box_1 {
        width: 100px;
        height: 100px;
        background-color: aqua;
      }
      #box_2 { /* 1 0 0 */
        border: 1px solid chartreuse; 
      }
      .box_2 { /* 0 1 0 */
        width: 50px;
        height: 50px;
        border: 1px solid red;
      }
      #main .box_1 .box_2 { /* 1 2 0 */
        border: 1px solid blueviolet;
      }
      main #box_1 .box_2 {  /* 1 1 0 */
        border: 1px solid black;
      }
      main #box_1 #box_2 {  /* 2 0 0 */ /* 优先级最高 */
        border: 1px solid blue;
      }
      main .box_1 .box_2 {  /* 0 2 0 */
        border: 1px solid burlywood;
      }
    </style>
    <main id="main" class="main">
      <div id="box_2" class="box_1">
        <div id="box_2" class="box_2"></div>  
      </div>
    </main>
  </body>
</html>
```

##### 附加
- !important 声明优先级：行内 !important 声明 > 其他 !important 声明
- 通用选择器(*)和组合器(>、+、~)对优先级没有影响。默认作为最低的优先级(0 0 0)。
- 特殊值(inherit、initial)可以赋给任意属性，用于控制层叠。
    - inherit 
        > inherit 关键字。可以用它来覆盖另 一个值，这样该元素就会继承其父元素的值。
    - initial
        > 用 initial 关键字来实现。每一个 CSS 属性都有初始(默认)值。如果将 initial 值赋给某个属性，那么就会有效地将其重置为默认 值，这种操作相当于硬复位了该值。
#### 源码顺序
如果两个声明的来源和优先级相同，其中一个 声明在样式表中出现较晚，或者位于页面较晚引入的样式表中，则该声明胜出。

#### 自定义属性(CSS 变量)
层叠变量的自定义属性 (Custom Properties for Cascading Variables)是CSS3新特性。这个规范给 CSS 引进了变量的概念，开启了一种全 新的基于上下文的动态样式。

你可以声明一个变量，为它赋一个值，然后在样式表的其他地方引用这个值。还支持JS获取某个节点的自定义变量属性并修改，子元素也能继承生效。
```
/* 声明自定义CSS变量 */
:root {
    --main-font: Helvetica, Arial, sans-serif;
}
/* 使用自定义CSS变量 */
div {
    font: var(--main-font);
}
/* 修改自定义CSS变量 */
.box_1 {
    --main-font: Arial
}

```

### 继承
如果一个元素的某个属性没有层叠值，则可能会继承某个祖先元素的值。默认情况下，只有特定的一些属性能被继承，比如文本类型、列表类型。

##### 文本类型属性
- color
- font
- font-family
- font-size
- font-weight
- font-variant
- font-style
- line-height
- letter-spacing
- text-align
- text-indent
- text-transform
- white-space 
- word-spacing

##### 列表类型属性
- list-style
- list-style-type
- list-style-position
- list-style-image

##### 表格边框类型属性
- border-collapse
- border-spacing

### CSS的单位
- 技术的发展带来了浏览器宽度的多样性变化。在不同宽度下绝对单位无法满足用户体验的显示，所以需要倡导CSS的抽象性、响应式变化。相对单位就是为此出现来解决需求的。
- CSS支持的单位一般分为绝对单位、相对单位。以前px作为绝对单位最为常用，现在倡导响应式下相对单位更为常用。
- 然后CSS也支持一些角度的单位，常在平移和动画场景下常见。

#### 绝对单位
|单位|说明|
|-|-|
|mm|毫米|
|cm|厘米|
|in|英寸|
|pt|点，印刷术语，1/72 英寸|
|pc|派卡，印刷术语，12 点|
|px|像素，CSS 像素并不严格等于显示器的像素。通常情况96px 通常等于一个物理英寸。|

- CSS单位换算关系
    - 1in = 25.4mm = 2.54cm = 6pc = 72pt = 96px
    - 16px = 12pt

#### 相对单位
|单位|说明|
|-|-|
|%|相对`父元素`的百分比|
|vw|相对于`视口宽度`的百分比（100vw即视窗宽度的100%）|
|vh|相对于`视口高度`的百分比（100vh即视窗高度的100%）|
|em|相对`父元素`字体大小font-size单位，1rem = 1 * font-size|
|rem|相对`根元素html`字体大小font-size单位，1rem = 1 * font-size|
|fr|代表每一列(或每一行)的分数单位 (fraction unit)，一般只在`grid`网格布局中使用，1fr代表一行或者一列。fr具有按比例自动填充的属性 1fr 1fr 1fr 表示三列等宽，300px 1fr 表示两列，第二列自动填充占满。|

- CSS单位换算关系 
    - 如果根元素font-size == 16px，1rem = 16px

#### 角度单位
- [CSS 数据类型 angle](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)

|单位|说明|
|-|-|
|deg|度。一个完整的圆是 360deg。例：0deg，90deg，14.23deg。|
|grad|百分度。一个完整的圆是 400grad。例：0grad，100grad，38.8grad。|
|rad|弧度。一个完整的圆是 2π 弧度，约等于 6.2832rad。1rad 是 180/π 度。例：0rad，1.0708rad，6.2832rad。|
|turn|圈数。一个完整的圆是 1turn。例：0turn，0.25turn，1.2turn。|

#### 总结
- 根据媒体查询判断设备设置根元素字体大小 + rem实现可以响应式单位变化效果
- 选择优先器管理技巧
    - 模块化 CSS(Modular CSS)

### 正常文档流
> - [常规流布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Normal_Flow)

- 常规流布局（在布局介绍里提到过）是一套用于在浏览器视口内组织元素如何放置的系统
- 默认布局情况
    - 块级元素按照基于其父元素的书写模式（默认值：horizontal-tb）的块流动方向（block flow direction）放置。每个块级元素会在上一个元素下面另起一行，它们会以指定的外边距分隔。块级元素是垂直组织的。
    - 行级（inline）元素的表现有所不同。它们不会另起一行；只要在其父级块级元素的宽度内有足够的空间，它们与其他内联元素、相邻（或换行）的文本内容被安排在同一行。如果空间不够，溢出的内容将下移到新的一行。
    - 如果两个垂直相邻的元素都设置了外边距并且两个外边距相接触，那么更大的外边距会被保留，小的则会消失——这被称为[外边距折叠](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing)。外边距折叠仅与垂直方向有关。

### CSS盒子布局
- [盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

块级布局和内联布局是 web 上默认的行为。它有时候被称为 正常文档流，因为如果没有其他说明，我们的盒子布局默认是块级或者内联，取决于元素类型。

两种盒子在正常文档流中布局表现是有差异的，通过盒模型进行处理显示类型时会使用盒子布局。

#### 块级盒子(block)
- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
- 每个盒子都会换行
- width 和 height 属性可以发挥作用
- 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”

> - 除非特殊指定，诸如标题 (`<h1>`等) 和段落 (`<p>`) 默认情况下都是块级的盒子。

#### 内联盒子(inline)
- 盒子不会产生换行。
- width 和 height 属性将不起作用。
- 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
- 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。

> - 用做链接的 `<a>` 元素、 `<span>`、 `<em>` 以及 `<strong>` 都是默认处于 inline 状态的。

### CSS盒模型
- [CSS 基础框盒模型介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model)
- [盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

盒模型指的是网页元素的结构。CSS 盒模型可以应用于块级盒子和，内联盒子。内联盒子只使用盒模型中定义的部分内容。盒模型有标准盒模型(W3C)、怪异盒模型(IE)两种。现代浏览器默认是标准盒模型(W3C)。

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。期间也会加入显示类型(盒子布局类型)的处理，所以最终的效果在文档流上，每个元素都是以盒子的布局形式显示。

不同盒模型效果会影响到文档流的元素布局。所以选择合适的盒模型可以更好处理显示和布局。

#### 盒模型组成
从里到外顺序介绍。

- Content box: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- Padding box: 包围在内容区域外部的空白区域；大小通过 padding 相关属性设置。
- Border box: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
- Margin box: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 margin 相关属性设置。

#### 盒模型属性
按盒模型组成从里到外顺序介绍。

- width 宽度
- height 高度
- padding 内边距
- border 边框
- margin 外边距

#### 盒模型类型
- 标准盒模型(W3C)
    - 标准盒模型的高度和宽度指是Content box部分的高度和宽度。
    - css `"box-sizing": "content-box"`
    - 实际宽度 = width
    - 实际高度 = height
- 怪异盒模型(IE)
    - 怪异盒模型的高度和宽度指的是包含了所有组成部分的高度和宽度。默认内外边距和边框优先级最高，会挤压Content box组成部分。
    - css `"box-sizing": "border-box"`
    - 实际宽度 = margin-left + padding-left + width + padding-right + margin-right
    - 实际高度 = margin-top + padding-top + height + padding-bottom + margin-bottom

#### 盒模型显示类型
主要有两种类型。可以使用display属性来更换显示类型，默认更换外部显示类型，一些特殊的值比如flex会在讲外部显示类型指定为block的同时，制定内部盒子布局类型为flex。

- 外部显示类型
    > 决定盒子自身的盒子布局类型。
- 内部显示类型
    > 决定盒子内部元素是如何布局的，即其盒子布局类型。默认情况下是按照`正常文档流`布局。

#### display总结
- [display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

##### display常见value
- none 使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。
- block 设置外部显示为块级布局盒子
- inline 设置外部显示类型为内联布局盒子
- inline-block 设置盒子自身外部显示类型为内联布局盒子，在文档流中布局。但是盒子的实际效果有块级布局盒子效果。比如可以显示高宽，支持块级盒子的内部显示特性即支持竖直方向的padding、margin。
- table 该元素的行为类似于 HTML 中的 `<table>` 元素。它定义了一个块级别的盒子。
- flex 该元素的行为类似块级元素并且根据弹性盒子布局它的内容。
    > 外部显示类型是block，内部显示元素是flex。
- grid 该元素的行为类似块级元素并且以网格布局它的内容。

#### 盒模型使用技巧
- box-sizing属性设置盒模型
- Chrome开发者工具的Elements TAB支持查看具体元素的盒模型参数

### 盒模型使用常见问题
主要的现象还是在不同情况下，盒模型五个属性使用时容易出现的一些问题。

#### 水平方向易忽略非width属性效果
水平方向，默认盒模型是标准盒模型时如果忽略水平方向的padding、border、margin效果，会导致实际宽度大于需要的宽度。

推荐min-width属性来兼容处理。

#### 竖直方向易忽略非height属性效果
竖直方向，默认盒模型是标准盒模型时如果忽略竖直方向的padding、border、margin效果，会导致实际高度大于需要的高度。

推荐min-height属性来兼容处理。

#### 高度溢出
盒子高度/宽度固定，但是盒子里的文本超出高度导致溢出。

解决办法: 用 overflow 属性可以控制溢出内容的行为，该属性支持以下 4 个值。
- visible(默认值) 

    所有内容可见，即使溢出容器边缘。
    
- hidden
    
    溢出容器内边距边缘的内容被裁剪，无法看见。
- scroll

    容器出现滚动条，用户可以通过滚动查看剩余内容。在一些操作系统上，会出现水平和垂直两种滚动条，即使所有内容都可见(不溢出)。不过，在这种情况下，滚普通文档流——指的是网页元素的默认布局行为。行内元素跟随文字的方向从左到 右排列，当到达容器边缘时会换行。块级元素会占据完整的一行，前后都有换行。
    
    当明确设置一个元素的高度时，内容可能会溢出容器。当内容在限定区域放不下，渲染到父 元素外面时，就会发生这种现象。图 3-8 展示了这一现象。文档流不考虑溢出的情况，其容器下 方的任何内容都会渲染到溢出内容的上面。动条不可滚动(置灰)。

- auto
    
    只有内容溢出时容器才会出现滚动条。

#### 负外边距
- 负的左/上外边距，会让盒子自身进行左/上移动。
- 负的右/下外边距，会让盒子周围的盒子进行左/上移动(表现为把文档流中的其他盒子拉过来的样子)。

#### 外边距重叠
多个盒子的外边距重叠时产生折叠现象，最后只会保留较长的外边距作为公共的外边距。只有上下外边距会产生折叠，左右外边距不会折叠。

常见具体的外边距重叠现象
- 文字折叠
    
    文字存在默认的外边距。段落(`<p>`)默认有 1em 的上外边 距和 1em 的下外边距。段落(`<h2>`)默认有 0.83em 的上外边 距和 0.83em 的下外边距。最后合并之后只保留了1em外边距。
- 多个外边距折叠
    
    在未触发BFC情况下(比如无边框情况显示文本)，即使存在嵌套的情况也会将所有元素的外边距进行折叠取最大值。
    ```html
    <!-- 最后实际div与h2的重叠区域是20px，但是p和div的边距还是默认边距。如果加上div边框了，那么p盒div的边距就是21px，因为触发了div的BFC。-->
     <main class="main">
        <h2>Come join us!</h2>
        <div style="margin-top: 20px;">
          <p style="margin-top: 21px;" >
            The Franklin Running club meets at 6:00pm
            every Thursday at the town square. Runs
            are three to five miles, at your own pace.
        </p> </div>
        </main>
    </div>
    ```
- 容器外部折叠
    
    在多个外边距折叠中存在一个现象就是明明是某个元素的子元素，但是设置的外边距却参与了父元素的折叠现象。这就是容器外部折叠类型的外边距重叠现象。
    ```html
    <!-- h1有默认边距，header没有默认边距，最后发现h1的默认边距自动作为了header的边距 -->
     <header>
        <h1>h1</h1>
      </header>
    ```

#### 外边距折叠解决方法
核心办法就是触发[BFC](./CSSReview#bfc)效果，避免外边距折叠现象。

## CSS布局
### 浮动
#### 浮动作用
浮动的作用是能将一个元素(通常是一张图片)拉到其容器的一侧，这样文档流就能够包围它。

类似报纸文档流效果，因为默认的块级、内联元素都无法实现这样自适应的效果。

现在也存在替代布局方法是Flexbox、网格系统。

#### 浮动特点
- 浮动元素不同于普通文档流的元素，它们的高度不会加到父元素。
- 浮动方向是left时，浏览器会将浮动元素尽可能地放在靠上的地方。如果是right，那么优先靠右。
    > 多个浮动元素情况下，会出现空白区域。
- 浮动元素的外边距不会折叠到清除浮动容器的外部，非浮动元素的外边距则会正常折叠。

#### 浮动使用
- float
    - left
    - right
- clear
    > 浮动配套的 clear 属性。将一个元素放在主容器的末尾，并对它使 用 clear，这会让容器扩展到浮动元素下面。
    - both
    - left
    - right
    ```html
    <main class="main">
        ...
        <div style="clear: both"></div>
    </main>
    ```

#### 浮动问题和解决方案
##### 容器折叠
由于浮动元素不同于普通文档流的元素，它们的高度不会加到父元素。所以一旦父元素中的其他元素高度也小于浮动元素高度时，会出现父元素没有包裹住子元素的效果。

解决办法是[浮动清除](./CSSReview#浮动清除)

##### 浮动陷阱
由于浏览器会将浮动元素尽可能地放在靠上的地方这个特点，多个浮动元素情况下会出现浮动元素嵌入，而多行浮动元素不等高的情况。

解决办法是[浮动清除](./CSSReview#浮动清除)，但是特殊的是可以是有规则的清除周围盒子的浮动。比如使用:nth-child(odd)选取某一类型的元素中的第奇数个元素浮动。
```css
.class-name:nth-child(odd) {
    clear: left;
}
```
#### BFC
##### 什么是BFC
BFC指的是块级格式化上下文(block formatting context)。

BFC 本身是环绕文档流的一部分，但它将内部的内容与外部的上下文隔离开。BFC 里的内容不会跟外部的元素重叠或者相互影响。

##### BFC效果
1. 包含了内部所有元素的上下外边距。它们不会跟 BFC 外面的元素产生外边距折叠。
2. 包含了内部所有的浮动元素。
3. 不会跟 BFC 外面的浮动元素重叠。

##### 触发BFC方式
- 对容器使用 overflow: auto、hidden、scroll(或者非 visible 的值)，防止内部元素的外边距跟容器外部的外边距折叠。这种方式副作用最小。
- 在两个外边距之间加上边框或者内边距，防止它们折叠。
- 如果容器为浮动元素、内联块、绝对定位或固定定位时，外边距不会在它外面折叠。即float: left 或 right，不为 none 即可。
- 当使用 Flexbox 布局时，弹性布局内的元素之间不会发生外边距折叠。或者使用grid网格布局。
- 当元素display设置为 table-cell 时不具备外边距属性，因此它们不会折叠。此外还有 table-row 和大部分其他表格显示类型，拥有这些属性的元素称为块级容器(block container)。但不包括 table、table-inline、table-caption。
- position:absolute 或 position: fixed。(使用场景较为局限)

#### 浮动清除
常见的有三种方式。

不过由于浮动元素的外边距不会折叠到清除浮动容器的外部，非浮动元素的外边距则会正常折叠。一般在进行清除浮动的时候

- 触发BFC
    > 触发浮动元素的父元素的BFC效果。
- 设置额外的div元素的clear属性
    > 将一个元素放在主容器的末尾，并对它使 用 clear: both;，这会让容器扩展到浮动元素下面。
- 使用::after 伪元素选择器设置clear
    > 伪元素(pseudo-element)来实现。使用::after 伪元素选择器，就可以快速地在 DOM 中在容器末尾添加一个元素。

### Flexbox
给元素添加 display: flex，该元素变成了一 个弹性容器(flex container)，它的直接子元素变成了弹性子元素(flex item)。

兼容性: 
- 并不是所有浏览器都完美地实现了 Flexbox，尤其是 IE10 和 IE11。
- 可以采用浏览器前缀的方式使用部分旧浏览器版本的Flexbox 的早期版本(未正式成熟的版本)。
- 可以采用媒体查询的方式检查当前浏览器是否支持Grid特性。
    - 比如@supports 规则可以用来查询所有的 CSS 特性。
    - 将所有的网格布局样式放在特性查询里，如果支持的情况下就能使用grid特性。
    ```css
    /* 是否支持grid特性 */
    @supports (display: grid) {

    }

    /* 是否支持flex特性 */
    @supports (display: flex) {

    }
    ```


#### 弹性容器(flex container)属性和参数
- flex-direction
    - column
        > 竖直方向为主轴。
    - column-reverse
        > 竖直方向的反方向(从下至上)为主轴。
    - row
        > 水平方向为主轴。
- flex-wrap
    > 折行显示设置，允许弹性子元素换到新的一行或多行显示。子元素不再根据 flex-shrink 值收缩，任何超过弹性容器的子元素都会换行显示。
    - nowrap
    - wrap
    - wrap-reverse
- flex-flow
    > flex-flow 属性是 flex-direction 和 flex-wrap 的简写。
    > 
    > 例如flex-grow: column wrap 
- justify-content
    > 当子元素未填满容器时，justify-content 属性控制子元素沿`主轴`方向的`间距`。也会设置`排列方式`。
    - flex-start
        > 让子元素从主轴的开始位置顺序排列。
    - flex-end
        > 让子元素从主轴的结束位置顺序排列
    - center
        > 让子元素从主轴的上的位置居中。
    - space-between
        > 将第一个弹性子元素放在主轴开始的地方，最后一个子元素放在主轴结 束的地方，剩下的子元素间隔均匀地放在这两者之间的区域。
    - space-around
        > 第一个子元素的前面和最后一个子元素的后面也加上了相同的间距。
- align-items
    > align-items 则控制子元素在`副轴`方向的`对齐方式`。
    - stretch
        > 在水平排列的情况下让所有子元素填充容器的高度，在垂直排列的情况下让子元素填充容器的宽度，因此它能实现等高列。 
    - flex-start
        > 让子元素与副轴的开始位置对齐。
    - flex-end
        > 让子元素与副轴的结束位置对齐。
    - center
        > 让子元素与副轴的居中位置对齐。
    - baseline
        > 让元素根据每个弹性子元素的第一行文字的基线对齐。常用与不同字号的显示进行基线对齐。
- align-content

#### 弹性子元素(flex item)属性和参数
- flex
    > flex是flex-grow flex-shrink flex-basis的简写。flex: 1 =  flex-grow: 1(默认值=0); flex-shrink: 1(默认值); flex-basis: auto(默认值);
- flex-grow 
    > 整数，指定“增长因子”，决定子元素在主轴 方向扩展的大小，用于填充未使用的空间。
- flex-shrink 
    > 整数，指定“收缩因子”，决定子元素在主轴 方向收缩的大小，防止溢出。如果弹性容器开 启了flex-wrap，则会忽略该属性。
- flex-basis
    > 指定子元素未受flex-grow或flex-shrink 2 影响时的初始大小
- align-self
    > 控制子元素在副轴上的对齐方式。它会覆盖 容器上的align-items值。如果子元素副轴 方向上的外边距为auto，则会忽略该属性。
- order
    > 整数，将弹性子元素从兄弟节点中移动到指 定位置，覆盖源码顺序。

#### 浏览器前缀
- -ms- 旧版 Edge 浏览器(IE10 和 IE11)
- -webkit- 旧版 Safari 浏览器

### 网格布局
#### 网格布局是什么
Flexbox 和 网格布局模块(Grid Layout Module)。这两个规范提供了一种前所未有的全功能布局引擎。

设置为 display: grid 的元素 成为一个网格容器(grid container)。它的子元素则变成网格元素(grid items)。

#### 网格布局剖析
- 网格线(grid line)
    > 网格线构成了网格的框架。一条网格线可以水平或垂直，也可以 位于一行或一列的任意一侧。如果指定了 grid-gap 的话，它就位于网格线上。
- 网格轨道(grid track)
    > 一个网格轨道是两条相邻网格线之间的空间。网格有水平轨道 (行)和垂直轨道(列)。
- 网格单元(grid cell)
    > 网格上的单个空间，水平和垂直的网格轨道交叉重叠的部分。 
- 网格区域(grid area)
    > 网格上的矩形区域，由一个到多个网格单元组成。该区域位于两条垂直网格线和两条水平网格线之间。

#### 网格容器(grid container)属性
- grid-template-columns 
    > - 定义了网格每列的大小，有几个参数就是有几列。默认单位fr，也支持px像素单位。
    > - auto表示轨道会根据自身内容扩展。
    > - [repeat()](./CSSReview#隐式网格使用技巧)表示重复模式。grid-template-columns: repeat(4, auto);等价于grid-template-columns: auto auto auto auto。定义了一个竖直网格轨道重复四次，宽度为auto。
- grid-template-row
    > - 定义了网格每行的大小，有几个参数就是有几行。默认单位fr，也支持px像素单位。auto表示轨道会根据自身内容扩展。
    > - auto表示轨道会根据自身内容扩展。
    > - [repeat()](./CSSReview#隐式网格使用技巧)表示重复模式。grid-template-row: repeat(4, auto);等价于grid-template-row: auto auto auto auto。定义了一个水平网格轨道重复四次，高度为auto。
- grid-gap
    > 定义了每个网格单元之间的间距。也可以用两个值分别指定垂直和水平方向的间距(比如 grid-gap: 0.5em 1em)。
- grid-auto-flow
    > - 它可以控制布局算法的行为。
    > - row 默认值，它就会将元素优先放在 网格行中，只有当一行填满了，才会移动到下一行。
    > - column 它就会将元素优先放在网格列中，只有当一列填满了，才会移动到下一行。
    > - dense 它让算法紧凑地填满网格里的空白，尽管这会改变某些网格元素的顺序。比如grid-auto-flow: column dense。

#### 网格元素(grid items)属性
- grid-column 
    > - 属性中用网格线的编号指定网格元素的放置的列号范围
    > - grid-columns是grid-column-start 和 grid-column-end 的简写
    > - 比如grid-column: 1 / 3;表示改元素的占列在第1列到第3列间，所以占比第1列、第2列两列。
- grid-row 
    > - 属性中用网格线的编号指定网格元素的放置的行号范围
    > - grid-row 是 grid-row-start 和 grid-row-end 的简写
    > - 比如grid-row: 1 / 3;表示改元素的占列在第1行到第3行间，所以占比第1行、第2行两行。

#### 替代语法
布局网格元素还有另外两个替代语法: 命名的网格线和命名的网格区域。不同的语法是在帮助理解和使用上有区别。

#### 显式和隐式网格
显式网格和隐式网格的区别主要在于创建网格初始化的区别，显式也是支持自动隐式网格扩展的。

- 显式网格(explicit grid)
    > 使用 grid-template-* 属性定义网格轨道时，创建的是显式网格(explicit grid)。如果行元素超出，会自动创建隐式轨道以扩展网格，从而包含这些元素。
- 隐式网格(implicit grid)
    > - 一种宽松的方式定义网格，交给布局算法来放置网格元素。隐式网格轨道默认大小为 auto。
    > - 优点是更好处理大数据量元素和元素个数不确定的情况。

##### 隐式网格使用技巧
- 一般操作是设置列数，然后行数自动扩展。
- repeat() 函数有一些关键字和函数，可以简化重复过程
    - auto-fit 关键字
        > 让非空的网格轨道扩展，填满可用空间。
    - auto-fill 关键字
        > 设置了之后，只要网格放得下，浏览器就会尽可能多地生成网格轨道。如果网格元素不够填满所有网格轨道，auto-fill就会导致一些空的网格轨道。
        >
        > auto-fill和auto-fitd的区别，如果网格容器宽度还能容易自动生产轨道(列/行)，auto-fill会自动生成，而auto-fit会让已有的轨道进行自动填充空间空间。实际测试发现也只有一个网格元素的情况能严重这种效果，其他情况表现没太大差异，都会自动创建轨道。
    - minmax() 函数
        > 它指定两个值:最小尺寸和最大尺寸。浏览器会确保网格轨道 的大小介于这两者之间。(如果最大尺寸小于最小尺寸，最大尺寸就会被忽略。)。
    ```css
    /* 最小列宽为200px，自动填充网格 */
    .class {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    ```

#### 网格布局使用兼容性技巧
- 相对来说网格布局模块比Flexbox更新一点，而且不支持IE10 和 IE11。
- 不过可以通过浏览器前缀在旧版本浏览器使用未成熟版本的Flexbox特性。
- 如果涉及到图片显示，可以使用object-fit缩放图片。让子元素填满img盒子，避免出现图片较小而留白的情况。
    - object-fit: cover; 扩展图片，让它填满盒子(导致图片一部分被裁剪)。
    - object-fit: contain; 缩放图片，让它完整地填充盒子(导致盒子里出现空白)

### 定位和层叠上下文
#### 定位
元素的定位通常有五种，表示元素和正常文档流的关系或者嵌套元素间的关系。通常使用position属性进行设置定位效果。

##### position属性
position属性进行设置定位效果，通常搭配top、right、bottom、left属性确定具体位置。

- static 静态定位
    > - 默认定位类型
- fixed 固定定位
    > - 元素脱离文档流，相对浏览器视口进行定位。此时视口被称作元素的包含块(containing block)。
- absolute 结对定位
    > - 绝对定位是相对最近的祖先定位元素，要求组件具有相对定位属性声明position: relative;
    > - 如果祖先元素都没有定位，那么绝对定位的元素会基于初始包含块(initial containing block)来定位。
- relative 相对定位
    > - 没有什么作用，只是增加层叠显示优先级。也帮助绝对定位进行定位效果。为绝对定位元素创建包含块。
- sticky 粘性定位
    > - 它是相对定位和固定定位的结合体。正常情况下，元素会随着页面滚动，当到达屏幕的特定位置时，如果用户继续滚动，它就会“锁定”在这个位置。最常见的用例是侧边栏导航。

#### 层叠上下文
- 浏览器将 HTML 解析为 DOM 的同时还创建了另一个树形结构，叫作渲染树(render tree)。 它代表了每个元素的视觉样式和位置。同时还决定浏览器绘制元素的顺序
- 渲染树渲染会产生成叠顺序
    - 元素刚好重叠，后绘制的元素就会出现在先绘制的元素前面
    - 默认情况下，所有的定位元素会出现在非定位元素前面
- 可以z-index控制层叠顺序，数字越大

### 响应式设计
#### 响应式设计是什么
响应式设计(responsive design)就给所有用户提供同一份 HTML 和 CSS。通过使用几个`关键技术`，根据用户`浏览器视口`的大小(或者屏幕分辨率)让内容有不一样的`渲染结果`。

响应式设计的关键点就是关键技术识别用户设备适合哪一种设计，并将对应设计呈现给用户。

#### 响应式设计三大原则
1. 移动优先
    > 在实现桌面布局之前先构建移动版的布局
2. @media规则设备查询
    > 判断不同大小的视口，来生效预设的不同样式。
3. 流式布局
    > 这种方式允许容器根据视口宽度缩放尺寸。

#### 响应式设计关键技术
使用关键技术来满足响应式设计原则，实现响应式设计效果。

##### 移动优先
移动版本在交互和显示内容上比网页版本限制更多，所以在限制多的情况下先开发移动版本，再扩展网页版本会比较容易。

###### 移动版本的限制
- 屏幕空间受限
- 网络更慢
- 特有的移动端设备交互
    > 用户跟网页交互的方式不一样。比如触摸、输入打字
- 使用元数据元素meta的name值[viewport](/docs/html/HTMLReview#常用name值)
    > 声明表示网页适配了小屏设备。让移动浏览器会识别网页是响应式的并进行处理。
    >
    > viewport声明移动端浏览器处理的常见三个内容，视口宽度width=device-width、设备宽度与视口比例iinitial-scale=1.0、是否允许缩放user-scalable=no

###### 网页版本的扩展
> 相对移动版本的扩展。
- 屏幕空间更大
- 网络更快
- 网页端交互方式
    > 可以替换的移动端交互方式。
    - 触摸: 实体触摸 -> 鼠标点击、拖拽等
    - 输入: 虚拟键盘 -> 实体键盘

##### 媒体查询@media
媒体查询使用@media 规则选择满足特定条件的设备。媒体查询可以作为断点设置响应式覆盖用户设置的css样式。

基本语法: `@media [关键字] 媒体类型 (媒体特征) [关键字 (媒体特征)] {}`

###### 关键字
- `and` 设备同时满足这两个条件时才生效
```css
@media (min-width: 20em) and (max-width: 35em) {}
```
- `,` 设备只需要满足多个条件之一就生效，可以用逗号分隔。
```css
@media (min-width: 20em) , (max-width: 35em) {}
```

###### 媒体特征(media feature)
作为媒体查询处理的具体属性。

- min-height
    > - 匹配高度大于等于某值的视口
    > - (min-height: 20em) 匹配高度大于等于 20em 的视口。
- max-height
    > - 匹配高度小于等于某值的视口
    > - (max-height: 20em) 匹配高度小于等于 20em 的视口。
- orientation
    > - 匹配宽度大于/小于高度的视口
    > - (orientation: landscape) 匹配宽度大于高度的视口。
    > - (orientation: portrait) 匹配高度大于宽度的视口。
- min-resolution
    > - 匹配屏幕分辨率大于等于某值的设备
    > - (min-resolution: 2dppx) 匹配屏幕分辨率大于等于 2dppx(dppx 指每个 CSS 像素里包含的物理像素点数)的设备，比如视网膜屏幕。
- max-resolution
    > - 匹配屏幕分辨率小于等于某值的设备
    > - (max-resolution: 2dppx) 匹配屏幕分辨率小于等于 2dppx 的设备。


媒体特征兼容性问题
- 其中基于分辨率的媒体查询比较棘手，因为该特征比较新，浏览器支持得不太好。
    - IE9~11 和 Opera Mini 不支持 dppx 单位，因此需要使用 dpi(每英寸的像素点数)单位代替(比如用 192dpi 代替 2dpx)。
    - Safari 和 iOS 的 Safari 支持前缀版的媒 体特征-webkit-min-device-pixel-ratio
- 分辨率单位。常使用dppx单位，部分旧浏览器支持dpi单位。192dpi = 2dpx。
- 处理高分辨率(视网膜屏)显示器常见办法，兼容性最好。
```css
@media (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi) {

        }
```

###### 媒体类型
媒体类型作用就是用来匹配查询条件的，以什么标准去匹配，是按照屏幕大小改变的条件去匹配还是按照打印的方式去匹配。

比如@media print和@media screen，在移动端H5打印预览的场景，会发现screen的css在打印预览上是未生效的。

- all
    > 全部情况都匹配，默认值。
- screen
    > 针对屏幕样式。常用的智能手机和平板电脑等移动设备。
- print 
    > 针对打印样式。可以控制打印时的网页布局，这样就能在打印时去掉背景图(节省墨水)，隐藏不必要的导航栏。用于打印机和打印预览。

###### 媒体查询加载方式
- `<style>`元素加载
```html
<style media="(min-width: 200px)">
  .box {
    background-color: red;
  }
</style>
<style media="(max-width: 300px">
  .box {
    background-color: burlywood;
  }
</style>
```
- @import 使用时加载
```css
@import url(./index1.css) (min-width: 200px);
@import url(./index2.css) (max-width: 300px);
```
- `<picture>`元素加载
```html
<picture>
  <source media="(min-width: 200px)" srcset="1.jpg">
  <source media="(min-width: 300px)" srcset="2.jpg">
  <img src="default.jpg">
</picture>
```

##### 流式布局(fluid layout)
流式布局也称为液体布局，指的是使用的容器随视口宽度而自适应变化。

流式布局特点
- 容器可能比视口略窄，但永远不会比视口宽。
- 视口变化，流失布局进行自适应的宽高适配，实现缩放的效果。
- 网页默认就是响应式的。没添加 CSS 的时候，块级元素不会比视口宽，行内元素会折行，从而避免出现水平滚动条。

流式布局设计思路
- 在流式布局中，主页面容器通常不会有明确宽度，也不会给百分比宽度。但可能会设置左右内边距，或者设置左右外边距为 auto，让其与视口边缘之间产生留白。

##### 响应式图片
响应式图片就是让图片适应屏幕，要考虑移动端用户的带宽限制，使用合适的图片资源。

响应式图片的最佳实践
- 背景图片场景: 一个图片创建不同分辨率的副本。如果用媒体查询能够知道屏幕的大小。不同分辨率设备使用不同的副本。
- 行内图片资源场景: 比如img标签的图片，使用srcset属性，针对不同的屏幕尺寸使用不同分辨率图片。如果浏览器不支持srcset，会默认使用src中的资源。
```html
 <img alt="A white coffee mug on a bed of coffee beans"
        src="coffee-beans-small.jpg"
        srcset="coffee-beans-small.jpg 560w,
                coffee-beans-medium.jpg 800w,
                coffee-beans.jpg 1280w"
/>
```

#### 响应式设计实践方案
##### 设计原则
- 提高用户体验
- 保证多设备兼容性
- 节省网络资源
- 提高网页加载速度

##### 实践方案
- 使用媒体查询(@media)
    - 设置html的font-size，作为rem单位参考单位。
    - 根据不同设备设计功能模块的变化样式，目的是展示更多主体内容给用户，并且提高用户体验。
- 使用百分比单位：rem、vw、vh、%
- 使用flex弹性布局、grid网格布局
    - 实现自定义性更强的流式布局
- 让多种分辨率副本的图片资源自适应适配显示
    - 节省网络资源
    - 提高加载速度
    - 高清晰度提高用户体验


## CSS高级扩展
### 背景、阴影、混合模式
#### 背景
background是以下八个属性的简写。

- background-image
    > - 指定一个文件或者生成的颜色渐变作为背景图片。
    > - 可以指定多个图片作为背景，`,`隔开。会产生层叠效果，声明时靠前的图片层级越高。
    ```css
    .box {
        /* default2.png在default1.png后面，如果default1.png把盒子占满了就看不见default2.png了 */
        background-image: url(./default1.png), url(./default2.png);
    }
    ```
- background-position
    > - 设置背景图片的初始位置。
    > - 属性值 x% y% = 第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。默认值为: 0％ 0％。
    > - 图片背景支持多个图片，定位也支持对多个层级图片定型定位。默认情况下对所有层级图片生效。不过可以使用`,`间隔，可以对后续指定层级图片定位生效。
    ```css
    .box {
        background-image: url(./default1.png), url(./default2.png);
        /* 第一张图水平定位20px，垂直定位20px。 第二张图水平定位20px，垂直定位20px。*/
        background-position: 20px 20px, 10px 10px;
    }
    ```
- background-size
    > - 指定元素内背景图片的渲染尺寸。
    > - 语法: background-size: length|percentage|cover|contain;
    > - cover: 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
    > - contain: 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。
- background-repeat
    > - 决定在需要填充整个元素时，是否平铺图片。
    > - repeat 背景图像将向垂直和水平方向重复。这是默认
    > - repeat-x 只有水平位置会重复背景图像
    > - repeat-y 只有垂直位置会重复背景图像
    > - no-repeat background-image 不会重复
    > - inherit 指定 background-repeat 属性设置应该从父元素继承
- background-origin
    > - 决定背景相对于元素的边框盒、内边距框盒(初始值)或内容盒子来定位。
    > - 语法: background-origin: padding-box|border-box|content-box;
    > - padding-box 背景图像填充框的相对位置
    > - border-box 背景图像边界框的相对位置
    > - content-box 背景图像的相对位置的内容框
- background-clip
    > - 指定背景是否应该填充边框盒(初始值)、内边距框盒或内容盒子。
    > - 语法: background-clip: border-box|padding-box|content-box;
    > - padding-box 背景绘制在衬距方框内（剪切成衬距方框）。
    > - content-box 背景绘制在内容方框内（剪切成内容方框）。
- background-attachment
    > 指定背景图片是随着元素上下滚动(初始值)，还是固定在视口区域。注意，使用 fixed 值会对页面性能产生负面影响。
- background-color
    > 指定纯色背景，渲染到背景图片下方。

#### 渐变
通常将渐变函数用于background-image属性，实现渐变效果。
##### 线性渐变
从一个颜色过渡到另一个，方向是线性方向的。可以定义多个颜色节点(color stop)。

- linear-gradient()
    > - 线性渐变。
    > - 基本语法: linear-gradient(渐变角度deg, 颜色节点(color stop))，可以有多个颜色节点(color stop)，使用`,`隔开。
- repeating-linear-gradient()
    > 重复线性渐变，此函数和函数 linear-gradient 的效果基本相同，唯一的区别就是repeating-linear-gradient()会重复生成效果。比如发廊霓虹灯效果。
    > - 基本语法: repeating-linear-gradient(渐变角度deg, 颜色节点(color stop))，可以有多个颜色节点(color stop)，使用`,`隔开。
```css
.box {
    background-image: linear-gradient(35deg, red 0%, white 10%, blue 20%);
    background-image: repeating-linear-gradient(35deg, red 0%, white 10%, blue 20%);
}
```
##### 径向渐变
以某个中心点为准，进行渐变。可以实现很多有趣的背景效果。

- radial-gradient
    > - 径向渐变(椭圆) 
    > - 基本语法: radial-gradient(中心点位置/形状, 颜色节点(color stop))，可以有多个颜色节点(color stop)，使用`,`隔开。
    > - 支持中心点位置设置，支持圆型和椭圆切换。
- repeating-radial-gradient 
    > - 径向渐变(椭圆)，会重复生成效果，实现圆盘条纹效果。
    > - 支持中心点位置设置，支持圆型和椭圆切换。
```css
.box {
    /* 径向渐变(椭圆) */
    /* background-image: radial-gradient(white, black); */
    
    /* 径向渐变(圆) */
    /* background-image: radial-gradient(circle, white, black); */

    /* 径向渐变(圆) ，支持颜色节点*/
    /* background-image: radial-gradient(circle, white 1em, black 1em); */
    
    /* 径向渐变(圆) ，支持渐变起始位置中心点距离左边为1em，顶部1em，中心点大小为3em。 */
    /* background-image: radial-gradient(3em at 1em 1em, white, black); */

    /* 重复径向渐变(圆) ，支持颜色节点*/
    /* background-image: repeating-radial-gradient(circle, white 0, white 1em, black 1em, black 2em); */

}
```

#### 阴影
- box-shadow
    > - 盒子阴影
    > - 基本语法: box-shadow: 水平偏移(x), 垂直偏移(y), 模糊半径, 扩展半径, 颜色
- text-shadow
    > - 文字阴影
    > - 基本语法: text-shadow: 水平偏移(x), 垂直偏移(y), 模糊半径, 扩展半径, 颜色
```css
.box {
    /* 右、下阴影显示 */
    box-shadow: 1em 1em 1em 1em red;
}
```
#### 混合模式
CSS 支持 15 种混合模式，每一种都使用不同的计算原理来控制生成最终的混合结果。通过background-blend-mode属性指定混合模式。

对每一个像素来说，就是取一个图层上的像素颜色，与其他图层上对应像素的颜色拼合计算，生成一个新的像素颜色，最终生成一张混合图片。

兼容性: 
- 当然IE和Edge浏览器是个例外。Safari浏览器也不支持复合效果混合模式，必要的时候可以使用特性查询并提供回退处理。
#### 混合模式属性值
通过background-blend-mode属性指定混合模式

!["blendMode"](/img/docs/cssreview/blendMode.png "blendMode")
#### 混合模式实例
```css
.box {
    background-image: url(./default1.png), url(./default2.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: -30vw, 30vw;
    background-blend-mode: multiply;
}
```

### 对比、颜色、间距
#### 颜色表示法
- rgb()
    > 一种描述红、绿、蓝彩色值的颜色表示法，使用十进制而非十六进制。它使用 0-255 取代了 00-FF。
- hsl()
    > HSL 则是一种更适合人类读取的颜色表示法，代表色相、饱和度和明度(或者光度)。
    >
    > hsl()函数需要 3 个参数。第一个参数表示色相，是一个 0~359 的整数值。第二个参数表示饱和度，是一个代表色彩强度的百分数，第三个参数表示明度，也是百分数。
- 十六进制表示法

### 排版
#### Web字体
在线字体服务，它们都提供了可以选择字体的大型字体库，但是可能免费可能收费。

- Typekit
- Webtype
- 谷歌字体

#### @font-face 规则集
@font-face 规则定义了浏览器字体，以便在页面的 CSS 中使用。

```css
/* 
“如果页面需要渲染 font-family 为 Roboto 的拉丁字符，这些字符使用了正常的字体样 式(非斜体)并且字重为 300，那么就使用这个字体文件”。第二条规则类似，定义了一个粗体 版本(字重为 800)的 Sansita 字体。 
*/

/* latin */
@font-face {
    /* 这条@font-face 规则使用 的 Unicode 编码范围 */
    font-family: 'Sansita';
    font-style: normal;
    font-weight: 800;
    src: local('Sansita ExtraBold'), local('Sansita-ExtraBold'),
    url(https://fonts.gstatic.com/s/sansita/v1/M0VOVsEPZWhxh-
        yeRPQtpQzyDMXhdD8sAj6OAJTFsBI.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC,
            U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
    }
```

### 过渡
过渡是通过一系列 transition-*属性来实现的。如果某个元素设置了过渡，那么当它的属性值发生变化时，并不是直接变成新值，而是使用过渡效果。

关键点
- transition-*属性为元素赋予过渡效果
- 监听内容是元素的其他属性值发生变化时
- 过渡无法实现循环过渡的效果的，然后过渡效果路径时预设的，无法进行自定义。

#### transition
transition是以下四个过渡属性的简写。

- transition-property
    > 生效的属性
- transition-duration
    > 持续时间
- transition-timing-function
    > 定时函数
- transition-delay。
    > 延迟时间
    
#### 定时函数
##### 定义函数是什么
定时函数是基于数学定义的贝塞尔曲线(Bézier curve)。浏览器使用贝塞尔曲线作为随时间 变化的函数，来计算某个属性的值。

!["transition-1"](/img/docs/cssreview/transition-1.png "transition-1")

#### 调试定时函数
Chrome开发者工具，在样式面板(Chrome)或者规则面板(Firefox)中，你会发现定时函数旁边有一个小小的标志符号。点击标志符号会打开一 个弹窗，可以在弹窗中修改定时函数的曲线。

#### 定时函数实践
- 线性: 颜色变化和淡出、淡入效果。
- 减速: 用户发起的变化。用户点击按钮或者划过元素的时候，使用 ease-out 或者类似曲线。这样用户就可以看到快速发生的反馈，及时响应输入，然后元素慢慢过渡到最终状态。
- 加速: 系统发起的变化。当内容加载完成或者超时事件触发的时候，使用 ease-in 或者类似曲线。这样元素就可以慢慢引起用户注意，然后速度越来越快直到完成最终变化

#### 过渡实践
- 过渡对display的变化是无效的。可以采用透明度或者高度过渡来替换需要的效果。
- 对于鼠标悬停、淡入淡出和轻微缩放特效，应该使用较快的过渡速度。一般要 控制在 300ms 以下，有时候甚至可能要低到 100ms。
- 对于那些包含较大移动或者复杂 定时函数的过渡，比如弹跳特效要使用较长的 300~500ms 的持续 时间。
- 使用透明度的过渡为下拉菜单的打开和闭合添加淡入淡出特效

### 变换
变换通常使用transform 属性，它可以用来改变页面元素的形状和位置，其中包括二维或者三维的旋转、缩放和倾斜。变换通常结合过渡或动画一起使用。

#### transform
transform支持多重变换，允许同时使用多个函数。

##### 变换函数
2D效果
- rotate()
    > - 旋转(Rotate)
    > - 元素绕着一个轴心转动一定角度。单位常用deg角度。
- translate()
    > - 平移(Translate)
    > - 元素向上、下、左、右各个方向移动(有点类似于相对定位)。
- scale() 
    > - 缩放(Scale)
    > - 缩小或放大元素。无单位，纯数字比例。
- skew() 
    > - 倾斜(Skew)
    > - 使元素变形，顶边滑向一个方向，底边滑向相反的方向。单位常用deg角度。

3D效果
- perspective()
    > - 透视距离(perspective)，单位常用绝对单位
    > - 透视距离想象成“摄像机”和场景之间的距离，前后移动镜头就会改变整个场景最终显示到图像上的方式。镜头比较近(即透视距离小)，如果镜头比较远(即透视距离大)。
- rotateZ()
    > 以Z轴进行旋转。
- rotateX()
    > 以X(水平轴)轴进行旋转。
- rotateY()
    > 以Y(竖直轴)轴进行旋转。
- translateZ()
    > 以Z轴进行移动。
- translateX()
    > 以X轴进行移动。
- translateY()
    > 以Y轴进行移动。

#### transform-origin
改变transform的基点位置。变换操作都是按照一个基点进行的，默认正中心。如果把基地换个地方，那么变化效果也会变化。

比如: transform-origin: right bottom;中间的元素向着基点(right top)进行变换。

### 动画
我们可能希望某个元素的变化过程是迂回的路径。有时，我们可能需要元素在动画运动后再回到起始的地方。过渡无法满足这个需求。为了对页面变化有更加精确的控制，CSS提供了关键帧动画。

CSS动画组成
- 用来定义动画的 @keyframes 规则
- 为元素添加动画的 animation 属性进行制定规则。

#### 关键帧
关键帧(keyframe)是指动画过程中某个特定时刻。我们定义一些关键帧，浏览器负责填充或者插入这些关键帧之间的帧图像。为动画定义规则。

#### animation
animation是以下属性的简写。该属性为元素添加动画声明。

- animation-name
    > - 代表动画名称，使用 @keyframes 规则定义。
- animation-duration
    > - 代表动画持续时。
- animation-timing-function
    - 代表定时函数，用来描述动画如何加速。和/或减速。可以是贝塞尔曲线或者关键字值，就像过渡使用的定时函数一样(ease-in、ease-out，等等)。 
- animation-iteration-count
    - 代表动画重复的次数。初始值默认是 1。
- animation-delay
    - 代表动画启动前的延迟。当单位是时间单位时触发。

#### 关键帧和过渡的区别
- 过渡其实和关键帧动画类似，但是只定义第一帧(起始点)和最后一帧(结束点)，浏览器计算所有中间值，使得元素进行变换。
- 关键帧是可以定义多个帧，每个帧可以实现不同的过渡效果。

#### 动画实践
##### 动画填充
- animation-fill-mode
    - node
    - backwards
    - forwards
    - both

因为 transform 和 opacity 属性只应用在了动画执行期间。动画开始之前，网格元素在页面上是可见的，就在它们各自的正常位置。动画开始的时候，它们瞬间变成 0%关键帧上应用的属性值。我们需要把动画样式后向填充设置，就像一直暂停在第一帧，直到动画开始播放。

##### 动画延迟
- 在多个元素连续动画的情况下，可以使用animation-delay，元素提供依次延时执行的效果

## CSS应用
### 模块化CSS
TODO
### CSS预处理器
#### Sass、Less、Stylus的区别
变量
- Sass 声明变量必须是『$』开头，后面紧跟变量名和变量值，而且变量名和变量值需要使用冒号：分隔开。
- Less 声明变量用『@』开头，其余等同 Sass。
- Stylus 中声明变量没有任何限定，结尾的分号可有可无，但变量名和变量值之间必须要有『等号』。但需要注意的是，如果用“@”符号来声明变量，Stylus会进行编译，但不会赋值给变量。就是说，Stylus 不要使用『@』声明变量。Stylus 调用变量的方法和Less、Sass完全相同。

作用域
- css 预编译器把变量赋予作用域，也就是存在生命周期。就像 js 一样，它会先从局部作用域查找变量，依次向上级作用域查找。
- Sass：三者最差，不存在全局变量的概念。也就是说在 Sass 中定义了相同名字的变量时你就要小心蛋疼了。
- Less：我认为跟 JS 一样，逐级查找，向上冒泡。
- Stylus：完全等同 Less。Stylus 和 Sass 则更倾向于指令式。

## CSS技巧集合
### CSS垂直居中
垂直居中需求，竖直方向，让元素处于父级别元素中间位置。并没有强调水平居中。

> 这里进行测试时前提都是两个盒子嵌套的场景，默认有四种情况(父盒子、子盒子)
> - 块级、块级
> - 内联、块级
> - 块级、内联
> - 内联、内联

1. 给父容器相等的上下内边距，让容器和内容自行决定自己的高度。
    - 优点
        - 高度自适应，高度由内容决定。
    - 限制
        - 只限于父盒子是块级元素。
    - 实现水平垂直居中的情况
        - 父子元素盒子都是块级别。

2. 父盒子设置display: table-cell，vertical-align: middle
    - 优点
        - 支持高度自适应
        - 支持自定义高度、宽度
    - 限制
    - 实现水平垂直居中的情况
        - 子元素盒子是块级别

3. Flexbox(弹性盒子)
     - 优点
        - 支持高度自适应
        - 支持自定义高度、宽度
        - 支持设置对齐方向
        - 多个子元素下，支持设置子元素主轴占比例
        - 支持多个子元素占比情况下，主轴上少的按比例自动补全、超出后按比例自动减少。
    - 实现水平垂直居中的情况
        - 手动设置纵轴和主轴都居中即可

4. 设置子元素为块级别，然后设置高宽超过父元素
    - 优点
        - 支持高度自适应
        - 直接覆盖了，常用文本显示
    - 限制
        - 不能在父子盒间留白

5. 绝对定位结合变形(transform)d
    - 优点
        - 使用translate进行移动，支持百分比。
    - 限制
        - 需要明确知道父子元素的高宽，用于确定目的定位和移动的百分比。

### CSS等高列
等高列需求，多列布局的情况下，保持高度一致。

1. CSS 表格 table
2. Flexbox弹性盒子

### 文字省略符号效果
#### 单行省略号
方案: 设置文字不换行、文字生成省略符号、overflow隐藏文字溢出。
```css
.box {
    overflow: hidden;
    text-overflow: ellipsis; 
    text-wrap: nowrap;
}
```
#### 多行省略号
- 要求: 不固定行数，尾部显示省略符号。

方案
让文字自适应，然后设置伪类，在尾部增加省略号。兼容性好。

限制条件
> - 缺点是无法控制行数显示，以及省略号显示位置。
> - 而且需要预限制文案字数。
```css
.box {
    &::after {
        content: '...';
    }
}
```

- 要求: 固定行数，尾部显示省略符号。最好能控制省略符号的出现的行位置。

方案
还是伪类的方式。不过将伪类设置为绝对定位，而且是和文字等高的盒子，背景不透明，成叠z-index要大于父盒子。这样就能覆盖着文字，变相裁剪了文字实现了省略号效果。也可以通过限制盒子和文字高度之间的比例来限制行数。

限制条件
> - 单位必须要统一，最好使用rem，方便伪类计算宽度。
> - 背景色彩要统一，否则伪类盒子覆盖时会出现不同意的情况。
> - 最后一行不要出现符号，会导致伪类计算宽度错误。

```css
.box {
    position: relative;
    overflow: hidden;

    max-height: 80px; /* 文字高度的倍数，表示显示四行文字 */
    line-height: 20px; /* 文字行高 */
    font-size: 1rem; /* 文字字体大小，可作为宽度 */
    z-index: 1;
    &::after {
        position: absolute;
        right: 0;
        bottom: 0;

        width: calc(100% - 1rem); /* 计算前面要隔开几个汉字，这里隔开了一个 */
        height: 20px;
        z-index: 2;

        background-color: #ffffff;
        content: '...';
    }
}
```

### CSS画三角形
一般常用两种方式。

1. border
思路
- 当一个盒子没有宽高，但是边框增大时，会产生由中心往外产生区域的效果。所以将一边border设置为某个颜色，增大固定大小。但是只有一边是有颜色的，剩下三边颜色为透明就可以产生三角形。

代码
```css
.box {
    width: 0;
    height: 0;
    
    border-top: 100px solid red;
    border-bottom: 100px solid transparent;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
}
```

2. linear-gradient
思路
linear-gradient用于设置背景渐变效果，但是可以设置角度和多个颜色节点。给盒子设置固定宽高，超出部分也不会显示，设置45deg的角度，设置一个颜色节点长度50%，刚好到边角线。设置第二个颜色节点为透明0。这样只有前50%产生颜色，就可以生成三角型了。

代码
```css
.box {
    width: 100px;
    height: 100px;
    background-image: linear-gradient(45deg, red 50%, transparent 0);
}
```