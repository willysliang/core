import mongoose from 'mongoose'
import { connectPool } from '../config/mongooseDB.connect'

const contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add the contact name'],
    },
    email: {
      type: String,
      required: [true, 'Please add the contact email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact phone'],
    },
  },
  {
    versionKey: false,
    // 添加时间戳
    timestamps: true,
  },
)

export const UserModel = connectPool.mongoClient.model(
  'Contact',
  contactSchema,
  'contact',
)
