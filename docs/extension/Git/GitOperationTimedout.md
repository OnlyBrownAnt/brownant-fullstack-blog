# Git Operation timed out

## 问题描述
> 根据所服务企业要求，项目的代码迁移到国外的服务器了，虽然Git服务还是GitLab提供，但是我们需要使用所服务企业提供的VPN才能进行项目代码的pull和push操作。
> 
> 出现的问题就是在第一次pull代码时，无论是以http还是ssh的方式进行都会提示Operation timed out，参考附录中的Git报错提示。
## 问题解决过程
### 分析超时原因
> 根据报错提示我们可以看出，错误最终现象是超时。超时的原因有很多的，最常见的超时原因就是网络超时，加上我们需要使用网速极慢的VPN(非吐槽，是现实)，我的直觉就是这玩意有问题(虽然男人的直觉一般都是靠不住的)。同时除了这个原因还有项目工程太大导致压缩失败，以及项目工程太大而http/1.1传输时缓冲区太小导致传输失败等原因。
>
> 为了更好的分析具体的原因，需要借助于Git提供的调试工具初步查看超时原因，参考附录中的Git调试Demo(Linux)部分。
>
> 参考附录中的Git调试Demo(Linux)部分输入调试命令后，发现最后pull时总会在固定的6MB时卡住，然后查看VPN网速也变为0kb/s，重新试了几次发现也是如此现象。而使用ssh方式进行同样的下载发现会在不同的程度卡住，有时是20MB有时是12MB，所以使用ssh和http方式pull的超时原因应该是不同的。
> 
### 解决办法
#### 增大http/1.1缓冲区为500MB
> 增加缓冲区会显著增大内存消耗，只推荐临时使用。所以使用完成后需要到~/.gitconfig文件中把http条目下将"postBuffer = 52428800"这一行删掉。

1. 终端输入设置http缓冲区大小命令
```
git config --global http.postBuffer 52428800
```
2. 终端输入http方式的拉取命令

## 总结
> 使用增大http/1.1缓冲区为500MB的方式之后，可以拉取代码成功。但是ssh拉取依旧失败，估计和vpn相关。
>
> 其实最简单的办法就是请求所服务企业在国外环境的开发人员进行拉取代码，然后压缩传送过来即可。因为项目分支太多，数据太大导致拉取失败，需要排查的话涉及因素太多，而平常的开发pull和push并不会包含全部项目内容，应该并不会受到太大影响，从效率角度来讲，可以采用这种方式。

## 附录
### Git报错提示
```
error: RPC failed; curl 56 Recv failure: Operation timed out
fatal: the remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
Completed with errors, see above
```
### Git调试工具
> Git内置了一套[环境变量](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables)，在终端或者git-bash中通过export设置Git环境变量的值使其在当前终端进行工作或者git-bash。
- GIT_CURL_VERBOSE
- GIT_TRACE
- GIT_TRACE_PACKET
#### Git调试Demo(Linux)
> 参考于[Bitbucket的常见问题解答部分](https://confluence.atlassian.com/bitbucketserverkb/git-clone-fails-fatal-the-remote-end-hung-up-unexpectedly-fatal-early-eof-fatal-index-pack-failed-779171803.html)，可以直接使用这个Demo中的命令进行调试。
```
export GIT_TRACE_PACKET=1
export GIT_TRACE=1
export GIT_CURL_VERBOSE=1
```