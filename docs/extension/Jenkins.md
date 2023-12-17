# Jenkins
持续集成和交付服务

## Documents
- [jenkins-docker-github](https://github.com/jenkinsci/docker/blob/master/README.md)
- [前端工程化-jenkins-优质博客](https://juejin.cn/post/7102360505313918983)
- [github创建临时token](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-token)

## Review
### Jenkins docker部署总结
#### docker配置和启动
1. 编写docker compose配置文件
> jenkins docker 官方案例
> 
> 未特别说明情况下docker compose配置文件名称为jenkins-compose.yml。
```shell
services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
    volumes:
      - jenkins_home:/var/jenkins_home
  ssh-agent:
    image: jenkins/ssh-agent
volumes:
  jenkins_home:
```
2. 启动jenkins docker
```shell
docker compose -f jenkins-compose.yml up -d
```
#### Jenkins 基本配置
1. 确认账号和密码
- 账号默认为admin
- 密码有两种方式获取
    - 通过查看docker启动日志
    - 查看docker内的/var/lib/jenkins/secrets/initialAdminPassword文件
2. 安装插件(建议选择默认推荐配置)
> 可选，根据任务需求安装指定插件，部分插件在安装之后还需要进行配置信息。
- Publish Over SSH
> SSH插件，可以连接到指定服务器，并将文件上传到指定服务器目录，还支持在指定服务器上执行脚本。一般在构建后步骤配置和使用。

配置
1. 面板 -> 系统管理 -> 系统配置: 配置ssh servers信息

使用
1. 任务的"构建后操作"步骤使用 -> Send build artifacts over SSH

- NodeJS
> 前端工程下载依赖和打包的环境，支持选择指定的nodejs版本。

配置
1. 面板 -> 系统管理 -> 全局工具配置: 配置nodejs版本信息

使用
1. 任务的"构建环境"步骤使用 -> Provide Node & npm bin/ folder to PATH


#### 创建Jenkins任务实战
> 通过创建一个简单的项目，了解创建任务和构建任务整个基本流程和涉及到的知识点

1. 创建任务

面板 -> 新建任务 -> 输入任务名称 -> 选择 "Build a free-style software project"

2. 配置任务
> free-style software project 一般有六个模块需要配置
```shell
1. 通用: 内容主要是任务描述
2. 源码管理: 配置需要构建的项目Git地址和账号信息。如果是github，需要注意git的token创建和配置。
3. 构建触发器: 设置触发构建的时机，支持脚本。默认是手动触发。
4. 构建环境: 配置项目构建需要的基本环境。比如前端构建时需要配置nodejs作为环境。
5. 构建步骤: 构建具体的操作。比如设置具体shell脚本来完成构建工作。
6. 构建后操作: 构建之后需要进行额外的操作，比如将构建文件发送到指定服务器的文件目录，并执行预定义的部署脚本。或者移动到当前服务器指定目录用于后续的运维部署。
```

#### 小结
Jenkins docker可以更加快速便捷的启动jenkins服务，通过jenkins提供的构建功能和插件功能我们可以更加稳定进行项目的构建和部署，节约运维成本。

### 配置github注意事项
账号是github账号，但是密码并不是github的密码，需要单独创建临时token作为密码。