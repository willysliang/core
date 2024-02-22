/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 10:19:27
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 21:18:16
 * @ Description: 联系人数据访问层
 */

import { BaseDao } from './BaseDao'
import { ContactModel } from '../models/contactModel'

export class ContactDao extends BaseDao {
  constructor() {
    super(ContactModel)
  }
}
