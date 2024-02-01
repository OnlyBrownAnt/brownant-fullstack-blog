# Jmeter总结

## 介绍

Apache JMeter是一个Apache 项目，可用作负载测试工具，用于分析和测量各种服务的性能，重点是Web 应用程序。

## 参考文档

- [JMeter 接口自动化测试入门指南](https://apifox.com/apiskills/jmeter-automation-testing/)
- [Jmeter压测工具使用手册（完整版）](https://blog.csdn.net/fenlin88l/article/details/89394704)
- [如何使用jmeter高效、准确执行并发测试？](https://zhuanlan.zhihu.com/p/594119162)

## 安装

> 注意仅MAC/Linux系统可参考，且MAC系统在12以上。

### 进入官网

[官网下载地址](https://jmeter.apache.org/download_jmeter.cgi)

### 下载Binaries包

![Screen Shot 2022-08-20 at 17.28.38.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f0b1fbaf6494f918db96e4382a31dd3~tplv-k3u1fbpfcp-watermark.image?)

### 解压保存Binaries包到指定位置

```shell
# 在上一个步骤中得到二进制压缩包apache-jmeter-5.5.tgz

# 1. 解压。
# 打开终端，切换到压缩包所在目录，解压压缩包apache-jmeter-5.5.tgz
tar -zxvf apache-jmeter-5.5.tgz
# 2.得到文件夹 apache-jmeter-5.5
# 3.移动到自己指定的位置，并记录好目录，配置环境时需要使用。
mv apache-jmeter-5.5 ~/Library
# 4.成功移动到新地址，得到文件夹新目录 ～/Library/apache-jmeter-5.5
```

### 配置环境变量

```shell
# 在上一个步骤中得到得到文件夹新目录 ～/Library/apache-jmeter-5.5

# 1. 在～目录打开环境配置文件 .zshrc或者.bash_profile，输入以下配置
JMETER_HOME="~/Library/apache-jmeter-5.5"
export PATH="$JMETER_HOME/bin:$PATH"
# 2. 保存，重启环境
source .zshrc 或者 source .bash_profile
```

### 启动JMeter

```shell
# 环境变量已经配置好，终端输入jmeter，即可打开jmeter。

jmeter
```

## 一次简单的HTTP API负载测试

> 需要开启一个服务API，才能进行测试
>
> 例如现有一个API: http://127.0.0.1:8080/server/demo
>
> 拆解信息如下:
>
> 协议: http
>
> 服务器地址: 127.0.0.1
>
> 端口号: 8080
>
> API请求路径: /server/demo

### 打开jmeter

```shell
# 环境配置好的情况下打开终端
jmeter
```

### 新建测试计划

![Screen Shot 2022-08-20 at 18.25.58.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b0fd98d21b84a2489dfd08455553465~tplv-k3u1fbpfcp-watermark.image?)

- 说明

新建一个简单的HTTP 请求测试模版。

### 配置变量

![Screen Shot 2022-08-20 at 18.27.30.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/541442fa426d413ea49ba871b10dda47~tplv-k3u1fbpfcp-watermark.image?)

- 说明

可以设置一些参数，这个参数后设置Web服务器参数时可以作为变量使用。比如url就是API服务路径。

### 配置Web服务器参数

![Screen Shot 2022-08-20 at 18.28.09.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adf736c37de840b6a7bbe37f8b04df19~tplv-k3u1fbpfcp-watermark.image?)

- 说明

在步骤开头说明中提到的拆解测试API得到各个部分的信息，并依次填入。

### 配置线程组

![Screen Shot 2022-08-20 at 18.28.37.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58504df63e9a4b84a9e8b35716a92e73~tplv-k3u1fbpfcp-watermark.image?)

- 说明

线程组实际是计算机集中管理的资源，简单来说每个线程可以作为一个"用户"进行使用web服务。更多的"用户"去使用web服务，就实现了一种负载压测效果。

我们这里需要设置线程组中的线程数量、ramp up时间、循环次数

注：ramp up时间表示，多少时间内将线程组中的线程全部启用。如果为1，表示在1秒内启动所有的线程。而循环次数表示重复这个启动过程。

### 启动计划

![Screen Shot 2022-08-20 at 18.29.59.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2443d2f0f96449abb4e6a0524ded3a9b~tplv-k3u1fbpfcp-watermark.image?)

- 说明

点击绿色箭头启动，第一次启动时需要保存测试计划。

### 查看结果树

![Screen Shot 2022-08-20 at 18.30.33.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44d5d5944602467586821270dd4893c7~tplv-k3u1fbpfcp-watermark.image?)

- 说明

查看结果树，可以查看测试API的情况。通常可以使用查看结果树、聚合报告来分析基本的测试情况。

## 附录

1. [优质博客-压力测试-JMeter安装、入门、结果分析](https://juejin.cn/post/7132829647674277919)
2. [优质博客-压力测试实践一：JMeter + JProfiler 入门](https://juejin.cn/post/7003233110619848718)
3. [优质博客-电商项目 Jmeter 脚本实战开发](https://juejin.cn/post/7035585350768525343)

[^1]: [维基百科-JMeter](https://en.wikipedia.org/wiki/Apache_JMeter)
[^2]:
    [官网下载地址](https://jmeter.apache.org/download_jmeter.cgi)
    [2]:[官网下载地址](https://en.wikipedia.org/wiki/Apache_JMeter)

## Jmeter攻略

### 线程组设置技巧

1. 选中线程组，右键允许单一的线程组进行启动。

### 线程组内请求严格顺序执行

- [jmeter线程组内的接口顺序执行解决办法](https://blog.csdn.net/weixin_46658581/article/details/124194494)
- [jmeter控制请求执行顺序](https://eolink.csdn.net/6422886a986c660f3cf931c0.html?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Eactivity-2-113760072-blog-124194494.235%5Ev38%5Epc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Eactivity-2-113760072-blog-124194494.235%5Ev38%5Epc_relevant_sort_base3&utm_relevant_index=3)

在耽搁线程组内添加一个逻辑控制器 - 临界部分控制器。控制线程内接口的执行顺序。

### Jmeter参数化常用方法

- [jmeter参数化常用方法，生成随机数、随机字符串、从文本文件中读取数据](https://blog.csdn.net/weixin_47091688/article/details/124364689?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124364689-blog-79075464.235%5Ev38%5Epc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-124364689-blog-79075464.235%5Ev38%5Epc_relevant_sort_base3&utm_relevant_index=2)

### Jmeter的接口间参数复用

- [Jmeter 将上一个请求的结果作为下一个请求的参数](https://www.cnblogs.com/mayyan/p/16565145.html)

在一个请求返回后通过正则匹配器截取保存数据，作为参数。让后续接口可以复用。

### Jmeter编码错误问题

- [JMeter学习（三）---解决JMeter的中文乱码问题](https://blog.csdn.net/qq_36800800/article/details/86479296)
- [Jmeter，响应报文中文乱码问题-三种解决方案](https://blog.csdn.net/Moonlight_16/article/details/121038111)

请求之前增加编码处理，定义返回内容的编码type。修改jemter的软件配置。

### Jmeter如何进行表单提交

- [Jmeter压测学习49 - 测试文件上传接口multipart/form-data](https://www.cnblogs.com/yoyoketang/p/15546107.html)

使用form data方式进行提交，不需要添加请求头，选中以multipart/form-data方式框就行。文件上传时，文件上传是单独的界面。其他的参数依旧在Param一页中写入。

### Jmeter上传文件报错because no multipart boundary was found

- [FileUploadException-CSDN](https://blog.csdn.net/qq_39387856/article/details/96475511)

jmeter上传文件选中了multipart/form-data，就不需要手动去增加Content-Type，会导致服务解析错误。
