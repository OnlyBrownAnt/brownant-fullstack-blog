# 前端解决方案积累

## Docs

- [剑指前端 Offer](https://febook.hzfe.org/awesome-interview/)

## 前端网络请求的业务状态处理方案

### 抛出异常 Error + 多层次拦截(局部 + 全局)

- [使用 promise 进行错误处理](https://zh.javascript.info/promise-error-handling)
- [axios](https://www.axios-http.cn/)

之前写 Java 封装拦截器时发现通常对于公共性的异常处理方式是直接抛出异常，然后在多层拦截器中做针对性的处理和返回。

所以参考这个思路，对于前端网络请求的业务状态也采用这种方式进行处理。

- 只要是公共性的异常，例如登陆失效、网络错误都抛异常。
- 另外要定义专门的异常类型，这样来全局拦截的时候才能针对性处理。
- 抛出异常这样的一个好处也是可以直接中断当前业务代码执行，避免还在业务逻辑部分做各种对包装错误的判断处理。但是需要注意 Promise 嵌套的情况。异常会抛出到最外层确认没有局部的 catch、try catch 捕获后才会有全局异常处理器进行捕获。
- 拦截流程分为两层
  - try catch 和 promise catch 局部层次处理，如果是业务逻辑相关，那么就不需要抛出。如果需要上层处理就继续抛出。
  - 全局 error event 和 unhandledrejection event 全局处理，如果匹配定义的处理规则就处理，如果都没有那进行公共的打印或者提示。

封装实例

- [webpack-react-cli/request.ts](https://github.com/OnlyBrownAnt/webpack-react-cli/blob/main/src/utils/request.ts)

## 常见权限控制和认证方案

- [OAuth2](https://oauth.net/2/)
  > OAuth 2.0 是行业标准授权协议。OAuth 2.0 注重客户端开发人员的简单性，同时为 Web 应用程序、桌面应用程序、移动电话和客厅设备提供特定的授权流程。
- [jwt](https://jwt.io/)
  > JSON Web Token 是一种开放的行业标准 RFC 7519方法，用于在两方之间安全地表示声明。是一种对JSON进行加密签名来实现授权验证的方案。
- [JSON Web Token 入门教程](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [HTTP 身份验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)
  > HTTP 提供一个用于权限控制和认证的通用框架。本页介绍了通用的 HTTP 认证框架，并且展示了如何通过 HTTP 的“Basic”模式限制对你服务器的访问。
- [MDN/Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)
- [Cookie原理、Set-Cookie常用字段、应用](https://blog.csdn.net/jiangshangchunjiezi/article/details/104433135)
- [用户认证和授权](https://github.com/sishenhei7/react-blog/issues/17)
- [一文搞懂前后端常见登录态方案](https://zhuanlan.zhihu.com/p/591434948)
- [微服务架构下的鉴权，怎么做更优雅？](https://learnku.com/articles/30704)

### 基础概念

- Token 通常指的是一种令牌的概念，可以有多种实现方式。在不同语境和框架下可以具体化为不同的功能。比如 JSON Web Token 的定义和使用。

### 方案介绍

#### HTTP 身份验证

流程

1. 服务端返回 401，响应头 `WWW-Authenticate` 响应标头提供如何进行验证的信息。
2. 客户端发起认证，请求头 `Authorization` 包含用于服务端认证信息(base 64 格式)。

优点

- 节约服务端资源，认证方便。

缺点

- 用户信息Base64传输过程中存在安全风险。

#### Cookie

流程

1. 客户端发起请求，请求头携带 Cookie。服务端处理请求，获取 Cookie。
2. 服务端响应，响应头Set-Cookie，要求客户端保存该 Cookie 信息到 Cookie 中。
   > 客户端后续请求中，客户端就会将服务端保存的 Cookie 再次上送处理。

优点

- Cookie 支持子域名之间的跨域。

缺点

- 用户信息传输过程中存在安全风险。

#### Session

流程

1. 客户端发起请求
2. 服务端处理请求，在服务端生成 Session 并维护。服务端响应头增加 `session-id` 作为其维护 Session 的标识。
   > 客户端后续请求中，请求头携带 session-id，用于标识用户身份。

优点

- 相对于 Cookie 只传输状态标识，避免了直接传输用户信息的安全风险。

缺点

- 服务维护了用户状态，提高了服务资源消耗，有维护压力。
- 不利于在分布式服务中使用。Seesion 通常是只支持维护在当前部署服务中机器上。通常情况下，其他机器的服务无法有效处理。

#### Token

流程

1. 客户端发起请求，申请 Token
2. 服务端维护 Token，接受请求后，查询返回 Token
   > 看起来这种交互方式和 session-id 有点像。不过区别是 Token 支持更加复杂的交互方案，比如 Token 更新处理。

优点

- 避免了直接传输用户信息的安全风险。
- 更好支持分布式
  > 因为 Token 作为数据通常可以支持维护在公共的中间件服务中比如 Redis、Mysql，便于查询使用。

缺点

- 服务端需要增加维护和查询
  > 解决方案： 比如 JWT 这类加密签名验证的方案，其中就包含加密的基本用户信息。每次只需要验证解密即可
- 为了安全性和用户体验产生了各种交互方案，使用难度会提升。

Token 类型

- 自定义 Token
  - 其实和 session-id 功能是类似的，不过是为了支持分布式而单独将这种模式提取出来了。
  - 是需要服务端使用缓存保存映射关系的，比如使用 Redis 保存。其保存映射信息可以是用户信息等。但是每次都要查寻和对比，会增加耗时。
- JWT
  - 这类加密签名验证的方案，其中就包含加密的基本用户信息。
  - 每次只需要验证解密即可。不需要对 Token 进行缓存然后去找对应的保存信息。
  - JSON Web Tokens 说明。
    > 一个 JWT Token 组成有三部分，分别编码加密处理后以 `.` 隔开。发送到服务端，使用密钥 secret 解密。
    - Header
      > Header 通常由两部分组成：令牌的类型（JWT）和所使用的签名算法（例如 HMAC SHA256 或 RSA）。进行 Base64 编码。
    - Payload
      > Payload 是有效负载，其中包含声明。声明是关于实体（通常是用户）和附加数据的声明。进行 Base64 编码。
    - Signature
      > 签名部分。获取 Header、Payload，使用 secret(密钥) 和 Header 中指定的算法，然后对其进行签名。

## 前端用户登陆状态认证方案

### Docs

- [OAuth2](https://oauth.net/2/)
  > OAuth 2.0 是行业标准授权协议。OAuth 2.0 注重客户端开发人员的简单性，同时为 Web 应用程序、桌面应用程序、移动电话和客厅设备提供特定的授权流程。
- [JWT的加密解密原理，token登出、改密失效、自动续期](https://blog.51cto.com/u_15281317/3009218)
- [项目中前端如何实现无感刷新 token！](https://juejin.cn/post/7254572706536734781)
  > 评论区很有意思，关于由前端来控制 Token 还是后端来控制 Token 吵的不可开焦。可以了解在前后端两个角度是如何看待 Token 刷新这件事情。
- [无感刷新token怎样实现？前后端案例代码手把手带你实现！](https://juejin.cn/post/7158750013709877285)
- [axios如何利用promise无痛刷新token](https://juejin.cn/post/6844903925078818829)
  > axios 封装无感刷新 token 的案例参考。
- [复盘双token方案在项目中的实际应用](https://www.cnblogs.com/xxg98/p/17004100.html)
- [jwt续签为什么要使用双token,没看明白啊，感觉单个token也可以啊?](https://www.zhihu.com/question/506320859?rf=316165120)
  > 通过问题回答方式去了解单双 Token 的优缺点。

### 需求点分析

- 登陆状态失效捕获
- 登陆状态无感刷新
- 支持多个网络请求重发

### Token 认证方案分析

#### 单 Token 方案

1. 基础方案

- 设置过期时间范围 Time
- token 距离过期时间在 Time 时间范围内，就刷新过期时间。
- 如果 token 确认已经过期就拒绝请求。

基础方案问题

- 还是会出现用户在持续登录时出现 Token 失效问题
  - token 30分钟，Time 1分钟
  - 用户在 28分钟 操作触发一次网络请求
  - 然后接着操作APP，用户在31分钟 操作触发一次网络请求，但是实际已经过期了。
- 可能多个网络请求同时触发服务端 Token 刷新处理
  > 后端可以对 Token 做状态标记处理，如果 Token 确认失效需要加上状态标记，那么进行刷新 Token 步骤时，通过状态拒绝当前用户(相同 Token )其他的请求。

2. 修改方案: 取消 Time ，每次接口请求都刷新 Token 过期时间。但是依旧会触发 Token 失效，因为有可能间隔操作超过一个 Token 时间。
3. 修改方案: 延长 token 时间 为 1 天。但是存在 Token 滥用安全问题，前端已经无法控制，后端需要有足够的异常访问风险识别能力。

#### 双 token 方案

> 基于 OAuth2 的 access tokens(访问令牌)、refresh tokens(刷新令牌) + JWT 的方案

基础概念

- access tokens
  - access tokens 的生命周期相对较短，比如 30 分钟。
  - access tokens 是客户端用于向资源服务器发出请求的字符串标识。
- refresh tokens
  - refresh tokens 的生命周期相对较长，比如 3 天。
  - refresh tokens 的存在是为了使授权服务器能够使用 refresh tokens 的短生命周期，而无需在 token 过期时让用户参与。
- tokens
  - 令牌不限制任何特定格式，比如字符串、JWT。

1. 基础方案

- 客户端发起登陆认证请求，服务端下发 access token 和 refresh token。
- 客户端将 refresh token 和 access token 保存。后续请求中如果 请求头都会带上 access token。
- 如果服务端报错 access token 过期。客户端请求刷新 access token，refresh token 作为请求内容。
- 服务端收到刷新请求，返回新的 refresh token 和 access token。

基础方案问题

- 假如有多个请求，那么如何更新请求头加入新的 access token，以及进行按发起顺序做重发处理。

封装实例

- [webpack-react-cli/request.ts](https://github.com/OnlyBrownAnt/webpack-react-cli/blob/main/src/utils/request.ts)
- [webpack-react-cli/cacheRequestTest.ts](https://github.com/OnlyBrownAnt/webpack-react-cli/blob/main/src/utils/cacheRequestTest.ts)
  > 刷新 token + 重试请求队列的模拟 Demo

#### 总结

- 网页端 H5 不建议双 Token 方案，单 Token 机制就够用，只是部分用户体验稍差。因为网页端保存 refresh token 数据到本地 Storage 有一定安全风险。
- 客户端 App 可以使用双 Token 方案。因为客户端的缓存保存 refresh token 安全风险相对较小。

## 前端加解密方案

- [前端攻城狮都要懂的加密算法之总结，一篇文章教你搞懂加密。](https://cloud.tencent.com/developer/article/2026017)
- [前后端RSA互相加解密、加签验签、密钥对生成(Java)](https://blog.csdn.net/lingbomanbu_lyl/article/details/128956863)

TODO
