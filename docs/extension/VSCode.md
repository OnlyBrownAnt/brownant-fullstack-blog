# VSCode深度个性化

## Introduction

## 配置
> setting.json
### 配置同步
### 个性化配置
### 工作区化

## 快捷键
> 尽量避免中文输入法影响
### Docs
- [Key Bindings for Visual Studio Code](https://code.visualstudio.com/docs/getstarted/keybindings)
- [when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts)
- [Commands-extension-guides](https://code.visualstudio.com/api/extension-guides/command)
- [VS Code API](https://code.visualstudio.com/api/references/vscode-api)
- [Issus-Toggle File Explorer with a single keybinding](https://github.com/microsoft/vscode/issues/172286)

### Ternminal
### File

## 插件
- vscodevim


## Common
这里的leader指的是同时的按键
每个特定功能的组件的where都局限于组件活跃状态时，一些需要公共性的案件才不局限。
默认所有按键都是英文下的
```text
<common-1-leader>
Option-Command

<common-2-leader>
Shift-Command

全局查找
Shift-Command-F

查找
Command-F

复制
Command-C

黏贴
Command-V

全部选择
Command-A

取消
Escape

重设窗口大小(上下左右)
<common-leader>-方向键
```
## Common
```text
资源管理器
Command-1

搜索
Command-2

源代码管理
Command-3

运行
Command-4

扩展
Command-5

问题
Command-6

输出
Command-7

调试控制台
Command-8

```
## Terminal
```text
<leader> 
Command-0

open/hidden
<!-- 主意是0不是o -->
<leader>-0

add
<leader>-a

0select
<leader>-s

delete
<leader>-d

重设窗口大小(上/下/左/右)
<common-1-leader>-方向键

聚焦窗口(拆分终端)(左/右)
<common-2-leader>-方向键

聚焦窗口(终端组)(上/下)
<common-2-leader>-方向键

拆分窗口
<common-2-leader>-\

清除窗口内容
<common-2-leader>-K

```
## KeyBindings
> 包含Workbench View的所有板块。

```json
// 将键绑定放在此文件中以覆盖默认值
[
    // Workbench View
    // File Explorer
    {
        "key": "cmd+1",
        "command": "workbench.files.action.showActiveFileInExplorer",
        "when": "workbench.view.explorer || editorTextFocus"
    }, 
    {
        "key": "cmd+1",
        "command": "workbench.action.closeSidebar",
        "when": "activeViewlet == 'workbench.view.explorer'"
    },
    {
        "key": "cmd+1",
        "command": "workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled && activeViewlet != 'workbench.view.explorer'"
    },
    {
        "key": "cmd+1",
        "command": "-workbench.action.focusFirstEditorGroup"
    },
    {
        "key": "shift+cmd+e",
        "command": "-workbench.view.explorer",
        "when": "viewContainer.workbench.view.explorer.enabled"
    },
    // Search
    {
        "key": "cmd+2",
        "command": "workbench.action.closeSidebar",
        "when": "activeViewlet == 'workbench.view.search'"
    },
    {
        "key": "cmd+2",
        "command": "workbench.view.search",
        "when": "workbench.view.search.active && activeViewlet != 'workbench.view.search'"
    },
    {
        "key": "cmd+2",
        "command": "-workbench.action.focusSecondEditorGroup"
    },
    {
        "key": "shift+cmd+f",
        "command": "-workbench.view.search",
        "when": "workbench.view.search.active && neverMatch =~ /doesNotMatch/"
    },
    // Source Control
    {
        "key": "cmd+3",
        "command": "workbench.action.closeSidebar",
        "when": "activeViewlet == 'workbench.view.scm'"
    },
    {
        "key": "cmd+3",
        "command": "workbench.view.scm",
        "when": "workbench.scm.active && activeViewlet != 'workbench.view.scm'"
    },
    {
        "key": "cmd+3",
        "command": "-workbench.action.focusThirdEditorGroup"
    },
    {
        "key": "ctrl+shift+g",
        "command": "-workbench.view.scm",
        "when": "workbench.scm.active"
    },
    // Run
    {
        "key": "cmd+4",
        "command": "workbench.action.closeSidebar",
        "when": "activeViewlet == 'workbench.view.debug'"
    },
    {
        "key": "cmd+4",
        "command": "workbench.view.debug",
        "when": "viewContainer.workbench.view.debug.enabled && activeViewlet != 'workbench.view.debug'"
    },
    {
        "key": "shift+cmd+d",
        "command": "-workbench.view.debug",
        "when": "viewContainer.workbench.view.debug.enabled"
    },
    // Extensions
    {
        "key": "cmd+5",
        "command": "workbench.action.closeSidebar",
        "when": "activeViewlet == 'workbench.view.extensions'"
    },
    {
        "key": "cmd+5",
        "command": "workbench.view.extensions",
        "when": "viewContainer.workbench.view.extensions.enabled && activeViewlet != 'workbench.view.extensions'"
    },
    {
        "key": "shift+cmd+x",
        "command": "-workbench.view.extensions",
        "when": "viewContainer.workbench.view.extensions.enabled"
    },
    // Problems
    {
        "key": "cmd+6",
        "command": "workbench.actions.view.problems",
        "when": "workbench.panel.markers.view.active"
    },
    {
        "key": "shift+cmd+m",
        "command": "-workbench.actions.view.problems",
        "when": "workbench.panel.markers.view.active"
    },
    // Output
    {
        "key": "cmd+7",
        "command": "workbench.action.output.toggleOutput",
        "when": "workbench.panel.output.active"
    },
    {
        "key": "shift+cmd+u",
        "command": "-workbench.action.output.toggleOutput",
        "when": "workbench.panel.output.active"
    },
    // Debug Console
    {
        "key": "cmd+8",
        "command": "workbench.debug.action.toggleRepl",
        "when": "workbench.panel.repl.view.active"
    },
    {
        "key": "shift+cmd+y",
        "command": "-workbench.debug.action.toggleRepl",
        "when": "workbench.panel.repl.view.active"
    },
     // Integrated Terminal
    {
        "key": "shift+cmd+c",
        "command": "-workbench.action.terminal.openNativeConsole",
        "when": "!terminalFocus"
    },
    {
        "key": "cmd+0",
        "command": "-workbench.action.focusSideBar"
    },
    {
        "key": "alt+cmd+w",
        "command": "-workbench.action.terminal.toggleFindWholeWord",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+c",
        "command": "-workbench.action.terminal.toggleFindCaseSensitive",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+r",
        "command": "-workbench.action.terminal.toggleFindRegex",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "cmd+0 0",
        "command": "workbench.action.terminal.toggleTerminal",
        "when": "terminal.active"
    },
    {
        "key": "ctrl+`",
        "command": "-workbench.action.terminal.toggleTerminal",
        "when": "terminal.active"
    },
    {
        "key": "cmd+0 a",
        "command": "workbench.action.terminal.new",
        "when": "terminalProcessSupported || terminalWebExtensionContributedProfile"
    },
    {
        "key": "ctrl+shift+`",
        "command": "-workbench.action.terminal.new",
        "when": "terminalProcessSupported || terminalWebExtensionContributedProfile"
    },
    {
        "key": "cmd+up",
        "command": "-workbench.action.terminal.accessibleBufferGoToPreviousCommand",
        "when": "terminalAccessibleBufferFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalAccessibleBufferFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "alt+up",
        "command": "-workbench.action.terminal.accessibleBufferGoToPreviousCommand",
        "when": "accessibilityModeEnabled && terminalAccessibleBufferFocus && terminalHasBeenCreated || accessibilityModeEnabled && terminalAccessibleBufferFocus && terminalProcessSupported"
    },
    {
        "key": "cmd+down",
        "command": "-workbench.action.terminal.accessibleBufferGoToNextCommand",
        "when": "terminalAccessibleBufferFocus && !accessibilityModeEnabled || terminalAccessibleBufferFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalAccessibleBufferFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "alt+down",
        "command": "-workbench.action.terminal.accessibleBufferGoToNextCommand",
        "when": "accessibilityModeEnabled && terminalAccessibleBufferFocus || accessibilityModeEnabled && terminalAccessibleBufferFocus && terminalHasBeenCreated || accessibilityModeEnabled && terminalAccessibleBufferFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+pageup",
        "command": "-workbench.action.terminal.scrollUp",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "pageup",
        "command": "-workbench.action.terminal.scrollUpPage",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "alt+cmd+up",
        "command": "workbench.action.terminal.resizePaneUp",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+cmd+up",
        "command": "-workbench.action.terminal.resizePaneUp",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "pagedown",
        "command": "-workbench.action.terminal.scrollDownPage",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "alt+cmd+down",
        "command": "workbench.action.terminal.resizePaneDown",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+cmd+down",
        "command": "-workbench.action.terminal.resizePaneDown",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+pagedown",
        "command": "-workbench.action.terminal.scrollDown",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "alt+cmd+right",
        "command": "workbench.action.terminal.resizePaneRight",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+cmd+right",
        "command": "-workbench.action.terminal.resizePaneRight",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+left",
        "command": "workbench.action.terminal.resizePaneLeft",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+cmd+left",
        "command": "-workbench.action.terminal.resizePaneLeft",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+left",
        "command": "workbench.action.terminal.focusPreviousPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+up",
        "command": "-workbench.action.terminal.focusPreviousPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+left",
        "command": "-workbench.action.terminal.focusPreviousPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+right",
        "command": "workbench.action.terminal.focusNextPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+down",
        "command": "-workbench.action.terminal.focusNextPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "alt+cmd+right",
        "command": "-workbench.action.terminal.focusNextPane",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+g",
        "command": "-workbench.action.terminal.navigateAccessibleBuffer",
        "when": "terminalAccessibleBufferFocus && terminalHasBeenCreated || terminalAccessibleBufferFocus && terminalProcessSupported"
    },
    {
        "key": "alt+z",
        "command": "-workbench.action.terminal.sizeToContentWidth",
        "when": "terminalFocus && terminalHasBeenCreated && terminalIsOpen || terminalFocus && terminalIsOpen && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+o",
        "command": "-workbench.action.terminal.openDetectedLink",
        "when": "terminalAccessibleBufferFocus && terminalHasBeenCreated || terminalFocus && terminalHasBeenCreated"
    },
    {
        "key": "shift+cmd+\\",
        "command": "workbench.action.terminal.split",
        "when": "terminalFocus && terminalProcessSupported || terminalFocus && terminalWebExtensionContributedProfile"
    },
    {
        "key": "ctrl+shift+5",
        "command": "-workbench.action.terminal.split",
        "when": "terminalFocus && terminalProcessSupported || terminalFocus && terminalWebExtensionContributedProfile"
    },
    {
        "key": "cmd+\\",
        "command": "-workbench.action.terminal.split",
        "when": "terminalFocus && terminalProcessSupported || terminalFocus && terminalWebExtensionContributedProfile"
    },
    {
        "key": "shift+cmd+f",
        "command": "-workbench.action.terminal.searchWorkspace",
        "when": "terminalFocus && terminalProcessSupported && terminalTextSelected"
    },
    {
        "key": "cmd+.",
        "command": "-workbench.action.terminal.showQuickFixes",
        "when": "terminalFocus"
    },
    {
        "key": "shift+f3",
        "command": "-workbench.action.terminal.findPrevious",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+g",
        "command": "-workbench.action.terminal.findPrevious",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "enter",
        "command": "-workbench.action.terminal.findPrevious",
        "when": "terminalFindInputFocused && terminalHasBeenCreated || terminalFindInputFocused && terminalProcessSupported"
    },
    {
        "key": "f3",
        "command": "-workbench.action.terminal.findNext",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "cmd+g",
        "command": "-workbench.action.terminal.findNext",
        "when": "terminalFindFocused && terminalHasBeenCreated || terminalFindFocused && terminalProcessSupported || terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+enter",
        "command": "-workbench.action.terminal.findNext",
        "when": "terminalFindInputFocused && terminalHasBeenCreated || terminalFindInputFocused && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+k",
        "command": "workbench.action.terminal.clear",
        "when": "terminalFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "cmd+k",
        "command": "-workbench.action.terminal.clear",
        "when": "terminalFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "cmd+up",
        "command": "-workbench.action.terminal.scrollToPreviousCommand",
        "when": "terminalFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "cmd+down",
        "command": "-workbench.action.terminal.scrollToNextCommand",
        "when": "terminalFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "cmd+end",
        "command": "-workbench.action.terminal.scrollToBottom",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "cmd+home",
        "command": "-workbench.action.terminal.scrollToTop",
        "when": "terminalFocusInAny && terminalHasBeenCreated && !terminalAltBufferActive || terminalFocusInAny && terminalProcessSupported && !terminalAltBufferActive"
    },
    {
        "key": "shift+tab",
        "command": "-workbench.action.terminal.focusAccessibleBuffer",
        "when": "accessibilityModeEnabled && terminalFocus && terminalHasBeenCreated && terminalTabFocusMode || accessibilityModeEnabled && terminalFocus && terminalHasBeenCreated && !terminalAccessibleBufferFocus || accessibilityModeEnabled && terminalFocus && terminalProcessSupported && terminalTabFocusMode || accessibilityModeEnabled && terminalFocus && terminalProcessSupported && !terminalAccessibleBufferFocus"
    },
    {
        "key": "cmd+w",
        "command": "-workbench.action.terminal.killEditor",
        "when": "terminalEditorFocus && terminalFocus && terminalHasBeenCreated && resourceScheme == 'vscode-terminal' || terminalEditorFocus && terminalFocus && terminalProcessSupported && resourceScheme == 'vscode-terminal'"
    },
    {
        "key": "cmd+k cmd+i",
        "command": "-workbench.action.terminal.focusHover",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalIsOpen || terminalFocus && terminalProcessSupported || terminalHasBeenCreated && terminalTabsFocus || terminalIsOpen && terminalTabsFocus || terminalProcessSupported && terminalTabsFocus"
    },
    {
        "key": "cmd+g",
        "command": "-workbench.action.terminal.goToRecentDirectory",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+r",
        "command": "-workbench.action.terminal.runRecentCommand",
        "when": "accessibilityModeEnabled && terminalFocus && terminalHasBeenCreated || accessibilityModeEnabled && terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+alt+r",
        "command": "-workbench.action.terminal.runRecentCommand",
        "when": "terminalFocus && terminalHasBeenCreated && !accessibilityModeEnabled || terminalFocus && terminalProcessSupported && !accessibilityModeEnabled"
    },
    {
        "key": "shift+cmd+up",
        "command": "-workbench.action.terminal.selectToPreviousCommand",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+cmd+down",
        "command": "-workbench.action.terminal.selectToNextCommand",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "shift+escape",
        "command": "-workbench.action.terminal.hideFind",
        "when": "terminalFindVisible && terminalFocus && terminalHasBeenCreated || terminalFindVisible && terminalFocus && terminalProcessSupported"
    },
    {
        "key": "ctrl+enter",
        "command": "-workbench.action.chat.runInTerminal",
        "when": "hasChatProvider && inChat"
    },
    {
        "key": "cmd+0 s",
        "command": "workbench.action.quickOpenTerm",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
    },
    {
        "key": "cmd+0 d",
        "command": "workbench.action.terminal.kill",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported || terminalHasBeenCreated && terminalTabsFocus || terminalProcessSupported && terminalTabsFocus"
    },
    {
        "key": "shift+cmd+\\",
        "command": "-workbench.action.terminal.focusTabs",
        "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported || terminalHasBeenCreated && terminalTabsFocus || terminalProcessSupported && terminalTabsFocus"
    },
    {
        "key": "shift+cmd+up",
        "command": "workbench.action.terminal.focusPrevious",
        "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
    },
    {
        "key": "shift+cmd+[",
        "command": "-workbench.action.terminal.focusPrevious",
        "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
    },
    {
        "key": "shift+cmd+down",
        "command": "workbench.action.terminal.focusNext",
        "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
    },
    {
        "key": "shift+cmd+]",
        "command": "-workbench.action.terminal.focusNext",
        "when": "terminalFocus && terminalHasBeenCreated && !terminalEditorFocus || terminalFocus && terminalProcessSupported && !terminalEditorFocus"
    }
]
```