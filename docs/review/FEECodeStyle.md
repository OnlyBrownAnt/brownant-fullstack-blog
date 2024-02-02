# 前端工程化 - 编码风格

## 编码规范需求解析

### 基本流程

1. 文件编码配置
2. 格式化功能
3. 错误检查和修复功能

### 基本流程总结

- 文件编码配置使用 editorConfig
  > editorConfig、prettier 都有文件编码相关的配置，不过 editorConfig 是作为统一的基本配置文件被开发工具处理。所以相对于 prettier 优先级更高。
- 格式化功能使用 prettier
  > prettier 主要处理各种文件的格式化，但是通常会与 eslint 规则出现冲突。
- 错误检查和修复功能 eslint
  > eslint 主要是对前端相关的 ECMAScript/JavaScript 代码进行语法和规则的检查和修复。
- 编码规范流程相关工具的处理优先级
  > editorConfig > prettier > eslint

### 编码风格(个人偏好)

- 字符集编码(charset)
  - utf-8
- 制表符类型(indent_style)
  - 空格
- 缩进宽度(indent_size)
  - 默认(各类配置文件、md 文件、后端代码、json) = 4
  - 前端代码 = 2
    - js,jsx,ts,tsx,vue,html,css,less,sass
- 字符引号
  - 双引号(后端代码、前端代码保持一致)
- 换行符的表示方式(end_of_line)
  - lf
- 其他的规范
  - 使用 pretter 的默认配置

## editorConfig

EditorConfig 项目由用于定义编码样式的文件格式和文本编辑器插件集合组成，这些插件使编辑器能够读取文件格式并遵守定义的样式。

### Docs

