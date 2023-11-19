# HTML总结

## Introduction
HTML的知识点总结，主要基于"HTML5权威指南"书籍进行学习总结。也包含HTML常见使用技巧总结。

## Docs
- "HTML5权威指南" Adam Freeman
- [开始学习 HTML - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/htmlreview/element-Introduction_to_htmlreview/element-Getting_started)
- [HTML Tutorial](https://www.w3schools.com/htmlreview/element-default.asp)
- [Glossary)](https://developer.mozilla.org/en-US/docs/Glossary)
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
- 介绍

   语义化就是将元素的语义与元素对其内容呈现结果的影响分离，呈现与语义分离原则是一种新的设计原则。
- 解决了什么问题

   HTML5之前，部分标签存在语义和内容呈现结果混合的情况，比如`<b>`标签，用元素表示将文本加粗显示。
   
   而HTML5的语义化就是为了避免这种现象，让HTML元素负责文档内容的结构和含义，内容的呈现则由应用于元素上的CSS样式控制。

- 优点

   呈现与语义分离原则的目的完全是为了让HTML文档更易于程序化处理。

   随着HTML5的采用和实现愈加广泛，HTML内容的这种使用会日益增多。如果不关心标记的准确性和一致性，这样的HITML文档处理起来更为困难，用户能为其找到的用处也很有限。

### HTML5元素
#### 元素类型
元素通常分为三大类。然后还有一些标签不属于任何类型，比如html、head、body它们属于文档框架描述相关的元素。

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
   用户可自定义属性，这种属性必须以data-开始。
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
