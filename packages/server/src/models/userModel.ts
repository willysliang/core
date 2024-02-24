/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 14:16:21
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 14:57:50
 * @ Description: 用户表
 */

import mongoose from 'mongoose'
import { connectPool } from '../config/mongooseDB.connect'

// 创建 user Schema
const userSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: [true, 'Please add the user account'],
      unique: [true, 'account already taken'],
    },
    email: {
      type: String,
      required: [true, 'Please add the user email'],
      unique: [true, 'Email address already taken'],
    },
    password: {
      // 注意在实际应用中应该存储密码的哈希值而不是明文
      type: String,
      required: [true, 'Please add the user password'],
    },
    name: String,
    age: Number,
    gender: String,
  },
  {
    versionKey: false,
    // 添加时间戳
    timestamps: true,
  },
)

export const UserModel = connectPool.mongoClient.model(
  'User',
  userSchema,
  'user',
)
