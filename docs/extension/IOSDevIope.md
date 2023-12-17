# IOS开发资料

## 文档
[apple account center](https://developer.apple.com/account)
[xcode-document](https://developer.apple.com/documentation/xcode)
[AppleStore-上架审核指南](https://developer.apple.com/cn/app-store/review/guidelines/#introduction)

## 总结
### Mac开发环境配置
mac自带了默认的ruby版本(ruby2.7)，但是不一定适合开发。
存在依赖拉取失败问题。

所以需要安装指定的ruby版本
主要思路是通过brew安装指定的ruby版本，已经配置环境。并手动删除cocoapods的软连接，之后通过gem重新安装cocoapods
就能够正常下载IOS工程依赖了

brew install ruby@3.0
// vim .zshrc
rm -rf /usr/local/bin/pod
sudo gem uninstall cocoapods
sudo gem install -n /usr/local/bin cocoapods


pod deintegrate
pod cache clean --all
pod install