# Postman Mock 教程

## 说明

在前后端分离开发时通常会遇到一种情况，前端需要调试接口，后端却没有写好。

这个时候有两种方式来解决这个问题，一是前端使用mock.js来根据后端的接口文档设置假数据。二是后端通过Postman新增mock服务提供可外网访问的mock接口用于调试。

方式一不是很方便，毕竟mock.js是侵入了代码里。如果有多人协作时，还会存在响应数据更新不及时情况。方式二就比较好，统一提供可外网访问的mock服务，可以手动更新最新的响应数据。

通过postman创建mock服务就可以很好的来解决这个问题，即方式二。

## 基本使用思路

1. 先创建请求(Request)、请求集合(Collections)、请求环境(Environments)。

   我们可以通过Environments中设置一些变量，比如请求路径url、token参数。然后在Request中以变量的方式使用。这样我们在创建新Environments后，而且里面的请求url、token参数都是mock数据时，我们在Request只需要切换环境，就可以方便的使用mock服务。

2. 创建mock服务、创建mock Environments

   在Collection上右键或者点击更多按钮，可以看到Mock Collection选项，点击就可以在这个Collections基础之上快捷的创建mock Environments和mock服务。

3. 在请求(Request)上创建响应案例(example)

   创建example，然后就可以设置需要返回的响应数据，支持Postman动态变量来自动生成字段值。每个请求可以有多个example，默认使用最新创建的一个。可以在example的请求param中设置一个唯一值的参数id，这样当Reqeust的param也带上参数id之后就可以使用对应的example。

4. 在请求(Request)上切换请求环境(Environments)为mock Environments

   切换环境成功之后，就等于使用了mock服务，在进行接口请求时就可以顺利得到响应案例(example)模版的返回。
   如果是前端想要使用，那么就把单独的mock服务地址复制出来到工作中使用就可以了。

## 基本使用案例

[Postman-Mock服务的基本使用教程视频](https://www.bilibili.com/video/BV1qe4y1f723?share_source=copy_web&vd_source=56507021ccbdd0ee1c35116c3a05f1e4)

## 附录

1. [Postman-Mocking-with-examples(官方mock服务使用教程)](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/#mocking-graphql-queries)
2. [Postman-Dynamic-variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/)
3. [Postman-Mock服务的基本使用教程视频](https://www.bilibili.com/video/BV1qe4y1f723?share_source=copy_web&vd_source=56507021ccbdd0ee1c35116c3a05f1e4)

[^1]: [Postman-Mocking-with-examples](https://learning.postman.com/docs/designing-and-developing-your-api/mocking-data/mocking-with-examples/#mocking-graphql-queries)
[^2]: [Dynamic-variables](https://learning.postman.com/docs/writing-scripts/script-references/variables-list/)
[^3]: [Postman-Mock服务的基本使用教程视频](https://www.bilibili.com/video/BV1qe4y1f723?share_source=copy_web&vd_source=56507021ccbdd0ee1c35116c3a05f1e4)
