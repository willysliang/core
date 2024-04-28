/**
 * @ Author: willy
 * @ CreateTime: 2024-04-28 18:31:20
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-28 18:31:31
 * @ Description: 洋葱圈模式
 */

/***
 *@function compose 组合中间件函数 - 洋葱圈模式
 * @param {Array} middleware
 * @return {Function}
 * @description 创建一个可以递归调用所有中间件的函数，每个中间件可以异步地执行并决定是否继续执行下一个中间件。
 */
export function compose(middleware: any[]) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('middleward must be an array!')
  }
  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw new TypeError('middleware must be composed of functions!')
    }
  }

  return function (context: any, next: any) {
    let index = -1
    function dispatch(i: number) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times!'))
      }

      index = i

      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

const app: Record<string, any> = { middlewares: [] }
app.use = (fn) => {
  app.middlewares.push(fn)
}
app.compose = compose
app.use((_, next) => {
  console.log(1)
  next()
  console.log(2)
})
app.use((_, next) => {
  console.log(3)
  next()
  console.log(4)
})
app.use((_, next) => {
  console.log(5)
  next()
  console.log(6)
})
app.compose(app.middlewares)()
