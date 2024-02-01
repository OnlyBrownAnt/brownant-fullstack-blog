# IDEA的奇淫技巧

## IDEA Docs

- [IDEA-getting-started](https://www.jetbrains.com/help/idea/getting-started.html)
- [mastering-keyboard-shortcuts](https://www.jetbrains.com/help/idea/mastering-keyboard-shortcuts.html)

## 设置IDEA启动命令

### Docs

- [Command-line interface](https://www.jetbrains.com/help/idea/working-with-the-ide-features-from-command-line.html)

### Review

1. 创建脚本

```shell
cd /usr/local/bin
touch idea
```

2. 写入脚本内容
   > 需要以root权限进行写入

```shell
sudo vim idea
```

```shell
#!/bin/sh
open -na "IntelliJ IDEA.app" --args "$@"
```

### Review-插件管理

1. 停用认为不必要的插件，包括额外的语言工程支持。需要的时候再启用。

### Review-IDEA常用快捷键

>
