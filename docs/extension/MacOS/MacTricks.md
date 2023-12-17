# MAC的奇淫技巧
> 记录一些MAC上的技巧，帮助更有效的去使用MAC更顺畅以及提高自己的生产力。

## Apple Notes App
### 模版
> 笔记最后都需要移植到md文档进行网站发布，所以最好按照md文档格式进行书写笔记。

### Review
#### 常用快捷键
Command-T 标题
Command-H 小标题 
Command-B 副标题
Command-Shift-C 打开显示颜色/关闭显示颜色(可以对选择文本进行调色)
Control-Command-空格 图标/表情选择

### 文本缩进问题
在mac中没有代码块支持，有时候遇到大段文字或者代码进行缩进时无法像文稿一样选中然后使用tab键就能进行批量缩进。所以在备忘录中有一个单独的快捷键，command-[或者command-]进行向左向右的批量缩进。

单行缩进使用tab键，多行缩进使用快捷键command-[或者command-]

### 附件修改保存注意
在备忘录里保存markdown文件。使用typora修改然后保存并生成本地文件，再继续修改的就是保存的本地文件，而不是备忘录里的在线文件。建议保存后，想再次修改请关闭再从备忘录中进行打开markdown文件。且等待备忘录上传完毕再删除本地文件。

### 引号符号和破折号自动转换为样式
(取消勾选)	设置->键盘->文本->"使用智能引号和破折号" 

### 首字母大写问题
(取消勾选)	设置->键盘->文本->"自动大写字词的首字母" 

### 小标题突出显示技巧
> 因为默认的三级标题(标题、小标题、副标题)其实基本能满足使用，但是最后一级副标题往往不太明显，可以添加其他效果便于区分。
- 颜色突出(推荐，默认绿色即可，红色可以区分比较特别的内容。)
- 下横线
- 斜体

### 善用注释标志来进行标注
比如使用TODO或者FIXME, 这样可以进行全局搜索定位需要解决的问题, 并且可以进行灵活备注.

### 使用颜色来进行标注
绿色=一级标题
青色=二级标题
红色=提示和备注

