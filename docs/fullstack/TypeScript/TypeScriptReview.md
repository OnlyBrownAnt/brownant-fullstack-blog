# TypeScript 总结

## Docs
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## TypeScript Quick Start
> first, create npm package project
1. npm install typescript
2. create tsconfig.json
3. add script in package.json
4. ts code example


## 常见问题
### ReferenceError: exports is not defined in ES module scope
```
// Error Log
Object.defineProperty(exports, "__esModule", { value: true });
                      ^

ReferenceError: exports is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/Users/yaozhang/Desktop/vite-demo/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
```

主要是由于package的module配置和TS的module配置冲突导致，修改TS的配置为es6版本，屏蔽TS的module配置即可。
- [ReferenceError：TypeScript 中未定义导出 [已修复]](https://bobbyhadz.com/blog/typescript-uncaught-referenceerror-exports-is-not-defined)

### Typescript Duplicate Function Implementation 
两个TS文件出现了同一个函数，被认为是重复。
1. TS文件声明export {}，解决重复问题
- [Typescript Duplicate Function Implementation(stackoverflow)](https://stackoverflow.com/questions/39689763/typescript-duplicate-function-implementation)