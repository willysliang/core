import { UserDao } from '../dao/UserDao'
// import axios from 'axios'
// import asyncHandler from 'express-async-handler'

const userDao = new UserDao()

export class UserService {
  /** 创建用户信息 */
  async createUser() {
    //
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
}
