# Npm
npm 是世界上最大的软件注册中心。允许开发人员使用npm来共享和使用软件包。

## Docs
- [about-npm](https://docs.npmjs.com/about-npm)
- [npmjs](https://www.npmjs.com/)
- [about-packages-and-modules](https://docs.npmjs.com/about-packages-and-modules)
- [creating-a-package-json-file](https://docs.npmjs.com/creating-a-package-json-file)

## Npm基本组成
npm consists of three distinct components:

- the website
- the Command Line Interface (CLI)
- the registry

## Npm CLI是什么
脚手架，快速创建Npm工程。

```shell
# create package project
npm init
```

## Npm Registry有什么
1. JavaScript packages

    The public npm registry is a database of JavaScript packages, each comprised of software and metadata. 

2. Node modules 

    The npm registry contains packages, many of which are also Node modules, or contain Node modules 

## Npm Package的基本组成
1. package.json
2. 其他工程资源

## Node modules的两种形式
1. Node.js模块(也是一种包含package.json文件的包)，package.json必须包含字段"main"。
2. JavaScript文件。

## Package和Node modules的区别
1. 模块是目录中可以由Node.js require()函数加载的任何文件或目录。
2. 而包是由package.json文件描述的文件或目录。
3. 模块可能是包，也可能是模块。取决于是否有package.json。

## package.json的作用
1. 列出当前Npm包所依赖的包
2. 指定当前Npm包所依赖的具体版本的包
3. 保存构建配置，供其他开发者复用

## package.json常用属性
```json
{
  "name": "my_package", // 包名称
  "description": "", // 自述文件信息
  "version": "1.0.0", // 版本
  "scripts": { // 脚本
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": { // 源码仓库
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [], // 关键词
  "author": "", // 作者
  "license": "ISC", // 协议
  "bugs": { // bug链接
    "url": "https://github.com/monatheoctocat/my_package/issues"
  },
  "homepage": "https://github.com/monatheoctocat/my_package" // 主页
}
```

## package.json特殊属性
```json
{
   "main": "index.js", // 模块入口，默认执行。只是工程作为模块可有。
   "type": "module" // 该字段定义Node.js应如何解释文件。Nodejs包常用。
}
```

## CommonJS和ESModules的区别
- [ES 模块和 CommonJS：概述](https://dev.to/costamatheus97/es-modules-and-commonjs-an-overview-1i4b)
- [「万字进阶」深入浅出 Commonjs 和 Es Module](https://cloud.tencent.com/developer/article/1884093)

两者都是JavaScript模块化系统。其中ESModules相对于CommonJS会比较新，也是未来的一个发展趋势。

模块化系统的是指将代码进行模块化，定义了依赖的加载和模块导出规则。

### 使用上的区别
#### CommonJS
```javascript
// 1. module.exports进行模块导出
// my-module.js
module.exports = {
  myValue: 42
};

// 2. require进行依赖引入
// main.js
const myModule = require('./my-module.js');
console.log(myModule.myValue); // 42
```

#### ESModules
```javascript
// 1. export进行模块导出。export default作为默认模块导出。
// my-module.js
export const myValue = 42;

// 2. import进行依赖引入
// main.js
import { myValue } from './my-module.js';
console.log(myValue); // 42
```

### 特性上的区别

TODO