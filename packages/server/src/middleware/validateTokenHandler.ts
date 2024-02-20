/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 20:04:18
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-20 20:51:25
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

      jwt.verify(token, SECRETKEY, (error: string, decoded: Object) => {
        if (error) {
          res.status(400).json('jwt is valid')
          return
          //   throw Error('jwt is valid')
        }
        // @ts-ignore
        req.user = decoded.user
        next()
      })

      if (!token) {
        res.status(401).json('token is null')
        return
        // throw new Error('token is null')
      }
    } else {
      res.status(403).json('auth is valid')
      return
      //   throw Error('auth is valid')
    }
  },
)
