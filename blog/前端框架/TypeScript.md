---
Author: willysliang
CreateTime: 2022-08-21 16:21:35
Modifier: willysliang
ModifiedTime: 2022-12-28 10:30:07
Description: TypeScript
---

## TypeScript

## 基础

### 概述

> ```bash
> ## 安装/运行编译
> - 安装TypeScript：`npm install typescript -g`
> - 安装ts-node：`npm install -g ts-node`
> - 通过`npm config ge prefix`配置ts-node的环境
> - 编译法①：先通过`tsc filename.ts`转化为js文件，然后通过`node filename.js`运行文件。
> - 编译法②：通过安装`ts-node`来借以运行：`ts-node filename.ts`。相对于①会慢一点。
> 
> 
> ## 概述
> - TypeScript = Type + JavaScript(为js添加了类型系统)
> - TypeScript是微软开发的开源编程语言，设计目标是开发大型应用,可以在任何浏览器、计算机、操作系统上运行。
> - TypeScript相对JS的优点：类型化思维方式，减少改BUG时间；类型系统提高了代码可读性，并使维护和重构代码更容易。
> - TypeScript 是一门静态类型、弱类型的语言，是js的超集（js有的ts都有）。
> 
> - 静态类型：一旦定义就不可改变。（类型注解：是一种为变量添加类型约束的方式）
>   - let 变量名 : 数据类型 = 赋值;    //静态类型不可改变，写其他类型的值，会报错。
> - 优点：代码即注释
> 
> 
> 参考：
> - [TypeScript](https://wangdoc.com/typescript/)
> ```

### 数据类型

- 常用的基本数据类型：`number / string / boolean / undefined /null / void`
- 除加号外，其他算数运算符值只能是number类型独自使用。其他类型需要将字符串类型转换为number类型。如：console.log(2 - +'1')    //+'1'表示将'1'(string) -->1(number)，即2 - +'1'=2-1=1。

#### 数字 number

> - 二进制：0b1010；八进制：0o744；十六进制：0xf00d；都会被通过Number型转化为十进制
>
> ```ts
> let notANumber: number = NaN;	//NaN
> let num: number = 123; //普通数字
> let infinityNumber: number = Infinity; //无穷大
> let decimal: number = 6; //十进制
> let hex: number = 0xf00d; //十六进制
> let binary: number = 0b1010; //二进制
> let octal: number = 0o744; //八进制
> ```

#### 字符串 string

