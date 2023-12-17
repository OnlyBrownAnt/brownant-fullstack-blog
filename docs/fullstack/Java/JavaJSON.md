# Java JSON

## 介绍
> [JSON(**J**ava**S**cript **O**bject **N**otation)原本设计作为轻量级资料交换格式，是JavaScript的子集。](https://zh.wikipedia.org/wiki/JSON)其优点是便于阅读和处理，现在很多编程语言已经支持了对JSON格式的解析和格式化字符串处理，JSON也逐渐成为一种通用的数据格式。

## 工具集
> JDK(1.8版本之前)并没有自带处理JSON的类库，推荐使用第三方类库进行处理JSON。
> 
> 这里只简单介绍相对比较热门的几门处理JOSN工具的基本使用。
> 
> Gson性能相对较差，但是安全性好。虽然Fastjson上手容易，但是从安全性以及性能角度客观来看还是推荐Jackson，当然最合适的选择还是和团队一致的工具集(即使要求替换工具，替换底层代码，相对来说也不容易出现干扰。当然最好是不要遇到这种需要替换工具集的情况)。
>
> TODO 待补充

### Jackson
#### Docs
- github：https://github.com/FasterXML/jackson
- 《Do JSON with Jackson》—— Baeldung
#### 依赖
#### maven
```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.13.0</version>
</dependency>
```

#### 基本教程
> 基础部分只包含如何将各种类型字符串反序列化成Java的对象或者Jackson提供的特定JsonNode对象的案例，以及如何将Java对象序列化成字符串的案例。
> 
> Jackson进行序列化可以使用writeValueAsString方法，进行反序列化可以使用readValue方法，注意反序列化的使用readValue方法时候需要提供对象类型或者Jackson提供的TypeReference对象作为参数用于序列化。
> 
> JsonNode是Jackson的JSON树模型. ObjectNode和ArrayNode是基于JsonNode实现的, JsonNode是抽象类不可变, ObjectNode和ArrayNode可变.
#### Object to String
```java
Person person = new Person("1", "zhangsan", 18);
String personStr = new ObjectMapper().writeValueAsString(person);
System.out.println(personStr);
```

#### String to Object
```java
String personStr = "{\"id\":\"2\",\"name\":\"zhangsan2\",\"age\":18}";
Person person = new ObjectMapper().readValue(personStr, Person.class);
System.out.println(person.toString());
```

#### Map to String
```java
HashMap<String,String> hashMap = new HashMap<>(16);
hashMap.put("name", "zhangsan");
hashMap.put("id", "1");
String mapStr = new ObjectMapper().writeValueAsString(hashMap);
System.out.println(mapStr);
```

#### String to Map
```java
String mapStr = "{\"name\":\"zhangsan\",\"id\":\"1\"}";
HashMap<String, String> hashMap = new ObjectMapper().readValue(mapStr, new TypeReference<HashMap<String, String>>() {});
System.out.println(hashMap.toString());
```

#### List to String
```java
HashMap<String, String> hashMap1 = new HashMap<>(16);
hashMap1.put("id", "1");

HashMap<String, String> hashMap2 = new HashMap<>(16);
hashMap2.put("id", "2");

ArrayList<HashMap<String, String>> arrayList = new ArrayList<>();
arrayList.add(hashMap1);
arrayList.add(hashMap2);
String arrayStr = new ObjectMapper().writeValueAsString(arrayList);
System.out.println(arrayStr);
```
#### String to List
```java
String arrayStr = "[{\"id\":\"1\"},{\"id\":\"2\"}]";
ArrayList<HashMap<String, String>> arrayList = new ObjectMapper().readValue(arrayStr, new TypeReference<ArrayList<HashMap<String, String>>>(){});
System.out.println(arrayStr.toString());
```

#### Date to String
```java
Date date = new Date();
SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
ObjectMapper objectMapper = new ObjectMapper();
objectMapper.setDateFormat(simpleDateFormat); // 自定义需要转换的时间格式
String dateStr = objectMapper.writeValueAsString(date);
System.out.println(dateStr);
```

#### String to JsonNode
```java
String mapStr = "{\"name\":\"zhangsan\",\"id\":\"1\"}";
JsonNode jsonNode = new ObjectMapper().readTree(mapStr);
System.out.println(jsonNode.toString());
```

### Gson
#### 参考
- github：https://github.com/google/gson
#### 依赖
#### maven
```xml
<dependency>
  <groupId>com.google.code.gson</groupId>
  <artifactId>gson</artifactId>
  <version>2.8.9</version>
</dependency>
```

#### Demo
```java
Person person = new Person("1", "zhangsan", 18);

// 序列化 Object to String
String personStr = new Gson().toJson(person);
System.out.println(personStr);

// 反序列化 String to Object
String personStr2 = "{'id':'2','name':'zhangsan2','age':18}";
Person person2 = new Gson().fromJson(personStr2, Person.class);
System.out.println(person2.toString());
```

### Fastjson
#### 参考
- github：https://github.com/alibaba/fastjson

#### 依赖
#### maven
```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>1.2.76</version>
</dependency>
```

#### Demo
```java
Person person = new Person("1", "zhangsan", 18);

// 序列化 Object to String
// 注意：如果该对象的某个字段未实现getter/setter方法会导致序列化失败
String personStr = JSON.toJSONString(person);
System.out.println(personStr);

// 反序列化 String to Object
String personStr2 = "{'id':'2','name':'zhangsan2','age': 18}";
Person person2 = JSON.parseObject(personStr2, Person.class);
System.out.println(person2.toString());
```

### Json-lib
> JDK7之前使用较为广泛。

#### 参考
- github：http://json-lib.sourceforge.net/index.html

### 附加
#### Person类
> 上面简单教程中所使用到的Person类

```java
public class Person {
    private String id;
    private String name;
    private int age;

    public Person () {}

    public Person (String id, String name, int age){
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

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

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