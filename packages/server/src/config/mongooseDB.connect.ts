/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 17:46:47
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-20 19:51:52
 * @ Description: 数据库连接
 */

import mongoose, { Connection } from 'mongoose'
import { mongodbConfig } from './db.config'

/**
 * mongoose url 字符串拼接
 * @description 连接字符串类型
   副本集模式无认证：mongodb://member1Host:member1Port,member2Host:member2Port,.../dbName
   副本集模式有认证：mongodb://user:password@member1Host:member1Port,member2Host:member2Port,.../dbName?authSource=admin
   单机模式无认证：mongodb://host:port/dbName
   单机模式有认证：mongodb://user:password@host:port/dbName?authSource=admin
 * @returns {string}
 */
export function getMongoUrl(): string {
  // 前缀拼接
  let mongoUrl = 'mongodb://'

  const replicaSet = mongodbConfig.replicaSet
  if (replicaSet.name) {
    // 副本集模式
    const members = replicaSet.members
    const memberInfos = members.map((member) => `${member.host}:${member.port}`)
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
export function getMongoOptions() {
  const options = {
    // poolSize: 5, // 连接池中维护的连接数
    // reconnectTries: Number.MAX_VALUE,
    // keepAlive: 120,
  } as any
  if (mongodbConfig.user) options.user = mongodbConfig.user
  if (mongodbConfig.password) options.pass = mongodbConfig.password
  if (mongodbConfig.replicaSet.name)
    options.replicaSet = mongodbConfig.replicaSet.name
  return options
}

export const connectDB = () => {
  const mongoClient: Connection = mongoose.createConnection(
    getMongoUrl(),
    getMongoOptions(),
  )

  /**
   * Mongo 连接成功回调
   */
  mongoClient.on('connected', () => {
    console.log('Mongoose connected to ' + getMongoUrl())
  })
  /**
   * Mongo 连接失败回调
   */
  mongoClient.on('error', (err) => {
    console.log('Mongoose connection error: ' + getMongoUrl() + err)
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