> - 使用双引号`"string content"`或单引号`'string content'`表示字符串；
> - 还可以使用模板字符串定义多行文本和内嵌表达式，被反引号包围(`)，并且以 ${ expr }  这种形式嵌入表达式。
>
> ```ts
> //普通声明
> let a: string = '123'
> 
> //也可以使用es6的字符串模板
> let str: string = `Hello，${a}`
> ```

#### 布尔值 boolean

> 注意，使用构造函数 `Boolean` 创造的对象不是布尔值
>
> ```ts
> let booleand: boolean = true //可以直接使用布尔值
> let booleand2: boolean = Boolean(1) //也可以通过函数返回布尔值
> 
> 
> // 这样会报错 应为事实上 new Boolean() 返回的是一个 Boolean 对象 
> let createdBoolean: boolean = new Boolean(1)
> 
> // 事实上 new Boolean() 返回的是一个 Boolean 对象 需要改成
> let createdBoolean: Boolean = new Boolean(1)
> ```
>
> `Boolean`函数非常适合从集合中过滤值
>
> ```ts
> const collection = [
>   { name: 'willy' },
>   undefined,
>   { name: 'cilly' },
>   false,
>   null,
>   NaN,
>   0,
>   '',
>   function () {},
>   {},
>   [],
>   Symbol(),
> ]
> collection.filter(Boolean) 
> // [ { name: 'willy' }, { name: 'cilly' }, function () {}, {}, [], Symbol() ]
> ```
>
> 还可加上`Number`，它会将所有的值转换为`number` 或 `NaN`
>
> ```ts
> const x = ['1.23', 2137123, 'D.O', false, 'O.O', undefined, null]
> 
> x.map(Number).filter(Boolean) // [1.23, 2137123]
> ```
>

#### 任意值 any

> - 如果是一个普通类型，在赋值过程中改变类型是不被允许的；但如果是 `any` 类型，则允许被赋值为任意类型。
> - 弊端：没有限定变量强制使用某种类型，不会对any进行类型检查（应避免使用）
>
> ````ts
> // 没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型
> let anys:any = 123
> anys = '123'
> anys = true
> 
> 
> // 声明变量的时候没有指定任意类型默认为any
> let anys;
> anys = '123'
> anys = true
> ````

#### 任意值 unknow

> - unknown 可以定义任何类型的值
> - unknow类型不能作为子类型只能作为父类型；any可以作为父类型和子类型（即unknow不能赋值给其他类型）
>
> ```ts
> //unknown 可以定义任何类型的值
> let value: unknown;
> value = true;             // OK
> value = 42;               // OK
> value = "Hello World";    // OK
> value = [];               // OK
> value = {};               // OK
> value = null;             // OK
> value = undefined;        // OK
> value = Symbol("type");   // OK
> 
> //这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
> //unknown类型不能赋值给其他类型
> let names:unknown = '123'
> let names2:string = names
> 
> //这样就没问题 any类型是可以的
> let names:any = '123'
> let names2:string = names   
> 
> //unknown可赋值对象只有unknown 和 any
> let bbb:unknown = '123'
> let aaa:any= '456'
> aaa = bbb
> 
> 
> // 如果是any类型在对象没有这个属性的时候还在获取是不会报错的
> let obj:any = {b:1}
> obj.a
> 
> // 如果是unknow 是不能调用属性和方法
> let obj:unknown = {b:1,ccc:():number=>213}
> obj.b
> obj.ccc()
> ```

#### 空值 void

> - void类型像是与any类型相反，它表示没有任何类型。
> - 当一个函数没有返回值，通常其返回值类型是void。
> - 声明一个void类型的变量没作用，因为只能给它赋undefined和null
> - void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数
> - 注意：在`tsconfig.json`（`{"compilerOptions":{ "strict": true }}`）中开启严格模式后，null 不能 赋予 void 类型
>
> ```ts
> function voidFn(): void {
>     console.log('test void')
> }
> 
> 
> // void也可以定义undefined 和 null类型
> let u: void = undefined
> let n: void = null;
> ```

#### null 和 undefined 

> - null和undefined是所有类型的子类型
> - 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string 类型的变量
>
> ```ts
> //这样写会报错 void类型不可以分给其他类型
> let test: void = undefined
> let num2: string = "1"
> num2 = test
> 
> 
> //这样是没问题的
> let test: null = null
> let num2: string = "1"
> num2 = test
> 
> //或者这样的
> let test: undefined = undefined
> let num2: string = "1"
> num2 = test
> ```

### 类型推论

> ```bash
> ## 概述
> - 类型推论：在没有明确的指定类型时，TypeScript 会依照类型推论的规则推断出一个类型。
> - 如果定义时没有赋值，不管之后有没有赋值，都会被推断成 any 类型而导致完全不被类型检查。
> 
> 
> ## 什么是类型推论
> 	以下代码虽然没有指定类型，但是会在编译的时候报错：
>     let myFavoriteNumber = 'seven';
>     myFavoriteNumber = 7;
> 		// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
> 
>   事实上，它等价于：
>     let myFavoriteNumber: string = 'seven';
>     myFavoriteNumber = 7;
>     // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
>     
> 
> ## 注意
> - 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
>     let myFavoriteNumber;
>     myFavoriteNumber = 'seven';
>     myFavoriteNumber = 7;
> 
> ```

### 联合类型

> ```bash
> ## 概述
> - 联合类型（Union Types）表示取值可以为多种类型中的一种。
> - 如果一个值是联合类型，我们只能访问此联合类型的所有类型公有的成员。(写不包含在里面类型的数据，会报错)
> - 联合类型使用 `|` 分隔每个类型
> 
> 
> ## 例子
> 通过竖线`|`分隔每个类型，所以 `number | string | boolean` 表示一个值可以是number,string或boolean。
>     let numberOrString: number | string;
>     numberOrString = 111;
>     numberOrString = 'abc';
>     
>     
> ## 访问联合类型的属性或方法
> 当 TypeScript 不确定一个联合类型的变量是哪个类型时，我们只能访问此联合类型的所有类型里共有的属性或方法
>     function getString(something: string | number): string {
>     	  console.log(something.length) // error， length 不是 string 和 number 的共有属性，所以会报错
>         return something.toString();
>     }
>     
>   
> ## 联合类型 & 类型推论
> 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
>     let myFavoriteNumber: string | number;
>     myFavoriteNumber = 'seven';
>     console.log(myFavoriteNumber.length); // 5
>     myFavoriteNumber = 7;
>     console.log(myFavoriteNumber.length); // 编译时报错
> 
>     // index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
>     上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。
> 		而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。
> 
> ```

### 对象类型：接口

> ```bash
> ## 接口概述
> - 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型
> - 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）
> 
> ## 接口使用规范
> - 接口一般首字母大写。有的编程语言中会建议接口的名称加上 `I` 前缀
> - 赋值的时候，变量的形状必须和接口的形状保持一致。即定义的变量比接口少了一些属性是不允许的(可以通过可选属性来规避)，多一些属性也是不允许的
> - 可选属性的含义是该属性可以不存在
> ```

#### 简单接口定义

> ```ts
> interface Person {
>       name: string
>       age: number
>       getName:(name: string) => void
>       cb():void
>       b?: string
>       readonly a: string
>       [propName: string]: any
> }
> let willy: Person = {
>       name: 'willy',
>       age: 16,
>       getName: (name: string) => {console.log(name)},
>       a: "213",
>       c: "123",
>       cb:() => {  console.log(123) }
> }
> ```

#### 可选属性 ?操作符

> - 可选属性的含义是该属性可以不存在。这时仍然不允许添加未定义的属性
>
> ```ts
> interface Person {
> 	name: string;
> 	age?: number;
> 	getName?:(name: string) => void
> }
> let willy: Person = {
> 	name: 'willy'
> };
> ```

#### 只读属性 readonly

> - 一些对象属性只能在对象刚创建时改其值。可在属性名前用`readonly`来指定只读属性
> - **注意**：只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
> - **const和readyonly的区别**：const是用来定义变量的；readonly是用来定义属性的
>
> ```ts
> interface Person {
> 	readonly id: number;
> 	name: string;
> }
> let willy: Person = {
> 	id: 124,
> 	name: 'willy'
> };
> //willy.id = 1324;	//ERROR，会报错
> ```
>

#### 任意属性 [propName: string]

> - 有时候，我们希望一个接口允许有任意的属性
> - **注意**：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
>
> ```ts
> interface Person {
>     name: string;
>     age?: number;
>     [propName: string]: any; // 使用 [propName: string] 定义了任意属性取 string 类型的值
> }
> 
> let tom: Person = {
>     name: 'Tom',
>     gender: 'male'
> };
> 
> // 错误示例
> let willy: Person = {
>     name: 'willy',
>     age: 25,	// error: Property 'age' of type 'number' is not assignable to string index type 'string'.
>     gender: 'male'
> };
> 
> ------
> 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
> 另外，在报错信息中可以看出，此时 { name: 'willy', age: 25, gender: 'male' } 的类型被推断成了 { [x: string]: string | number; name: string; age: number; gender: string; }，这是联合类型和接口的结合。
> ------
> 
> // 修正版本
> interface Person {
>     name: string;
>     age?: number;
>     [propName: string]: string | number;
> }
> let willy: Person = {
>     name: 'willy',
>     age: 25,
>     gender: 'male'
> };
> ```

#### const 和 readonly 的区别

```bash
### const 和 readonly 的区别
TypeScript 中 readonly 和 const 都可以用于声明不可修改的变量或属性，但它们有着不同的使用场景和限制：
- const 适用于基本类型数据和对象字面量，一旦声明后就不能再修改。
- const 变量在代码运行时被计算出，并且只在其块级作用域内有效。
- const 常量用于算法和常量值，并且需要在编译时解析。

- readonly 适用于对象属性，可以在对象实例化后再次进行赋值，但不能再次被修改。
- readonly 访问器必须由getter访问器或值初始化。
- readonly 常用于对象中的属性，可以使用对象字面量来初始化，其属性值可以在运行时更改。

如果需要不可变的常量值，使用 const 变量更合适；如果需要仅允许在初始化后更改的对象属性，则可以使用readonly属性。

> 注意：在给定的类中，如果一个属性只有 getter 方法而没有 setter 方法，它将被视为只读。
> 如在 React 中不允许直接更改组件的 props 和 state。因为 props 是不可变的，state 可通过 setState() 方法更新。
```

```ts
/** const 用于定义常量 */
const message = 'Hello'
// message = 'World' // 会报错


/** readonly 用于属性的声明 */
class Triangle {
  public readonly numberOfVertices = 3
}
const triangle = new Triangle()
triangle.numberOfVertices = 4 // 会报错


/** 只设置 getter 不设置 setter 会被视为只读 */
class Square {
  side: number = 0
  get area() { return this.side * this.side }
}
const s = new Square()
// s.area = 100 // 会报错
```



### 数组的类型

> - 数组中只能出现该类型的值，否则会报错。
>
> - 在数组最后添加数组：`数组名[数组名.length] = 值`
> - 定义数组：
>   1. [类型 + 方括号]表示法：`let arrayName: 元素类型[] = [值]`
>   2. 数组泛型：`let arrayName: Array<元素类型> = [值]`
>   3. 接口表示：`let arrayNmme: { [index: number]: 元素类型 } = [值]`
>
> ```ts
> //let names: string[] = new Array('abc','def','ijk')
> //相当于（更推荐下面的写法）
> let names: string[] = ['abc','def','ijk']
> names[names.length]="willy"		//在数组最后面添加元素
> names[names.length]="willy1"
> console.log(names[names.length-1])	//输出最后数组最后一个元素
> 
> 
> /*数组泛型 Array<elemType>*/
> let fibonacci: Array<number> = [1,2,3,4,5];
> 
> 
> /*接口表示数组*/
> interface NumberArray{
> 	[index: number]: number;
> }
> let fibonacci: NumberArray = [1,2,3,4,5];
> ```

#### 类数组（伪数组）

> - 类数组（伪数组）不是数组类型，不能赋值给数组，也不调用数组的一些方法。常见的类数组如 `arguments`。
> - `arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
> - 事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等
> - 其中 `IArguments` 是 TypeScript 中定义好了的类型
>
> ```ts
> //function sum() { let args: number[] = arguments; }
> interface IArguments {
>   [index: number]: any;
>   length: number;
>   callee: Function;
> }
> function sum() {
>   let args: IArguments = arguments;
> }
> ```

#### any在数组中的应用

> 一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型
>
> ```ts
> let list: any[] = ['xxx', 24, { website:'https://willy.com' }];
> ```
>

#### 元组

> 组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
>
> ```ts
> let user: [string, number] = ['Willy', 17];	 //长度跟数据类型要一一对应
> ```

### 函数的类型

> ```bash
> ## 函数声明
>   - 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单
>   - 注意，输入多余的（或者少于要求的）参数，是不被允许的
> 
>       function sum(x: number, y: number): number { 
>         return x + y; 
>       }
>       sum(1, 2);
>       sum(1, 2, 3); // error
> 
> 
> 
> ## 函数表达式
>   - 在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
>   - 注意：（与ES6中的=>不一致）
> 
>       let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
>           return x + y;
>       };	
> 
> 
> ## 接口定义函数形状
>   - 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
>       interface SearchFunc {
>           (source: string, subString: string): boolean;
>       }
> 
>       let mySearch: SearchFunc;
>       mySearch = function(source: string, subString: string) {
>           return source.search(subString) !== -1;
>       }
> ```

#### 可选参数

> - 与接口中的可选属性类似，我们用 `?` 表示可选的参数。
> - **注意**：可选参数必须接在必须参数后面（即可选参数后面不允许再出现必须参数，否则会报错）
>
> ```ts
> function buildName(firstName: string, lastName?: string) {
>   if (lastName) return firstName + ' ' + lastName;
>   else return firstName;
> }
> let tomcat = buildName('Tom', 'Cat');	//lastName属性写
> let tom = buildName('Tom');	//lastName属性不写
> ```

#### 参数默认值

> 在ES6中，允许给函数的参数添加默认值，TypeScript会将添加了默认值的参数识别为可选参数。
>
> ```ts
> function buildName(firstName: string, lastName: string = 'Cat') {
>   return firstName + ' ' + lastName;
> }
> let fun1 = buildName('Tom', 'Cat');
> let fun2 = buildName('Tom');
> let fun3 = buildName(undefined, 'Cat');
> let fun3 = buildName('Tom', undefined);
> ```
>

#### 剩余参数

> - ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）
>
> ```ts
> function push(array: any[], ...items: any[]) {
>   items.forEach(function(item) {
>     array.push(item);
>   });
> }
> 
> let a = [];
> push(a, 1, 2, 3);
> ```

#### 重载

> ```bash
> ## 函数重载概述
> - 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
> - 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'
> 
> 
> ## 利用联合类型实现重载
>   - 联合类型实现重载的缺点：不能够精确的表达，输入为数字时，输出也应该为数字；输入为字符串时，输出也应该为字符串
>       function reverse(x: number | string): number | string | void {
>         if (typeof x === 'number') return Number(x.toString().split('').reverse().join(''));
>         else if (typeof x === 'string') return x.split('').reverse().join('');
>       }
> 
> 
> ## 用重载定义多个同名函数
>   - 我们重复定义了多次函数，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
>   - 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
>       function reverse(x: number): number;
>       function reverse(x: string): string;
>       function reverse(x: number | string): number | string | void {
>           if (typeof x === 'number') {
>               return Number(x.toString().split('').reverse().join(''));
>           } else if (typeof x === 'string') {
>               return x.split('').reverse().join('');
>           }
>       }
> ```

#### **类型推论**

> 在赋值过程中，存在某些变量没有明确被定义，被推测出是一个函数类型：`(x:number, y:number, z?:number)=>number`
>
> ```ts
> const myadd = function(x: number, y:number, z:number = 10){
> 	if(typeof z === 'number') return x*y*z;
> 	return x*y;
> }
> const myadd2: (x:number, y:number, z?:number) => number = myadd;
> ```
>

### 类型断言

> ```bash
> ## 类型断言概述
> - 类型断言（Type Assertion）可以用来手动指定一个值的类型
> - 联合类型只能访问共用的属性和方法。借助类型断言，可以告诉编辑器，你没办法判断我的代码，我比你更清楚。
> 
> ## 类型断言语法
> - 语法：`值 as 类型` 或 `<类型>值`
> - 注意：在 tsx 语法中必须使用`值 as 类型`的方式
> 
> 
> ## 类型断言的用途
> 1. 将一个联合类型断言为其中一个类型
>   - 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法
>   - 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，则此时 TS 则会因为不确定类型而报错，对此我们可以使用类型断言，指定该值的准确类型
>   - 注意：类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
> 	
> 2. 将一个父类断言为更加具体的子类
> 
> ```
>
> ```ts
> //方法一：
> function getLength(input: string | number): number {
> 	const str = input as String;
> 	if(str.length) return str.length;
> 	else {
> 		const number = input as Number;
> 		return number.toString().length;
> 	}
> }
> 
> 
> //断言方法二：在变量前面加上一个尖括号
> function getLength(input: string | number): number {
> 	if((<string>input).length) return (<string>input).length;
> 	else return (<number>input).toString().length;
> }
> ```
>

#### 用途一：将一个联合类型断言为其中一个类型

> - 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法
> - 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，则此时 TS 则会因为不确定类型而报错，对此我们可以使用类型断言，指定该值的准确类型
> - 注意：类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
>
> ```ts
> interface Cat { 
>   name: string; 
>   run(): void; 
> }
> interface Fish { 
>   name: string; 
>   swim(): void; 
> }
> function swim(animal: Cat | Fish) {
>   (animal as Fish).swim();
> }
> const tom: Cat = {
>   name: 'Tom',
>   run() { console.log('run') }
> };
> swim(tom); // Uncaught TypeError: animal.swim is not a function`
> 
> // 报错原因： (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误
> ```

#### 用途二：将一个父类断言为更加具体的子类

> ```ts
> class ApiError extends Error {
>   code: number = 0;
> }
> class HttpError extends Error {
>   statusCode: number = 200;
> }
> 
> function isApiError(error: Error) {
>   if (typeof (error as ApiError).code === 'number') { return true; }
>   // if (error instanceof ApiError) { return true; }
>   return false;
> }
> ```
>
> 上面的例子中，我们声明了函数 `isApiError`，它用来判断传入的参数是不是 `ApiError` 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 `Error`，这样的话这个函数就能接受 `Error` 或它的子类作为参数了。
>
> 但是由于父类 `Error` 中没有 `code` 属性，故直接获取 `error.code` 会报错，需要使用类型断言获取 `(error as ApiError).code`。
>
> 上面的例子中，确实使用 `instanceof` 更加合适，因为 `ApiError` 是一个 JavaScript 的类，能够通过 `instanceof` 来判断 `error` 是否是它的实例。
>
> 但是有的情况下 `ApiError` 和 `HttpError` 不是一个真正的类，而只是一个 TypeScript 的接口（`interface`），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 `instanceof` 来做运行时判断了；此时就只能用类型断言，通过判断是否存在 `code` 属性，来判断传入的参数是不是 `ApiError` 

#### 用途三：将任何一个类型断言为 `any`

> 理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。
>
> 当我们引用一个在此类型上不存在的属性或方法时，就会报错：
>
> ```ts
> const foo: number = 1;
> foo.length = 1;
> 
> // index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
> ```
>
> 上面的例子中，数字类型的变量 `foo` 上是没有 `length` 属性的，故 TypeScript 给出了相应的错误提示。
>
> 这种错误提示显然是非常有用的。但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：
>
> ```ts
> window.foo = 1;
> 
> // index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
> ```
>
> 上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。
>
> 此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：
>
> ```ts
> (window as any).foo = 1;
> ```
>
> 在 `any` 类型的变量上，访问任何属性都是允许的。
>
> 需要注意的是，将一个变量断言为 `any` 可以说是解决 TypeScript 中类型问题的最后一个手段。
>
> **它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 `as any`。**
>
> 上面的例子中，我们也可以通过`扩展 window 的类型（TODO）`解决这个错误，不过如果只是临时的增加 `foo` 属性，`as any` 会更加方便。
>
> 总之，**一方面不能滥用 `as any`，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**（这也是 [TypeScript 的设计理念https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals)之一），才能发挥出 TypeScript 最大的价值。

#### 用途四：将 `any` 断言为一个具体的类型

> 在日常的开发中，我们不可避免的需要处理 `any` 类型的变量，它们可能是由于第三方库未能定义好自己的类型，也有可能是历史遗留的或其他人编写的烂代码，还可能是受到 TypeScript 类型系统的限制而无法精确定义类型的场景。
>
> 遇到 `any` 类型的变量时，我们可以选择无视它，任由它滋生更多的 `any`。
>
> 我们也可以选择改进它，通过类型断言及时的把 `any` 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。
>
> 举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any`：
>
> ```ts
> function getCacheData(key: string): any {
>     return (window as any).cache[key];
> }
> ```
>
> 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
>
> ```ts
> function getCacheData(key: string): any {
>     return (window as any).cache[key];
> }
> 
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const tom = getCacheData('tom') as Cat;
> tom.run();
> ```
>
> 上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

#### 类型断言的限制

> ```bash
> ## 类型断言的限制
> - 若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A
> - 同理，若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A
> - 总结：要使得 A 能够被断言为 B，只需要 A 兼容 B，或 B 兼容 A 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的
> 
> 
> ## 说明
> - 允许 `animal as Cat` 是因为「父类可以被断言为子类」
> - 允许 `cat as Animal` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」
> 
> 
> ## 综述
> - 联合类型可以被断言为其中一个类型
> - 父类可以被断言为子类
> - 任何类型都可以被断言为 any
> - any 可以被断言为任何类型
> - 要使得 A 能够被断言为 B，只需要 A 兼容 B ，或 B 兼容 A 即可
> ```

#### 双重断言

> 既然：
>
> - 任何类型都可以被断言为 any
> - any 可以被断言为任何类型
>
> 那么我们是不是可以使用双重断言 `as any as Foo` 来将任何一个类型断言为任何另一个类型呢？
>
> ```ts
> interface Cat {
>     run(): void;
> }
> interface Fish {
>     swim(): void;
> }
> 
> function testCat(cat: Cat) {
>     return (cat as any as Fish);
> }
> ```
>
> 在上面的例子中，若直接使用 `cat as Fish` 肯定会报错，因为 `Cat` 和 `Fish` 互相都不兼容。
>
> 但是若使用双重断言，则可以打破「要使得 `A` 能够被断言为 `B`，只需要 `A` 兼容 `B` 或 `B` 兼容 `A` 即可」的限制，将任何一个类型断言为任何另一个类型。
>
> 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
>
> **除非迫不得已，千万别用双重断言。**

#### 类型断言 vs 类型转换

> 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
>
> ```ts
> function toBoolean(something: any): boolean {
>     return something as boolean;
> }
> 
> toBoolean(1); // 返回值为 1
> ```
>
> 在上面的例子中，将 `something` 断言为 `boolean` 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：
>
> ```js
> function toBoolean(something) {
>     return something;
> }
> 
> toBoolean(1); // 返回值为 1
> ```
>
> 所以类型断言不是类型转换，它不会真的影响到变量的类型。
>
> 若要进行类型转换，需要直接调用类型转换的方法：
>
> ```ts
> function toBoolean(something: any): boolean {
>     return Boolean(something);
> }
> 
> toBoolean(1); // 返回值为 true
> ```

#### 类型断言 vs 类型声明

> ```ts
> function getCacheData(key: string): any {
>     return (window as any).cache[key];
> }
> 
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const tom = getCacheData('tom') as Cat;
> tom.run();
> ```
>
> 我们使用 `as Cat` 将 `any` 类型断言为了 `Cat` 类型。
>
> 但实际上还有其他方式可以解决这个问题：
>
> ```ts
> function getCacheData(key: string): any {
>     return (window as any).cache[key];
> }
> 
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const tom: Cat = getCacheData('tom');
> tom.run();
> ```
>
> 上面的例子中，我们通过类型声明的方式，将 `tom` 声明为 `Cat`，然后再将 `any` 类型的 `getCacheData('tom')` 赋值给 `Cat` 类型的 `tom`。
>
> 这和类型断言是非常相似的，而且产生的结果也几乎是一样的——`tom` 在接下来的代码中都变成了 `Cat` 类型。
>
> 它们的区别，可以通过这个例子来理解：
>
> ```ts
> interface Animal {
>     name: string;
> }
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const animal: Animal = {
>     name: 'tom'
> };
> let tom = animal as Cat;
> ```
>
> 在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `animal` 断言为 `Cat` 赋值给 `tom`。
> 但是若直接声明 `tom` 为 `Cat` 类型：
>
> ```ts
> interface Animal {
>     name: string;
> }
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const animal: Animal = {
>     name: 'tom'
> };
> let tom: Cat = animal;
> // index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
> ```
>
> 则会报错，不允许将 `animal` 赋值为 `Cat` 类型的 `tom`。
> 这很容易理解，`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。
>
> 深入的讲，它们的核心区别就在于：
>
> - `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
> - `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行
>
> 但是 `Cat` 并不兼容 `Animal`。
>
> 而在前一个例子中，由于 `getCacheData('tom')` 是 `any` 类型，`any` 兼容 `Cat`，`Cat` 也兼容 `any`，故
>
> ```ts
> const tom = getCacheData('tom') as Cat;
> ```
>
> 等价于
>
> ```ts
> const tom: Cat = getCacheData('tom');
> ```
>
> 知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。
>
> 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅。

#### 类型断言 vs 泛型

> ```ts
> function getCacheData(key: string): any {
>     return (window as any).cache[key];
> }
> 
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const tom = getCacheData('tom') as Cat;
> tom.run();
> ```
>
> 我们还有第三种方式可以解决这个问题，那就是泛型：
>
> ```ts
> function getCacheData<T>(key: string): T {
>     return (window as any).cache[key];
> }
> 
> interface Cat {
>     name: string;
>     run(): void;
> }
> 
> const tom = getCacheData<Cat>('tom');
> tom.run();
> ```
>
> 通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案

### 声明文件

> ```bash
> # 声明文件
> 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
> 注意：声明文件必需以 `.d.ts` 为后缀。
> 
> 
> ## 声明定义语法
>   - declare var 声明全局变量
>   - declare function 声明全局方法
>   - declare class 声明全局类
>   - declare enum 声明全局枚举类型
>   - declare namespace 声明（含有子属性的）全局对象
>   - declare global 扩展全局变量
>   - declare module 扩展模块
>   
>   - interface 和 type 声明全局类型
>   
>   - export 导出变量
>   - export namespace 导出（含有子属性的）对象
>   - export default ES6 默认导出
>   - export = commonjs 导出模块
>   - export as namespace UMD 库声明全局变量
>   
>   - `/// <reference />` 三斜线指令
>   
>   
>   
> ## declare 关键字
> declare 关键字可以给出外部变量的类型描述，用来告诉编译器某个类型是存在的，可以在当前文件中使用。
> 它的主要作用，就是让当前文件可以使用其他文件声明的类型。举例来说，自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用declare关键字，告诉编译器外部函数的类型。这样的话，编译单个脚本就不会因为使用了外部类型而报错。
> 
> 
> ### 第三方声明文件的识别
> 一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `jQuery.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `jQuery` 的类型定义了。
> 假如仍然无法解析，那么可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。
> 
> ```

#### 书写声明文件

> 当一个第三方库没有提供声明文件时，就需要自己书写声明文件了。在不同的场景下，声明文件的内容和使用方式会有所区别。
>
> 库的使用场景主要有以下几种：
>
> - **全局变量**：通过 `<script>` 标签引入第三方库，注入全局变量
> - **npm 包**：通过 `import foo from 'foo'` 导入，符合 ES6 模块规范
> - **UMD 库**：既可以通过 `<script>` 标签引入，又可以通过 `import` 导入
> - **直接扩展全局变量**：通过 `<script>` 标签引入后，改变一个全局变量的结构
> - **在 npm 包或 UMD 库中扩展全局变量**：引用 npm 包或 UMD 库后，改变一个全局变量的结构
> - **模块插件**：通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

#### 全局变量

> 通过 `<script>` 标签引入第三方库，从而可以使用全局变量的声明文件时，如果是以 `npm install @types/xxx --save-dev` 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 `src` 目录下（或者对应的源码目录下）：
>
> ```autoit
>/path/to/project
> ├── src
> |  ├── index.ts
> |  └── jQuery.d.ts
> └── tsconfig.json
> ```
> 
> 如果没有生效，可以检查下 `tsconfig.json` 中的 `files`、`include` 和 `exclude` 配置，确保其包含了 `jQuery.d.ts` 文件。
>
> 全局变量的声明文件主要有以下几种语法：
>
> - `declare var`声明全局变量
>- `declare function`声明全局方法
> - `declare class`声明全局类
> - `declare enum`声明全局枚举类型
> - `declare namespace`声明（含有子属性的）全局对象
> - `interface` 和 `type`声明全局类型

#### declare var

> 在所有的声明语句中，`declare var` 是最简单的，如之前所学，它能够用来定义一个全局变量的类型。与其类似的，还有 `declare let` 和 `declare const`，使用 `let` 与使用 `var` 没有什么区别：
>
> ```ts
> // src/jQuery.d.ts
> declare let jQuery: (selector: string) => any;
> 
> 
> // src/index.ts
> jQuery('#foo');
> 
> // 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
> jQuery = function(selector) {
>     return document.querySelector(selector);
> };
> ```
>
> 而当我们使用 `const` 定义时，表示此时的全局变量是一个常量，不允许再去修改它的值了
>
> ```ts
> // src/jQuery.d.ts
> declare const jQuery: (selector: string) => any;
> 
> jQuery('#foo');
> 
> // 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
> jQuery = function(selector) {
>     return document.querySelector(selector);
> };
> // ERROR: Cannot assign to 'jQuery' because it is a constant or a read-only property.
> ```
>
> 一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 `const` 而不是 `var` 或 `let`。
> 需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现
>
> ```ts
> declare const jQuery = function(selector) {
>     return document.querySelector(selector);
> };
> // ERROR: An implementation cannot be declared in ambient contexts.
> ```

#### declare function

> `declare function` 用来定义全局函数的类型。在函数类型的声明语句中，函数重载也是支持的。
>
> 注意，这种单独的函数类型声明语句，只能用于`declare`命令后面。一方面，TypeScript 不支持单独的函数类型声明语句；另一方面，declare 关键字后面也不能带有函数的具体实现。
> 
> ```ts
> // src/jQuery.d.ts
> declare function jQuery(selector: string): any;
> declare function jQuery(domReadyCallback: () => any): any;
> 
>
> // src/index.ts
>jQuery('#foo');
> jQuery(function() {
>     alert('Dom Ready!');
> });
> ```

#### declare class

> 当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型
>
> ```ts
> declare class C {
>     // 静态成员
>     public static s0():string;
>     private static s1:string;
> 
>     // 属性
>     public a:number;
>     private b:number;
> 
>     // 构造函数
>     constructor(arg:number);
> 
>     // 方法
>     m(x:number, y:number):number;
> 
>     // 存取器
>     get c():number;
>     set c(value:number);
> 
>     // 索引签名
>     [index:string]:any;
> }
> ```
>
> 同样的，`declare class` 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 `sayHi` 方法的具体实现则会报错：
>
> ```ts
> // src/Animal.d.ts
> declare class Animal {
>     name: string;
>     constructor(name: string);
> 	sayHello(): string;
>     sayHi() {
>         return `My name is ${this.name}`;
>     };
>     // ERROR: An implementation cannot be declared in ambient contexts.
> }
> ```

#### declare enum

> 使用 `declare enum` 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下
>
> ```ts
> // src/Directions.d.ts
> declare enum Directions {
>        Up,
>        Down,
>        Left,
>        Right
> }
> 
> 
> // src/index.ts
> let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
> ```
>
> 与其他全局变量的类型声明一致，`declare enum` 仅用来定义类型，而不是具体的值。
> `Directions.d.ts` 仅仅会用于编译时的检查，声明文件里的内容在编译结果中会被删除。它编译结果是：
>
> ```js
> var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
> ```
>
> 其中 `Directions` 是由第三方库定义好的全局变量。

#### `declare namespace`

> ```bash
> ## declare namespace
> - namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。
> - 注意：declare module 和 declare namespace 里面，加不加 export 关键字都可以。
> 
> 
> 由于历史遗留原因，在早期还没有 ES6 的时候，ts 提供了一种模块化方案，使用 `module` 关键字表示内部模块。但由于后来 ES6 也使用了 `module` 关键字，ts 为了兼容 ES6，使用 `namespace` 替代了自己的 `module`，更名为命名空间。
> 随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 `namespace`，而推荐使用 ES6 的模块化方案了。
> `namespace` 虽然被淘汰了，但是在声明文件中，`declare namespace` 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。
> 
> ```
>
> ```ts
> declare namespace AnimalLib {
>     class Animal {
>         constructor(name: string)
>         eat(): void
>         sleep(): void
>     }
> 
>     type Animals = "Fish" | "Dog"
> }
> 
> // 或者
> declare module AnimalLib {
>     class Animal {
>         constructor(name: string)
>         eat(): void
>         sleep(): void
>     }
> 
>     type Animals = "Fish" | "Dog"
> }
> 
> ```
>
> 注意，在 `declare namespace` 内部，我们直接使用 `function ajax` 来声明函数，而不是使用 `declare function ajax`。类似的，也可以使用 `const`, `class`, `enum` 等语句：
>
> ```ts
> // src/jQuery.d.ts
> declare namespace jQuery {
>     function ajax(url: string, settings?: any): void
>     const version: number
>     class Event {
>         blur(eventType: EventType): void
>     }
>     enum EventType {
>         CustomClick,
>     }
> }
> 
> // src/index.ts
> jQuery.ajax("/api/get_something")
> console.log(jQuery.version)
> const e = new jQuery.Event()
> e.blur(jQuery.EventType.CustomClick)
> 
> ```

##### 嵌套的命名空间

> 如果对象拥有深层的层级，则需要用嵌套的 `namespace` 来声明深层的属性的类型
>
> ```ts
> // src/jQuery.d.ts
> declare namespace jQuery {
>        function ajax(url: string, settings?: any): void
>        namespace fn {
>            function extend(object: any): void
>        }
> }
>   
>   // src/index.ts
> jQuery.ajax("/api/get_something")
> jQuery.fn.extend({
>     check: function () {
>            return this.each(function () {
>                this.checked = true
>            })
>        },
>    })
> 
> ```
>
> 假如 `jQuery` 下仅有 `fn` 这一个属性（没有 `ajax` 等其他属性或方法），则可以不需要嵌套 `namespace`
>
> ```ts
> // src/jQuery.d.ts
> declare namespace jQuery.fn {
>     function extend(object: any): void;
> }
>   
>   
> // src/index.ts
> jQuery.fn.extend({
>     check: function() {
>         return this.each(function() {
>             this.checked = true;
>         });
>     }
> });
> ```

#### 对另一个模块扩展

> 一个项目有多个模块，可以在一个模块中，对另一个模块的接口进行类型扩展。
>
> ```ts
> // a.ts
> export interface A {
>     x: number
> }
> 
> // b.ts
> import { A } from "./a"
> 
> declare module "./a" {
>     interface A {
>         y: number
>     }
> }
> 
> const a: A = { x: 0, y: 0 }
> 
> ```

##### 防止命名冲突

> 暴露在最外层的 `interface` 或 `type` 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 `namespace` 下
>
> ```ts
> // src/jQuery.d.ts
> declare namespace jQuery {
>       interface AjaxSettings {
>           method?: 'GET' | 'POST'
>           data?: any;
>       }
>       function ajax(url: string, settings?: AjaxSettings): void;
> }
> ```
>
> 注意，在使用这个 `interface` 的时候，也应该加上 `jQuery` 前缀：
>
> ```ts
> // src/index.ts
> 
> let settings: jQuery.AjaxSettings = {
>       method: 'POST',
>       data: {
>           name: 'foo'
>       }
> };
> jQuery.ajax('/api/post_something', settings);
> ```

#### 声明合并

> 假如 jQuery 既是一个函数，可以直接被调用 `jQuery('#foo')`，又是一个对象，拥有子属性 `jQuery.ajax()`（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
>
> ```ts
> // src/jQuery.d.ts
> declare function jQuery(selector: string): any;
> declare namespace jQuery {
>     function ajax(url: string, settings?: any): void;
> }
>   
>   
> // src/index.ts
> jQuery('#foo');
> jQuery.ajax('/api/get_something');
> ```

#### npm 包

> 一般我们通过 `import foo from 'foo'` 导入一个 npm 包，这是符合 ES6 模块规范的。
>
> 在我们尝试给一个 npm 包创建声明文件之前，需要先看看它的声明文件是否已经存在。一般来说，npm 包的声明文件可能存在于两个地方：
>
> 1. 与该 npm 包绑定在一起。判断依据是 `package.json` 中有 `types` 字段，或者有一个 `index.d.ts` 声明文件。这种模式不需要额外安装其他包，是最为推荐的，所以以后我们自己创建 npm 包的时候，最好也将声明文件与 npm 包绑定在一起。
> 2. 发布到 `@types` 里。我们只需要尝试安装一下对应的 `@types` 包就知道是否存在该声明文件，安装命令是 `npm install @types/foo --save-dev`。这种模式一般是由于 npm 包的维护者没有提供声明文件，所以只能由其他人将声明文件发布到 `@types` 里了。
>
> 假如以上两种方式都没有找到对应的声明文件，那么我们就需要自己为它写声明文件了。由于是通过 `import` 语句导入的模块，所以声明文件存放的位置也有所约束，一般有两种方案：
>
> 1. 创建一个 `node_modules/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。这种方式不需要额外的配置，但是 `node_modules` 目录不稳定，代码也没有被保存到仓库中，无法回溯版本，有不小心被删除的风险，故不太建议用这种方案，一般只用作临时测试。
> 2. 创建一个 `types` 目录，专门用来管理自己写的声明文件，将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中。这种方式需要配置下 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段。
>
> 目录结构：
>
> ```autoit
> /path/to/project
> ├── src
> |  └── index.ts
> ├── types
> |  └── foo
> |     └── index.d.ts
> └── tsconfig.json
> ```
>
> `tsconfig.json` 内容：
>
> ```json
> {
>   "compilerOptions": {
>     "module": "commonjs",
>     "baseUrl": "./",
>     "paths": {
>       "*": ["types/*"]
>     }
>   }
> }
> ```
>
> 如此配置之后，通过 `import` 导入 `foo` 时也会去 `types` 目录下寻找对应的模块的声明文件。
>
> 注意 `module` 配置可以有很多种选项，不同的选项会影响模块的导入导出模式。
>
> npm 包的声明文件主要有以下几种语法：
>
> - `export`导出变量
>- `export namespace`导出（含有子属性的）对象
> - `export default`ES6 默认导出
> - `export =` commonjs 导出模块

##### `export`

> npm 包的声明文件与全局变量的声明文件有很大区别。在 npm 包的声明文件中，使用 `declare` 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 `export` 导出，然后在使用方 `import` 导入后，才会应用到这些类型声明
>
> `export` 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现
>
> ```ts
> // types/foo/index.d.ts
> export const name: string;
> export function getName(): string;
> export class Animal {
>        constructor(name: string);
>        sayHi(): string;
> }
> export enum Directions {
>        Up,
>        Down,
>        Left,
>        Right
> }
> export interface Options {
>        data: any;
> }
> ```
>
> 对应的导入和使用模块应该是这样：
>
> ```ts
> // src/index.ts
> import { name, getName, Animal, Directions, Options } from 'foo';
> 
> console.log(name);
> let myName = getName();
> let cat = new Animal('Tom');
> let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
> let options: Options = {
>        data: {
>            name: 'foo'
>        }
> };
> ```

##### 混用 `declare` 和 `export`

> 我们也可以使用 `declare` 先声明多个变量，最后再用 `export` 一次性导出。上例的声明文件可以等价的改写为
>
> ```ts
> // types/foo/index.d.ts
> declare const name: string;
> declare function getName(): string;
> declare class Animal {
>        constructor(name: string);
>        sayHi(): string;
> }
> declare enum Directions {
>        Up,
>        Down,
>        Left,
>        Right
> }
> interface Options {
>        data: any;
> }
> 
> export { name, getName, Animal, Directions, Options };
> ```
>
> 注意，与全局变量的声明文件类似，`interface` 前是不需要 `declare` 的。

##### `export namespace`

> 与 `declare namespace` 类似，`export namespace` 用来导出一个拥有子属性的对象
>
> ```ts
> // types/foo/index.d.ts
> export namespace foo {
>     const name: string;
>     namespace bar {
>         function baz(): string;
>     }
> }
>   
>   
> // src/index.ts
> import { foo } from 'foo';
> 
> console.log(foo.name);
> foo.bar.baz();
> ```

##### `export default`

> 在 ES6 模块系统中，使用 `export default` 可以导出一个默认值，使用方可以用 `import foo from 'foo'` 而不是 `import { foo } from 'foo'` 来导入这个默认值。
>
> 在类型声明文件中，`export default` 用来导出默认值的类型
>
> ```ts
> // types/foo/index.d.ts
> export default function foo(): string;
> 
> 
> // src/index.ts
> import foo from 'foo';
> foo();
> ```
>
> 注意，只有 `function`、`class` 和 `interface` 可以直接默认导出，其他的变量需要先定义出来，再默认导出
>
> ```ts
> // types/foo/index.d.ts
> export default enum Directions {
> // ERROR: Expression expected.
>     Up,
>     Down,
>     Left,
>     Right
> }
> ```
>
> 上例中 `export default enum` 是错误的语法，需要使用 `declare enum` 定义出来，然后使用 `export default` 导出：
>
> ```ts
> // types/foo/index.d.ts
> declare enum Directions {
>     Up,
>     Down,
>     Left,
>     Right
> }
> 
> export default Directions;
> ```
>
> 针对这种默认导出，我们一般会将导出语句放在整个声明文件的最前面
>
> ```ts
> // types/foo/index.d.ts
> export default Directions;
> declare enum Directions {
>     Up,
>     Down,
>     Left,
>     Right
> }
> ```

##### `export =`

> 在 commonjs 规范中，我们用以下方式来导出一个模块：
>
> ```js
> // 整体导出
> module.exports = foo;
> // 单个导出
> exports.bar = bar;
> ```
>
> 在 ts 中，针对这种模块导出，有多种方式可以导入，第一种方式是 `const ... = require`：
>
> ```js
> // 整体导入
> const foo = require('foo');
> // 单个导入
> const bar = require('foo').bar;
> ```
>
> 第二种方式是 `import ... from`，注意针对整体导出，需要使用 `import * as` 来导入：
>
> ```ts
> // 整体导入
> import * as foo from 'foo';
> // 单个导入
> import { bar } from 'foo';
> ```
>
> 第三种方式是 `import ... require`，这也是 ts 官方推荐的方式：
>
> ```ts
> // 整体导入
> import foo = require('foo');
> // 单个导入
> import bar = foo.bar;
> ```
>
> 对于这种使用 commonjs 规范的库，假如要为它写类型声明文件的话，就需要使用到 `export =` 这种语法了
>
> ```ts
> // types/foo/index.d.ts
> export = foo;
> declare function foo(): string;
> declare namespace foo {
>     const bar: number;
> }
> ```
>
> 需要注意的是，上例中使用了 `export =` 之后，就不能再单个导出 `export { bar }` 了。所以我们通过声明合并，使用 `declare namespace foo` 来将 `bar` 合并到 `foo` 里。
>
> 准确地讲，`export =` 不仅可以用在声明文件中，也可以用在普通的 ts 文件中。实际上，`import ... require` 和 `export =` 都是 ts 为了兼容 AMD 规范和 commonjs 规范而创立的新语法。
>
> 由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 `export =` 这种语法了。但是还是需要再强调下，相比与 `export =`，我们更推荐使用 ES6 标准的 `export default` 和 `export`。

#### UMD 库

> 既可以通过 `<script>` 标签引入，又可以通过 `import` 导入的库，称为 UMD 库。相比于 npm 包的类型声明文件，我们需要额外声明一个全局变量，为了实现这种方式，ts 提供了一个新语法 `export as namespace`。

##### `export as namespace`

> 一般使用 `export as namespace` 时，都是先有了 npm 包的声明文件，再基于它添加一条 `export as namespace` 语句，即可将声明好的一个变量声明为全局变量，举例如下
>
> ```ts
> // types/foo/index.d.ts
> export as namespace foo;
> export = foo;
> 
> declare function foo(): string;
> declare namespace foo {
>     const bar: number;
> }
> ```
>
> 当然它也可以与 `export default` 一起使用：
>
> ```ts
> // types/foo/index.d.ts
> export as namespace foo;
> export default foo;
> 
> declare function foo(): string;
> declare namespace foo {
>     const bar: number;
> }
> ```

##### 直接扩展全局变量

> 有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 ts 编译错误，此时就需要扩展全局变量的类型。比如扩展 `String` 类型
>
> ```ts
> interface String {
>     prependHello(): string;
> }
> 
> 'foo'.prependHello();
> ```
>
> 通过声明合并，使用 `interface String` 即可给 `String` 添加属性或方法。
> 也可以使用 `declare namespace` 给已有的命名空间添加类型声明
>
> ```ts
> // types/jquery-plugin/index.d.ts
> declare namespace JQuery {
>     interface CustomOptions {
>         bar: string;
>     }
> }
> 
> interface JQueryStatic {
>     foo(options: JQuery.CustomOptions): string;
> }
>   
>   
> // src/index.ts
> jQuery.foo({
>     bar: ''
> });
> ```

#### 在 npm 包或 UMD 库中扩展全局变量

> 如之前所说，对于一个 npm 包或者 UMD 库的声明文件，只有 `export` 导出的类型声明才能被导入。所以对于 npm 包或 UMD 库，如果导入此库之后会扩展全局变量，则需要使用另一种语法在声明文件中扩展全局变量的类型，那就是 `declare global`。

##### `declare global`

> 使用 `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型
>
> ```ts
> // types/foo/index.d.ts
> declare global {
>     interface String {
>         prependHello(): string;
>     }
> }
> export {};
> 
> 
> // src/index.ts
> 'bar'.prependHello();
> ```
>
> 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

#### 模块插件

> 有时通过 `import` 导入一个模块插件，可以改变另一个原有模块的结构。此时如果原有模块已经有了类型声明文件，而插件模块没有类型声明文件，就会导致类型不完整，缺少插件部分的类型。ts 提供了一个语法 `declare module`，它可以用来扩展原有模块的类型。

##### `declare module`

> 如果是需要扩展原有模块的话，需要在类型声明文件中先引用原有模块，再使用 `declare module` 扩展原有模块
>
> ```ts
> // types/moment-plugin/index.d.ts
> import * as moment from 'moment';
> 
> declare module 'moment' {
>     export function foo(): moment.CalendarKey;
> }
> 
> 
> // src/index.ts
> import * as moment from 'moment';
> import 'moment-plugin';
> 
> moment.foo();
> ```
>
> `declare module` 也可用于在一个文件中一次性声明多个模块的类型
>
> ```ts
> // types/foo-bar.d.ts
> declare module 'foo' {
>     export interface Foo {
>         foo: string;
>     }
> }
> 
> declare module 'bar' {
>     export function bar(): string;
> }
> 
> 
> // src/index.ts
> import { Foo } from 'foo';
> import * as bar from 'bar';
> 
> let f: Foo;
> bar.bar();
> ```

#### 声明文件中的依赖

> 一个声明文件有时会依赖另一个声明文件中的类型，比如在前面的 `declare module` 的例子中，我们就在声明文件中导入了 `moment`，并且使用了 `moment.CalendarKey` 这个类型：
>
> ```ts
> // types/moment-plugin/index.d.ts
> import * as moment from 'moment';
> 
> declare module 'moment' {
>     export function foo(): moment.CalendarKey;
> }
> ```
>
> 除了可以在声明文件中通过 `import` 导入另一个声明文件中的类型之外，还有一个语法也可以用来导入另一个声明文件，那就是三斜线指令。

##### 三斜线指令

> 与 `namespace` 类似，三斜线指令也是 ts 在早期版本中为了描述模块之间的依赖关系而创造的语法。随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的三斜线指令来声明模块之间的依赖关系了。
>
> 但是在声明文件中，它还是有一定的用武之地。
>
> 类似于声明文件中的 `import`，它可以用来导入另一个声明文件。与 `import` 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 `import`：
>
> - 当我们在**书写**一个全局变量的声明文件时
> - 当我们需要**依赖**一个全局变量的声明文件时
>
> ##### **书写**一个全局变量的声明文件
>
> 这些场景听上去很拗口，但实际上很好理解——在全局变量的声明文件中，是不允许出现 `import`, `export` 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令了
>
> ```ts
> // types/jquery-plugin/index.d.ts
> 
> /// <reference types="jquery" />
> declare function foo(options: JQuery.AjaxSettings): string;
> 
> 
> // src/index.ts
> foo({});
> ```
>
> 三斜线指令的语法如上，`///` 后面使用 xml 的格式添加了对 `jquery` 类型的依赖，这样就可以在声明文件中使用 `JQuery.AjaxSettings` 类型了。
>
> **注意**：三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释。
>
> ##### **依赖**一个全局变量的声明文件
>
> 在另一个场景下，当我们需要依赖一个全局变量的声明文件时，由于全局变量不支持通过 `import` 导入，当然也就必须使用三斜线指令来引入了
>
> ```ts
> // types/node-plugin/index.d.ts
> 
> /// <reference types="node" />
> export function foo(p: NodeJS.Process): string;
> 
> 
> // src/index.ts
> import { foo } from 'node-plugin';
> 
> foo(global.process);
> ```
>
> 在上面的例子中，我们通过三斜线指引入了 `node` 的类型，然后在声明文件中使用了 `NodeJS.Process` 这个类型。最后在使用到 `foo` 的时候，传入了 `node` 中的全局变量 `process`。
>
> 由于引入的 `node` 中的类型都是全局变量的类型，它们是没有办法通过 `import` 来导入的，所以这种场景下也只能通过三斜线指令来引入了。
>
> 以上两种使用场景下，都是由于需要书写或需要依赖全局变量的声明文件，所以必须使用三斜线指令。在其他的一些不是必要使用三斜线指令的情况下，就都需要使用 `import` 来导入。
>
> ##### 拆分声明文件
>
> 当我们的全局变量的声明文件太大时，可以通过拆分为多个文件，然后在一个入口文件中将它们一一引入，来提高代码的可维护性。比如 `jQuery` 的声明文件就是这样的：
>
> ```ts
> // node_modules/@types/jquery/index.d.ts
> 
> /// <reference types="sizzle" />
> /// <reference path="JQueryStatic.d.ts" />
> /// <reference path="JQuery.d.ts" />
> /// <reference path="misc.d.ts" />
> /// <reference path="legacy.d.ts" />
> 
> export = jQuery;
> ```
>
> 其中用到了 `types` 和 `path` 两种不同的指令。它们的区别是：`types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖。
>
> 上例中，`sizzle` 是与 `jquery` 平行的另一个库，所以需要使用 `types="sizzle"` 来声明对它的依赖。而其他的三斜线指令就是将 `jquery` 的声明拆分到不同的文件中了，然后在这个入口文件中使用 `path="foo"` 将它们一一引入。
>
> ##### 其他三斜线指令
>
> 除了这两种三斜线指令之外，还有其他的三斜线指令，比如 `/// <reference no-default-lib="true"/>`, `/// <amd-module />` 等。

#### 自动生成声明文件

> 如果库的源码本身就是由 ts 写的，那么在使用 `tsc` 脚本将 ts 编译为 js 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。
>
> 我们可以在命令行中添加 `--declaration`（简写 `-d`），或者在 `tsconfig.json` 中添加 `declaration` 选项。这里以 `tsconfig.json` 为例：
>
> ```json
> {
>       "compilerOptions": {
>           "module": "commonjs",
>           "outDir": "lib",
>           "declaration": true,
>       }
> }
> ```
>
> 上例中我们添加了 `outDir` 选项，将 ts 文件的编译结果输出到 `lib` 目录下，然后添加了 `declaration` 选项，设置为 `true`，表示将会由 ts 文件自动生成 `.d.ts` 声明文件，也会输出到 `lib` 目录下。
>
> 运行 `tsc` 之后，目录结构如下
>
> ```autoit
> /path/to/project
> ├── lib
> |  ├── bar
> |  |  ├── index.d.ts
> |  |  └── index.js
> |  ├── index.d.ts
> |  └── index.js
> ├── src
> |  ├── bar
> |  |  └── index.ts
> |  └── index.ts
> ├── package.json
> └── tsconfig.json
> ```
>
> 在这个例子中，`src` 目录下有两个 ts 文件，分别是 `src/index.ts` 和 `src/bar/index.ts`，它们被编译到 `lib` 目录下的同时，也会生成对应的两个声明文件 `lib/index.d.ts` 和 `lib/bar/index.d.ts`。它们的内容分别是：
>
> ```ts
> // src/index.ts
> export * from './bar';
> 
> export default function foo() {
>     return 'foo';
> }
> 
> 
> // src/bar/index.ts
> export function bar() {
>     return 'bar';
> }
> 
> 
> // lib/index.d.ts
> export * from './bar';
> export default function foo(): string;
> 
> 
> // lib/bar/index.d.ts
> export declare function bar(): string;
> ```
>
> 可见，自动生成的声明文件基本保持了源码的结构，而将具体实现去掉了，生成了对应的类型声明。
>
> 使用 `tsc` 自动生成声明文件时，每个 ts 文件都会对应一个 `.d.ts` 声明文件。这样的好处是，使用方不仅可以在使用 `import foo from 'foo'` 导入默认的模块时获得类型提示，还可以在使用 `import bar from 'foo/lib/bar'` 导入一个子模块时，也获得对应的类型提示。
>
> 除了 `declaration` 选项之外，还有几个选项也与自动生成声明文件有关，这里只简单列举出来，不做详细演示了：
>
> - `declarationDir` 设置生成 `.d.ts` 文件的目录
> - `declarationMap` 对每个 `.d.ts` 文件，都生成对应的 `.d.ts.map`（sourcemap）文件
> - `emitDeclarationOnly` 仅生成 `.d.ts` 文件，不生成 `.js` 文件

#### 发布声明文件

> 发布声明文件有两种方案：
>
> 1. 将声明文件和源码放在一起
>2. 将声明文件发布到 `@types` 下
> 
> 这两种方案中优先选择第一种方案。保持声明文件与源码在一起，使用时就不需要额外增加单独的声明文件库的依赖了，而且也能保证声明文件的版本与源码的版本保持一致。
>
> 仅当在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request 时，才需要使用第二种方案，将声明文件发布到 `@types` 下。

##### 将声明文件和源码放在一起

> 如果声明文件是通过 `tsc` 自动生成的，那么无需做任何其他配置，只需要把编译好的文件也发布到 npm 上，使用方就可以获取到类型提示了。
>
> 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别：
>
> - 给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址
> - 在项目根目录下，编写一个 `index.d.ts` 文件
> - 针对入口文件（`package.json` 中的 `main` 字段指定的入口文件），编写一个同名不同后缀的 `.d.ts` 文件
>
> 第一种方式是给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址。比如：
>
> ```json
> {
>     "name": "foo",
>     "version": "1.0.0",
>     "main": "lib/index.js",
>     "types": "foo.d.ts",
> }
> ```
>
> 指定了 `types` 为 `foo.d.ts` 之后，导入此库时就会去找 `foo.d.ts` 作为此库的类型声明文件。
>
> `typings` 与 `types` 一样，只是另一种写法。
>
> 如果没有指定 `types` 或 `typings`，那么就会在根目录下寻找 `index.d.ts` 文件，将它视为此库的类型声明文件。
>
> 如果没有找到 `index.d.ts` 文件，那么就会寻找入口文件（`package.json` 中的 `main` 字段指定的入口文件）是否存在对应同名不同后缀的 `.d.ts` 文件。
>
> 比如 `package.json` 是这样时：
>
> ```json
> {
>     "name": "foo",
>     "version": "1.0.0",
>     "main": "lib/index.js"
> }
> ```
>
> 就会先识别 `package.json` 中是否存在 `types` 或 `typings` 字段。发现不存在，那么就会寻找是否存在 `index.d.ts` 文件。如果还是不存在，那么就会寻找是否存在 `lib/index.d.ts` 文件。假如说连 `lib/index.d.ts` 都不存在的话，就会被认为是一个没有提供类型声明文件的库了。
>
> 有的库为了支持导入子模块，比如 `import bar from 'foo/lib/bar'`，就需要额外再编写一个类型声明文件 `lib/bar.d.ts` 或者 `lib/bar/index.d.ts`，这与自动生成声明文件类似，一个库中同时包含了多个类型声明文件。

##### 将声明文件发布到 `@types` 下

> 如果我们是在给别人的仓库添加类型声明文件，但原作者不愿意合并 pull request，那么就需要将声明文件发布到 `@types` 下。
>
> 与普通的 npm 模块不同，`@types` 是统一由 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 管理的。要将声明文件发布到 `@types` 下，就需要给 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 创建一个 pull-request，其中包含了类型声明文件，测试代码，以及 `tsconfig.json` 等。
>
> pull-request 需要符合它们的规范，并且通过测试，才能被合并，稍后就会被自动发布到 `@types` 下。
>

### 内置对象

> ```bash
> # 内置对象
> 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。
> 
> 1. ECMAScript 的内置对象：
> 	ECMAScript 标准提供的内置对象有：`Boolean`、`Error`、`Date`、`RegExp` 等。
> 
> 2. DOM 和 BOM 的内置对象：
> 	DOM 和 BOM 提供的内置对象有：`Document`、`HTMLElement`、`Event`、`NodeList` 等。
> 
> 3. TypeScript 核心库的定义文件：
> 	TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。
> 	注意，TypeScript 核心库的定义中不包含 Node.js 部分。
> 
> 
> 4. 用 TypeScript 写 Nodejs
> Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
> $ npm install @types/node --save-dev
> ```

### 注释指令

> ```bash
> ## 注释指令
> 注释指令指采用 JS 双斜杠注释的形式，向编译器发出的命令。
> 
> 
> ```

#### `// @ts-nocheck`
> `// @ts-nocheck` 告诉编译器不对脚本进行类型检查，可用于 TypeScript 脚本，也可用于 JavaScript 脚本。
>
> ```ts
> // @ts-nocheck
> 
> const element = document.getElementById(123);
> ```
>
> 上面示例中，`document.getElementById(123)`存在类型错误，但是编译器不对该脚本进行类型检查，所以不会报错。

#### `// @ts-check`

> 如果一个 JavaScript 脚本顶部添加了`// @ts-check`，那么编译器将对该脚本进行类型检查，不论是否启用了`checkJs`编译选项。
>
> ```ts
> // @ts-check
> let isChecked = true;
> 
> console.log(isChceked); // 报错
> ```
>
> 上面示例是一个 JavaScript 脚本，`// @ts-check`告诉 TypeScript 编译器对其进行类型检查，所以最后一行会报错，提示拼写错误。

#### `// @ts-ignore`

> `// @ts-ignore`告诉编译器不对下一行代码进行类型检查，可以用于 TypeScript 脚本，也可以用于 JavaScript 脚本。
>
> ```ts
> let x:number;
> 
> x = 0;
> 
> // @ts-ignore
> x = false; // 不报错
> ```
>
> 上面示例中，最后一行是类型错误，变量`x`的类型是`number`，不能等于布尔值。但是因为前面加上了`// @ts-ignore`，编译器会跳过这一行的类型检查，所以不会报错。

#### `// @ts-expect-error`

> `// @ts-expect-error`主要用在测试用例，当下一行有类型错误时，它会压制 TypeScript 的报错信息（即不显示报错信息），把错误留给代码自己处理。
>
> ```ts
> function doStuff(abc: string, xyz: string) {
>   assert(typeof abc === "string");
>   assert(typeof xyz === "string");
>   // do some stuff
> }
> 
> // @ts-expect-error
> expect(() => {
>   doStuff(123, 456);
> }).toThrow();
> ```
>
> 上面示例是一个测试用例，倒数第二行的`doStuff(123, 456)`的参数类型与定义不一致，TypeScript 引擎会报错。但是，测试用例本身测试的就是这个错误，已经有专门的处理代码，所以这里可以使用`// @ts-expect-error`，不显示引擎的报错信息。
>
> 如果下一行没有类型错误，`// @ts-expect-error`则会显示一行提示。
>
> ```ts
> // @ts-expect-error
> console.log(1 + 1);
> // 输出 Unused '@ts-expect-error' directive.
> ```
>
> 上面示例中，第二行是正确代码，这时系统会给出一个提示，表示`@ts-expect-error`没有用到。

### JSDoc

> ```bash
> ## JSDoc
> TypeScript 直接处理 JS 文件时，如果无法推断出类型，会使用 JS 脚本里面的 JSDoc 注释。
> 
> 使用 JSDoc 时有两个基本要求。
> 	1. JSDoc 注释必须以 `/**` 开始，其中星号 `*` 的数量必须为两个。若使用其他形式的多行注释，则 JSDoc 会忽略该条注释。
> 	2. JSDoc 注释必须与它描述的代码处于相邻的位置，并且注释在上，代码在下。
> 
> 
> ### JSDoc有三种主要的注释类型：
>     1. `@param`：用于描述函数参数的类型和名称，以及任何相关的约束条件。
>     2. `@returns`：用于描述函数返回值的类型和名称，以及任何相关的约束条件。
>     3. `@typedef`：用于创建自定义类型的别名，可以将其用于函数参数、返回值等。
> ```

#### @typedef

> `@typedef`命令创建自定义类型，等同于 TypeScript 里面的类型别名。
>
> ```js
> /**
>  * @typedef {(number | string)} NumberLike
>  */
> ```
>
> 上面示例中，定义了一个名为`NumberLike`的新类型，它是由`number`和`string`构成的联合类型，等同于 TypeScript 的如下语句。
>
> ```ts
> type NumberLike = string | number;
> ```

#### @type

> `@type`命令定义变量的类型。
>
> ```js
> /**
>  * @type {string}
>  */
> let a;
> ```
>
> 上面示例中，`@type`定义了变量`a`的类型为`string`。
>
> 在`@type`命令中可以使用由`@typedef`命令创建的类型。
>
> ```js
> /**
>  * @typedef {(number | string)} NumberLike
>  */
> 
> /**
>  * @type {NumberLike}
>  */
> let a = 0;
> ```
>
> 在`@type`命令中允许使用 TypeScript 类型及其语法。
>
> ```js
> /**@type {true | false} */
> let a;
> 
> /** @type {number[]} */
> let b;
> 
> /** @type {Array<number>} */
> let c;
> 
> /** @type {{ readonly x: number, y?: string }} */
> let d;
> 
> /** @type {(s: string, b: boolean) => number} */
> let e;
> ```

#### @param

> `@param`命令用于定义函数参数的类型。
>
> ```js
> /**
>  * @param {string}  x
>  */
> function foo(x) {}
> ```
>
> 如果是可选参数，需要将参数名放在方括号`[]`里面。
>
> ```js
> /**
>  * @param {string}  [x]
>  */
> function foo(x) {}
> ```
>
> 方括号里面，还可以指定参数默认值。
>
> ```js
> /**
>  * @param {string} [x="bar"]
>  */
> function foo(x) {}
> ```
>
> 上面示例中，参数`x`的默认值是字符串`bar`。

#### @return，@returns

> `@return`和`@returns`命令的作用相同，指定函数返回值的类型。
>
> ```js
> /**
>  * @return {boolean}
>  */
> function foo() {
>   return true;
> }
> 
> /**
>  * @returns {number}
>  */
> function bar() {
>   return 0;
> }
> ```

#### @extends 和类型修饰符

> `@extends`命令用于定义继承的基类。
>
> ```js
> /**
>  * @extends {Base}
>  */
> class Derived extends Base {
> }
> ```
>
> `@public`、`@protected`、`@private`分别指定类的公开成员、保护成员和私有成员。
>
> `@readonly`指定只读成员。
>
> ```js
> class Base {
>   /**
>    * @public
>    * @readonly
>    */
>   x = 0;
> 
>   /**
>    *  @protected
>    */
>   y = 0;
> }
> ```



## 修饰器

> ```bash
> ## 修饰器
> TypeScript 从早期开始，就支持装饰器。但是，装饰器的语法后来发生了变化。ECMAScript 标准委员会最终通过的语法标准，与 TypeScript 早期使用的语法有很大差异。
> 
> 目前，TypeScript 5.0 同时支持两种装饰器语法。标准语法可以直接使用，传统语法需要打开--experimentalDecorators编译参数。
> 
> $ tsc --target ES5 --experimentalDecorators
> 
> 
> 装饰器的执行顺序为：属性装饰器 - 方法装饰器（从后向前） - 类装饰器（从后向前）
> ```
>
> ```ts
> /**
>  * @Decorator 修饰器函数的类型定义
>  */
> type Decorator = (
>     /** 所装饰的对象。 */
>     value: DecoratedValue,
>     /** 下文对象，TypeScript 提供一个原生接口 */
>     context: {
>         /** 表示所装饰对象的类型 */
>         kind:
>             | "class"
>             | "method"
>             | "getter"
>             | "setter"
>             | "field"
>             | ("accessor" & string)
> 
>         /** 字符串或者 Symbol 值，所装饰对象的名字，比如类名、属性名等。 */
>         name: string | symbol
> 
>         /** 用来添加类的初始化逻辑。以前，这些逻辑通常放在构造函数里面，对方法进行初始化，现在改成以函数形式传入addInitializer()方法。注意，addInitializer()没有返回值。 */
>         addInitializer?(initializer: () => void): void
> 
>         /** 表示所装饰的对象是否为类的静态成员 */
>         static?: boolean
> 
>         /** 表示所装饰的对象是否为类的私有成员 */
>         private?: boolean
> 
>         /** 一个对象，包含了某个值的 get 和 set 方法 */
>         access: {
>             get?(): unknown
>             set?(value: unknown): void
>         }
>     }
> ) => void | ReplacementValue
> 
> ```

### 类修饰器

> ```bash
> ## 类修饰器
> 类修饰器：在类声明前声明，紧靠着类声明。应用于类构造函数，用来监听、修改、替换类定义，传入一个参数，用来扩展类的属性、方法。
> 
> 类装饰器接受两个参数：value（当前类本身）和context（上下文对象）。其中，context对象的kind属性固定为字符串class。
> 类装饰器一般用来对类进行操作，可以不返回任何值。
> 类装饰器可以返回一个函数，替代当前类的构造方法。
> 
> 
> 
> ### 类修饰器的类型描述
> type ClassDecorator = (
>     /** 当前类本身 */
>     value: Function,
>     /** 上下文对象 */
>     context: {
>         kind: "class";
>         name: string | undefined;
>         addInitializer(initializer: () => void): void;
>     }
> ) => Function | void;
> ```

#### 不传入参数

> ````ts
> function logClass(params: any) {
>    console.log(params) // 这个 params 就是当前的类
>    params.prototype.url = "到家"
>    params.prototype.run = () => {
>         console.log('跑得快')
>    }
> }
> 
> @logClass
> class MyClass {
>    constructor () {}
> }
> 
> const myClass: any = new MyClass()
> console.log(myClass.url)
> myClass.run()
> 
> /* 执行结果：
> 	class { constructor() {} }
> 	到家
> 	跑的快
> */
> ````

#### 传入参数

> ```ts
> function logClass(params: any) {
>    return function (target: any) {	//返回的 target 为调用本装饰器的类
>         console.log(params)
>         console.log(target)
>         target.prototype.url = params
>         target.prototype.run = function () {
>             console.log('跑的快')
>         }
>    }
> }
> 
> @logClass('到家')
> class MyClass {
>     constructor () {}
> }
> 
> const myClass: any = new MyClass()
> myClass.run()
> console.log(myClass.url);
> 
> /* 执行结果：
> 	class { constructor() {} }
> 	到家
> 	跑的快
> 	到家
> */
> ```

#### 类修饰器重载构造函数

> - 类修饰器重载构造函数可以增加可扩展性，功能增加，不修改核心代码也能进行扩展
>
> ```ts
> function logClass(target: any) {
>     console.log(target) // 调用装饰器的类
> 
>     // 返回一个 target 的继承，进行一个扩展
>     return class extends target {
>         url: any = "到家"
> 
>         constructor(...args: Array<any>) {
>             super(...args)
>         }
> 
>         getData() {
>             this.url = this.url + "跑的快"
>             console.log(this.url)
>         }
>     }
> }
> 
> @logClass
> class MyClass {
>     url: string
>     constructor() {
>         this.url = "willy 到家"
>     }
>     getData() {
>         console.log(this.url)
>     }
> }
> 
> const myClass = new MyClass()
> console.log(myClass.url)
> myClass.getData()
> 
> /* 执行结果
>     class {constructor() {this.url = "willy\u5230\u5BB6";} getData() {console.log(this.url);}}
>     到家
>     到家跑得快
> */
> 
> ```

#### 类修饰器重载构造方法

> ```ts
> function countInstances(value: any, context: any) {
>     let instanceCount = 0
> 
>     const wrapper = function (...args: Array<any>) {
>         instanceCount++
>         const instance = new value(...args)
>         instance.count = instanceCount
>         return instance
>     } as unknown as typeof MyClass
> 
>     // 类重定向继承
>     wrapper.prototype = value.prototype
> 
>     return wrapper
> }
> 
> @countInstances
> class MyClass {}
> 
> /** test */
> const inst1 = new MyClass()
> console.log(inst1 instanceof MyClass) // true
> console.log(inst1.count) // 1
> 
> /**
>  * @desc 说明
>  * 上面示例中，类装饰器@countInstances返回一个函数，替换了类MyClass的构造方法。新的构造方法实现了实例的计数，每新建一个实例，计数器就会加一，并且对实例添加count属性，表示当前实例的编号。
>     注意，上例为了确保新构造方法继承定义在MyClass的原型之上的成员，特别加入 `wrapper.prototype = value.prototype` 行，确保两者的原型对象是一致的。否则，新的构造函数wrapper的原型对象，与MyClass不同，通不过instanceof运算符。
> */
> 
> ```

#### 自动执行

> ```ts
> function customElement(name: string) {
>     return <Input extends new (...args: any) => any>(
>         value: Input,
>         context: ClassDecoratorContext
>     ) => {
>         context.addInitializer(function () {
>             customElements.define(name, value)
>         })
>     }
> }
> 
> @customElement("willys-element")
> class MyComponent extends HTMLElement {
>     constructor() {
>         super()
>     }
> 
>     /** 当元素被插入到文档时，会自动调用该方法 */
>     connectedCallback() {
>         this.innerHTML = `<h1>Hi~ willysliang</h1>`
>     }
> }
> 
> /**
>  * @desc 说明
>  * 类MyComponent定义完成后，会自动执行类装饰器@customElement()给出的初始化函数，该函数会将当前类注册为指定名称（本例为<willys-element>）的自定义 HTML 元素。
>  */
> 
> ```

### 属性修饰器

> - 属性修饰器在运行时被当做函数调用，传入两个参数
>   1. 对于静态成员是类的构造函数，对于实例成员是类的原型对象
>   2. 成员名字
>
> ```ts
> function logProperty(params: any) {
>     return function (target: any, attr: any) {
>         console.log(target)
>         console.log(attr)
>         target[attr] = params
>     }
> } 
> 
> class MyClass1 {
>     @logProperty(' 到家')
>     url: any | undefined
>     constructor() {
>     }
> }
> ```

### 方法修饰器

> ```bash
> ## 方法修饰器
> `方法修饰器`应用到方法的属性描述符上，可以用来监视、修改、替换方法定义。运行时传入三个参数：
>     - 1、对于静态成员是类的构造函数，对于实例成员是类的原型对象
>     - 2、成员的名字
>     - 3、成员的属性描述符
> ```
>
> ```ts
> function logMethod(params: any) {
>     return function (target: any, methodName: any, desc: any) {
>         console.log(target)
>         console.log(methodName)
>         console.log(desc)
> 
>         target.newUrl = params
>         target.run = () => {
>             console.log('run')
>         }
>     }
> } 
> 
> class MyClass {
>     url: any | undefined
>     constructor() {
>     }
> 
>     @logMethod('willy.com')
>     getData() {
>     }
> }
> 
> let myClass: any = new MyClass()
> console.log(myClass.newUrl)
> 
> /** 
> 输出结果为：
> 	{constructor: ƒ, getData: ƒ}
>     getData
>     {writable: true, enumerable: false, configurable: true, value: ƒ}
>     daojia.com
> */
> ```
>
> #### 方法修饰器修改方法
>
> ```ts
> function logMethod(params: any) {
>     return function (target: any, methodName: any, desc: any) {
>         console.log(target)
>         console.log(methodName)
>         console.log(desc)
>         console.log(desc.value)
> 
>         let curMethod = desc.value
>         desc.value = function (...args: any[]) {
>             args = args.map((val) => {
>                 return String(val)
>             })
> 
>             curMethod.call(target, ...args)
>         }
>     }
> } 
> 
> class MyClass {
>     constructor() {
>     }
> 
>     @logMethod('daojia.com')
>     getData(...args: any) {
>         console.log(args)
>     }
> }
> 
> let myClass: any = new MyClass()
> console.log(myClass.getData(1, 2))
> 
> /**
> 运行结果：
>     {constructor: ƒ, getData: ƒ}
>     getData
>     {writable: true, enumerable: false, configurable: true, value: ƒ}
>     getData(...args) {console.log(args);}
>     ["1", "2"]
> */
> ```
>

### 参数修饰器

> ```bash
>## 参数修饰器
> `参数修饰器`会在运行时当做函数被调用，可以为类的原型增加一些元素数据，传入三个参数：
>     - 1、对于静态成员是类的构造函数，对于实例成员是类的原型对象
>     - 2、参数方法的名字
>    - 3、参数在函数参数列表中的索引
> ```
> 
> ```ts
> function logParams(params: any) {
>   return function (target: any, methodName: any, paramsIndex: any) {
>     console.log(target)
>     console.log(methodName)
>     console.log(paramsIndex)
> 
>     target[methodName](params)
>   }
> } 
> 
> class MyClass {
>   constructor() {
>   }
> 
>   getData(@logParams(' 到家') params: any) {
>     debugger
>     console.log(params)
>   }
>}
> 
>/** 
> 输出结果为：
>     {constructor: ƒ, getData: ƒ}
>     getData
>     0
>      到家
> */
>```
> 

## 进阶

### 类型别名

> - 类型别名用来给一个类型起个新名字。
> - 类型别名常用于联合类型
> - 可使用 `type` 创建类型别名
>
> ```ts
> type Name = string;
> type NameResolver = () => string;
> type NameOrResolver = Name | NameResolver;
> function getName(n: NameOrResolver): Name {
>   if (typeof n === 'string') {
>     return n;
>   } else {
>     return n();
>   }
> }
> ```

### 字符串字面量类型

> - 字符串字面量类型用来约束取值只能是某几个字符串中的一个。
> - 注意，**类型别名与字符串字面量类型都是使用 `type` 进行定义**
>
> ```ts
> type EventNames = 'click' | 'scroll' | 'mousemove';
> function handleEvent(ele: Element, event: EventNames) {
>     // do something
> }
> 
> handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
> handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
> 
> // error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
> ```

### 元组

> - 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
> - 元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。
>
> 一、定义一对值分别为 `string` 和 `number` 的元组：
>
> ```ts
> let tom: [string, number] = ['Tom', 25];
> ```
>
> 二、当赋值或访问一个已知索引的元素时，会得到正确的类型：
>
> ```ts
> let tom: [string, number];
> tom[0] = 'Tom';
> tom[1] = 25;
> 
> tom[0].slice(1);
> tom[1].toFixed(2);
> ```
>
> 三、只赋值其中一项：
>
> ```ts
> let tom: [string, number];
> tom[0] = 'Tom';
> ```
>
> 四、但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
>
> ```ts
> let tom: [string, number];
> tom = ['Tom', 25];
> let tom: [string, number];
> tom = ['Tom'];
> 
> // Property '1' is missing in type '[string]' but required in type '[string, number]'.
> ```
>
> #### 越界的元素
>
> 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
>
> ```ts
> let tom: [string, number];
> tom = ['Tom', 25];
> tom.push('male');
> tom.push(true);
> 
> // Argument of type 'true' is not assignable to parameter of type 'string | number'.
> ```

### 枚举 enum

> - 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
> - 枚举使用 `enum` 关键字来定义

#### 简单例子

> 枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
>
> ```ts
> enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
> 
> console.log(Days["Sun"] === 0); // true
> console.log(Days["Mon"] === 1); // true
> console.log(Days["Tue"] === 2); // true
> console.log(Days["Sat"] === 6); // true
> 
> console.log(Days[0] === "Sun"); // true
> console.log(Days[1] === "Mon"); // true
> console.log(Days[2] === "Tue"); // true
> console.log(Days[6] === "Sat"); // true
> ```
>
> 事实上，上面的例子会被编译为：
>
> ```js
> var Days;
> (function (Days) {
>     Days[Days["Sun"] = 0] = "Sun";
>     Days[Days["Mon"] = 1] = "Mon";
>     Days[Days["Tue"] = 2] = "Tue";
>     Days[Days["Wed"] = 3] = "Wed";
>     Days[Days["Thu"] = 4] = "Thu";
>     Days[Days["Fri"] = 5] = "Fri";
>     Days[Days["Sat"] = 6] = "Sat";
> })(Days || (Days = {}));
> ```

#### 手动赋值

> - 我们也可以给枚举项手动赋值：
> - 未手动赋值的枚举项会接着上一个枚举项递增
> - 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
>
> ```ts
> enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};
> 
> console.log(Days["Sun"] === 3); // true
> console.log(Days["Wed"] === 3); // true
> console.log(Days[3] === "Sun"); // false
> console.log(Days[3] === "Wed"); // true
> 
> /* 编译结果：
> var Days;
> (function (Days) {
>     Days[Days["Sun"] = 3] = "Sun";
>     Days[Days["Mon"] = 1] = "Mon";
>     Days[Days["Tue"] = 2] = "Tue";
>     Days[Days["Wed"] = 3] = "Wed";
>     Days[Days["Thu"] = 4] = "Thu";
>     Days[Days["Fri"] = 5] = "Fri";
>     Days[Days["Sat"] = 6] = "Sat";
> })(Days || (Days = {}));
> */
> ```
>
> 上面的例子中，递增到 `3` 的时候与前面的 `Sun` 的取值重复了，但是 TypeScript 并没有报错，导致 `Days[3]` 的值先是 `"Sun"`，而后又被 `"Wed"` 覆盖了。
>
> 所以使用的时候需要注意，最好不要出现这种覆盖的情况。
>
> 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
>
> ```ts
> enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
> var Days;
> (function (Days) {
>     Days[Days["Sun"] = 7] = "Sun";
>     Days[Days["Mon"] = 8] = "Mon";
>     Days[Days["Tue"] = 9] = "Tue";
>     Days[Days["Wed"] = 10] = "Wed";
>     Days[Days["Thu"] = 11] = "Thu";
>     Days[Days["Fri"] = 12] = "Fri";
>     Days[Days["Sat"] = "S"] = "Sat";
> })(Days || (Days = {}));
> ```
>
> 当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 `1`：
>
> ```ts
> enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
> 
> console.log(Days["Sun"] === 7); // true
> console.log(Days["Mon"] === 1.5); // true
> console.log(Days["Tue"] === 2.5); // true
> console.log(Days["Sat"] === 6.5); // true
> ```

#### 常数项和计算所得项

> 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
>
> 前面我们所举的例子都是常数项，一个典型的计算所得项的例子：
>
> ```ts
> enum Color {Red, Green, Blue = "blue".length};
> ```
>
> 上面的例子中，`"blue".length` 就是一个计算所得项。
>
> 上面的例子不会报错，但是**如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**：
>
> ```ts
> enum Color {Red = "red".length, Green, Blue};
> 
> // index.ts(1,33): error TS1061: Enum member must have initializer.
> // index.ts(1,40): error TS1061: Enum member must have initializer.
> ```
>
> 下面是常数项和计算所得项的完整定义，部分引用自[中文手册 - 枚举](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Enums.html)：
>
> 当满足以下条件时，枚举成员被当作是常数：
>
> - 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 `1`。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 `0`。
> - 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
>   - 数字字面量
>   - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
>   - 带括号的常数枚举表达式
>   - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
>   - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错
>
> 所有其它情况的枚举成员被当作是需要计算得出的值。

#### 常数枚举

> - 常数枚举是使用 `const enum` 定义的枚举类型
> - 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
> - 常量枚举可以提高性能，会内联枚举的用法，但是不会把枚举编译成任何JavaScript的代码
> - 只有常量值才可以进行常量枚举。如：`const enum Direction{Up =1+1}`这是错误的写法
>
> ```ts
> const enum Directions {
>   Up,
>   Down,
>   Left,
>   Right
> }
> 
> let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
> 
> // 编译结果： var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
> ```
>
> 假如包含了计算成员，则会在编译阶段报错：
>
> ```ts
> const enum Color {Red, Green, Blue = "blue".length};
> 
> // index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
> ```

#### 外部枚举

> - 外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型
> - 外部枚举与声明语句一样，常出现在声明文件中。同时使用 `declare` 和 `const` 也是可以的
> - `declare` 定义的类型只会用于编译时的检查，编译结果中会被删除
>
> ```ts
> declare const enum Directions {
>     Up,
>     Down,
>     Left,
>     Right
> }
> 
> let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
> 
> // 编译结果： var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
> ```

### 类 Class

#### ES6与ES7中的class类

> - 类是定义一切事物的抽象特点，包含属性和方法；具有封装、继承、多态的特点。
> - 传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而ES6中的class类是其两者的替换方案
>
> - 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
> - 对象（Object）：类的实例，通过 `new` 生成
> - 面向对象（OOP）的三大特性：封装、继承、多态
> - 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
> - 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
> - 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 `Cat` 和 `Dog` 都继承自 `Animal`，但是分别实现了自己的 `eat` 方法。此时针对某一个实例，我们无需了解它是 `Cat` 还是 `Dog`，就可以直接调用 `eat` 方法，程序会自动判断出来应该如何执行 `eat`
> - 存取器（getter & setter）：用以改变属性的读取和赋值行为
> - 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 `public` 表示公有属性或方法
> - 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
> - 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

#### 封装

> 封装了一个类，在引用任何一个类成员时用this来表示我们访问的是类的成员。最后通过new关键字实例封装类。
>
> ```ts
> class Animal {
>   name: string;
>   constructor(name: string){ 
>        this.name = name; 
>     }
>   run() { 
>        return `${this.name} is running`; 
>     }
> }
> const snake = new Animal('willy');
> console.log(snake.run());	//willy is running
> ```

#### 继承 extends

> 使用extends关键字，创建子类。通过`new`关键字实例化子类后，可以在其中调用父类与子类的属性和方法。
>
> ```ts
> class Animal {
>   name: string;
>   constructor(name: string){ 
>        this.name = name; 
>     }
>   run() {
>        return `${this.name} is running`; 
>     }
> }
> 
> class Dog extends Animal {
>   bark() {
>        return `${this.name} is barking`; 
>     }
> }
> const xiaohua = new Dog('xiaohua');
> console.log(xiaohua.run());	//xiaohua is running
> console.log(xiaohua.bark()); //xiaohua is barking
> ```

#### 多态 super

> 子类重写父类的构造函数，在访问this的属性前，必须调用super()
>
> ```ts
> class Animal {
>     name: string;
>     constructor(name: string){ this.name = name; }
>     run() { return `${this.name} is running`; }
> }
> 
> class Cat extends Animal {
>     gender: string;
>     constructor(name, gender: string){ 
>        super(name);
>        this.gender = gender;
>     }
>     run() { return `Meow, ${this.gender},${super.run()}`; }
> }
> const maomao = new Cat('maomao','female');
> console.log(maomao.run());	//Meow,female,maomao is running
> ```

#### 修饰符

> - TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是**`puiblic、protected、private`**。
> - `public`修饰符的属性和方法是公有的，任何地方都可以访问到。默认情况下所有属性和方法都是Public修饰。
> - `private`修饰的属性或方法是私有的，当成员被标记成`private`时，它不能在声明它的类的外部访问。
> - `protected` 修饰的属性或方法是受保护的，当成员被标记成`protected`时，只有子类和父类里可以访问。和private的区别是成员可继承。
>
> ````ts
> class Animal {
>   public name: string;
>   private age: number = 22;
>   protected sex: string;
>   public constructor(name: string, sex: string = '公') {
>     this.name = name;
>     this.sex = sex;
>   }
> }
> 
> class Dog extends Animal {
>   constructor(name: string, sex: string = '公') {
>     super(name, sex);
>     console.log(this.name, this.sex); // cilly 公
>   }
> }
> 
> let a = new Animal('Jack');
> console.log(a.name); // Jack
> a.name = 'Tom';
> console.log(a.name); // Tom
> // console.log(a.age); // error TS2341: Property 'age' is private and only accessible within class 'Animal'.
> let dog = new Dog('cilly');
> ````

#### 静态属性 static

> 类中定义`static`的静态成员变量，这些属性存在于类本身上而不是类的实例上。类直接访问属性和方法。

#### 参数属性

> 修饰符和`readonly`还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
>
> ```ts
> class Animal {
>      public name: string;
>      public constructor(public name) {
>        this.name = name;
>      }
> }
> ```

#### 只读属性 readonly

> 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
>
> ```ts
> class Animal {
>      readonly name;
>      public constructor(name) {
>        this.name = name;
>      }
> }
> 
> let a = new Animal('Jack');
> console.log(a.name); // Jack
> a.name = 'Tom';
> 
> // index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
> ```
>
> 注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。
>
> ```ts
> class Animal {
>     // public readonly name;
>     public constructor(public readonly name) {
>        // this.name = name;
>     }
> }
> ```

#### 抽象类 abstract

> - 抽象类作为其他派生类的基类使用，它们一般不会直接被实例化。
> - `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。
>
> ```ts
> abstract class Animal {
>   readonly name: string;
>   constructor(name: string) { this.name = name; }
>   abstract run(): void;
> }
> class Dog extends Animal {
>   run() { return `${this.name} is running`; }
> }
> const xiaobao = new Dog('xiaobao');
> console.log(xiaobao.run());
> ```
>
> 首先，抽象类是不允许被实例化的：
>
> ```ts
> abstract class Animal {
>   public name;
>   public constructor(name) {
>     this.name = name;
>   }
>   public abstract sayHi();
> }
> 
> let a = new Animal('Jack');
> 
> // index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
> ```
>
> 上面的例子中，我们定义了一个抽象类 `Animal`，并且定义了一个抽象方法 `sayHi`。在实例化抽象类的时候报错了。
>
> 其次，抽象类中的抽象方法必须被子类实现：
>
> ```ts
> abstract class Animal {
>   public name;
>   public constructor(name) {
>     this.name = name;
>   }
>   public abstract sayHi();
> }
> 
> class Cat extends Animal {
>   public eat() {
>     console.log(`${this.name} is eating.`);
>   }
> }
> 
> let cat = new Cat('Tom');
> 
> // index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
> ```
>
> 上面的例子中，我们定义了一个类 `Cat` 继承了抽象类 `Animal`，但是没有实现抽象方法 `sayHi`，所以编译报错了。
>
> 下面是一个正确使用抽象类的例子：
>
> ```ts
> abstract class Animal {
>   public name;
>   public constructor(name) {
>     this.name = name;
>   }
>   public abstract sayHi();
> }
> 
> class Cat extends Animal {
>   public sayHi() {
>     console.log(`Meow, My name is ${this.name}`);
>   }
> }
> 
> let cat = new Cat('Tom');
> ```
>
> 上面的例子中，我们实现了抽象方法 `sayHi`，编译通过了。
>
> 需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是：
>
> ```js
> var __extends =
>     (this && this.__extends) ||
>     function (d, b) {
>       for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
>       function __() {
>         this.constructor = d;
>       }
>       d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
>     };
> 
> var Animal = (function () {
>   function Animal(name) {
>     this.name = name;
>   }
>   return Animal;
> })();
> 
> var Cat = (function (_super) {
>   __extends(Cat, _super);
>   function Cat() {
>     _super.apply(this, arguments);
>   }
>   Cat.prototype.sayHi = function () {
>     console.log('Meow, My name is ' + this.name);
>   };
>   return Cat;
> })(Animal);
> 
> var cat = new Cat('Tom');
> ```

