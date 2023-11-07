## less预编译

> ```bash
> ## 参考
> https://blog.csdn.net/weixin_43883485/article/details/104738333
> ```

### `less`安装/引入

```
#node端安装
npm install less -g		/* 全局安装 */
npm i less --save-dev	/* 项目文件夹安装 */
```

```html
//导入less.js文件，js必须在less后引用
<script src="less.js" type="text/javascript"></script>

//html文件引用less文件，需将rel设置为stylesheet/less
<link rel="stylesheet/less" type="text/css" href="css/style.less" />
```

- less是预处理语言，最终解析成css样式
- 变量/混合/嵌套/运算/转义/函数/映射/作用域/注释/导入

#### 在vue项目中使用less

```cmd
#在项目中安装 less-loader 依赖
#需要注意webpack版本与less-loader版本，可能会产生不兼容现象
npm install --save less less-loader
```

### `less`编译成`wxss`文件

1. 在`VScode`安装`Easy-less`插件

2. 打开vscode安装目录所在的位置`C:\用户\用户名\ .vscode\extensions找到mrcrowl.easy-less-1.6.3`复制到微信开发者工具扩展工具的目录下

3. 打开微信开发者工具，top 栏，设置>扩展设置>扩展>自定义扩展点击开启`easy-less`插件的使用

4. 配置`VScode`的`setting-json`
   ![image5](./image/image5-1661076335943.jpg)

5. ```setting.json
   // 添加配置，使less输出wxss的文件（默认输出是css）
   "less.compile": {
       "outExt": ".wxss"
   }
   ```

### 变量`Variables`

使用`@`符号定义变量。格式为：`@变量名:变量值;`

````less
@width: 10px;
@height: @width + 10px;

#header {
	width: @width;
	height: @height;
}
````

编译为：

```css
#header {
    width: 10px;
    height: 20px;
}
```

### 混合`Mixins`

混合是将一组`CSS`属性，允许将一个类的属性用于另一个类，并且包含类名作为其属性。

```less
#p1 { color: yellow; }
.p2 { background: blue; }
.p3 {
    font-size: 2px;
    #p1();
    .p2();
}
```

编译为：

```css
#p1 {
  color: yellow;
}
.p2 {
  background: blue;
}
.p3 {
  font-size: 2px;
  color: yellow;
  background: blue;
}
```

### 嵌套`Nesting`

通过嵌套来代替层叠或与层叠结合的使用的能力。
还可将 伪选择器 与 混合 一同使用。
**& 表示当前选择器的父级**

```less
#header {
    color: yellow;
    .nav {
        font-size: 12px;
    }
    .log {
        width: 200px;
    }
    &:after {
        content: '111';
    }
}
```

编译成：

```css
#header {
  color: yellow;
}
#header .nav {
  font-size: 12px;
}
#header .log {
  width: 200px;
}
#header:after {
  content: '111';
}
```

### @规则嵌套和冒泡

@规则（如`@media 或 @supports`）可以与选择器以相同的方式进行嵌套。
@规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变——这叫冒泡。
**如果在里面，则是 and ，外面的参数如果跟里面参数一致，则里面的慧覆盖外面的参数值。**

```less
.component {
    width: 300px;
    @media (min-width: 768px) {
        width: 600px;
        @media (min-resolution: 192dpi) {
            background: green;
        }
    }
    @media (min-width: 1280px) {
        width: 800px;
    }
}
```

编译成：

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background: green;
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

### 运算`Operations`

算术运算符（+`、`-`、`*`、`/ ）可以对任何数字、颜色或变量进行运算。
算数运算符在加减或比较之前会进行单位换算，乘法和除法不作转换。
计算的结果以最左侧操作数的单位类型为准。
如果单位换算无效或失去意义，则忽略单位。（如px 到 rad 到 % 的转换是无效的）

```less
@con1: 5cm + 9mm; // 5.9cm
@con2: 2 - 3cm -5mm; // -1cm -5mm
@con3: 2 + 5px - 3cm; // -106.38582677px
@base: 2cm *3mm; // 6cm
p1{ width:@con1; }
p2{ width:@con2; }
p3{ width:@con3; }
p3{ width:@base; }
```

### `calc()`特例

