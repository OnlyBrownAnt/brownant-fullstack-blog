# Nginx性能优化总结
> 投产过程中的Nginx优化过程笔记总结，涉及到技术背景的介绍和性能优化过程的描述。如果发现问题欢迎Github提交issus。

## Docs
- [支持keep alive长连接-博客](https://skyao.gitbooks.io/learning-nginx/content/documentation/keep_alive.html)
- [nginx优化——包括https、keepalive等](https://lanjingling.github.io/2016/06/11/nginx-https-keepalived-youhua/)
- [nginx反向代理时保持长连接](https://cloud.tencent.com/developer/article/1832932)
- [Nginx极简实战—Nginx服务器高性能优化配置，轻松实现10万并发访问量](https://developer.aliyun.com/article/791260?spm=a2c6h.12873639.article-detail.15.39af6e4b38k1Ko)
- [一次百万长连接压测 Nginx OOM 的问题排查分析](https://zhuanlan.zhihu.com/p/507744061)
- [一、内存占用查看情况](https://www.cnblogs.com/sandyflower/p/14349649.html)
- [记一次压测引起的nginx负载均衡性能调优](https://xiaorui.cc/archives/3495)
- [通俗易懂的Nginx工作原理](https://xiaorui.cc/archives/3495)
- [Nginx 处理 HTTP 请求的 11 个阶段](https://iziyang.github.io/2020/04/12/5-nginx/)

## 背景知识 TODO
- TCP/IP协议
- Nginx的工作流程
- Nginx性能相关参数和影响范围
- 压测分析性能
- 性能优化分析方案
- 压测分析性能(二次)
- 总结

## 核心配置
```text
工作进程数 worker_processes
单个工作进程最大连接数 worker_connection
```

## 影响因素
```text
cpu核数
ulimit -n 65534
最大内存
io模型 use epoll
```

## 参数基本限制
```text
worker_processes < cpu核心数
worker_connection < max ulimit -n
worker_connection * worker_processes * 单个worker_connection最大内存占用 < 最大内存
单个worker_connection最大内存占用 = Buffer_Size + Request_Size + Response_Size + Additional_Data 
```

## 长连接
### 如何开启长连接
- upstream指令-增加负载
- keepalive指令-开启线程池并设置大小
- 转发时设置连接方式为"" 开启长连接
### 附加问题
1. 需要考虑认证鉴权的cookie或者session信息在head里面，不建议开启此选项，或者对需要保留的header要保存下来。

## 计算Nginx内存消耗
> From ChatGPT
计算Nginx的单个进程在每个连接上的最大内存消耗。

### 考虑因素
1. 缓冲区大小 
> Nginx 为每个连接分配一定大小的缓冲区用于读取请求和响应数据。这些缓冲区的大小可以通过配置项进行设置，例如 client_header_buffer_size 和 client_body_buffer_size。
2. 请求和响应数据的大小 
> 最大内存消耗还取决于客户端发送的请求和服务器返回的响应数据的大小。如果请求或响应非常大，可能会导致更多的内存被分配给该连接。
3. 其他数据结构和变量
> 除了缓冲区和请求/响应数据外，Nginx 在处理每个连接时还会使用一些额外的数据结构和变量，如连接状态、HTTP 头部等。这些也会占用一定的内存空间。

### 综合计算
```text
// 每个连接的最大内存消耗可以近似地计算
Max_Memory_Consumption = Buffer_Size + Request_Size + Response_Size + Additional_Data;
```
- Buffer_Size 是缓冲区大小
- Request_Size 是请求数据的大小
- Response_Size 是响应数据的大小
- Additional_Data 是其他数据结构和变量所占用的内存空间

### 观测工具
- nginx_status模块
- top
- htop

### 小结
然而，实际的内存消耗受到多个因素的影响，包括配置参数、流量负载、模块使用等。如果您有特定的需求或预期的用户量，建议进行压力测试和性能评估，以获取更准确的内存消耗估计值。