###  类与接口

> 接口可以用于对对象的形状进行抽象，也可以对类的一部分行为进行抽象。
>
> #### ①. 将类之间共有的特性提取成接口，用implements关键字来实现。
>
> ```ts
> /* class Car { switchRadio(){} }
> class CellPhone { switchRadio(){} } */
> interface Radio { 
>      switchRadio(trigger: boolean): void 
> }
> class Car implements Radio { 
>      switchRadio(){} 
> }
> class CellPhone implements Radio { 
>      switchRadio(){} 
> }
> ```
>
> #### ②. 接口之间也有继承关系
>
> ```ts
> interface Radio { 
>     switchRadio(trigger: boolean): void 
> }
> interface RadioWithBattery extends Radio { 
>     checkBatteryStatus() 
> }
> class Car implements Radio{ switchRadio(){} }
> class CellPhone implements RadioWithBattery{
>   switchRadio(){}
>   checkBatteryStatus(){}
> }
> ```
>

#### 类实现接口 implements

> #### 一个类实现一个接口
>
> ```ts
> interface Alarm {
>      alert(): void;
> }
> 
> class Door {
> }
> 
> class SecurityDoor extends Door implements Alarm {
>      alert() {
>        console.log('SecurityDoor alert');
>      }
> }
> 
> class Car implements Alarm {
>      alert() {
>        console.log('Car alert');
>      }
> }
> ```
>
> #### 一个类实现多个接口
>
> ```ts
> interface Alarm {
>      alert(): void;
> }
> 
> interface Light {
>      lightOn(): void;
>      lightOff(): void;
> }
> 
> class Car implements Alarm, Light {
>      alert() {
>        console.log('Car alert');
>      }
>      lightOn() {
>        console.log('Car light on');
>      }
>      lightOff() {
>        console.log('Car light off');
>      }
> }
> ```

