# tui.calendar/react-calendar 总结

react-calendar 是 tui.calendar 对 React 库进行支持的库。 
## Docs
- [11个顶级 JavaScript 日历插件](https://zhuanlan.zhihu.com/p/74713207?utm_id=0)
- [tui-calendar](https://ui.toast.com/tui-calendar)
- [tui.calendar(github)](https://github.com/nhn/tui.calendar)
    > tui.calendar 是一个日历库，支持多种框架。
- [tui.calendar/react-calendar](https://github.com/nhn/tui.calendar/tree/main/apps/react-calendar)
    > tui.calendar 日历库(React)


## 基本教程(React)
- [react-calendar/documents](https://github.com/nhn/tui.calendar/tree/main/apps/react-calendar#-documents)

- 安装
```shell
npm install --save @toast-ui/react-calendar
```

- 引入
```javascript
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
```

- 使用
```jsx
export function MyCalendar() {
  return (
    <div>
      <Calendar usageStatistics={false} />
    </div>
  );
}
```