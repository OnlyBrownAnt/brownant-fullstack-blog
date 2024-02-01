# 从0至1配置一台MAC(编程向)

## 动机

从大学到至今这七年间，使用过各类电脑，最终因为职业和个人喜好选择了MAC。如何让MAC使用得更加得心应手，是我这篇文章的主要目的。

### 使用过的电脑统计

```text
大一: HP proBook 445G2
大二: 华硕N550JK
大三: Surface Pro 2
大四: RedmiBook14 AMDR3500U、MacBook Pro 2012
工作一年: MacBook Pro 2015、MacBook Pro 2017
工作二年: MacBook Pro 2020 M1
至今: MacBook Pro 2021 M1 Pro
```

## 配置概览

- 用户数据
- 个性化系统设置
- 通用软件
- 扩展软件
- 媒体软件
- 编程软件
- 工作软件
- 开发环境搭建

## 配置详情

### 用户数据

- iCloud账号同步
  我使用的是Apple账号，只要登录后默认启动iCloud的同步，支持Apple原生APP，比如Apple Note等软件的数据同步。

### 个性化系统设置

> 无特殊说明，都是在System Settings APP中进行设置。
>
> “->” 指的是查看或者点击动作，从一个功能页面进入另外一个功能界面。

#### 通用

- 整体的图标大小设置为最小
  > Appearance -> Sidebar icon size = Small

#### 触控板

- 单指点按
  > Trackpad -> tap to click = on
- 跟踪速度70%(触控板鼠标更快移动):
  > Trackpad -> Trancking speed = 70%
- 启动三指拖移(三指拖移可以更方便复制文本内容，替代笨拙的按住触控板去复制)
  > Accessibillity -> Pointer Controd -> Trackpad Options -> Use Trackpad for dragging = ON
  >
  > Accessibillity -> Pointer Controd -> Trackpad Options -> Dragging Style = Three Finger Drag
- 打开App Expose(在能够通过手势的方式查看桌面已经打开的程序)
  > Trackpad -> More Gestures -> App Expose = Swipe Down with Four Fingers
- 切换Mission Control为四根手指(避免和三指拖移冲突)
  > Trackpad -> More Gestures -> Mission Control = Swipe Up with Four Fingers
- 切换Swipe Between full-screen applications为四根手指(避免和三指拖移冲突)
  > Trackpad -> More Gestures -> Swipe Between full-screen applications = Swipe Left Or Right with Four Fingers

#### 输入法

- 关闭自动纠正拼写
  > Keyboard -> Input Source -> Edit -> All Input Sources -> Correct spelling automatically = OFF
- 关闭自动首字母大写
  > Keyboard -> Input Source -> Edit -> All Input Sources -> Capitalize words automatically = OFF
- 关闭两下空格添加句号
  > Keyboard -> Input Source -> Edit -> All Input Sources -> Add period with double-space = OFF
- 切换中文输入法下的半角标点符号(全角符号=OFF、半角符号=ON，在进行中文写作时通常使用全角符号)
  > Keyboard -> Input Source -> Edit -> pingyin -> Use halfwidth punctuation = OFF/ON

#### 桌面和Dock栏

- 设置Dock的大小和APP动画效果
  > Desktop & Dock -> Dock -> Size = 20%
  >
  > Desktop & Dock -> Dock -> Magnification = 20%
- Dock设置成默认隐藏(能够省出更多桌面空间)
  > Desktop & Dock -> Dock -> Automatically hide and show the Dock = OFF
- 不显示最近使用的APP在Dock
  > Desktop & Dock -> Dock -> DockShow recent applications in Dock = OFF
- 关闭根据最近使用情况自动排序空间(不喜欢窗口布局老是自动变化)
  > Desktop & Dock -> Mission Control -> Automatically rearrange Spaces based on most recent use = OFF
- 设置热区触发动作
  > esktop & Dock -> Mission Control -> Hot Corners = 允许设置鼠标移动到四个边角时触发打开的APP

#### 控制中心

- 在菜单栏中原有的图标中除了显示控制中心、电池，其他的全部设置不显示(Don’t Show in Menu Bar)。(因为平常不会频繁查看，可以在控制中心中存在使用入口就够了)
- 菜单栏电池打开百分比设置
  > Control Center -> Other Modules -> Battery -> Show Percentage = ON
- 菜单栏时钟打开秒数显示
  > Control Center -> Menu Bar Only -> Clock -> Clock Options -> Display the time with seconds = ON
- 菜单栏时钟允许时间间隔符号闪烁
  > Control Center -> Menu Bar Only -> Clock -> Clock Options -> Flash the time separators = ON

#### 终端配置

> Terminal APP

- 默认配置文件(/bin/zsh)
  > .zprofile
- HomeBrew 光标类型选择竖条
  > settings -> Profiles -> HomeBrew -> Cursor -> | Vertical Bar = ON
- 字体
  > Courier New 12
- 透明度
  > settings -> Profiles -> HomeBrew -> Background -> Opacity = 25%
  > ￼

### 通用软件

- 笔记: Apple Notes
- 图书: Apple Books
- 通讯: Apple Mail、微信、QQ
- 浏览器: Chrome
- 文档: Microsoft Excel、Microsoft Word、Microsoft PPT、Xmind

### 扩展软件

- 自动化工具: HammerSpoon
- 词典: Dudic
- FQ: ClashX
- 第三方管理工具: CleanMyMacX

### 媒体软件

- 影音: Final Cut Pro
- 图片: PhotoShop

### 编程软件

- 基础工具: HomeBrew、ohmyzsh
- 容器工具: Docker
- 数据库: DBeaver
- 终端工具: Apple Terminal
- API调试工具: Postman
- 开发工具: IDEA、VSCode、Xcode
- IOS开发相关工具: Developer、TestFlight、Transports

### 工作软件

- 通讯: 企业微信
- 会议: 腾讯会议

### 开发环境搭建

> $HOME代指用户主目录.

#### java

> 使用brew进行安装，如果安装特殊版本可以手动指定版本。

- [temurin-installation](https://adoptium.net/zh-CN/installation/)

1. 安装

```shell
brew install —casek temurin
```

2.环境配置

```shell
# JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-8.jdk/Contents/Home
# JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-11.jdk/Contents/Home
JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-20.jdk/Contents/Home
export PATH=$PATH:$JAVA_HOME
```

#### maven

1. 下载安装包到指定目录
2. 配置环境变量

```shell
export M2_HOME=$HOME/Library/apache-maven-3.6.3
export PATH=$PATH:$M2_HOME/bin
```

#### python

1. 安装

```shell
brew install python@10
```

#### node

> 使用nvm安装和管理

1. 安装nvm

```shell
brew install nvm
```

#### jmiter

1. 下载安装包到指定目录
2. 配置环境变量

```shell
# jmeter
JMETER_HOME=“$HOME/Library/apache-jmeter-5.5"
export PATH="$JMETER_HOME/bin:$PATH"
```

#### ffmpeg

1. 下载安装包到指定目录
2. 配置命令

```shell
alias ffmpeg="$HOME/Library/ffmpeg/ffmpeg"
```

#### 待定

减少动画效果

- Settings -> Accessibility -> Display -> Reduce motion = ON

关闭自动排列窗口(已经存在)

- Settings -> Desktop & Dock -> Mession Control -> Automatically rearrange Spaces based on most recent use = OFF

Fleet Persion style
字体 大小 字间距
Courier New 12
12
1.2

VIM Mode = ON
