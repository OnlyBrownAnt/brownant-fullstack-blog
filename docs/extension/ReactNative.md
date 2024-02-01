# React Native体验

## Docs

- [react-native-home](https://reactnative.dev/)
- [react-native-environment-setup](https://reactnative.dev/docs/environment-setup)
- [metro](https://facebook.github.io/metro/)
- [react-native-components-and-apis](https://reactnative.dev/docs/components-and-apis)

## Expo Go 和 React Native CLI区别

> From ChatGpt3.5
> Expo Go 和 React Native CLI 是用于开发 React Native 应用程序的两种不同的工具和方法。

Expo Go:
Expo 是一个开源的框架和平台，旨在简化和加速 React Native 应用程序的开发过程。Expo Go 是 Expo 提供的一款移动应用程序，可以在手机上运行开发人员使用 Expo 构建的应用程序。使用 Expo，你可以使用 JavaScript 和 React 组件开发应用程序，而无需进行原生代码的编写和设置。Expo 平台提供了许多内置的功能和 API，如图像加载、Push 通知、地理位置等，以便开发者快速构建应用程序并进行测试。但需要注意的是，使用 Expo 进行开发可能会有一些限制，因为你无法直接修改和访问原生代码。

React Native CLI:
React Native CLI 是基于命令行的工具，它允许你使用原生代码（Java 或 Kotlin for Android，Objective-C 或 Swift for iOS）与 JavaScript 一起开发 React Native 应用程序。使用 React Native CLI，你可以创建全新的 React Native 项目，并有完全的访问权限来修改和配置原生代码。这使得你能够更深入地定制应用程序，并利用原生功能和第三方库。但与此同时，使用 React Native CLI 进行开发可能需要更多的配置和设置，并且对原生开发的要求也更高。

总结来说，Expo Go 提供了一种简化的开发体验，适用于快速原型开发和构建简单应用程序。React Native CLI 则更适合对原生代码有更高定制需求的开发者，以及需要使用原生功能和第三方库的项目。选择使用哪种方法取决于你的项目需求和对原生开发的要求。

## IOS 配置React Native开发环境(react-native-cli)

### Docs

- [rbenv-github](https://github.com/rbenv/rbenv)
- [install the latest ruby version on M1/M1 Pro](https://antran.app/2021/m1_mac_part2/)

### Command

```shell
# node 使用nvm管理
# brew install node
brew install watchman
sudo gem install cocoapods

# Install rbenv
brew install rbenv
# Initialise rbenv
rbenv init
rbenv install -l
rbenv install 3.2.2
rbenv global 3.2.2
# rbenv config in .zprofile or .zshrc
eval "$(rbenv init - zsh)"

npx react-native@latest init AwesomeProject
```

### Riva-Animated-App工程解析

1. 依赖包-功能
   > Install通常有两个步骤 1. npm install. 2. cd ios && pod install

- react-native-reanimated

```text
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
```

- styled-components

```text
- [styled-components](https://styled-components.com/docs/basics#motivation)
```

- rive-react-native

```text
- [rive-react-native](https://help.rive.app/runtimes/overview/react-native)
- [loading-in-rive-files](https://help.rive.app/runtimes/overview/react-native/loading-in-rive-files)
// 版本为6.0.4的情况下，会出现pod install报错的情况。
// 目前测试2.1.37版本可以正常
```

- react-native-linear-gradient

```text
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
```

2. 依赖包-TypeScript相关

- @types/react-native
- @types/styled-components-react-native

3. 基础设置

- 字体

```text
1. expo go工程
// expo-font库
API useFont()

2. React Native CLI工程
// iOS 工程中直接导入字体。
// 通过react-native库的StyleSheet的fontFmaily就可以使用。
- [adding_a_custom_font_to_your_app](https://developer.apple.com/documentation/uikit/text_display_and_fonts/adding_a_custom_font_to_your_app/)
```

4. React Native框架插件、工具集成

- editorconfig

```text
# .editorconfig

# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
charset = utf-8
end_of_line = lf
; indent_style = space
; indent_size = 2
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,tsx,vue,json}]
indent_style = space
indent_size = 2

[*.md]
indent_style = space
indent_size = 4
```

- eslint

```text
- [Configure Rules](https://eslint.org/docs/latest/use/configure/rules)
- [Rules Reference](https://eslint.org/docs/latest/rules/)
- Install VS Code ESLint extension
```

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: "@react-native",
  rules: {},
};
```

- prettier

```text
- [Options](https://prettier.io/docs/en/options)
- Install Prettier Formatter for Visual Studio Code
```

```javascript
// .prettierrc.js
module.exports = {
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: "all",
};
```

### 优质博客

- [没 2 年 React Native 开发经验，你都遇不到这些坑](https://cloud.tencent.com/developer/article/1883782)
- [swiftui-rive-animated-app](https://designcode.io/swiftui-rive-animated-app)

### 常用库

- react
- react-native
- react-native-reanimated
- styled-components/native
- rive-react-native

### Reviews

#### Watchman crawl failed

metro-file-map: Watchman crawl failed. Retrying once with node crawler.
Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
Error: Watchman error: std::\_\_1::system_error: open: /Users/yaozhang/Desktop/AwesomeProject: Operation not permitted. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.
node:events:491
throw er; // Unhandled 'error' event

- [Watchman crawl failed. Retrying once with node crawler](https://stackoverflow.com/questions/49443341/watchman-crawl-failed-retrying-once-with-node-crawler)

Mac解决方案

```shell
watchman watch-del-all
watchman shutdown-server
```
