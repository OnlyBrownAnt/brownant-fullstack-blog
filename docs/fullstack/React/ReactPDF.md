# react-pdf 总结

## Docs

- [react-pdf](https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#readme)
- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)
- [react-pdf/sample/webpack5](https://github.com/wojtekmaj/react-pdf/tree/main/sample/webpack5)

## Webapck5 集成 react-pdf 教程

### 集成过程

1. 安装相关依赖
   ```shell
   npm install react-pdf --save
   ```
1. 配置 PDF.js 工作线程

   > 安装 react-pdf 的时候也会安装 pdfjs-dist，所以不需要自己去进行安装 pdfjs-dist。
   >
   > 如果需要自己安装，那么要注意 pdf.worker.min.js 的版本需要和 pdfjs 的 version一致。

   ```javascript
   import { pdfjs, Document, Page } from "react-pdf";

   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
     "pdfjs-dist/build/pdf.worker.min.js",
     import.meta.url,
   ).toString();
   ```

1. 配置拷贝 fonts 和 cmaps 文件
   > fonts 是字体文件夹，cmaps 是字符映射文件夹。
   >
   > 通过 copy-webpack-plugin 插件在拷贝静态文件时，也把这两个文件夹内容拷贝。
   ```javascript
   // webpack.common.js
   // react-pdf cmaps 资源拷贝处理
   const cMapsDir = path.join(
     path.dirname(require.resolve("pdfjs-dist/package.json")),
     "cmaps",
   );
   // react-pdf fonts 资源拷贝处理
   const standardFontsDir = path.join(
     path.dirname(require.resolve("pdfjs-dist/package.json")),
     "standard_fonts",
   );
   ```
   ```javascript
   // webpack.common.js
   // 拷贝资源文件
   new CopyWebpackPlugin({
     patterns: [
       {
         from: path.resolve(__dirname, '../public'),
         to: path.resolve(__dirname, '../dist'),
         globOptions: {
           ignore: ['**/index.html'],
         },
       },
       // react-pdf cmaps 资源拷贝处理
       { from: cMapsDir, to: 'cmaps/' },
       // react-pdf fonts 资源拷贝处理
       { from: standardFontsDir, to: 'standard_fonts/' },
     ],
   }),
   ```
1. 引入 react-pdf 常用公共样式

   ```javascript
   // 在 React-PDF 渲染的 PDF 中使用注释（例如链接）
   import "react-pdf/dist/Page/AnnotationLayer.css";
   // 在 React-PDF 渲染的 PDF 中使用文本层
   import "react-pdf/dist/Page/TextLayer.css";
   ```

   > 同时还要注意 Webpack 对于 css 的资源处理是否排除了 node_modules 文件夹。如果排除了就无法正确处理引入的 react-pdf 公共样式

   ```javascript
   // 参考配置

   // exclude 排除 node_modules 目录
   // exclude: /node_modules/,
   // include 引入符合以下任何条件的模块
   include: [
       path.join(__dirname, '../src'),
       path.join(__dirname, '../public'),
       // react-pdf 需要引入的css资源的路径
       path.join(__dirname, '../node_modules/react-pdf')
   ],
   ```

### 集成实例

- [webpack-react-cli](https://github.com/OnlyBrownAnt/webpack-react-cli/tree/main/src/pages/PDFView)

## 常见问题

- [避坑指“难” 全网最全面的-基于React实现PDF预览功能（react-pdf-js VS react-pdf）](https://juejin.cn/post/6946076966676070430)

### 切换 pdf 页数重复渲染问题

- [使用react-pdf在React项目中预览PDF](https://blog.csdn.net/xzwwjl1314/article/details/129143090)
- [Frequently-Asked-Questions](https://github.com/wojtekmaj/react-pdf/wiki/Frequently-Asked-Questions)
  每次更新页数，都会导致重复请求。

```javascript
<Document file="http://example.com/document.pdf">
  <Page pageNumber={1} />
</Document>
```

file不要直接传入字符串或者对象，会每次被处理成新值。采用中间变量的方式。

```javascript
const fileUrl = "http://example.com/document.pdf"
<Document file={fileUrl}>
  <Page pageNumber={1} />
</Document>
```

### 如何加载 base64 数据

拼接完整的base64 字符串即可。

```javascript
<Document file={`data:application/pdf;base64,${base64String}`}>
  <Page pageNumber={1} />
</Document>
```
