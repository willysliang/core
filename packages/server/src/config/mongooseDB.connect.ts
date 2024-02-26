/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 17:46:47
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-26 11:43:32
 * @ Description: 数据库连接
 */

import mongoose, { Connection, ConnectOptions } from 'mongoose'
import { mongodbConfig } from './db.config'

/**
 * @class MongooseConnect
 * mongoose 链接类
 */
class MongooseConnect {
  public mongooseUrl: string
  public mongooseOptions: ConnectOptions
  public mongooseDBConfig: Record<string, any>

  constructor(mongooseDBConfig) {
    this.mongooseDBConfig = mongooseDBConfig
    this.mongooseUrl = this.getMongoUrl(this.mongooseDBConfig)
    this.mongooseOptions = this.getMongoOptions(this.mongooseDBConfig)
  }

  /**
 * mongoose url 字符串拼接
 * @description 连接字符串类型
   副本集模式无认证：mongodb://member1Host:member1Port,member2Host:member2Port,.../dbName
   副本集模式有认证：mongodb://user:password@member1Host:member1Port,member2Host:member2Port,.../dbName?authSource=admin
   单机模式无认证：mongodb://host:port/dbName
   单机模式有认证：mongodb://user:password@host:port/dbName?authSource=admin
 * @returns {string}
 */
  getMongoUrl(mongodbConfig): string {
    // 前缀拼接
    let mongoUrl = 'mongodb://'

    const replicaSet = mongodbConfig.replicaSet
    if (replicaSet.name) {
      // 副本集模式
      const members = replicaSet.members
      const memberInfos = members.map(
        (member) => `${member.host}:${member.port}`,
      )
      mongoUrl += memberInfos.join(',')
    } else {
      // 单机模式
      const hostAndPort = `${mongodbConfig.host}:${mongodbConfig.port}`
      mongoUrl += mongodbConfig.user
        ? `${mongodbConfig.user}:${mongodbConfig.password}@${hostAndPort}`
        : hostAndPort
    }

    // 后缀拼接
    const dbName = mongodbConfig.database
    mongoUrl += `/${dbName}`
    if (mongodbConfig.user) {
      mongoUrl += `?authSource=${mongodbConfig.authSource}`
    }

    return mongoUrl
  }

  /**
   * 配置 mongoDB options
   */
  getMongoOptions(mongodbConfig): ConnectOptions {
    const options: ConnectOptions = {}
    if (mongodbConfig.user) options.user = mongodbConfig.user
    if (mongodbConfig.password) options.pass = mongodbConfig.password
    if (mongodbConfig.replicaSet.name)
      options.replicaSet = mongodbConfig.replicaSet.name
    return options
  }

  connectDB() {
    const mongoClient: Connection = mongoose.createConnection(
      this.mongooseUrl,
      this.mongooseOptions,
    )

    /**
     * Mongo 连接成功回调
     */
    mongoClient.on('connected', () => {
      console.log('Mongoose connected to ' + this.mongooseUrl)
    })

    /**
     * Mongo 连接失败回调
     */
    mongoClient.on('error', (err) => {
      console.log('Mongoose connection error: ' + this.mongooseUrl + err)
    })
    /**
     * Mongo 关闭连接回调
     */
    mongoClient.on('disconnected', () => {
      console.log('Mongoose disconnected')
    })

    // 关闭 Mongo 连接 (还需要通过调用该函数才能触发)
    const close = mongoClient.close

    return {
      mongoClient,
      close,
    }
  }
}

export const mongooseConnect = new MongooseConnect(mongodbConfig)
export const connectPool = mongooseConnect.connectDB()
