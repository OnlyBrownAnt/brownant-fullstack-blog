# 你比你想象中还需要Markdown

## 为什么选择Markdown

在这信息时代，信息的交流和分享已经变得更加迅速。对于信息的展示效果要求也变的更加高，使用纯文本缺少一些美感，使用Word又不方便解析和分享到互联网。于是折中的选择，Markdown值得我们瞧一瞧。

[Markdown](https://zh.wikipedia.org/wiki/Markdown)是一种轻量型的标记语言，通过Markdown我们可以使用相对简单的语法和便捷的方式来实现更容易被阅读的效果，而且支持更方便的解析成网页文档进行互联网分享。目前主流的博客网站比如知乎、CSDN、掘金等基本都支持该语言的文档编写。而关于技术博客或者文档编写，GitHub、GitBook等更是将其作为首选语言。

这里的介绍主要是[CommonMark Spec](https://spec.commonmark.org/)。因为Markdown在发展过程中出现了很多的规范，[MultiMarkdown、GitHub Flavored Markdown (GFM)、Pandoc、CommonMark及Markdown等变体](https://zh.wikipedia.org/wiki/Markdown)。目前主流使用的是[CommonMark Spec](https://spec.commonmark.org/)和GitHub的[GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)。而且其中GitHub Flavored Markdown (GFM)也是遵循早期的CommonMark规范的，所以可以先了解较为基础的CommonMark规范。

> GitHub Repository: [CommonMark](https://github.com/commonmark/commonmark-spec)
>
> Spec Docunment: [CommonMark Spec](https://spec.commonmark.org/)

## 编辑工具

> 有更好的推荐欢迎留言补充

### 在线编辑文档

[知乎](https://www.zhihu.com/)

[掘金](https://juejin.cn/)

[GitBook](https://www.gitbook.com/)

[CSDN](https://www.csdn.net/)

### 本地编辑工具

[marktext](https://marktext.app/)

[Typora](https://typora.io/)

> 该工具目前需要收费

[VsCode](https://code.visualstudio.com/)

> 该开发工具默认支持md文档解析，可以增加插件扩展功能。

## 解析工具

### JS解析工具

[markdown-it](https://github.com/markdown-it/markdown-it)

## 常用规范-常识

- 不支持首行缩进，所以不使用制表符TAB或者空格来进行首行缩进
- 内容主体是段落，每个段落间隔推荐使用换行(回车)进行分隔。

## 常用规范-标题

常见有六种类型标题

格式: # 标题名称

说明: 不同级别的标题的"#"数量不同，注意"#"和标题名称之间需要保留空格，"#"前面不允许有其他字符。

示例:

```
#  一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

## 常用规范-块引用

使用">"符号创建块引用，可以于段落间的附加说明。

案例:

```
>
> 块引用
>
```

展示效果:

> 块引用

## 常用规范-无序列表

使用"-"创建无序列表项。

子项列表需要换行后，需要至少2个空格或者一个制表符(TAB)

案例:

```
- item-1
  - item-1-1
- item-2
- item-1
```

展示效果:

- item-1
  - item-1-1
- item-2
- item-1

## 常用规范-有序列表

使用数字[0 -9] + "."创建有序号列表项，"."和文本间需要隔开一个空格。

子项列表需要换行后，需要至少4个空格或者一个制表符(TAB)

案例:

```
1. item-1
    1. item-1-1
2. item-2
3. item-1
```

展示效果:

1. item-1
   1. item-1-1
2. item-2
3. item-1

## 常用规范-代码块

一对或多对反引号字符"`"组成的字符串可以实现代码块。

一对反引号字符"\`"实现的代码块只有提示效果，比如`一对反引号`。而至少3个反引号字符实现的代码块支持特定语言解析。

案例:

> \```javascript
>
> console.log('hello world!');
>
> \```

展示效果:

```javascript
console.log("hello world!");
```

## 常用规范-强调

段落或者文本的开始和结束部分分别使用一个反引号，可以实现特殊标注效果

段落或者文本的开始和结束部分分别使用一个"\*"，可以实现字体斜体效果

段落或者文本的开始和结束部分分别使用两个"\*"，可以实现字体粗体效果

段落或者文本的开始和结束部分分别使用三个"\*"，可以实现字体粗斜体效果

案例:

```
`文本` 标注效果
*文本* 字体斜体效果
**文本** 字体粗体效果
***文本*** 字体粗斜体效果
```

展示效果:

`文本` 标注效果

_文本_ 字体斜体效果

**文本** 字体粗体效果

**_文本_** 字体粗斜体效果

## 常用规范-链接

链接包含链接文本（可见文本）、链接目标 （作为链接目标的 URI）以及可选的链接标题。

基本格式

\[链接文本\](链接目标 '链接标题');

案例:

\[链接文本\](链接目标 '链接标题')

展示效果:

[链接文本](https://链接目标 "链接标题")

## 常用规范-图片

图像的语法类似于链接的语法，只有一处不同。我们有图像描述而不是链接文本。此规则与链接文本相同。不过链接文本替换为了链接alt显示。

基本格式:

\!\[链接alt\](链接目标url "链接标题")

案例:

\!\[markdown图片链接alt\](http://assets.brownant.top/markdown/image_1.JPG "markdown图片链接title")

展示效果:

![markdown图片链接alt](http://assets.brownant.top/markdown/image_1.JPG "markdown图片链接title")

## 相关博客推荐

["Markdown 教程" made by mrknight with ❤️](https://markdown.com.cn/basic-syntax/emphasis.html)
