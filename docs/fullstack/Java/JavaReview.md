# Java 技术方案和常见问题总结

## Java 技术方案积累思路

- [spring](https://spring.io/guides)

参考 Spring 全家桶的各种技术实现方案，理解并扩展。

## JDK 版本选择

- [oracle JDK 17](https://www.oracle.com/cn/java/technologies/downloads/#java17)
- [以是否应该升级到JDK 17为例看to B行业的技术选型和升级](https://www.cnblogs.com/lightdb/p/17625453.html)

### 2024-2-1

目前 SpringBoot 3 最低支持 JDK 17。加上 JDK 17 性能提升显著，升级 JDK 17 将是趋势。不过需要注意 2024年9月 之后许可证情况。

```shell
# brew 安装
brew install oracle-jdk17
```

## 如何学习Java工程搭建

1. 学习推荐的工程结构思想
   > - [工程目录推荐-p3c-P37](https://github.com/alibaba/p3c#preface)
   > - [优质博客](https://zhuanlan.zhihu.com/p/115403195)
2. 在理解基本思想的情况下，创建实战工程
3. 根据开源工程对比验证实战工程的正确性
   > - [mall-开源商城-Github](https://www.macrozheng.com/)
4. 根据验证结果重构实战工程
5. 总结

## Field injection is not recommended

在IDEA中使用Autowired注解的时候会提示 "Field injection is not recommended"。原因是Spring官方不建议基于属性注入，而是基于构造方法注入。

基于属性注入时有几个缺点如下:

1. 如果在Authwired注入之前使用对应的对象操作取值以用于其他需要实例的对象进行初始化时，会出现空指针的错误。因为类实例化时，变量实例在Authwired之前，所以会出现这种问题。

```java
@Authwired
private ClassDemo1 classdemo1;

private ClassDemo2 classdemo2;

public void init() {
  this.classdemo2 = classdemo1.getDemo2();
}
```

2. 属性注入的导致当前的类会承担过多的职责。
3. 属性注入是以反射为基础的。但是在单元测试时会绕过反射，这个时候还得在单元测试类中再次注入。

### Review

1. 不建议以new的方式创建需要依赖注入的类
   > 不建议以new的方式创建需要依赖注入类，因为会出现下面这种情况，如果某个类中使用到的对象实例是进行依赖注入的，那么这个类在使用的时应该以依赖注入的方式。
   >
   > 不能以new的方式来创建实例使用，否则该类里面的通过依赖注入的对象实例注入是失败的，导致对象为null。

### Document

- [优质博文](https://juejin.cn/post/6965673679342551048)

## Spring-Boot全局异常处理

### 实例

全局拦截Controller类Exception异常

1. 创建全局异常类。
2. @ControllerAdvice 添加到类上，拦截Controller类异常。
3. @ExceptionHandler(Exception.class) 添加到拦截处理方法上，拦截对应异常。(这里拦截Exception异常)。
4. @ResponseBody 添加到拦截处理方法上，将返回结果直接写入 HTTP response body 中。

### Review

1. 对于返回结果可以通过封装结果类，错误码枚举，进行更统一的进行结果的封装返回。。

### Document

- [异常处理-优质博文-CSDN](https://blog.csdn.net/qq_41107231/article/details/115874974)

## 不建议HashMap作为参数传递

1. HashMap参数不可控，违反单一职责原则，增加了不必要的职责处理。
2. 因为HashMap参数不可控，HashMap传参也不利于业务代码的维护和梳理。

## IDEA 工程模块化设置

- [idea/modules](https://www.jetbrains.com/help/idea/creating-and-managing-modules.html)
- [谁再把IDEA的Project比作Eclipse的Workspace，我就跟谁急](https://mp.weixin.qq.com/s/1eZ0cI5dA4QVNniAHN424w)

TODO
