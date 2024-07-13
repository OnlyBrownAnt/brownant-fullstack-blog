# 微信小程序总结

## Docs
- [小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0008aeea9a8978ab0086a685851c0a)

## 小程序内嵌 H5 访问

### 参考文档

- [web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
- [在微信小程序中使用webview](https://www.shymean.com/article/%E5%9C%A8%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8webview)

### 结论

可以通过 web-view 组件实现，但是实际部署限制比较多。

比如目前个人开发者只能本地小程序服务打开进行调试，可以不同网络。但是需要外网环境下指定的开发者账号(手机上登陆了对应的微信号)才能访问。

如果要正式发布的话需要企业小程序账号。

### 限制说明

- 企业级小程序账号才能发布访问
- 内嵌 URL 需要是 https 协议，小程序管理台配置可信域名并需要在服务根目录放置小程序认证文件。
