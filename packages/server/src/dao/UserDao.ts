/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 16:45:34
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 10:19:58
 * @ Description: 用户数据访问层
 */

import { BaseDao } from './BaseDao'
import { UserModel } from '../models/userModel'

export class UserDao extends BaseDao {
  constructor() {
    super(UserModel)
  }
}
