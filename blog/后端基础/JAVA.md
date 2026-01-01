---
Author: willysliang
CreateTime: 2020-11-18 13:24:51
Modifier: willysliang
ModifiedTime: 2025-12-22 15:15:52
Description: JAVA
---

## JAVA

## 基础语法

```bash
- 注释：单行注释、多行注释、文档注释
- 关键字：被Java赋予特定含义的单词（class、static）
- 字面量：数据在程序中的书写格式（666、"mySoul"）

变量：临时存储数据的容器
	- 变量必须先定义后使用。变量定义时，系统依据定义的类型给变量开辟对应大小的存储单元来存放数据。
	- 格式：数据类型 变量名 = 数据值;（变量需要有变量类型、变量名和分号结束）
	- 例：int a = 16; duoble b = 10.1;

数据类型：
	- 基本数据类型：byte、short、int、long、float、double、char、boolean
	- 引用数据类型：字符串、数组、类、及接口
	- 区别：
			基本数据类型存储在栈中，引用数据类型存储在堆中
			基本数据类型的变量之间是相互独立的，而引用数据类型的变量之间可能共享同一个对象

标识符：用来命名变量、方法、类、接口等程序元素的名称
	- 注意：
			1. 必须由数字、字母、下划线_、美元符号$ 组成
			2. 不能由数字开头
			3. 不能是关键字
			4. 区分大小写
	- 阿里巴巴命名规范
			尽量不要用拼音。但是一些国际通用的拼音可视为英文单词
			平时在给变量名、方法名、类名起名字时，不要使用下划线或美元符号

权限修饰符：是 Java 的一种关键字，用于控制类、方法、变量的访问权限
	- 权限范围：private < 默认/空着不写 < protected < public
			- public：公共的，所有地方都可以访问。
			- protected：本类、本包、其他包中的子类都可以访问。
			- 默认（没有修饰符）：本类、本包可以访问。
			- private：私有的，当前类可以访问。
	- 编写代码推荐使用：
			- 成员变量使用private，隐藏细节
			- 构造方法使用public，方便创建对象
			- 成员方法使用public，方便调用方法

包：一种用于组织和管理 Java 类的机制
	- 命名规范：路径名.路径名.xxx.xxx （如：com.willy.oa）
	- 导包：不是在 java.lang 包下，都需要导包。因为 Java 开发环境默认为 lang 包
	- 包名一般是域名的倒写。如 www.willy.com 的包名可定义为 com.willy.技术名称
	- 什么时候需要导包？
			1. 在使用Java中提供的非核心包(java.lang)中的类时
			2. 使用自己写的其他包中的类时
	- 什么时候不需要导包？
			1. 在使用Java核心包（java.lang）中的类时
			2. 在使用自己写的同一个包中的类时
```

### java编译

```bash
javac 是 Java 编译器的命令行工具，用于将 Java 源代码文件(.java)编译成 Java 字节码文件(.class)。
Java 字节码文件可以在虚拟机(JVM)上运行。

注意：执行 .class 文件时，不需要加 .class 后缀


$ javac HelloWorld.java # 根据 HelloWorld.java 文件编译成 HelloWorld.class 文件
$ java HelloWorld	# 执行 HelloWorld.class 文件



JVM（Java Virtual Machine），Java虚拟机
JRE（Java Runtime Environment），Java运行环境，包含了JVM和Java的核心类库（Java API）
JDK（Java Development Kit）称为Java开发工具，包含了JRE和开发工具
```

![image-20201118004738408](./image/image-20201118004738408.png)

### idea快捷键

```bash
模板补全：输入缩写后按 Tab键可快速生成代码。
  psvm + Tab：生成 main方法 。
  sout + Tab：生成 System.out.println();。
  fori + Tab：生成 for循环 。
  Ctrl+J：查看所有可用的动态模板 。

后缀补全：
  表达式.fori：生成遍历循环。
  表达式.null：生成空值检查 if (expression == null)。
  new MyClass().var：自动生成变量声明 MyClass obj = new MyClass();


重构生成
  Alt + Insert：生成代码，快速生成 Getter/Setter、构造函数、toString()等方法 。
  Shift + F6：安全重命名，重命名变量、方法、类等，并自动更新所有引用 。
  Ctrl + Alt + M：提取方法，将选中的代码块提取成一个独立的方法 。
  Ctrl + Alt + V：提取变量，将表达式结果提取为一个新变量 。
  Ctrl + Alt + T：包裹代码，用 if、try-catch、for等环绕选中的代码

调试：
  Shift + F10：运行当前程序
  Shift + F9：以调试模式运行 。
  F8：步过，逐行执行，不进入方法内部 。
  F7：步入，进入当前行所调用的方法内部 。
  Shift + F8：步出，从当前方法跳出到调用处 。
  F9：恢复程序，继续运行直到下一个断点 。
  Alt + F8：在调试时，选中变量或表达式，按此快捷键可计算其值
```



#### JavaBean 类快速生成

```bash
JavaBean 是一个遵循特定写法的Java类，它具备特点：
	- 这个Java类必须具有一个无参的构造函数
	- 属性必须私有化。
	- 私有化的属性必须通过public类型的方法暴露给其它程序，并且方法的命名也必须遵守一定的命名规范。


- ptg插件，直接生成标准 javaBean
创建类，定义好成员变量后，通过 `右键 -> Ptg to JavaBean` 来生成 get/post 方法
```

![image-20260101145705984](./image/image-20260101145705984.png)

````java
public class Animal {
    private String name;
    private int num;


  	//------------------类的构造方法--------------------------------------
    public Animal() {
    }

    public Animal(String name, int num) {
        this.name = name;
        this.num = num;
    }

  	//------------------类对外提供的用于访问私有属性的public方法-----------------------------------
    /**
     * 获取
     * @return name 
     */
    public String getName() {
        return name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取
     * @return num 
     */
    public int getNum() {
        return num;
    }

    /**
     * 设置
     * @param num
     */
    public void setNum(int num) {
        this.num = num;
    }

    public String toString() {
        return "Animal{name = " + name + ", num = " + num + "}";
    }
}
````



### 注释

```java
// 这是单行注释文字

/*
这是多行注释文字
这是多行注释文字
这是多行注释文字
*/

/**
这是文档注释文字
这是文档注释文字
这是文档注释文字
*/
```



### 关键字

```bash
修饰符关键字：public、protected、private、static、final、abstract
访问控制关键字：public、protected、private、default（默认）
类、接口和包关键字：、class、interface、enum、package、import、extends、implements
方法关键字：void、return、this、super
流程控制关键字：if、else、switch、case、default、while、do、for、break、continue、return
异常处理关键字：try、catch、finally、throw、throws
逻辑关键字：true、false、null
其他关键字：new、instanceof、synchronized、transient、volatile、assert
```

### 字面量

```bash
整数字面量：表示整数值，可以使用十进制、八进制（以0开头）和十六进制（以0x或0X开头）表示法。例如：42, 012, 0xFF。
浮点数字面量：表示浮点数值，包括普通的浮点数和科学计数法表示。例如：3.14, 2.0e-5。
字符字面量：表示单个字符，使用单引号括起来。例如：'A', '1', '@'。
字符串字面量：表示一个字符串，使用双引号括起来。例如："Hello, World!", "Java"。
布尔字面量：表示布尔值，只有两个取值：true 和 false。
null 字面量：表示空引用，用于表示对象引用不指向任何有效的对象。
转义序列：一些特殊的字符序列，以反斜线 \ 开头，用于表示无法直接输入的字符，如换行符 \n、制表符 \t 等。
数组字面量：用花括号 {} 表示，用于初始化数组。例如：{1, 2, 3}。
枚举常量：枚举类型的常量值，表示枚举中的特定选项。
字符编码字面量：表示字符的Unicode编码，以 \u 开头，后面跟着四个十六进制数字。例如：\u0041 表示字符 ‘A’
```

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(10); // 输出一个整数
        System.out.println(5.5); // 输出一个小数
        System.out.println('a'); // 输出一个字符
        System.out.println(true); // 输出boolean值true
        System.out.println("欢迎来到黑马程序员"); // 输出字符串
    }
}
```



### 变量

```java
public class VariableDemo2{
	public static void main(String[] args){
		//1.变量名不允许重复
		//int a = 10;
		//int a = 20;
		//System.out.println(a);

		//2.一条语句可以定义多个变量
		//int a = 10, b = 20, c = 20,d = 20;
		//System.out.println(a);//?
		//System.out.println(b);//?

		//3.变量在使用之前必须要赋值
		int a = 30;
		System.out.println(a);
	}
}
```

### 数据类型

```bash
Java 数据类型是用来定义变量或表达式可以存储的数据类型的分类

#### 基本数据类型：
整数类型：
		byte：8位，范围为 -128 到 127
		short：16位，范围为 -32,768 到 32,767
		int：32位，范围为 -2^31 到 2^31 - 1
		long：64位，范围为 -2^63 到 2^63 - 1
浮点类型：
		float：32位，用于表示单精度浮点数
		double：64位，用于表示双精度浮点数
字符类型：char：16位，用于存储一个 Unicode 字符
布尔类型：boolean：用于表示布尔值，只有两个取值：true 和 false

注意：
- byte类型的取值范围： -128 ~ 127
- int类型的大概取值范围： -21亿多 ~ 21亿多
- 整数类型和小数类型的取值范围大小关系：double > float > long > int > short > byte


#### 引用数据类型
类（Class）：用来创建对象的模板。它定义了对象的属性（成员变量）和方法（成员方法）。通过实例化类，可以创建类的对象，并使用对象调用类的方法。
接口（Interface）：定义了一组方法的规范，但没有实际的方法体。类可以实现一个或多个接口，从而获得接口定义的方法，并在类中实现这些方法。
数组（Array）：数组是一种用于存储相同类型元素的数据结构。它可以是一维数组或多维数组，用于在内存中连续存储多个元素。
枚举（Enum）：枚举是一种特殊的类，用于表示一组预定义的常量。枚举常常用于表示一组相关的值。
字符串（String）：字符串是一种引用数据类型，但它具有特殊的性质，可以像基本数据类型一样进行操作。字符串实际上是一个字符序列，它有许多方法用于处理字符串操作。
自定义引用类型：除了上述内置的引用数据类型，还可以创建自定义的类和接口，以及它们的实例，从而构建更复杂的数据结构和功能



#### 基本数据类型和引用数据类型的区别
基本数据类型：按值传递，在Java虚拟机栈中分配内存空间，并直接存储值本身。当基本数据类型的变量被赋值时，实际上是将该变量中的值复制到另一个变量中，这两个变量之间没有任何关联。
引用数据类型：按引用传递，在Java虚拟机堆中分配内存空间，存储的是对象的引用（内存地址）。当引用数据类型的变量被赋值时，实际上是将该变量中的引用复制到另一个变量中，这两个变量指向同一个对象。
```

```java
public class VariableDemo3{
    public static void main(String[] args){
        //1.定义byte类型的变量
        //数据类型 变量名 = 数据值;
        byte a = 10;
        System.out.println(a);

        //2.定义short类型的变量
        short b = 20;
        System.out.println(b);

        //3.定义int类型的变量
        int c = 30;
        System.out.println(c);

        //4.定义long类型的变量
        long d = 123456789123456789L;
        System.out.println(d);

        //5.定义float类型的变量
        float e = 10.1F;
        System.out.println(e);

        //6.定义double类型的变量
        double f = 20.3;
        System.out.println(f);

        //7.定义char类型的变量
        char g = 'a';
        System.out.println(g);

        //8.定义boolean类型的变量
        boolean h = true;
        System.out.println(h);
    }
}
```

```java
// 使用引用数据类型创建一个对象
String message = new String("Hello, World!");

// 创建一个数组
int[] numbers = new int[5];

// 使用自定义类创建对象
class Person {
    String name;
    int age;
}
Person person = new Person();
person.name = "Alice";
person.age = 30;

// 枚举类型
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
Day today = Day.WEDNESDAY;
```

### 数据内存划分

![image-20201128010728114](./image/image-20201128010728114.png)

![image-20201128012122146](./image/image-20201128012122146.png)



### 类型转换

```bash
1. 自动类型转换
	- 类型相容
	- 目标类型 > 源类型
	- double num1 = 1.2; int num2 = 2; double result = num1 + num2;

2. 强制类型转换
	- (类型名) 表达式
	- double a = 5.2; int b = (int) a;

注意：如果想让整数相除转换为浮点数，则需要让除数或者被除数转换为浮点数才行

3. 保留小数位数
	- String.format("%.2f", num); // 保留两位小数
	- System.out.printf("保留两位小数：%.2f%n", num); // 输出的时候才进行保留两位小数
```

```java
public class Main {
    public static void main(String[] args) {
        // 已知某班有男同学20位，女同学15位，20位男生平均分是87分，15位女生的平均分是85，问全体同学平均分是多少分?
        int total = 20 * 87 + 15 * 85; // 总分
        int num = 20 + 15; // 总人数

        // 平均分（因为总分和总人数都是整数，而为了相除获取浮点数则需要让分子或分母为浮点数才行，所以需要 * 1.0）
        double avg = total * 1.0 / num;
        // double avg = total / (num * 1.0);

        String result = String.format("%.2f", avg);
        System.out.println("平均分为：" + result);

        System.out.printf("平均分为：%.2f%n", avg);
    }
}
```



### 包装类

```bash
包装类定义：使用一个类把基本数据类型的数据包装起来，在包装类中可定义方法来操作基本类型的数据

int->Integer		char->Character		（其余数据类型都是首字母大写（byte、short、long、float、double、boolean））

装箱：把基本类型的数据包装到包装类中（基本类型的数据->包装类）
		0、基本类型转成包装类(直接赋值，自动转换)
				Interger num=2;	Double num2=1.5;
    1、构造方法：
      	Integer(int value) 构造一个新分配的Integer对象，它表示指定的int值。
      	Integer(String s) 构造一个新分配的Integer对象，它表示String参数所指示的int值。
      			(传递的字符串必须是字符串化的数值，否则会抛出异常		如："100"值正确，“a”异常)
    2、静态方法:
      	static Integer valueOf(int i) 返回一个表示指定的int值的Integer实例
      	static Integer valueOf(String s) 返回保存指定的String的值的Integer对象
拆箱：在包装类中去除基本类型的数据（包装类->基本类型的数据）
    1、成员方法（XXXValue()系列方法）：如`intValue()`以int类型返回该Integer的值
```

```java
public static void main(String[] args){
    //构造方法
    Integer in1 = new Integer(1);	//1
    Integer in2 = new Integer("1")	//1

    //静态方法（手动装箱）
    Integer in3 = Integer.valueOf(1);	//1
    //Integer in4 = Integer.valueOf("a");	//NumberFormatException数字格式化异常
    Integer in5 = Integer.valueOf("1");	//1

    //拆箱（手动拆箱）
    int i = in1.intValue();

    //自动装箱与拆箱
    Integer in = 1;		//等同 Integer in = new Integer(1);
    in = in + 2;	//等同 new Integer(in.intValue() + 2) = 3;


  	//ArratList集合无法直接存储整数，可以存储Integer包装类
    ArrayList<Integer> list = new ArrayList<Integer>();
    list.add(1);	//自动装箱 list.add(new Integer(1));
    int a = list.get(0);	//自动拆箱 list.get(0).intValue();
}
```

#### 类型转换

- 基本类型-->字符串

  1. 基本类型数据的值+""	（最简单的方式）
  2. 使用包装类中的静态方法 static String toString(int i) 返回一个表示指定整数的 String 对象。
  3. 使用 String 类中的静态方法 static StringvalueOf(int i) 返回 int 参数的字符串表示形式。

- 字符串-->基本类型

  使用包装类的静态方法 parseXX("字符串")

  ​	Integer类：static int parseInt(String s)

  ​	Double类：static double parseDouble(String s)

```java
//基本类型-->字符串
String s1 = 100 + "";
String s2 = Integer.toString(100);
String s3 = String.valueOf(100);