#### 接口继承接口 extends

> ````ts
> interface Alarm {
>      alert(): void;
> }
> 
> interface LightableAlarm extends Alarm {
>      lightOn(): void;
>      lightOff(): void;
> }
> ````

#### 接口继承类 extends

> ```ts
> class Point {
>      x: number;
>      y: number;
>      constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
> }
> 
> interface Point3d extends Point {
>      z: number;
> }
> 
> let point3d: Point3d = {x: 1, y: 2, z: 3};
> ```
>
> 当我们在声明 `class Point` 时，除了会创建一个名为 `Point` 的类之外，同时也创建了一个名为 `Point` 的类型（实例的类型），所以我们既可以将 `Point` 当做一个类来用（使用 `new Point` 创建它的实例）。
>
> ```ts
>class Point {
>    x: number;
>   y: number;
>    constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
>    }
>    
>    const p = new Point(1, 2);
>    ```
> 
> 也可以将 `Point` 当做一个类型来用（使用 `: Point` 表示参数的类型）：
> 
> ```ts
>class Point {
>     x: number;
>    y: number;
>     constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
>    }
>    
>    function printPoint(p: Point) {
>      console.log(p.x, p.y);
> }
> 
> printPoint(new Point(1, 2));
>    ```
> 
> 这个例子实际上可以等价于：
> 
> ```ts
>class Point {
>     x: number;
>    y: number;
>     constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
>    }
>    
>    interface PointInstanceType {
>      x: number;
>     y: number;
> }
> 
>    function printPoint(p: PointInstanceType) {
>      console.log(p.x, p.y);
> }
> 
> printPoint(new Point(1, 2));
>    ```
> 
> 上例中我们新声明的 `PointInstanceType` 类型，与声明 `class Point` 时创建的 `Point` 类型是等价的。
> 
> 所以回到 `Point3d` 的例子中，我们就能很容易的理解为什么 TypeScript 会支持接口继承类了：
>
> ```ts
>class Point {
>     x: number;
>    y: number;
>     constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
>    }
>    
>    interface PointInstanceType {
>      x: number;
>     y: number;
> }
> 
>    // 等价于 interface Point3d extends PointInstanceType
>    interface Point3d extends Point {
>     z: number;
> }
> 
> let point3d: Point3d = {x: 1, y: 2, z: 3};
>    ```
> 
> 当我们声明 `interface Point3d extends Point` 时，`Point3d` 继承的实际上是类 `Point` 的实例的类型。
> 
> 换句话说，可以理解为定义了一个接口 `Point3d` 继承另一个接口 `PointInstanceType`。
>
> 所以「接口继承类」和「接口继承接口」没有什么本质的区别。
>
> 值得注意的是，`PointInstanceType` 相比于 `Point`，缺少了 `constructor` 方法，这是因为声明 `Point` 类时创建的 `Point` 类型是不包含构造函数的。另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。
>
> 换句话说，声明 `Point` 类时创建的 `Point` 类型只包含其中的实例属性和实例方法：
>
> ```ts
>class Point {
>     /** 静态属性，坐标系原点 */
>    static origin = new Point(0, 0);
>     /** 静态方法，计算与原点距离 */
>     static distanceToOrigin(p: Point) {
>        return Math.sqrt(p.x * p.x + p.y * p.y);
>      }
>      /** 实例属性，x 轴的值 */
>      x: number;
>      /** 实例属性，y 轴的值 */
>      y: number;
>      /** 构造函数 */
>      constructor(x: number, y: number) {
>        this.x = x;
>        this.y = y;
>      }
>      /** 实例方法，打印此点 */
>      printPoint() {
>        console.log(this.x, this.y);
>      }
>    }
>    
>    interface PointInstanceType {
>      x: number;
>     y: number;
>     printPoint(): void;
> }
>    
>    let p1: Point;
>    let p2: PointInstanceType;
> ```
> 
> 上例中最后的类型 `Point` 和类型 `PointInstanceType` 是等价的。
> 同样的，在接口继承类的时候，也只会继承它的实例属性和实例方法。