- [editorconfig](https://editorconfig.org/)
- [wiki/EditorConfig-Properties](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)
  > complete list of properties

### 特点总结

- 支持不同文件设置编码规范：让编辑器或开发工具对不同文件设置不同的编码规范。
- 优先级比较高：可以覆盖编辑器或开发工具的默认配置。
- 局限性：主要只能使用字符集类型、制表符、缩近宽度、换行符等较为基础的配置项。

### 常用配置项

```
indent_style：设置为tab或space分别使用硬制表符或软制表符。
indent_size：一个整数，定义用于每个缩进级别的列数和软选项卡的宽度（如果支持）。当设置为tabtab_width时，将使用 的值（如果指定）。
tab_width：定义用于表示制表符的列数的整数。该值默认为 的值indent_size并且通常不需要指定。
end_of_line：设置为lf、cr或crlf以控制换行符的表示方式。
charset：设置为latin1、utf-8、utf-8-bom、utf-16be或utf-16le来控制字符集。
trim_trailing_whitespace：设置为true以删除换行符之前的所有空白字符，设置为false以确保不会删除换行符。
insert_final_newline：设置为true以确保文件在保存时以换行符结尾，设置为false以确保文件不以换行符结尾。
root：应在文件顶部任何部分之外指定的特殊属性。设置为true以停止.editorconfig对当前文件的文件搜索。
```

### 推荐配置(个人偏好)

```title=".editorconfig"
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
# default charset
charset = utf-8
# default space indentation
indent_style = space
indent_size = 4

# Matches multiple files with brace expansion notation
# 2 space indentation
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2

[*.{css,less,sass}]
indent_style = space
indent_size = 2

[*.html]
indent_style = space
indent_size = 2

[*.md]
indent_style = space
indent_size = 2

[*.json]
indent_style = space
indent_size = 2
```

## Prettier

一个代码格式化程序，主要支持前端技术栈相关类型的文件。

### Docs

- [prettier](https://prettier.io/)
- [prettier/install](https://prettier.io/docs/en/install)
- [prettier/options](https://prettier.io/docs/en/options)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#eslint-config-prettier)
  > 处理 prettier 和 eslint 之间的规则 rules 冲突，以 prettier 规则为高优先级。

### 特点总结

- 默认优先使用 editorconfig 的规则：editorconfig 相关规则会以高优先级被 prettier 处理。
- prettier 会存在与 eslint 配置冲突的可能：需要在 eslint 配置中设置 `prettier` 插件和配置 rules 来解决冲突，通过 prettier 优先级高于 eslint。
- 支持 prettier 忽略处理目录或者文件配置：`.prettierignore`，默认会忽略处理版本控制系统目录(`.git`, `.sl`, `.svn` and `.hg`) 和 `node_modules`，也遵循 `.gitignore` 中的规则。
- 不同小版本 prettier 之间也可能有差异：安装依赖时使用 `--save-exact`
- pre-commit hook：支持与 git 流程集成进行预先处理，对 git 暂存区文件进行格式化处理。通常需要依赖库 `husky` 和 `​lint-staged`。

### 推荐配置(个人偏好)

#### Prettier 配置

```shell
## 安装相关依赖
# install prettier
npm install --save-dev --save-exact prettier

# 检查是否格式化 - 指定目录下的文件
prettier --check .
# 格式化 - 指定目录下的文件
prettier --write .
```

```json title=".prettierrc"
{}
```

```title=".prettierignore"
# Ignore artifacts:
# Webpack Project Demo
public
```

```json title="vscode-setting.json"
{
  // VSCode 配置默认格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

#### Prettier 与 ESLint 相关配置

主要是配置 eslint 的插件 eslint-config-prettier

```shell
# install eslint-config-prettier
npm install --save-dev eslint-config-prettier

# 帮助检查配置是否包含任何不必要或与 Prettier 冲突的规则，支持多文件检查
npx eslint-config-prettier file1 file2 ...
```

```javascript title=".eslintrc"
module.exports = {
  // ...
  extends: [
    "some-other-config-you-use"
    "prettier", // 最后一个，用于覆盖其他插件规则
  ],
  rules: {}, // 通常会修改 eslint rules 中的规则，来避免与 prettier 的冲突。
  // ...
};
```

```
Exit codes
  0: No problems found.
  1: Unexpected error.
  2: Conflicting rules found.
```

## ESLint

ESLint 是一种用于识别和报告在 ECMAScript/JavaScript 代码中发现的模式的工具，目的是使代码更加一致并避免错误。

简单而言 ESLint 是一种偏向于 ECMAScript/JavaScript 代码的代码规则检查工具。

### Docs

- [ESLint/getting-started](https://eslint.org/docs/latest/use/getting-started)
- [ESLint/language-options](https://eslint.org/docs/latest/use/configure/language-options)
- [ESLint/rules](https://eslint.org/docs/latest/rules/)
- [vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### 特点总结

- 编码规范流程中优先级最低：部分规则(换行符方式、缩紧空格等)优先级最低，需要先让 editorconfig 和 prettier 处理。
- 支持规则、插件、解析器：支持配置，也支持自定义。
- 格式化功能较弱：通常使用 prettier 来替代起格式化功能。

### 推荐配置(个人偏好)

```shell
# install eslint
npm install --save-dev eslint

# 初始化 ESLint 配置文件 .eslintrc
npx eslint --init

# 使用 ESLint 检查文件夹内文件/文件代码
npx eslint projectDir/file1.js

# 使用 ESLint 修复文件夹内文件/文件代码
npx eslint --fix projectDir/file1.js
```

```javascript title=".eslintrc"
// npx eslint --init 初始化配置，React + TS

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier", // eslint-config-prettier
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {},
};
```

## 常见问题集

### Require statement not part of import statement.(@typescript-eslint/no-var-requires)

- [no-var-requires](https://typescript-eslint.io/rules/no-var-requires/)
  webpack 配置文件中有部分通过 require 的方式引入依赖，出现报错。

分析
在 typescript-eslint 插件配置后，默认会对 require 引入依赖包方式进行检查报错。通过设置局部性的忽略即可解决，不需要全局屏蔽。

```js
/* eslint-disable @typescript-eslint/no-var-requires */
```
