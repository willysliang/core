/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 12:06:14
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 11:55:29
 * @ Description: 基础 DAO 类
 */
import { Model } from 'mongoose'

export class BaseDao {
  Model: Model<any>

  /**
   * 子类构造传入对应的 Model 类
   *
   * @param Model
   */
  constructor(Model) {
    this.Model = Model
  }

  /**
   * 使用 Model 的 静态方法 create() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  async create(obj) {
    const entity = new this.Model(obj)
    try {
      const dao = await this.Model.create(entity)
      console.log('create result--> ', dao)
      return dao
    } catch (error) {
      console.log('create error--> ', error)
    }
  }

  /**
   * 使用 Model save() 添加 doc
   *
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  async save(obj) {
    const entity = new this.Model(obj)
    try {
      const result = await entity.save()
      return result
    } catch (error) {
      console.log('save error--> ', error)
    }
  }
  /**
   * 批量添加
   * @param {*} arr
   * @returns
   */
  async saveMany(arr) {
    try {
      const result = await this.Model.insertMany(arr)
      return result
    } catch (error) {
      console.log('saveMany error--> ', error)
    }
  }

  /**
   * 查询所有符合条件 docs
   *
   * @param condition 查找条件
   * @param constraints 查找配置
   * @returns {Promise}
   */
  async findAll(condition, constraints: null | Record<string, any> = null) {
    try {
      const data = await this.Model.find(
        condition,
        constraints ? constraints : null,
      )
      return data
    } catch (error) {
      console.log('findAll error--> ', error)
    }
  }

  /**
   * 查找符合条件的第一条 doc
   *
   * @param {object} condition 查询条件
   * @param {object} [constraints] 约束条件
   * @returns {Promise}
   */
  async findOne(condition, constraints: null | Record<string, any> = null) {
    try {
      const data = await this.Model.findOne(
        condition,
        constraints ? constraints : null,
      )
      return data
    } catch (error) {
      console.log(`findOne error--> ${error}`)
    }
  }

  /**
   * 查找排序之后的第一条
   *
   * @param condition
   * @param orderColumn
   * @param orderType
   * @returns {Promise}
   */
  async findOneByOrder(condition, orderColumn, orderType) {
    try {
      const data = await this.Model.findOne(condition)
        .sort({ [orderColumn]: orderType })
        .exec()
      return data
    } catch (error) {
      console.log(`findOneByOrder--> ${error}`)
    }
  }

  /**
   * 更新 docs
   *
   * @param condition 查找条件
   * @param updater 更新操作
   * @returns {Promise}
   */
  async update(condition, updater) {
    try {
      const result = await this.Model.updateMany(condition, updater)
      return result
    } catch (error) {
      console.log(`update error--> ${error}`)
    }
  }

  /**
   * 移除 doc
   *
   * @param condition 查找条件
   * @returns {Promise}
   */
  async remove(condition) {
    try {
      const result = await this.Model.deleteMany(condition)
      return result
    } catch (error) {
      console.log(`remove error--> ${error}`)
    }
  }
}
