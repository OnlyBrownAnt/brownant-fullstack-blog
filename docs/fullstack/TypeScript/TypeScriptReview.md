# TypeScript 总结

## Docs
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript 教程](https://wangdoc.com/typescript/)
    - 阮一峰 2023/8/8 发布的面向初学者的 TypeScript 教程，各项内容比较细，适合作为初学者参考手册。
- "React实战进阶" 极客时间
    > 版本较老2018年，使用React 16，学习React和相关工具库的核心概念和了解基本使用方式即可。
- [TypeScript 落地经验分享](https://time.geekbang.org/qconplus/detail/100091377)
- [如何在项目中用好 TypeScript 🤔](https://juejin.cn/post/7058868160706904078#heading-1)
    > TypeScript 实际运用经验和建议，总结项目实际运用 TS 的技巧。
- [TS 面试题](https://gugiegie.gitee.io/frontend/frontend/advance/ts.html)
- [TypeScript 面试题列表](https://fe.ecool.fun/topic-list?pageNumber=5&orderBy=updateTime&order=desc&tagId=19)

## 常见问题
### ReferenceError: exports is not defined in ES module scope
```
// Error Log
Object.defineProperty(exports, "__esModule", { value: true });
                      ^

ReferenceError: exports is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/Users/yaozhang/Desktop/vite-demo/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

主要是由于package.json的module配置和TS的module配置冲突导致，修改TS的配置为es6版本，屏蔽TS的module配置即可。
- [ReferenceError：TypeScript 中未定义导出 [已修复]](https://bobbyhadz.com/blog/typescript-uncaught-referenceerror-exports-is-not-defined)

### Typescript Duplicate Function Implementation 
两个TS文件出现了同一个函数，被认为是重复。
1. TS文件声明export {}，解决重复问题
- [Typescript Duplicate Function Implementation(stackoverflow)](https://stackoverflow.com/questions/39689763/typescript-duplicate-function-implementation)

## TypeScript 使用总结
1. 声明文件
    - `@type`库有大量第三方声明文件
    - 自定义声明文件`*.d.ts`
    - 目的是为了兼容未使用TS进行约束的库，在项目中使用时导出模块报错的情况。
2. 类型扩展
    - interface 支持 `extends` 继承实现类型的扩展。
    - type 支持 `&` 实现交叉类型，变相实现类型的扩展。
    - 类型扩展的目的是为了扩展接口和类型的行为能力
3. TS支持的JS新特性
    - 可选链（Optional Chaining）`?.` 
        - 解决日常会遇到了，嵌套属性校验的情况，不存在则返回undefined
    - 空值合并运算符（Nullish coalescing Operator）`??`
        - 类似三元判断表达式的语法糖，快捷的判断是否为 `null`、`undefined`并进行取值，优先判断左侧，不为`null`、`undefined`则取左侧。
4. 访问限定修饰符
    - `public`、 `protected`、 `private`
    - 限定修饰符是为了限制对实例属性的访问控制。Java 使用了这一套访问控制方式。
5. 类型收窄
    - 类型断言
        - `as`，通常采用 `值 as 类型` 这种方法兼容性比较好。
    - 类型守卫
        - `typeof`
            - 判断原始类型，也支持function的判断，引用类型判断为object。TypeScript 将 typeof 运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。
        - `instanceof`        
            - 精准判断类类型。
        - `in`
            - 进行属性检查
    - 双重断言
        - `as` 支持叠加使用，`值 as 类型 as 类型` 但是通常不建议，因为强行断言只是能避开TS编译器的检查。
    - 类型收窄的目的是限制判断目标变量的类型的范围，方便进行后续操作。
6. 枚举
    - `enum`
    - 默认情况下，属性如果不设置值默认从0开始。如果属性中存在设置了非数值，则必须要求后续属性中要么全部设置具体值，要么设置紧跟的属性为数字，后续的属性还会依次自动赋值数值。
7. 类型操作
    - `keyof`
        - 获取一个接口中 Key 的联合类型
    - `entends`
        - 接口继承
    - `in`
        - 进行属性检查 
    - `U ? X : Y`
        - 如果 T 是 U 的子集，就是类型 X，否则为类型 Y。常用于确定类型。
8. 工具类型
    - `Partial<T>` 将类型 T 的所有属性变为可选属性
    - `Required<T>` 将类型 T 的所有属性变为必选属性
    - `Pick<T, K>` 从类型 T 中选择属性名为类型 K 中的属性，创建一个新类型。
    - `Omit<T, K>` 从类型 T 中排除属性名为类型 K 中的属性，创建一个新类型。
    - `Exclude<T, U>` 从类型 T 中排除类型 U 中的所有属性。
    - `Extract<T, U>` 从类型 T 中提取类型 U 中存在的所有属性。