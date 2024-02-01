# IDEA 注释模版设置

## 简介

简单介绍如何在IDEA设置快速自动生成文件注释模版以及手动生成方法注释模版，这里主要是针对于JAVA语言的设置。但是其他语言的支持操作也是类似的。

生成方法注释模版教程中使用到的脚本来源于网络，结合自己的需求稍加了改动，仅供参考。

## 文件头注释模版

1. 找到对应类型文件的文件头注释模版文件
   > 图片中寻找的是Class类型文件对应的文件头注释模版文件是File Header.java

!["idea-1"](/img/docs/idea/idea-1.image "idea-1")

2. 修改注释模版文件内容
   > 在步骤1中找到的文件File Header.java中修改模版内容即可。模版内容参考附录`File Header.java`
   > !["idea-2"](/img/docs/idea/idea-2.image "idea-2")

### 文件头注释模版效果

!["idea-3"](/img/docs/idea/idea-3.image "idea-3")

## 方法注释模版

1. 在Live Templates模块新建模版组，然后新建模版。接着初步设置模版内容，模版内容参考附录`模版一`，以及设置模版的快捷使用方式。
   !["idea-4"](/img/docs/idea/idea-4.image "idea-4")

2. 设置模版中的参数来源，有三个参数，date的参数在Expression中设置，而param和return使用到了groovy脚本，所以需要在defauat value中设置。

   > 2022-01-07: 修改date一栏的Expression为date("yyyy-MM-dd")会比较好一点。
   > !["idea-5"](/img/docs/idea/idea-5.image "idea-5")

3. 设置模版的作用范围，默认全部即可。
   !["idea-6"](/img/docs/idea/idea-6.image "idea-6")

### 方法注释模版效果

!["idea-7"](/img/docs/idea/idea-7.image "idea-7")

## 附录

### 模版一

```java
**
 * @Description
 * @date $date$
 $params$
 $return$
 **/
```

### 脚本一

获取param

```groovy
版本一(遗弃):
groovyScript("if(\"${_1}\".length() == 2) {return '';} else {def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList();for(i = 0; i < params.size(); i++) {if(i==0){result+='* @param ' + params[i]}else{result+='\\n' + ' * @param ' + params[i]}}; return result;}", methodParameters());

版本二: 没有参数的情况下也会新增"* @param "
groovyScript("if(\"${_1}\".length() == 2) {return '* @param ';} else {def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList();for(i = 0; i < params.size(); i++) {if(i==0){result+='* @param ' + params[i]}else{result+='\\n' + ' * @param ' + params[i]}}; return result;}", methodParameters());
```

### 脚本二

获取return

```groovy
groovyScript("def returnType = \"${_1}\"; def result = '* @return ' + returnType; return result;", methodReturnType());
```

### File Header.java

```java
/**
 * @Description
 * @author authorName
 * @version 1.0.0
 * @date ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}:00
 */
```