//字符串-->基本类型
int i1 = Integer.parseInt("100");
//int i2 = Integer.parseInt("a");	//数字格式化异常
```



### 导入包

```bash
为了使用不在同一包中的类，需要在 Java 程序中使用 import 关键字导入这个类：`import 包名.类名;`

导入包注意：
- 一个类同时引用两个来自不同包的同名类：
		- 必须先通过完整类名来区分
- package 和 import 的顺序是固定的
		- package 必须位于第一行
		- 只允许有一个 package 语句
		- 其次是 import
		- 接着是类的声明


快捷键：Eclipse/IntelliJ IDEA：Ctrl+Shift+O 优化导入

陷阱：
	- 导入子包不能访问父包：`import java.*;`不能导入java下的所有子包
	- 默认包：没有声明 package 的类不能被导入
	- 循环依赖：类A导入类B，类B又导入类A
```

```java
// 1. 标准库包
import java.io.*;
import java.util.*;

// 2. 第三方库
import org.springframework.*;
import com.google.common.*;

// 3. 项目内部包
import com.mycompany.myproject.*;

// 静态导入单独分组
import static java.lang.Math.PI;
import static org.junit.Assert.*;

// 错误示例 - 冲突
// import java.util.Date;
// import java.sql.Date;

// 解决方案1：只导入一个，另一个用全限定名
import java.util.Date;

public class Test {
    public void method1() {
        Date utilDate = new Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
    }

  	// 解决方案2：都不导入，全用全限定名
  	public void method2() {
        java.util.Date utilDate = new java.util.Date();
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
    }
}
```



### 接收输入Scanner

```bash
如果想接收用户从键盘上输入的内容，在 Java 中可以使用 Scanner（扫描仪）


Scanner input = new Scanner(System.in); // 实例化一个scanner对象

int num = input.nextInt(); // 获取输入的整数（如果输入其他类型则会报错）
String str = input.next(); // 接收输入的字符串
String ch = input.next().charAt(1); // 接收输入的第二个字符
```

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int num = input.nextInt();
        System.out.println("您输入的数字为" + num);
    }
}
```

```java
import java.util.Scanner;

// 输入一个小写字母，输出其对应的大写字母。例如输入q时，会输出Q。
public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        char ch = input.next().charAt(0); // 下标为0代表第一个字符
        char bigCh = (char)(ch - 32);
        System.out.println(bigCh);
    }
}
```



### 程序的三大结构

```bash
- 顺序结构：程序只能从第一行开始执行，中间不能跳过某一行代码去执行后续代码。
- 选择结构：让代码有选择地执行，可让某一行或多行代码在条件不符合时不执行。
- 循环结构：让某一行或多行代码可以重复执行多次。


#### 选择结构
1. 关系运算符
		关系表达式的值是一个逻辑值(true | false)。条件成立为真，条件不成立为假。
2. if 选择结构
3. if-else 选择结构
4. 多重 if 选择结构
5. 嵌套 if 选择结构
6. switch 选择结构


#### 循环结构
1. for循环：for(循环变量赋初值; 循环条件; 循环变量增值) { 循环语句; }
2. break和continue
3. while 循环结构
4. do-while 循环结构
```

![image-20251211101650222](./image/image-20251211101650222.png)

```java
import java.util.Scanner;

public class ControlStructureDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=== Java 控制结构综合演示 ===");
        System.out.println("请输入一个数字 (1-3 测试选择结构，4-7 测试循环结构)：");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1: demoRelationOperators();  // 关系运算符
                break;
            case 2: demoIfStructures();       // if 选择结构
                break;
            case 3: demoSwitchStructure();    // switch 选择结构
                break;
            case 4: demoForLoop();            // for 循环
                break;
            case 5: demoWhileLoop();          // while 循环
                break;
            case 6: demoDoWhileLoop();        // do-while 循环
                break;
            case 7: demoBreakContinue();      // break 和 continue
                break;
            default: System.out.println("输入错误，程序结束。");
        }

        scanner.close();
    }

    // 1. 关系运算符演示
    public static void demoRelationOperators() {
        System.out.println("\n=== 1. 关系运算符演示 ===");

        int a = 10, b = 20, c = 10;

        System.out.println("a = " + a + ", b = " + b + ", c = " + c);
        System.out.println("a == b: " + (a == b));  // false
        System.out.println("a != b: " + (a != b));  // true
        System.out.println("a > b: " + (a > b));    // false
        System.out.println("a < b: " + (a < b));    // true
        System.out.println("a >= c: " + (a >= c));  // true
        System.out.println("b <= c: " + (b <= c));  // false

        // 关系表达式的值是 boolean 类型
        boolean result1 = a == c;  // true
        boolean result2 = b > c;   // true
        System.out.println("a == c 的结果: " + result1);
        System.out.println("b > c 的结果: " + result2);
    }

    // 2. if 选择结构演示
    public static void demoIfStructures() {
        System.out.println("\n=== 2. if 选择结构演示 ===");

        Scanner scanner = new Scanner(System.in);

        System.out.println("请输入你的年龄: ");
        int age = scanner.nextInt();

        // 2.1 简单 if 结构
        System.out.println("\n--- 简单 if 结构 ---");
        if (age >= 18) {
            System.out.println("你已经成年了！");
        }

        // 2.2 嵌套 & 多重 if 结构
        System.out.println("\n--- 嵌套 if 结构 ---");
        System.out.println("请输入你的性别 (1:男, 2:女): ");
        int gender = scanner.nextInt();

        if (age >= 18) {
            if (gender == 1) {
                System.out.println("你是成年男性。");
            } else if (gender == 2) {
                System.out.println("你是成年女性。");
            } else {
                System.out.println("性别输入错误。");
            }
        } else {
            System.out.println("你还没有成年。");
        }

        scanner.close();
    }

    // 3. switch 选择结构演示
    public static void demoSwitchStructure() {
        System.out.println("\n=== 3. switch 选择结构演示 ===");

        Scanner scanner = new Scanner(System.in);

        System.out.println("请输入星期几 (1-7): ");
        int day = scanner.nextInt();

        // switch 基本用法
        System.out.print("今天是: ");
        switch (day) {
            case 1:
                System.out.println("星期一");
                break;
            case 2:
                System.out.println("星期二");
                break;
            case 3:
                System.out.println("星期三");
                break;
            case 4:
                System.out.println("星期四");
                break;
            case 5:
                System.out.println("星期五");
                break;
            case 6:
            case 7:
                System.out.println("周末");
                break;
            default:
                System.out.println("输入错误，请输入 1-7 的数字");
        }

        // Java 12+ 新的 switch 表达式（语法糖）
        System.out.println("\n--- switch 表达式 (Java 12+) ---");
        String dayType = switch (day) {
            case 1, 2, 3, 4, 5 -> "工作日";
            case 6, 7 -> "休息日";
            default -> "无效";
        };
        System.out.println("今天类型: " + dayType);

        scanner.close();
    }

    // 4. for 循环演示
    public static void demoForLoop() {
        System.out.println("\n=== 4. for 循环演示 ===");

        // 4.1 基本 for 循环
        System.out.println("--- 基本 for 循环 (1-5) ---");
        for (int i = 1; i <= 5; i++) {
            System.out.println("i = " + i);
        }

        // 4.2 倒序循环
        System.out.println("\n--- 倒序循环 (5-1) ---");
        for (int i = 5; i >= 1; i--) {
            System.out.println("i = " + i);
        }

        // 4.3 步长为 2
        System.out.println("\n--- 步长为 2 (1-10 的奇数) ---");
        for (int i = 1; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        // 4.4 嵌套 for 循环 (乘法表)
        System.out.println("\n--- 嵌套 for 循环 (九九乘法表前3行) ---");
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + "×" + i + "=" + (i * j) + "\t");
            }
            System.out.println();
        }

        // 4.5 增强 for 循环 (for-each)
        System.out.println("\n--- 增强 for 循环 (遍历数组) ---");
        int[] numbers = {10, 20, 30, 40, 50};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        // 4.6 无限循环 (需要 break 退出)
        System.out.println("\n--- 无限 for 循环 (打印5次后退出) ---");
        int count = 0;
        for (;;) {  // 相当于 while(true)
            System.out.println("这是第 " + (++count) + " 次循环");
            if (count >= 5) {
                break;
            }
        }
    }

    // 5. while 循环演示
    public static void demoWhileLoop() {
        System.out.println("\n=== 5. while 循环演示 ===");

        // 5.1 基本 while 循环：计算 1-100 的和
        System.out.println("\n--- 计算 1-100 的和 ---");
        int sum = 0;
        int num = 1;
        while (num <= 100) {
            sum += num;
            num++;
        }
        System.out.println("1-100 的和是: " + sum);

        // 5.3 输入验证
        System.out.println("\n--- 输入验证 (必须输入正数) ---");
        Scanner scanner = new Scanner(System.in);
        int input = 0;

        while (input <= 0) {
            System.out.print("请输入一个正整数: ");
            input = scanner.nextInt();
            if (input <= 0) {
                System.out.println("输入错误，请重新输入！");
            }
        }
        System.out.println("你输入的是: " + input);

        // 5.4 无限循环
        System.out.println("\n--- 无限 while 循环 (打印3次后退出) ---");
        int counter = 0;
        while (true) {
            System.out.println("循环次数: " + (++counter));
            if (counter >= 3) {
                System.out.println("达到3次，退出循环");
                break;
            }
        }
        scanner.close();
    }

    // 6. do-while 循环演示
    public static void demoDoWhileLoop() {
        System.out.println("\n=== 6. do-while 循环演示 ===");

        // 6.1 基本 do-while
        System.out.println("--- 基本 do-while 循环 ---");
        int i = 1;
        do {
            System.out.println("i = " + i);
            i++;
        } while (i <= 5);

        // 6.2 至少执行一次的特点
        System.out.println("\n--- 验证 do-while 至少执行一次 ---");
        int j = 10;
        do {
            System.out.println("j = " + j);  // 即使条件不满足，也会执行一次
            j++;
        } while (j < 5);
    }

    // 7. break 和 continue 演示
    public static void demoBreakContinue() {
        System.out.println("\n=== 7. break 和 continue 演示 ===");

        // 7.1 break 语句
        System.out.println("--- break 语句演示 ---");
        System.out.println("在 1-10 中查找第一个能被3整除的数:");
        for (int i = 1; i <= 10; i++) {
            if (i % 3 == 0) {
                System.out.println("找到第一个能被3整除的数: " + i);
                break;  // 找到后立即退出循环
            }
            System.out.println("检查: " + i);
        }

        // 7.2 continue 语句
        System.out.println("\n--- continue 语句演示 ---");
        System.out.println("打印 1-10 中的奇数:");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;  // 跳过偶数
            }
            System.out.print(i + " ");
        }
        System.out.println();

        // 7.3 break 在 while 循环中
        System.out.println("\n--- break 在 while 循环中 ---");
        int num = 0;
        while (num < 10) {
            num++;
            if (num == 5) {
                System.out.println("遇到5，提前结束循环");
                break;
            }
            System.out.println("当前值: " + num);
        }

        // 7.4 continue 在 while 循环中
        System.out.println("\n--- continue 在 while 循环中 ---");
        int count = 0;
        while (count < 10) {
            count++;
            if (count % 3 == 0) {
                continue;  // 跳过3的倍数
            }
            System.out.print(count + " ");
        }
        System.out.println();

        // 7.5 带标签的 break (跳出多层循环)
        System.out.println("\n--- 带标签的 break ---");
        outerLoop:  // 标签
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    System.out.println("i=" + i + ", j=" + j + " 时跳出外层循环");
                    break outerLoop;  // 直接跳出外层循环
                }
                System.out.println("i=" + i + ", j=" + j);
            }
        }

        // 7.6 带标签的 continue
        System.out.println("\n--- 带标签的 continue ---");
        outerLoop2:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) {
                    System.out.println("跳过 i=2 时的剩余循环");
                    continue outerLoop2;  // 继续外层循环的下一次迭代
                }
                System.out.println("i=" + i + ", j=" + j);
            }
        }

        // 7.7 break 在 switch 中
        System.out.println("\n--- break 在 switch 中的使用 ---");
        int option = 2;
        switch (option) {
            case 1:
                System.out.println("选项1");
                break;  // 防止case穿透
            case 2:
                System.out.println("选项2");
                // 这里没有break，会发生case穿透
            case 3:
                System.out.println("选项3");
                break;
            default:
                System.out.println("默认选项");
        }
    }
}
```



### 异常处理

```bash
处理异常的关键字：try、catch、finally、throw、throws
  - try：执行可能产生异常的代码
  - catch：捕获异常
  - finally：表示在最后，无论是否发生异常，代码都会执行
  - throws：声明方法可能要抛出的各种异常
  - throw：手动抛出异常

异常的方法（Exception）
	- void printStackTrace()：输出异常的堆栈信息
	- String getMessage()：返回异常信息描述字符串，是 printStackTrace() 输出信息的一部分

多路异常捕获
	- 排列 catch 语句的顺序：先子类后父类
	- 发生异常时按顺序逐个匹配
	- 只执行第一个与异常类型匹配的 catch 语句



	  try {
      // 代码段 1
      // 可能产生异常的代码段 2
    } catch (异常类型 ex) {
      // 对异常进行处理的代码段 3
      System.out.println(ex.getMessage());
      ex.printStackTrace();
    } finally {
      // 最后执行的代码段 4
    }
```

![img](./image/670909dbe023be430fd0665e35107023aa689761.png)

```java
Scanner input = new Scanner(System.in);
int result = 0;

// 多路异常捕获
try {
    System.out.println("请输入被除数");
    int num1 = input.nextInt();
    System.out.println("请输入除数");
    int num2 = input.nextInt();
    result = num1 / num2;
    System.out.println(result);
} catch (InputMismatchException ex) { // 捕获类型错误
  	System.err.println("被除数和除数必须是整数");
} catch (ArithmeticException ex) {// 捕获算数异常
  	System.err.println("除数不能为0");
} catch (Exception ex) { // 捕获其他异常
		System.err.println("其他异常");
} finally {
		System.out.println("程序结束");
}
```

#### 自定义异常

```java
public class CustomException extends Exception {
    public CustomException(String msg) {
        super(msg);
    }
}

public class Test {
    public static void main(String[] args) {
        try {
            throw new CustomException("自定义错误");
        } catch (CustomException e) {
            System.out.println(e.getMessage()); // 自定义错误
        }
    }
}
```



### 字符串