#### implements 与 extends 的区别

> ```bash
> ## implements 与 extends 的区别
> ### extends
> 1. `子类 extends 父类`：继承类只能单继承，即如果父亲属于类，那么父亲只能有一个
> 2. `类/接口 extends 接口1, 接口2`：继承接口可以是多继承，即如果父亲是接口，那么可以有多个父亲
> 
> 注意：
> 1. 如果子类继承父类的前提是：父类class 不是 抽象类。
> 2. 如果父类是抽象类，那么子类需要实现父类中的所有抽象方法，否则子类也将变成抽象类
> 		（实际上子类继承抽象父类的过程，也是抽象父类实例化的过程，
> 		因为抽象类不能直接被实例化，即不能通过 new 一个对象来产生，
> 		而是要借助一个普通的类通过继承实现所有该抽象类的所有抽象方法来进行实例化。
> 		但事实上也可通过 new 来实例化抽象类，只是还需要借助 匿名内部类 来实现）
> 3. 继承类虽然不能多继承，即一个子类不能有多个父亲，但可以多重继承，
> 		即`class A extends B {}  class B extends C {}`
> 4. 子类不能继承父类的 private 属性和方法。
> 5. 重写和重载：子类继承父类的方法时可以对父类的方法进行抽血，这时需要注意重写规则
> 		(参数个数、参数类型、返回类型和父类保持一致，同时子类重写方法的修饰符范围不能小于父类的修饰符)
> 
> 
> ### implements
> `class类 implements interface接口1, interface接口2`：一个类可实现多个接口。
> 
> 注意：
> 1. 实现一个接口需要实现接口中的所有方法。
> 2. 接口不能实现接口，接口只能继承接口。因为接口中的方法都是没有方法体的，如果接口实现接口，那么实现的过程就必定要定义方法体，对方法进行重写，所以两者是矛盾的。
> ```

