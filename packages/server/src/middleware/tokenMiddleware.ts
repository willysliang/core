/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 20:04:18
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 16:51:18
 * @ Description: 鉴权中间件
 */

import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { SECRETKEY } from '../config/app.config'

export const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.Authorization || req.headers?.authorization

    if (typeof auth === 'string' && auth.startsWith('Bearer')) {
      const token = auth.split(' ')?.[1] || ''

      if (!token) {
        res.status(400)
        next(createError(400, '请携带验证信息!'))
        return
      }

      jwt.verify(token, SECRETKEY, (error: string, decoded: Object) => {
        if (error) {
          res.status(400)
          next(createError(400, '请携带有效验证信息!'))
          return
        }
        // @ts-ignore
        req.user = decoded.user
        next()
      })
    } else {
      res.status(400)
      next(createError(400, '请携带验证信息!'))
      return
    }
  },
)