```bash
程序中所有的双引号字符串，都是String类的对象


- 将int[]数组转变为字符串格式：String intStr = Arrays.toString(intArray);
- String-->数组：toCharArray
- 数组重新排序：Arrays.sort(数组);	//默认字母/从小到大排序
```

```java
//使用空参构造
String str1 = new String();//str1是空的字符串

//根据字符数组创建
char[] arr = {'A','B','C'};
String str2 = new String(arr);//str2为ABC

//根据字节数组创建字符串
byte[] arr2 = {97,98,99};
String str3 = new String(arr2);//str3为abc

//直接创建
String str = "hello";
```

#### 内容比较 equals与equalsIgnoreCase

```java
//区分大小写 equals()
String str1 = "Hello";
String str2 = "hello";
System.out.println(str1.equals(str2));	//false
Sysytem.out.println("Hello".equals(str1));	//true

//不区分大小写equalsIgnoreCase()
System.out.println(str1.equalsIgnoreCase(str2));	//true
```

#### 索引查找

```java
String str1 = "Hello";
String str2 = "World";
//拼接字符串
String str3 = str1.concat(str2);	//HelloWorld

//获取指定索引位置的单个字符
char ch = "Hello".chatAt(1);	//e

//查找参数字符串在本来字符串当中出现的第一次索引位置（-1代表没有）
str1.indexOf("llo");	//2
```

#### 字符串转换

```java
String str1 = "HelloWorld";
//字符串截取	substring
String str2 = str1.subsring(5);	//World

//字符串替换	replace()
String str3 = str1.replace("l","*");	//He**oW*rld

//分割字符串	splice
String str4 = "aaa,bbb,ccc";
String[] array1 = str1.splice(",");
```



#### String类与StringBuilder类

![image-20201228224638118](./image/image-20201228224638118.png)

```java
/*StringBuilder常用方法
public StringBuilder append(...);	//添加任意类型数据的字符串形式，并返回当前对象本身
public String toString();	//将当前StringBuilder对象转换为String对象
*/

/*1.构造方法*/
StringBilder();	//创建一个空的字符串
StringBuilder(String s);	//根据传入的内容创建一个字符串缓冲区

/*2.成员方法*/
StringBuilder append(Object obj);	//添加内容
StringBuilder reverse();	//反转内容
String toString();	//将缓冲区内容转为字符串
```

````java
StringBuilder sb = new StringBuilder();
sb.append("hello,").append("world~");	//hello,world~
sb.reverse();	//将数组内容翻转
````



### 数组 Arrays

```bash
数组是一组相同类型的变量，它们往往是为了表示同一批对象的统一属性。

数组的特性
  - 数组是一种引用数据类型
  - 数组当中的多个数据类型必须统一
  - 数组长度在程序运行期间不可改变
  - 初始化（动态初始化-指定长度、静态初始化-指定内容）
  - 确定数组内容用静态初始化，不确定用动态初始化

学习顺序
	1. 数组的定义和使用
	2. 数组求最值：遍历逐个查找对比
	3. 数组插入：先确认位置，然后先把插入所在位置及之后的元素后移，然后再插入元素
	4. 删除元素：先确认位置，然后把删除所在位置及之后的元素前移（会覆盖）
	5. 顺序查找
	6. 二分法查找
			关注左右边界
			循环条件：left <= right
			计算中间位置：(left + right) / 2
			动态调整左右边界
			如100个数字最多查找7次，因为2的7次方 > 100
	7. 冒泡排序算法


#### 空指针异常NullPointerException
数组必须进行new初始化才能使用其中元素，如果只赋一个null值，没有进行new创建，则发生空指针异常 NullPointerException
原因：没new初始化	-->	解决：new初始化
```

```java
//动态初始化，指定长度
//数据类型[] 数组名称 = new 数据类型[数组长度]
double[] arrayA = new double[10];

//静态初始化,指定内容
//数据类型[] 数组名称 = new 数据类型[]{元素1,元素2,元素3,...,元素n}
double[] arrayB = new double[]{1,2,3,4};	//长度是4
String[] arrayC = new String[]{"hello","hi"};	//长度是2

//省略格式
double[] arrayB ={1,2,3,4};

//数组的输出
System.out.println(arrayB);	//输出数组的首地址
System.out.println(arrayB[0]);	//输出数组第一位数：1
//数组的长度
int len = arrayB.length;


//通过数组存储多个返回值
public static void main(String[] args){
    int[] result = calculate(10,20,30);
    System.out.println("总和："+result[0]);
    System.out.println("平均数："+result[1]);
}
public static calculate(int a,int b,int c){
    int sum = a + b + c;
    int avg = sum / 3;
    int[] array = {sum, avg };
    return array;	//返回一个数组
}
```

#### 数组插入

```java
import java.util.Scanner;

public class ArrayInsert {
    // 在一个升序排序的成绩数组中，增加一个学生的成绩，并保证数组元素保持升序排列
    public static void main(String[] args) {
        int[] nums = new int[5];
        nums[0] = 78;
        nums[1] = 85;
        nums[2] = 95;
        nums[3] = 98;

        Scanner input = new Scanner(System.in);
        int scope = input.nextInt(); // 保存插入的分数

        // 1.先查找出插入成绩的位置
        int index = nums.length - 1;
        for (int i = 0; i < nums.length; i++) {
            if (scope < nums[i]) {
                index = i;
                break;
            }
        }

        // 2.把要插入成绩位置及其之后的元素都往后移
        for (int i = nums.length - 1; i > index; i--) {
            nums[i] = nums[i - 1];
        }

        // 3.插入成绩
        nums[index] = scope;

        // 打印最新结果
        for (int i = 0; i <= nums.length - 1; i++) {
            System.out.printf(nums[i] + "\t");
        }
    }
}
```

#### 二分法查找

```java
import java.util.Scanner;

public class BinarySearch {
    // 二分法查找：猜想一个 1~100 之间的数，根据猜测的数字提示“猜大了”、“猜小了”、“猜对了”。使用二分法模拟猜数字过程
    public static void main(String[] args) {
        System.out.println("请输入一个数字，范围是：(1~100之间，包含1和100)");
        Scanner input = new Scanner(System.in);
        int num = input.nextInt();

        int left = 1;
        int right = 100;
        while(left <= right) {
            int middle = (left + right) / 2;

            // 已经查找到
            if (middle == num) {
                System.out.println(middle + ",猜对了");
                break;
            }

            // 边界右移
            if (middle < num) {
                left = middle + 1;
                System.out.println(middle + ",猜小了");
            }

            // 边界左移
            if (middle > num) {
                right = middle - 1;
                System.out.println(middle + ",猜大了");
            }

        }
    }
}
```



## 常用API

### 系统 System

```java
// System.currentTimeMillis() 获取当前时间毫秒值（可用来计算运行程序所需要时间、或用作文件命名-防止文件重名）
long start = System.currentTimeMillis();
// ...中间执行的代码(计算该段代码的执行时间)
long end = System.currentTimeMillis();
System.out.println(end - start);	// xx毫秒


// 终止当前运行的虚拟机
System.exit(0); // 当前虚拟机是正常停止
System.exit(1); // 非0：当前虚拟机异常停止


// 拷贝数组：System.arraycopy(数据源数组, 起始索引, 目标数组, 起始索引, 拷贝个数);
int[] arr1 = {1,2,3,4,5,6,7,8,9};
int[] arr2 = {9,8,7,6,5,4,3,2,1};
System.arraycopy(arr1, 0, arr2, 0, 4);	//把arr1数组的前4个数字复制到arr2数组中
System.out.println(arr2);	  //1,2,3,4,5,4,3,2,1
```

### 运行 Runtime

```bash
常用方法：
  - 当前系统的运行环境对象：public static Runtime getRuntime()
  - 停止虚拟机：public void exit(int status)
  - 获取CPU的线程数：public int availableProcessors()
  - JVM能从系统中获取总内存大小(单位byte)：public long maxMemory()
  - JVM已经从系统中获取总内存大小(单位byte)：public long totalMemory()
  - JVM剩余内存大小(单位byte)：public long freeMemory()
  - 运行cmd命令：public Process exec(String command)
```

```java
import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        // 获取当前运行环境对象
        Runtime r1 = Runtime.getRuntime();
        Runtime r2 = Runtime.getRuntime();
        System.out.println(r1 == r2); // true

        // 获取CPU的线程数
        System.out.println(r1.availableProcessors()); // 24
        System.out.println(Runtime.getRuntime().maxMemory() / 1024 / 1024);
        System.out.println(Runtime.getRuntime().totalMemory() / 1024 / 1024);
        System.out.println(Runtime.getRuntime().freeMemory() / 1024 / 1024);

        /**
         * 运行cmd命令
         *  shutdown：关机（加上下述参数才能执行）
         *      -s：默认在1分子后执行
         *      -s -t 指定秒：指定关机时间
         *      -a：取消关机操作
         *      -r：关机并重启
         */
        try {
            Runtime.getRuntime().exec("shutdown -s -t 36000");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 停止虚拟机
        Runtime.getRuntime().exit(0);
    }
}
```



### 高精度数值 BigDecimal

```bash
BigDecimal 作用：
	- 解决小数运算精度丢失问题（浮点数直接运算会出现精度误差）
	- 表示较大的小数（int和long数值范围有限，BigDecimal无数值范围限制(仅受JVM内存限制)）
	- 灵活控制小数位数与舍入规则（针对金额格式化(保留2位小数)、四舍五入）


初始化 BigDecimal
  1. 构造方法：精准初始化，无精度丢失
  		传入参数格式推荐为正数或字符串，如果传入浮点数可能会出现结果偏差(因此可把浮点数转化为字符串传入)
      		BigDecimal num1 = new BigDecimal("0.1");
  2. 静态工厂方法：
  		底层自动将 double 转为字符串后再调用new BigDecimal，规避精度问题（小数常用）
      		BigDecimal num2 = BigDecimal.valueOf(0.2);
  注意：
    - 如果表示的数，没超double的取值范围，建议使用 valuleOf。
    - 如果表示的数，超出double的取值范围，建议使用 new BigDecimal。
    - 如果使用valueof，且传递的是 0~10之间的整数，包含0和10，方法会返回已经创建好的对象，不会重新 new。
    		BigDecimal.valueOf(10) == BigDecimal.valueOf(10); // true
    		BigDecimal.valueOf(10.0) == BigDecimal.valueOf(10.0); // false


加减乘除运算
  - 加法：add
      BigDecimal sum = num1.add(num2);
  - 减法：subtract
      BigDecimal diff = num1.subtract(num2);	// num1-num2
  - 乘法：multiply
      BigDecimal product = num1.multiply(num2);	// num1 * num2
  - 除法：divide(除数)。若除不尽会抛出 ArithmeticException，不推荐直接使用
      BigDecimal quotient = num1.divide(num2);
  - 安全除法：divide(除数, 保留小数位数, 舍入规则)
      BigDecimal quotient = num1.divide(num2, 2, RoundingMode.HALF_UP);


舍入规则
	- 四舍五入：RoundingMode.HALF_UP
  - 五舍六入：RoundingMode.HALF_DOWN
  - 向上取整：RoundingMode.UP
  - 向下取整：RoundingMode.DOWN
  - 向零取整：RoundingMode.TOWARD_ZERO
```

```java
// 正确初始化
BigDecimal a = BigDecimal.valueOf(0.1);
BigDecimal b = new BigDecimal("0.2");
BigDecimal num = new BigDecimal("123.456");

/**
 * 加减乘除运算
 */
// 加法
BigDecimal sum = a.add(b); // 0.1 + 0.2 = 0.3

// 减法
BigDecimal diff = a.subtract(b); // 0.1 - 0.2 = -0.1

// 乘法
BigDecimal product = a.multiply(b); // 0.1 * 0.2 = 0.02

// 安全除法（保留2位小数，四舍五入）
BigDecimal quotient = new BigDecimal("10").divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP);
System.out.println("10 / 3 = " + quotient); // 10 / 3 = 3.33



/**
 * 设置小数位数
 */
// 保留2位小数，四舍五入
BigDecimal num2 = num.setScale(2, RoundingMode.HALF_UP); // 123.45
int scale = num2.scale(); // 获取小数位数，输出 2


/**
 * 比较大小 compareTo
 *  返回值 0：两个数值相等；
 *  返回值 >0：当前对象大于参数对象；
 *  返回值 <0：当前对象小于参数对象
 */
if (a.compareTo(b) < 0) {
    System.out.println(a + " 小于 " + b);
} else if (a.compareTo(b) == 0) {
    System.out.println(a + " 等于 " + b);
} else {
    System.out.println(a + " 大于 " + b); // 0.1 小于 0.2
}


/**
 * 类型转换
 */
// 1. BigDecimal → 字符串
String str = num.toString(); // 输出 "123.456"

// 2. BigDecimal → int（需确保数值在int范围内，否则抛异常）
int intVal = num.intValue(); // 输出 123（小数部分直接舍去）

// 3. BigDecimal → long（同理，需在long范围内）
long longVal = num.longValue(); // 输出 123

// 4. BigDecimal → double（可能丢失精度，仅在非高精度场景使用）
double doubleVal = num.doubleValue(); // 输出 123.456

// 5. 字符串/基本类型 → BigDecimal（参考初始化部分）
BigDecimal fromStr = new BigDecimal("123.456");
BigDecimal fromLong = BigDecimal.valueOf(123L);


/**
 * 常用方法
 */
// 1. 获取绝对值
BigDecimal negativeNum = new BigDecimal("-123.456");
BigDecimal absNum = negativeNum.abs(); // 输出 123.456

// 2. 获取最大值/最小值
BigDecimal maxNum = a.max(b); // 输出 0.2
BigDecimal minNum = a.min(b); // 输出 0.1

// 3. 取反（正负转换）
BigDecimal negNum = a.negate(); // 输出 -0.1

// 4. 判断是否为零
boolean isZero = a.equals(BigDecimal.ZERO); // false
```

#### BigDecimal 底层存储方式

```bash
BigDecimal 会先把传入的值转换成字符串，然后将每个字符转化成 ASCII 中所对应的数字，并存储到一个数组中。

例如：BigDecimal bd = new BigDecimal("0.226");
			内部转化顺序：'0.226' -> ['0', '.', '2', '2', '6']  -> [48, 46, 50, 50, 54]
```

![image-20251226172405923](./image/image-20251226172405923.png)



### 枚举类型

```bash
枚举指由一组固定的常量组成的类型，当某种类型只能取固定范围内的值时，可以定义为枚举类型。

[访问修饰符] enum 枚举名称 {
	值1, 值2, ...
}
```

```java
public class Test {
    public enum WeekDay {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }

    public static void main(String[] args) {
        System.out.println(WeekDay.MONDAY); // MONDAY
    }
}
```



### 时间 Date

```bash
格林尼治时间(Greenwich Mean Time) 简称 GMT。
目前时间标准时间（UTC） 已经替换为：原子钟。
中国标准时间：世界标准时间 + 8小时


Calendar 代表系统当前时间的日历对象，可以单独修改、获取时间中的年、月、日。
注意：Calendar 是一个抽象类，不能直接创建对象。


JDK8增加的时间类（不提供变更时间的类）
  Date类
      - ZoneId：时区
      - Instant：时间戳
      - ZoneDateTime：带时区的时间
  日期格式化类-SimpleDateFormat
      - DateTimeFormatter：用于时间的格式化和解析
  - 日历类 Calendar
      - LocalDate：年、月、日
      - LocalTime：时、分、秒
      - LocalDateTime：年、月、日、时、分、秒
  - 工具类
      - Duration：时间间隔（秒、纳秒）
      - Period：时间间隔（年、月、日）
      - ChronoUnit：时间间隔（所有单位）
```

