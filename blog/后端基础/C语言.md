## C语言

### 所遇问题：

**绝对值的问题**

因为所定义的类型与所调用的绝对值函数类型不一致，也不会报错，但是他取的是根据绝对值类型来反馈值

```c
/*因为所定义的类型与所调用的绝对值函数类型不一致，也不会报错，但是他取的是根据绝对值类型来反馈值*/
int abs(int i);			//处理int类型的取绝对值
double fabs(double i);	//处理double类型的取绝对值
float fabsf(float i);	//处理float类型的取绝对值
```

### **题库**

#### 自定义函数-->限制小数的位数

```c
/**  digit为精确的小数位数，number为所需要限制小数位数的number  **/ 
float limit_digit(int digit,float number){	//限制小数的位数 
	int i=0,j;
	int dig = 1;
	for(j=1;j<=digit;j++){
		dig=dig*10;
	}
	printf("小数的位数所需乘的倍数digit：%d\n",dig);
	number = number*dig;		//对第一位小数进入整数位置，为了第二位小数四舍五入做铺垫 
	i = (int)(number+0.5);	//对第dig位小数四舍五入
	float num = (float) i;
	num = num/1000;
	return num; 
}
```
