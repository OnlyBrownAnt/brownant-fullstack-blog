# 加解密总结

## Docs

## 加解密在线工具集

- [The X 在线工具箱](https://the-x.cn/cryptography/Rsa.aspx)
- [程默的博客](http://tool.chacuo.net/cryptrsapubkey)

## RSA

### Docs

- [JavaScript的RSA加密库(cryptico、Node-rsa、Crypto、jsrsasign、JSEncrypt)-CSDN](https://blog.csdn.net/junxuezheng/article/details/109824552)
- [jsrsasign-npm](https://www.npmjs.com/package/jsrsasign)
- [JSEncrypt-RSA加解密JS库-github](https://github.com/travist/jsencrypt)
- [JSEncrypt长文本分段加解密-简书](https://www.jianshu.com/p/b274bc09f9b8)
- [JSEncrypt加解密介绍-优质博客](https://www.cnblogs.com/JQstronger/p/rsa_vue.html)

### RSA长文本加解密问题、中文部分乱码问题

#### Docs

- [前端RSA长明文分段加密，后端解密偶现失败的解决方案-掘金](https://juejin.cn/post/7039016811299340319)
- [rsa加密前后端分段解密出现中文部分乱码解决方法](https://blog.csdn.net/m0_64512327/article/details/121851374)
- [JSEncryptExt-github](https://github.com/bartlian/jsencrypt-ext/blob/main/src/JSEncryptExt.ts)

#### 解决方案

1. 长文本加解密问题，使用分块加解密。

2. 中文部分乱码问题，(前端和服务端约定)在加密前和解密后分别进行URL编码和URL解码。
   
   > 缺点是会增大传输报文，不建议对大报文进行RSA加解密
