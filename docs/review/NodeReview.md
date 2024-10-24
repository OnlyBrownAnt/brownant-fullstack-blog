# Node前端项目总结

> 使用Node作为开发环境的前端项目的在配置和管理上的常见问题总结，包括node依赖管理问题和处理技巧。

## Contents

[[toc]]

## Docs

- [npm 模块安装机制简介-阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [npmjs](https://www.npmjs.com/)
- [npmjs-快速指南](https://www.npmjs.cn/getting-started/what-is-npm/)
- [Nodejs教程-w3cschool](https://www.w3cschool.cn/nodejs/)
- [nvm](https://github.com/nvm-sh/nvm)

## Reviews

## Review-Node工程的包依赖管理小结

1. 约定开发配置
   - 约定开发环境Node版本: 例如 Node Version = 16.19.1
   - 约定开发环境Npm版本: 例如 Npm Version = 8.19.3
2. 初始化Package.json、Package-lock.json
   - 在约定开发环境下使用npm工具拉取node依赖
   - 将Package.json，Package-lock.json都纳入版本控制(例如Git)管理，保证协同开始都能拉取到同一份配置。
3. 规范Package.json、Package-lock.json更新操作
   - 涉及到依赖包的新增、更新等操作必须保证在和约定开发配置一致的情况下进行。
   - 新生成的Package.json、Package-lock.json需要同步到版本控制(比如Git)
4. 开发工程时使用配置
   - 确保本地开发环境和约定开发配置一致，或者版本相差不大。
   - 通过版本控制拉取同步最新的Package.json、Package-lock.json配置文件。
   - 不需要自己删除掉Package-lock.json之后再重新编译生产Package-lcok.json文件。

## Review-Npm处理依赖包小结

1. 清理npm缓存

```shell
# 清除npm缓存(局部)
npm cache clean --force
# 清除npm缓存(全局)
npm cache clean --force -g
# 验证是否清理完成
npm cache verify
```

2. 清理node_modules缓存

```shell
# 清除node_modules(局部)
rm -rf node_modules
# 清除node_modules(全局)
rm -r $(npm root -g)
```

## Review-临时环境生成node_modules

可以通过启动指定node版本的docker，然后将工程挂载上去下载node_modules。

1. compose.yml
   > V12 Node的docker compose配置文件compose.yml

```yml
# compose.yml
services:
  app:
    image: node:12-alpine
    command: sh -c "tail -f > logs"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
```

2. 启动docker
   > 注意前端工程需要和compose.yml在同一个文件夹内。因为要挂载到docker上。

```shell
docker compose -f compose up -d
```

3. 下载noe_modules
   > 进入docker执行命令npm install下载node_modules

```shell
docker exec -it <docker-id> /bin/sh
```

```shell
npm install
```

## Review-Npm常用参数

- `--save`将包保存到项目的 dependencies 中。
- `--save-dev` 或 `-D`将包保存到项目的 devDependencies 中。
- `--global` 或 `-g` 将包全局安装，而不是在特定项目中使用。

## Review-Npm常见问题

1. 多次协助全局依赖包不生效
   多次删除全局包但是不生效，但是没有提示错误。需要root权限进行删除。

## Review-其他技巧

1. 通过nvm快捷下载、安装和切换指定版本Node


## npm、cnpm、pnpm、yarn 的区别和优劣势
### Docs
- [与你项目相关的npm知识总结](https://juejin.cn/post/6933167787435261959)
- [pnpm的好处](https://www.cnblogs.com/Jcloud/p/17295377.html)

### 背景
#### 为什么需要包管理工具
用于安装和管理依赖的 node 包管理工具。
#### 包管理工具存在什么问题
1. 依赖版本不一致性问题
   案例: 有 A、B、C、D 四个依赖包。其中 A 依赖于 B、C。B 和 C 都依赖于 D，但是分别依赖的是 D@1.0 和 D@2.0。
   部分包依赖管理工具(npm)就会把这两个包都下载到缓存中，但是实际运用时就可能会出现依赖版本不一致问题。
2. 依赖安装性能优化问题
   部分包依赖管理工具(npm、cnpm、yarn)在每一个工程都会有一个缓存目录(node_modules)，每次都会下载所有的依赖，所以下载慢，空间占用大。

### 深度解析 npm 为什么会有依赖版本不一致问题
1. 依赖安装方式是扁平的
   npm 安装包是扁平时安装，没有分析实际的嵌套式安装的包依赖关系。导致可能会下载了同一个依赖包的不同版本。
2. 依赖版本控制不严格
   npm 下载包时只依赖于 package.json 文件。
3. 依赖版本范围不精确
   package.json 中是可以定义包的依赖版本，但是比较宽松，可以定义某个版本以上的小版本都支持，比如 "express": "^4.17.1" 。
   所以出现不同的开发者在不同时间安装项目依赖时，可能会因为 npm 注册表中可用的版本不同而安装到不同的具体版本。

### npm 有做什么来依赖版本不一致解决问题吗？
在 npm 5 之后 npm 新增了 package-lock.json 来解决这个问题。但是存在一个跨平台和跨环境的一致性情况，导致产生不同 lock 记录。

但是在某些情况下，package-lock.json 可能不如 Yarn 的锁文件那样严格地锁定版本，可能会导致在不同环境中安装时出现一些小的版本差异。
npm 在跨平台和跨环境安装时，由于其相对灵活的版本选择和更新策略，可能会出现一些小的版本差异。不同的操作系统、Node.js 版本或安装顺序等因素都可能影响 npm 对依赖版本的选择。

## 区别和优劣势
1. npm 包管理工具会将所有包下载或者安装到工程目录进行缓存，不支持并发下载。
2. cnpm 和 npm 一致，只是解决在国内使用 npm 的网络问题。
3. yarn 和 npm 的区别是支持并发下载。
4. pnpm 使用`内容可寻址`方式对包依赖进行`硬链接`和`软连接`，不需要把所有包下载和安装到工程目录进行缓存，节省了空间和夹在速度。
   > 内容可寻址: 根据依赖包的内容进行哈希计算，得到一个唯一的标识符。每个依赖包都以这个标识符进行存储，确保相同内容的依赖包只有一份物理副本
5. npm、yarn、pnpm 都支持 lock 文件保存的准确包版本记录。但是 npm 的包版本确认规则更加宽松，会出现在不同情况下生成不一致的 lock 文件。
yarn 和 pnpm 相对生成的 lock 文件比较稳定。
