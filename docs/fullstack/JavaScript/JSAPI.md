# 常用功能总结

### 剪切板功能
#### 推荐库
clipboard

#### 原生JS
```javascript
copyToClipboard(text) {
  // TODO 测试情况下部分浏览器会禁用非安全域的navigator.clipboard对象导致clipboard API不可用
  if (navigator.clipboard) {
    // 支持 Clipboard API 的代码
    navigator.clipboard.writeText(text)
      .then(() => console.log("已成功复制到剪贴板"))
      .catch(err => console.error("无法复制到剪贴板：", err));
  } else {
    // 不支持 Clipboard API 的代码(部分浏览器已不支持该API)
    console.log(`不支持navigator.clipboard`);
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log("已成功复制到剪贴板");
  }
}
```

### 访问本地文件
File API 与 Blob API