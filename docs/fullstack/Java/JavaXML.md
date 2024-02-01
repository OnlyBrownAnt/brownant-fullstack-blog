# Java XML

## XML

### XML介绍

> [可扩展标记语言（英语：Extensible Markup Language，简称：XML）是一种标记语言。XML是从标准通用标记语言（SGML）中简化修改出来的。它主要用到的有可扩展标记语言、可扩展样式语言（XSL）、XBRL和XPath等。](https://zh.wikipedia.org/wiki/XML)

### XML用途

> 可用于携带和传达数据。

### XML文档基本语法

> XML文档是由多个标签组成的。

- XML文档标签有开始标签和结束标签组成。
- XMl文档包含作为声明的处理指令。
  > 处理指令由"\<?"和"?>"来限定界限
  ```xml
  <?xml version="1.0" encoding="utf-8" ?>
  ```
- XML文档只有一个根标签。
  > demo1标签是根标签
  ```xml
  <demo1>
      <demo2 one="1">
      </demo2>
  </demo1>
  ```
- XML文档的标签之前有五种嵌套关系。
  > 父标签、子标签、兄弟标签、后代标签、祖标签
  >
  > 比如：demo1是demo2的父标签，demo1是demo3的祖标签。
  ```xml
  <demo1>
      <demo2 one="1">
          <demo3>
          </demo3>
      </demo2>
  </demo1>
  ```
- XML文档的标签之间只能包含不能嵌套。
- XML文档的标签的开始标签中可以存在键值对属性。
  > demo2标签中可以存在键值对one="1"
  ```xml
  <demo1>
      <demo2 one="1">
      </demo2>
  </demo1>
  ```
- XML文档的注解不能在XML文档声明之前。

### XML文档语法进阶

- CDATA

  > 使用"\<![CDATA[" 和 "]]>"作为限定的界限。是字符数据的一种特殊形式，其中的字符只会作为本文，不会被XML进行解析。但是存在危险，如果字符中包含"] ] >"可能将遗留数据纳入XML文档的后门。

- 字符引用

  > 使用"&#十进制"或者"&十六进制"来表示字符

- 实体引用
  > 使用"&name"来表示一些预定义的符号
  >
  > 比如：&amp = &

## 解析XML

> 常用的有两种方式来解析XML
>
> 流机制解析器(streaming parse)、树型解析器(tree param)

### 树型解析器(tree param)

> 常用有文档对象模型解析器(DOM)
> DOM解析器会完整的读入XML文档，得到一个树型的数据结构。但是耗内存多，耗时长。
> DOM解析器实际也是在SAX解析器基础上建立的，在接收到SAX解析器事件的时候构建DOM树。

#### 使用步骤

```java
// 1：获取XML数据源
// XML数据源可以是文件(File)或者流(InputStream)或者网络链接(URL)，DocumentBuilder对象的parse都能通过这些数据源生成DOM文档对象模型
Path path = Path.of("demo.xml");
File file = new File(String.valueOf(path));

// 2：创建DocumentBuilder文档生成器
DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

// 3：解析生成DOM文档对象模型，注意DOM文档对象模型选用org.w3c.dom包中的。
Document document = documentBuilder.parse(file);
Element element = document.getDocumentElement();
System.out.println(element.getTagName());
```

### 流机制解析器(streaming parse)

> 常用的有简单文档解析器(SAX)，读入XML文档时生成相应的事件。不会保存XML数据为一个完整的树型结构，但是可以通过事件快速得到XML中的部分的节点。
>
> SAX解析器使用的是事件回调(event callback)，所以需要一个处理器来为各种解析器事件定义事件动作(DefaultHandler实现了ContentHandler接口，可以自定义继承DefaultHandler的类作为处理器)。
>
> JavaSE1.6后提供StAX提供了遍历事件的迭代器使用更方便。

#### 使用步骤

```java
// 1：获取XML数据源(流(InputStream))
FileInputStream fileInputStream = new FileInputStream("demo.xml");

// 2：创建SAX解析器
SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
SAXParser saxParser = saxParserFactory.newSAXParser();

// 3：创建处理事件的处理器
SAXHandel saxHandel = new SAXHandel();

// 4：进行解析
saxParser.parse(fileInputStream, saxHandel);


附加：自定义继承DefaultHandler的SAXHandel类
class SAXHandel extends DefaultHandler {
    @Override
    public void startDocument() throws SAXException {
        super.startDocument();
        System.out.println("*******开始解析文档*******");
    }

    @Override
    public void endDocument() throws SAXException {
        super.endDocument();
        System.out.println("*******解析文档结束*******");
    }
}
```

### 解析XML的其他工具

### JAXP

> 封装了SAX(流机制解析器使用的简单API)、DOM(树型解析器使用的DOM文档对象模型)两种接口，它并无为JAVA解析XML提供任何新功能，只是对外提供更解耦、简便操做的API。

### JDOM

> JDOM的目的是成为Java特定文档模型，它简化与XML的交互并且比使用DOM实现更快。是第一个Java 特定文档模型。

### DOM4J

> 它是JDOM的一种智能分支。它合并了许多超出基本XML文档表示的功能，包括集成的XPath支持、XML Schema支持以及用于大文档或流化文档的基于事件的处理。
>
> 将SAX(流机制解析器使用的简单API)和DOM(树型解析器使用的DOM文档模型)结合在一块儿使用，取长补短，并对原有的API进行了改造，简便性、性能、面向接口编程等方面都优于JDK自带的SAX(流机制解析器使用的简单API)和DOM(树型解析器使用的DOM文档对象模型)。
>
> （推荐）

## 生成XML

> 可以使用DOM文档生成器(DocumentBuilder)生成新的DOM文档对象模型。
>
> 写出XML文档有很多方式，比较简单的是XSLT或者DOM4j。

### XSLT

> XSLT指可扩展的样式表语言转换(Extendible Stylesheet Language Transformations，XSLT)API

#### Demo

```java
// 生成XML文档(DOM文档对象模型)
// 1：使用DOM文档生成器工厂方法创建DOM文档生成器
DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

// 2：使用DOM文档生成器生成新的DOM文档对象模型
Document document = documentBuilder.newDocument();

// 3：使用Document对象提供的方法生成DOM文档节点和节点内容
Element rootElement = document.createElement("demo1");
Element childElement = document.createElement("demo2");
Text textNode = document.createTextNode("demo2-text");

//4：组装节点
document.appendChild(rootElement);
rootElement.appendChild(childElement);
childElement.appendChild(textNode);

// 写出XML文档
// 1：使用转换者工厂方法生成转换者对象
Transformer t = TransformerFactory.newInstance().newTransformer();

// 2：配置转换者对象输出参数
t.setOutputProperty(OutputKeys.INDENT, "yes"); // 是否需要空格和换行
t.setOutputProperty(OutputKeys.METHOD, "xml"); // 写出文件类型
// 3：使用转换者对象进行写出XML
t.transform(new DOMSource(document), new StreamResult(new FileOutputStream("demo.xml")));
```

## 附加工具

### XPath

> 当我们得到一个DOM文档对象模型的时候，想寻找其中一个节点的时候，需要写繁琐的遍历代码来得到节点。可以使用XPath快速定位XML文档的某个节点。本质上不会加快遍历速度，但是使查找节点更简单。

#### Demo

```java
// 获取DOM对象
// 1：获取XML数据源
FileInputStream fileInputStream = new FileInputStream("demo.xml");

// 2：创建DOM解析器
DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

// 3：得到DOM文档对象模型
Document document = documentBuilder.parse(fileInputStream);

// 使用XPath定位某个节点
// 1：创建XPath对象
XPathFactory xPathFactory = XPathFactory.newInstance();
XPath xPath = xPathFactory.newXPath();

// 2：使用evaluate方法定位路径为"/demo1/demo2/demo3"的节点，XPathConstants.NODE参数表示返回类型是Node
Node node = (Node)xPath.evaluate("/demo1/demo2/demo3", document, XPathConstants.NODE);

// 3：查看节点信息
System.out.println(node.getNodeName());
```
