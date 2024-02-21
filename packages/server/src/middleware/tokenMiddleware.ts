/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 20:04:18
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-21 10:45:07
 * @ Description: 鉴权中间件
 */

import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { SECRETKEY } from '../config/app.config'

export const validateToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers?.Authorization || req.headers?.authorization

    if (typeof auth === 'string' && auth.startsWith('Bearer')) {
      const token = auth.split(' ')?.[1] || ''

      if (!token) {
        res.json({
          code: 400,
          msg: 'token is null',
        })
        return
      }

      jwt.verify(token, SECRETKEY, (error: string, decoded: Object) => {
        if (error) {
          res.json({
            code: 400,
            msg: 'jwt is valid',
          })
          return
        }
        // @ts-ignore
        req.user = decoded.user
        next()
      })
    } else {
      res.json({
        code: 400,
        msg: 'auth is valid',
      })
      return
    }
  },
)
