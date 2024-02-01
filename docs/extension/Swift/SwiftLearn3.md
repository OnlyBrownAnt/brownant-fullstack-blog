# Swift基础-函数

## 目录

[[toc]]

## 函数参数

> 每个函数参数都有一个参数标签（argument label）以及一个参数名称（parameter name）。参数标签在调用函数的时候使用；调用的时候需要将函数的参数标签写在对应的参数前面。参数名称在函数的实现中使用。默认情况下，函数参数使用参数名称来作为它们的参数标签。

### 参数标签和参数名称

> 参数标签是函数调用时使用。默认情况下，参数名称就是参数标签，还可以单独定义。

> 如果你不希望为某个参数添加一个标签，可以使用一个下划线（\_）来代替一个明确的参数标签。

```swift
func checkPassword(_ password: String, decrptType: String) {
    print("\(password) \(decrptType)")
}
checkPassword("password", decrptType: "AES"); // password AES
```

### 参数默认值

```swift
func checkPassword(_ password: String, decrptType: String = "-", decrptKey: String = "-") {
    print("\(password) \(decrptType) \(decrptKey)")
}
```

### 可变参数

一个*可变参数（variadic parameter）*可以接受零个或多个值。函数调用时，你可以用可变参数来指定函数参数可以被传入不确定数量的输入值。通过在变量类型名后面加入（...）的方式来定义可变参数

```swift
func changeNum(_ numbers: Int...) -> [Int] {
    return numbers;
}
print(changeNum(1, 1, 1, 1, 1, 1)) // [1, 1, 1, 1, 1, 1]
```

## 函数返回

通过 -> 设置返回类型。

```swift
func checkPassword(_ password: String, decrptType: String = "-", decrptKey: String = "-") -> String {
    print("\(password) \(decrptType) \(decrptKey)")
    return "\(password) \(decrptType) \(decrptKey)";
}
checkPassword("password", decrptType: "AES") // password AES -
```

### 多个返回值

可以通过将返回类型设置为元组实现返回多个值

```swift
func checkPassword(_ password: String, decrptType: String = "-", decrptKey: String = "-") -> (decrptType: String, decrptKey: String){
    print("\(password) \(decrptType) \(decrptKey)")
    return (decrptType: decrptType, decrptKey: decrptKey);
}
let (type, key) = checkPassword("password", decrptType: "AES") // password AES -
print(type) // AES
print(key) // -
```

## 异常处理

1. 设置异常枚举，需要继承与Error
2. 函数设置throws
3. 函数内通过throw抛出异常
4. 在do catch中通过try捕获调用函数时的抛出的异常

```swift
// 异常枚举
enum error: Error {
    case noKey
}

func checkPassword(_ password: String, decrptType: String = "-", decrptKey: String = "-") throws -> (decrptType: String, decrptKey: String){
    print("\(password) \(decrptType) \(decrptKey)")
    if (decrptKey == "-") {
        throw error.noKey;
    }
    return (decrptType: decrptType, decrptKey: decrptKey);
}
do {
    let (type, key) = try checkPassword("password", decrptType: "AES") // password AES -
    print("no errer")
} catch {
    print("get error")
}

```

## inout参数

默认情况下，函数的参数是值传递，函数内的修改不影响函数外。

在c语言中，我们可以通过传址的方式将变量地址传入函数，然后函数内就能修改变量的值。inout能实现的效果也是类似的。

通过inout参数我们就能在函数内修改函数外的变量。

```swift
var n = 10
func changeNum(_ number: inout Int) -> Int {
    number += 1
    return number
}
changeNum(&n)
print(n) // 11
```

## 总结

### 参数标签的作用

参数名称是函数内使用的，而参数标签是用于函数调用时使用。主要的优点是我们的代码变得更加清晰，我们确切地知道调用函数时每个值的作用。

而且通过参数标签来传值，不用过多担心其他参数的处理。这样也不用在传参数时可以去组织默认数据。需要传什么参数，就根据标签传入。

```swift
func checkPassword(_ password: String, decrptType: String = "-", decrptKey: String = "-") {
    print("\(password) \(decrptType) \(decrptKey)")
}
checkPassword("password", decrptType: "AES") // password AES -
checkPassword("password", decrptKey: "Key") // password - Key
```

不过需要注意，传入的标签先后顺序是和函数中定义的顺序一致的。

```swift
checkPassword("password", decrptType: "AES") // password AES -
checkPassword("password", decrptKey: "Key") // password - Key
checkPassword("password", decrptKey: "Key", decrptType: "AES") // error
```