```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

public class Test {
    public static void main(String[] args) throws ParseException {
        // 时间格式化
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss EE");
        Date d = new Date(0L);
        String str = sdf.format(d);
        System.out.println(str); // 1970年01月01日 08:00:00 周四

        // 字符串转时间
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
        Date d2 = sdf2.parse("2025-12-30");
        System.out.println(d2); // Tue Dec 30 00:00:00 CST 2025

        // 日期提取
        Calendar c = Calendar.getInstance(); // 把时间中的纪元、年、月、日、时、分、秒等放入一个数组
        Date day = new Date();
        c.setTime(day);

        c.set(Calendar.YEAR, 2025);
        c.set(Calendar.MONTH, 12 - 1); // 设置为12月份(月份需减一，如果不设置-1且超出12月份，则会对年份转换)
        c.set(Calendar.DAY_OF_MONTH, 31);

        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1;
        int date = c.get(Calendar.DAY_OF_MONTH);
        int week = c.get(Calendar.DAY_OF_WEEK);
        String[] weekList = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};
        System.out.println(year + "-" + month + "-" + date + " " + weekList[week - 1]); // 2025-12-31 周三
    }
}

```



### 数组 Arrays

```bash
- 数组拼接成字符串：static String toString(数组)

- 二分法查找元素：static int binarySearch(数组, 查找的元素)
		注意：如果查找的数在数组中不存在，则返回值是 `- arrLength - 1`；否则返回数组下标

- 拷贝数组：static int[] copyOf(原数组, 新数组长度)
			如果新数组长度小于老数组长度，会部分拷贝；
			如果新数组长度大于老数组长度，会补上默认初始值

- 指定范围内拷贝数组：static int[] copyOfRange(原数组, 起始索引, 结束索引)
			包左不包右：包含起始索引下标的数据，不包含结束索引的数据

- 填充数组：static void fill(数组, 元素)

- 使用快速排序进行升序排列：static void sort(数组)

- 按指定规则排序：static void sort(数组, 排序规则)
		第二个参数是一个接口，在调用方法时需传递这个接口的实现类对象作为排序规则。
		这个实现的底层原理：插入排序 + 二分查找方式进行排序
			1. 默认把0索引的数据当作有序序列，1索引到最后的数据都是无序序列；
			2. 逐个遍历无序序列得到每个元素(假设为A元素)，把这些元素逐个在有序序列中根据二分查找进行插入数据。
			3. 把A元素使用二分查找跟插入点的元素进行比较（比较规则为 compare方法的方法体）
					3-1. 如果方法返回值是负数，拿A继续跟二分的左边数据进行比较
					3-2. 如果方法返回值是正数，拿A继续跟二分的右边元素进行比较
					3-3. 如果方法返回值是0，也拿A跟二分的后边元素进行比较
					直到能确定A的最终位置为止。
		compare(o1,o2)的参数：
			o1：表示在无序序列中，遍历得到的每一个元素
			o2：有序序列中的元素
```

````java
import java.util.Arrays;
import java.util.Comparator;

public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        System.out.println(Arrays.binarySearch(arr, 10)); // 9
        System.out.println(Arrays.binarySearch(arr, 20)); // -11

        int[] newArr1 = Arrays.copyOf(arr, 2); // [1, 2]
        int[] newArr2 = Arrays.copyOf(arr, 12); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 0]
        System.out.println(Arrays.toString(newArr1));
        System.out.println(Arrays.toString(newArr2));

        int[] newArr3 = Arrays.copyOfRange(arr, 0, 9); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
        System.out.println(Arrays.toString(newArr3));

        // 自定义排序
        Integer[] array = {2, 3, 6, 7, 5, 1, 4, 9, 8};
        Arrays.sort(array, new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });
        System.out.println(Arrays.toString(array)); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
    }
}
````



### Lambda表达式

```bash
函数式编程（Functional programming）是一种思想特点，忽略面对对象的复杂语法，强调做什么，而不是谁去做。
Lambda 表达式是 JDK8 开始的一种新语法形式，是函数式思想的体现。

函数式接口：有且仅有一个抽象方法的接口叫函数式接口，接口上方可加 `@FunctionalInterface` 注解。

作用：
	- 用来简化匿名内部类的书写
	- 只能简化函数式接口的匿名内部类的写法


语法：`() -> { 方法体 }`
		- `()`：对应方法的形参
		- `->`：固定格式
		- `{}`：对应方法的方法体

lambda 的省略规则：
	1. 参数类型可省略不写
	2. 如果只有一个参数，参数类型可省略，同时 `()` 也可省略
	3. 如果 lambda 表达式的方法提只有一行，大括号、分号、return 可以同时省略不写
```

```java
import java.util.Arrays;
import java.util.Comparator;

public class Test {
    public static void main(String[] args) {
        Integer[] array = {2, 3, 6, 7, 5, 1, 4, 9, 8};

        // 函数式接口的匿名内部类实现
        Arrays.sort(array, new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1;
            }
        });

        // lambda 写法
        Arrays.sort(array, (o1, o2) -> {
            return o2 - o1;
        });

        // lambda 简写
        Arrays.sort(array, (o1, o2) -> o2 - o1);
    }
}
```



## 面向对象

```bash
1. 方法定义
方法是若干语句的功能集合。
定义方法格式：`修饰符 返回值类型 方法名称(参数类型  参数，...){方法体     return 返回值；}`

修饰符-->（public、static）



2. 方法调用
- 单独调用：方法名称（参数）
- 打印调用：System.out.println(方法名称（参数）);
- 赋值调用：返回值类型 变量名 = 方法名称（参数）;

注意：返回值类型为void的方法只能单独调用，不能进行打印或赋值调用
```

```java
/*
public static void 方法名称(){
    方法体;
}
调用格式：方法名称();
注意：
1、方法定义的先后顺序无要求
2、方法定义必须是挨着的，不能再方法内部定义另外一个方法
3、方法定义后，自身不会执行；如果希望执行，则需要对方法进行调用
*/

public static void main(String[] args){
    System.out.println(abc(2,5));	//调用abc方法
}

//定义的abc方法
public static int abc() {
    System.out.println("新定义的方法");
    int result = a + b;
    return result;
}
```



### 面向对象思想

```bash
面向过程：（强调步骤）当需要实现一个功能时，每一个步骤都需要详细处理
面向对象：（强调对象）当需要实现一个功能时，不关心具体的步骤，而是找一个JDK中的类来帮忙实现
```

```java
import java.util.Arrays;
public class Test {
    public static void mian(String[] args) {
        int[] array = {1,2,3,4,5,6,7,8,9,0};
        //要求打印格式为1,2,3,4,5,6,7,8,9,0

         //面对过程
        for(int i=0;i<array.length;i++){
            System.out.println(array[i]);

        //面对对象
        //找一个JDK提供的Arrays类
        System.out.println(Arrays.toString(array));
    }
}
```

### 类与对象的区别

```bash
1. 类是对某一类事物的描述，是抽象的；对象是一类事物的实例，是具体的。
	- 类是对象的模板(抽象化)，对象是类的实体(实例化)。

2. 对象是函数、变量的集合体；而类是一组函数和变量的集合体。
  - 即类是一组具有相同属性的对象集合体。

3. UML的类图和对象图之间的区别是：
	- 类图中类名首字母大写，对象图中的对象名首字母小写。
  - 对象名下有一条下划线，而类名没有。

4. 类的数据值是共享的，一个实例能访问它所属类的类数据值；

5. 先有类，才有类的实例——对象。
	- 应用在创建某个类的实例（对象）之前，这个类必须被定义。

6. 实例方法和类方法的区别在于：实例方法属于单个对象，类方法属于类。
```

```java
public class Student {
    //成员变量（属性）:
    String name; // 姓名
    int age; // 年龄

    //成员方法（行为）:
    public void eat(String food) {
      	System.out.println("吃：" + food);
    }
}
```

### 类图

```bash
1.0 定义
类图是面向对象系统建模中最常用和最重要的图，是定义其它图的基础。类图主要是用来显示系统中的类、接口以及它们之间的静态结构和关系的一种静态模型。
这里要注意四个关键字：类、接口、静态结构、关系


1.1 表示一个类
第一行，表示类的名字，如 Person；
第二行，表示类的属性，如 name:string = ""，格式为属性名：类型 = 默认值，其中可以不包含默认值；
第三行，表示类的方法，如 sayHello(name)，格式为方法名（参数列表）：返回值，其中可以不含参数，无返回值。
注意，+表示属性是公开(public)、-表示私有(private)、`#`表示保护(protect)，static静态方法


1.2 表示一个接口
第一行，明确写上<<接口>>的标识，然后换行写下接口名；
第二行，表示接口需要实现的类方法。


1.3 类的其他表达
简单类、多例类、活动类等，这些在类图中并不常用，一般如何一个类只有方法没有属性，则第二行空着即可。



2.0 关系
表示类的关系总共有6种，这6种又可以分为3类。
第一类，泛化。表达了is a的关系模型，当A以某种形式是一个B时，就是这种关系，包含了有2种关系：继承、实现。
第二类，关联。表达了has a的关系模型，当A拥有一个B时，就是这种关系，包含了有3种关系：聚合、组合、关联。
第三类，依赖。表达了use a的关系模型，当A使用了一个B时，就是这种关系，包含了1种关系：依赖。

2.1 继承关系（鸟类继承自动物类）
继承使用一个实线+空心三角箭头，从子类指向父类即表示一个继承

2.2 实现关系（大雁实现了飞翔接口）
实现使用一个虚线+空心三角箭头，从实例指向接口即表示一个实现。
泛化关系（继承、实现都是空心三角箭头，指向实体是实线、指向虚有的接口则是虚线）

2.3 聚合关系（大雁聚集在一起形成了雁群，但是离开雁群的大雁依然可以存在）
聚合使用一个实线+空心菱形箭头，从整体指向局部即表示一个聚合。
注意，聚合关系只是将一些对象聚集在一起，但他们的关联是弱关联，局部对象可以脱离整体对象而单独存在

2.4 组合关系（翅膀是组成鸟的局部，翅膀不能脱离一个整体（鸟）而单独存活）
组合使用一个实线+实心菱形箭头，从整体指向局部即表示一个组合。
组合又叫合成，是由局部合起来才成为一个整体，他们密不可分，是强关联关系，局部脱离了整体就不存在

2.5 关联关系（气候的变更影响了企鹅的生存，合适的气候能让企鹅生存。但企鹅不是气候的实例，企鹅不能使用一个气候）
当一个关系明显是has a的拥有关系，但不是聚合也不是组合那样来描述整体与局部时，就应该考虑使用关联关系来描述，事实上，前两者都是（更加准确的）关联关系，关联使用一个实线箭头，从拥有者指向被拥有者。
所有的关联关系都是实线箭头，只是聚合（弱）用了一个空心菱形，而组合（强）用了一个实心菱形。这里的关联是可以双向的，关联关系的一个实例。

2.6 依赖关系（动物，有一个新陈代谢的功能，要工作则必须有空气和水，因此构成了他们之间的依赖关系）
依赖关系不同于关联关系，使用一个虚线箭头，从使用者指向被使用者。
这里要注意“使用”的概念，表达了一个物体需要通过另一个物体来完成工作，但他们之间没有包含的关系
但在企鹅与气候的关系中，企鹅的生存方式依赖于气候的变化，但他们不是依赖关系，因为企鹅不需要气候作为参数进行某项工作，如果企鹅有一个功能是迁徙，需要传入一个气候，此时就是依赖关系。


快捷记忆：继承实现用三角，二者皆实是实线。关联关系实箭头，依赖关系虚箭头。聚合组合有菱形，强弱判断实空心。
```

![img](./image/b195eb27b31e1ae6454c85699662c33f.png)



### 类的基础

#### 权限修饰符

```bash
private关键字
问题描述：定义数据变量时，无法阻止不合理的数值被设置进来；
解决方案：用private关键字将需要保护的成员变量进行修饰
一旦使用了private进行修饰，本类中可以随意访问，但是，超出本类之外就不能访问
```

![image-20201213203936235](./image/image-20201213203936235.png)



#### 静态static关键字

```bash
一旦使用static关键字，则此内容属于类；所以凡是本类的对象，都共享同一份。
如果没有static关键字，必须首先创建对象，然后通过对象调用；
如果有static关键字，则不需创建对象，直接通过类名称来使用它。
无论是成员变量还是成员方法，如果有static，都推荐使用类名称来进行调用：

静态变量：类名称.静态变量
静态方法：类名称.静态方法()

注意：
静态不能访问非静态。原因：因为在内存中是先有静态内容，后有非静态内容。
静态方法中不能用this。原因：this代表当前对象，通过谁调用的方法，谁就是当前对象



#### 静态成员跟非静态成员的区别
1、静态方法属于类，既可通过对象来调用，亦可通过类名来调用；
  	非静态方法只能通过对象来调用。
2、静态方法和属性只对类而言，而非静态是对于对象而言的。
3、在系统分配内存时不同：
  	静态成员是用栈分配内存，速度快，是在类第一次载入时初始化。
  	非静态成员是用堆分配内存，速度慢些，是在对象初始化时初始化。
```

```java
public class Demo1{
    public static void main(String[] args){
        MyClass.MethodStatic();
    }
}

public class MyClass{
    public static MethodStatic(){
        System.out.println("这是静态方法");
    }
}
```



#### 成员变量和局部变量的区别

```bash
- 局部变量：在方法内部，只有方法能用；没有默认值；位于栈内存
- 成员变量：直接写在类中；整个类都可以用；有默认起始值；位于堆内存
```

```java
public class Test{
    String name;	//成员变量

    public void methodA(){
        int num = 20;	//局部变量
        System.out.println(num);
        System.out.println(name);
    }
}
```



#### 静态代码块

```bash
当第一次用到本类时，静态代码块执行唯一的一次。如果有多个静态块，按顺序加载。
用途：用与对一次性对静态成员变量赋值。

    public class 类名称{
      staic {
        //静态代码块
      }
    }
```

```java
public class StaticTest {
    static int num = 10;

    static {
        num += 10;
        System.out.println(num);
    }

    static {
        num += 20;
        System.out.println(num);
    }
}

public class Test {
    public static void main(String[] args) {
        StaticTest st1 = new StaticTest(); // 20 40
        StaticTest st2 = new StaticTest(); // 不再执行static
        System.out.println(StaticTest.num); // 40
    }
}
```



#### this

```bash
解决参数名称和成员名称重名调用问题
this.成员变量名-->访问成员变量
如果该方法内存在相同的变量名，会先调用方法内的变量，如果想调用成员变量，则需要this来调用
```



#### 方法重载

重载是方法不变，参数的个数、参数类型、参数的多类型顺序不同

```java
public static void open(){} // 正确重载
public static void open(int a){} // 正确重载
static void open(int a,int b){} // 代码错误:和第8行冲突
public static void open(double a,int b){} // 正确重载
public static void open(int a,double b){} // 代码错误:和第6行冲突
public void open(int i,double d){} // 代码错误:和第5行冲突
public static void OPEN(){} // 代码正确不会报错，但是并不是有效重载
public static void open(int i,int j){} // 代码错误:和第3行冲突
```



#### 构造方法

```bash
构造方法是专门用来创建对象的方法，当通过New关键字来创建对象时，就是在调用构造方法。