## 快捷键
### DOCS
- [Mac 键盘快捷键](https://support.apple.com/zh-cn/HT201236)
- [写给所有 Mac 用户的摸鱼指北-少数派](https://sspai.com/post/75805)
### 快捷键符号介绍
![command](/img/docs/macos/command.png "command")
### 常用快捷键
#### 通用
- Command-S 保存
- Command-C 复制
- Command-V 粘贴
- Command-Z 撤销
- Command-W 关闭当前页面
- Command-Q 退出当前程序, 不留后台
- Command-M 当前程序最小化到dock栏上
- Command-G 打开新标签页
- Control-Command-F 程序全屏显示
- Control-Command-空格 显示字符检视器可以选取符号或者标签
- Control-左/右方向键 切换桌面
- Command-Shift-A 自动填充
- Command-Shift-3 全屏截图
- Command-Shift-4 局部截图
- Command-空格 打开访达搜索
- Command-· 同应用不同窗口切换
#### 访达
- Command-Delete 将所选项移到废纸篓
- Shift-Command-Delete 清倒废纸篓
- Command-Shift-. 查看隐藏文件

#### 备忘录
Command-[ 向左缩进
Command-] 向右缩进

## 解压缩
> MAC上自带的压缩软件只能处理ZIP类型，不能很好的处理RAR类型。可以通过命令工具rar比较快速的处理RAR压缩包。
### zip
> MAC自带zip命令工具
2. 使用
```shell
# 压缩
zip -r file.zip targetFile # 将 targetFile 压缩到 file.zip

# 解压
unzip file.zip
```

### rar
1. 安装
```shell
brew install --cask rar
```
2. 使用
```shell
# 压缩
rar a file.rar targetFile # 将 targetFile 压缩到 file.rar

# 查看
unrar l file.rar 

# 解压
unrar x file.rar
```

## 挂载NTFS类型硬盘/U盘
> MAC是支持挂载FAT32、NTFS硬盘的。但是对于NTFS硬盘内容文件是没有修改权限的。所以需要进行额外的挂载处理来保证有权限读取和修改NTFS硬盘权限。
>
> 可惜的是，大部分的NTFS挂载软件都要钱，所以我找了很久，找到一个命令工具可以很好的支持挂载NTFS硬盘。在ntfs-3g-mac库的支持下通过命令行方式挂载。

#### DOCS
- [install-ntfs-3g-on-m1-mac](https://www.iloveanan.com/install-ntfs-3g-on-m1-mac.html)

#### 具体操作
1. 安装ntfs-3g-mac
```shell
git clone git@github.com:gromgit/homebrew-fuse.git /opt/homebrew/Library/Taps/gromgit/homebrew-fuse --origin=origin --template=

brew install ntfs-3g-mac
```
2. 重新挂载NTFS盘
    > 假设需要挂载的盘的IDENTIFIER是disk5、disk5s1。
    1. 检查盘信息
    ```shell
    diskutil list

    # 输出案例
    # /dev/disk5 (external, physical):
   	# #:                       TYPE NAME                    SIZE       # # # IDENTIFIER
  	# 0:      GUID_partition_scheme                        *4.0 TB     disk5
  	# 1:       Microsoft Basic Data Elements                4.0 TB     disk5s1
    ```
    2. 卸载盘
    ```shell
    # 在步骤1中知道，需要挂载的盘的IDENTIFIER是disk5、disk5s1。所以需要先把disk5卸载
    sudo diskutil unmountDisk /dev/disk5 
    ```
    3. 通过ntfs-3g-mac重新挂载
    ```shell
    # 重新挂载disk5、挂载目录是/Volumes/Elements
    sudo mount_ntfs /dev/disk5s1 /Volumes/Elements
    ```

## 台前调度(Stage Mananer)
### 设置桌面文件始终显示
> Desktop & Dock -> Stage Mananer Settings -> custmize

### 设置程序从台前调度打开时居中显示屏显示
> Desktop & Dock -> Stage Mananer Settings -> custmize -> One At a Time

### 台前调度显示的程序数量
默认显示最近使用的4个程序或者合并的程序(根据分辨率自适应设置的，13.3是4个)。

台前调度的使用技巧
首先需要了解一个与台前调度比较类似的功能。调度中心(mission control)，调度中心提供一个多窗口的功能，我们可以新建多个桌面，然后在桌面上放置不同的程序。可以使用control + 方向键快捷切换窗口。
台前调度和这个多窗口有相似性，但我理解台前调度应该是多窗口功能的补充功能。之前程序最小化时，会显示在dock上，但是仅此而已。
而现在，在一个桌面上，将之前的程序最小化时的交互和显示效果进行了改造，并且增加了一个桌面下的多程序合并功能，在最小化时合并状态依旧保存着。因为这个合并的功能，看起来和多窗口功能有重叠性。但是在我看来，这个功能其实是增加了多窗口的使用颗粒性。在一个窗口实现的更小颗粒性的多窗口功能。

类似于在现有的一级目录下，增加了二级目录。增强了对单窗口的程序管理能力。很棒的功能

## QuickTime APP
### 加速播放
找到键盘的option键，按住不放，鼠标点击播放器的快进符号。

### 录制视频
> 工具栏 -> File -> New Movie Recording

### IOS手机投屏
> 工具栏 -> File -> New Screen Recording -> 选择设备

## 虚拟机
> 在M1 MAC上安装虚拟机不像英特尔版本那么方便。因为M1是ARM架构。

### DOCS
- [IPSW下载地址-第三方](https://mrmacintosh.com/apple-silicon-m1-full-macos-restore-ipsw-firmware-files-database/)
- [优质博客](https://prin.pw/macos-vm-on-m1-mac/)
- [MacVM-github](https://github.com/KhaosT/MacVM)

### 方案
1. Anka
2. 开源程序MacVm
3. Parallels Desktop

### Review
三种方式都是基于Virtualization framwork，第3和第1都要钱(第1有个人开发版不要)。第2种不稳定，推荐第1种的免费版本。

如果是安装win11 arm，还是需要Parallels Desktop。安装macos时需要使用镜像文件是IPSW格式