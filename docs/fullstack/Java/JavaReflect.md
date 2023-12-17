# Java 反射(reflect)

## 什么是反射
能够分析类的能力的程序被称为反射
> 理解：我们日常编写代码时常常会把实际对象抽象为类，包括创建类，类方法，类实例并设置访问权限，这是一个封装的过程。使用类的时候也要满足封装好的规则，如果使用某个类创建对象后，想要修改这个对象中的实例就需要该类提供了对应实例setter方法，如果没有就不能突破封装修改实例。但是这种情况下可以通过反射突破封装限制直接修改实例，没错就是这样强大。
>
> (这让我想到拿着皇帝秘旨的锦衣卫，我就是不走正常流程，只通过专门通道直接把你逮住。)

## 实现反射
> Java提供了一个反射库，以便于实现反射。
>
> 实现反射的基本步骤：首先要获取到对应的Class实例，然后根据反射库访问Class中的信息实现动态创建对象，修改对象。
>
> 动态创建：就是在运行时进行创建。

### Class对象
#### Class类定义
程序运行期间，Java运行时系统始终为所有对象维护着一个被称为运行时类型标识的信息，这个信息跟踪着每个对象所属的类。保存这些信息的类是Class类，Java还提供了专门的Java类来访问Class对象。
> 用于保存被称为运行时类型标识的信息的一个类。
> 
> 专门的Java类就是指Java提供的反射库中的类。
#### 获取Class对象
> 常见的有三种方式获取Class对象，分别可以在不同的前提下获取到对应的Class对象。

##### Class.forName()
> 使用Class类的静态`forName`方法的方式。
> 
> 如果类文件不存在会抛出`ClassNotFoundException`异常
>
> 前提：知道类的预设的完整包路径，但是不确定该类是否存在。

- 示例
> 需要创建一个Person实例
>
> 前提：已知Person类的预设完整路径是com.example.demo.task010307.Person，但是不确定该类是否存在。
``` java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    System.out.printf(c1.getName());
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```
##### ClassName.class
> 使用`类名.class`的方式。
> 
> 前提：知道类的预设的完整包路径，而且确定该类已经存在。

- 示例
> 需要创建一个Person实例
>
> 前提：已知Person类的预设完整路径是com.example.demo.task010307.Person，并且确定该类已经存在。
```
Class c1 = Person.class;
System.out.println(c1.getName());
```
##### ClassObject.getClass()
> 使用`实例名.getClass`的方式。
> 
> 前提：已经拥有一个实例对象。

- 示例
> 需要创建一个Person实例
>
> 前提：已经拥有一个Person实例。
```java
Person person = new Person("1", "zhangsan", 18);
Class c1 = person.getClass();
System.out.println(c1.getName());
```
#### 常用方法
> 可以先了解反射库之后再阅读这部分

| 方法 | 描述 |
| --- | --- |
| Class\<?\> forName(String className) | 静态方法，返回与具有给定字符串名称的类或接口关联的 Class 对象 |
| Constructor\<T\> getConstructor(Class\<?\>... parameterTypes) | 返回一个Constructor对象，该对象反映由此类对象表示的类的指定公共构造函数。如果参数类型是基本数据类型，可以使用T.class的方式，方法在使用时会进行自动装箱。|
| Method getMethod(String name, Class\<\?\>... parameterTypes) | 返回一个 Method 对象，该对象反映由此类对象表示的类或接口的指定公共成员方法 |
| Method getDeclaredMethod(String name, Class\<?\>... parameterTypes) | 返回一个 Method 对象，该对象反映由此类对象表示的类或接口的指定声明方法 |
| Method[] getMethods() throws SecurityException | 返回一个数组，其中包含一个数组，该对象反映由此类对象表示的类或接口的所有公共方法，包括由类或接口声明的方法以及从超类和超接口继承的方法。 |
| Field getField(String name) | 返回一个 Field 对象，该对象反映由此类对象表示的类或接口的指定公共成员字段 |
| Field getDeclaredField(String name) | 返回一个 Field 对象，该对象反映由此类对象表示的类或接口的指定声明字段 |
| Field[] getFields() throws SecurityException | 返回一个数组，其中包含反映由此类对象表示的类或接口的所有可访问公共字段的 Field 对象。 |

### 反射库
> java.lang.reflect
> 
> 常用的反射库中的类有Constructor、Method、Field，
> 分别可以处理构造器，方法，实例域。
#### Constructor
##### 常用方法

| 方法 | 描述 |
| --- | --- |
| void setAccessible(boolean flag) | 可以设置 |
| T newInstance(Object ... initargs) | 使用此 Constructor 对象表示的构造函数创建和初始化构造函数的声明类的新实例，并具有指定的初始化参数。 |

- 实例
>  传入参数类型需要和创建Constructor时，调用Class对象的getConstructor的传入参数类型一致，
- 实例
> 需要使用含参构造方法创建一个Person实例
```java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    Constructor constructor = c1.getConstructor(String.class, String.class, int.class);
    Person person = (Person) constructor.newInstance("1", "zhangsan", 18);
} catch (ClassNotFoundException | NoSuchMethodException e) {
    e.printStackTrace();
} catch (IllegalAccessException e) {
    e.printStackTrace();
} catch (InstantiationException e) {
    e.printStackTrace();
} catch (InvocationTargetException e) {
    e.printStackTrace();
}
```

