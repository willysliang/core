/**
 * @ Author: willy
 * @ CreateTime: 2024-02-21 14:36:44
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 21:18:25
 * @ Description: 联系人模块
 */

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

export const ContactModel = connectPool.mongoClient.model(
  'Contact',
  contactSchema,
  'contact',
)
