import mongoose from 'mongoose'

// 创建 user Schema
const userSchema = new mongoose.Schema(
  {
    _id: String,
    account: { type: String, unique: true },
    password: String, // 注意在实际应用中应该存储密码的哈希值而不是明文
    name: String,
    age: Number,
    gender: String,
  },
  { versionKey: false },
)

export const UserModel = mongoose.model('User', userSchema, 'user')
