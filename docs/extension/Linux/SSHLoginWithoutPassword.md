# SSH 实现免密登陆

## 前言

在日常开发和排查问题时，在需要频繁或者长时间通过ssh协议登陆服务器时，经常会遇到连接超时或者需要重复输入密码的情况。现在已经有很多工具都能很好的帮助解决这些问题，比如xshell、sercure CRT等。在需要管理服务器较多，或者需要其他功能比如跳板机设置，使用这些工具都会比较得心应手。缺点也有，那就是商业版要money，但是好用也是真的。

作为标准白嫖党，如果尝试利用好手中现有的工具实现基本的功能也不失为一个好方法。毕竟我们平时其实也只会使用到一些比较基本的功能。

## OpenSSH介绍

OpenSSH（OpenBSD Secure Shell）是使用SSH透过计算机网络加密通信的实现。它是取代由SSH Communications Security所提供的商用版本的开放源代码方案。

### ssh

`OpenSSH 远程登录客户端`

`ssh`还可以从每个用户的配置文件和系统范围的配置文件中获取配置数据。文件格式和配置选项有以下三个来源。

1.  命令行选项
1.  用户的配置文件（~/.ssh/config)
1.  系统范围的配置文件（/etc/ssh/ssh_config)

可以简单理解sshd是客户端。

### sshd

`OpenSSH 守护进程`[^5]

`sshd` 可以使用命令行选项或配置文件进行配置（默认情况下/etc/ssh/sshd_config); 命令行选项会覆盖配置文件中指定的值。

可以简单理解sshd是服务端。

## 免密登陆方案

### 基于公钥

文件 ~/.ssh/authorized_keys列出允许登录的公钥。当用户登录时， `ssh`程序会告诉服务器它想使用哪个密钥对进行身份验证。客户端证明它可以访问私钥，服务器检查相应的公钥是否有权接受该帐户。

简单来说就是把客户端的公钥配置在服务端的authorized_keys文件中，这样客户端登陆时可以直接对比公钥认证不需要进行密码认证了。

#### 案例

##### 获取客户端公钥

> 客户端公钥地址是～/.ssh/id_rsa.pub

![截屏2021-12-12 下午4.42.44.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ff7a1a50b6b457dac513c08c0e99f9b~tplv-k3u1fbpfcp-watermark.image?)

##### 将公钥存放至服务端authorized_keys文件

> 这里是使用vim工具进行文本编辑的。
> ![截屏2021-12-12 下午4.45.12.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b821b7de369844b2a6d69e819623c177~tplv-k3u1fbpfcp-watermark.image?)

##### 尝试连接

![截屏2021-12-12 下午4.48.15.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1591f69e84f14eb7be775182b24f2d92~tplv-k3u1fbpfcp-watermark.image?)

### 基于多路复用

多路复用通常表示在一个信道上传输多路信号或数据流的过程和技术。OpenSSH 客户端支持多路复用其传出连接，使用在ssh_config中定义的`ControlMaster`、`ControlPath`和`ControlPersist`配置指令。客户端配置文件通常默认为~/.ssh/config位置。

具体的指令详解参考ssh_config文档。

#### 案例

> 已知一台服务器和一台客户端。服务器地址192.168.0.1，账号密码分别是root，12345678。

##### 设置客户端配置指令

1.  打开用户级别的ssh配置文件
    > 这里使用了vim命令，也可以直接使用编辑器打开config文件。
    > ![截屏2021-12-12 下午4.18.44.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d319b2f35f394fa98741bdb501057983~tplv-k3u1fbpfcp-watermark.image?)
2.  输入以下内容并保存文件
    > 该配置对所有主机的连接有效。
        ```
        Host *
            ControlMaster auto
            ControlPath ~/.ssh/%h-%p-%r
            ControlPersist yes
        ```

##### 尝试连接

> 遮盖部分是ip地址或者敏感信息。

> 连续进行两次登陆，查看登陆效果
> ![截屏2021-12-12 下午4.24.15.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acc1afa275da4fc9859d8f65608075ec~tplv-k3u1fbpfcp-watermark.image?)

> 查看自动保存的会话文件
> ![截屏2021-12-12 下午4.28.45.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bafd5566fcd146a095711c722f709dea~tplv-k3u1fbpfcp-watermark.image?)

## 连接超时设置

### 设置客户端访问服务器超时时间

既然是设置客户端访问服务器的超时设置，那么只需要设置客户端配置文件即可，要求简单使用时可以直接设置系统范围的配置文件（/etc/ssh/ssh_config)。

> 推荐在用户级别配置文件(~/.ssh/config)

涉及两个参数`ServerAliveCountMax`、`ServerAliveInterval`具体参数详情可以查看ssh_config文件详解。简单而言ServerAliveCountMax表示客户端在没有服务器发送消息回来时，自动发送消息的最大次数，默认三次。ServerAliveInterval表示客户端在服务器没有发送消息回来时，多久会超时，单位时秒默认15秒。每次超时之后客户端会自动发送消息到服务器，直到超过最大次数ServerAliveCountMax就会超时，所以平常我们使用时超时时间是3\*15=45秒。

通常设置ServerAliveInterval为30或者60即可。

#### 打开客户端配置文件

> ssh_config(/etc/ssh/ssh_config)，注意进行修改该文件时需要用root权限。需要使用sudo命令获取root权限。
> ![截屏2021-12-12 下午5.14.03.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f054fff0ec64eb899700b586b180258~tplv-k3u1fbpfcp-watermark.image?)

#### 输入超时参数

> 在Host标签下面输以下入参数

```
ServerAliveCountMax 20000
ServerAliveInterval 60
```

> 实例图

![截屏2021-12-12 下午5.07.40.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f59e032e36f4682865c50d7eebde981~tplv-k3u1fbpfcp-watermark.image?)

## 总结

通过这些简单的设置可以使自己也能体验到商业软件开箱即用的功能。但是在实际工作中的实用性和可行性不一定会好，特别是需要考虑权限和安全性的情况。而且工具的本质就是工具，建议该花钱的不要省，当然如果公司体谅并能为我等打工人负担一点就更好了（狗头），毕竟盗版用久了还是不得劲，而且白嫖盗版也不等于支持开源。

## 附录

[wikipedia-OpenSSH](https://zh.wikipedia.org/wiki/OpenSSH)

[OpenSSH](https://www.openssh.com/)

[ssh](https://man.openbsd.org/ssh.1)

[ssh_config](https://man.openbsd.org/ssh_config)

[sshd](https://man.openbsd.org/sshd.8)

[sshd_config](https://man.openbsd.org/sshd_config.5)

[wikipedia-Multiplexing](https://zh.wikipedia.org/wiki/%E5%A4%9A%E8%B7%AF%E5%A4%8D%E7%94%A8)

[wikibooks-OpenSSH-Multiplexing](https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Multiplexing)

[OpenSSH-authorized_keys](https://man.openbsd.org/sshd.8#AUTHORIZED_KEYS_FILE_FORMAT)
