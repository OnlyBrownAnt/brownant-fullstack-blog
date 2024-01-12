# Spring-Boot 总结

## Docs
- [spring-boot/docs](https://docs.spring.io/spring-boot/docs/)
    > Spring Boot 参考文档 (所有版本)
- [Spring Boot Reference Documentation (current)](https://docs.spring.io/spring-boot/docs/current/reference/html/index.html)
    > Spring Boot 参考文档 (默认是最新版本)
- [Spring Boot Reference Documentation (2.7.8)](https://docs.spring.io/spring-boot/docs/2.7.8/reference/html/)
    > Spring Boot 参考文档 (2.7.8 版本)

## Spring-Boot 配置文档
- [application-properties/appendix.application-properties.server](https://docs.spring.io/spring-boot/docs/2.7.8/reference/html/application-properties.html#appendix.application-properties.server)
    > 服务器配置，包括内嵌 Tomcat 的配置。
## Spring-Boot 配置技巧

### 配置多环境配置文件
- [features.external-config.files](https://docs.spring.io/spring-boot/docs/2.7.8/reference/html/features.html#features.external-config.files)
- [features.external-config.files.profile-specific](https://docs.spring.io/spring-boot/docs/2.7.8/reference/html/features.html#features.external-config.files.profile-specific)


### 基础说明
1. 参数
- spring.config.name 
    > 配置名称，默认 `application`
- spring.profiles.active
    > 定义 profile 配置名

2. 支持的配置名称规则
    > - spring.config.name -> `application`
    > - spring.profiles.active 处理 `profile` 
    > - 处理顺序从上往下(越是最后处理优先级越高)
- application 
- application-{profile}

3. 支持后缀
    > 处理顺序从上往下(越是最后处理优先级越高)
- properties
- yml

4. 支持处理目录
- classpath/
- classpath/config/*

### 总结
1. 按照支持配置名称规则，定义配置文件。
2. 打包后启动服务时指定参数使用对应配置。
    > 开发期间只设置一次 spring.profiles.active 为 dev 即可。
3. 推荐 yml 配置方式，存放于 config 文件夹方便统一管理。

### 实例
```
# 目录结构
- resource/
    - application.properties 
    - config/
        - application.yml
        - application-dev.yml
        - application-prod.yml

# 服务启动命令 - dev 环境
java -jar project.jar --spring.config.name=application --spring.profiles.active=dev
# 服务启动命令 - prod 环境
java -jar project.jar --spring.config.name=application --spring.profiles.active=prod
```

### Jar 和 War 的区别
- [为什么现在的 Java Web 应用程序中 JAR 比 WAR 更好？](https://www.quora.com/Why-is-JAR-better-than-WAR-in-a-Java-web-application-nowadays)
    > 问题，通过评论区回答了解部分开发者对这个问题的态度。
- [java-jar-war-packaging](https://www.baeldung.com/java-jar-war-packaging)
- [SpringBoot 在打包部署的时候打包成 jar 和 war 有什么不同?](https://cloud.tencent.com/developer/article/2222341)

#### 区别
- Jar 是一个压缩文件，其中包含 .class 文件的压缩版本以及已编译的 Java 库和应用程序的资源。
- War 是 Web 应用程序存档，里面除了包含 Jar 包的资源外 还在 WEB-INF 目录下 包含 Web 应用程序资源。

#### 总结
Spring-Boot 推荐 Jar 方式部署，因为适配云原生的一个部署方式。更短的冷启动时间、更方便的一个分发部署方式、更加灵活具有弹性。但是只限于单纯的服务程序部署，如果包含了 Web 应用，还是需要 War 方式进行部署。