`calc()`函数用于动态计算长度值（注意：运算符前后都需要保留一个空格）
`less`中的`calc()`函数并不对数学表达式进行计算，但在嵌套函数中会计算变量和数学公式的值。

> 变量一定要用`@{}`包裹起来；

```less
div {
	@diff : 30px;
  @containerHeight: 500px;
	@inputHeight: 50px;
	width : calc(~"100% - @{diff}");
    top: ~"calc(@{containerHeight}/2 - @{inputHeight}/2 + 10px)";
}
```

```css
div {
  width: calc(100% - 30px);
  top: calc(500px/2 - 50px/2 + 10px);
}
```

### 转义`Escaping`

允许你使用任意字符串作为属性变量值。任何`~"anything"`或`~'anything'`形式的内容都将原样输出，除非`interpolation`。
在`less 3.5+，许多引号转义都不需要了`

```less
@min768: ~"(min-width: 768px)";
.element {
    @media @min768 {
        color: red;
    }
}
```

```css
@media (min-width: 768px) {
  .element {
    color: red;
  }
}
```

### 函数`Functions`

```less
.xkd() {
  @w: 10px;
  @h: 20px;
}
.p1 {
  .xkd();
  @w: 100px;
  width: @w;
  height: @h;
}
```

```css
.p1 {
  width: 100px;
  height: 20px;
}
```

### 映射`Maps`

相当于js中的对象属性。

```less
#colors() {
  primary: blue;
  secondary: green;
}
.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

```css
.button {
  color: blue;
  border: 1px solid green;
}
```

### 作用域`Scope`

Less的作用域与CSS中的作用域类似。先在本地查找变量和混合，如果找不到，则从"父"级作用域继承。

```less
@var: red;
#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

### 导入`importing`

如果导入一个`.less`文件，此文件中的所有变量就可以全部使用了。如果导入的文件是`.less`扩展名，则可将扩展名省略掉：

```less
@import "library"; // library.less
@import "type.css";
```

## SCSS预编译

> - https://www.cnblogs.com/wangpenghui522/p/5467560.html
> - https://www.sass.hk/docs/
> - less的函数名为&，scss的函数名为$
> - 安装：`npm i -S node-sass sass-loader`

### scss常用指令

> **注意：scss 与 sass 的区别**
>
> ```bash
> 1. 混合样式: @mixin
> 	@mixin 名字(参数1，参数2...){...}
> 
> 2. 取用混合样式：@include
> 	@include 名字（@mixin的名字）
> 
> 3. 继承样式：@extend
> 	@extend 需要继承的类、ID名、自定义的混合样式等的名字
> 
> 4. 导入scss样式：@import
> 	@import "scss文件名"
> 
> 5. 条件控制指令：@if
> 	@if 条件{...}
> 
> 6. 循环控制指令：@for
> 	@for $var from <开始值> through <结束值> -----------包括结束值
> 	@for $var from <开始值> to <结束值> ------------不包括结束值
> 
> 7. 循环List项目的控制指令：@each
> 	@each $var in $List{}
> 
> 8. 条件判断循环：@while
> 	@while 条件{...}
> 
> 9. 用户自定义的函数：@function
> 	@function 名称(参数1，参数2...){...}
> 
> 10. 警告和错误的提示： @warn 与 @error
> 	@warn "..."------------------------在终端输出警告
> 	@error "..."----------------在.css文件和终端输出错误
> ```

### scss常用函数

