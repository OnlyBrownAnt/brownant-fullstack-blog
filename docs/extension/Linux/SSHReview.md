# SSH 基础

## 文档

- [SSH-wikipedia](https://zh.wikipedia.org/wiki/Secure_Shell)
- [OpenSSH-wikipedia](https://zh.wikipedia.org/wiki/OpenSSH)
- [sshd(openssh守护线程)](https://man.openbsd.org/sshd.8)
- [sshd的配置文件](https://man.openbsd.org/sshd_config.5)
- [ssh的配置文件](https://man.openbsd.org/ssh_config.5)

## 总结

### sshd和ssh的区别

sshd是服务端守护程序，ssh主要是指客户端程序。

### 如果设置服务器的连接时间？（服务端被客户端连接时避免超时）

在服务端，通过设置openssh的守护程序配置文件（/etc/ssh/sshd_config）
修改ClientAliveInterval(单位为秒的单次超时时间，如果超时时间内没有收到客户端消息，那么服务器就会发送一次信息)
修改ClientAliveCountMax(服务端可发送活动消息(没有任何内容的空消息)的最大次数)，这样服务端就是每次间隔固定时间发送活动消息，如果超过最大次数才会中断。
注意ClientAliveInterval的设置时间一般在30秒或者60秒。

### 如果设置客户端的连接时间？（客户端去连接服务端时避免超时）

在服务端，通过设置配置文件（/etc/ssh/.ssh_config或者～/.ssh/config）
修改ClientAliveInterval(单位为秒的单次超时时间，如果超时时间内没有收到服务端消息，那么客户端器就会发送一次信息)
修改ClientAliveCountMax(客户端可发送活动消息(没有任何内容的空消息)的最大次数)，这样客户端就是每次间隔固定时间发送活动消息，如果超过最大次数才会中断。
注意ClientAliveInterval的设置时间一般在30秒或者60秒。

### 创建公钥

ssh-keygen -o
