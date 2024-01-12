# MySQL 总结

## Docs
- "MySQL 必知必会" Ben Forta，(译) 刘晓霞、钟鸣
- "高性能 MySQL(第三版)" Baron Schwartz、Peter Zaitsev、Vadim Tkachenko ，(译) 宁海元、周振兴、彭立勋、翟卫祥、刘辉
- [MySQL常见面试题总结](https://javaguide.cn/database/mysql/mysql-questions-01.html)
    > 通过面试题快速回顾MySQL的实战知识重点


## 常见问题
### (MySQL 8) public key retrieval is not allowed
- [MySQL/6.3.3 创建 SSL 和 RSA 证书和密钥](https://dev.mysql.com/doc/refman/8.0/en/creating-ssl-rsa-files.html)
- [mysql 8 public key retrieval is not allowed](https://juejin.cn/s/mysql%208%20public%20key%20retrieval%20is%20not%20allowed)
- [MySQL 8.0 Public Key Retrieval is not allowed 错误的解决方法](https://blog.csdn.net/u013360850/article/details/80373604)

### 原因
MySQL 8 默认用户连接时采用的认证方式是 sha256_password。这是一种 RSA 加密，所以会涉及到RSA公钥的配置和获取问题。

### 解决办法
1. 开启连接属性`AllowPublicKeyRetrieval = True` 但是可能会有安全问题
    > 安全问题: 恶意的代理通过中间人攻击(MITM)获取到明文密码
2. 在客户端配置 MySQL 服务器的公钥
    > 在安装阶段一般会生成MySQL 公钥。如果没备注就需要重新生成和配置。