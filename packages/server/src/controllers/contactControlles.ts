/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 10:17:31
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:15:40
 * @ Description: 联系人接口
 */

import { Response, Request, NextFunction, RequestHandler } from 'express'
import asyncHandler from 'express-async-handler'
import createError from 'http-errors'
import { ContactService } from '../services/ContactService'
import { isUndefined } from '../utils/index'

const contactService = new ContactService()

/** 获取 token 中的 uid */
export const getTokenUserId = (req) =>
  req.user?.id || '65d56ab66e0dceb3d62dbcd5'

/** 查询联系人(根据token) */
export const searchContactHandler: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await contactService.findContactInfoByUserId(
      getTokenUserId(req),
    )

    res.status(result.code)
    if (result.error) {
      const error = createError(result.code, result.msg)
      next(error)
    } else {
      res.json(result)
    }
  },
)

/** 创建联系人 */
export const createContactHandler: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone } = req.body

    // 值校验
    if (isUndefined(name) || isUndefined(email) || isUndefined(phone)) {
      res.status(400)
      const error = createError(400, 'All fields are mandatory !')
      next(error)
    }

    // 创建
    const contactInfo = {
      name,
      email,
      phone,
      user_id: getTokenUserId(req),
    }
    const result = await contactService.createContactInfo(contactInfo)

    res.status(result.code)
    if (result.error) {
      const error = createError(result.code, result.msg)
      next(error)
    } else {
      res.json(result)
    }
  },
)

/**
 * 根据数据库主键 id 进行相关操作
 */
/** 查找 */
export const searchContactByIdHandler: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await contactService.searchContactInfoById(id)

    res.status(result.code)
    if (result.error) {
      const error = createError(result.code, result.msg)
      next(error)
    } else {
      res.json(result)
    }
  },
)

/** 更新 */
export const putContactByIdHandler: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const userId = getTokenUserId(req)

    const result = await contactService.putContactInfoById(id, userId, req.body)

    res.status(result.code)
    if ('error' in result) {
      const error = createError(result.code, result.msg)
      next(error)
    } else {
      res.json(result)
    }
  },
)

export const deleteContactByIdHandler: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const userId = getTokenUserId(req)
    const result = await contactService.deleteContactInfoById(id, userId)

    res.status(result.code)
    if ('error' in result) {
      const error = createError(result.code, result.msg)
      next(error)
    } else {
      res.json(result)
    }
  },
)
