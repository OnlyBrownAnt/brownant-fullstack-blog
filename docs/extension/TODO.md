# TODO 
感兴趣但是未了解的内容

### 文件预览项目-JAVA
#### Document
1. 参考源码: https://gitee.com/kekingcn/file-online-preview
2. 思路: 利用OpenOffice实现在线预览
3. OpenOffice官网: https://blogs.apache.org/OOo/entry/announcing-apache-openoffice-4-19

### Dubbo
#### Document
- [官方文档](https://dubbo.apache.org/zh/docs/)
- [官方快速教程](https://dubbo.apache.org/zh/docs/languages/java/quick-start/)
- [面试题JavaGuide](https://javaguide.cn/distributed-system/rpc/dubbo.html)

### Frp
内网穿透工具
#### Document
- [少数派](https://sspai.com/post/52523)
- [frp官网文档](https://gofrp.org/docs/reference/)

### 数据迁移(DB导出Excel)-JAVA
#### Document
- [教程](https://mp.weixin.qq.com/s/Hy_IxZ5jf6GpV9mlCeTgyA)

### Lua
#### Document
- [Lua-官网](https://www.lua.org)
- [快速教程](https://www.lua.org/start.html)

### Gradle
#### Document
- [官方网站](https://gradle.org/install/)
- [官方教程课程](https://gradle.com/training/)

### 分布式文件存储Minio
#### Document
- [Minio官网](https://min.io/)
- [服务端快速教程](https://docs.min.io/docs/minio-quickstart-guide.html)
- [客户端快速教程](https://docs.min.io/docs/java-client-quickstart-guide.html)
- [优质博客](https://www.jianshu.com/p/1c768a7802d1/)
- [优质博客(私有云环境)](https://soulteary.com/2021/11/04/)private-cloud-environment-installed-in-a-notebook-storage-part-1.html
- [优质博客(分布式文件系统简介)](https://zhuanlan.zhihu.com/p/138896704)


#### minio网关作用
作为文件系统的门户
比如nas文件系统

#### 分布式文档管理系统
可以使用k8s管理，大厂都在用，听起来就很厉害，建议学习

不过商业版是收钱的，不确定社区版(开源版)如何
开源版本问题：使用了AGPLv3协议https://opensource.org/licenses/AGPL-3.0，不过作为工具提供服务，应该不会触发协议导致需要进行项目源代码开源。

#### console是minio服务端的内置浏览器
可以通过--console-address参数暴露给浏览器供外部访问

MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password ./minio server /mnt/data --console-address “:9001”

MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password nohup ./minio server /mnt/data --console-address ":9001" > /mnt/data/minio.log 2>&1

### Astro

#### Document
- [快速教程-官方](https://docs.astro.build/zh-cn/getting-started/)
- [博客-知乎](https://www.zhihu.com/question/464084419)

#### 总结
优点，前端上层应用框架

### 基于VitePress定制博客
预计增加内容
- 博客问答模块
- 博客访问统计
#### Document
- [VitePress](https://vitepress.dev/)

### AI调教
#### Document
 - [awesome-chatgpt-prompts-zh-Github](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)

### Web3.0社交APP
#### Document
- [web3.0课程](https://www.edx.org/school/web3x)
- [damus-去中心化社交APP](https://github.com/damus-io/damus)

### 渗透练习
#### Document
- [the-best-hacking-books-2018-Github](https://www.hackingtutorials.org/infosec-books/the-best-hacking-books-2018/)

### 股票进阶
#### Review
##### 课程和实践推荐
- 有知有行APP 
很适合炒股和基金学习入门。
- 同花顺模拟炒股APP
在同花顺基础上提供了模拟资金进行模拟炒股。
- 同花顺APP
一个提供股票市场和基金市场信息的APP，也是一个炒股平台。

### JAVA身份认证
#### Document
- [JWT 实现登录认证 + Token 自动续期方案](https://mp.weixin.qq.com/s/66t3lrB3WSCc6zTqyCXAmg)
#### Review

### 客户端密钥交换流程
客户端上送和接收响应用两套RSA公钥和密钥，分别存储加密上送的公钥和解密响应的私钥在本地。然后通过md5编码私钥

##@ 代码风格设置
- [editorconfig](https://editorconfig.org/)
- [EditorConfig Properties](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)

### 创业
#### Docs
- [新的里程碑 🎉 独立开发的作品简单简历月收入达到3000元-BiliBili](https://m.bilibili.com/video/BV1uN411Y7Bu)
- [一位日本独立开发者从0到盈利过程的自述！-BiliBili](https://www.bilibili.com/video/BV1fj41167ML/?vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)
- [面试阿里，被问：分布式ID生成有几种方案？答完直接给了30k-BiliBili](https://www.bilibili.com/video/BV1Ch4y157TF/)

#### Review

### SQL性能优化
#### Docs
- [SQL性能优化，用这15招就够了-BiliBili](https://www.bilibili.com/video/BV1CX4y1Y7rm/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)

### Java面试题技巧、
#### Docs
- [一个很变态但可以让你迅速掌握 Java面试-BiliBili](https://www.bilibili.com/video/BV1cx4y1d74B/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)
- [美团大佬带你一周刷完SpringBoot快速入门到精通系列教程-BiliBili](https://www.bilibili.com/video/BV1Nj41167Mc/)
### Redis基础
#### Docs
- [【GeekHour】一小时Redis教程-BiliBili](https://www.bilibili.com/video/BV1Jj411D7oG/?spm_id_from=333.1007.tianma.3-2-8.click&vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)

### 计算机基础
#### Docks
- [TCP/IP 网络编程从零开始-BiliBili](https://www.bilibili.com/video/BV1pu411G7P6/?vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)


### 从对话了解相关几款工具未来的发展趋势，作为自己对技术栈的选择参考
- [问了尤雨溪25个问题后，我的很多想法开始变了(微信公众号)](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA%3D%3D&chksm=bdb9c6568ace4f403184611fb71884ccebee4f03246d4d0cc6fe8d8721d4359dda6bb0032375&idx=1&mid=2651078149&scene=27&sn=ca4c765bdf96b81825a45d990af294ea&utm_campaign=geek_search&utm_content=geek_search&utm_medium=geek_search&utm_source=geek_search&utm_term=geek_search#wechat_redirect)


### Java 教程
- [阿里大佬一周讲完的Spring Boot3全套视频](https://www.bilibili.com/video/BV1Hw411W7CE/?spm_id_from=333.1007.tianma.2-1-4.click&vd_source=df7c2cd1afdc7ae35be0af6c0c76be67)