自定义构造方法
	- 格式：public 类名称(参数类型 参数名){方法体}
	- 构造方法名称必须和所在类名一致
	- 没有返回值。不能写返回值类型，包括void；不能return
	- 一旦自定义构造方法，系统将不再提供默认的构造方法
	- 构造方法也可以进行重载
```

```java
public class Student {
    String name;
    int age;

    // 自定义构造方法
    public Student() {
        System.out.println("这是构造方法");
    }

  	// 重载构造方法
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println(this.name + ',' + this.age);
    }
}

public class Test {
    public static void main(String[] args) {
        new Student("小明", 22);
    }
}
```



#### 匿名对象

匿名对象就是只有右边的对象，没有左边的名字和赋值运算符

匿名对象只能使用一次，下一次再使用会再次创建新的对象

 ```java
public static void mian(String[] args){
    Student stu1 = new Student();
    stu1.name = "ABC";

    new Student().name = "Kobe";
}
 ```



#### final关键字

```bash
finnal 可用来修饰类、方法、局部变量、成员变量
  - 使用 finnal 修饰的类不能有子类
  - 使用 finnal 修饰的方法不能被重写
  - 使用 finnal 修饰的变量会变成常量
```



### 特征-封装

```bash
封装：将类的某些信息隐藏在类内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的操作和访问。
	- 隐藏类的实现细节
	- 只能通过规定方法访问数据

封装的过程
	- 将属性的可见性设为 private
	- 创建共有的 getter 和 setter 方法
	- 在 getter 和 setter 方法中加入判断语句
```

```java
public class Student {
    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 0) age = 0;
        else this.age = age;
    }
}

public class Test {
    public static void main(String[] args) {
        Student stu = new Student();
        stu.setAge(20);
        System.out.println(stu.getAge()); // 2
    }
}
```



### 特征-继承

```bash
被继承的类叫超类（superclass)，继承超类的类叫子类（subclass）
子类是超类的一个专门用途的版本，它继承了超类定义的所有实例变量和方法，并且还展示了特定于自身的行为和特征。
继承是多态的前提；继承主要解决问题：共性抽取。

    public class 父亲名称{}
    public class 子类名称 extends 父亲名称{}


注意：
  - Java 中类只支持单继承，不支持多继承（一个类只能有一个直接父类）
  - 子类不能继承父类的如下内容：
      - private 成员
      - 子类与父类不在同包，使用默认访问修饰符的成员
      - 构造方法

初始化的顺序过程：
	1. 父类属性
	2. 父类构造
	3. 子类属性
	4. 子类构造

变量访问
  - 直接通过子类对象访问成员变量：等号左边是谁，就优先用谁，没有则向上找。
  - 间接通过子类对象访问成员变量：该方法属于谁，就优先用谁，没有则向上找。

变量调用
    - 局部变量：变量名
    - 本类变量：this.变量名
    - 父类变量：super.变量名
```

#### 方法重写

```bash
- 重写(Override)：方法名称一样，参数列表一样
- 重载(Overload)：方法名称一样，参数列表不一样

方法覆盖重写规则：
    1、父子类之间的方法名称与参数列表相同
    2、@Override:写在方法前，检测是否有效正确覆盖重写（可不写，但要保证正确）
    3、子类方法的返回值相同或者是父类返回值的子类
    4、Object类是所有类的公共最高父类（祖宗类），java.lang.String就是Object的子类
    5、子类方法的权限必须>=父类方法的权限修饰符（比父类严格）
        public > protected > 默认不写 > private
```

#### super

```bash
在 java 中使用 super 访问父类成员
	- super 不能访问父类私有成员
	- super 调用构造方法时，只能是第一句
```



### Object类

```bash
Object 类是所有类的父类，任何类默认都继承自 Object 类。

判断是否为null：Object.isNull()
判断是否不为null：Object.nonNull()

注意：对两个对象使用 equals() 判断，需要先做非空判断。
Object.equals(s1, s2)判断两个对象是否相同：
	1. 先判断 s1 是否为 null，如果为 null，直接返回 false
	2. 如果 s1 不为 null，则利用 s1 再次调用 equals 方法
	3. 如果 s1 为 Student（创建对象实例）类型，所以最终会调用 Student 中的 equals 方法。
	如果不重写则会比较地址值；如果重写就比较属性值


常被子类重写的方法：
	- toString()：返回当前对象本身的有关信息，按字符串对象返回
	- equals()：比较两个对象是否是同一个对象，是则返回 true
				注意：equals 隐藏一个多态，多态弊端是无法使用子类特有的内容(属性、方法)，所以需要向下转型(强转)

---> 可通过 alt+insert 键生成 equals()、hashCode()、toString()
```

```java
@Override
public String toString() { // 打印属性值
    return "Person{name=" + name + "}";
}

@Override
public int hashCode() {
    int result = name != null ? name.hashCode() : 0;
    result = 31 * result + age;
    return result;
}

@Override
public boolean equals(Object obj) { // 认为属性相同即为同一对象
    //判断传递参数是否跟自身比较
    if (obj == this) { return true; }

    //判断传递的参数obj是否是null,直接返回false，提高效率
    if (obj == null) { return false; }

    //判断是否是Person类型在转换，防止类型转换异常classCastException
    if (obj instanceof Person) {
        Person p = (Person) obj;
        boolean b = this.name.equals(p.name) && this.age == p.age;
        return b;
    }

    return false;
}
```

#### 对象克隆

```bash
对象浅克隆的实现：
	1. 重写 Object 的 clone 方法
	2. 让 javabean 类实现 Cloneable 接口
	3. 创建原对象并调用 clone()

需要实现Cloneable的缘由：
	如果一个接口里面没有抽象方法，表示当前接口是一个标记性接口。
	Cloneable 表示一旦实现，则当前类的对象就可以被克隆；如果没有实现，当前类的对象就不能克隆


对象深克隆实现：
0. 通过深度遍历数组/对象来重新赋值
1. 三方工具 Gson：gson.fromJson(gson.toJson(u1), User.class);
2. 序列化/反序列化
```

```java
import java.util.Arrays;
import java.util.StringJoiner;

public class User implements Cloneable {
    private String username;
    private String[] hobby;

    public User(String username, String[] hobby) {
        this.username = username;
        this.hobby = hobby;
    }

    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", hobby=" + Arrays.toString(hobby) +
                '}' + arrToString();
    }

    public String arrToString() {
        StringJoiner sj = new StringJoiner("，", "[", "]");
        for (int i = 0; i < hobby.length; i++) {
            sj.add(hobby[i] + "");
        }
        return sj.toString();
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        // 调用父类的clone方法
        return super.clone();
    }
}

public class Test {
    public static void main(String[] args) throws CloneNotSupportedException {
        String[] data = {"打篮球", "跳舞"};
        User u1 = new User("小明", data);

        // 克隆对象
        User u2 = (User) u1.clone();
        System.out.println(u1); // User{username='小明', hobby=[打篮球, 跳舞]}[打篮球，跳舞]
        System.out.println(u2); // User{username='小明', hobby=[打篮球, 跳舞]}[打篮球，跳舞]
    }
}
```



### 抽象类

```bash
Java 中抽象类和抽象方法使用 abstract 修饰
		- 抽象方法没有方法体
		- 抽象方法必须在抽象类中
		- 抽象方法必须在子类中被实现，除非子类是抽象类
		- 抽象类中可以又非抽象方法


1. 抽象类不能创建对象，如果创建，则会编译无法通过而报错
  	假设创建了抽象类的对象，调用抽象的方法，而抽象方法没有具体的方法体，没有意义
2. 抽象类中，可以自定义构造方法，提供子类创建对象时初始化父类成员使用。
   	子类的构造方法中，有默认的super()，需要访问父类构造方法
3. 抽象类中，不一定包含抽象方法
    未包含抽象方法的抽象类，目的是不想让调用者创建该类对象，通常用于某些特殊的类结构设计
4. 抽象类的子类，必须重写抽象父类中所有的抽象方法，除非子类也是抽象类。
    假设不重写所有抽象方法，则类中可能包含抽象方法。那么创建对象后，调用抽象的方法，没有意义


如何使用抽象类和抽象方法：
1、不能直接创建new抽象类对象
2、必须用一个子类来继承抽象父类
3、子类必须覆盖重写抽象父类当中所有的抽象方法
	覆盖重写的实现-->子类去掉抽象方法的abstract关键字，然后补上大括号
4、创建子类对象进行使用


public abstract class Animal {
    public abstract void eat();	//抽象方法，具备不确定性
    public void normalMethod(){}	//普通成员方法
}
```

```java
public abstract class Fu{
    public Fu(){
        System.out.println("抽象父类的构造方法执行！");
    }
    public abstract void eat();
}

public class Zi extends Fu{
    public void Zi(){
        System.out.println("抽象子类的构造方法执行！");
    }
    @Override
    public void eat(){
        System.out.println("吃饭饭");
    }
}

public class DemoMain{
    piblic static void main(String[] args){
        Zi zi = new Zi();
        zi.eat();
    }
}
```



### 特征-多态

```bash
extends继承或者implements实现，是多态性的前提。

多态的定义：同一种操作，由于条件不同，产生的结果也不同。
多态的代码理解：同一个引用类型，使用不同的实例而执行不同操作，如使用父类变量指向子类对象。

父类和子类的互转：
	1. 父类转子类（向下转型）
			父类声明 father = new 子类();
			子类声明 son = (子类声明)father;
	2. 子类转父类（自动转换）
	3. instanceof类型检测：`对象 instanceof 类`

父类作为参数实现多态：
父类作为返回值实现多态：
```

父类引用子类对象

![image-20201213173832116](./image/image-20201213173832116.png)

向上转型与向上转型

![image-20201213180123190](./image/image-20201213180123190.png)

检测向下转型时是否转换正确：instanceof()来判断

![image-20201213181618683](./image/image-20201213181618683.png)

#### 接口多态案例-笔记本电脑

![image-20201213182248786](./image/image-20201213182248786.png)

```java
public interface USB {
    public abstract void open();    //打开设备

    public abstract void close();   //关闭设备
}
```

```java
public class Computer {
    public void powerOn(){
        System.out.println("笔记本开机");
    }
    public void powerOff(){
        System.out.println("笔记本关机");
    }

    //使用USB设备
    public void useDevice(USB usb){
        usb.open(); //打开设备
        if(usb instanceof Mouse){
            Mouse mouse = (Mouse) usb;  //向下转型
            mouse.click();
        }else if(usb instanceof Keyboard){
            Keyboard keyboard = (Keyboard) usb; //向下转型
            keyboard.type();
        }
        usb.close();    //关闭设备
    }
}
```

```java
//鼠标是一个USB设备
public class Mouse implements USB {
    @Override
    public void open(){ System.out.println("打开鼠标"); }

    @Override
    public void close() { System.out.println("关闭鼠标"); }

    public void click(){
        System.out.println("鼠标点击");
    }
}
```

```java
//键盘是一个USB设备
public class Keyboard implements USB {
    @Override
    public void open() { System.out.println("打开键盘"); }

    @Override
    public void close() { System.out.println("关闭键盘"); }

    public void type(){
        System.out.println("鼠标输入");
    }
}
```

```java
public class DemoMain {
    public static void main(String[] args) {
        //创建一个笔记本电脑
        Computer computer = new Computer();
        computer.powerOn();

        //准备一个鼠标
        USB usbMouse = new Mouse();
        computer.useDevice(usbMouse);

        //准备一个键盘
        USB usbKeyboard = new Keyboard();
        computer.useDevice(usbKeyboard);
    }
}
```



### 接口 interface

```bash
1. 接口的常量
		格式: [public] [static] [final] 数据类型 常量名称 =数据值; // 不可改变,可省略public static final
		常量必须进行赋值，而且一旦赋值不能改变，常量名称完全大写，用下划线进行分隔。
2. 接口的抽象方法
		格式: [public] [abstract] 返回值类型 方法名称(参数列表);
		抽象方法的两个关键字public abstract可以省略
		实现类必须覆盖重写接口所有的抽象方法，除非实现类是抽象类
3. 接口的默认方法
		格式: [public] default 返回值类型 方法名称(参数列表) { 方法体 }
		默认方法也可以被覆盖重写
		作用：可以实现接口拼接
4. 接口的静态方法
		格式: [public] static 返回值类型 方法名称(参数列表) { 方法体 }
		应该通过接口名称进行调用，不能通过实现类对象调用接口静态方法
		不能通过接口实现类的对象来调用接口的静态方法（可通过 接口名称.静态方法名(参数) 来调用）
5. 接口的私有化
		普通私有方法: private 返回值类型 方法名称(参数列表) { 方法体 }
		静态私有方法: private static 返回值类型 方法名称(参数列表) { 方法体 }
		private的方法只有接口自己才能调用，不能被实现类或别人使用。


接口不能直接使用，必须用一个“实现类”来实现接口
接口的实现类必须覆盖重写(实现)接口中所有的抽象方法，除非实现类是抽象类
public class 实现类名称 implements 接口名称{}



#### 接口和抽象类的区别
接口：
		- 接口不可以被实例化
		- 实现类必须实现接口的所有方法
		- 一个类可以实现多个接口
		- 接口中变量都是静态变量
		- 接口应用场景是 has-a
抽象类：
		- 抽象类不可以被实例化
		- 抽象类中可以有普通方法
		- 抽象类可以有构造方法
		- 抽象类中可以有实例成员变量
		- 符合 is-a 关系的使用抽象类
一个类只能继承一个直接的父类，但可以实现多个接口。
接口的抽象程度比抽象类高，因为接口中所有方法都是抽象类。
```

```java
public interface MyIntercaceDafault {
    //抽象方法
    void methodsAbs();	//可省略public abstract
}

