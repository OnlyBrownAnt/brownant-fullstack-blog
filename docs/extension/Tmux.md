# Tmux

一个终端会话工具,可以保存终端会话,而且在一个终端会话窗口中可以同时显示多个窗格.

## Docs

- [优质博客](https://www.cnblogs.com/kaiye/p/6275207.html)
- [官方教程](https://github.com/tmux/tmux/wiki/Getting-Started#getting-started)

## Review

### 常用命令

#### 会话管理

```shell
tmux ls 查询tmux会话列表
tmux new -s [name] 新建会话
tmux a -t [name] 打开会话”
tmux kill-session -t [name] 删除会话
tmux kill-server 删除所有会话
```

### 常用快捷键

> 所有快捷键之前都需要加上默认的快捷键前缀
>
> **快捷键前缀(MAC): Control-B**

#### 会话操作

```text
& 重命名会话
s 选择会话列表
d 退出会话
```

#### 窗口操作

```text
c 新建窗口
& 关闭窗口
w 窗口列表选择
[id] 根据数字快速切换窗口
```

#### 窗格操作

```text
q 显示窗格序号
% 横向创建窗格
" 纵向创建窗格
x 关闭当前窗格
{ 前移窗格
} 后移窗格
Space 切换窗格布局/恢复切换
z 最大化/恢复最大化
方向键 选择窗格
```

#### 其他

```text
[ 进入tmux copy模式（在该模式下可以进行鼠标滚动复制文本)
q 退出tmux copy模式
```

### 个人工作流

> 工作类型背景介绍，笔记、编程、程序服务管理、文件操作 这是四个操作基本是同时在同一个工作或者学习场景下都会存在的。
>
> 所以细分两类情况去处理，并利用tmux快速切换会话操作，实现操作切换无感的目的。
>
> 1. 需要长期编码的操作，例如笔记、编程都单独创建tmux会话，启动neovim，依赖于vim的分屏功能而不是tmux的窗格功能。
> 2. 需要固定窗口查看，但是不需要频繁编码的操作。例如程序服务管理和文件操作可以都在一个会话里，依赖于tmux的窗格功能，在一个窗口内打开多个服务管理窗格，专门负责文件操作的窗格。

#### Flow Demo

```shell
# create tmux session
tmux new -s blog
tmux new -s code
tmux new -s service-management
# kill all sessions
tmux kill-server
```
