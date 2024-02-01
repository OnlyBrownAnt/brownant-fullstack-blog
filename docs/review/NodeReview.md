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