### 泛型

> - 定义函数、接口或类时，不预先指定具体类型，而在使用时再指定类型
>
> - 泛型像一个类型占位符。
> - 在函数内部使用泛型变量时，由于事先不知道变量的类型，所以不能随意的来操作它的属性和方法。-->然而可用extends关键字来约束传入的泛型，只允许传入包含length属性的类型的变量。
>
> ```ts
> function echo<T>(arg: T): T {
>   //console.log(arg.lenth);   //因为事先不知其变量类型，无法计算
>   return arg;
> }
> // const result: string = echo(123);   //传入类型与传出类型不一致
> console.log(echo(123));
> ```
>
> ```ts
> //用extends关键字来约束传入的泛型，只允许传入包含length属性的类型的变量
> interface WithLength { length: number }
> function echoWithLength<T extends WithLength>(arg: T): T {
>   console.log(arg.length);
>   return arg;
> }
> const str = echoWithLength('str');
> const obj = echoWithLength({length: 10});
> const arr = echoWithLength([1,2,3]);
> ```
>
> **在接口中使用泛型**
>
> ```ts
> interface KeyPair<T,U> {
>   key: T;
>   value: U;
> }
> let kp1: KeyPair<number, string> = {key:1, value:'str'};
> let kp2: KeyPair<string, number> = {key:'test', value:123};
> 
> //Array是TS自带的interface
> const arr3: Array<number> = [1,2,3];
> ```
>

> 首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：
>
> ```ts
> function createArray(length: number, value: any): Array<any> {
>      let result = [];
>      for (let i = 0; i < length; i++) {
>        result[i] = value;
>      }
>      return result;
> }
> 
> createArray(3, 'x'); // ['x', 'x', 'x']
> ```
>
> 上例中，我们使用了数组泛型来定义返回值的类型。这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
>
> `Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。
>
> 这时候，泛型就派上用场了：
>
> ```ts
> function createArray<T>(length: number, value: T): Array<T> {
>      let result: T[] = [];
>      for (let i = 0; i < length; i++) {
>        result[i] = value;
>      }
>      return result;
> }
> 
> createArray<string>(3, 'x'); // ['x', 'x', 'x']
> ```
>
> 上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。
>
> 接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来：
>
> ```ts
> function createArray<T>(length: number, value: T): Array<T> {
>      let result: T[] = [];
>      for (let i = 0; i < length; i++) {
>        result[i] = value;
>      }
>      return result;
> }
> 
> createArray(3, 'x'); // ['x', 'x', 'x']
> ```

#### 多个类型参数

> 定义泛型的时候，可以一次定义多个类型参数：
>
> ```ts
> function swap<T, U>(tuple: [T, U]): [U, T] {
>      return [tuple[1], tuple[0]];
> }
> 
> swap([7, 'seven']); // ['seven', 7]
> ```
>
> 上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。

#### 泛型约束(继承)

> 在函数内部使用泛型变量时，由于其参数的类型未知，所以不能随意的操作它的属性或方法。
>
> 但可以向泛型中添加约束以限制允许的内容，这些约束使得在使用泛型类型时可以依赖更具体的类型（与默认值结合）
> 
>    ```ts
>    function foo<S extends string | number, T extends string | number>(
>   	v1: S,
>   	v2: T
> ): [S, T] {
>     console.log(v1, v2)
>    return [v1, v2]
> }
>
> foo('a', 'b') // a b
>foo('a', 1) // a 1
> foo('a', true) // Error
> ```
>    
> 多个类型参数之间也可以互相约束：
> 
> ```ts
>    function copyFields<T extends U, U>(target: T, source: U): T {
>      for (let id in source) {
>        target[id] = (<T>source)[id];
>      }
>     return target;
> }
>
> let x = { a: 1, b: 2, c: 3, d: 4 };
>
> copyFields(x, { b: 10, d: 20 });
> ```
>   

#### 泛型接口

> 接口中函数的定义，可以使用接口的方式来定义一个函数需要符合的形状：
>
> ```ts
> interface SearchFunc {
>      (source: string, subString: string): boolean;
> }
> 
> let mySearch: SearchFunc;
> mySearch = function(source: string, subString: string) {
>      return source.search(subString) !== -1;
> }
> ```

#### 泛型函数

> 带有函数的泛型有助于生成更通用的方法，从而更准确地表示所使用和返回的类型（可从函数参数推断泛型参数的类型）
>
> ```ts
> function createArray<T>(length: number, value: T): Array<T> {
>      let result: T[] = [];
>      for (let i = 0; i < length; i++) {
>        result[i] = value;
>      }
>      return result;
>    }
> 
> createArray(3, 'x'); // ['x', 'x', 'x']
>```
> 

#### 泛型类

> 泛型可以用来创建泛型类，比如 Map
>
> ```ts
> class NamedValue<T> {
>      private _value: T | undefined
> 
>      constructor(private name: string) {}
> 
>      public setValue(value: T) {
>        this._value = value
>      }
> 
>      public getValue(): T | undefined {
>        return this._value
>      }
> 
>      public toString(): string {
>        return `${this.name}: ${this._value}`
>      }
> }
> 
> let value = new NamedValue<number>('myNumber')
> value.setValue(10)
> console.log(value.toString()) // myNumber: 10
> ```

#### 泛型参数的默认类型

> 在 TypeScript 2.3 以后可为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
>
> ```ts
> function createArray<T = string>(length: number, value: T): Array<T> {
>      let result: T[] = [];
>      for (let i = 0; i < length; i++) {
>        result[i] = value;
>      }
>      return result;
> }
> ```

#### 泛型扩展类型别名

> 类型别名中的泛型允许创建更可重用的类型
>
> ```ts
> type WrapperType<T> = { value: T }
> 
> CONST WrapperValue: WrapperType<number> = { value: 10 }
> ```



### 声明合并

> 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

#### 函数的合并

> 我们可以使用重载定义多个函数类型：
>
> ```ts
> function reverse(x: number): number;
> function reverse(x: string): string;
> function reverse(x: number | string): number | string {
>      if (typeof x === 'number') {
>        return Number(x.toString().split('').reverse().join(''));
>      } else if (typeof x === 'string') {
>        return x.split('').reverse().join('');
>      }
> }
> ```

#### 接口的合并

> 接口中的属性在合并时会简单的合并到一个接口中：
>
> ```ts
> interface Alarm {
>      price: number;
> }
> interface Alarm {
>      weight: number;
> }
> ```
>
> 相当于：
>
> ```ts
> interface Alarm {
>      price: number;
>      weight: number;
> }
> ```
>
> 注意，**合并的属性的类型必须是唯一的**：
>
> ```ts
> interface Alarm {
>      price: number;
> }
> interface Alarm {
>      price: number;  // 虽然重复了，但是类型都是 `number`，所以不会报错
>      weight: number;
> }
> interface Alarm {
>      price: number;
> }
> interface Alarm {
>      price: string;  // 类型不一致，会报错
>      weight: number;
> }
> 
> // index.ts(5,3): error TS2403: Subsequent variable declarations must have the same type.  Variable 'price' must be of type 'number', but here has type 'string'.
> ```
>
> 接口中方法的合并，与函数的合并一样：
>
> ```ts
> interface Alarm {
>      price: number;
>      alert(s: string): string;
> }
> interface Alarm {
>      weight: number;
>      alert(s: string, n: number): string;
> }
> ```
>
> 相当于：
>
> ```ts
> interface Alarm {
>      price: number;
>      weight: number;
>      alert(s: string): string;
>      alert(s: string, n: number): string;
> }
> ```

#### 类的合并

> 类的合并与接口的合并规则一致。

## 关键字

### as const 只读断言

> TS 3.4中引入as const，被称为const 断言，它的作用是将定义的内容强制转换为`const`时，属性标记为只读，无法修改（注意：并非真的不可修改，只是一个障眼法）
>
> as const断言，可以将代码中宽泛的数据类型定义具体化，从而避免我们在开发过程中，因为定义过于宽泛，造成的各种数据处理的错误，通过精准的数据类型定义，更好的管理我们前端代码
>
> ### 对象属性只读
>
> ```ts
> const reqTranlate = { 
>     url: 'https://example.com', 
>     method: 'GET',
> } as const
> 
> 
> // 相当于把这个对象转换为 
> type reqTranlate = { 
>     url: 'https://example.com',
>     method: 'GET', 
> }
> 
> reqTranlate.name = willy // TypeError 对象限制只读，无法进行修改
> ```
>
> 但是 reqTranlate 在 ts 里面是无法访问其属性值的, 因为它是类型, 不是一个值, 而 const 就是把对象转换为一个可以访问其属性值的type。
>
> ### 数组变只读元组
>
> 数组上的`const`断言允许将数组标记为只读元组，即数组中每个位置的内容都成为无法修改的文本类型。例如：
>
> ```ts
> const arr = ['willy', 22]
> arr[0] = 'cilly'  // success
> ```
>
> TypeScript 会将其推断为`(string | number)[]`。但是如果使用`as const`断言，它将被限制为只读元组，值将不能被修改。即第一个位置值必须为`willy`，第二个位置值必须为`22`。
>
> ```ts
> const arr = ['willy', 22] as const
> arr[0] = 'cilly' // TypeError
> ```
>
> 通常使用`as const`语法告诉编译器将元组字面量的类型推断为元组字面量，而不是 `string[]`。这种类型的断言导致编译器推断出一个值可能的最窄类型，包括将所有内容设为只读。
>
> ```ts
> // 将会转换类型为： const list: readonly ['a', 'b', 'c']
> const list = ['a', 'b', 'c'] as const
> 
> type NeededUnionType = type list[number] 
> // 等同：type NeededUnionType = 'a' | 'b' | 'c'
> ```
>
> ### 变量值应被视为文字类型
>
> 文字类型允许我们定义更具体的类型，而不是像字符串或数字这样泛化的类型。例如：
>
> ```ts
>type Switch = 'On' | 'Off'
> ```
> 
> `const`断言允许我们将变量值标记为文字类型。
>
> 如定义一个变量`onSwitch`并赋值为`On`，TypeScript 通常会将变量类型推断为字符串。但是如果使用`const`断言，它将被推断为`On`的文字类型，并且不能接受除`On`之外的任何值。
>
> ```ts
>let onSwitch1 = 'On' // let OnSwitch1: string
> onSwitch1 = 'Off' // success
> 
> let onSwitch2 = 'On' as const // let onSwitch2: 'On'
> onSwitch2 = 'off' // TypeError
> ```
> 
> 注意：`const`表达式只能应用于简单表达式，若想通过三元运算符这样计算出的结果使用`const`断言，则需要对三元运算符每个输出值应用`const`断言
>
> ```ts
>function switchValue (input: boolean) {
>   // let onSwitch = (input ? 'on' : 'off') as const // 错误写法
>   let onSwitch = input ? ('on' as const) : ('off' as const) // 正确写法
>   
>     // onSwitch 变量类型将被推断为一个文本联合类型 on | off
>     return onSwitch
>   }
>   ```
> 

### 方括号运算符`[]`

> ```bash
> ## 方括号运算符 `[]`
> 方括号运算符 `[]` 用于取出对象的键值类型，比如 T[K] 会返回对象 T 的属性 K 的类型。
> 
> - 方括号的参数如果是联合类型，那么返回的也是联合类型。
> - 如果访问不存在的属性，会报错。
> - 注意，方括号里面不能有值的运算。
> ```
>
> ```ts
> type Person = {
>   age: number
>   name: string
>   alive: boolean
> }
> 
> // Age 的类型是 number
> type Age = Person["age"]
> 
> // number|string
> type T = Person["age" | "name"]
> 
> // number|string|boolean
> type A = Person[keyof Person]
> 
> type Obj = {
>   [key: string]: number
> }
> 
> // number
> type Ts = Obj[string]
> 
> ```
>

### keyof 和 typeof

#### keyof  提取键类型

> **keyof 作用**：keyof 用于遍历某种类型的属性（可以操作接口、类以及基本数据类型）
>
> ```bash
> ## keyof 提取键类型
> keyof 作用：用于遍历某种类型的属性（可以操作接口、类以及基本数据类型）
> 
> 注意： `keyof any` 等价于 `string | number | symbol`
> ```
>
> ### keyof 提取函数参数类型
>
> ```ts
>function prop<T extends object, K extends keyof T>(obj: T, key: K): string {
>   return obj[key]
> }
> const getKey = prop({name: 'willy'}, 'name') // willy
> ```
> 
> ### keyof 与对象的数值属性
>
> 在使用对象的数值属性时，也可以使用 `keyof` 关键字。
>
> 注意：若我们定义一个带有数值属性的对象，此时我们既需要定义该属性，又需要使用数组语法访问该属性。
>
> ```ts
>enum Currency {
>   CNY = 1,
>   EUR = 2,
>   USD = 3,
> }
> 
> const CurrencyName = {
>   [Currency.CNY]: "人民币",
>   [Currency.EUR]: "欧元",
>   [Currency.USD]: "美元"
> };
> 
> function getCurrencyName<T, K extends keyof T>(key: K, map: T): T[K] {
>   return map[key];
> }
> 
> console.log(`name = ${getCurrencyName(Currency.CNY, CurrencyName)}`);
> ```
> 
> ### keyof与数组属性(提取索引类型)
>
> `keyof` 还可以与索引签名一起使用，以提取索引类型
>
> 注意：数组的索引存在隐式Number 类型
>
> ```ts
>interface StringIndexArray {
>   [index: string]: string;
> }
> 
> interface NumberIndexArray {
>   [index: number]: string;
> }
> 
> type K1 = keyof StringIndexArray // type K1 = string | number
> type K2 = keyof NumberIndexArray // type K2 = number
> ```

#### typeof 获取变量类型

> ### typeof作用
>
> typeof 操作符用于获取变量的类型，因此这个操作符的后面接的始终是一个变量，且需要运用到类型定义当中。
>
> ```ts
> type Biology = {
>   name: string
> }
> const biology: Biology = {
>   name: '生物',
> }
> 
> type animal = {
>   name: string
>   age: number
> }
> type Person =  animal & typeof biology
> const person: Person = {
>   name: '人',
>   age: 1,
> }
> ```

#### typeof 与 keyof 一起使用

> 如果直接 keyof 一个对象变量的话，获取到的并不是该对象的属性组成的联合类型，而会是该对象的方法及属性的联合类型，比如除了属性还会有 “valueOf” “toString” 等。
>
> ```ts
> const Color = {
>   red: 'red',
>   blue: 'blue',
>   green: 'green',
> } as const 
> 
> // type Colors = "red" | "blue" | "green"
> type Colors = keyof typeof Color 
> 
> let color: Colors
> color = 'red'	// true
> color = 'green' // true
> // color = 'yellow' // error
> ```

### 类型映射 in keyof

> ```bash
> ## 类型映射 in keyof
> 映射（mapping）指的是，将一种类型按照映射规则，转换成另一种类型，通常用于对象类型。
> 
> 在语法上，[prop in keyof A]是一个属性名表达式，表示这里的属性名需要计算得到。具体的计算规则如下：
>     - prop：属性名变量，名字可以随便起。
>     - in：运算符，用来取出右侧的联合类型的每一个成员。
>     - keyof A：返回类型A的每一个属性名，组成一个联合类型。
>  并且在转换成另一种类型的时候，可以设定属性为 readonly 或 可选。
>  
>  
>  ### 映射修饰符
>  如果要删改可选和只读这两个特性，并不是很方便。为了解决这个问题，TypeScript 引入了两个映射修饰符，用来在映射时添加或移除某个属性的?修饰符和readonly修饰符。
> 	- `+` 修饰符：写成`+?`或`+readonly`，为映射属性添加?修饰符或readonly修饰符。
> 	– `-` 修饰符：写成`-?`或`-readonly`，为映射属性移除?修饰符或readonly修饰符。
> 	- 注意，`+?` 或 `-?` 要写在属性名的后面。
> 	
> TypeScript 原生的工具类型`Required<T>`专门移除可选属性，就是使用-?修饰符实现的。
> 注意，`–?`修饰符移除了可选属性以后，该属性就不能等于undefined了，实际变成必选属性了。但是，这个修饰符不会移除null类型。
> 另外，`+?`修饰符可以简写成`?`，`+readonly`修饰符可以简写成`readonly`。
> ```
>
> ```ts
> type A = {
>   readonly foo: number
>   bar: string
> }
> 
> /** 循环取出属性名：获取属性值 */
> type A1 = {
>   [prop in keyof A]: A[prop]
> }
> 
> /** 将所有属性变为可选 */
> type A2 = {
>   [prop in keyof A]?: A[prop]
> }
> 
> /** 添加可选属性 */
> type Optional<Type> = {
>   [Prop in keyof Type]+?: Type[Prop]
> }
> /** 移除可选属性 */
> type Concrete<Type> = {
>   [Prop in keyof Type]-?: Type[Prop]
> }
> 
> /** 添加readonly */
> type CreateImmutable<Type> = {
>   +readonly [Prop in keyof Type]: Type[Prop]
> }
> /** 移除readonly */
> type CreateMutable<Type> = {
>   -readonly [Prop in keyof Type]: Type[Prop]
> }
> ```

#### 键名重映射

> ```bash
> ### 键名重映射
> TypeScript 4.1 引入键名重映射（key remapping），允许改变键名。
> 键名重映射的语法是在键名映射的后面加上 `as + 新类型` 子句。"新类型" 通常是一个模板字符串，里面可以对原始键名进行各种操作。
> 
> ```
>
> ```ts
> type A = {
>     foo: number
>     bar: number
> }
> 
> type B = {
>     [Prop in keyof A as `${Prop}ID`]: A[Prop]
> }
> 
> interface Person {
>     name: string
>     age: number
>     location: string
> }
> 
> /**
>  * Capitalize<T>：用来将 T 的首字母变成大写
>  * string & P：一个交叉类型，其中的P是 keyof 运算符返回的键名联合类型string|number|symbol，
>     但是Capitalize<T>只能接受字符串作为类型参数，因此string & P只返回P的字符串属性名。
>  */
> type Getters<T> = {
>     [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
> }
> 
> type LazyPerson = Getters<Person>
> 
> // 等同于
> type LazyPersons = {
>     getName: () => string
>     getAge: () => number
>     getLocation: () => string
> }
> 
> ```

#### 联合类型的映射

> ```bash
> ### 联合类型映射
> 由于键名重映射可以修改键名类型，所以原始键名的类型不必是string|number|symbol，任意的联合类型都可以用来进行键名重映射。
> 
> ```
>
> ```ts
> type S = {
>      kind: "square"
>      x: number
>      y: number
> }
> type C = {
>      kind: "circle"
>      raduis: number
> }
> 
> type MyEvents<Events extends { kind: string }> = {
>      [E in Events as E["kind"]]: (event: E) => void
> }
> type Config = MyEvents<S | C>
> 
> // 等同于
> type Configs = {
>      square: (event: S) => void
>      circle: (event: C) => void
> }
> 
> ```

### 条件类型约束 extends

> ```bash
> ## extends...?: 条件运算符
> 条件运算符 `extends...?:` 可以根据当前类型是否符合某种条件，返回不同的类型。
> 
> 
> ### 条件类型约束
> 泛型约束的例子
> 	type MessageOf<T extends { message: unknown }> = T['message']
> 	在此示例中，使用 message:unkonwn 约束泛型 T。
> 	
> 	如果我们想要 MessageOf 支持任何类型，我们可以将约束和条件一起使用：
> 		type MessageOf<T> = T extends { message: unknown } ? T['message'] : never
> 	
> 	如果条件成立，在 true 分支内，TS 知道 T 将具有一个 message 属性，否则将会返回 never 类型。
> 
> 
> 
> ### 分布条件类型
> 当条件类型给定联合类型时，它们将会变为分布式。
> 	type ToArray<Type> = Type extends any ? Type[] : never
> 
> 如果我们将联合类型传入 ToArray，则条件类型将应用于该联合的每个成员。
> 	type ToArray<Type> = Type extends any ? Type[] : never
> 	type StrOrNumArr = ToArray<string | number>
> 	// 等同于：type StrOrNumArr = string[] | number[]
> 
> 为避免这种分配性的行为。可以使用方括号将 extends 关键字的每一侧括起来
> 	type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
> 	type StrOrNumArr = ToArrayNonDist<string | number>
> 	// 等同于：type StrOrNumArr = (string | number)[]
> ```

### is 运算符

> ```bash
> ## is 运算符
> - 函数返回布尔值时，可以使用 `is` 运算符，限定返回值与参数之间的关系。
> - 注意，this is T这种写法，只能用来描述方法的返回值类型，而不能用来描述属性的类型。
> ```
>
> ```ts
> /** 判断类型的返回值 */
> type A = { a: string }
> type B = { b: string }
> function isTypeA(x: A | B): x is A {
>   if ("a" in x) return true
>   return false
> }
> 
> 
> /** 在类的内部，描述类的方法的返回值 */
> class Teacher {
>   isStudent(): this is Student {
>     return false
>   }
> }
> class Student {
>   isStudent(): this is Student {
>     return true
>   }
> }
> ```

### 推断类型 infer

> ```bash
> ## infer
> 如 `T extends U ? X : Y`，如果占位符类型 U 是一个可以被分解成几个部分的类型，譬如数组类型、元组类型、函数类型、字符串字面量类型等。这时候可通过 infer 来获取 U 类型中某个部分的类型。
> infer 语法的限制如下：
>     1. infer 只能在条件类型的 extends 子句中使用
>     2. infer 得到的类型只能在 true 语句中使用，即 X 中使用
> 
> 
> 
> ### 1. 推断数组(或元组)的类型
> 通过(infer U)来获取数组对应的类型。
>     type InferArray<T> = T extends (infer U)[] ? U : never
>     type I0 = InferArray<[number, string]>; // string | number
>     type I1 = InferArray<string[]>; // string
>     type I2 = InferArray<number[]>; // number
> 
> 
> 
> ### 2. 推断数组(或者元组)第一个元素的类型
> `[infer P, ... infer _]` 中 `infer P` 获取的是第一个元素的类型，而 `...infer _` 获取的是数组其他剩余元素的数组类型。
>     type InferFirst<T extends unknown[]> = T extends [infer P, ...infer _] ? P : never
>     type I3 = InferFirst<[3, 2, 1]>; // 3
> 
> 
> 
> ### 3. 推断数组(或者元组)最后一个元素的类型
> `...infer _` 获取的是最后一个元素之前的所有元素类型，`infer Last` 获取的是最后一个元素的类型。
>     type InferLast<T extends unknown[]> = T extends [... infer _, infer Last] ? Last : never
>     type I4 = InferLast<[3, 2, 1]>; // 1
> 
> 
> 
> ### 4. 推断函数类型的参数
> `...args` 代表的是函数参数组成的元组, `infer R` 代表的就是推断出来的这个函数参数组成的元组的类型。
> type InferParameters<T extends Function> = T extends (...args: infer R) => any ? R : never
> type I5 = InferParameters<((arg1: string, arg2: number) => void)> // [string, number]
> 
> 
> 
> ### 5. 推断函数类型的返回值
> 和前面的推断函数类型的参数类似，`=>` 后面的 `infer R` 代表的就是推断出来的函数的返回值类型。
> type InferReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
> type I6 = InferReturnType<() => string>; // string
> 
> 
> 
> ### 6. 推断Promise成功值的类型
> type InferPromise<T> = T extends Promise<infer U> ? U : never
> type I7 = InferPromise<Promise<string>>; // string
> 
> 
> 
> ### 7. 推断字符串字面量类型的第一个字符对应的字面量类型
> type InferString<T extends string> = T extends `${infer First}${infer _}` ? First : []
> type I8 = InferString<"Johnny">; // J
> ```
>
> ```ts
> type Shift<T> = T extends [infer L, ...infer R] ? [...R] : []
> 
> type Pop<T extends any[]> = T extends [...infer L, infer R] ? [...L] : []
> 
> type Reverse<T extends unknown[], U extends unknown[] = []> = [] extends T
>     ? U
>     : T extends [infer L, ...infer R]
>     ? Reverse<R, [L, ...U]>
>     : U
> 
> type FlipArguments<T extends Function> = T extends (...arg: infer R) => infer S
>     ? (...arg: Reverse<[...R]>) => S
>     : T
> 
> /** 起始是否包含某字符 */
> type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}`
>     ? true
>     : false
> 
> /** 去除左边空格 */
> type TrimLeft<S extends string> = S extends `${infer L}${infer R}`
>     ? L extends " " | "\n" | "\t"
>         ? TrimLeft<R>
>         : S
>     : ""
> 
> /** 去除两边空格 */
> type Trim<S extends string> = S extends `${" " | "\t" | "\n"}${infer R}`
>     ? Trim<R>
>     : S extends `${infer L}${" " | "\t" | "\n"}`
>     ? Trim<L>
>     : S
> 
> /** 字符串并集 */
> type StringToUnion<T extends string, U = never> = T extends ""
>     ? U
>     : T extends `${infer L}${infer R}`
>     ? StringToUnion<R, U | L>
>     : U
> 
> ```

