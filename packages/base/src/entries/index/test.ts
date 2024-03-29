const str = 'Hello'

for (const char of str) console.log(char)

// 直接获取内置的迭代器来进行遍历（等价于上面的 for...of）
const iterator = str[Symbol.iterator]()
while (true) {
  const result = iterator.next()
  if (result.done) break
  console.log(result.value) // // 一个接一个地输出字符
}