> ```bash
> # 数字函数 ：
> - $theNumber:4.5;
> - percentage($theNumber)：将一个不带单位的数转换成百分比值；  //450%
> - round($theNumber)：将数值四舍五入，转换成一个最接近的整数；  //5
> - ceil($theNumber)：将大于自己的小数转换成下一位整数；   //5
> - floor($theNumber)：将一个数去除他的小数部分；  //4
> - abs($theNumber)：返回一个数的绝对值；//4.5
> - min($numbers…)：找出几个数值之间的最小值； //min(1,2,3) =1
> - max($numbers…)：找出几个数值之间的最大值； //max(1,2,3)=3
> - random(): 获取随机数   //随机数
> 
> # 字符串函数：
> - $theString:"Hello World";
> - to-upper-case($theString)：输出$theString的大写                 //HELLO WORLD
> - to-lower-case($theString)：输出$theString的小写                 //hello world
> - str-length($theString):输出$theString的长度                     //11
> - str-index($theString,"Hello"):输出$theString第二个参数的开始索引          //1   
> - str-insert($theString,".com",12):在索引为12的地方为$theString插入".com" //"Hello World.com"
> 
> 
> # 颜色函数
> ## 调整色相h的值    
> - $base-color-hsl:hsl(0,100,50%);  //	red
> - $base-color:#ff0000;  //red
> - adjust-hue($base-color-hsl,137deg);        //#00ff48
> - adjust-hue($base-color,137deg);          //#00ff48
> 
> ## 调整亮度l的值
> - $base-color:hsl(222,100%,50%);             //#004cff
> - $light-color:lighten($base-color,30%);        //#99b8ff（变亮）
> - $dark-color:darken($base-color,20%);         //#002e99（变暗）
> 
> ## 调整饱和度s的值
> - $base-color:hsl(221,50%,50%);            //#4068bf
> - $saturate-color:saturate($color:$base-color,$amount:50%);          //#0051ff  (更饱和)
> - $desaturate-color:desatudate($color:$base-color,$amount:30%);        //667699 (更不饱和)
> 
> ## 调整透明度a的值
> - $base-color:hsla(222,100%,50%,0.5);  //rgba(0, 77, 255, 0.5)
> - $fade-in-color:opacify($color: $primary-color, $amount: 0.3);  //rgba(0, 77, 255, 0.8)
> - $fase-out-color:transparentize($color: $primary-color, $amount: 0.2);  //rgba(0, 77, 255, 0.3)
> 
> # 列表函数（1px solid black：这样称为一个列表有三个项）
> - length(5px 10px)：列表长度     //2
> - length(5px 10px 0px 2px)  列表长度      //4
> - nth(5px 10px,1)：列表第一项   //5px 
> - nth(5px 10px,2)：列表第二项   //10px 
> - index(1px solid red,solid)：列表solid的项目索引  //2
> - append(5px 10px,5px)：列表中插入项目  //5px 10px 5px
> - join(5px 10px,5px 10px):列表之间连接   //5px 10px 5px 10px
> - join(5px 10px,5px 10px,参数)：列表之间条件连接  //参数为comma=5px,10px,5px,10px ---------参数为space=5px 10px 5px 10px
> 
> # Map函数(Map为带有键值对的列表)
> - $colors:(light:#ffffff,dark:#000000);   //定义map
> - length($colors)：map的长度  //2
> - map-get($colors,dark):取得键值为dark的值     //#000000
> - map-keys($colors)：取得所有键      //("light","dark")
> - map-values($colors) ：取得所有值      //(#ffffff,#000000)
> - map-has-key($colors,light)：map是否有light键       //true
> - map-merge($colors,(color-red:#ff0000)) ：插入键值对到map   //(light:#ffffff,dark:#000000,color-red:#ff0000)
> - map-remove($colors,light,dark) :从map删除键值对      //(color-red:#ff0000)
> ```

### sass循环随机数

> ```scss
> @for $i from 1 through 18
> {
> .dot-posi#{$i}
> {
>  animation:change 2s ease-in-out (random(5) + 1) + s infinite alternate;
> }
> }
> ```
>
> ### scss版本
>
> ```scss
> @keyframes movetotop {
>   90% {
>     opacity: 1;
>   }
> 
>   100% {
>     opacity: 0.1;
>     transform: translate(-50%, -180px);
>   }
> }
> 
> @for $i from 0 through 15 {
>   li:nth-child(#{$i}) {
>     $width: 15 + math.random(15) + px;
>     top: 50%;
>     left: 15 + math.random(70) + px;
>     width: $width;
>     height: $width;
>     transform: translate(-50%, -50%);
>     animation: movetotop (math.round((math.random(6) + 3)) + s)  ease-in-out (-(math.random(5000)/1000) + s) infinite;
> 	}
> }
> ```
>
> ### less版本
>
> ```less
> @keyframes movetotop {
>   90% {
>     opacity: 1;
>   }
> 
>   100% {
>     opacity: 0.1;
>     transform: translate(-50%, -180px);
>   }
> }
> 
> .generate-columns(15);
> .generate-columns(@n, @i: 0) when (@i =< @n) {
>   .generate-columns(@n, (@i + 1));
>   .column-@{i} {
>     width: (@i * 100% / @n);
>   }
>   li:nth-child(@{i}) {
>     @width: unit(~`Math.round(15 + Math.random() * 15) `, px);
> 
>     top: 50%;
>     left: unit(~`Math.round(Math.random() * 70) `, px);
>     width: @width;
>     height: @width;
>     transform: translate(-50%, -50%);
>     animation: moveToTop unit(~`(Math.round(Math.random() * 6) + 3) `, s) ease-in-out
>       unit(~`-(Math.random() * 5000 / 1000) `, s) infinite;
>   }
> }
> ```

