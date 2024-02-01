# HomeBrow

## DOCS

- [HomeBrew](https://brew.sh/)
- [HomeBrew-Installation](https://docs.brew.sh/Installation)

### Review

### 安装Homebrew时报错Xcode-select

#### 报错信息

```shell
Xcode-select: error: invalid developer directory
‘/Library/Developer/CommandLineTools’
Failed during: /usr/bin/sudo /usr/bin/xcode-select –switch /Library/Developer/CommandLineTools
```

#### 问题分析

这个报错是因为下载或者安装xcode-select工具集失败。
下载Homebrew需要xcode-select工具集支持。MAC是不会内置该工具的，通常来说需要单独下载xcode-select工具集或者下载xcode APP(其中附带会下载xcode-select)。

按理来说，Homebrew的安装脚本应该会提供这个xcode-select这个工具的下载和提示安装处理。但是apple官方的xcode-select工具集单独下载地址经常会失败，导致出现这种问题。

#### 问题处理

1. 单独下载xcode-select工具集，并安装。
2. 修改Homebrew安装脚本。在已经下载Xcode的情况下，修改Homebrew脚本中的默认xcode-select工具集地址为已经安装的地址。
3. 相关命令

```shell
xcode-select -p # 查看安装地址
/Library/Developer/CommandLineTools # homebrew安装脚本中默认的xcode-select工具集目录
```

### Error: SHA256 mismatch?

#### info

brew更新或者安装dbeaver时报错。

#### 报错内容

```shell
➜  ~ brew uninstall dbeaver-community
Error: Cask 'dbeaver-community' is not installed.
➜  ~ brew install dbeaver-community
==> Downloading https://dbeaver.io/files/21.3.2/dbeaver-ce-21.3.2-macos-x86_64.dmg
==> Downloading from https://download.dbeaver.com/community/21.3.2/dbeaver-ce-21.3.2-macos-x86_64.dmg
######################################################################## 100.0%
Error: SHA256 mismatch
Expected: eb42fd96c8d013a9962464e481758868b03ad906d7a07d5d32c74f9f828804bb
  Actual: 8278253d121e1c74645ed302263dd340f61fadd075c9d676732c248b47011f26
    File: /Users/zhangyao/Library/Caches/Homebrew/downloads/0dd23c49ae5dcdd4661b576ce3ccd4d239957ebbbd85d419ed737cefb3136286--dbeaver-ce-21.3.2-macos-x86_64.dmg
To retry an incomplete download, remove the file above.
```

#### solution

```shell
# 将其中的hash修改为提示的实际值。
brew edit dbeaver-community
```

#### DOCS

- https://stackoverflow.com/questions/23273713/homebrew-in-os-x-10-9-2-error-sha256-mismatch
- https://xie.infoq.cn/article/0be96f1ceb496d252402c67c0
