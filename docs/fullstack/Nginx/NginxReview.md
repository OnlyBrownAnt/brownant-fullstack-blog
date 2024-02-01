# Nginx基础总结

## 文档

- [docs-nginx](https://nginx.org/en/docs/)
- [安装教程-linux-官方](https://nginx.org/en/linux_packages.html)
- [快速教程-官方](https://nginx.org/en/docs/beginners_guide.html)
- [优质教程-微信公众号](https://mp.weixin.qq.com/s/OAIbQTQGLEQoEM8ZYgPkRA)
- [Nginx面试题（史上最全 + 持续更新）](https://zhuanlan.zhihu.com/p/607997892)
- [NG配置讲解-优质博客](https://www.cnblogs.com/54chensongxia/p/12938929.html)
- [Nginx知识点汇总](https://www.cnblogs.com/songgj/p/10946825.html)

## 常用命令

- 查询nginx进程: ps -ef | grep nginx
- 查询nginx启动路径: ls -l /proc/(PID)/exe
- 验证nginx配置文件: sudo /usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
- 查询nginx启用的模块: sudo /usr/local/nginx/sbin/nginx -V
- 查询nginx版本: sudo /usr/local/nginx/sbin/nginx -v
- 指定配置文件启动nginx: sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

## Nginx默认目录

注意: yum安装的nginx默认配置目录和源码压缩包编译方式产生的默认路径不同。

- Nginx安装目录: /usr/local/nginx
- 启动脚本目录: /usr/local/nginx/sbin/nginx
- 配置文件目录: /usr/local/nginx/conf/nginx.conf
- 静态文件目录: /usr/local/nginx/html
- 默认日志目录: /var/log/nginx/

## 部署Nginx教程

> linux部署Nginx(源码压缩包编译安装方式)，需要使用root权限账号。

1. 安装编译工具
   yum -y install gcc gcc-c++ autoconf automake
2. 安装可能用到的依赖包
   yum -y install zlib zlib-devel openssl openssl-devel pcre pcre-devel
   (压缩、ssl、正则)
3. 编译安装nginx
4. tar -zxvf nginx.tar.gz
5. cd nginx
6. ./configure (默认没有启用编译选项，如果需要某些模块，就需要添加编译选项进行重新编译安装)
7. make
8. sudo make install

## Nginx安装模块

- [安装ssl模块](https://blog.csdn.net/guo_qiangqiang/article/details/95622649)

使用压缩包编译方式重新安装。先调用模块配置脚本 ./configure，后续参数就是需要增加的模块。

## 如何使用多个配置

- [include指令妙用](https://akuma.github.io/2013/11/02/%E4%BD%BF%E7%94%A8-include-%E6%8C%87%E4%BB%A4%E7%AE%80%E5%8C%96-Nginx-%E9%85%8D%E7%BD%AE/)

include 指令

```text
include /etc/nginx/conf.d/*.conf;
```

## Nginx封禁频繁访问的IP

禁止1分钟内访问超过60次的IP

### Docs

- [优质文章-微信公众号](https://mp.weixin.qq.com/s?__biz=MzA3ODg3OTk4OA==&mid=2651153498&idx=2&sn=29a460e43ac61c8a538ba2dd86dce207&chksm=844dc9c1b33a40d7bd44f5fc79521dc828a9a5721e695cb296cf7e428a86533e32d85ecdbb56&mpshare=1&scene=1&srcid=0331bMR7gEvsGn2XjbA1XiXM&sharer_sharetime=1680226101372&sharer_shareid=a0d28c18cab2ddf1a05f337d29b33f73&version=4.1.0.99228&platform=mac#rd)

### 思路

nginx配置支持deny IP来禁止IP的访问。nginx这次通过include的方式引入配置。

### Steps

1. 预定义一个IP黑名单配置文件blockip.conf
2. 写一个shell脚本，扫描nginx的访问日志access.log，提取访问超过60次的IP组装成"deny \$\{IP\}"字符串写入block.conf，然后清空access.log。
3. 通过crontab设置定时运行该shell脚本。

### Review

每次都把access.log清空不利于历史日志分析。可以按照时间作为参数增加日志筛选的作用。

## MIME配置

mime.types 是 Nginx 的配置文件，用于定义 MIME 类型（Multipurpose Internet Mail Extensions）与文件扩展名之间的映射关系

MIME（Multipurpose Internet Mail Extensions）类型是一种标准化的方法，用于表示互联网上不同类型文件的内容和格式。它最初设计用于电子邮件传输，但后来被广泛应用于 Web 浏览器和其他互联网应用程序中。

在 Web 开发中，每个文件都有一个 MIME 类型，用于指示服务器如何处理和解释该文件的内容类型。MIME 类型告诉客户端浏览器如何正确地解析和展示文件，例如确定文件是 HTML、CSS、JavaScript、图像等内容。

types可以指定应答MIME-types的扩展名。可以通过设置mime.types通过include进行公共的引用。

## Nginx常见错误

### NGINX setrlimit(RLIMIT_NOFILE, 51200) failed

这个报错是因为系统最大打开文件数和nginx的worker_rlimit_nofile不匹配所致。需要修改系统最大打开文件数同nginx的worker_rlimit_nofile一样。

```shell
# 查询进程最大打开文件数
umilit -n
```

### alias在正则下不生效

在正则下需要root和rewrite搭配使用。

alias = location正则 + root + rewrite

> 但是alias在location正则下是不生效的。

### 60秒返回404错误

#### Docs

- [采坑系列：nginx超时配置&404-CSDN](https://blog.csdn.net/qq_35764295/article/details/103876647)

#### 原因分析

1. 404原因是转发等待服务器响应头超过60s导致超时，但是又找不到50x.html页面，素以返回404。正常情况下应该返回503错误

#### 解决方案

1. 转发proxy设置超时300s
2. 检查耗时请求逻辑，减少耗时。

## Nginx自定义日志格式

- [自定义格式类型](https://www.cnblogs.com/kevingrace/p/5893499.html)

使用log_format指令指定日志格式命名以及设置日志格式。

- 最好设置单行，避免设置日志文件浪费空间。
- 建议每个serve的每个location一个log

## Nginx的Gzip压缩配置

- [gzip配置](https://blog.51cto.com/u_13236892/5837551)
- [gzip推荐配置](https://www.likecs.com/show-203350241.html)

## Nginx SSL证书配置和测试

### 配置说明

- [SSL证书](https://letsencrypt.org/
  https://blog.csdn.net/m0_52440465/article/details/130713591?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-3-130713591-blog-121972525.235%5Ev38%5Epc_relevant_sort_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-3-130713591-blog-121972525.235%5Ev38%5Epc_relevant_sort_base3&utm_relevant_index=6)
- [签发ssl证书](https://blog.csdn.net/qq_36860967/article/details/130739221
  https://blog.neroxps.cn/2017/10/18/certbot-nginx-renew/
  https://certbot.eff.org/instructions?ws=nginx&os=centosrhel8)
- https://www.cnblogs.com/saneri/p/5391821.html
- DNS需要有一条www的A记录

### 本地搭建Nginx SSL证书配置测试

#### Docs

- [本地搭建https测试](https://blog.csdn.net/lihefei_coder/article/details/121930553)
- [刷新mac hosts](https://www.cnblogs.com/qxrblog/p/17424457.html)
- [mac下新增信任证书](https://juejin.cn/post/6863357013658632199)
- [nginx参数配置要领](https://blog.csdn.net/zhuyu19911016520/article/details/90714429?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D)

#### Steps

1. 刷新mac hosts
2. mac下新增信任证书
   添加到钥匙串的login里面
3. 本地测试ssl证书，需要配置host，并且断网测试

#### 常见问题

- \*143 upstream timed out (110: Operation timed out) while connecting to upstream,

proxy_add_herder Host $host
如果中转了一层ng访问tomcat，当初次加载页面返回302错误时，现象是这层ng的请求IP就会作为响应报文的Host被浏览器加载，变相的修改的URL，跳转到错误页面。
需要重新拼接域名才能访问正常。
