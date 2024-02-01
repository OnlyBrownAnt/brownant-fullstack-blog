# 性能测试分析总结

> 性能测试分析基础知识总结和分析经验笔记。

## 性能分析经验

- [服务端性能测试 - 入门指南 (慎入: 6000 字长文)](https://testerhome.com/topics/27409)
- [Java 应用压测性能问题定位经验分享](https://developer.aliyun.com/article/969837)
- [Java程序性能分析：内存](https://zhuanlan.zhihu.com/p/642694471)
- [记一次压测引起的nginx负载均衡性能调优](https://xiaorui.cc/archives/3495)
- [Nginx极简实战—Nginx服务器高性能优化配置，轻松实现10万并发访问量](https://developer.aliyun.com/article/791260?spm=a2c6h.12873639.article-detail.15.39af6e4b38k1Ko)
- [如何优化高并发TCP链接中产生的大量的TIME_WAIT的状态](https://cloud.tencent.com/developer/article/1589962)
- [压力测试和JMeter使用分析](https://developer.aliyun.com/article/1150242)

## 性能分析工具

### 性能监控

- vmstat
  > - [Linux性能分析工具vmstat](https://cloud.tencent.com/developer/article/1844270)
  > - [vmstat命令](https://man.niaoge.com/vmstat)

```shell
vmstat 1
```

2. top
   > 实时动态地查看系统的整体运行情况，是一个综合了多方信息监测系统性能和运行信息的实用工具。
3. netstat
   > 打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。
   >
   > - [netstat命令](https://man.niaoge.com/netstat)

```shell
# 观测TIME_WAIT数量
netstat -nat | grep -i "TIME_WAIT" | wc -l
```

### 性能压测

- Jmeter

  > - [Jmeter基础-博客](http://www.brownant.top/docs/extension/Jmeter)

- ab(ApacheBench)
  > MAC上的ab工具版本存在问题，采用docker的方式调用ab进行测试。
  >
  > - [jordi/ab](https://hub.docker.com/r/jordi/ab)

## 常用压测观察指标

### 吞吐量

每秒钟系统能够处理的请求数、任务数。

1. TPS(Transaction per Second)
   > 每秒事务数，即每秒系统能够处理的事务次数。事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。而在这个TPS中，为了处理第一次请求可能会引发后续多次对服务端的访问才能完成这次工作，每次访问都算一个QPS。所以，一个TPS可能包含多个QPS。

```text
TPS = req/(sec * 单个事务的请求数)  = 请求数/ (秒 * 单个事务的请求数)
```

2. QPS(Query per Second)
   > 每秒查询数率，系统每秒能够处理的查询请求次数，即一台服务器每秒能够相应的查询次数，是对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准。

```text
QPS = req/sec = 请求数/秒
```

### 响应时间RT(Response Time)

执行一个请求从开始到最后收到响应数据所花费的总体时间，即从客户端发起请求到收到服务器响应结果的时间。它的数值大小直接反应了系统的快慢。然后通过90%RT、95%RT、99RT可以查看到响应的变化趋势。

1. 90%RT
2. 95%RT
3. 99%RT

### 错误率(Error %)

一批请求中结果出错的请求所占比例。

## JAVA服务性能分析

### Docs

- [Java性能问题分析步骤](https://blog.csdn.net/lgleje/article/details/129520405)

## 基本步骤

1. 查找JAVA进程
2. 查找服务占用最多的线程
3. jstatk获取调用栈信息分析

## 性能分析实战案例-文件上传

### Docs

- [性能测试之文件上传的瓶颈分析调优](https://blog.51cto.com/u_13645741/3735091)
- [文件上传功能测试、性能测试解决方案（含Jmeter配置及加压参数分析）](https://blog.csdn.net/qq_29707567/article/details/84642677?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D)

## 一次投产性能测试分析小结

### 背景介绍

投产上线前，对于服务性能进行测试和初步分析。测试内容涉及到一个C端的前端应用和对应的后端服务。

前端应用作为主要功能入口，包含用户注册登陆、人脸身份证认证等核验用户身份功能，以及相关资料上传和下载查看、办理业务和合同签订等功能。服务端主要负责业务服务的转发和文件压缩传递的功能。

前端应用和服务端应用都以容器的方式进行部署。前端应用以nginx方式部署，单台容器配置为8Core/8G。服务端应用配置，单台容器为8Core/8G。最外层还有两层Nginx代理，所以最终前端应用容器本质是还是台中转代理服务器。

### 性能测试目的

1. 测试前端应用的负载能力，优化Nginx配置。
2. 测试服务端应用在上传文件、压缩文件场景下的负载能力，优化配置，以及确认负载均衡备用台数。

### 测试分析过程

1. 初始化容器和应用配置

- 前端应用Nginx在默认Nginx配置修改一下参数

```text
1. 设置工作进程和Cpu Core一致。(参考 2Core/4G = 2)
worker_processes 8;
2. 设置单个工作进程连接数。(参考 2Core/4G = 2048)
worker_connections 10240;
3. 设置
client_max_body_size 50m;
```

- 服务端应用使用默认配置

2. 确认压测观察指标

- 吞吐量-TPS
- 响应时间-90%RT、95%RT、99%RT
- 错误率

3. 确认压测方案

- 使用Jmeter工具进行压测
  Jmeter常用指和性能压测的主要指标的对应关系如下。

```text
Throughput - TPS/QPS(线程单接口=QPS、线程多接口=TPS)
90%Line - 90%RT
95%Line - 95%RT
99%Line - 99%RT
Error%
```

- 编写三个脚本
  > 进行初步的性能检查。

```text
Script-1. Get请求-静态文件，100线程/2s 持续10s
Script-2. Post请求-查询列表， 100线程/2s 持续10s
Script-3. Post请求-上传压缩文件(5MB) + 路径写入数据库 ，20线程/2s 持续10s
```

- 压测计划

```text
1. 执行Script-1，Top观测前端容器的Cpu使用率和内存使用率
2. 执行Script-2，Top观测前端容器的Cpu使用率和内存使用率，观测后端容器的Cpu使用率和内存使用率，观测后端容器的TIME_WAIT数量
3. 执行Script-3，Top观测前端容器的Cpu使用率和内存使用率，观测后端容器的Cpu使用率和内存使用率，观测后端容器的TIME_WAIT数量
```

4. 压测结果

- Script-1执行结果，前端容器负载正常。Jmeter指标 Error%=0、Throughput=700/sec、95%Line=380。
- Script-2执行结果，前端容器负载正常，后端容器负载正常，TIME_WAIT峰值=6000左右。Jmeter指标 Error%=10%、Throughput=600/sec、95%Line=300。
- Script-2执行结果，前端容器负载正常，后端容器负载内存飙升，TIME_WAIT峰值=3000左右。Jmeter指标 Error%=30%、Throughput=400/sec、95%Line=240。

5. 分析结果

- Script-1脚本执行，未达到负载极限。
- Script-2脚本执行，未达到负载极限，Error较高，需要排除问题。最终发现是转发网关服务负载报错。
- Script-3脚本执行，未达到负载极限，Error极高，但是Cpu消耗不大，需要排除问题，最终发现错误主要在于程序处理压缩的逻辑导致内存异常。
- Script-2和Script-3都有大量TIME_WAIT的现象。分析原因主要有两个，1.是前端Nginx容器与后端交互未设置为长连接导致后端容器释放请求产生大量TIME_WAIT。2. 后端服务和网关通讯是短连接，在服务异常的情况下断开请求出现大量TIME_WAIT。
- Script-2和Script-3都存在Error，查看错误主要是发往网关出现了接口异常500。

6. 确认最终优化内容

- 前端容器Nginx转发后端容器时开启长连接。设置线程池Keepalive 1000。
- 后端容器转发网关服务时开启长连接。
- 服务端优化压缩代码，避免重复创建文件对象导致内存飙升。
- 提升网关负载台数

### 小结

这里进行了一个简单的性能压测，初步了解系统的负载阀值的上线和出现过的异常情况，以及确认可优化的方向。

通常优化方向如下

- 服务间的连接方式。开启长连接并设置合适的线程池大小以减少不必要的创建连接动作，以及减少TIME_WAIT留存。
- Nginx的工作线程配置。根据服务器配置进行合理设置。通常2Core/4G 配置worker_processes 1; worker_connections 2048; worker_processe数目可以写auto或者固定和Core数目一致。worker_connections设置初始值，然后根据性能压测效果进行具体设置。主要关注点是CPU和内存的影响，在全负载的情况下，不能让CPU和内存出现异常，这就可以找到最合适的worker_connections。
- 服务端代码优化。避免频繁多余的创建大内存的对象以及优化容易出现异常的线程锁的处理。
- 服务端线程池优化。根据业务需求设置合理的线程池，避免出现性能过剩，而线程池利用不过，等待请求过多出现服务拒绝请求的情况。
