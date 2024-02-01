# Promise

> ECMAScript6新增了正式的 Promise(期约)引用类型，支持优雅地定义和组织异步逻辑。

## 目录

[[toc]]

## 文档

[《JavaScript高级程序设计(4)》P323-P347](https://brownant.top)

## Promise连锁

期约连锁就是一个期约接一个期约地拼接。

每个期约实例的方法(then()、catch()和 finally())都会返回一个新的期约对象，而这个新期约又有自己的实例方法。这样连缀方法调用就可以构成所谓的"期约连锁"。

## Promise合成

期约合成将多个期约组合为一个期约。

> Promise合成有all()和race()两种方式

### Promise.all()

#### 总结

静态方法。传入一组Promise，等全部处理完后返回一个Promise。

这组Promise中如果有一个reject则all最终返回reject，这组Promise中如果全部resolve则all最终返回resolve

resolve时返回的结果数组，其item顺序按照传入的Promise顺序排序。

#### 示例

```js
function promise(index, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ index: index });
    }, time);
  });
}

let all = Promise.all([
  promise(1, 3000),
  promise(2, 2000),
  promise(3, 1000),
  promise(4, 4000),
  promise(5, 3000),
  promise(6, 1000),
  promise(7, 3000),
]);

all.then((r) => {
  console.log(JSON.stringify(r)); // [{"index":1},{"index":2},{"index":3},{"index":4},{"index":5},{"index":6},{"index":7}]
});
```

### Promise.race()

#### 总结

静态方法。传入一组Promise，等全部处理完后返回一个Promise。

这组Promise中如果有一个promise返回结果，则all将其结果作为最终结果返回。

#### 示例

```js
function promise(index, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ index: index });
    }, time);
  });
}

let all = Promise.race([
  promise(1, 3000),
  promise(2, 2000),
  promise(3, 1000),
  promise(4, 4000),
  promise(5, 3000),
  promise(6, 1000),
  promise(7, 3000),
]);

all.then((r) => {
  console.log(JSON.stringify(r)); // {"index":3}
});
```

## 异步函数

ES8的async/await旨在解决利用异步结构组织代码的问题。为此，ECMAScript对函数进行了扩展，为其增加了两个新关键字: async和await。
相对于Promise，async和await侧重定义了异步函数的机制。

### async

async关键字用于声明异步函数。这个关键字可以用在函数声明、函数表达式、箭头函数和方法。

#### 常见问题-1

async定义的代码有异步机制特性，但是代码依旧是同步执行的。如果最后未定义return，那么就会返回undifine。

- 示例

```js
// async
async function asyncDemo(testType) {
  let result = "";
  if (testType === 1) {
    setTimeout(() => {
      return "yes";
    }, 2000);
  } else if (testType === 2) {
    await promiseDemo().then((r) => {
      result = r;
    });
    return Promise.resolve(result); // return Promise.resolve(result) = return result
  } else if (testType === 3) {
    return "yes";
  }
}
// promise
function promiseDemo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("yes");
    }, 2000);
  });
}

// func test
async function demo() {
  await asyncDemo(1).then((r) => {
    console.log(`then ${r}`); // then undefined
  });

  await asyncDemo(2).then((r) => {
    console.log(`then ${r}`); // then yes
  });

  await asyncDemo(3).then((r) => {
    console.log(`then ${r}`); // then yes
  });
}

demo();
```

#### 常见问题-2

在函数中通过return返回时，会被Promise.resolve()包装成一个期约对象并返回，并可以由then进行解包。但是如果在函数内单独的使用Promise.resolve()会then处理，但是无法正确获取到返回值。需要在return时使用Promise.resolve()才能顺利正常被then处理。而如果在函数内单独的使用Promise.reject()，是无法被catch捕获的，需要在return时使用Promise.reject()才能顺利被catch处理。

### await

提供对异步函数的暂停和恢复能力。

await关键字会暂停执行异步函数后面的代码，让出JavaScript运行时的执行线程。这个行 为与生成器函数中的 yield 关键字是一样的。await 关键字同样是尝试“解包”对象的值，然后将这个值传给表达式，再异步恢复异步函数的执行。

#### 常见问题-1

在使用await获取异步函数的返回时，如果存在then、catch，就会优先在then、catch中处理数据，然后结束。

- 示例

```js
// async demo
async function asyncDemo(testType) {
  let result = "";
  if (testType === 1) {
    setTimeout(() => {
      return "yes";
    }, 2000);
  } else if (testType === 2) {
    await promiseDemo().then((r) => {
      result = r;
    });
    return Promise.resolve(result); // return Promise.resolve(result) = return result
  } else if (testType === 3) {
    return "yes";
  } else if (testType === 4) {
    await promiseDemo().then((r) => {
      result = r;
    });
    return Promise.reject(result);
  }
}

// promise demo
function promiseDemo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("yes");
    }, 2000);
  });
}

// func test
async function demo() {
  let data = await asyncDemo(2).then((r) => {
    console.log(`then ${r}`); // then yes
  });
  console.log(`data ${data}`); // data undefined

  let data2 = await asyncDemo(2);
  console.log(`data2 ${data2}`); // data yes
}

demo();
```

## 兼容处理

### bluebird.js

#### 文档

[博客](https://blog.csdn.net/QQ_Empire/article/details/82729306)
ES6 Promise不支持IE，如果想要在IE上兼容，需要安装插件bluebird.js。
