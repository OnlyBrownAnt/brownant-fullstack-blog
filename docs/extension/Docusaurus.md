# Docusaurus
Docusaurus 是一个静态站点生成器

## Docs

- [Docusaurus](https://docusaurus.io/)

## 基本使用教程(3.0)

### 常用命令

```shell
# create project
npx create-docusaurus@3.0.0 my-website classic --typescript
# start project
cd my-website
npm run start
# build project
npm run build
```

### 静态资源
#### file path
```
1. 相对路径
默认情况下非md、mdx尾缀资源到/static/去寻找
relative to the content root (`/static/`)

![An image from the static](/img/docusaurus.png)
// /img/docusaurus.png -> @site/static/img/docusaurus.png

2. 绝对路径
直接使用@site去查找文件，也支持md文件的查找。
![An image from the static](@site/static/img/docusaurus.png)
![An image from the static](@site/docs/docusaurus.md)
```
### 搜索功能
#### Algolia DocSearch
##### Docs
- https://docsearch.algolia.com/docs/templates
- https://dashboard.algolia.com
- [Crawler Admin Console](https://crawler.algolia.com/admin/crawlers/)
##### Guide
1. Docusaurus工程配置Algolia
2. Algolia创建Doc Search Application
3. Algolia配置crawlers并启动爬虫

### MarkDown功能
#### Link
- URL path
```
// 相对路径
- [URL path to another document](./installation)

// 绝对路径 /docs/
- [URL path to another document](/docs/installation)
```
- file path
> 查找资源。加上文件尾缀，请求文件。
```
// 相对路径
- [file path to another document](./installation.mdx)

// 绝对路径 @site/
- [file path to another document](@site/docs/installation.mdx)
```
#### Code Blocks
由Prism React Renderer提供支持。
##### Docs
- [code-blocks](https://docusaurus.io/docs/markdown-features/code-blocks)
- [supported-languages](https://prismjs.com/#supported-languages)
##### 增加额外语言
prism.additionalLanguages 列表增加prism支持语言配置。