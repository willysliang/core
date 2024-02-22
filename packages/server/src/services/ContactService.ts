/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 10:29:12
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 16:35:35
 * @ Description: 联系人业务逻辑层
 */

import { ContactDao } from '../dao/ContactDao'

const contactDao = new ContactDao()

export class ContactService {
  /** 根据用户 id 查找联系人信息 */
  async findContactInfoByUserId(userId) {
    try {
      const contacts = await contactDao.findOne({ user_id: userId })
      const isFindSuc = !!contacts
      const error = isFindSuc ? undefined : new Error('未找到该联系人')
      return {
        code: isFindSuc ? 201 : 404,
        msg: isFindSuc ? 'success' : '未找到该联系人',
        error,
        data: { contacts },
      }
    } catch (error) {
      return {
        code: 403,
        msg: '查询联系人失败',
        error,
      }
    }
  }

  /** 创建联系人信息 */
  async createContactInfo(contactInfo: Record<string, any>) {
    try {
      const contact = await contactDao.create(contactInfo)
      return {
        code: 200,
        msg: 'success',
        data: { contact },
      }
    } catch (error) {
      return {
        code: 500,
        msg: '创建联系人失败',
        error,
      }
    }
  }

  /**根据 id 查看联系人信息 */
  async searchContactInfoById(id) {
    try {
      const contact = await contactDao.findById(id)
      const isFindSuc = !!contact // 是否找到联系人资料
      const error = isFindSuc ? undefined : new Error('未找到该联系人')
      return {
        code: isFindSuc ? 201 : 404,
        msg: isFindSuc ? 'success' : '未找到该联系人',
        error,
        data: { contact },
      }
    } catch (error) {
      return {
        code: 400,
        msg: '查询联系人失败',
        error,
      }
    }
  }

  /** 根据 id 更新联系人信息 */
  async putContactInfoById(id, userId, updateParams) {
    try {
      const result = await this.searchContactInfoById(id)
      const contact = result.data?.contact
      // 如果没有查询到，则返回相应的报错信息
      if (!contact) return result

      // 如果查询到了，则判断该联系人是否属于当前用户
      if (contact.user_id.toString() !== userId) {
        return {
          code: 403,
          msg: '你无权更新此用户信息',
          error: new Error('你无权更新此用户信息'),
        }
      }

      const updatePut = await contactDao.findByIdAndUpdate(id, updateParams)
      return {
        code: 200,
        msg: 'success',
        data: { contact: updatePut },
      }
    } catch (error) {
      return {
        code: 400,
        msg: '更新此用户信息失败',
        error,
      }
    }
  }

  /** 根据 id 删除联系人信息 */
  async deleteContactInfoById(id, userId) {
    try {
      const result = await this.searchContactInfoById(id)
      const contact = result.data?.contact
      // 如果没有查询到，则返回相应的报错信息
      if (!contact) return result

      // 如果查询到了，则判断该联系人是否属于当前用户
      if (contact.user_id.toString() !== userId) {
        return {
          code: 403,
          msg: '你无权删除此用户信息',
          error: new Error('你无权删除此用户信息'),
        }
      }

      await contactDao.deleteOne({ user_id: userId })
      return {
        code: 200,
        msg: '删除联系人信息成功',
      }
    } catch (error) {
      return {
        code: 200,
        msg: '删除联系人信息失败',
        error,
      }
    }
  }
}
