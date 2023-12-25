## 

### 开始动画

- 仿照原神
- 前言：
  - 程序介绍
  - 功能简介

### 开始界面

- 类似植物大战僵尸
  - 开始
  - 设置

### 新手教程



### 主页面

- 

运行界面：加几个鼠标覆盖动画，然后
天数
对战系统

## 得到的教训

- **CSS定位**
  - absolute定位会自动将block换为inline，故提示框内文本用relative即可
  - 百分比单位是相对其父元素的，而不是子元素
  - wh不是屏幕宽度。非百分比长度一律用vh即可。字符单位一律用em（单个字符的长度即可）
- **CSS**
  - border记得写solid
  - border有时候合并写不行，分开写就可以。建议每次都分开写 `border-style: solid;` `border-width: 3px` `border-color: black`
  - 在jquery中用比较 `border-color` 时，返回的是rgb字符串，**且rgb字符串的每个逗号后面有一个空格。若不打出这个空格，结果便永远是false**
- **开启一个新页面**
  - 这固然会对css等定位减轻很大的负担。但js却无法直接将参数传递到新页面中。必须使用本地存库或cookie才行，所以我需要一个新方法
- **jquery在内容中动态输入html标签的方法**：使用 ``$.html(内容)``
- **jquery选择器选择的是jquery对象**，而不是元素对象。故 `$[0]` 是元素，不能用jquery方法，但可以直接用原生js设置属性，`$` 是jquery对象，无元素属性，但可以用jquery方法设置属性
  - 若在元素中使用jquery方法，报错是 `$[0].text() is not a function`
  - 但是可以通过**嵌套$ 的方法** `$($(".skill")[0])` 来选中第一个元素的jquery对象
- `localStorage` 是将对象转化为字符串，然后放入JSON文件中传递的。因此它不能传递方法，需要重新赋值（坑死我了）
- 刷新网页间隔不要太短，有时元素的改变跟不上，导致你以为出了bug，其实没有

## jQuery中异步对象 Deferred 的用法

- Deferred对象的三个状态：
  - pending：操作未完成
  - resolved：操作成功
  - rejected：操作失败
- 通过相应的函数，可以手动将对象设置为这三个状态
  - `$.Deferred().resolve().state()` 将对象设置为操作成功，然后返回当前状态
  - resolve()函数的参数会传递到done()方法中
- when方法
- notify和progress方法
  - 调用 `notify()` 时，`progress()`函数会执行
  - **应用**：定期返回进度条的进度
- then方法：
  - **参数**：
    - 第一个是done函数：resolve后的回调函数。返回值为原来的deferred对象
    - 第二个是fail函数：rejected后的回调函数
    - 第三个是progress的回调函数
    - （也可以分开设置这些函数）
  - **返回值**：新的promise对象
- always方法：
  - 不管Deferred失败还是成功，都会调用
- pipe方法：
  - 在调用其它方法的回调之前，先调用pipe指定的函数
  - **应用**：数据的初步处理
- promise对象：
  - **异步意义**：在promise对象所在的语句被执行前，done函数不会执行
  - **返回promise的意义**：promise()本质就是一个异步对象。done方法就是promise对象的方法。
    - 若两个函数返回同一个deferred对象的promise，则它们会保持同步
  - **应用**：做某些函数（显示选择框，在点击选项后返回一个布尔值）的返回值。那么在resolve()函数（如点击按钮时触发resolve函数）调用前，done函数（网页跳转）不会执行

### done的链式调用

`deferred.done().done()` 中，第二个done只会在第一个done被解决后执行。所以不用写嵌套啦！

### 生命周期问题

- var 声明的是函数作用域，若人为划分语句块（直接在文件中输入 `{//代码}`，则会被视为全局变量或当前函数中的变量）
- let 声明的是块级作用域。若人为划分语句块（`if(判断){//代码}`），则只会在该大括号中起作用