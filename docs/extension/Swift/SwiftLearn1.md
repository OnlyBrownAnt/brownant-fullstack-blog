# Swift基础-运算符

## 目录
[[toc]]

## 基本数据类型
### String(字符串)
```swift
// init
let string = "content"

let langString = """
lang
content
"""
```
### Int(整型)
```swift
// init
let i = Int(); // 0
```

### Double(浮点数类型 64位)
```swift
// init
let d = Double(); // 0.0
```
### Float(浮点数类型 32位)
```swift
// init
let f = Float(); // 0.0
```
### Bool(Boolean类型)
```swift
// init
let b = Bool(); // false
```

## 复杂数据类型
### Array(数组)
> 元素有序
```swift
// init
 
```

### Set(集合)
> 元素无序
```swift
// init
let sets = Set<Int>()
```

### Tuple(元组)
> 由()包裹，元组内的值可以是任意类型，并不要求是相同类型。但是大小固定，不可灵活增加元素。
```swift
// init
let tuple = (key1: "value1", key2: "value2")

let tuple = ("value1", "value2", 1000)
```

### Dictionary(字典)
> 由[]包裹，元素是key-value类型，大小不固定，可以灵活增加元素。
```swift
// init
let dict = Dictionary<String, Int>()

let dict = [String, Int]()
```

### Enum(枚举)
> 简单存储枚举值，不支持修改。支持传入附加说明值。
```swift
// init
enum enums {
  case enum1
  case enum2
}

enum enums: String {
  case enum1(desc: String)
  case enum2(desc: String)
}
```

## 特殊数据类型
### nil
> nil 来表示没有值

## 总结
### Arrays vs sets vs tuples
数组、集合和元组初看起来很相似，但它们有不同的用途

如果您需要一组必须唯一的值，或者您需要能够非常快速地检查特定项目是否存在，您应该使用集合

如果你需要一个特定的、固定的相关值集合，其中每个项目都有一个精确的位置或名称，你应该使用一个元组

如果您需要一个可以包含重复值的集合，或者您的项目的顺序很重要，您应该使用数组

### 该如何选择需要的数据类型
数组、集合、元组和字典都可以将一组项目存储在单个值下。它们各自以不同的方式执行此操作。

数组按照您添加它们的顺序存储项目，可以使用数字位置访问它们。

集合没有任何顺序的存储项目，因此无法使用数字位置访问它们。

元组的大小是固定的，可以为它们的每一项附加名称。可以使用数字位置或key来获取value。

字典根据键存储项目，您可以使用这些键阅读项目。

枚举是一种对相关值进行分组的方式，因此您可以在不出现拼写错误的情况下使用它们。

您可以将原始值附加到枚举，以便它们可以从整数或字符串创建，或者您可以添加关联值以存储有关每个案例的附加信息。