## 内置条件类型 — Utility Types

> ```bash
> ## 内置条件类型 - Unility Types
> - Exclude<T, U>：从 T 中剔除可以赋值给 U 的类型
> - Extract<T, U>：提取 T 中可以赋值给 U 的类型
> - NonNullable<T>：从 T 中剔除 null 和 undefined
> - ReturnType<T>：获取函数返回值类型
> - InstanceType<T>：获取构造函数类型的实例类型
> ```
>
> ```ts
> /** Exclude 与 Extract */
> type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
> type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"
> 
> type T02 = Exclude<string | number | (() => void), Function>;  // string | number
> type T03 = Extract<string | number | (() => void), Function>;  // () => void
> 
> 
> /** NonNullable */
> type T04 = NonNullable<string | number | undefined>;  // string | number
> type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]
> 
> 
> /** ReturnType */
> type T10 = ReturnType<() => string>;  // string
> type T11 = ReturnType<(s: string) => void>;  // void
> type T12 = ReturnType<(<T>() => T)>;  // {}
> type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
> 		function f1(s: string) { return { a: 1, b: s } }
> type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
> type T15 = ReturnType<any>;  // any
> type T16 = ReturnType<never>;  // any
> type T17 = ReturnType<string>;  // Error
> type T18 = ReturnType<Function>;  // Error
> 
>                       
> /** InstanceType */
> class C { x = 0; y = 0; }
> type T20 = InstanceType<typeof C>;  // C
> type T21 = InstanceType<any>;  // any
> type T22 = InstanceType<never>;  // any
> type T23 = InstanceType<string>;  // Error
> type T24 = InstanceType<Function>;  // Error
> ```

### 可选属性 Partial

> - Partial作用：把已有的类型属性,变成一个新类型的可选属性
> - 语法：` type 新类型 = Partial<老类型>`
>
> ```ts
> interface Point {
>   x: number
>   y: number
> }
> 
> let pointPart: Partial<Point> = {} // Partial 允许 x 和 y 是可选的
> pointPart.x = 10
> ```

### 必须属性 Required

> `Required` 更改对象中需要的所有属性。与 `Partial` 相反。
>
> ```ts
> interface User {
>     name?: string
>     age?: number
> }
> 
> const user: User = { name: 'O.O' }
> 
> const user2: Required<User> = { name: 'O.O' }
> // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Required<User>" 中需要该属性。ts(2741)
> ```
>

### 键值对属性 Record

> `Record` 是定义具有特定键类型和值类型的对象类型的快捷方式。
>
> ```ts
> const nameAgeMap: Record<string, number> = {
>     KAI: 27,
>     LAY: 30
> }
> ```
>
> `Record<string, number>` 相当于 `{ [key: string]: number }`

### 删除 Exclude

> ```bash
> ## Exclude<UnionType, ExcludeMembers>
> `Exclude` 从联合中删除某些类型，然后组成一个新的类型返回。
> 
> ```
>
> ```ts
> type T1 = Exclude<"a" | "b" | "c", "a"> // 'b'|'c'
> type T2 = Exclude<"a" | "b" | "c", "a" | "b"> // 'c'
> type T3 = Exclude<string | (() => void), Function> // string
> type T4 = Exclude<string | string[], any[]> // string
> type T5 = Exclude<(() => void) | null, Function> // null
> type T6 = Exclude<200 | 400, 200 | 201> // 400
> type T7 = Exclude<number, boolean> // number
> 
>                   
> /** Exclude<UnionType, ExcludedMembers>的实现 */
> type Exclude<T, U> = T extends U ? never : T
> 
> ```

### 提取 Extract

> ```bash
> ## 提取 Extract<UnionType, Union>
> `Extract` 从联合类型 UnionType 中提取指定类型 Union，组成一个新类型返回。
> 如果参数类型 Union 不包含在联合类型 UnionType 中，则返回 never 类型。
> 
> ```
>
> ```ts
> type T1 = Extract<"a" | "b" | "c", "a"> // 'a'
> type T2 = Extract<"a" | "b" | "c", "a" | "b"> // 'a'|'b'
> type T3 = Extract<"a" | "b" | "c", "a" | "d"> // 'a'
> type T4 = Extract<string | string[], any[]> // string[]
> type T5 = Extract<(() => void) | null, Function> // () => void
> type T6 = Extract<200 | 400, 200 | 201> // 200
> 
> /** 提取不存在的类型 */
> type T = Extract<string|number, boolean>; // never
>                   
> 
> /** Extract<UnionType, Union>的实现 */
> type Extract<T, U> = T extends U ? T : never
> 
> ```

### 只读属性 Readonly

> - 把已有类型全部转换为只读类型，定义对象使其内在属性不能修改

### 选择部分属性 Pick

> - Pick作用：从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。
> - 语法：`type 新类型 = Pick<老类型, 属性1 | 属性n>`
> - 使用场景：主要是从一个已知的类型中，取出子集，作为一个新的类型返回。
>
> ```ts
> interface Person {
>   name: string;
>   age: number;
>   id: number;
>   sex: 0 | 1;
> }
> 
> // 挑选 name 和 id 属性
> type Woman = Pick<Person, "name" | "id">;
> 
> // 此时 Woman 等效于 Female
> interface Female {
>   name: string;
>   id: number;
> }
> ```
>
> ```bash
> ## 原理解析
> - 主要的逻辑就是如何利用泛型和联合类型，来动态的从一个已知的类型中，提取出它的子集
> ### K extends keyof T 与 P in K
> -  `K extends keyof T`：用来获取 T 类型的所有键的联合类型
> - `P in K`：in 操作符可以遍历联合类型，枚举类型等
>       
>       interface Person {
>         name: string;
>         age: number;
>         id: number;
>       }
>       
>       // Person 所有键的联合类型
>       type Keys = keyof Person; // 等效于 "name" | "age" | "id"
>       
>       // 此时 Man 类型与 Person 相等
>       type Man = {
>         [key in Keys]: Person[key];
>       };
> ```
>

### 剔除部分属性 Omit

> - `Omit` 与 `Pick` 作用相反，只不过 `Omit` 是：以一个类型为基础支持剔除某些属性，然后返回一个新类型
>
> ```ts
> interface Person {
>   name: string
>   age: number
>   location?: string
> }
> 
> const user: Omit<Person, 'age' | 'location'> = {
>   name: 'D.O' // Omit 从类型中删除了 age 和 location，不能在此处定义
> }
> 
> 
> type Omit<T, K extends string | number | symbol> = {
>   [P in Exclude<keyof T, K>]: T[P];
> };
> ```

### 提取函数返回类型 ReturnType

> `ReturnType` 提取函数类型的返回类型。
>
> ```ts
> type foo = () => {
>      x: number
>      y: number
> }
> 
> const point: ReturnType<foo> = {
>      x: 10,
>      y: 20
> }
> ```

### 提取函数参数类型 Parameters

> `Parameters` 将函数类型的参数类型提取为数组。
>
> ```ts
> type PointPrinter = (p: { x: number; y: number }) => void
> const point: Parameters<PointPrinter>[0] = {
>      x: 10,
>      y: 20,
> }
> ```

### Promise返回值类型 Awaited

> ```bash
> ## Awaited<Type>
> - `Awaited<Type>` 用来取出 Promise 的返回值类型，适合用在描述 `then()` 方法和 `await` 命令的参数类型。
> - 如果它传入的类型参数不是 Promise 类型，就会原样返回。
> - 它还可以返回多重 Promise 的返回值类型。
> ```
>
> ```ts
> type A = Awaited<Promise<number>> // number
> 
> // 多重 Promise
> type B = Awaited<Promise<Promise<string>>> // string
> 
> // 类型参数非 Promise
> type C = Awaited<boolean | Promise<number>> // boolean | number
> 
> 
> /** Awaited<Type> 的实现 */
> type Awaited<T> =
>   T extends null | undefined ? T :
>   T extends object & {
>     then(
>       onfulfilled: infer F,
>       ...args: infer _
>     ): any;
>   } ? F extends (
>     value: infer V,
>     ...args: infer _
>   ) => any ? Awaited<...> : never:
>   T;
> ```

### 构造方法参数类型 ConstructorParameters

> ```bash
> ## ConstructorParameters<Type>
> `ConstructorParameters<Type>` 提取构造方法 Type 的参数类型，组成一个元组类型返回。
> 
> - 它可以返回一些内置构造方法的参数类型。
> - 注意：如果参数类型不是构造方法，就会报错。
> - any类型和never类型是两个特殊值，分别返回unknown[]和never。
> ```
>
> ```ts
> type T1 = ConstructorParameters<new (x: string, y?: number) => object> // [x: string, y?: number | undefined]
> 
> /** 提取内置构造方法的参数类型 */
> type T2 = ConstructorParameters<ErrorConstructor> // [message?: string | undefined]
> type T3 = ConstructorParameters<FunctionConstructor> // string[]
> type T4 = ConstructorParameters<RegExpConstructor> // [pattern: string | RegExp, flags?: string | undefined]
> 
> /** any 和 never 类型 */
> type T5 = ConstructorParameters<any> // unknown[]
> type T6 = ConstructorParameters<never> // never
> 
> 
> /** ConstructorParameters<Type> 的实现 */
> type ConstructorParameters<
>   T extends abstract new (...args: any) => any
> > = T extends abstract new (...args: infer P) 
>   => any ? P : never
> 
> ```

### InstanceType

> ```bash
> ## InstanceType<Type>
> `InstanceType<Type>` 提取构造函数的返回值类型（即实例类型），参数 Type 是一个构造函数，等同于构造函数的 `ReturnType<Type>`。
> 
> 
> - 如果类型参数不是构造方法，就会报错。
> - 如果类型参数是 any 或 never 两个特殊值，分别返回 any 和 never。
> 
> ```
>
> ```ts
> type T1 = InstanceType<new () => object> // object
> 
> type T2 = InstanceType<ErrorConstructor> // Error
> type T3 = InstanceType<FunctionConstructor> // Function
> type T4 = InstanceType<RegExpConstructor> // RegExp
> 
> class C {
>     x = 0
>     y = 0
> }
> type TC = InstanceType<typeof C> // C
>                        
> /** 特殊类型 */
> type T5 = InstanceType<any> // any
> type T6 = InstanceType<never> // never
> 
> 
> 
> /** InstanceType<Type>的实现 */
> type InstanceType<
>   T extends abstract new (...args:any) => any
> > = T extends abstract new (...args: any) => infer R ? R :
>   any
> ```

### 字符串类型工具

> ````bash
> ## 字符串类型工具
> 1. `Uppercase<StringType>`：将字符串类型的每个字符转为大写。
> 2. `Lowercase<StringType>`：将字符串的每个字符转为小写。
> 3. `Capitalize<StringType>`：将字符串的第一个字符转为大写。
> 4. `Uncapitalize<StringType>`：将字符串的第一个字符转为小写。
> 
> ````
>
> ```ts
> type Str = "hEllO"
> 
> type A = Uppercase<Str> // 'HELLO'
> 
> type B = Lowercase<A> // 'hello'
> 
> type C = Capitalize<B> // "Hello"
> 
> type D = Uncapitalize<C> // 'hello'
> 
> ```

## 提升

###  使用ts的类型进行对象分解

