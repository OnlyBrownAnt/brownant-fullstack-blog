# Java 注解(Annotation)

## 了解注解

### 注解是什么

> JAVA注解(Annotation)也称为JAVA标注，是JDK 1.5 引进的一种注释机制。

> 而比较具体的理解描述如下：
>
> 注解是那些插入到源代码中使用其他工具可以对其进行处理的标签。
>
> —— 第十版《JAVA核心技术2》P373

### 进一步理解注解

> 备注：这部分内容属于个人理解，只做参考，有错欢迎留言纠正。

> 看了一下具体描述，有的宝贝可能更加头昏脑涨了。不禁产生了一万个疑问，注解是标签？插入源代码怎么做？其他工具是什么？其他工具要怎么处理注解？

> 在进一步介绍JAVA注解之前我们先简单回顾一下JAVA代码的执行过程，可以更容易帮我们理解注解。
>
> 1. java文件(源代码文件)
> 2. java编译器编译源代码文件，生成字节码文件(类文件)
> 3. JVM虚拟机执行字节码文件中的指令
>    从这个过程中我们可以了解，我们编写的代码是源代码，源码还需要先编译为字节码文件，然后才能由JVM虚拟机执行字节码文件中的指令，程序才算是正式工作。

> 然后再来看可能会想到的四个问题
>
> **1.注解是标签？2.插入源代码怎么做？**
>
> 这两个问题可以不用过度解读，注解的作用就是一个标签的起到备注和提示的作用，不会进行主动操作。而插入代码其实就是把注解当作像public这样的修饰词放在代码中的特定的位置而已。
>
> **3.其他工具是什么？**
>
> 前面提到，注解是标签，那么对应的问题是谁会来处理这些标签呢？我们可以给这个处理者的一个笼统的名称，比如`"注解处理器"`。因为注解也是可以自定义的，所以"注解处理器"不可能全是内置在JAVA开发工具包中的，肯定也会有外部导入一些包，比如处理"@Test"注解需要引入junit的包。因此根据不同的注解，"注解处理器"可能是不同的。
>
> **4.其他工具要怎么处理注解？**
>
> 在第三个问题中，我们提到可以将处理注解的工具笼统的定义为"注解处理器"。而这些"注解处理器"具体处理注解的方式有两种，`第一种方式是在源代码上层次上进行操作。`就是在源代码文件正式编译前，"注解处理器"可以根据注解嵌入新代码。这里需要注意一个问题，这种方式是不能修改已有的源文件的，只能产生一个新的源文件。`第二种方式是处理编译器在其中放置了注解的类文件。`前面提到，java编译器编译源代码文件产生类文件，而JVM虚拟机执行类文件的过程可以认为是程序运行时，所以也可以认为第二种方式的特点就是在程序运行时处理注解。另外处理注解通常都会用到反射相关的知识点。

## 注解语法

> 无论是使用注解还是自定义注解，了解基本的语法是必要的。

### 注解接口(注解类型)的定义

#### 注解接口定义Demo

```java
public @interface AnnotationName {
    String elementName1() default "defaultValue1";
    String elementName2() default "defaultValue2";
}
```

#### @interface

> 如Demo所示，使用@interface进行创建注解接口，进行注解接口的定义。注解是注解接口声明的简称。

#### 注意

- 所有的注解接口都隐式的扩展自java.lang.annotation.Annotation接口，而且不支持再次扩展。

#### 注解元素

#### 元素声明格式

```java
type value() default value
```

#### 元素类型范围

- 基本数据类型(byte、short、int、float、double、long、boolean、char)
- String
- Class(可选类型参数)
- enum类型
- 注解类型
- 由上述类型组成的数组(只支持一维数组)

#### 注意

- 注解元素要求是编译器常量，所以传入时不能设置为null，而且默认值也不能是null。
- 可以不用设置默认值，

### 注解类型的声明

#### 注解类型声明语法

> 基本语法Demo如下，@注解名称(注解元素=注解元素值)，可以包含多个注解元素和值。

```java
@AnnotationName(elementName1="elementValue1", elementName2="elementValue2",···)
```

#### 标记注解

> 如果注解接口中没有定义注解元素，那么在使用注解的时候可以只声明@注解名称，这种类型的注解称为标记注解。

```java
@AnnotationName
```

#### 单值注解

> 如果注解接口中只定义一个注解元素，那么在使用注解的时候可以只声明@注解名称(注解元素值)，这种类型的注解称为单值注解。注意前提是在注解接口中的注解元素名称只能是"Value"。

```java
@AnnotationName(elementValue)
```

#### 注解类型声明使用范围

