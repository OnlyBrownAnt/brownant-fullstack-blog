# HammerSpoon

> MAC的利器，有很多内置API可以帮助在MAC上高效，脚本使用的Lua语言。

## DOCS

- [Hammerspoon](Hammerspoon)
- [Lua](https://www.lua.org/start.html)

## Review

### 快捷键启动APP

> 在日常使用总是希望快速启动某个app进行工作，或者查找文件。但是MAC内置的脚本自定义服务（打开APP）有时候无法正常启动，比如在浏览器界面，启动服务无效。所以通过这个HammerSpoon设置配置的方式可以更方便的使用快捷键启动软件，结合系统本身自带的关闭隐藏程序的快捷键。使用非常舒服。

```lua
-- 配置重载
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "R", function()
    hs.reload()
  end)
hs.alert.show("HammerSpoon Config loaded")

-- 快捷启动Notes
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "N", function()
    hs.application.launchOrFocus("Notes")
end)

--快速启动WeChat
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "W", function()
  hs.application.launchOrFocus("WeChat")
end)

--快速启动QQ
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "Q", function()
  hs.application.launchOrFocus("QQ")
end)

--快速启动Finder
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "F", function()
  hs.application.launchOrFocus("Finder")
end)

-- 快捷启动Terminal
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "T", function()
  hs.application.launchOrFocus("Terminal")
end)

-- 快捷启动Visual Studio Code
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "V", function()
  hs.application.launchOrFocus("Visual Studio Code")
end)

--快速启动Google Chrome
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "G", function()
  hs.application.launchOrFocus("Google Chrome")
end)

--快速启动IntelliJ IDEA
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "I", function()
  hs.application.launchOrFocus("IntelliJ IDEA")
end)

--快速启动Sourcetree
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "S", function()
  hs.application.launchOrFocus("Sourcetree")
end)
```