> ````ts
> // # 在正常情况下给对象进行解构时，如下：
> const { name, age } = obj.value
> 
> // # 错误尝试，以下写法会将 name属性值分配给string变量，将 age 属性值分配给number
> const { name: string, age: number } = obj.value
> 
> // # 正确的入门写法
> const { name, age }: { name: string, age: number } = obj.value
> 
> // 进阶写法：为数据创建一个 type 或 interface
> type User1 = {
>        name: string,
>        age: number
> }
> interface User2 = {
>        name: string,
>        age: number
> }
> const user1: User1 = obj.value
> const user2: User2 = obj.value
> ````

### 缩短ts中的导入路径

> ```ts
> // # 在 TypeScript 中，通常使用相对路径导入特定文件，但当更改文件目录结构时，必须相应更新这些导入的路径，虽然VSCode有插件会自动更新路径，但这并不能正确确保顺利更改。
> import { authService } from '../../../services/authService'
> 
> // # 为了快速有效的维护，可以在 TypeScript的配置文件 tsConfig.json 中的 path 属性下指定路径别名
> {
>        "paths": {
>            "@/*": ["src/*"],
>                "@service/*": ["src/service/*"]
>        }
> }
> 
> import { authService } from '@/services/authService'
> ```

### 对未知类型使用unknow而不是any

> ### 使用any
>
> ```ts
> /**
> 	* 在遇到事先不知道类型的情况，即可能是任何类型。
> 	* 在 TS V3 之前会使用 any 类型来表示这些类型。
> 	* 但此时不会对对象进行类型检查，会失去 TypeScript 提供的任何类型安全性
> 	* 可以正确访问对象上存在的属性，但如果访问对象上不存在的属性，不会有效的抛出异常
> 	*/
> const x: any = {
>   a: "a-value",
>   b: "b-value",
> }
> // # 可以访问上面的对象属性（x.a 和 x.b），但如果试图访问 x.c 值，TypeScript 不会抛出错误，因为对象 x 可以是任意东西
> console.log(x.a, x.b)	// a-value, b-value
> console.log(x.c)	// undefined
> ```
>
> #### 使用unknow
>
> ```ts
> unknow介绍：
> 	unknow 类型是在 TypeScipt 的第三版中引入，作为 any 类型的附带类型，当分配给变量时，unknow 意味着变量未知
> unknow比any的优势：
> 	可以确定使用unknow的变量存在什么，会产生更好、更安全的程序，因为 TypeScript 可以对生成的类型进行类型检查
> 
> 
> 
> // # TypeScirpt 不允许使用 unknow的变量，除非将该变量强制转换为已知类型或收窄其类型
> const x: unknow = 3
> x * x // Error
> 
> 
> // # 为了修复上述错误，可以使用类型保护来检查它是否是数字，然后再将其平方
> if(type x === 'number') {
>   console.log(x * x) // 9
> }
> 
> 
> // # 通过类型转换或类型缩窄来确定 unknow 的变量是什么
> const x: unknow = {
>   a: 'a-value',
> 	b: 'b-value', 
> }
> (x as {a: stirng, b: string}).b	// b-value
> ```

### JS和TS中的void

> ```bash
> ## void 的概念：
> 	void 是一种类型表明函数和方法在调用时不作返回
> 
> ## js 中的 void
> 	1. JS 中的 void 是一个运算符，用于计算它旁边的表达式，无论哪个表达式求值，void 总是返回 undefined
> 		 	let i = void 2; 
> 			i === undefined; // true
> 
> 	2. 早期，人们能够覆盖 undefined 并赋予它一个实际值，而 void 总是返回真正意义上的 undefined
> 
> 	3. 其次，这是调用立即执行函数的好办法
> 			void (function (){ console.log('IFF') })()
> 
> 	4. 还有这些赋值不会污染全局命名空间
> 			void (function fn(i) {
>       	if(i > 0) {
>           console.log(i--)
>           fn(i)
>         }
>       })(3)
> 			console.log(typeof fn)	// undefined
> 
> 	5. 由于 void 总是返回undefined，并且 void 总是对它旁边的表达式求值，因此有一种非常简洁的方法可以从函数返回，而不返回值，但仍然调用回调函数
> 			button.onclick = () => void doSomething()
> 			// 返回未定义的内容会导致应用程序崩溃
> 			function middleware(nextCallback) {
>         if(condition()) {
>           return void nextCallback();
>         }
>       } 
> ```
>
> #### TS中的void
>
> ```bash
> 1. TS 中的 void 是 undefined 的子类型，JS 中的函数总是返回一些东西（一个值 或 undefined）
> 
> 
> 2. 由于没有返回值的函数总是返回undefined，并且 void 在 JS 中总是返回 undefined，因此 TS 中 void 是告诉开发人员此函数总是返回 undefined 的合适类型
> 		declare function foo(i: number): void
> 
> 
> 3. 作为类型的 void 也可用于形参和所有其他声明。唯一可以传递的值是 undefined
> 		declare function foo(x: void): void {}
> 
> 
> 4. void 和 undefined 基本是一样的，但 void 作为返回类型可以被不同的类型替换，以允许高级回调模式
> 		function doSomething(callback: () => void) {
>         // 在当前环境中，callback 总是返回 undefined
>         let c = callback()
>         // c 也是 undefined 类型
>       }
>       // 这个函数返回一个数字
>       function aNumberCallback(): number {
>         return 2
>       }
>       // 正常工作，doSomething 确保了类型安全
>       doSomething(aNumberCallback)
> 
> 
> 5. 错误的返回调用
> 		function doSomething(callback: () => undefined) {
>       /* ... */
>     }
>     function aNumberCallback(): number {
>       return 2
>     }
>     // 类型不匹配
>     doSomething(aNumberCallback)
> ```

## 项目工程

### 在 TypeScript 中使用 ESLint

> ### 安装 ESLint
>
> ```bash
> # eslint
> npm install --save-dev eslint
> 
> # eslint默认用espree进行语法解析，安装 @typescript-eslint/parser 解析 eslint 的语法
> npm install --save-dev typescript @typescript-eslint/parser
> 
> 
> # 作为 eslint 默认规则的补充 和 一些适用于ts的语法规则
> npm install --save-dev @typescript-eslint/eslint-plugin
> ```
>
> ### 创建配置文件
>
> ESLint 需要一个配置文件来决定对哪些规则进行检查，配置文件的名称一般是 `.eslintrc.js` 或 `.eslintrc.json`。
> 当运行 ESLint 的时候检查一个文件时，它会首先尝试读取该文件的目录下的配置文件，然后再一级一级往上查找，将所找到的配置合并起来，作为当前被检查文件的配置。
> 我们在项目的根目录下创建一个 `.eslintrc.js`，内容如下：
>
> ```js
> module.exports = {
>  parser: '@typescript-eslint/parser',
>  plugins: ['@typescript-eslint'],
> rules: {
>     'no-var': "error",  // 禁止使用 var
>      // 优先使用 interface 而不是 type
>     '@typescript-eslint/consistent-type-definitions': [
>          "error",
>          "interface"
>      ]
>  }
> }
> ```
>
> 关闭、警告和报错的含义如下：
>
> - 关闭：禁用此规则
> - 警告：代码检查时输出错误信息，但是不会影响到 exit code
> - 报错：发现错误时，不仅会输出错误信息，而且 exit code 将被设为 1（一般 exit code 不为 0 则表示执行出现错误）
>
> ### 检查一个 ts 文件
>
> ```bash
> ## 执行下述命令， 会检查 ./server/index.ts 文件
> ./node_modules/.bin/eslint ./server/index.ts
> 
> 
> ## 简化检查 ts 文件步骤
> 因为使用的是 `./node_modules/.bin/eslint`，而不是全局的 `eslint` 脚本，这是因为代码检查是项目的重要组成部分，所以我们一般会将它安装在当前项目中。所以可通过在 `package.json` 中添加一个 `script` 来创建一个 npm script 来简化这个步骤：
>     {
>       "scripts": {
>        "eslint": "eslint ./server/index.ts"
>       }
>     }
> 然后执行 `npm run eslint`即可。
> ```
>
> ### 检查整个项目的 ts 文件
>
> 我们的项目源文件一般是放在 `src` 目录下，所以需要将 `package.json` 中的 `eslint` 脚本改为对一个目录进行检查。由于 `eslint` 默认不会检查 `.ts` 后缀的文件，所以需要加上参数 `--ext .ts`：
>
> ```json
> {
>   "scripts": {
>     "eslint": "eslint src --ext .ts"
>   }
> }
> ```
>
> 此时执行 `npm run eslint` 即会检查 `src` 目录下的所有 `.ts` 后缀的文件。

### 在 VSCode 中集成 ESLint 检查

> 在编辑器中集成 ESLint 检查，可以在开发过程中就发现错误，甚至可以在保存时自动修复错误，极大的增加了开发效率。
>
> 要在 VSCode 中集成 ESLint 检查，需要先安装 ESLint 插件，点击「扩展」按钮，搜索 ESLint，然后安装即可。
> 
>VSCode 中的 ESLint 插件默认是不会检查 `.ts` 后缀的，需要在「文件 => 首选项 => 设置 => 工作区」中（也可以在项目根目录下创建一个配置文件 `.vscode/settings.json`），添加以下配置：
> 
>```json
> {
>  "eslint.validate": [
>     "javascript",
>    "javascriptreact",
>     "typescript"
>  ],
>   "typescript.tsdk": "node_modules/typescript/lib"
>}
> ```
>
> 这时再打开一个 `.ts` 文件，将鼠标移到红色提示处，即可看到这样的报错信息了：
> 
> ![VSCode ESLint 错误信息](./image/vscode-eslint-error.png)
> 
>我们还可以开启保存时自动修复的功能，通过配置：
> 
>```json
> {
>    "eslint.autoFixOnSave": true,
>     "eslint.validate": [
>         "javascript",
>         "javascriptreact",
>         {
>             "language": "typescript",
>             "autoFix": true
>        },
>     ],
>    "typescript.tsdk": "node_modules/typescript/lib"
> }
>```
> 
> 就可以在保存文件后，自动修复为：
> 
> ```ts
> let myName = 'Tom';
> 
> interface Foo {}
> ```

### 使用 Prettier 修复格式错误

> ESLint 包含了一些代码格式的检查，比如空格、分号等。然后通过`Prettier`插件来格式化代码。
>Prettier 聚焦于代码的格式化，通过语法分析，重新整理代码的格式，让所有人的代码都保持同样的风格。
> 
> ```bash
>npm install --save-dev prettier
> ```
>
> 然后创建一个 `prettier.config.js` 文件，里面包含 Prettier 的配置项。Prettier 的配置项很少，：
>
> ```js
>// prettier.config.js or .prettierrc.js
> module.exports = {
>      printWidth: 100, // 一行最多 100 字符
>       tabWidth: 2, // 使用 2 个空格缩进
>      useTabs: false,  // 不使用缩进符，而使用空格
>        semi: true,  // 行尾需要有分号
>        singleQuote: true,  // 使用单引号
>        quoteProps: 'as-needed',  // 对象的 key 仅在必要时用引号
>        jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
>        trailingComma: 'none', // 末尾不需要逗号
>        bracketSpacing: true,  // 大括号内的首尾需要空格
>        jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
>        arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
>        rangeStart: 0,  // 每个文件格式化的范围是文件的全部内容
>        rangeEnd: Infinity,
>        requirePragma: false, // 不需要写文件开头的 @prettier
>        insertPragma: false, // 不需要自动在文件开头插入 @prettier
>        proseWrap: 'preserve',  // 使用默认的折行标准
>        htmlWhitespaceSensitivity: 'css',  // 根据显示样式决定 html 要不要折行
>        endOfLine: 'lf' // 换行符使用 lf
>    };
>    ```
>    
>    接下来安装 VSCode 中的 Prettier 插件，然后修改 `.vscode/settings.json`：
>    
>    ```json
>    {
>        "files.eol": "
>        ",
>        "editor.tabSize": 2,
>        "editor.formatOnSave": true,
>        "editor.defaultFormatter": "esbenp.prettier-vscode",
>        "eslint.autoFixOnSave": true,
>        "eslint.validate": [
>            "javascript",
>            "javascriptreact",
>            {
>                "language": "typescript",
>                "autoFix": true
>            }
>     ],
>    "typescript.tsdk": "node_modules/typescript/lib"
> }
> ```
> 
> 这样就实现了保存文件时自动格式化并且自动修复 ESLint 错误。但由于 ESLint 也可以检查一些代码格式的问题，所以在和 Prettier 配合使用时，一般会把 ESLint 中的代码格式相关的规则禁用掉，否则就会有冲突。
> 

### 使用 AlloyTeam 的 ESLint 配置

> ESLint 原生的规则和 `@typescript-eslint/eslint-plugin` 的规则太多了，而且原生的规则有一些在 TypeScript 中支持的不好，需要禁用掉。
>
> 推荐使用 [AlloyTeam ESLint 规则中的 TypeScript 版本](https://github.com/AlloyTeam/eslint-config-alloy#typescript)，它已经为我们提供了一套完善的配置规则，并且与 Prettier 是完全兼容的（eslint-config-alloy 不包含任何代码格式的规则，代码格式的问题交给更专业的 Prettier 去处理）。
> 
>```bash
> npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
>```
> 
>在你的项目根目录下创建 `.eslintrc.js`，并将以下内容复制到文件中即可：
> 
>```js
> module.exports = {
>  extends: [
>     'alloy',
>      'alloy/typescript',
>      ],
>      env: {
>       // 您的环境变量（包含多个预定义的全局变量）
>       // Your environments (which contains several predefined global variables)
>        //
>        // browser: true,
>        // node: true,
>        // mocha: true,
>        // jest: true,
>        // jquery: true
>      },
>      globals: {
>       // 您的全局变量（设置为 false 表示它不允许被重新赋值）
>       // Your global variables (setting to false means it's not allowed to be reassigned)
>        //
>        // myGlobal: false
>      },
>      rules: {
>       // 自定义您的规则
>      // Customize your rules
>      }
>    };
>   ```
> 

### 使用 ESLint 检查 tsx 文件

> 如果需要同时支持对 tsx 文件的检查，则需要对以上步骤做一些调整：
>
> #### 安装 `eslint-plugin-react`
> 
>```bash
> npm install --save-dev eslint-plugin-react
>```
> 
>#### package.json 中的 scripts.eslint 添加 `.tsx` 后缀
> 
>```json
> {
>  "scripts": {
>     "eslint": "eslint src --ext .ts,.tsx"
>  }
> }
>```
> 
> #### VSCode 的配置中新增 typescriptreact 检查
> 
> ```json
>{
>   "files.eol": "\n",
>  "editor.tabSize": 2,
>   "editor.formatOnSave": true,
>  "editor.defaultFormatter": "esbenp.prettier-vscode",
>   "eslint.autoFixOnSave": true,
>   "eslint.validate": [
>     "javascript",
>     "javascriptreact",
>     {
>       "language": "typescript",
>      "autoFix": true
>     },
>    {
>       "language": "typescriptreact",
>      "autoFix": true
>     }
>   ],
>   "typescript.tsdk": "node_modules/typescript/lib"
> }
> ```
> 
> #### 使用 AlloyTeam ESLint 规则中的 TypeScript React 版本
> 
> [AlloyTeam ESLint 规则中的 TypeScript React 版本](https://github.com/AlloyTeam/eslint-config-alloy#typescript-react)

### Troubleshootings

> ### Cannot find module '@typescript-eslint/parser'[§](http://ts.xcatliu.com/engineering/lint.html#cannot-find-module-typescript-eslintparser)
>
> 你运行的是全局的 eslint，需要改为运行 `./node_modules/.bin/eslint`。
> 
>### VSCode 没有显示出 ESLint 的报错
> 
>1. 检查「文件 => 首选项 => 设置」中有没有配置正确
> 2. 检查必要的 npm 包有没有安装
>3. 检查 `.eslintrc.js` 有没有配置
> 4. 检查文件是不是在 `.eslintignore` 中
>
> 如果以上步骤都不奏效，则可以在「文件 => 首选项 => 设置」中配置 `"eslint.trace.server": "messages"`，按 `Ctrl`+`Shift`+`U` 打开输出面板，然后选择 ESLint 输出，查看具体错误。
>
> ![VSCode 的 ESLint 输出](./image/vscode-output-eslint.png)
>
> ### 为什么有些定义了的变量（比如使用 `enum` 定义的变量）未使用，ESLint 却没有报错？
>
> 因为无法支持这种变量定义的检查。建议在 `tsconfig.json` 中添加以下配置，使 `tsc` 编译过程能够检查出定义了未使用的变量：
> 
> ```json
> {
>  "compilerOptions": {
>     "noUnusedLocals": true,
>    "noUnusedParameters": true
>   }
>}
> ```
> 
> ### 启用了 noUnusedParameters 之后，只使用了第二个参数，但是又必须传入第一个参数，这就会报错了
> 
> 第一个参数以下划线开头即可

### 编译选项

> | 选项                             | 类型      | 默认值  | 描述                                                         |
> | :------------------------------- | :-------- | :------ | :----------------------------------------------------------- |
> | **allowJs**                      | `boolean` | `false` | 是否允许编译 js 文件                                         |
> | **allowSyntheticDefaultImports** | `boolean` | `false` | 允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。 |

#### allowJs

> **allowJs**：是否允许编译 js 文件。设置为 `true` 时，js 文件会被 tsc 编译，否则不会。一般在项目中 js, ts 混合开发时需要设置。
>
> ```bash
> # 设置为 true 时，编译后的文件包含 foo.js
> ├── lib
> │   ├── foo.js
> │   └── index.js
> ├── src
> │   ├── foo.js
> │   └── index.ts
> ├── package.json
> └── tsconfig.json
> 
> # 设置为 false 时，编译后的文件不包含 foo.js
> ├── lib
> │   └── index.js
> ├── src
> │   ├── foo.js
> │   └── index.ts
> ├── package.json
> └── tsconfig.json
> ```

#### allowSyntheticDefaultImports

> **allowSyntheticDefaultImports**：允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。
>
> export = foo 是 ts 为了兼容 commonjs 创造的语法，它对应于 commonjs 中的 module.exports = foo。
>
> 在 ts 中，如果要引入一个通过 export = foo 导出的模块，标准的语法是 import foo = require('foo')，或者 import * as foo from 'foo'。
>
> 但由于历史原因，我们已经习惯了使用 import foo from 'foo'。
>
> 这个选项就是为了解决这个问题。当它设置为 true 时，允许使用 import foo from 'foo' 来导入一个通过 export = foo 导出的模块。当它设置为 false 时，则不允许，会报错。
>
> 当然，我们一般不会在 ts 文件中使用 export = foo 来导出模块，而是在写（符合 commonjs 规范的）第三方库的声明文件时，才会用到 export = foo 来导出类型。
>
> 比如 React 的声明文件中，就是通过 `export = React` 来导出类型：
>
> ```ts
> export = React;
> export as namespace React;
> 
> declare namespace React {
>     // 声明 React 的类型
> }
> ```
>
> 此时若我们通过 `import React from 'react'` 来导入 react 则会报错
>
> ```ts
> import React from 'react';
> // Module '"typescript-tutorial/examples/compiler-options/02-allowSyntheticDefaultImports/false/node_modules/@types/react/index"' can only be default-imported using the 'esModuleInterop' flagts(1259)
> ```
>
> 解决办法就是将 `allowSyntheticDefaultImports` 设置为 `true`。
