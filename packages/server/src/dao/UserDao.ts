import { BaseDao } from './BaseDao'
import { UserModel } from '../models/userModel'

export class UserDao extends BaseDao {
  constructor() {
    super(UserModel)
  }
}
