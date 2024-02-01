# Linux 技巧

## 文档

[linux学习路线-公众号](https://mp.weixin.qq.com/s/VNUdFFs-wCnZO7EwYNV0EQ)

[linux常用命令大全](https://man.niaoge.com/)

## 开发运维常用命令

- 查询目前端口占用情况(端口、进程 PID) `netstat -tunlp`
- 查询指定端口占用情况 `netstat -tunlp | grep <port>`
- 查看目前进程情况 `ps -ef`
- 查看指定名称/ PID 的进程情况 `ps -ef | grep <programName/PID>`
- 查找进程 PID 对应的文件路径 `ls -l /proc/PID/exe`
- 文件查找 `find <path> -name "<fileName>"`

## 常用命令解析

### grep

```shell
// 查找所有文件中包含choregraphe字符串文本的文件
grep -rn "choregraphe" *

参数说明:
* 表示当前目录所有文件，也可以是某个文件名
-r 是递归查找
-n 是显示行号
-R 查找所有文件包含子目录
-i 忽略大小写
```

### tree

```shell
// 查看文件和目录(显示隐藏文件、更新时间、颜色、最大深度(2))
tree -aCD -L 2
```

## 处理Linux存储占满问题

> 主要处理思路: 分析文件存储大小，然后查看当前deleted的进程的文件占用，优先处理不需要的文件和deleted进程的文件。

1. 分析存储占用分布

```shell
df -h
```

2. 分析具体文件夹的存储占用

```shell
// 查看当前目录文件夹的空间占用，显示到第一层目录
sudo du -ah --max-depth=1
```

3. 分析deleted进程存储占用

```shell
sudo ls -l /proc/*/fd | grep '(deleted)'
```

4. 杀死deleted进程、删除不必要的文件

## 管理用户

```shell
创建用户：useradd user
设置密码：passwd user
删除用户：passwd -rf user (-rf是为了删除用户相关的缓存文件，但是最好不用-rf，避免在删除用户后无法恢复)
```

## 防火墙端口管理

> 基于Centos服务器

### 文档

[博客-掘金](https://www.jianshu.com/p/fa5527cbfbcb)

[在线端口扫描工具](http://tool.pfan.cn/scanport)

### 总结

#### 使用firewalld管理端口

- 查看防火墙端口是否开放

```shell
// 查看30000 TCP端口是否开放
firewall-cmd --query-port=30000/tcp
```

> 除了上述命令查看的方式，还可以使用工具扫描服务器端口。比如namp或者一些在线工具。

- 查看防火墙开放的端口列表

```shell
firewall-cmd --zone=public --list-ports
```

- 开放防火墙端口
  > 开放端口后通常需要重启防火墙

```shell
// 开放30000 TCP端口
firewall-cmd --zone=public --add-port=30000/tcp --permanent
```

- 关闭防火墙

```shell
systemctl stop firewalld
```

- 关闭防火墙

```shell
systemctl start firewalld
```

## Error:Failed to synchronize cache for repo 'AppStream'

> Centos使用yum安装软件报错，参考以下文档更换源内容成功解决。

### 文档

[问题处理博客-知乎](https://zhuanlan.zhihu.com/p/469500685)

## Yum换源

### 文档

[博客-阿里](https://developer.aliyun.com/mirror/centos?spm=a2c6h.13651102.0.0.3e491b11yvUdYp)

## 总结

> centos8之后官方就不支持了, 阿里推荐centos-vault源. 如果一个一个去给repo文件换源, 会比较麻烦(其实就是更换下载源地址而已).
> 其实只需要把/etc/yum.repo.d内的文件替换成阿里yum镜像源文件即可. 注意还是备份之前的文件.

1. 下载源
   > 最好把原CentOS-Base.repo文件备份一下。

```shell
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
```

2. 清除缓存并重新构建yum源

```shell
yum clean all
yum clean dbcache
yum makecache
```

## linux的进程和线程限制查询和修改

### 文档

- https://blog.51cto.com/u_14888059/3795275
- https://www.its203.com/article/m0_37814112/103066049
- http://www.ideabuffer.cn/2016/11/20/Linux%E9%85%8D%E7%BD%AE%E8%B0%83%E4%BC%98%EF%BC%9A%E6%9C%80%E5%A4%A7%E6%89%93%E5%BC%80%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6%E4%B8%AA%E6%95%B0/

### cron

Linux 中的 cron 是一个用于定期执行任务的工具，通常用于在后台自动执行一些系统维护、数据备份等任务。

cron 使用了一个称为 crontab 的配置文件来定义要执行的任务。每个用户都可以拥有自己的 crontab 文件，并且只能由该用户进行编辑。

#### 常用命令

```shell
# 编辑当前用户crontab配置
crontab -e
# 查看当前用户crontab配置
crontab -l
# 清除当前用户crontab配置
crontab -r

# linux
# 启动cron
systemctl start crond.service
# 重启cron
systemctl restart crond.service
# 关闭cron
systemctl stop crond.service
# 查看cron状态
systemctl status crond.service

# mac
# 启动cron
sudo /usr/sbin/cron start
# 重启cron
sudo /usr/sbin/cron restart
# 关闭cron
sudo /usr/sbin/cron stop
# 查看cron状态
sudo /usr/sbin/cron status
```

### expect

#### DOCS

- [expect-wikipedia](https://en.wikipedia.org/wiki/Expect)
- [expect-medium](https://medium.com/@susantamon/automating-shell-script-with-expect-509518bce6d1)
- [如何在mac上打开新终端-stackoverflow](https://stackoverflow.com/questions/19440007/mac-gnome-terminal-equivalent-for-shell-script)

#### Review

##### 自定义shell在多个窗口启动不同ssh会话

定义一个公共的expect脚本, 用于开启ssh会话.

然后不同的ssh配置对应一个ssh-session.sh脚本, 并使用ssh-tools.sh脚本进行执行. ·

###### REDEME

```shell
# 启动
./ssh-tools.sh
```

###### Code

- ssh.exp

```expect
#!/usr/bin/env expect -f

# Procedure to attempt connecting; result 0 if OK, 1 otherwise
proc connect {passw} {
  expect {
    "password:" {
      send "$passw\r"
        expect {
          "sftp*" {
            return 0
          }
        }
    }
  }
  # Timed out
  return 1
}

# Read the input parameters
set user [lindex $argv 0]
set passw [lindex $argv 1]
set host [lindex $argv 2]

#puts "Argument data:\n";
#puts "user: $user";
#puts "passw: $passw";
#puts "host: $host";

# Check if all were provided
if { $user == "" || $passw == "" || $host == ""}  {
  puts "Usage: <user> <passw> <host>\n"
  exit 1
}

# Sftp to specified host and send the files
spawn ssh $user@$host

set rez [connect $passw]
if { $rez == 0 } {
  interact
}
puts "\nError connecting to server: $host, user: $user and password: $passw!\n"
exit 1
```

- ssh-session-1.sh

```shell
#!/bin/bash
/usr/bin/expect ssh.exp [user] [passwd] [ip]
```

- ssh-session-2.sh

```shell
#!/bin/bash
/usr/bin/expect ssh.exp [user] [passwd] [ip]
```

- ssh-tools.sh

```shell
#!/bin/bash
open -a Terminal.app ssh-session-1.sh
open -a Terminal.app ssh-session-2.sh
```

#### Document

- [crontab-linux-优质博文-CSDN](https://blog.csdn.net/qq_38925100/article/details/123043112)
- [crontab-mac-优质博文-简书](https://www.jianshu.com/p/eed084ac3d1b)

### firewallD

> linux管理防火墙的命令工具，类似的命令工具还有iptables。从Centos 8 开始，firewallD取代iptables作为默认的防火墙管理工具。

#### Docs

- [如何在CentOS 8配置防火墙firewalld-优质博客](https://www.myfreax.com/how-to-configure-and-manage-firewall-on-centos-8/)

#### Reviews

##### 安装防火墙

```shell
sudo yum install firewalld
# 查看防火墙状态
sudo firewall-cmd --state #防火墙状态 running
# 启动防火墙
sudo systemctl start firewalld
sudo systemctl enable firewalld
```

##### 启动防火墙

```shell
sudo systemctl start firewalld
```
