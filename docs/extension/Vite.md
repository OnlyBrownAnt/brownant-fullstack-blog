# Vite
新一代前端构建工具

## Docs
- [vite](https://vitejs.dev)

## 常用命令
### create-vite
- [community-templates](https://vitejs.dev/guide/#community-templates)

从流行框架的基本模板快速启动项目的工具。
```shell
# create方式
npm create vite

# create方式(指定模版) --template
npm create vite project-name --template vue
```

## 从零搭建一个基础的Vite工程
一般情况下使用CLI工具就能创建基础配置完善的工程。

这里以零基础进行搭建包只是为了帮助理解脚手架CLI进行工程搭建的基本思路和实际效果。

1. create npm package project
```shell
npm init
```

默认配置下得到如下配置: package.json
```json
{
  "name": "vite-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
2. update package.json
删除属性main，新增type定义模块化方式。

得到如下配置
```json
{
  "name": "vite-demo",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

3. add vite package
```shell
npm install vite
```

4. 新增vite脚本
在script属性中新增vite的调试、打包、预览三个脚本。

得到如下配置
```json
{
  "name": "vite-demo",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "vite": "^4.5.0"
  }
}
```

5. 新增index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div>Vite Demo</div> 
  </body>
</html>
```

6. 启动测试
```shell
npm run dev
```