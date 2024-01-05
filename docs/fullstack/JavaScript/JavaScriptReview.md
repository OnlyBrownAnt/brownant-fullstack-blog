# JavaScript总结

## Docs
- [JavaScript 手册(MDN)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [MDN/Web/API/Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

## Introduction

基于 "JavaScript高级程序设计-第四版" 的JS学习笔记，基本都是总结类的笔记，作为一份纲要帮助快速复习。不会对细节和实现进行过多的介绍，因为书籍 "JavaScript高级程序设计-第四版" 已经介绍的很详细了。所有案例都基于ECMAScript 6版本。

> PS：恕我直言，变量、数据类型、操作符号，仅这三个部分就还是让我好几番都想丢掉手中的书籍。这些不讲礼貌且多余的灵活太令人讨厌了。

## 第 3 章 - 语言基础

### 基本语法

- 区分大小写

- 标识符规则
  
  > 变量、函数、属性或函数参数的名称
  
  - 第一个字符必须是一个字母、下划线(_)或美元符号($)
  
  - 剩下的其他字符可以是字母、下划线、美元符号或数字

- 注释

- 严格模式
  
  > 严格模式(strick mode)是一种不同的 JavaScript 解析和执行模型。
  > 
  > 在ES5增加改模式。
  
  - 用法
    
    JS脚本文件开头或者函数体开头增加"strick mode"。
  
  - 作用
    
    用于告诉JS引擎对于一些ES3的不规范写法在这种模式下要被处理，对于不安全的活动将抛出错误。

- 语句结尾分号可不加
  
  > 推荐加。部分压缩处理会处理空行，加分号也便于工具处理。

### 变量

#### 变量特点

##### 对比表

| 特点\变量                                     | var | let | const |
| ----------------------------------------- | --- | --- | ----- |
| 1. 初始化的变量**允许**改变值、类型 ？                   | 是   | 是   | 是     |
| 2. 操作符定义的变量会成为包含它的函数的局部变量。该变量将在函数退出时被销毁 ？ | 是   | 是   | 是     |
| 3. 操作符定义的变量**会**在执行的时候自动提升到函数作用顶部 ？       | 是   | 否   | 否     |
| 4. **允许**同一个块作用域中出现冗余声明 ？                 | 是   | 否   | 否     |
| 5. **允许**不声明操作符来定义变量，会创建一个全局变量 ？          | 是   | 否   | 否     |
| 6. 全局作用域下声明的变量**会**成为window的属性 ？          | 是   | 否   | 否     |

##### 附加说明

1. const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改 const 声明的变量会导致运行时错误。
   
   > 这里的修改指的是重新赋值新的变量，如果是引用数据类型下，只修改变量的属性不会导致运行时错误。

#### 常见情况

- 声明提升
  
  var操作符声明的变量，由于特点3，会出现声明提升的情况。从而还导致了4的特点出现。

- 暂时性死区
  
  let操作符声明的变量，由于特点3，避免了声明提升的情况。在声明之前的执行瞬间就被称为“暂时性死区”。

- 全局声明
  
  var操作符声明的变量，由于特点6，形成了全局声明的一个效果。

- 条件声明
  
  var操作符声明的变量之所以会出现特点4，是因为JS进行声明合并处理。而let不会被进行合并处理，所以在声明let变量时不知道之前是否已经被声明过，可能会进行异常报错。

- for 循环中的 let 声明
  
  还是由于var操作符声明的变量的特点3，导致变量在循环体外部可以被访问。所以直接访问的是最后一次var变量的变化的值。而let声明的变量在这种情况下是无法被访问的。

#### 附加说明

1. 不使用var

2. 优先使用const、let

3. const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改 const 声明的变量会导致运行时错误。
   
   > 这里的修改指的是重新赋值新的变量，如果是引用数据类型下，只修改变量的属性不会导致运行时错误。

### 数据类型

#### 数据类型总结

- 一共 7 种

- 原始数据类型 5 种：Undefined、String、Number、Boolean、Symbol

- 引用数据类型 2 种：Object、Null

| 数据类型      | 类型     | 说明                    | 字符字面量                                                                                                                    |
| --------- | ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Undefined | 原始数据类型 | 已声明未定义的变量             | undefined                                                                                                                |
| String    | 原始数据类型 | 字符串                   | \n(换行)、\t(制表)、\b(退格)、\r(回车)、\f(换页)、\\\\(换行)、\"(双引号字符串)、\'(单引号字符串)、\\`(反引号字符串)、\xnn(十六进制编码表示字符)、\unn(十六进制编码表示的Unicode 字符) |
| Number    | 原始数据类型 | 数字(整数、浮点数) IEEE754 标准 | 10(十进制字面量)、07(八进制字面量)、0xA(十六进制字面量)、NaN(计算、转换数字失败时返回NaN)、-Infinity(负无穷小)、Infinity(正无穷小)                                   |
| Boolean   | 原始数据类型 | 布尔类型                  | false、true                                                                                                               |
| Symbol    | 原始数据类型 | 符号类型                  | 无字符字面量                                                                                                                   |
| Object    | 引用数据类型 | 对象（作为派生其他对象的基类）       | {}、[]                                                                                                                    |
| Null      | 引用数据类型 | 空对象指针（未声明的变量）         | null                                                                                                                     |

#### 附加说明

- 字符字面量（Literal）
  
  - 又名直接量，指程序中直接使用的数据值。

- 大驼峰写法表示的数据类型
  
  - 指的是包装原始值的包装类型

- ECMAScript 默认把值转换为整数
  
  - 小数点后没有数字，会被转换为整数。1. == 1

- 八进制数字表示
  
  - 字面量第一位为0，如果整个字面量的值不符合八进制规则，则默认转换为十进制。07 = 7(八进制)、079 = 79(十进制)
  
  - 严格模式下，前缀 0 会被视为语法错误，如果要表示八进制值，应该使用前缀 0o。

- 十六进制数字表示
  
  - 十六进制数字(0~9 以及 A~F)

- 科学记数法
  
  - 一个数值(整数或浮点数)后跟一个大写或小写的字母 e，再加上一个要乘的 10 的多少次幂。3.1415e7 = 31415000。

- 0.1 + 0.2 != 0.3 (浮点数转换精度缺失问题)
  
  - 原因
    
    IEEE754标准在浮点数和二进制转换会存在截取导致精度丢失的情况，导致操作结果错误。
    
    常见案例 
    
    ```javascript
    0.1 + 0.2 // 0.30000000000000004
    1 - 0.9 // 0.09999999999999998
    0.0532 * 100 // 5.319999999999999
    ```
  
  - 解决办法
    
    - 分割字符串，整数和小数部分单独相加减，最后再拼接起来。
    
    - 扩大到最小整数倍，相加后再进行除于扩大的倍数。

- IEEE754 标准(重点)
  
  - [小浩发现这篇浮点数的文章讲的真不错！-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1729818#:~:text=%E8%AE%B2%E7%9A%84%E7%9C%9F%E4%B8%8D%E9%94%99%EF%BC%81-,%E5%B0%8F%E6%B5%A9%E5%8F%91%E7%8E%B0%E8%BF%99%E7%AF%87%E6%B5%AE%E7%82%B9%E6%95%B0%E7%9A%84%E6%96%87%E7%AB%A0%E8%AE%B2%E7%9A%84%E7%9C%9F%E4%B8%8D%E9%94%99%EF%BC%81,-%E5%8F%91%E5%B8%83%E4%BA%8E%202020)

- String基础用法
  
  - ECMAScript 中的字符串是不可变的(immutable)，意思是一旦创建，它们的值就不能变了。要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。
  
  - 模板字面量
    
    使用模版字面量反引号来定义模版字符串。
    
    ```javascript
    let pageHTML = `
    <div>
      <a href="#">
        <span>Jake</span>
      </a>
    </div>`;
    ```
  
  - 字符串插值
    
    模版字面量支持使用 \${}语法进行字符串插值。
    
    ```javascript
    let str = `str`; // str
    let strAll = `all ${str}`; // all str
    ```
  
  - 原始字符串
    
    使用String.raw标签函数获取原始的模板字面量内容。
    
    ```javascript
    console.log(`\u00A9`); // ©
    console.log(String.raw`\u00A9`); // \u00A9
    ```

- Symbol的特点
  
  - 符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。
    
    ```javascript
    Symbol('1') == Symbol('1') // false
    ```
  
  - 解决了属性冲突的问题，也提供了模拟私有属性实现的方案。验证属性冲突实例如下
  
  ```javascript
  // 分别引入两个包的属性名和值作为对象obj的属性名和值。
  
  // 1. 直接使用字符串作为属性名
  function lib1(obj) {
      const libraryPropertyKey = "lib1";
      obj[libraryPropertyKey] = 1;
      return { obj, libraryPropertyKey };
  }
  function lib2(obj) {
      const libraryPropertyKey = "lib1";
      obj[libraryPropertyKey] = 2;
      return { obj, libraryPropertyKey};
  }
  
  let obj = new Object()
  let libraryPropertyValue = null;
  
  let { obj: lib1Obj, libraryPropertyKey: lib1LibraryPropertyKey } = lib1(obj);
  obj = lib1Obj; // { lib1: 1 }
  libraryPropertyValue = obj[lib1LibraryPropertyKey]; // 1
  
  let { obj: lib2Obj, libraryPropertyKey: lib2LibraryPropertyKey } = lib2(obj);
  obj = lib2Obj; // { lib1: 2 }
  libraryPropertyValue = obj[lib2LibraryPropertyKey]; // 2
  // 结果：属性名重复，导致值被覆盖。
  
  // 1. 使用Symbol包装的字符串作为属性名
  function lib1(obj) {
      const libraryPropertyKey = Symbol("lib1");
      obj[libraryPropertyKey] = 1;
      return { obj, libraryPropertyKey };
  }
  function lib2(obj) {
      let obj = new Object();
      const libraryPropertyKey = Symbol("lib1");
      obj[libraryPropertyKey] = 2;
      return { obj, libraryPropertyKey};
  }
  
  let obj = new Object()
  let libraryPropertyValue = null;
  
  let { obj: lib1Obj, libraryPropertyKey: lib1LibraryPropertyKey } = lib1(obj);
  obj = lib1Obj; // { Symbol(lib1): 1}
  libraryPropertyValue = obj[lib1LibraryPropertyKey]; // 1
  
  let { obj: lib2Obj, libraryPropertyKey: lib2LibraryPropertyKey } = lib2(obj);
  obj = lib2Obj; // { Symbol(lib1): 1, Symbol(lib1): 2}
  libraryPropertyValue = obj[lib2LibraryPropertyKey]; // 2
  // 结果：属性名没有重复，值未被覆盖。
  
  // 结论：
  // 即使不同的包中使用了相同的命名，使用Symbol进行包裹之后也是不同的标识。
  // 通过 [Symbol变量] 的方式可以区分不同库的相同属性名。
  ```

- Symbol的用法
  
  1. 基本用法
     
     - 调用 Symbol()函数时，也可以传入一个字符串参数作为对符号的描述(description)，将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关。
     
     - 符号没有字面量语法。
     
     - Symbol()函数不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符号包装对象。
  
  2. 使用全局符号注册表 
     
     - Symbol.for()
       
       > 根据字符名称，查询全局符号注册表，对每个字符串键都执行幂等操作。已经创建的Symbol，则获取实例。如果不存在则新建实例到全局注册表。
       
       ```javascript
       let obj = new Object();
       let field = null;
       
       field = Symbol.for('fieldSymbol');
       obj[field] = field; // { Symbol(fieldSymbol): Symbol(fieldSymbol) } 
       
       field = Symbol.for('fieldSymbol');
       obj[field] = field; // { Symbol(fieldSymbol): Symbol(fieldSymbol) }
       
       // 获取复用已经在全局符号注册表里存在的符号
       ```
     
     - Symbol.keyFor()
       
       > 根据字符变量。查询全局符号注册表。如果存在Symbol则返回字符名，如果没有则返回undefined。
       
       ```javascript
       // 
       let field = null;
       let fieldValue = null;
       
       field = Symbol.for('fieldSymbol');
       fieldValue = Symbol.keyFor(field); // 'fieldSymbol'
       
       field = Symbol('fieldSymbol');
       fieldValue = Symbol.keyFor(field); // undefined
       ```
3. 使用符号作为属性
   
   作为对象的属性，可以避免属性冲突问题。
   
   ```javascript
   let obj = new Object();
   
   let field = 'fieldString';
   obj[field] = field; // { fieldString: 'fieldString' }
   
   field = 'fieldString'
   obj[field] = field; // { fieldString: 'fieldString' }
   // 属性名都为fieldString，属性被覆盖。
   
   field = Symbol('fieldSymbol')
   obj[field] = field; // { fieldString: 'fieldString', Symbol('fieldSymbol'): Symbol('fieldSymbol') }
   
   field = Symbol('fieldSymbol')
   obj[field] = field; // { fieldString: 'fieldString', Symbol('fieldSymbol'): Symbol('fieldSymbol'), Symbol('fieldSymbol'): Symbol('fieldSymbol')}
   // 属性名都为Symbol('fieldSymbol')，但是实际引用的变量不同，所以认为属性也不同。
   // 可以共存，避免了属性冲突问题。
   ```

4. 常用内置符号(重要)
   
   > - ECMAScript 6 也引入了一批常用内置符号(well-known symbol)，用于暴露语言内部行为，开发者可以直接访问、重写或模拟这些行为。这些内置符号都以 Symbol 工厂函数字符串属性的形式存在。
   > 
   > - 这些内置符号最重要的用途之一是重新定义它们，从而改变原生结构的行为。(实际大量运用于对象原型函数或者API的设计，比如String.prototype.match()、API Generator)
   > 
   > - 在提到ECMAScript规范时，经常会引用符号在规范中的名称，前缀为@@。比如， @@iterator 指的就是 Symbol.iterator
   
   1. Symbol.asyncIterator
   
   2. Symbol.hasInstance
   
   3. Symbol.isConcatSpreadable
   
   4. Symbol.iterator
   
   5. Symbol.match
   
   6. Symbol.replace
   
   7. Symbol.search
   
   8. Symbol.species
   
   9. Symbol.split
   
   10. Symbol.toPrimitive
   
   11. Symbol.toStringTag
   
   12. Symbol.unscopables
- Object实例的属性和方法
  
  > ECMAScript 中的 Object 也是派生其他对象的基类。Object 类型的所有属性和方法在派生的对象上同样存在。
  > 
  > JS的Object类似于JAVA的java.lang.Object。
  
  - constructor
    
    用于创建当前对象的函数
    
    ```javascript
    let obj = new Object(); //constructor == Object()
    ```
  
  - hasOwnProperty(propertyName)
    
    用于判断当前对象实例(不是原型)上是否存在给定的属性。
    
    检查的属性名类型: 必须是字符串(如 o.hasOwnProperty("name"))或符号。
    
    ```javascript
    let obj = new Object();
    
    obj.fieldString = 'fieldString';
    
    let fieldSymbol = Symbol('field');
    obj[fieldSymbol] = fieldSymbol;
    
    console.log(obj.hasOwnProperty('fieldString')) // true
    console.log(obj.hasOwnProperty(fieldSymbol)) // true
    
    console.log(obj.hasOwnProperty('field')) // false
    ```
  
  - isPrototypeOf(object)
    
    用于判断当前对象是否为另一个对象的原型
  
  - propertyIsEnumerable(propertyName)
    
    用于判断给定的属性是否可以使用。
    
    检查的属性名类型: 必须是字符串(如 o.hasOwnProperty("name"))。
  
  - toLocaleString()
    
    返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
  
  - toString()
    
    返回对象的字符串表示。
  
  - valueOf()
    
    返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

### 数据类型转换规则

> JS是个弱语言类型的语言，简单而言它会自己进行一堆莫名其妙的智能转换。
> 
> 而且不同的转换方式下会有不同的转换规则。Oh God
> 
> 掌握它的转换规则，避免出现不必要的Bug。

#### 不同类型与Number之间的转换规则

##### Number()

| 数据类型      | 转换规则                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boolean   | true 转换为 1，false 转换为 0                                                                                                                                              |
| String    | 1. 包含整数：去掉前面0，转换为十进制。2. 包含有效的浮点数：忽略前面0，转换浮点数 3. 在1或者2的基础上，数值前带加减号：加减号保持不变 4. 包含有效的十六进制格式：转换为十六进制对应的十进制整数 5. 空字符串（不包含字符）：返回0 6. 其余情况（转换失败的情况）：返回NaN                  |
| Number    | 直接返回转换前的值                                                                                                                                                           |
| Object    | 1. 调用 valueOf()方法，并按照上述规则转换返回的值。2. 若步骤1返回为NaN，则调用 toString()方法，再按照转换字符串的规则转换。比如 Number((new Array([1])).toString()) == 1，但是Number((new Object()).toString()) == NaN |
| Null      | 直接返回0                                                                                                                                                               |
| Undefined | 转换失败、直接返回NaN                                                                                                                                                        |

##### parseInt()

> 在Number()基础上获取整数。

- 字符串最前面的空格会被忽略

- 从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，直接返回NaN

- 继续依次检测每个字符，直到字符串末尾，或碰到非数值字符
  
  - 后续字符是有效的十六进制格式：按十六进制解析成十进制。
  
  - 如果parseInt()提供了十六进制参数，那么字符串前面的"0x"可以省掉。
  
  - 其余情况都不进行解析，返回之前已经检测过的值。

```javascript
let num1 = parseInt("1234blue");  // 1234
let num2 = parseInt(""); // NaN
let num3 = parseInt("0xA"); // 10，解释为十六进制整数
let num4 = parseInt(22.5); // 22
let num5 = parseInt("70"); // 70，解释为十进制值
let num6 = parseInt("0xf"); // 15，解释为十六进制整数 
```

##### parseFloat()

> 在Number()基础上获取浮点数。
> 
> 和parseFloat基本流程类似，区别是不解析十六进制，默认返回直只解析数字部分，而且会对科学记数法进行处理。

- 字符串最前面的空格会被忽略。

- 从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，直接返回NaN。

- 解析到字符串末尾或者解析到一个无效的浮点数值字符为止。
  
  - 如果遇到科学计数法也会正常解析。

```javascript
let num1 = parseFloat("1234blue"); // 1234
let num2 = parseFloat("0xA"); // 0
let num3 = parseFloat("22.5"); // 22.5
let num4 = parseFloat("22.34.5"); // 22.34
let num5 = parseFloat("0908.5"); // 908.5
let num6 = parseFloat("3.125e7"); // 3.1270000
```

#### 不同类型与Boolean之间的转换规则

##### Boolean()

| 数据类型      | 转换为 true 的值 | 转换为 false 的值 |
| --------- | ----------- | ------------ |
| Boolean   | true        | false        |
| String    | 非空字符串       | ""(空字符串)     |
| Number    | 非0数字        | 0、NaN        |
| Object    | 任意派生对象      | N/A(不存在)     |
| Null      | N/A(不存在)    | null         |
| Undefined | N/A(不存在)    | undefined    |

#### 不同类型与String之间的转换规则

##### String()

> 都会直接被转换成字符串，优先级最大。

| 数据类型      | 转换为前的值    | 转换为后的值            |
| --------- | --------- | ----------------- |
| Boolean   | true      | "true"            |
| Number    | 10        | "10"              |
| Object    | {}        | "[object Object]" |
| Null      | null      | "null"            |
| Undefined | undefined | "undefined"       |

### 操作符

| 操作符类型 | 操作符说明                                                                                |
| ----- | ------------------------------------------------------------------------------------ |
| 一元操作符 | ++、--、= +、= -                                                                        |
| 位操作符  | ~(按位非)、&(按位与)、\|(按位或)、^(按位异或)、\<\<(有符号左移)、>>(有符号右移)、\<\<\<(无符号左移)、>>>(无符号右移)         |
| 布尔操作符 | !(逻辑非)、&&(逻辑与)、\|                                                                    |
| 乘性操作符 | *、/、%                                                                                |
| 指数操作符 | **=(指数运算 == Math.pow())                                                              |
| 加性操作符 | +、-                                                                                  |
| 关系操作符 | 小于(\<)、大于(>)、小于等于(\<=)、大于等于(>=)                                                      |
| 相等操作符 | ==(等于)、!=(不等于)、===(全等于)、!==(不全等)                                                     |
| 条件操作符 | variable = boolean_expression ? true_value : false_value;                            |
| 赋值操作符 | 乘后赋值(*=)、除后赋值(/=)、取模后赋值(%=)、加后赋值(+=)、减后赋值(-=)、左移后赋值(\<\<=)、右移后赋值(>>=)、无符号右移后赋值(>>>=) |
| 逗号操作符 | ,                                                                                    |

### 操作符转换规则

>  JS中，参与操作符的变量会被进行一波不太智能的智能转换。
> 
> 需要熟悉一下规则，然后平常使用时尽量按照强语言类型的习惯去进行类型和值的比较。

##### 一元操作符转换规则

- 该操作数会先进行一次Number()方式的类型转换。然后再参与操作符的运算。

##### 布尔操作符转换规则

- 该操作数会先进行一次Boolean()方式的类型转换。然后再参与操作符的运算。

##### 乘性操作符转换规则

- 在处理非数值时，则该操作数会在后台被使用Number()转型函数转换为数值。

- 如果操作数都是数值，则执行常规的乘法运算，即两个正值相乘是正值，两个负值相乘也是正值，正负符号不同的值相乘得到负值。如果 ECMAScript 不能表示乘积，则返回 Infinity 或-Infinity。

- 特殊情况的返回规则

| 情况说明 \ 操作符               | *                      | /                      | %   |
| ------------------------ | ---------------------- | ---------------------- | --- |
| 任一操作数是 NaN               | NaN                    | NaN                    | NaN |
| Infinity [操作符] Infinity  | Infinity               | NaN                    | NaN |
| Infinity [操作符] 0         | NaN                    | +Infinity or -Infinity | NaN |
| Infinity [操作符] 非 0 的有限数值 | +Infinity or -Infinity | +Infinity or -Infinity | NaN |
| 0 [操作符] 0                | 0                      | NaN                    | NaN |
| 非0的有限数 [操作符] 0           | 0                      | +Infinity or -Infinity | NaN |
| 0 [操作符] 非0的有限数           | 0                      | 0                      | 0   |

#### 加性操作符转换规则

##### 加法操作符

- 存在Infinity的情况
  
  - 主要看正负符号的操作结果变化
  
  - 正负符号操作后抵消后，返回NaN。
  
  - 符号正负操作后为多倍的正或者负，那么直接返回对应的+Infinity或者-Infinity

- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，再将两个字符串拼接在一起。

- 如果有任一操作数是对象、数值或布尔值，则调用它们的 toString()方法以获取字符串，然后再应用前面的关于字符串的规则。对于 undefined 和 null，则调用 String()函数，分别获取 "undefined"和"null"。

##### 减法操作符

- 存在Infinity的情况
  
  - 主要看正负符号的操作结果变化
  
  - 正负符号操作后抵消后，返回NaN。
  
  - 符号正负操作后为多倍的正或者负，那么直接返回对应的+Infinity或者-Infinity

- 如果有任一操作数是字符串、布尔值、null 或 undefined，则先在后台使用 Number()将其转换为数值，然后再根据前面的规则执行数学运算。如果转换结果是 NaN，则减法计算的结果是NaN。

- 如果有任一操作数是对象，则调用其 valueOf()方法取得表示它的数值。如果该值是 NaN，则减法计算的结果是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法，然后再将得到的字符串转换为数值。

#### 关系操作符转换规则

- 转换优先级：数字 > 字符串 > 对象

- 如果操作数都是数值，则执行数值比较

- 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。

- 如果有任一操作数是对象，则调用其 valueOf()方法，取得结果后再根据前面的规则执行比较。如果没有 valueOf()操作符，则调用 toString()方法，取得结果后再根据前面的规则执行比较。

- 如果有任一操作数是布尔值，则将其转换为数值再执行比较。

#### 相等操作符转换规则

##### 等于和不等于

- 转换优先级：数字 > 字符串 > 对象

- 如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换为 1。

- 如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。

- 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再根据前面的规则进行比较。

- 优先级最高的规则
  
  - null 和 undefined 相等
  
  - null 和 undefined 不能转换为其他类型的值再进行比较
  
  - 如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true。因为按照规则，NaN 不等于 NaN。
  
  - 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象则相等操作符返回 true。

##### 全等和不全等

- 在比较相等时不转换操作数。

- 相等和不相等操作符存在类型转换问题，因此推荐使用全等和不全等操作符。

## 第 4 章 - 变量、作用域与内存

### 原始值和引用值

#### 存储空间

- 栈内存

- 堆内存

#### 值存储方式解析

- 原始值
  
  - 值存储于栈内存。通过变量可以直接访问。

- 引用值
  
  - 值存储于堆内存，引用指针存储于栈内存。通过变量保存的是引用指针，通过引用指针获取堆内存中的具体的值。

#### 值传递方式解析

- 按值传递
  
  - 每次变量进行赋值传递、作为参数传递时都是复制了一份该变量的值来赋值。
  
  - 变量可能原始值、也可能是引用值。所以当变量是作为引用值进行传递的时候只是复制一个引用指针，而不是对以的值。编码时需要注意。
    
    ```javascript
    // 执行addField函数之后修改了对象的属性。
    let obj = new Object();
    function addField(obj) {
        obj.field = 'field';
    }
    
    console.log(JSON.stringify(obj)); // {}
    addField(obj);
    console.log(JSON.stringify(obj)); // {"field":"field"}
    ```

#### 判断数据类型

- typeof
  
  - 精准判断原始类型为具体的类型。
  
  - 笼统判断引用类型为object。
  
  ```javascript
  console.log(typeof undefined) // undefined
  console.log(typeof '1') // string
  console.log(typeof 1) // number
  console.log(typeof false) // boolean
  console.log(typeof Symbol()) // symbol
  console.log(typeof null) // object 
  console.log(typeof new Object()) // object 
  console.log(typeof function(){}) // function 
  ```

- instanceof
  
  > result = variable instanceof constructor
  > 
  > 变量是给定引用类型(由其原型链决定，将在第 8 章详细介绍)的实例，则 instanceof 操作符返回 true。

> 实现原理：
> 
> 沿着原型链，在constructor属性上寻找是否存在相符合引用类型的类型。

> 补充
> 
> 默认情况下，所有原型对象自动获得一个名为constructor的属性，指回与之关联的构造函数。
> 
> 如前所述，构造函数有一个 prototype 属性引用其原型对象，而这个原型对象也有一个constructor 属性，引用这个构造函数，换句话说，两者循环引用:
> 
> 《JavaScript高级程序设计(第4版)》P226

- 不能判断原始类型。

- 精准判断对象的原型链上是否存在引用数据类型。
  
  ```javascript
  // console.log(undefined instanceof undefined) // TypeError: Right-hand side of 'instanceof' is not an object
  console.log('1' instanceof String) // false
  console.log(1 instanceof Number) // false
  console.log(false instanceof Boolean) // false
  console.log(Symbol() instanceof Symbol) // flase
  // console.log(null instanceof null) // TypeError: Right-hand side of 'instanceof' is not an object
  console.log(new Object() instanceof Object) // true
  console.log(function(){} instanceof Function) // true
  
  const Person = function(id) {
    this.id = id;
  };
  const person = new Person(1);
  console.log(person instanceof Object) // true
  console.log(person instanceof Person) // true
  console.log(person instanceof Function) // false
  console.log(Person instanceof Function) // true
  ```

- Object.prototype.toString.call()
  
  > 实现原理：
  > 
  > 使用 Object 对象的原型方法 toString 来打印对象的默认字符串描述。从而用于对象类型的判断。
  
  - 精准判断原始类型。
  
  - 精准判断对象的引用类型。但是无法判断其原型链上的引用类型。
  
  ```javascript
  console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
  console.log(Object.prototype.toString.call('1')) // [object String]
  console.log(Object.prototype.toString.call(1)) // [object Number]
  console.log(Object.prototype.toString.call(false)) // [object Boolean]
  console.log(Object.prototype.toString.call(Symbol())) // [object Symbol]
  console.log(Object.prototype.toString.call(null)) // [object Null]
  console.log(Object.prototype.toString.call(new Object())) // [object Object]
  console.log(Object.prototype.toString.call(new Array())) // [object Array]
  console.log(Object.prototype.toString.call(function(){})) // [object Function]
  
  const Person = function(id) {
      this.id = id;
  };
  const person = new Person(1);
  console.log(Object.prototype.toString.call(person)) // [object Object]
  console.log(Object.prototype.toString.call(Person)) // [object Function]
  ```
#### 数据判空的技巧
- [JavaScript 判断空对象、空数组的方法](https://cloud.tencent.com/developer/article/1743491)

##### 步骤总结
1. 首先是需要进行类型的判断
    - 因为不同类型使用相同判空方式可能会因为属性不存在出现异常
    - 常见判空中需要处理的类型(类型判断)
        > 通常可以使用 `typeof`、`instanceof`、`Object.prototype.toString.call()`、 `isPrototypeOf`这四种方式进行原始类型、引用类型的类型判断。不过原始类型的类型判断可以进行简化，在判空处理中一起处理掉。看第2步骤中的类型判空部分即可。
        - 字符串
        - undefined、null
        - 数组
        - 对象

2. 其次是在不同类型判断下进行针对性的判空
    - 常见判空中需要处理的类型(类型判空)
        - 字符串
            ```javascript
            function isString(value) {
                // 1. 判断是否是空字符串
                if (value === "") return true;
                return false;
            }
            ```
        - undefined、null
            ```javascript
            function isUndefinedOrNull(value) {
                // 1. 判断是否是 undefined 和 null
                // 通过 !value 快捷判断 undefined 和 null，然后同时增加其他非空情况(0、"")的排除，因为 !0、!"" 也为true。
                if (!value && value !== 0 && value !== "") return true; 
                return false;
            }
            ```
        - 数组
            ```javascript
            function isEmptyArray(value) {
                // 1. 判断是否是 空数组 (isPrototypeOf()方式) 
                // 判断是否是数组 Array.prototype.isPrototypeOf(value)  
                // 判断是否是空数组 查看数组长度 value.length === 0 
                if (Array.prototype.isPrototypeOf(value) && value.length === 0 ) return true;

                // 2. 判断是否是 空数组(JSON.stringify()方式)
                // if (JSON.stringify(item) === '[]') return true;
                return false;
            }
            ```
        - 对象
        ```javascript
        function isEmptyObject(value) {
            // 1. 判断是否是 空对象 (isPrototypeOf()方式) 
            // 判断是否是对象 Object.prototype.isPrototypeOf(value)  
            // 判断是否是空对象 遍历属性数量 Object.keys(value).length === 0
            if (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0 ) return true;

            // 2. 判断是否是 空数组(JSON.stringify()方式)
            // if (JSON.stringify(item) === '{}') return true;
            return false;
        }
        ```

##### 判空综合案例
```javascript
function isEmpty(value) {
    // 判断 空字符串
    if (value === "") return true;

    // 判断 undefined 和 null   
    // 通过 !value 快捷判断 undefined 和 null，然后同时增加其他非空情况(0、"")的排除，因为 !0、!"" 也为true。
    if (!value && value !== 0 && value !== "") return true;

    // 判断 空数组
    // 空数组要先于空对象校验，因为Object也是基于Array原型链上，也会进入类型判断通过进行校验。
    if (Array.prototype.isPrototypeOf(value) && value.length === 0 ) return true;
    
    // 判断空对象
    if (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0 ) return true;
    return false;
}
```

#### instanceof 和 Object.prototype.isPrototypeOf() 区别(处理继承效果的判断)
- [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
- [Object.prototype.isPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
- [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [JavaScript isPrototypeOf vs instanceof usage](https://stackoverflow.com/questions/18343545/javascript-isprototypeof-vs-instanceof-usage)

##### 分析定义
- `instanceof` 运算符用于检测`构造函数`的 `prototype` 属性是否出现在某个实例对象的原型链上
    > 强调的是检查`构造函数`的`prototype`。
    > 
    > 在函数原型基础上有这样一个引用关系，`构造函数.prototype` -> `原型对象`。所以其实可以理解是在原型链基础上进行查找和比对目标类型是否存在。但是前提是通过`构造函数`去查找`原型对象`。
    >
    > 但是JS在实际实现继承效果上存在历史问题，有多种实现方式，虽然基本都是基于原型链来实现的。但是存在基于对象的原型实现继承效果，而对象就不存在`构造函数`，比如`Object.create()`实现的继承效果。
    >
    > 在这种情况下instanceof是无法作为判断根据的，甚至会报错。
- `isPrototypeOf()` 方法用于检查一个对象是否存在于另一个对象的原型链中。
    > 强调的是直接基于`原型链`去进行检查。
    >
    > 相对于`instanceof` 在JS中更加通用。可以判断处理`Object.create()`实现的对象继承效果。

##### 总结区别
- 首先是确认`instanceof`和`isPrototypeOf()`的作用目的。两者的目的都是为了判断某个实例是否有资格使用其父辈层次的对象、函数、类型的一些属性和函数。
- 其次由于JS实现继承效果的方式多样，可以使用对象、函数、类(Class)，而最终都是基于原型链实现一个继承效果。在实际判断的时候要选择通用的方式，所以推荐使用`isPrototypeOf()`
- 补充一下，这里指的继承效果只是指父类层次属性和方法可以通过一些方式让子类实例进行使用，并不是严谨的继承实现(比如Java Class)。在JS中通过`class`实现的继承效果相对是最严谨的。

##### 对象实现继承效果实例
```javascript
const superProto = {
    // some super properties
    isHuman: false,
    printIntroduction: function () {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    },
}

var subProto = Object.create(superProto);
subProto.someProp = 5;

var sub = Object.create(subProto);

console.log(superProto.isPrototypeOf(sub));  // true
console.log(sub instanceof superProto);      // throw Error
```



### 执行上下文和作用域

#### JavaScript代码执行流程

> 熟悉JS执行基本流程，了解作用域、作用域链、上下文等概念在其中的作用并帮助深入理解知识点。

> Docs
> 
> - [JS中什么是解析和编译？](https://blog.stackademic.com/what-is-parsing-and-compiling-in-js-1ca97ae346cb)
> 
> - [执行上下文、作用域链和 JavaScript 内部结构](https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c)

##### 解析

进行AST解析，将代码片段将被解析为称为 **抽象语法树**（**AST**） 的特定树状数据。

##### 编译

- 编译
  
  在执行之前将整个代码转换为可移植的机器代码。执行可以在编译后发生。

- 解释
  
  它在执行之前将我们的代码逐行翻译成机器代码。它们同时发生。一开始翻译速度很快。

- 即时(JIT)编译
  
  为了充分利用编译和解释，JIT 将代码立即翻译成机器代码，然后立即执行。因此，这种方式不存在可移植文件，并且在编译后执行。

##### 执行

- 内存分配

- 调用堆栈

- 执行上下文

#### 调用堆栈

> 也称执行上下文堆栈(ECS)

执行上下文堆栈是一种堆栈数据结构，即后进先出数据结构，用于存储脚本生命周期期间创建的所有执行堆栈。

全局执行上下文默认存在于执行上下文堆栈中，并且位于堆栈的底部。

在执行全局执行上下文代码时，如果 JS 引擎发现函数调用，它会为该函数创建一个函数执行上下文，并将其推入执行上下文堆栈的顶部。

JS引擎执行执行上下文位于执行上下文堆栈顶部的函数。一旦函数的所有代码被执行，JS引擎就会弹出该函数的执行上下文并开始执行其下面的函数。

#### 执行上下文

##### 定义

定义为 JavaScript 代码执行的环境，可以访问变量this、对象和函数。在执行函数时动态创建。

##### 类型

- 全局执行上下文( GEC)
  
  > 不同宿主环境，全局上下文不同
  > 
  > - 浏览器环境：全局上下文关联的变量对象是window
  > 
  > - Node环境：全局上下文关联的变量对象时global

- 函数执行上下文（FEC）

- Eval执行上下文

##### 调用执行上下文

> 每次调用过程分为创建和执行两个阶段。
> 
> JS 引擎发现函数调用，它会为该函数创建一个函数执行上下文，并将其推入执行上下文堆栈的顶部。

###### 创建阶段

- 创建对象变量VO (Activation对象或Variable对象)
  
  > 这个对象变量的作用是实现控制函数和变量可以访问什么数据以及定义它们行为。
  > 
  > 上下文中定义的所有变量和函数都存在于这个对象，虽然无法通过代码访问变量对象，但后台处理数据会用到它。

> 对象变量有两种情况
> 
> 变量：变量对象(variable object)
> 函数：活动对象(activation object) 作为变量对象，只包含arguments属性。

- 创建作用域链

- 确定 this 的值
  
  > 初步处理时，this总是指向当前函数所在的执行上下文。

###### 执行阶段

- JS 引擎将执行上下文其推入执行上下文堆栈的顶部，等待调用。

#### 作用域

> Docs
> 
> - [从 JavaScript 作用域说开去]([从 JavaScript 作用域说开去](https://halfrost.com/javascript_scope/))

##### 定义

这里的作用域指的是JavaScript采用的静态作用域(词法作用域)。

词法变量的作用域可以是一个函数或一段代码，该变量在这段代码区域内可见（visibility）；在这段区域以外该变量不可见（或无法访问）。词法作用域里，取变量的值时，会检查函数定义时的文本环境，捕捉函数定义时对该变量的绑定。

##### 作用

作用域的作用是控制作用域内的变量和函数的可见属性和访问控制方式。

##### 作用域类型

- 全局作用域

- 函数作用域
  
  指属于这个函数的全部变量都可以在整个函数的范围内使用及复用。

- 块级作用域
  
  一对包含花括号{}界定。
  
  除了 `let` 和 `const` 关键字以外，还有一个具有块级作用域的概念是使用 `class` 关键字来声明类。

##### 函数作用域和块级作用域的区别

```javascript
var field1 = 'fieldValue1-1';
function testVar() {
    console.log(field1) // undefined
    if (true) {
        var field1 = 'fieldValue1-2';
        console.log(field1) // fieldValue1-2
    }
    console.log(field1) // fieldValue1-2
}
testVar();
// var声明的变量为函数作用域。函数作用域下，存在变量提升问题，导致第一次打印field1时打印的if判断层里的field1覆盖的值，第二次获取的是被修改的值。

var field2 = 'fieldValue2-1';
function testLet() {
    console.log(field2) // fieldValue2-1
    if (true) {
        let field2 = 'fieldValue2-2'; // fieldValue2-2
        console.log(field2)
    }
    console.log(field2) // fieldValue2-1
}
testLet();
// let声明的变量为块级作用域。块级作用域下，第一次打印field2时没有被覆盖，第二次也正常。
```

#### 作用域链

> [作用域链 - JavaScript Guidebook](https://tsejx.github.io/javascript-guidebook/core-modules/executable-code-and-execution-contexts/execution/scope-chain/)

##### 定义

由多个执行上下文的 **变量对象** 构成的链表就叫做作用域链。

##### 作用

- 作用域链保存了各级上下文中的代码在访问变量和函数时的顺序。

- 用于代码执行时的标识符解析链路。

##### 附加说明

- 每次调用执行上下文代码时创建对应的作用域链。

- 代码正在执行的上下文的变量对象始终位于作用域链的最前端。

#### 作用域链增强

##### 原理

在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除。

##### 作用域增加方式

- try/catch 语句的 catch 块

- with 语句

#### 变量声明

> 变量声明和作用域、作用域链之前的关系。

##### var

- var 声明变量时，变量会被自动添加到最接近的上下文。和函数作用域一样。

- 如果变量未经声明就被初始化了，那么它就会自动被添加到全局上下文。

##### let

- let声明变量，变量属于块级作用域，由最近的一对包含花括号{}界定。

##### const

- 和let一样，声明变量，变量属于块级作用域，由最近的一对包含花括号{}界定。

##### 标识符查找

当在特定上下文中为读取或写入而引用一个标识符时，必须通过搜索确定这个标识符表示什么。

搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索停止，变量确定;如果没有找到变量名，则继续沿作用域链搜索。

### 垃圾回收

> 了解常用的垃圾回收知识，以便与在实际开发中进行更加性能的编码。

#### 垃圾回收定义

在执行环境负责代码执行时管理内存。基本思路是确认哪个变量不咋使用，垃圾回收程序会周期性的进行自动运行来回收内存。

其中的关键点就是如何判别变量是否可以被回收，所以制定一些垃圾收策略来进行处理这个问题。

#### 垃圾回收策略

##### 标记清理

###### 原理

任何在上下文中的变量都访问不到的变量都是可以被清理的。

当变量进入上下文，比如在函数 内部声明一个变量时，这个变量会被加上存在于上下文中的标记。当变量离开上下文时，也会被加上离开上下文的标记。

这里的标记只是一个概念，可以用各种方式来进行具体的实现。比如在变量上添加具体的标记，将变量进行归类到数组中存放也是一种标记方式。

###### 处理逻辑

1. 标记处理
   
   垃圾回收程序运行的时候，会标记内存中存储的所有变量，将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记 的变量就是待删除的了。

2. 内存清理
   
   在这一次垃圾回收阶段，销毁带标记的所有值并收回它们的内存。

##### 引用计数

###### 原理

思路是对每个值都记录它被引用的次数，如果为 0 证明无引用，该值内存占用可以被清除。

let obj = new Object(); // obj是变量、new Object()是值。所以值被增加一次引用，引用次数 + 1。

由于存在明显缺点，改方式不常用，主要集中于IE9及之前的同类浏览器。

###### 处理逻辑

1. 被引用一次，被引用次数 +1

2. 被其他值覆盖引用一次，被引用次数  -1

3. 垃圾回收阶段，被引用次数为 0，则进行内存回收。

###### 缺点 - 循环引用问题

循环引用问题导致内存无法被释放。

就是对象 A 有一个指针指向对象 B，而对象 B 也引用了对象 A。
会导致这两个值实际被引用两次，但是即使最后进行接触引用，还是会存在被引用一次的情况导致无法被回收。

```javascript
function test() {
    let objA = new Object(); // new Object()被引用次数+1 = 1
    let objB = new Array(); // new Array()被引用次数+1 = 1 

    objA.toB = objB; // new Object()被引用次数+1 = 2
    objB.toA = objA; // new Array()被引用次数+1 = 2

    objA = null; // new Object()被引用次数-1 = 1
    objB = null; // new Array()被引用次数-1 = 1

    // 被引用次数 != 0，无法被释放
}
```

### 性能基础

#### 垃圾回收与性能关系

变量过多会导致频繁垃圾回收，而垃圾回收也是程序，过于频繁也会会影响性能。本质上拉说做好内存管理工作，是可以优化性能的。

##### 内存管理

> 优化内存占用，核心思路是解除引用。让垃圾回收程序可以高效回收内存，

- 通过const和let声明提升性能

- 隐藏类和删除操作
  
  > 运行期间，V8 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好。
  > 
  > 所以避免对隐藏类进行动态属性赋值，也是避免影响到实例进行不必要的操作来影响性能。
  
  - 避免 JavaScript 的“先创建再补充”(ready-fire-aim)式的动态属性赋值，并在构造函数中一次性声明所有属性。
  
  - 删除操作delete，可以修改实例的属性，从而避免影响到隐藏类。

- 内存泄漏
  
  > 内存泄漏大部分是由不合理的引用，而闭包和定时器可以引用外部变量的，但是又有不释放作用域的风险特性，是导致极容易出现内存泄漏的情况的。
  
  - 定时器
  
  - 闭包

- 静态分配与对象池
  
  > 一个策略是使用对象池。在初始化的某一时刻，可以创建一个对象池，用来管理一组可回收的对象。
  > 
  > 应用程序可以向这个对象池请求一个对象、设置其属性、使用它，然后在操作完成后再把它还给对象池。
  > 
  > 由于没发生对象初始化，垃圾回收探测就不会发现有对象更替，因此垃圾回收程序就不会那么频繁地运行。

##### 常见内存问题

- 内存泄漏

- 内存膨胀

- 频繁垃圾回收

##### 优化性能手段总结

> 主要集中在内存管理的方向。

- 合理规范使用引用，避免内存浪费。

- 通过let、const声明变量

- 避免隐藏类动态属性变更操作。使用删除属性操作更合适。

- 合理使用闭包，计时器，并合理释放占用。

## 第 7 章 - 迭代器与生成器

### 迭代器

#### 理解迭代

##### 传统迭代方式

- 计数迭代
  
  > 数据结构类型固定。
  > 数据结构访问数据方式固定。
  
  ```javascript
  let array = [1, 2, 3]
  for (let i = 0; i < array.length; i++) {
      console.log(array[i]); // a b c
  }
  ```

##### 迭代方式需求

- 不需要与数据结构绑定就能进行迭代。

- 遍历顺序支持显式顺序(比如索引)的数据就够、也要支持隐式顺序的数据结构(比如字符串)。

#### 迭代器模式

> (ECMSAcript语境)下的实现方案
> 
> 即可以把有些结构称为"可迭代对象"(iterable)，因为它们实现了正式的Iterable接口。而且可以通过迭代器Iterator消费。
> 
> 迭代器无须了解与其关联的可迭代对象的数据结构，只需要知道如何取得连续的值。

##### 迭代器模式

1. 可迭代对象
   
   > 实现Iterable接口(可迭代协议)的数据结构。
   
   - 支持迭代的自我识别能力。
     
     > 具备了自我判断是否可以进行迭代的能力。
   
   - 创建实现Iterator接口的对象的能力。
     
     > 工厂方法生成迭代器。

2. 迭代器
   
   > 实现Iterator接口的结构。该结构允许消费(consume)数据结构。
   
   - 迭代器(iterator)是按需创建的一次性对象，每个迭代器都会关联一个可迭代对象。能暴露关联可迭代对象的API。

##### JS实现迭代器模式

- 实现Iterable接口(可迭代协议)的数据结构方案
  
  - 暴露作为默认迭代器的属性。使用特殊的 Symbol.iterator 作为键。
  
  - 该默认迭代器引用一个迭代器工厂函数，返回一个新的迭代器。
    
    - 迭代器属性: next()、(可选)return()
    
    - 迭代器next()返回规则
      
      ```javascript
      // 未迭代完成 { done: false, value: value }
      
      // 迭代结束 { done: true,value: undefined }
      ```

- 实现Iterable接口的内置类型
  
  - 字符串
  
  - 数组
  
  - 映射
  
  - 集合
  
  - arguments对象
  
  - NodeList等DOM集合类型

- 接收可迭代对象的原生语言特性
  
  > 不需要显式调用这个工厂函数来生成迭代器，实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。
  > 
  > 所以接收的对象是可迭代对象而不是迭代器。
  > 
  > 发现中断迭代后可以关闭迭代器。下次迭代重新开始。
  > 
  > 实际也可以接收迭代器进行迭代，但是发现无法进行关闭迭代器。
  
  - for-of循环
  
  - 数组解构
  
  - 扩展操作符
  
  - Array.from()
  
  - 创建集合
  
  - 创建映射
  
  - Promise.all()接收由期约组成的可迭代对象
  
  - Promise.race()接收由期约组成的可迭代对象
  
  - yield*操作符，在生成器中使用

##### 自定义迭代器

> 按照JS实现内置迭代器的方式
> 
> 1. 设置Symbol.iterator属性作为工厂函数返回一个迭代器
> 
> 2. 使用接收可迭代对象的原生语言特性进行迭代可迭代对象。

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.keyMap = new Map([
            ['name', ''],
            ['age', 0]
        ]);
        this.keyMap.set('name', name);
        this.keyMap.set('age', age);
    }
    // 工厂函数 - 返回迭代器
    [Symbol.iterator]() {
        // 迭代器设计具体逻辑，采用Map的迭代器进行Person实例的key-value遍历。
        let iterator = this.keyMap.entries();
        return {
            next() {
                let mapItem = iterator.next();
                if (mapItem.done) {
                    return { done: true, value: undefined } 
                } else {
                    return { done: false, value: mapItem }
                }
            },
            return() {
                return { done: true, value: undefined }
            }
        }
    }
}

let person = new Person('zhangsan', 21);
for (const iterator of person) {
    console.log(iterator);
}

// console
// { value: [ 'name', 'zhangsan' ], done: false }
// { value: [ 'age', 21 ], done: false }
```

##### 提前终止迭代器

> 执行迭代的结构在想让迭代器知道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。下次迭代时，重新开始。

> 没有进行提前终止，那就是迭代器没有关闭成功，则还可以继续从上次离开的地方继续迭代。

###### 提前终止的情况

- for-of 循环通过 break、continue、return 或 throw 提前退出
- 解构操作并未消费所有值

###### 提前终止的处理逻辑

可选的 return()方法用于指定在迭代器提前关闭时执行的逻辑。如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。

要知道某个迭代器是否可关闭，可以测试这个迭代器实例的 return 属性是不是函数对象。

###### 实例分析

> for of迭代可迭代对象和迭代迭代器的差异。

```javascript
let map = new Map([
    [1, 1],
    [2, 2],
    [3, 3]
])
let iteratorMap = map[Symbol.iterator]()

let i = 1;
for (const iterator of iteratorMap) {
    console.log('iteratorMap 1', iterator);
    if (i == 2) {
        break;
    }
    i++;
}

for (const iterator of iteratorMap) {
    console.log('iteratorMap 2', iterator);
}

// console 迭代迭代器，出现迭代器未关闭导致继续迭代的情况。
// iteratorMap 1 [ 1, 1 ]
// iteratorMap 1 [ 2, 2 ]
// iteratorMap 2 [ 3, 3 ]

i = 1;
for (const iterator of map) {
    console.log('map 1', iterator);
    if (i == 2) {
        break;
    }
    i++;
}

for (const iterator of map) {
    console.log('map 2', iterator);
}

// console 迭代可迭代对象，每次都是从头开始。
// map 1 [ 1, 1 ]
// map 1 [ 2, 2 ]
// map 2 [ 1, 1 ]
// map 2 [ 2, 2 ]
// map 2 [ 3, 3 ]
```

##### 问题集合

1. 迭代对象接收器forof迭代可迭代对象、迭代器、生成器。每个都是两轮迭代，然后迭代中途调用throw，中途出现不同的情况。[待确认]
   
      1. 生成器，第一轮迭代中断，然后第二轮迭代直接未启动。
   
           迭代器应该关闭了，但是无法进行第二次迭代。
   
   2. 可迭代对象，第一轮迭代中断，第二轮迭代重新开始。迭代器关闭成功。
   
   3. 迭代器，第一轮迭代中断，第二轮迭代依旧继续上一轮。迭代器关闭失败。
   
   ```javascript
   function* generatorFn() {
      yield 1;
      yield 2;
      yield 3; 
   }
   
   let gIterator = generatorFn();
   // console
   // for of 1 1
   
   // let gIterator = new Array(1, 2, 3);
   // console
   // for of 1 1
   // for of 2 1
   // for of 2 2
   // for of 2 3
   
   // let gIterator = new Array(1, 2, 3)[Symbol.iterator]()
   // console
   // for of 1 1
   // for of 2 2
   // for of 2 3
   
   for (const iterator of gIterator) {
       console.log('for of 1', iterator);
       if (iterator == 1) {
           try {
               throw new Error('error')
           } catch (error) {
               // console.log('error', error);
               break;
           }
       }
   }
   
   for (const iterator of gIterator) {
       console.log('for of 2', iterator);
   }
   ```

2. 接收可迭代对象的原生语言特性和next迭代的区别
   
   1. 迭代（Iteration）
      
      使用对象是可迭代对象。
      
      迭代是通过使用`for...of`循环来遍历可迭代对象的元素。这种迭代方式隐藏了迭代器的实现细节，直接提供了每个元素的值，而无需手动调用`next()`方法。
   
   2. next迭代
      
      使用对象是迭代器。
      
      `next()`是迭代器对象的方法，用于逐个获取可迭代对象的元素。每次调用`next()`方法都会返回一个具有`value`和`done`属性的对象。`value`属性表示迭代器当前指向的元素的值，`done`属性表示迭代是否已经结束。

### 生成器

#### 定义

生成器是一种结构。
特点是在一个函数块内暂停和恢复代码执行的能力。
作用方向是自定义迭代器和实现协程。

#### 声明形式

形式是一种函数。

函数名称前面加一个星号（*)表示是一个生成器。只要是运行定义函数的地方，就可以定义生成器。
标识生成器函数的星号不受两侧空格，左右多一个少一个空格没影响，不过推荐与函数声明前隔开一个空格方便识别。

##### 常见声明形式

```javascript
// 函数声明
function* generatorFn() {}
// 函数表达式
let g = function* () {}
// 对象字面量方法
let obj = {
    * generatorFn(){}
}
// 类实例方法
class Person {
    * genratorFn() {}
}
// 类静态方法
class Preson {
    static * genratorFn() {}
}
```

#### 生成器执行特点

> 调用生成器函数会产生一个生成器对象。生产器对象实现了Iterable接口，是一个可迭代对象。
> 
> 其中最大的特点就是yield

1. 生成器对象一开始是处于暂停状态。

2. 生成器作为可迭代对象，可以通过next进行恢复执行。
   
   > 生成器作为可迭代对象只能迭代一次，如果完成或者迭代器，那么第二次无法重新进行迭代。比如两轮for of迭代，只会有第一轮打印成功，第二轮会打印失败。待确认

3. 如果生成器函数内是空的，那么直接一次迭代完成，next直接返回
   
   ```
   { done: true, value: undefined }。
   ```

4. 可以在生成器函数内部通过yield停止和开始执行。

#### yield

> yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。

- 中断执行
  
  ```javascript
  function* generatorFn() {
      yield 1;
      yield 2;
  }
  
  for (const iterator of generatorFn()) {
      console.log(iterator);
  }
  
  // console
  // 1
  // 2
  ```

- 在生成器内允许多次使用

- 输入输出
  
  ```javascript
  function* generatorFn(n) {
     while (n) {
          yield n--;
     } 
  }
  
  for (const iterator of generatorFn(2)) {
      console.log(iterator);
  }
  
  // console
  // 2
  // 1
  ```

- 支持*语法进行迭代可迭代对象
  
  > 将一个可迭代对象序列化为一连串可以单独产出的值
  > 
  > 比如实现递归算法
  
  ```javascript
  // yield迭代可迭代对象
  function* generatorFn() {
      yield* new Array(1, 2, 3)
  }
  
  for (const iterator of generatorFn()) {
      console.log(iterator);
  }
  
  // console
  // 1
  // 2
  // 3
  ```
  
  ```javascript
  // 递归
  function* generatorFn(n) {
      if (n > 0) {
          yield n - 1;
          yield* generatorFn(n - 1);
      }
  }
  
  for (const iterator of generatorFn(3)) {
      console.log(iterator);
  }
  
  // console
  // 2
  // 1
  // 0
  ```

#### 提前终止生成器

- return
  
  > return的传参也会被生成器迭代返回，不过done = true。
  
  ```javascript
  function* generatorFn() {
     yield 1;
     yield 2;
     yield 3; 
  }
  
  let gIterator1 = generatorFn();
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  // console
  // { value: 1, done: false }
  // { value: 2, done: false }
  // { value: 3, done: false }
  // { value: undefined, done: true }
  
  let gIterator2 = generatorFn();
  console.log(gIterator2.next())
  console.log(gIterator2.next())
  console.log(gIterator2.return('return'))
  console.log(gIterator2.next())
  console.log(gIterator2.next())
  // console
  // { value: 1, done: false }
  // { value: 2, done: false }
  // { value: 'return', done: true }
  // { value: undefined, done: true }
  // { value: undefined, done: true }
  ```

- throw
  
  ```javascript
  function* generatorFn() {
     yield 1;
     yield 2;
     yield 3; 
  }
  
  let gIterator1 = generatorFn();
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  console.log(gIterator1.next())
  // console
  // { value: 1, done: false }
  // { value: 2, done: false }
  // { value: 3, done: false }
  // { value: undefined, done: true }
  
  let gIterator3 = generatorFn();
  console.log(gIterator3.next())
  console.log(gIterator3.next())
  try {
      console.log(gIterator3.throw('throw'));
  } catch (error) {
      console.log('error', error);
  
      console.log(gIterator3.next())
      console.log(gIterator3.next())   
  }
  // console
  // { value: 1, done: false }
  // { value: 2, done: false }
  // error throw
  // { value: undefined, done: true }
  // { value: undefined, done: true }
  ```

#### 生成器案例

##### 深度优先遍历

## 第 8 章 - 对象、类与面向对象编程

### 对象基础

ECMAScript的对象是一组没有特定顺序的值。

可以把一个对象理解类似一张散列表的数据结构。由属性组成，属性就是散列比表上的一组键值对。

### 属性基础

#### 内部特性

> ECMA-262 使用一些内部特性来描述属性的特征。
> 
> 这些特性是由为 JavaScript 实现引擎的规范定义的。因此，开发者不能在 JavaScript 中直接访问这些特性。
> 
> 为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如[[Enumerable]]。
> 
> - 内部特性用于描述属性。
> 
> - 两个中括号把特性的名称括起来进行表示内部特性。
> 
> - 开发者不能直接访问特性。

- 常见的内部特性和属性类型、定义等相关信息之间的关系。
  
  > 备注
  > 
  > 1. 属性类型只有两种，数据属性和访问器属性。所以表中提到的"另一种属性"指得就是除了当前属性以外剩下的一种属性。
  
  | 内部特性\相关信息        | 定义                                                     | 默认值                                                                                             | 使用到该特性的属性类型 |
  | ---------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ----------- |
  | [[Configurable]] | 表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特 性，以及是否可以把它改为另一种属性。 | 1. 默认情况下，所有直接定义在对象上的属性的这个特性都是true。2. 使用Object.defineProperty()定义时未主动初始化该特性时，对象上的属性的这个特性都是false。 | 数据属性、访问器属性  |
  | [[Enumerable]]   | 表示属性是否可以通过 for-in 循环返回。                                | 1. 默认情况下，所有直接定义在对象上的属性的这个特性都是true。2. 使用Object.defineProperty()定义时未主动初始化该特性时，对象上的属性的这个特性都是false。 | 数据属性、访问器属性  |
  | [[Writable]]     | 表示属性的值是否可以被修改。                                         | 1. 默认情况下，所有直接定义在对象上的属性的这个特性都是true。2. 使用Object.defineProperty()定义时未主动初始化该特性时，对象上的属性的这个特性都是false。 | 数据属性        |
  | [[Value]]        | 包含属性实际的值。读取和写入属性值的位置。                                  | 默认值为 undefined                                                                                  | 数据属性        |
  | [[Get]]          | 获取函数，在读取属性时调用。                                         | 默认值为 undefined                                                                                  | 访问器属性       |
  | [[Set]]          | 设置函数，在写入属性时调用。                                         | 默认值为 undefined                                                                                  | 访问器属性       |

- 内部特性解释
  
  - 当[[Enumerable]]，为false时，打印对象和迭代对象是不能发现对象字段的。不过单独打印字段时是可以读取的。
    
    ```javascript
    let obj = new Object();
    Object.defineProperty(obj, 'name', {
        enumerable: true,
        value: "nameValue"
    })
    
    Object.defineProperty(obj, 'age', {
        value: 20
    })
    console.log(obj); // { name: 'nameValue' }
    console.log(obj.name); // nameValue
    console.log(obj.age); // 20
    ```

#### 属性类型

属性分两种：数据属性和访问器属性。

个人两者作用不同，数据属性主要直接用于数据的访问和修改。而访问器属性增加了一层处理层，可以自定义访问和修改的处理逻辑，觉得是对数据属性的扩展。

两个属性在声明和定义方面的区别

以字面量的方式定义属性时默认时数据属性，而访问器属性无法直接进行定义，必须通过一些方式(比如Object.defineProperty())进行单独的定义和处理。

##### 数据属性

数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。

由[[Configurable]]、[[Enumerable]]、[[Writable]]、[[Value]这四个内部特性来描述。

##### 访问器属性

访问器属性不包含数据值。相反，它们包含一个获取(getter)函数和一个设置(setter)函数，不过这两个函数不是必需的。

在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效的值。

在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。

由[[Configurable]]、[[Enumerable]]、[[Get]]、[[Set]这四个内部特性来描述。

### 对象操作总结

> 多采用到了内置对象Object提供的静态方法。
> 
> - [Object - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### 定义属性

- Object.defineProperty()
  
  > 通过多个描述符一次性定义单个属性。

- Object.defineProperties()
  
  > 通过多个描述符一次性定义多个属性。

#### 读取属性特性

- Object.getOwnPropertyDescriptor()
  
  > 取得指定属性的属性描述符。

- Object.getOwnPropertyDescriptors()
  
  > 取得指定实例的所有属性描述符作为对象返回。

#### 合并对象

- Object.assign()
  
  > 这个方法接收一个目标对象和一个 1 或多个源对象作为参数，
  > 
  > 然后将每个源对象中可枚举(Object.propertyIsEnumerable()返回 true)
  > 和自有(Object.hasOwnProperty()返回 true)属性复制到目标对象。以字符串和符号为键的属性会被复制。
  > 
  > 对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。
  
  > 备注
  > 
  > - 执行的是浅复制。
  > 
  > - 而且赋值期间出错，则操作会中止并退出，但是已经完成复制动作的属性是无法进行回滚的。

#### 对象标识及相等判定

- ==、===
  
  > 判断变量是否相同。
  > 
  > ===相对于==更加严苛，==存在自动转换类型的问题。

- Object.is()
  
  > 判断变量是否相同。使用更加严格的相等比较算法。
  > 
  > Object.is()和===的效果基本一致，但是改进===的一些边界(+0、-0、0、NaN)问题。
  > 
  > ```javascript
  > // ===
  > // -0、0、+0
  > console.log(-0 === +0) // true
  > console.log(-0 === 0) // true
  > console.log(+0 === 0) // true
  > 
  > // NaN
  > console.log(NaN === NaN) // false
  > 
  > // Object.is()
  > // -0、0、+0
  > console.log(Object.is(-0, +0)) // false
  > console.log(Object.is(-0, 0)) // false
  > console.log(Object.is(+0, 0)) // true
  > 
  > // NaN
  > console.log(Object.is(NaN, NaN)) // true
  > ```

#### 增强的对象语法

1. 属性名简写
   
   ```javascript
   let nameValue = 'nameValue';
   let person = {
       name // 替换 name: name
   }
   console.log(person); // { name: 'nameValue' }
   ```

2. 可计算属性
   
   ```javascript
   function createNameKey(key) {
       return `prefix_${key}`
   }
   let name = 'nameValue';
   
   let person = {
       [createNameKey('name')]: name // 替换 name: name
   }
   console.log(person); // { prefix_name: 'nameValue' }
   ```

3. 简写方法名
   
   > 简写方法名与可计算属性键相互兼容。
   
   ```javascript
   let methodKey = 'getName';
   let person = {
       [methodKey](name) {
           console.log(`function getName() ${name}`)
       } // 替换 getName(name): function(){} or getName(name) {} 
   }
   person.getName('nameValue'); // function getName() nameValue
   person[methodKey]('nameValue'); // function getName() nameValue
   ```

#### 对象解构

对象解构就是使用与对象匹配的结构来实现对象属性赋值。

解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中。

- 嵌套解构
  
  > 引用嵌套的属性或赋值目标没有限制，可以通过解构来复制对象属性。

- 部分解构
  
  > 结构时只获取一部分属性。

- 参数上下文匹配
  
  > 函数的入参也支持解构处理。

```javascript
// 综合实例
let person = {
    id: 1,
    name: 'nameValue',
    other: {
        age: 18
    }
}

function printInfo({ name: nameKey, other: other }) { // 参数上下文匹配 + 部分解构
    let tempPerson = {
        id: null,
        name: '',
        other: {
            age: 0 // 至少要有声明other层，否则嵌套解构会报错。
        } 
    };
    tempPerson.name = nameKey;
    ({ age: tempPerson.other.age } = other); // 嵌套结构

    return tempPerson;
}

console.log(printInfo(person)); // { id: null, name: 'nameValue', other: { age: 18 } }

// 参数上下文匹配 - 参数匹配传入进来的参数
// 部分解构 - 在参数上下文匹配的同时是显示了部分匹配的效果，不匹配id属性。
// 嵌套解构 - 嵌套匹配，赋值age到tempPerson对象上去
```

### 创建对象

- 基础创建方式
  
  - Object构造函数创建对象
  
  - 对象字面量方式创建对象

- 进阶需求
  
  创建具有同样接口的多个对象需要重复编写很多代码，需要避免便携过多代码，解决这个问题提供新的创建对象的方法。

#### 创建对象的需求总结

> JavaSricpt不是一个严格的面向对象编程(OOP)语言，想实现Java的面向对象编程(OOP)效果，需要做一些额外的处理才能实现。

> 对象创建过程中存在的问题的需求也不是一次发现的，在使用完善创建对象模式过程中逐渐增加的。

1. 使用一个对象模版创建多个类似的对象
2. 对象标识问题(新创建的对象是什么类型)
3. 避免重复创建公共的实例，构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。每个函数都是一个Function对象。
4. 需要有相同的作用域链和标识符解析。当同种对象的方法不是同一个实例，不是共享内存，那么作用域链和标识符解析也是不同的，以这种方式创建函数会带来不同的作用域链和标识符解析。所以这一点是对第3点的补充。
5. 提高编码维护和迭代要求。自定义类型引用的代码要能很好地聚集一起，便于迭代更新。
   1. 不要把过多的方法挂载到全局作用域。

#### 创建对象方式总结

> 常见创建方式
> 
> - Object构造函数创建对象
> 
> - 对象字面量方式创建对象

##### 工厂模式

> 解决了需求1

按照特定接口创建对象方式。调用工厂函数返回特定的对象实例。

```javascript
function createPersonFactory(personName, age) {
    let o = new Object();
    o.personName = personName;
    o.age = age;
    o.toString = function() {
        // overwrite toString
        return(`name: ${o.personName}, age: ${o.age}`);
    }
    return o;
}

let person = createPersonFactory('zhangsan', 20);
console.log(person.toString());
```

##### 构造函数模式

> 解决了需求1、2、5。还差2、4的共享属性等需求

可以使用new操作符使用构造函数创建对象。

###### new操作符执行流程

1. 在内存中创建一个新对象。

2. 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。

3. 构造函数内部的 this 被赋值为这个新对象(即 this 指向新对象)。

4. 执行构造函数内部的代码(给新对象添加属性)。

5. 如果构造函数返回非空对象，则返回该对象;否则，返回刚创建的新对象。

###### 构造函数和工厂函数构造区别

1. 没有显式地创建对象。

2. 属性和方法直接赋值给了 this。

3. 没有 return。

###### 重写new操作符

按照new操作符执行流程重写一次，熟悉具体步骤。

> - Object.create() 在原型基础上创建新原型对象，并设置原型继承关系。可以替换原有的1、2步骤。

```javascript
// 构造函数
function Person(personName, age) {
    this.personName = personName;
    this.age = age;
    this.toString = function() {
        // override toString
        return(`name: ${this.personName}, age: ${this.age}`);
    }
}

// 重写new操作符
function overrideNew(constructor, ...args) {
    // 1. 创建一个新对象
    let o = {};
    // 2. 新对象内部的[[Prototype]]特性被赋值为构造函数的prototype属性
    o.__proto__ = constructor.prototype;

    // 可替换步骤1、2
    // let o = Object.create(constructor.prototype);

    // 3. 构造函数内部的this被赋值为这个新对象(即this指向新对象)。
    const result = constructor.apply(o, args);

    // 4. 如果构造函数返回非空对象，则返回该对象。否则返回刚创建的新对象。
    return (typeof result == 'object' && result != null) ? result : o;
}

let person = new Person('zhangsan', 20);
let person2 = overrideNew(Person, 'zhangshi', 21);
console.log(person instanceof Person) // true
console.log(person2 instanceof Person) // true
```

##### 原型模式

基于构造函数，增加原型，使用原型特点补充了共享的需求。

在构造函数基础上对其关联原型进行设置，实现了共享属性的要求。

解决需求1、2、3、4、5。但是也出现了新的问题，关于共享数据的控制访问限制更加精细化的需求。

> - 需要通过Object.defineProperty()来定义constructor属性，需要制定设置内部特性让属性不可被迭代。

```javascript
// 构造函数
function Person(personName, age) {
    this.personName = personName;
    this.age = age;
}

// 设置原型的constructor属性，手动设置指向构造函数
Object.defineProperty(Person.prototype, "constructor", {
    // configurable: true, [待确认是否需要增加]
    enumerable: false,
    value: Person
})

// 设置原型的其他属性
Person.prototype = {
    infos: new Array(),
    toString: function() {
        // override toString
        return this;
    } 
}

let person = new Person('zhangsan', 20);
let person2 = new Person('zhangshi', 21);
console.log(person.toString()); // { personName: 'zhangsan', age: 20 }
console.log(person2.toString()); // { personName: 'zhangsan', age: 20 }

console.log(person2.infos); // []
person.infos.push(1);
console.log(person2.infos); // [1]

console.log(Object.entries(person)); // [ [ 'personName', 'zhangsan' ], [ 'age', 20 ] ]
console.log(Object.entries(person.__proto__)); // [ [ 'infos', [ 1 ] ], [ 'toString', [Function: toString] ] ]
```

#### 原型基础

##### 原型是什么

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。这个对象就是原型。

##### 原型依赖的基本规则

> 函数创建过程中产生原型，函数创建过程也是原型的产生过程。
> 
> 这里的 -> 统一表达的是指向关系，而非赋值关系。

1. 函数创建过程中会按照特定的规则为这个函数创建一个 prototype 属性。该属性指向原型对象。
2. 默认情况下，所有原型对象自动获得一个名为constructor的属性，指回与之关联的构造函数。

##### 原型依赖的基本规则总结

- 创建一个构造函数的过程，形成一个循环引用的关系。
  
  ```
  1. 构造函数.prototype -> 原型对象 
  2. 原型对象.constructor -> 构造函数
  
  总结
  构造函数.prototype.constructor -> 构造函数
  ```

- 实例对象与原型对象有直接关系，与构造函数无直接关系。
  
  > - [[Prototype]]是内部特性是一个指针，脚本中没有访问这个[[Prototype]]特性的标准方式。所以在每个对象上暴露了__proto__属性，来访问属性。
  
  ```
  1. 实例对象.[[Prototype]] -> 原型对象
  2. 实例对象.__proto__ -> 实例对象.[[Prototype]]
  3. 实例对象.__proto__ -> 原型对象
  4. 实例对象.__proto__ -> 构造函数.prototype 
  
  总结
  实例对象.__proto__ -> 构造函数.prototype
  ```

- 实例对象、构造函数、原型对象之前的实际关系总结
  
  > 以实例对象作为参考点来总结。
  
  ```
  实例对象 = new 构造函数
  实例对象.__proto__ -> 构造函数.prototype
  实例对象.__proto__ -> 原型对象
  ```

- 在自定义构造函数时，原型对象默认只会获得constructor属性，其他的所有方法都继承自Object。
  
  所以正常的原型链都会终止于 Object 的原型对象，而Object 原型的原型是 null。

##### 原型层级

原型因为继承关系存在一个原型层级的概念，是实例查找属性的基础。

- 按照原型链查找属性和方法
  
  1. 会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个 实例上发现了给定的名称，则返回该名称对应的值。
  2. 如果没有找到这个属性，则搜索会沿着指针进入原 型对象，然后在原型对象上找到属性后，再返回对应的值。

##### 原型特点补充

- 原型更新属性操作
   采用字面量对象一次性更新。
   直接Person.prototype 被设置为等于一个通过对象字面量创建的新对象
   更新constructor属性来指定构造函数时，采用Object.defineProperty()方式设置[[Enumerable]]为false。因为字面量的方式会导致[[Enumerable]]默认为true；

- 原型的动态性
   原型属性修改被所有实例共享。避免修改原型

- 原生原型支持更新属性。
   Array等是原生原型。
   不建议增加属性，避免为之后的属性遮蔽留下隐患。

- 继承原型的属性共享问题
   从原型继承属性共享性。
   实例对从原型继承原始属性可以采用通过在实例上添加同名属性来简单地遮蔽原型上的属性来处理。
   实例对从原型继承的引用属性修改，会导致被共享访问的问题。

##### 常用原型相关API总结

- 检查原型继承关系
  
  - Object.getPrototypeOf()
    
    返回的对象就是传入对象的原型对象

- 基于现有原型修改原型继承方式
  
  > (推荐2，避免1)
  
  1. Object.setPrototypeOf()
     修改现有的继承关系，会严重影响性能。
  2. Object.create()
     在现有原型上创建新的原型。所以传入的是原型对象。

- 由于原型链查找逻辑，会存在属性遮蔽(shadow)的情况
  
  - delete操作符
    
    可以通过delete操作符删除实例属性来处理。
  
  - 实例对象.hasOwnProperty()
    
    能够清楚地看到访问的是实例属性还是原型属性。true=实例、false=原型。

- 实例对象查询属性
  
  - Object.getOwnPropertyNames():
    
    列出所有实例属性，无论是否可以枚举。原型的属性不等于实例的属性，只是实例可以访问而已。
  
  - in 操作符会在可 以通过对象访问指定属性时返回 true
    
    在 for-in 循环中使用 in 操作符时，可以通过对象访问且可以被枚举的属性都会返回，包括实例 属性和原型属性。
    
    遮蔽原型中不可枚举([[Enumerable]]特性被设置为 false)属性的实例属性也会 在 for-in 循环中返回，因为默认情况下开发者定义的属性都是可枚举。
  
  - Object.values()
  
  - Object.entries()

### 继承

下面介绍的继承实现方式，是只使用 ECMAScript 5 的特性来模拟类似于类(class-like)的行为。为解决这些问题，ECMAScript 6 新引入的 class 关键字具有正式定义类的能力。

#### 继承类型

- 接口继承
  
  只继承方法签名。
  比如Java使用接口继承过程就是接口继承得到实现对象，实现对象进行方法实例的覆写，最后根据实现对象进行实例对象的创建。

- 方法继承
  
  继承具体的方法。
  因为JS函数没有签名，所以只能实现方法继承。主要依赖基础是原型链。

#### 继承方式

> 一共有6种，只有寄生式组合继承比较完善些。

##### 原型链

###### 基本思路

基于原型链的原理实现继承。
一个原型继承于另一个原型时，会通过另一个原型的实例对象作为媒介。

- 子类原型 = new 父类原型
- 子类构造函数.prototype = new 父类原型

目的是为了继承父类的属性和方法，还可以重写方法。注意要在指向父类原型实例完成后才能进行重写。

而父类实例通过[[portotype]]继续链接到它的父类原型。(之前有讲过实例和其原型有直接联系，[[prototype]]特性有指向关系，浏览器暴露了__proto__属性指向[[prototype]]特性)

###### 缺点

- 父类引用类型属性数据共享可修改问题。

- 子类型在实例化时不能给父类型的构造函数传参。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

// 构造函数SupType
function SupType() {
    this.infos = new Array('sup') 
}

// [重点] 构造函数SupType的原型 指向 对象实例SuperType 
SupType.prototype = new SuperType();

// 在指向完成后，重写构造函数SupType的原型方法getInfos
SupType.prototype.getInfos = function() {
    return this.infos;
}

// 测试
let supType = new SupType();
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // true
```

##### 盗用构造函数

这种技术有时也称作“对象伪装”或“经典继承”，为了解决原型包含引用值导致的继承问题。

###### 基本思路

在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，

所以可以使用 apply()和 call()方法以新创建的对象为上下文执行构造函数。

必须在调用父类构造函数之后才允许定义子类的属性，避免被父类属性覆盖。

###### 优点

- 可以在子类构造函数中向父类构造函数传参。
- 解决原型包含引用值导致的继承问题。

###### 缺点

- 也是使用构造函数模式自定义类型的问题:必须在构造函数中定义方法因此函数不能重用。
- 子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

// 构造函数SupType
function SupType() {

    // 盗类构造函数继承
    SuperType.call(this);
    // 子类属性必须在call之后定义
    this.infos = new Array('sup');
}

// 测试
let supType = new SupType();
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // false // 类型匹配失败了
```

##### 组合继承

有时候也叫伪经典继承，综合了原型链和盗用构造函数。

###### 基本思路

使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方 法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
效率问题就是父类构造函数始终会被调用两次:一次在是 创建子类原型时调用，另一次是在子类构造函数中调用。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

// 构造函数SupType
function SupType() { 
    // 盗类构造函数继承
    SuperType.call(this); // 第二次调用SuperType()
    // 子类属性必须在call之后定义
    this.infos = new Array('sup');
}

// 构造函数SupType的原型 指向 对象实例SuperType 
SupType.prototype = new SuperType(); // 第一次调用SuperType()

// 在指向完成后，重写构造函数SupType的原型方法getInfos
SupType.prototype.getInfos = function() {
    return this.infos;
}

// 测试
let supType = new SupType();
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // true
```

##### 原型式继承

###### 基本思路

我觉得和原型链几乎是一样。
不过将构造函数进行隐藏，然后父类不是构造函数，而是实例对象罢了。
对应的实现APIObject.create()
原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

function overrideObjectCreate(o) {
    // 构造函数SupType
    function SupType() { 
        // 子类属性必须在call之后定义
        this.infos = new Array('sup');
    }
    // 构造函数SupType的原型 指向 对象实例SuperType 
    SupType.prototype = o;

    // 在指向完成后，重写构造函数SupType的原型方法getInfos
    SupType.prototype.getInfos = function() {
        return this.infos;
    }

    return new SupType();
}

// 测试
let supType = new overrideObjectCreate(new SuperType());
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
// console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // true
```

##### 寄生式继承

###### 基本思路

寄生式继承背后的思路类似于寄生构造函数和工厂模式:创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
增加对象，然后返回增强的对象，称之为寄生。

寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式 继承所必需的，任何返回新对象的函数都可以在这里使用

寄生式和原型式的区别就是，没有使用到原型。然后对寄生对象进行了加工。核心逻辑真没有太大区别。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

function overrideObjectCreate(o) {
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    let clone = object(o);
    clone.getInfos = function() {
        return this.infos;
    }

    return clone;
}

// 测试
let supType = new overrideObjectCreate(new SuperType());
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
// console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // true
```

##### 寄生式组合继承

寄生式组合继承可以算是引用类型继承的最佳模式。盗用构造函数继承属性，但使用混合式原型链继承方法。

###### 基本思路

理想继承中，本质上，子类原型最终是要包含超类对象的所有实例属性，子类构造函数只要在执行时重写自己的原型就行了

基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本通过寄生的方式。避免第二次父类调用构造，而且。

1. 寄生式拷贝父类原型
2. 将返回的新对象赋值给子类原型
   通过寄生的方式拷贝父类原型，然后直接把新对象给子类，避免了调用父类构造函数。

###### 实现案例

```javascript
// 构造函数SuperType
function SuperType() {
    this.infos = new Array('super'),
    this.otherInfos = new Array('other infos'),
    this.getInfos = function() {
        return this.infos;
    },
    this.getOtherInfos = function() {
        return this.otherInfos;
    }
}

// 构造函数SupType
function SupType() { 
    // 盗类构造函数继承
    SuperType.call(this);
    // 子类属性必须在call之后定义
    this.infos = new Array('sup');
}

// 通过寄生的方式拷贝父类原型，然后直接把新对象给子类，避免了调用父类构造函数
function inheritPrototype(supType, superType) {
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }

    // 第一步是创建父类原型的一个副本
    let prototype = object(superType.prototype);
    // 给返回的 prototype 对象设置 constructor 属性，解决由于重写原型导致默认 constructor 丢失的问题。
    prototype.constructor = supType;
    // 最后将新创建的对象赋值给子类型的原型
    supType.prototype = prototype;
}

inheritPrototype(SupType, SuperType)

// 在指向完成后，重写构造函数SupType的原型方法getInfos
SupType.prototype.getInfos = function() {
    return this.infos;
}

// 测试
let supType = new SupType();
console.log(supType.getInfos()); // [ 'sup' ]
console.log(supType.getOtherInfos()) // [ 'other infos' ]
console.log(supType instanceof SupType); // true
console.log(supType instanceof SuperType); // true
```

### 类

class关键字
语法糖，正式定义类的能力。ES6引入。本质使用的还是原型和构造函数的概念。

#### 类定义

> 2种

```javascript
// 类声明
class Person {}
// 类表达式
const Person = class {}
```

##### 类特点

- 类的声明属于块作用域，不支持变量提升现象。

- ECMAScript 类就是一种特殊函数。类型属于函数。可以用typeof判断。 
  
  > 所以类也是 JavaScript 的一等公民，因此可以像其他对象或函数引用一样把类作为参数传递。

##### 类构成

>  支持空定义。默认情况下，类定义中的代码都在严格模式下执行。

- 构造方法(类构造函数) 
- 实例方法
- 获取函数
- 设置函数
- 静态类方法

#### 类构造函数

- 使用constructor 关键字用于在类定义块内部创建类的构造函数。
  
  > new操作符根据关键字constructor调用该函数。
  > 构造函数的定义不是必需的，不定义构造函 数相当于将构造函数定义为空函数。

- 构造函数与构造函数的主要区别
  
  - 调用类构造函数必须使用 new 操作符。调用类构造函数时如果 忘了使用 new 则会抛出错误。
  - 而普通构造函数如果 不使用 new 调用，那么就会以全局的 this(通常是 window)作为内部对象。

#### 实例、原型和类成员

###### 实例成员

- 可添加实例类型无限制。
- 在类构造函数内部，可以为新创建的实例(this) 添加“自有”属性。
- 在构造函数执行完毕后，仍然可以给 实例继续添加新实例成员。
- 每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享

###### 原型方法与访问器

###### 原型方法

- 为了在实例间共享方法，类定义语法把在类块中定义的方法叫原型方法
- 可以把方法定义在类构造函数中或者类块中，但不能在类块中给原型添加原始值或对象作为成员数据
- 类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键

###### 访问器

类定义也支持获取和设置访问器。语法与行为跟普通对象一样

- 在类块中获取和设置访问器set和get。

###### 静态类方法

static 关键字作为前缀，静态成员每个类上只能有一个。

- 可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例，与原型成员类似。
- 在静态成员中，this 引用类自身。其他所有约定跟原型成员一样
- 常作为实例工程

###### 非函数原型和类成员

- 虽然类定义并不显式支持在原型或类上添加成员数据，但在类定义外部，可以手动添加。

###### 迭代器与生成器方法

- 类定义语法支持在原型和类本身上定义生成器方法

#### 继承

ECMAScript 6 新增特性中最出色的一个就是原生支持了类继承机制。虽然类继承使用的是新语法，但背后依旧使用的是原型链。

##### extends关键字

- 实现单继承
  
  - 可以继承任何拥有[[Construct]]和原型的对象，也可以继承普通的构造函数(保持向后兼容)。
      派生类都会通过原型链访问到类和原型上定义的方法。this 的值会反映调用相应方法的实例或者类
  
  - extends关键字也可以在类表达式中使用
    super关键字
    
    > ES6给类构造函数和静态方法添加了内部特性[[HomeObject]]，这个特性是一个 指针，指向定义该方法的对象。这个指针是自动赋值的，而且只能在 JavaScript 引擎内部 访问。super 始终会定义为[[HomeObject]]的原型。

- 这个关键字只能在派生类中使用，而且仅 限于类构造函数、实例方法和静态方法内部。

- 派生类的方法可以通过 super 关键字引用它们的原型。

- 在类构造函数中使用 super 可以调用父类构造函数。
    调用 super()会调用父类构造函数，并将返回的实例赋值给 this。
    super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。

- 在静态方法中可以通过 super 调用继承的类上定义的静态方法

- 如果没有定义类构造函数，在实例化派生类时会调用 super()，而且会传入所有传给派生类的 参数。

- 在类构造函数中，不能在调用 super()之前引用 this。

- 如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回 一个对象。

##### 抽象基类

需要定义这样一个类，它可供其他类继承，但本身不会被实例化。

- ECMAScript 没 有专门支持这种类的语法 ，但通过 new.target 也很容易实现。
  new.target 保存通过 new 关键字调 用的类或函数。
  通过在实例化时检测 new.target 是不是抽象基类，可以阻止对抽象基类的实例化

- 通过在抽象基类构造函数中进行检查，可以要求派生类必须定义某个方法。
  因为原型方法在 调用类构造函数之前就已经存在了，所以可以通过 this 关键字来检查相应的方法

##### 继承内置类型

ES6 类为继承内置引用类型提供了顺畅的机制，开发者可以方便地扩展内置类型

如果想覆盖这个默认行为，则可以覆盖 Symbol.species 访问器，这个访问器决定在创建返回的 实例时使用的类。

##### 类混入

>  不建议使用，推荐组合而不是继承。

> 把不同类的行为集中到一个类是一种常见的 JavaScript 模式
> 虽然 ES6 没有显式支持多类继承，但 通过现有特性可以轻松地模拟这种行为。

- 混入模式可以通过在一个表达式中连缀多个混入元素来实现，这个表达式最终会解析为一个可以被 继承的类。

- 一个策略是定义一组“可嵌套”的函数，每个函数分别接收一个超类作为参数，而将混入类定义为
  这个参数的子类，并返回这个类。这些组合函数可以连缀调用，最终组合成超类表达式

##### 综合实例

```javascript
// 父类 + 抽象基类
class SuperType {
    constructor(info) {
        // 抽象基类检查
        if (new.target === SuperType) {
            throw new Error('Vehicle cannet be directly instantiated!')
        }

        this.infos = new Array();
        this.infos.push(info);
    }   
    getInfos() {
        return this.infos;
    }
    static getDate() {
        return new Date();
    }
}

class SupType extends SuperType {
    constructor(info) {
        super(info);
        this.flag = true;
    }
    getInfosMore() {
        return super.getInfos();
    }
    static getDateMore() {
        return super.getDate();
    }
}

const oSuper = new SuperType('object'); // Vehicle cannet be directly instantiated!

console.log(SupType.getDate())
console.log(SupType.getDateMore())
const o = new SupType('object');
console.log(o.getInfos())
console.log(o.getInfosMore())
```

## 第 10 章 - 函数
TODO

## 高频知识点
### IIFE(Immediately Invoked Function Expression)
- [理解JavaScript的立即调用函数表达式(IIFE)](https://nullcc.github.io/2017/05/08/%E7%90%86%E8%A7%A3JavaScript%E7%9A%84%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F(IIFE)/)

IIFE 本质上是使用了闭包的机制，可以创建具有私有变量和函数的模块化代码结构。

### addEventListener、removeEventListener 参数解析
- [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [addEventListener第三个参数作用](https://zhuanlan.zhihu.com/p/86337563)

该接口 removeEventListener() 的方法从目标 EventTarget 中删除先前注册的事件侦听器。

#### 参数解析
- 第三个参数
    - 通常是 options 或者 useCapture 都用于表示事件侦听器的特征。
    - 默认值 options: `{capture: false}`，useCapture: false。
    - false = 冒泡阶段、true = 捕获阶段，默认 false

### 事件委托
- [事件委托](https://tsejx.github.io/javascript-guidebook/document-object-model/events/event-delegation)
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

- 事件流分为捕获阶段和冒泡阶段。
- 事件委托就是在捕获阶段处理当前结点以下层级的事件。
```html
<body>
  <ul class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <!-- 还有很多 -->
  </ul>
  <script type="text/javascript">
    const list = document.querySelector('.list');

    list.addEventListener(
      'click',
      function(e) {
        let e = e || window.event;
        let target = e.target || e.srcElement;
        // 关键判断条件
        const index = [].indexOf.call(target.parentElement.children, target);

        console.log(index);
      },
      false
    );
  </script>
</body>
```