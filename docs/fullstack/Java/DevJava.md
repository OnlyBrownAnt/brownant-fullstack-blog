# Linux配置Java开发环境
> 部署运行程序，通常只需要配置JRE，如果需要远程开发，可以配置JDK提供更多开发支持功能。

## Docs
[JDK8下载地址-oracle官网](https://www.oracle.com/java/technologies/downloads/#java8)

## 下载安装包
> 官网下载JDK压缩包，前提是需要oracle账号登陆。

## 配置环境变量
1. 查找~/.bash_profile文件
> 没有该文件就用touch ~/.bash_profile命令创建文件
2. 配置环境变量

在~/.bash_profile中写入以下内容
```shell
JAVA_HOME=/home/weijun/jdk/jdk1.8.0_141
JRE_HOME=/home/weijun/jdk/jdk1.8.0_141/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH
```
3. 激活环境配置

执行以下命令激活环境配置
```shell
source ~/.bash_profile
```

## 验证是否安装完成
```shell
java —version
```