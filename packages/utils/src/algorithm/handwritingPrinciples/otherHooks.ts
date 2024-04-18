/**
 * @ Author: willy
 * @ CreateTime: 2024-04-18 12:09:15
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-18 12:25:47
 * @ Description: 偏小型的函数类
 */

import { logger } from '../../utils'

/**
 * 题目：完成 sleep 函数，可以达到下面的效果：
 * 异步方案：await 一般是等待一个Promise对象并获取该对象结果，所以首先想到就是 Promise + setTimeout 来实现
 * 同步方案：还可以使用时间戳来计算休眠时间，使用 while 来不断获取最新时间戳来判断是否达到预期休眠时间，并使用 return 结束休眠函数调用或 break/continue 来跳出循环
 */
/**
 *
 * @function sleep 休眠函数，不作任何响应 (异步版本)
 * @param duration 休眠时间
 */
export const sleep = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
/**
 * @function sleep 休眠函数，不作任何响应 (同步版本)
 * @param duration 休眠时间
 */
export const sleepSync = (duration) => {
  const start = new Date().getTime()
  while (true) {
    if (!(new Date().getTime() - start - duration)) {
      return
    }
  }
}

// 示例
const anyFunc = async () => {
  console.log('123') // 输出 123
  await sleep(300) // 暂停 300 毫秒
  console.log('456') // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
}
anyFunc()
const printNums = () => {
  console.log(1)
  sleepSync(1000)
  console.log(2)
  console.log(3)
}
printNums()

/**
 * @function deepGetProp 深度获取对象属性值
 * @param obj 对象
 * @param prop 要获取的属性
 * @description 完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容
 */
export const deepGetProp = (obj, prop) => {
  let path = JSON.parse(JSON.stringify(obj))

  const props = prop.split('.')

  for (let i = 0; i < props.length; i++) {
    const propName = props[i]
    // eslint-disable-next-line no-useless-escape
    const current = propName.split(/[\[||\]]/g)

    const name = current[0]
    if (current.length > 1) {
      if (!path[name] || path[name].length < current[1]) {
        path = undefined
        break
      }
      path = path[name][current[1]]
    } else if (current.length === 1) {
      if (!path[name]) {
        path = undefined
        break
      }
      path = path[name]
    }
  }

  return path
}

/** 以下为测试代码 */
const getProp1 = deepGetProp(
  {
    school: {
      student: { name: 'Tomy' },
    },
  },
  'school.student.name',
) // => 'Tomy'

const getProp2 = deepGetProp(
  {
    school: {
      students: [{ name: 'Tomy' }, { name: 'Lucy' }],
    },
  },
  'school.students[1].name',
) // => 'Lucy'

// // 对于不存在的属性，返回 undefined
const getProp3 = deepGetProp({ user: { name: 'Tomy' } }, 'user.age') // => undefined
const getProp4 = deepGetProp({ user: { name: 'Tomy' } }, 'school.user.age') // => undefined
logger.warn('深度获取对象属性值', deepGetProp.name)
console.log(getProp1, getProp2, getProp3, getProp4)