public class MyInterfaceDafaultA implements MyIntercaceDafault{
    public void methodsAbs(){
        System.out.println("实现了抽象方法");
    }
}
```



### 内部类

成员内部类与局部内部类（包含匿名内部类）

#### 成员内部类

内用外，随意访问；外用内，需要内部类对象。

直接调用：外部类名.内部类名 对象名 = new 外部类名().new 内部类名();

间接调用：在外部类方法中，使用内部类，然后main中只是调用外部类的方法

```java
public class Body { //外部类
    public class Heart{ //成员内部类
        //内部类的方法
        public void beat(){
            System.out.println("内部类：心脏");
            System.out.println("我叫" + name);
        }
    }
    //外部类的成员变量
    private String name;
    //外部类的方法
    public void methodBody(){
        System.out.println("外部类的方法");
        new Heart().beat();	//匿名内部类
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

//main
public class InnerClass {
    public static void main(String[] args) {
        Body body = new Body(); //外部类的对象
        //通过外部类的对象，调用外部类的方法，里面简介在使用内部类Heart
        body.methodBody();
        System.out.println("========");
        //外部类名.内部类名 对象名 = new 外部类名().new 内部类名();
        Body.Heart heart = new Body().new Heart();
        heart.beat();
    }
}
```

#### 局部内部类

**局部内部类**：定义在一个方法内部的类（只有当前方法能使用它）。

局部内部类如果希望访问所在方法的局部变量，那么变量必须是【有效的final关键字的】

从java8+开始，只要变量事实不变，那么final关键字可以省略

```java
public class Outer{
    public void methodOuter(){
        class Inner{
            int num = 10;
            public void methodInner(){ System.out.println(num); }
        }
		Inner inner = new Inner();	//只能在当前方法调用
    	inner.methodInner();
    }
}
```

#### 匿名内部类

如果接口的实现类（或父类的子类），只石永红唯一一次。那么这种情况下可以省略该类的定义，而改为使用【匿名内部类】

```java
/*
接口名 对象名 = new 接口名(){//覆盖重写所有抽象方法};
在{}里面的才是匿名内部类的内容，且{}后需要加;结束
在创建对象时，只能使用一次

@Override
public void method(){
	System.out.println("匿名内部类实现的方法！");
}
*/
//MyInterface.java
public interface MyInterface{
    void method();	//抽象方法
}

//MyInterfaceImpl.java
public class MyInterfaceImpl implements MyInterface{
    @Override
    public void method(){
        System.out.println("实现类覆盖重写了方法！");
    }
}

//Main.java
public static void main(String[] args){
    MyInterface obj = new MyInterface(){
       	//重写了两次（即调用两次）
        @Override
        public void method1(){
            System.out.println("匿名内部类实现的方法！");
        }
		@Override
        public void method2(){
            System.out.println("匿名内部类实现的方法！");
        }
    };	//需要一个;结束
    obj.method1();
    obj.method2();
}
```



## 集合 Collection

```bash
数据结构
	- 栈：先进后出
	- 队列：先进先出
	- 数组：内存连续区域，查询快，增删慢
	- 链表：元素是游离的，查询慢，首尾操作极快


集合与数组区别
  - 数组长度是固定的，集合的长度是可变的；
  - 数组中存储的是同一类型的元素，可以存储基本数据类型值。集合存储的是对象，而且对象的类型可以不一致。
  - 在开发中一般当对象多时，使用集合存储。


- ArrayList 实现长度可变的数组，在内存中分配连续的空间。遍历元素和随机访问元素的效率比较高。
- LinkedList 采用链表存储方式。插入、删除元素时效率比较高。


集合按照存储结构分两大类：
  - 单列集合 java.util.Collection
  - 双列集合 java.util.Map

  Collection：接口存储一组不唯一、无序的对象
    |—— List（ArrayList、LinkedList）：接口存储一组不唯一、有序、有索引的对象
    |—— Set（HashSet）：接口存储一组唯一、无序、无索引的对象
  Map：接口存储一组键值对象，提供key到value的映射
    |—— HashMap
    |—— TreeMap
```

![image-20210324124037323](./image/image-20210324124037323.png)

### 有序数组 ArrayList

```bash
数组 Array 的长度不可变，但 ArrayList 集合的长度是可变的]
ArrayList打印出来的是内容，不是地址；如果内容为空，则输出[]


常用方法：
  添加元素：boolean add(E e)
  插入数据：boolean add(int index, E e)
  删除数据：boolean remove(E e)
  删除指定位置的元素：E remove(int index)
  获取固定位置的元素：E get(int,index)
  判断是否存在指定元素：boolean contains(E e)
  获取集合的长度：int size()
  清空集合所有的元素：void clear()
  判断集合是否为空：boolean isEmpty()
  将集合转成一个数组：E[] toArray()
```

```java
//从JDK1.7+开始，右侧<>内部可以不写内容，但<>本身需要写
ArrayList<String> list = new ArrayList<String>();

//向集合添加数据
list.add("Kobe");
list.add("June");
list.add("hello");

boolean result = list.remove("hello");
System.out.println(result); // true
boolean result2 = list.contains("java");
System.out.println(result2); // false

System.out.println(list);    //[Kobe,June]

// 将list的数据全部添加到新定义的list中
ArrayList<String> newList = new ArrayList<>();
newList.addAll(list);
System.out.println(newList);    //[Kobe,June]

// 清除数组
list.clear();
System.out.println(list); // []


// 生成6个1~33的随机整数，添加到集合，并遍历集合
ArrayList<Integer> list2 = new ArrayList();
Random r = new Random();
for (int i = 0; i < 6; i++) {
    int num = r.nextInt(33) + 1;
    list2.add(num);
}
System.out.println(list2);
```



#### ArrayList底层源码

```bash
1. 利用空参创建的集合，在底层创建一个默认长度为0的数组
2. 添加第一个元素时，底层会创建一个新长度为0的数组
3. 存满时，会扩容1.5倍
4. 如果一次添加多个元素，1.5倍还放不下，则新创建数组的长度以实际为准
```

![image-20260101140357083](./image/image-20260101140357083.png)



#### 列表的遍历

````bash
1. 普通for循环
2. 增强for
3. lambda表达式forEach
4. 迭代器
5. 列表迭代器
6. 转换成数组
````

```java
ArrayList<String> list = new ArrayList<String>();
list.add("Kobe");
list.add("June");
list.add("hello");

// 普通for循环
for (int i = 0; i < list.size(); i++) {
    System.out.print(list.get(i) + '\t'); // Kobe June
}
System.out.println();


// 增强for
for (String s : list) {
    System.out.printf(s + '\t'); // Kobe June
}
System.out.println();


// lambda表达式
list.forEach(item -> System.out.printf(item + '\t'));
System.out.println();


// 迭代器
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    System.out.printf(it.next() + '\t');
}
System.out.println();


// 列表迭代器
ListIterator<String> listIt = list.listIterator();
while (listIt.hasNext()) {
    System.out.printf(listIt.next() + '\t');
}
System.out.println();


// 转换数组
Object[] arr = list.toArray();    //转换成数组
for (Object str : arr) {
    System.out.println(str);
}
```



### 链表 LinkedList

```bash
LinkedList 底层结构式双链表，查询慢，增删快，如果操作首尾元素速度更快。

LinkedList 提供对头部和尾部元素进行添加和删除操作的方法。
	添加首部元素：void addFirst(E e)
	添加末尾元素：void addLast(E e)
	获取头部元素：E Object.getFirst()
	获取末尾元素：E Object.getLast()
	删除并返回第一个元素：E removeFirst()
	删除并返回最后一个元素：E removeLast()
```

![image-20260101141840470](./image/image-20260101141840470.png)

```java
import java.util.LinkedList;

public class Test {
    class Book {
        private String name;
        private int price;

        public Book(String name, int price) {
            this.name = name;
            this.price = price;
        }
    }

    public static void main(String[] args) {
        Test test = new Test();
        Book b1 = test.new Book("我的阿泰勒", 60);
        Book b2 = test.new Book("平凡的认识", 50);
        Book b3 = test.new Book("你是我的四月天", 70);

        LinkedList<Book> list = new LinkedList<Book>();
        list.add(b1);
        list.addFirst(b2);
        list.addLast(b3);

        Book first = list.getFirst();
        System.out.println(first); // Book{name='平凡的认识', price=50}

        Book last = list.getLast();
        System.out.println(last); // Book{name='你是我的四月天', price=70}

        list.removeFirst();
        list.removeLast();

        for(Book b: list) {
            System.out.println(b); // Book{name='我的阿泰勒', price=60}
        }
    }
}
```



### 唯一对象组 HashSet

```bash
Set 接口存储一组唯一、无序的对象。
Set 存放对象的引用。
```

```java
import java.util.HashSet;

public class Test {
    class Book {
        private String name;
        private int price;

        public Book(String name, int price) {
            this.name = name;
            this.price = price;
        }
    }

    public static void main(String[] args) {
        Test test = new Test();
        Book b1 = test.new Book("我的阿泰勒", 60);

        HashSet<Book> set = new HashSet<Book>();
        Book b2 = b1;
        set.add(b1);
        set.add(b2);

        System.out.println(set.size()); // 1
    }
}
```



### HashMap

```java
import java.util.HashMap;

HashMap<String, String> map = new HashMap<String, String>();
map.put("CBC", "中国建设银行");
map.put("ABC", "中国农业银行");
map.put("ICBC", "中国工商银行");

String value = map.get("CBC");
System.out.println(value);

System.out.println(map.keySet()); // 获取键的集合
System.out.println(map.values()); // 获取值的集合
System.out.println(map); // 获取键+值集合
System.out.println(map.size()); // 获取长度
boolean result = map.containsKey("ICBC");
System.out.println(result ? "存在" : "不存在");
```



### Iterator迭代器

```bash
Iterator迭代器：java.util.Iterator
Collection 与 Map 用于存储元素，而 Iterator 用于迭代访问（遍历）Collection中的元素，因此 Iterator 对象也被称为迭代器。
迭代：即 Collection 集合元素的通用获取方式。在取元素之前要判断集合中有没有元素，如果有，就把这个元素取出来，继续再判断，如果还有就再取出来，直到把集合中的所有元素全部取出为止——这种取出方式称为迭代。

如何使用 Iterator
	- 获取迭代器对象，Collection 接口的 iterator 方法
	- hasNext()：判断是否仍有元素可以迭代
	- next()：返回下一个迭代的元素

注意：
		因为创建集合的迭代器后，集合每次调用 add 或 remove 方法都会被统计变化次数。
		所以为了避免并发修改一次，在使用迭代器或增强 for 遍历集合过程中，不要使用集合的方法去添加或修改元素。
```

![image-20260101142847569](./image/image-20260101142847569.png)

```java
import java.util.HashMap;
import java.util.Iterator;

public class Test {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("CBC", "中国建设银行");
        map.put("ABC", "中国农业银行");
        map.put("ICBC", "中国工商银行");

        Iterator iterator = map.keySet().iterator();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            String value = map.get(key);
            System.out.println(key + "=" + value);
        }
    }
}
```



### Collection 的遍历方式

```bash
Collection 的遍历方式有三种：
1. 迭代器遍历

2. 增强式for遍历：底层为迭代器，为了简化迭代器书写
    所有的单列集合和数组才能使用增强式for遍历。
    修改增强for中定义的变量，不会改变集合中原本的数据。
    语法：`for(元素数据类型 变量名: 数组或集合) { }`

3. lambda表达式遍历：
		语法：default void forEach(Consumer<? super T> action)
```

```java
import java.util.HashMap;
import java.util.Map;

public class Test {
    class Book {
        private String name;

        public Book(String name) {
            this.name = name;
        }

        public String getName() {
            return this.name;
        }
    }

    public static void main(String[] args) {
        Test test = new Test();

        Book b1 = test.new Book("我的阿泰勒");
        Book b2 = test.new Book("平凡的认识");
        Book b3 = test.new Book("你是我的四月天");

        HashMap<String, Book> map = new HashMap<String, Book>();
        map.put(b1.getName(), b1);
        map.put(b2.getName(), b2);
        map.put(b3.getName(), b3);
        map.put(b1.getName(), b1);

        System.out.println("======================");
        for (Book book : map.values()) {
            System.out.printf(book.getName() + '\t');
        }

        System.out.println("======================");
        for (Map.Entry<String, Book> item : map.entrySet()) {
            System.out.println(item.getKey() + '=' + item.getValue().getName());
        }

        System.out.println("======================");
        map.entrySet().stream().forEach(entry -> {
            System.out.println(entry.getKey() + "=" + entry.getValue().getName());
        });
    }
}
```



### 泛型

```bash
泛型：是JDK5引入的特性，可以在编译阶段约束操作的数据类型，并进行检查
泛型的格式：`<数据类型>`
作用与注意：统一数据类型，泛型只能是引用数据类型，不能是基本数据类型
		- 因为传入基本数据类型，也需要转化为 Object（基本数据类型不支持多态）
		- 指定泛型的具体类型后，传递数据时，可以传入该类类型或者其子类类型
		- 如果不写泛型，类型默认是 Object

泛型不具备继承型，但数据具备继承性

泛型方法：在定义方法时不确定类型的值
		修饰符 <类型> 返回值类型 方法名(类型 变量名) {}
		public static<T> void show(T t) {}

泛型接口：
		修饰符 interface 接口名<类型> {}
		public interface List<E> {}

泛型通配符：
    `?` 表示不确定的类型，它可以进行类型的限定
    `? extends E`：表示可以传递E或者E所有的子类型
    `? super E`：表示可传递E或者E所有的父类型
    public static void method(ArrayList<? extends E> list) {}
		public static void method(ArrayList<? super E> list) {}

泛型的使用场景：
		- 定义类、方法、接口时，如果类型不确定，可以定义泛型
		- 如果类型不确定，但能知道是哪个继承体系，就可以使用泛型的通配符
```



## IO流

```bash
- File 类访问文件和目录
- 字节流的使用
- 字符流的使用
- 缓冲流的使用
- 读写二进制文件
- 序列化和反序列化


IO流
  - 输入流 (Input Stream)：从外部读取数据到程序中
  - 输出流 (Output Stream)：从程序输出数据到外部
  - 流的特点：数据像水流一样连续传输


核心概念
	- 数据源/数据目的地：File、内存、网络、控制台、设备
	- 数据传输单位
			- 字节流：处理所有类型数据（文本、图片、音视频）
			- 字符流：专门处理文本数据
	- 流的角色
			- 节点流：直接链接数据源/目的地
			- 处理流（包装流）：对节点流进行包装、提供增强功能


字节流：FileInputStream读取文件，FileOutputStream写入文件
字符流：FileReader读取文件，FileWriter写入文件
缓冲流：BufferedReader读取文本文件，BufferedWriter写入文本文件
读写二进制文件：DataInputStream与FileInputStream结合读取二进制文件，DataOutputStream与FileOutputStream结合写二进制文件
序列化：对象写入到特定流中
		- 序列化可以保存对象的全景图
		- 实现Serializable接口
反序列化：从特定的流中获取数据重新还原成对象
```

### IO流层次

```bash
#### 字节流继承体系
Object
├── InputStream（抽象类）
│   ├── FileInputStream        // 文件字节输入流
│   ├── ByteArrayInputStream   // 字节数组输入流
│   ├── FilterInputStream      // 过滤字节输入流
│   │   ├── BufferedInputStream    // 缓冲字节输入流
│   │   ├── DataInputStream        // 数据输入流
│   │   └── ObjectInputStream      // 对象输入流
│   └── 其他...
└── OutputStream（抽象类）
    ├── FileOutputStream       // 文件字节输出流
    ├── ByteArrayOutputStream  // 字节数组输出流
    ├── FilterOutputStream     // 过滤字节输出流
    │   ├── BufferedOutputStream   // 缓冲字节输出流
    │   ├── DataOutputStream       // 数据输出流
    │   ├── PrintStream            // 打印输出流
    │   └── ObjectOutputStream     // 对象输出流
    └── 其他...


