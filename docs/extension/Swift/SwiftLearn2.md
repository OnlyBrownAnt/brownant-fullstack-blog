# Swift基础-操作符号和流程控制

## 目录
[[toc]]

## 总结
### Swift操作符不支持自动转换
```swift
// 情况一
print(1 + 2.0) // 3.0

// 情况二
var i: Int = 1;
i = 2
print(i + 2.0) // error

```
### 字符串插值
> 字符串插值是一种构建新字符串的方式，可以在其中包含常量、变量、字面量和表达式。字符串字面量和多行字符串字面量都可以使用字符串插值。你插入的字符串字面量的每一项都在以反斜线为前缀的圆括号中。
```swift
let multiplier = 3
let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
// message 是 "3 times 2.5 is 7.5"
```

### Swift的do while是repect while
```swift
repeat {
    print("repeat while");
} while false
```
### Swift的switch的case不会贯穿
> 在C语言中switch的case会依次匹配执行(贯穿)，switch不会。而是支持在一条case上可以进行多个匹配。
```swift
let state = 1
switch state {
case 1, 2:
    print(state)
case 3:
    print("out of index")
default:
    print("no match")
}
```
### Swift跳出多层循环
> 通过设置标签，跳出指定的循环。
```swift
outerLoop: for i in 1...5 {
    for j in 1...5 {
        for k in 1...5 {
            print("\(i) \(j) \(k)")
            if (j == 1) {
                break outerLoop
            }
        }
    }
}
// out
1 1 1

for i in 1...5 {
outerLoop: for j in 1...5 {
        for k in 1...5 {
            print("\(i) \(j) \(k)")
            if (j == 1) {
                break outerLoop
            }
        }
    }
}
// out
1 1 1
2 1 1
3 1 1
4 1 1
5 1 1
```
### 循环总结
循环让我们重复代码直到条件为假。

最常见的循环是for，它将循环内的每个项目分配给一个临时常量。

如果不需要for循环提供的临时常量，请改用下划线，以便 Swift 可以跳过该工作。

有while循环，你提供一个明确的条件来检查。

尽管它们类似于while循环，但repeat循环始终至少运行其循环体一次。

可以使用 退出单个循环break，但如果您有嵌套循环，则需要使用break后跟放置在外循环之前的任何标签。

可以使用 跳过循环中的项目continue。

无限循环直到您要求它们才会结束，并且使用while true. 确保你有一个条件来结束你的无限循环。