#### Method
##### 常用方法
| 方法 | 描述 |
| --- | --- |
| void setAccessible(boolean flag) | 将反射对象标记为禁止在使用 Java 语言访问控制时对其进行检查 |
| Object invoke(Object obj, Object... args) | 在具有指定参数的指定对象上调用此 Method 对象所表示的基础方法。各个参数会自动解包以匹配基元形式参数，并且基元参数和引用参数都根据需要进行方法调用转换。 |

- 实例
> 创建Person对象，调用其公共方法getName
```java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    Constructor constructor = c1.getConstructor(String.class, String.class, int.class);
    Person person = (Person) constructor.newInstance("1", "zhangsan", 18);
    System.out.println(person.toString());
    Method method = c1.getMethod("getName");
    System.out.println(method.invoke(person));
} catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
    e.printStackTrace();
}
```
- 实例
> 创建Person对象，调用其私有方法setName
```java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    Constructor constructor = c1.getConstructor(String.class, String.class, int.class);
    Person person = (Person) constructor.newInstance("1", "zhangsan", 18);
    System.out.println(person.toString());
    Method method = c1.getDeclaredMethod("setName", String.class);
    method.setAccessible(true);
    method.invoke(person, "30");
    System.out.println(person.toString());
} catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
    e.printStackTrace();
}
```

#### Field
##### 常用方法
| 方法 | 描述 |
| --- | --- |
| void setAccessible(boolean flag) | 将反射对象标记为禁止在使用 Java 语言访问控制时对其进行检查 |
| void set(Object obj, Object value) | 将指定对象参数上的此 Field 对象所表示的字段设置为指定的新值。如果基础字段具有基元类型，则会自动解开新值的包装。 |
| Object get(Object obj) | 返回指定对象上由此字段表示的字段的值。如果该值具有基元类型，则该值将自动包装在对象中。 |

- 实例
> 创建Person对象，修改其私有实例age
```java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    Constructor constructor = c1.getConstructor(String.class, String.class, int.class);
    Person person = (Person) constructor.newInstance("1", "zhangsan", 18);
    System.out.println(person.toString());
    
    Field field = c1.getDeclaredField("age");
    field.setAccessible(true);
    field.set(person, 30);
    System.out.println(person.toString());
} catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchFieldException e) {
    e.printStackTrace();
}
```

#### AccessibleObject
> 它提供了将反射对象标记为禁止在使用 Java 语言访问控制时对其进行检查。这允许具有足够权限的复杂应用程序，如 Java对象序列化或其他持久性机制，以操作对象以通常被禁止的方式。
> 
> 从这里我们可以了解到，这个类的作用就是传入参数为true时会取消对反射对象访问权限的检查。而上面介绍的Constructor、Method、Field都继承于这个类，我们在使用的时候经常使用Constructor、Method、Field中都存在的覆写于AccessibleObject的setAccessible方法来取消访问权限的检查。否则会出现IllegalAccessException异常。

- 实例
> 获取到Person的age实例，但是没有set方法，而且age是私有的。我们可以通过getDeclaredField("age")获取私有的age实例得到Filed对象，然后调用setAccessible(true)解除检查，就能成功修改Person对象私有的age实例。
```java
try {
    Class c1 = Class.forName("com.example.demo.task010307.Person");
    Constructor constructor = c1.getConstructor(String.class, String.class, int.class);
    Person person = (Person) constructor.newInstance("1", "zhangsan", 18);
    System.out.println(person.toString());
    
    Field field = c1.getDeclaredField("age");
    field.setAccessible(true);
    field.set(person, 30);
    System.out.println(person.toString());
} catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException | NoSuchFieldException e) {
    e.printStackTrace();
}
```

#### 处理注解
> TODO 待补充

#### 调用任意方法
> TODO 待补充

## 常见问题

## 附录
### Person
> 示例中的需要使用到的一个POJO
>
> 预设完整包路径是"com.example.demo.task010307.Person"
```java
package com.example.demo.task010307;

@AnnotationName("Person")
public class Person {
    @AnnotationName("id")
    private String id;
    private String name;
    private int age;

    public Person() {}

    public Person(String id, String name, int age){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    // 封装时设置name的setter方法为私有
    private void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    // 封装时设置缺少对实例age的setter方法

    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + ''' +
                ", name='" + name + ''' +
                ", age=" + age +
                '}';
    }
}
```

### @AnnotationName
> Person类中使用的自定义注解。因为没有提供"注解处理器"，所以这个注解没有实际作用，只是起到提示作用。
>
> 注意反射Demo中的注解的保留策略需要是RetentionPolicy.RUNTIME
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface AnnotationName {
    String value() default "defaultValue";
}
```
## 备注
有错欢迎留言纠正