字符流继承体系
Object
├── Reader（抽象类）
│   ├── InputStreamReader      // 字节流转字符流
│   │   └── FileReader         // 文件字符输入流
│   ├── BufferedReader         // 缓冲字符输入流
│   ├── StringReader           // 字符串输入流
│   └── 其他...
└── Writer（抽象类）
    ├── OutputStreamWriter     // 字符流转字节流
    │   └── FileWriter         // 文件字符输出流
    ├── BufferedWriter         // 缓冲字符输出流
    ├── PrintWriter            // 打印字符输出流
    ├── StringWriter           // 字符串输出流
    └── 其他...
```

### File类 - 访问文件

```bash
File类：java.io.File
    判断文件或目录是否存在：boolean exists()
    判断是否是文件：boolean isFile()
    判断是否是目录：boolean isDirectory()
    获取文件的相对路径：String getPath()
    获取文件的绝对路径：String getAbsolutePath()
    获取文件/目录名称：String getName()
    删除此对象指定的文件/目录：boolean delete()
    创建名称的空文件，不创建文件夹：boolean createNewFile()
    获取文件大小(单位为字节)：long  length()
```

```java
import java.io.File;
import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        File file = new File("D:\\项目\\JavaTest\\src\\1.txt");

        if (file.exists()) { // 判断文件是否存在
            if (file.isFile()) { // 如果是文件
                System.out.println("名称:" + file.getName());
                System.out.println("相对路径:" + file.getPath());
                System.out.println("绝对路径:" + file.getAbsolutePath());
                System.out.println("文件大小:" + file.length() + "字节");
            } else if (file.isDirectory()) { // 如果是目录
                System.out.println("此文件是目录");
            }
        } else { // 此文件不存在
            System.out.println("此文件不存在");
            try {
                file.createNewFile();
                System.out.println("文件已创建！");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### 字节流 - FileInputStream

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;

        try {
            fis = new FileInputStream("D:\\项目\\JavaTest\\src\\1.txt");
            fos = new FileOutputStream("D:\\项目\\JavaTest\\src\\2.txt", true); // // true表示追加，false表示覆盖

            byte[] buffer = new byte[1024];  // 1KB缓冲区
            while(fis.available() != 0) {
                int read = fis.read(buffer);
                fos.write(buffer, 0, read);  // 写入实际读取的字节数

                String str = new String(buffer, 0, read);
                System.out.println(str);
            }
            fos.write("\nNew log entry\n".getBytes());
        } catch (FileNotFoundException e) {
            System.out.println("文件不存在");
        } catch (IOException e) {
            System.out.println("文件不存在");
        } finally {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### 字符流 - FileReader

```java
import java.io.*;

public class Test {
    public static void main(String[] args) {
        try (FileReader fr = new FileReader("D:\\项目\\JavaTest\\src\\1.txt");
             FileWriter fw = new FileWriter("D:\\项目\\JavaTest\\src\\2.txt")) {

            char[] buffer = new char[1024];
            int len;
            while ((len = fr.read(buffer)) != -1) {
                fw.write(buffer, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 缓冲流 - BufferedReader

```java
import java.io.*;

public class Test {
    public static void main(String[] args) {
        // 按行读取（需要BufferedReader包装）
        try (BufferedReader br = new BufferedReader(new FileReader("D:\\项目\\JavaTest\\src\\1.txt"));
             BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\项目\\JavaTest\\src\\2.txt"))) {

            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();  // 写入换行符
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 带编码的读写
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(
                        new FileInputStream("D:\\项目\\JavaTest\\src\\1.txt"), "GB2312"));
             BufferedWriter bw = new BufferedWriter(
                     new OutputStreamWriter(
                             new FileOutputStream("D:\\项目\\JavaTest\\src\\2.txt"), "UTF-8"))) {

            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line);
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 序列化

```java
import java.io.*;
import java.util.Date;

// 必须实现 Serializable 接口
class Student implements Serializable {
    // 序列化版本号，防止序列化兼容性问题
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;  // transient 修饰的字段不会被序列化

    public Student(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
}

public class ObjectStreamExample {
    public static void main(String[] args) {
        // 序列化对象
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("student.dat"))) {
            Student student = new Student("张三", 20, "123456");
            oos.writeObject(student);
            oos.writeObject(new Date());  // 序列化其他对象
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 反序列化对象
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("student.dat"))) {
            Student student = (Student) ois.readObject();
            Date date = (Date) ois.readObject();

            System.out.println(student);  // password 为 null
            System.out.println(date);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        // 序列化多个对象到集合
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("students.dat"))) {
            List<Student> students = Arrays.asList(
                new Student("张三", 20, "111"),
                new Student("李四", 22, "222"),
                new Student("王五", 21, "333")
            );

            oos.writeObject(students);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



## 多线程 & JUC

```bash
理解线程生命周期：新建、就绪、运行、阻塞、死亡
掌握同步机制：synchronized、Lock、volatile、原子类
熟悉并发工具：CountDownLatch、CyclicBarrier、Semaphore、Exchanger
善用线程池：合理配置参数，避免资源耗尽
了解并发集合：ConcurrentHashMap、CopyOnWriteArrayList等
掌握CompletableFuture：异步编程的强大工具
理解JMM：内存模型、happens-before原则
遵循最佳实践：避免死锁、减少锁竞争、使用不可变对象等
学会调试监控：线程转储、性能监控、死锁检测


线程和进程的区别？
什么是线程安全？如何保证线程安全？
synchronized和Lock的区别？
wait()和sleep()的区别？
什么是死锁？如何避免死锁？
volatile关键字的作用？
ThreadLocal的原理和内存泄漏问题？
线程池的核心参数有哪些？
线程池的拒绝策略有哪些？
CAS的原理和ABA问题？
ConcurrentHashMap的实现原理？
如何实现生产者-消费者模式？


性能调优
减少锁的粒度：尽量使用细粒度锁。
减少锁的持有时间：只在必要的时候加锁。
使用读写锁：读多写少的场景使用ReadWriteLock。
使用无锁数据结构：如AtomicXXX类。
合理设置线程池参数：根据任务类型和系统资源设置。
避免创建过多线程：使用线程池复用线程。
使用异步编程：如CompletableFuture。
监控线程状态：使用JConsole、VisualVM等工具。
```

### 多线程概念

```bash
- 进程(Process)：程序的一次执行过程，是系统运行程序进行资源分配和调度的基本单位。每个进程都有自己的独立内存空间。
- 线程(Thread)：进程中执行运算的最小单位，可完成一个独立的顺序控制流程。一个进程可以包含多个线程。线程共享进程的内存空间。

- 并发：同一时间段内，多个任务交替执行。
- 并行：同一时刻，多个任务同时执行（需要多核CPU）


#### 多线程
多线程：一个进程中同时运行多个线程。多线程是多个线程交替占用CPU资源，并非真正的并行运行。
多线程的优点
		- 提高程序响应速度（GUI应用）
		- 提高多核CPU利用率
		- 改善程序结构，将复杂任务分解为多个进程独立运行
多线程的缺点
		- 线程间共享数据可能导致数据不一致
		- 线程的创建和销毁需要开销
		- 过多的线程会消耗大量系统资源，可能导致系统崩溃



#### JAVA 中的线程
主线程：
	main() 所在的线程称为主线程。
	主线程是产生其他子线程的线程。
	主线程必须最后完成执行，因为它需要执行各种关闭操作。
创建线程：
	- 继承 java.lang.Thread 类（继承Thread类，重写run方法，创建线程对象调用start()启动线程）-适用单继承
	- 实现 java.lang.Runnable 接口（实现Runnable接口，实现run方法，创建线程对象调用start()启动线程）-避免单继承局限性
线程的同步：
	- 多个线程操作同一共享资源时，将引发数据不安全问题
	- 解决方法：使用同步方法，用 synchronized 修饰方法，为当前的线程声明一个锁，让代码块变为同步执行
      - Vector：线程安全，效率低，适用多线程并发共享资源
      - ArrayList：线程不安全，效率高，适用单线程
      - Hashtable：线程安全，效率低，适用多线程并发共享资源
      - HashMap：线程不安全，效率高，适用单线程
```

#### 线程的生命周期

```bash
线程的六种状态（Thread.State）
    NEW：新建
    RUNNABLE：可运行（包括就绪和运行中）
    BLOCKED：阻塞（等待监视器锁）
    WAITING：等待（无限期等待，直到被唤醒）
    TIMED_WAITING：超时等待（有限时间的等待）
    TERMINATED：终止


状态转换
	- NEW --start()--> RUNNABLE
	- RUNNABLE --获取CPU时间片--> 运行
	- 运行 --yield()/时间片用完--> 就绪
	- 运行 --sleep()/wait()/join()/IO等待--> TIMED_WAITING/WAITING
	- 运行 --等待获取锁--> BLOCKED
	- 运行 --run()结束/异常退出--> TERMINATED
```

![image-20251225103710538](./image/image-20251225103710538.png)

#### 线程常用的方法

```bash
如果不用 setName() 设置线程名字，则会由默认的线程名（以序号为值）

sleep() 因为是静态方法，所以可以使用 类名.sleep() 来调用（Thread.sleep()）
		sleep 方法会让线程睡眠，睡眠时间完毕，不会立马执行下面的代码，因为仍然需要等待CPU的执行权

线程的默认优先级一样，setPriority() 设置优先级越高，抢到CPU的概率越大，但是其他线程仍然可能优先执行完毕

setDaemon(true) 设置为守护线程后，在其他的非守护线程执行完毕后，守护线程会陆续结束
		守护线程是逐渐结束，仍然会执行，但不一定能全部执行完毕
		例如：聊天窗口是线程1，传送文件是线程2，如果聊天窗口关闭，传送文件就没必要存在，因此可把线程2设置为守护线程

yield() 出让线程只是尽可能出让线程，但是该线程仍然可能在中间穿插执行

join() 插入线程，比如在 main方法中对线程进行插入，则先执行插入的线程，再执行 main 下面的代码
```

![image-20251224142222050](./image/image-20251224142222050.png)

### 线程的创建方式

#### 继承Thread类

```java
public class MyThread implements Runnable {
    @Override
    public void run() {
        // 线程执行体
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }

    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start(); // 启动线程
        t2.start();
    }
}

/*
Thread-1: 0
Thread-1: 1
Thread-0: 0
Thread-1: 2
Thread-1: 3
Thread-0: 1
Thread-0: 2
Thread-1: 4
Thread-0: 3
Thread-0: 4
*/
```

#### 实现Runnable接口

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }

    public static void main(String[] args) {
        MyRunnable mr = new MyRunnable();
        Thread t1 = new Thread(mr, "线程1");
        Thread t2 = new Thread(mr, "线程2");
        t1.start();
        t2.start();

      	// 获取活动线程数
        System.out.println("活动线程数: " + Thread.activeCount());
        // 获取所有活动线程
        Thread[] threads = new Thread[Thread.activeCount()];
        Thread.enumerate(threads);
        for (Thread t : threads) {
            if (t != null) {
                System.out.println("活动线程: " + t.getName());
            }
        }
    }
}
```

#### 实现Callable接口（有返回值）

```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
        return sum;
    }

    public static void main(String[] args) throws Exception {
        MyCallable mc = new MyCallable();
        FutureTask<Integer> ft = new FutureTask<>(mc);
        Thread t = new Thread(ft, "Callable线程");
        t.start();
        System.out.println("线程返回值: " + ft.get()); // 线程返回值: 15
    }
}
```

#### 使用线程池

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPoolDemo {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // 提交任务
        for (int i = 0; i < 5; i++) {
            executor.execute(() -> {
                System.out.println(Thread.currentThread().getName() + " 执行任务");
            });
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```



### 线程的同步与锁

#### 同步 synchronized

```bash
同步代码块：把操作共享数据的代码锁起来
	- 锁默认打开，由一个进程进去，锁自动关闭
	- 里面的代码全部执行完毕，线程出来，锁自动打开
	- 注意：锁一般是创建一个 Object 变量来设定，且要保证唯一（单例模式）锁不唯一，那就不能保证同步的稳定性

      synchronized (锁) {
        操作共享数据的代码
      }
```

```java
// 同步方法
public synchronized void method() {
    // 同步代码
}

// 同步代码块
public void method() {
    synchronized (this) { // 同步锁对象
        // 同步代码
    }
}

// 同步静态方法（锁的是类对象）
public static synchronized void staticMethod() {
    // 同步代码
}
```



#### 锁 Lock

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class LockDemo {
    private final Lock lock = new ReentrantLock();

    public void method() {
        lock.lock(); // 获取锁
        try {
            // 同步代码
        } finally {
            lock.unlock(); // 释放锁
        }
    }
}
```



#### 死锁

```bash
锁的本质是，当其他线程运行到上锁的代码时，若发现锁没有解开，就会让出cpu执行权。

本质上是锁的理解问题。锁并不能保证锁内的代码块在一个cpu时间片内完成
```

```java
public class DeadLockDemo {
    private static Object lockA = new Object();
    private static Object lockB = new Object();

    public static void main(String[] args) {
        new Thread(() -> {
            synchronized (lockA) {
                System.out.println("线程1持有lockA");
                try { Thread.sleep(100); } catch (InterruptedException e) {} // 代码执行到这里就卡死，无法往下执行
                synchronized (lockB) {
                    System.out.println("线程1持有lockB");
                }
            }
        }).start();

        new Thread(() -> {
            synchronized (lockB) {
                System.out.println("线程2持有lockB");
                try { Thread.sleep(100); } catch (InterruptedException e) {} // 代码执行到这里就卡死，无法往下执行
                synchronized (lockA) {
                    System.out.println("线程2持有lockA");
                }
            }
        }).start();
    }
}
```



### 【典例】售卖电影票

```java
public class Test {
    public static void main(String[] args) {
        /*
         * 需求：某电影院某个电影共有100张票，分别在三个窗口售卖
         * */

        // 创建线程对象
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        MyThread t3 = new MyThread();

        // 线程命名
        t1.setName("窗口1");
        t2.setName("窗口2");
        t3.setName("窗口3");

        // 开启线程
        t1.start();
        t2.start();
        t3.start();

        System.out.println("==================");
        MyRunnable mr = new MyRunnable();
        Thread t11 = new Thread(mr, "窗口11");
        Thread t22 = new Thread(mr, "窗口22");
        Thread t33 = new Thread(mr, "窗口33");
        t11.start();
        t22.start();
        t33.start();
    }
}
```

##### 使用继承 + synchronized

```java
public class MyThread extends Thread {
    // 使用 static 表示这个类的所有的对象，都共享 ticket 数据
    static int ticket = 0; // 售卖的电影票 0~100张

    // 锁对象，一定要是唯一的
    static Object obj = new Object();

    @Override
    public void run() {
        while (true) {
            synchronized (obj) { // 锁要在循环里面，不然必然是第一个进来的线程把while执行完再出去
                if (ticket < 100) {
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    ticket++;
                    System.out.println(getName() + "正在售卖第" + ticket + "张票");
                } else {
                    break;
                }
            }
        }
    }
}
```

##### 使用抽象类 + synchronized

```java
public class MyRunnable implements Runnable {
    // 不用写成 static，因为只会创建一次；如果定义了 static 则会让变量一直占用内存
    int ticket = 0;

    @Override
    public void run() {
        while (true) {
            synchronized (MyRunnable.class) {
                if (ticket == 100) {
                    break;
                } else {
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    ticket++;
                    System.out.println(Thread.currentThread().getName() + "在卖第" + ticket + "张票");
                }
            }
        }
    }
}
```

##### 使用继承类 + Lock

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class MyThread extends Thread {
    // 使用 static 表示这个类的所有的对象，都共享 ticket 数据
    static int ticket = 0;

    // 需要使用 static 共享锁
    static Lock lock = new ReentrantLock();


    @Override
    public void run() {
        while (true) {
            lock.lock();
            try {
                if (ticket < 100) {
                    ticket++;
                    System.out.println(getName() + "正在售卖第" + ticket + "张票");
                } else {
                    break;
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                lock.unlock(); // 必须在 finally，否则报错或者 break 无法解锁
            }
        }
    }
}
```



### 生产者-消费者模式(等待唤醒机制)

```bash
使用 生产者-消费者模式（等待唤醒机制）实现线程轮流交替效果
	- 当缓冲区满时，生产者等待，直到缓冲区有空位
	- 当缓冲区空时，消费者等待，直到缓冲区有数据

生产者：产生数据的线程
消费者：处理数据的线程
共享缓冲区：生产者和消费者之间的数据存储区域
核心问题：解决生产者和消费者的同步和互斥问题


涉及的方法
  - void wait()：当前线程等待，直到被其他线程唤醒
  - void notify()：随机唤醒单个线程
  - void notifyAll()：唤醒所有线程
```

```java
/* 共享缓冲区：控制生产者和消费者的执行 */
public class Desk {
    public static int foodFlag = 0; // 是否有面条 1:是 0:否
    public static int count = 10; // 可以吃的上限
    public static Object lock = new Object(); // 锁对象
}


// 生产者
public class Cook extends Thread {
    @Override
    public void run() {
        /**
         * 判断桌子上是否有食物
         * 如果有，就等待
         * 如果没有，就制作食物，制作完成后修改食物状态
         */
        while (true) {
            synchronized (Desk.lock) {
                if (Desk.count == 0) {
                    break;
                } else if (Desk.foodFlag == 1) {
                    try {
                        Desk.lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    System.out.println("正在制作食物");
                    Desk.foodFlag = 1;
                    Desk.lock.notifyAll();
                }
            }
        }
    }
}


// 消费者
public class Foodie extends Thread {
    @Override
    public void run() {
        /**
         * 如果没有面条，就等待
         * 如有有面条，就吃(就餐)
         * 吃完之后，把吃的上限-1，并通知厨师(生产者)继续做
         * 修改桌子状态(等吃)
         */
        while (true) {
            synchronized (Desk.lock) {
                if (Desk.count == 0) {
                    break;
                } else if (Desk.foodFlag == 0) {
                    try {
                        Desk.lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    Desk.count--;
                    System.out.println("正在就餐，还能再吃" + Desk.count + "碗");
                    Desk.lock.notifyAll();
                    Desk.foodFlag = 0;
                }
            }
        }
    }
}


// 主线程
public class ThreadDemo {
    public static void main(String[] args) {
        Cook c = new Cook();
        Foodie f = new Foodie();

        c.setName("厨师");
        f.setName("食客");

        c.start();
        f.start();
    }
}
```

##### 阻塞队列（JUC）

阻塞队列内部方法用锁实现，是安全线程

但如果在队列方法外操作，则不在锁的范围内，所以进行日志输出则有问题

```java
import java.util.concurrent.ArrayBlockingQueue;

public class ThreadDemo {
    // 生产者
    public class Cook extends Thread {
        ArrayBlockingQueue<String> queue;

        public Cook(ArrayBlockingQueue<String> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            while (true) {
                // 不断把面条放入阻塞队列
                try {
                    queue.put("面条"); // 内部实现了锁
                    System.out.println("厨师放入一碗面条"); // 这个不在阻塞队列的锁中，所以打印不会卡着
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // 消费者
    public class Foodie extends Thread {
        ArrayBlockingQueue<String> queue;

        public Foodie(ArrayBlockingQueue<String> queue) {
            this.queue = queue;
        }

        @Override
        public void run() {
            while (true) {
                // 不断从阻塞队列中取出面条
                try {
                    String food = queue.take(); // 内部实现了锁
                    System.out.println(food); // 这个不在阻塞队列的锁中，所以打印不会卡着
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // 主线程
    public static void main(String[] args) {
        // 利用阻塞队列 实现 生产者和消费者（等待唤醒）

        // 1. 创建阻塞队列的对象
        ArrayBlockingQueue<String> queue = new ArrayBlockingQueue<>(1);

        ThreadDemo t = new ThreadDemo();
        // 创建实例传递阻塞队列（共用队列）
        Cook c = t.new Cook(queue);
        Foodie f = t.new Foodie(queue);
        c.start();
        f.start();
    }
}
```



### 线程池

```bash
// 固定大小线程池
ExecutorService fixedPool = Executors.newFixedThreadPool(3);

// 单线程线程池
ExecutorService singlePool = Executors.newSingleThreadExecutor();

// 可缓存线程池
ExecutorService cachedPool = Executors.newCachedThreadPool();

// 定时任务线程池
ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(3);

// 定时执行
scheduledPool.schedule(() -> {
    System.out.println("延迟3秒执行");
}, 3, TimeUnit.SECONDS);

// 定期执行
scheduledPool.scheduleAtFixedRate(() -> {
    System.out.println("延迟1秒后，每2秒执行一次");
}, 1, 2, TimeUnit.SECONDS);
```

```java
import java.util.concurrent.*;

public class ThreadPoolExecutorDemo {
    public static void main(String[] args) {
        // 创建线程池
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2, // 核心线程数
            5, // 最大线程数
            60, // 空闲线程存活时间
            TimeUnit.SECONDS, // 时间单位
            new ArrayBlockingQueue<>(10), // 工作队列
            Executors.defaultThreadFactory(), // 线程工厂
            new ThreadPoolExecutor.AbortPolicy() // 拒绝策略
        );

        // 提交任务
        for (int i = 0; i < 15; i++) {
            final int taskId = i;
            executor.execute(() -> {
                System.out.println(Thread.currentThread().getName() +
                    " 执行任务 " + taskId);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```



## Socket

```bash
Socket = IP地址 + 端口号
客户端Socket：主动连接服务器
	需要提供服务端的IP和端口号，通过 Socket 对象的 getInputStream 和 getOutputStream 获取到输入输出流，然后获取和发送数据。
服务器ServerSocket：监听端口，接受连接
	通过 ServerSocket 的 accept() 创建，一旦被客户端连接，服务端就会创建一个用于通信的 Socket 等待用户发送数据。

java.net.Socket - 客户端Socket
java.net.ServerSocket - 服务器Socket
java.net.InetAddress - IP地址处理
java.net.URL/URLConnection - 高层网络API


在Java I/O中，为了减少I/O操作的次数，OutputStream（包括其子类）通常会将数据先存储在缓冲区中，当缓冲区满或者流关闭时才会自动将数据发送出去。
os.flush() 的作用：强制将缓冲区中的数据发送出去，即使缓冲区还没有满
	1. 强制将缓冲区中的数据写入目标
	2. 确保数据被实际发送/写入
	3. 清空输出缓冲区


对象类型数据的发送和接收
要发送的类型必须实现 Serializable 接口。
在发送端组合出一个对象数据，然后转序列化，通过 ObjectOutputStream 发送对象数据
在接收端通过 ObjectInputStream 反序列化出一个对象，然后拆解出对象的各个属性
```

```java
import java.io.Serializable;

public class UserInfo implements Serializable {
    private String uname;
    private String upwa;

    public String getUname() {
        return uname;
    }

    public String getUpwa() {
        return upwa;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public void setUpwa(String upwa) {
        this.upwa = upwa;
    }
}
```

```java
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

// 服务器端启动
public class Server {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket socket = null;
        InputStream is = null;
        OutputStream os = null;
        ObjectInputStream ois = null;

        try {
            serverSocket = new ServerSocket(50000);
            // 创建负责通信的Socket
            socket = serverSocket.accept();

            // 输入流对象，获取数据
            is = socket.getInputStream();
            // 输出流对象，用于发送数据
            os = socket.getOutputStream();

          	// 对象类型的数据接收
            ois = new ObjectInputStream(is);
            try {
                UserInfo info = (UserInfo) ois.readObject();
                System.out.println("接收到的消息：" + info.getUname() + "\t" + info.getUpwa());
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            socket.shutdownInput();

          	// 字符串类型的数据发送
            String msg = "这是服务器返回的消息";
            os.write(msg.getBytes());
            System.out.println("已发送响应给客户端");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (ois != null) ois.close();
                if (is != null) is.close();
                if (os != null) os.close();
                if (socket != null) socket.close();
                if (serverSocket != null) serverSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

```java
import java.io.*;
import java.net.Socket;
import java.util.Scanner;

// 客户端启动
public class Client {
    public static void main(String[] args) {
        Socket socket = null;
        InputStream is = null;
        OutputStream os = null;
        ObjectOutputStream oos = null;
        BufferedReader br = null;

        Scanner input = new Scanner(System.in);
        System.out.println("请输入内容");

        try {
            socket = new Socket("localhost", 50000);
            is = socket.getInputStream();
            os = socket.getOutputStream();
            oos = new ObjectOutputStream(os);

          	// 对象类型的数据发送
            String uname = input.next();
            String upwd = input.next();
            UserInfo info = new UserInfo();
            info.setUname(uname);
            info.setUpwa(upwd);
            oos.writeObject(info);
            socket.shutdownOutput();

          	// 字符串类型的数据接收
            br = new BufferedReader(new InputStreamReader(is));
            String msg = "";
            while ((msg = br.readLine()) != null) {
                System.out.println("服务器的响应：" + socket.getLocalPort() + msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                oos.close();
                os.close();
                is.close();
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



### 响应多个客户端

```bash
#### 一个服务器，多个客户端
通过在服务端开启线程的方式，来服务多个客户端。每个客户端发起连接，服务端就开启一个线程为它服务。


while (true) {
    socket = serverSocket.accept();
    MyThread t1 = new MyThread(socket);
    t1.start();
}
```

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.OutputStream;
import java.net.Socket;

public class MyThread extends Thread {
    Socket socket = null;

    public MyThread(Socket socket) {
        this.socket = socket;
    }

    public void run() {
        InputStream is = null;
        OutputStream os = null;
        ObjectInputStream ois = null;
        UserInfo info = null;

        try {
            is = socket.getInputStream();
            os = socket.getOutputStream();
            ois = new ObjectInputStream(is);
            try {
                info = (UserInfo) ois.readObject();
                System.out.println("接收到的消息：" + info.getUname() + "\t" + info.getUpwa());
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            socket.shutdownInput();

            String msg = "这是服务器返回的消息";
            os.write(msg.getBytes());
            System.out.println("已发送响应给客户端");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (ois != null) ois.close();
                if (is != null) is.close();
                if (os != null) os.close();
                if (socket != null) socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

```java
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

// 服务器端启动
public class Server {
    public static void main(String[] args) {
        ServerSocket serverSocket = null;
        Socket socket = null;

        try {
            serverSocket = new ServerSocket(50000);
            while (true) {
                socket = serverSocket.accept();
                MyThread t1 = new MyThread(socket);
                t1.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



### 基于 UDP 的 Socket

```bash
基于 UDP 协议的 Socket 网络编程步骤：
    1、利用 DatagramPacket 对象封装数据报
    2、利用 DatagramSocket 发送数据报
    3、利用 DatagramSocket 接收数据报
    4、利用 DatagramPacket 处理数据报

```



## XML

```bash
XML（Extensible markup Language）可扩展标记语言
- 特点：与操作系统和开发语言无关
- 作用：数据交互、网站的配置文件
- 标签语法：`<元素名 属性名="属性值">元素内容</元素名>`

XML文档是由一系列标签组成。
	- 一个元素可以有多个属性值
	- 属性值必须双引号包裹
	- 必须有结束标签
	- 标签大小写敏感
	- 标签必须正确嵌套
	- 特殊字符需适用CDATA节点（`<`用`&lt;`、`>`用`&gt;`、`"`用`&quot;`、`'`用`&apos;`、`&`用`&amp;`）



#### XML的解析
Java中XML的四种解析方式：DOM、SAX、JDOM、DOM4J
DOM：将整个XML文档加载到内存，形成一棵DOM树，然后对树进行遍历和操作。适用于需要频繁操作文档的场景，但内存消耗大
SAX：基于事件驱动的解析方式，逐行读取XML文档，触发事件。适用于大型文档，内存消耗小，但只能顺序读取，不能随机访问
JDOM：第三方开源库，使用Java集合类，简化了XML的解析过程。但已不活跃，被DOM4J取代
DOM4J：第三方开源库，性能优异，功能强大，支持XPath。是许多开发者的首选

DOM：基于XML文档树结构的解析，解析XML文档的步骤：
	1. 创建解析器工厂对象 DocumentBuilderFactory
	2. 创建解析器对象 DocumentBuilder
	3. 通过 parse 方法获取 Document 对象
	4. 进行解析操作

DOM4J是 dom4j.org 出品的一个开源 XML 解析包。
  1、创建读取器SAXReader
  2、获取文档对象Document
  3、获取根节点
  4、进行解析操作
```

```java
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.parsers.*;
import org.w3c.dom.*;
import java.io.File;

public class XMLParser {
  	// 解析DOM读取内容
    public void parseXMLWithDOM(String filePath) throws Exception {
        // 1. 创建DocumentBuilderFactory
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

        // 安全设置，防止XXE攻击
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        factory.setFeature("http://xml.org/sax/features/external-general-entities", false);
        factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        factory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        factory.setXIncludeAware(false);
        factory.setExpandEntityReferences(false);

        // 2. 创建DocumentBuilder
        DocumentBuilder builder = factory.newDocumentBuilder();

        // 3. 解析XML文件
        Document document = builder.parse(new File(filePath));

        // 4. 标准化文档
        document.getDocumentElement().normalize();

        // 5. 获取根元素
        Element root = document.getDocumentElement();
        System.out.println("根元素: " + root.getNodeName());

        // 6. 遍历节点
        NodeList nodeList = root.getElementsByTagName("book");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                System.out.println("书名: " + element.getElementsByTagName("title")
                        .item(0).getTextContent());
            }
        }
    }

  	// 用 dom 创建 xml
    public void domCreateXML() throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.newDocument();

        // 创建根元素
        Element root = document.createElement("bookstore");
        document.appendChild(root);

        // 创建子元素
        Element book = document.createElement("book");
        book.setAttribute("category", "COOKING");
        root.appendChild(book);

        Element title = document.createElement("title");
        title.setTextContent("Everyday Italian");
        book.appendChild(title);

        // 写入文件
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = tf.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");

        DOMSource source = new DOMSource(document);
        StreamResult result = new StreamResult(new File("src/output.xml"));
        transformer.transform(source, result);
    }

    public static void main(String[] args) throws Exception {
        XMLParser parser = new XMLParser();
        try {
            // 使用相对路径，或者从命令行参数获取路径
            String filePath = "src/books.xml";
            parser.parseXMLWithDOM(filePath);

            parser.domCreateXML();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



## MySQL



## Reids



## SSM

```bash
Spring
Spring MVC
Mybatis
Sping Cloud

java guide———— github项目
```



## Spring Boot
