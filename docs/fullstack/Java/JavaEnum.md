# Java 枚举(Enum)

## Enum介绍

> 枚举表示一个有限的集合，Java提供了Enum抽象类和enum关键字，使用enum关键字创建的类是枚举类，所有的枚举类都是Enum的子类。

## 常用方法

| 方法                                              | 介绍                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| static Enum valueOf(Class enumClass, String name) | 根据枚举类型和枚举常量名称获取枚举常量                                                            |
| String toString()                                 | 返回枚举常量名称                                                                                  |
| int ordinal()                                     | 返回枚举常量在枚举类中声明的次序                                                                  |
| int compareTo（E other）                          | 比较this和other在枚举类中的声明次序，thi\>other返回正数， this\<other返回负数，this==other返回0。 |

## 枚举类总结

- 枚举表示一个有限的集合。
- 枚举类都是Enum类的子类。
- 枚举类中可以包含枚举常量，构造器，方法和实例域。
- 枚举类中的构造方法访问权限默认最高private。
- 枚举常量会调用当前枚举类的构造方法，所以当前枚举类需要提供对应的构造方法。
- 枚举常量只能使用"=="比较，不能使用equals()方法比较。
- 枚举类会包含一个静态的values()对象会返回包含枚举常量的数组。

## 使用技巧

- 可以为枚举常量增加私有域的方式，补充枚举常量表达的意义。
- 除了getter方法以外，构造方法，实例域都应该是private。
- 不应该为实例域提供setter方法。
- 枚举类万不得已最好不要修改已经定义好的常量。

## DEMO

### Task.class

```java
public class Task {
    public static void main(String[] args) {
        Size s = Size.SMALL;
        System.out.println(s.getSizeText()); // out: 小
    }
}
```

### Size.class

```java
/**
 * 型号
 */
public enum Size {
    SMALL("小"){}, MIDDEN("中"){}, LARGE("大"){};

    private String sizeText;

    private Size(){}

    private Size(String sizeText){
        this.sizeText = sizeText;
    }

    public String getSizeText() {
        return sizeText;
    }
}
```
