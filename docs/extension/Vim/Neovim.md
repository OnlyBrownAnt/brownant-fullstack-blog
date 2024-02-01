# Neovim 初体验

> 目前已经更新了Neovim进阶使用，是对Neovim初体验的重构，欢迎阅读。

## Docs

- [My Neovim setup for React, TypeScript, Tailwind CSS, etc](https://blog.inkdrop.app/my-neovim-setup-for-react-typescript-tailwind-css-etc-in-2022-a7405862c9a4)
- [recommend neovim plugins](https://hannadrehman.com/top-neovim-plugins-for-developers-in-2022)
- [优质博客-1](https://mattermost.com/blog/turning-neovim-into-a-full-fledged-code-editor-with-lua/)
- [nvim-lsp-优质博客-2](https://blog.codeminer42.com/configuring-language-server-protocol-in-neovim/)
- [neovim配置-推荐仓库](https://github.com/nshen/learn-neovim-lua/blob/main/lua/keybindings.lua)
- [neovim配置技巧-优质博客](https://xuanwo.io/2016/03/12/neovim-slow-upgrade/)

## Neovim配置基本思路

1. 安装nvim
2. 设置配置文件 init.lua

## 插件配置基本思路

1. 安装插件
2. 新增配置文件xxx.lua
3. 在init.lua中引入xxx.lua

## 配置工具和插件

1. iterm2
   > 终端工具(mac)，好看、相比于原生终端工具自定义更强

- docs
  - [iterm2](https://iterm2.com/index.html)
  - [iterm2-docs](https://iterm2.com/documentation.html)

2. [ohmyzsh](https://ohmyz.sh/)
   > 为了使用喜欢的主题和快速自定义命令脚本
3. neovim
   > 超可扩展的基于 Vim 的文本编辑器

- docs
  - [user-manual#neovim](https://neovim.io/doc/user/usr_toc.html#user-manual)
  - [lua-guide#neovim](https://neovim.io/doc/user/lua-guide.html#lua-guide)
  - [lua-lsp](https://neovim.io/doc/user/lsp.html)

4. lsp
   > 语言支持服务
5. [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
   > 语法高亮
6. [Packer.nvim](https://github.com/wbthomason/packer.nvim)
   > 插件管理工具
7. yabai
   > 窗口管理
8. [telescope](https://github.com/nvim-telescope/telescope.nvim)

- docs
  - [telescope](https://github.com/nvim-telescope/telescope.nvim)

9. [packer](https://github.com/wbthomason/packer.nvim)
   > neovim 包管理工具
10. [ripgrep](https://github.com/BurntSushi/ripgrep)
    > 面向行的搜索工具，十分快速。telescope部分功能需要安装该工具。
11. [mason](https://github.com/williamboman/mason.nvim)
    > Neovim 插件，允许您通过单一界面轻松管理外部编辑器工具，例如 LSP 服务器、DAP 服务器、linters 和格式化程序。
    >
    > mason-lspconfig bridges mason.nvim with the lspconfig plugin - making it easier to use both plugins together
12. [nul-ls](https://github.com/jose-elias-alvarez/null-ls.nvim)
    > 用Neovim作为语言服务器，通过Lua注册LSP诊断、代码操作等

## Review

### neovim

#### 剪切板交互快捷键

> 前提: mac + bpcopy
>
> 可以通过reg命令查看到当前的vim寄存器数据。可以使用"+访问系统寄存器，可以通过以下快捷键方式将数据存到指定的寄存器，也可以通过快捷键方式将指定寄存器的数据获取并使用。

##### 从neovim复制到系统剪切板

shift + '"' + '+' 'y'

##### 从系统剪切板复制到neovim

shift + '"' + '+' 'p'

#### terminaml模式操作快捷键

##### 退出terminal 模式

输入 exit

##### 返回普通模式

> 非普通模式下无法使用control + w来切换窗口

control + '\' + 'n'

### iTerm2

#### hidden the bar

Settings->Appearance->General

Theme: Compact

Tab bar location: Left

Status bar location: Top

#### close tab bar

Settings->Appearance->Panes

turn off "Show per-pane title bar with split panes"

#### Profiles-Colors

Profiles -> Basic Colors

-> Foreground: use color green

#### Profiles-Window

Profiles -> Window

-> Transparency: set 66

-> Blur: set 9

### ob my zsh

### love themes

- simple
- robbyrussell
- syvash

### packer

1. 安装包命令

```shell
PackerInstall
PackSync
```

2. 卸载包命令

```shell
# 删除注册代码(use)
PackerClean
PackerUpdate
PackerSync
```

## 体验个人小结

1. Neovim优点
   1. vim模式命令
   2. 自定义快捷键，支持映射为命令执行。
   3. 依托于终端显示，可以对终端显示效果进行更多的自定义。
   4. 优秀的第三方插件: nvim-treesitter、telescope等
   5. 几乎没有操作割裂感。由于自身对vim模式的良好支持，加上插件都是能很好支持vim模式下通过快捷键或者命令操作，可以带来人机一体的操作快感。某种意义上来说，只要手指跟得上思维，就和打字写文档一样顺滑。
2. Neovim缺点
   1. 图形化能力较弱
   2. 第三方插件(编程向) 效果(悬停、语法建议、语法检查等)没法达到流行编辑器或者IDE的效果。但是功能也很丰富。
3. 小结
   1. Neovim是款很优秀的编辑器，原生的vim模式支持、更顺畅的操作习惯、更高的自定义能力。但是缺点比较明显的是由于没有开箱即用的插件或者编程相关的功能，在入手和自定义完善的路上需要走更久才能入心顺手。但是插件和调试工具的生态现在还是在发展中。
   2. 我建议初学者由成熟的IDE或者易于安装插件的VSCode入手学习编程。然后去了解学习VIM模式以及编辑器Neovim。最后选择当前阶段最想用的工具来持续开发和学习。
   3. 核心思路: 产品目标 > 实现，应该是为了什么实现什么而选择什么工具。如果是为了使用什么工具而去选择什么方向，会增加不必要的精力消耗，不利于持续发展。
   4. 个人选择: 2023-04-22
      1. 主力编辑器: VSCode + Vim插件 + IDEA快捷键插件
      2. 辅助IDE: JetBrains IDEA + Vim插件
      3. 辅助编辑器: Neovim
