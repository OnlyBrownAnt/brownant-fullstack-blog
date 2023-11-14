# JS面试总结

## JS数据类型有几种

```
目前(ES6)原始类型7种，引用类型5种。其中常见的有8种。
```

- 原始数据类型(5种 存储于栈): Number、String、Boolean、Null、Undefined
- 引用数据类型(3种 存储于堆): Object、Array、Function
- 新增原始数据类型: Symbol
- 新增引用数据类型: Set、Map

## JS判断数据类型

> 《JavaScript高级程序设计(第4版)》P86 4.1.4 确定类型

1. # typeof
   
   ```
   只适用于精确判断原始数据类型
   ```
- 判断示例
  
  ```javascript
  console.log(typeof 1) // number
  console.log(typeof '1') // string
  console.log(typeof false) // boolean
  console.log(typeof undefined) // undefined
  console.log(typeof null) // object 
  console.log(typeof {}) // object 
  console.log(typeof []) // object 
  console.log(typeof function(){}) // function 
  ```

- 分析判断结果
  8种常见的数据类型中，原始数据类型判断正常，引用类型全部判断为Object类型。
2. instanceof
   
   ```
   只适用于精准判断引用类型
   result = variable instanceof constructor
   ```

内部运行机制是判断在其原型链中能否找到该类型的原型。可以在原型链较深的情况下用于判断有继承关系的对象。

```
- 判断示例
```javascript
console.log(1 instanceof Number) // false
console.log('1' instanceof String) // false
console.log(false instanceof Boolean) // false

console.log({} instanceof Object) // true
console.log([] instanceof Array) // true 
console.log(function(){} instanceof Function) // true
```

- 分析判断结果
  原始数据类型判断失败，引用类型判断正确。

- instanceof源码
  
  > 基础知识：原型对象和原型链
3. constructor
   ```
4. 判断数据的类型
5. 对象实例通过 constrcutor 对象访问它的构造函数。

默认情况下，所有原型对象自动获得一个名为constructor的属性，指回与之关联的构造函数。

如前所述，构造函数有一个 prototype 属性
引用其原型对象，而这个原型对象也有一个
constructor 属性，引用这个构造函数
换句话说，两者循环引用:
-- 《JavaScript高级程序设计(第4版)》P226

```
- 判断示例
```javascript
console.log((1).constructor) // [Function: Number]
console.log('1'.constructor) // [Function: String]
console.log(false.constructor) // [Function: Boolean]
// console.log((null).constructor) // error 
// console.log((undefined).constructor) // error
console.log({}.constructor) // [Function: Object]
console.log([].constructor) // [Function: Array]
console.log(function(){}.constructor) // [Function: Function]
const Person = function(id) {
    this.id = id;
};
const person = new Person(1);
console.log(person.constructor) // [Function: Person]
console.log(Person.prototype.constructor) // [Function: Person]
console.log(person.constructor == Person) // true
```

4. Object.prototype.toString.call()
   
   ```
   Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型
   ```
- 判断示例
  
  ```javascript
  console.log(Object.prototype.toString.call(1)) // [object Number]
  console.log(Object.prototype.toString.call('1')) // [object String]
  console.log(Object.prototype.toString.call(false)) // [object Boolean]
  console.log(Object.prototype.toString.call(null)) // [object Null]
  console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
  console.log(Object.prototype.toString.call({})) // [object Object]
  console.log(Object.prototype.toString.call([])) // [object Array]
  console.log(Object.prototype.toString.call(function(){})) // [object Function]
  const Person = function(id) {
    this.id = id;
  };
  const person = new Person(1);
  console.log(Object.prototype.toString.call(person)) // [object Object]
  ```

## 原型, 原型链

## 作用域, 作用域链

## this对象

## apply(), call(), bind()

```javascript
function sum(num1, num2) {
    console.log('sum this', this);
    return num1 + num2;
}
function callSum1(num1, num2) {
    console.log('callSum1 this', this); // Object[global]
    const thisb = {};
    console.log('callSum1 thisb', thisb); // {}

    return sum.apply(thisb, arguments); // this = {}
    // return sum(num1, num2) // this = Object(global)
}
function callSum2(num1, num2) {
    console.log('callSum2 this', this); // Object[global]
    const thisb = {};
    console.log('callSum2 thisb', thisb); // {}

    return sum.apply(thisb, arguments); // this = {}
    // return sum(num1, num2) // this = Object(global)
}
function bindDemo(num1, num2) {
    console.log('bindDemo this', this); // Object[global]
    const thisb = {};
    console.log('bindDemo thisb', thisb); // {}

    const sumb = sum.bind(this) // this = Object(global) 
    // const sumb = sum.bind(thisb) // this = {}

    return sumb(num1, num2);
}

console.log(callSum1(10, 10));  // 20
console.log(callSum2(10, 10));  // 20
console.log(bindDemo(10, 10)); // 20
```

## export和export default的区别

- export导出变量可在import {}时获取。: import {} from 'module'
- export default导出对象默认是整个模块module对象。但是又不包含{}。: import module from 'module'