### mixin函数

> ```scss
> @mixin foo($a, $b, $c) {
> // 我可以在这里使用 $a、$b 和 $c，但它们可能为空
> }
> @mixin foo1($a: 1, $b: 2, $c: 3) {
> }
> 
> .el {
> @include foo(1, 2, 3);
> // 如果我们试着使用 `@include foo`，不传任何参数，这是有效的语法
> // 但会从 Sass 那里得到 Error: Missing argument $a
> 
> @include foo1;
> @include foo1('three', 'little', 'pigs');
> }
> ```
>
> ### mixin默认参数
>
> **注意**：指定空字符串或 `null` 无法将不起作用。必须使用命名参数方法
>
> ````scss
> // 样式滚动条
> @mixin scrollbar(
> $size: 10px,
> $foreground-color: #eee,
> $background-color: #333
> ) {
> // 仅支持 WebKit 内核的浏览器
> &::-webkit-scrollbar {
>  width: $size;
>  height: $size;
> }
> &::-webkit-scrollbar-thumb {
>  background: $foreground-color;
> }
> &::-webkit-scrollbar-track {
>  background: $background-color;
> }
> 
> // 标准版本（目前仅限 Firefox）
> scrollbar-color: $foreground-color $background-color;
> }
> ````
>
> **css调用**
>
> ```css
> .scrollable {
> @include scrollbar;
> }
> 
> .thick-but-otherwise-default-scrollable {
> // 我可以跳过 $b 和 $c，因为它们是第二和第三
> @include scrollbar(30px);
> }
> 
> .custom-colors-scrollable {
> // 如果所有其他参数都已命名，我可以跳过第一个参数。
> @include scrollbar($foreground-color: orange, $background-color: black);
> }
> 
> .totally-custom-scrollable {
> @include scrollbar(20px, red, black);
> }
> ```



### vue使用

### vue中使用scss公共变量

> #### 把需要导出的scss变量通过:export导出
>
> ```scss
> $menuText:#bfcbd9;
> $menuActiveText:#409EFF;
> $subMenuActiveText:#f4f4f5;
> $sideBarWidth: 210px;
> 
> :export {
> menuText: $menuText;
> menuActiveText: $menuActiveText;
> subMenuActiveText: $subMenuActiveText;
> sideBarWidth: $sideBarWidth;
> }
> ```
>
> #### 引用
>
> ```vue
> <!-- vue文件中引用 -->
> <template>
> <div :style="{background:publicStyles.menuBg}"></div>
> </template>
> 
> <script>
> import publicStyles from '@/styles/publicStyles.scss'
> 
> export default {
> name: "Home",
> computed: {
>   publicStyles() {
>    return publicStyles
>  },
> },
> };
> </script>
> 
> <style lang="scss">
> .menu{
> 	background:$menuBg;
> 	color:$menuText
> }
> </style>
> ```

### vue3 配置使用scss全局变量

> 只要在 vue.config.js 配置一下就可以了，配置的环境是 vue3，但是 vue2 也应该适用
>
> ```js
> /* vue.config.js */
> module.exports = {
> css: {
>  loaderOptions: {
>    sass: {
>      // 具体路径根据你们项目来
>      additionalData: `@import "@/assets/theme.scss";`
>    },
>    scss: {
>      additionalData: `@import "@/assets/theme.scss";`
>    }
>  }
> }
> }
> ```

## stylus预编译

> - [stylus官网](https://www.stylus-lang.cn/docs/bifs.html)
