# HTML总结

## Introduction

HTML的知识点文档便于温习，同时也包含HTML使用技巧。

## Docs

- "HTML5权威指南" Adam Freeman

- [开始学习 HTML - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Getting_started)

- [HTML Tutorial](https://www.w3schools.com/html/default.asp)

## HTML定义

[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML)（HyperText Markup Language，超文本标记语言）是一种用来告知浏览器如何组织页面的*标记语言*。HTML 可复杂、可简单，一切取决于 web 开发者。

HTML 由一系列的[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)组成，这些元素可以用来包围或*标记*不同部分的内容，使其以某种方式呈现或者工作。

## HTML5特点

1. 语义化原则
   
   > 使用元素应该完全从元素的语义出发。

2. HTML5全局属性

3. HTML5语义化元素速览
   
   > "HTML5权威指南" P92

## HTML元素

### HTML文档基本元素

| 元素      | 说明            | 是否必须 |
| ------- | ------------- | ---- |
| DOCTYPE | 表示HTML文档的开始   | 是    |
| html    | 表示文档的HTML部分   | 是    |
| head    | 表示HTML文档的头部区域 | 否    |
| body    | 表示HTML文档的内容区域 | 是    |

### 元素组成

1. 开始标签 + 内容 +  结束标签

2. 自闭合标签

### 元素属性

> - 属性只能用在开始标签或单个标签
> 
> - 属性具有名称和值两部分

1. 元素专有属性

2. HTML5全局属性
   
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

3. 布尔属性
   
   ```
   有些属性属于布尔属性，这种属性不需要设定一个值，只消将属性名添加到元素中即可
   ```
   
   Enter your name: ‹input disabled>

4. 自定义属性
   
   ```
   用户可自定义属性，这种属性必须以data- 开头
   
   Enter your name: <input disabled-"true" data-creator="adam" data-purpose="collection"›
   ```

## 创建HTML文档

了解HTML文档创建相关基础的元素和属性。

> "HTML5权威指南" P98

### 内容概要

![html/1](@site/static/img/docs/html/1.png "html/1")

## 标记文字

> "HTML5权威指南" P126

### 内容概要
![html/2](@site/static/img/docs/html/2.png "html/2")

## 组织内容

> "HTML5权威指南" P158

### 内容概要
![html/3](@site/static/img/docs/html/3.png "html/3")

## 文档分节

> "HTML5权威指南" P179

### 内容概要
![html/4](@site/static/img/docs/html/4.png "html/4")

## 表格内容

> "HTML5权威指南" P205

### 内容概要
![html/5](@site/static/img/docs/html/5.png "html/5")

## 表单

> "HTML5权威指南" P231

### 内容概要
![html/6](@site/static/img/docs/html/6.png "html/6")

## 定制Input元素

> "HTML5权威指南" P255

### 内容概要
![html/7](@site/static/img/docs/html/7.png "html/7")

## 其他表单元素及输入验证

> "HTML5权威指南" P289

### 内容概要
![html/8](@site/static/img/docs/html/8.png "html/8")

## 嵌入内容

> "HTML5权威指南" P306

### 内容概要
![html/9](@site/static/img/docs/html/9.png "html/9")
