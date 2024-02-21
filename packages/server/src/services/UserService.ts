/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 16:44:15
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 16:45:38
 * @ Description: 用户业务逻辑层
 */

import { UserDao } from '../dao/UserDao'

const axios = require('axios')
const cheerio = require('cheerio')

const userDao = new UserDao()

export class UserService {
  /** 创建用户信息 */
  async createUser(userInfo: Record<string, any>) {
    try {
      const res = await userDao.create(userInfo)
      return res
    } catch (error) {
      console.log(`createUser error--> ${error}`)
    }
  }

  /** 获取用户信息 */
  async getUser(account: string | number) {
    try {
      const user = await userDao.findOne({ account }, { password: 0 }) // 不返回密码字段
      return user // 返回找到的用户或者 null
    } catch (error) {
      console.log(`getUser error--> ${error}`)
    }
  }

  /** 爬取网站指定信息 */
  async spider(url = 'https://lijiayuan.top/') {
    try {
      const response = await axios.get(url)
      const html = response.data.toString()
      const $ = cheerio.load(html)
      const data: any[] = []
      const data2: any[] = []

      let arr4 = $('.post-title-link')
      // @ts-ignore
      arr4.map((i, el) => {
        data2.push(el.name)
      })

      // let arr = $('.post-title')
      // let arr1 = $('.post-meta [itemprop="name"]')
      // let arr2 = $('.post-meta  [itemprop="dateCreated datePublished"]')
      // let arr3 = $('.post-meta [title="阅读时长"]')
      // for (let i = 0; i < arr.length; i++) {
      // data.push({
      //   title: arr[i].text(),
      //   tag: arr1[i].text(),
      //   date: arr2[i].text(),
      //   time: arr3[i].text(),
      // })
      // }
      return {
        data2,
        data,
      }
    } catch (error) {
      console.log(`spider error --------->${error}`)
    }
  }
}
