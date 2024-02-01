# Personal Statutes

## Introduction

个人在笔记和代码编程方面的一些习惯规定和约定。

给自己定一个规约不是为了束缚自己。恰恰相反，是否了让自己能够更快的进入状态，展望未来开始下一段旅程。

而且规约需要定时更新，这算是自己对过去自己的一个交代。

## Docs

- [Java开发手册-github](https://github.com/alibaba/p3c/)

## Reviews

### Markdown笔记格式

> 目前是基于Docusaurus搭建文档网站，Markdown格式兼容良好，不需要在文档中额外处理标记。

```markdown
# Title

## Introduction

## Docs

## Reviews

### Review Title
```

### 命名规范

- 文件夹(工程最外层文件夹)
  > `单语义单词(全小写)``-``单语义单词(全小写)`
- 文件夹(工程内)
  > `单语义单词(全小写)`
- 文件
  > `UpperCamelCase(大驼峰式)命名法`
- 方法名、参数名、成员变量、局部变量
  > `lowerCamelCase(小驼峰式)命名法`
- 常量
  > `单语义单词(全大写)``-``单语义单词(全大写)`
- 其他规约

1. 文件夹名称不建议是复数，文件名称可以。
2. 编程规约参考《Java开发手册》

- 示例

```txt
工程名
view-demo

工程文件夹文件目录
view-demo
    - src
        - TodayNotes.md
    - README.md

```

### 开发工具

- Java/Vue/React -> IDEA
