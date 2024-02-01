# VitePress

## 文档

- [VitePress github](https://github.com/vuejs/vitepress)
- [VitePress home](https://vitepress.vuejs.org/)

## 总结

### 文章自动生成多级目录

#### 文档

- [VitePress 高级配置](https://vitepress.vuejs.org/guide/markdown#advanced-configuration)
- [markdown-it-anchor github](https://github.com/valeriangalliat/markdown-it-anchor#usage)
- [@mdit-vue/plugin-toc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options)

#### 使用教程

1. 安装依赖包

```shell
npm install -D markdown-it-anchor
npm install -D @mdit-vue/plugin-toc
```

2. 配置插件和传入参数
   > 在docs/.vitepress/config.js文件中进行如下配置。

```js
module.exports = {
  markdown: {
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {},

    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [2, 3, 4, 5, 6] }, // TODO 支持处理的目录级别，这里的配置表示2、3、4、5、6级标题都会被创建成目录

    config: (md) => {
      // use more markdown-it plugins!
      md.use(require("markdown-it-markdown-it-anchor"));
    },
  },
};
```

3. 在md文档中配置目录标签
   > 个人推荐将目录标题作为二级标题，并作为一级标题下的第一个二级标题显示。这样在自动生成的侧边栏目录中也能看到目录标题，方便快速查看。

```md
# -级标题[示例]

## 目录[示例]

[[toc]]

## 其他二级标题[示例]
```

4. 实现效果

# 一级标题[示例]

## 目录[示例]

[[toc]]

## 其他二级标题[示例]
