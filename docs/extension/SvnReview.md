# SVN 基础

### Docs
- [svn](https://subversion.apache.org/)
- [Mac安装svn-优质博客](https://www.cnblogs.com/guizimo/p/13334030.html#/cnblog/works/article/13334030)
- [命令总结-优质博客](https://blog.csdn.net/ithomer/article/details/6187464)

## Review-安装SVN
> mac上只能通过brew安装svn
brew install subversion

## Review-常用命令
```shell
# <path>是当前目录, <serverPath>是仓库目录，[]表示可选的命令
# 克隆
svn checkout url
# 拉取
svn check <serverPath>
# 更新 
svn update <path>
# 查看状态
svn statue <path>
# 查看提交历史
svn log <path>
# 添加文件到本地版本库
svn add <file>
# 删除文件到本地版本库
svn delete <file>
# 提交文件到远程版本库
svn commit -m ""
# 加锁 (加锁状态下会提交失败)
svn lock -m "" [--fprce] <path>
# 解锁
svn unlock <path>

```
## Review-使用idea的svn插件进行版本的管理和查看更新。
1. 并打开版本控制，类型选择svn。
2. 新建空项目 -> vcs -> 从版本控制中获取 -> 选择需要的svn仓库
>（基本流程和git项目类似）

## Review-svn可以选择仓库的一部分进行跟踪更新
可以

## Review-git和svn区别
svn和git在组织文件的思路上不同. svn是每个目录都是一个分支. 所以可变动性大, 不稳定性多。

因为目录是有层级关系的, 你不能保证子目录的变动能稳定查看. 而git的分支是同一层级, 所以如果要下载git至少是以分支下载, 所以如果工程文件庞大. 下载很慢. 但是SVN支持每一个目录都是一个分支, 所以下载和更新方面又会方便点。