> 注解使用的范围十分广泛，不同的注解有自己的使用范围。根据使用范围不同分为声明注解和类型用法注解。而主要的使用范围如下

- 包
- 类(包括enum类)
- 接口(包括注解接口)
- 方法
- 构造器
- 实例域(包括enum常量)
- 局部变量
- 参数变量(方法参数或者构造器参数)
- 类型参数(包括引用类型)

#### 注意点

- 在类和接口上使用注解时需要在class和interface关键字之前。
- 对于变量，注解声明放置在类型之前。
- 对于泛型类或方法的类型参数，注解声明则放在"\<"和"\>"之间，在类型参数之前。
- 使用习惯(规范)：声明注解放置在其他修饰词前面，类型用法注解放置其他修饰词后面。

#### 注解this

> TODO 待补充

## 标准注解

> 了解java.lang、java.lang.annotation、javax.annotation包中提供的注解。会根据生存范围或者使用用途进行分类。
>
> TODO 待补充
>
> 参考《JAVA核心技术2》P386

### 元注解

> 元注解作用范围只适用于注解接口，用于描述注解接口的行为属性。其中比较常用的有4个，分别是@Target、@Retention、@Documented、@Inherited

#### @Target

> 描述注解接口的作用域。

#### 源码

> 从源码中可了解该注解接口中只有一个注解元素，是一个ElementType类型的数组，使用该注解的时候可以以匿名数组的方式传入多个ElementType值。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {
    /**
     * Returns an array of the kinds of elements an annotation type
     * can be applied to.
     * @return an array of the kinds of elements an annotation type
     * can be applied to
     */
    ElementType[] value();
}
```

#### ElementType

> ElementType是一个enum类，其中的enum常量表示作用域范围。

| 静态常量        | 意义                               |
| --------------- | ---------------------------------- |
| TYPE            | 类(包括enum类)，接口(包括注解接口) |
| FIFLD           | 实例域(包括enum常量)               |
| METHOD          | 方法                               |
| PARAMTER        | 参数或构造器参数                   |
| CONSTRUCTOR     | 构造器                             |
| LOCAL_VARIABLE  | 成员变量                           |
| ANNOTATION_TYPE | 注解类型声明                       |
| PACKAGE         | 包                                 |
| TYPE_PARAMTER   | 类型参数(JDK1.8)                   |
| TYPE_USE        | 类型用法(JDK1.8)                   |
| MODULE          | 模块声明(JDK9)                     |

#### Demo

> 表示注解接口AnnotationName的作用域是方法和构造器。

```java
@Target({ElementType.METHOD, ElementType.CONSTRUCTOR})
public @interface AnnotationName {
    String element() default "defaultValue";
}
```

#### @Retention

> 表示注解接口的生存时间。

#### 源码

> 从源码中可了解到Retention注解接口只有一个注解元素，是RetentionPolicy类型的值。RetentionPolicy是一个enum类，其中的enum常量表示保留策略。默认的保留策略是RetentionPolicy.CLASS。

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {
    /**
     * Returns the retention policy.
     * @return the retention policy
     */
    RetentionPolicy value();
}
```

#### RetentionPolicy

> RetentionPolicy是一个enum类，其中的enum常量表示保留策略。

| 保留规则 | 描述                                                        |
| -------- | ----------------------------------------------------------- |
| SOURCE   | 不包括在类文件中的注解                                      |
| CLASS    | 包括在类文件中的注解，但是虚拟机不需要将他们载入            |
| RUNTIME  | 包括在类文件中的注解，并由虚拟机载入。通过反射API可获得它们 |

#### Demo

> 表示注解接口AnnotationName声明后，可以存在于类文件中，但是JVM虚拟机工作时不会保留该注解。

```java
@Retention(RetentionPolicy.CLASS)
public @interface AnnotationName {
    String element() default "defaultValue";
}
```

#### @Documented

> 提示javadoc类似的归档工具对于所标记的注解接口进行归档。

#### @Inherited

> 继承注解，这个注解标注的注解接口所标注的类的子类会继承其父类所有的注解。 所以使用Inherited注解的注解接口的使用域只能是类。

### 用于编译的注解

> TODO 待补充

#### @Deprecated

> 对于需要废除或者不建议使用的项(注解可以使用的所有范围)，都可以用这个注解标注。

#### @SuppressWarning

> 告知编译器阻止特定类型的警告信息。

#### @Override

> 只能使用到方法上，会检查该方法是否是来自超类的方法。

#### @Generated

### 用于管理资源的注解

> TODO 待补充

#### @PostConstruct

#### @PreDestory

#### @Resources

#### @Resource
