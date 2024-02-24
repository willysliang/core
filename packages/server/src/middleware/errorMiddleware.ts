/**
 * @ Author: willy
 * @ CreateTime: 2024-02-21 14:44:02
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-22 11:59:17
 * @ Description: 错误状态码中间件
 */

import { NextFunction, Request, Response } from 'express'
import createError, { HttpError } from 'http-errors'

const ERROR_CODE = {
  NOT_FOUND_ERROR: 404,
  VALIDATE_STATUS: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
}

const errorCodeMap = {
  [ERROR_CODE.VALIDATE_STATUS]: '验证不成功',
  [ERROR_CODE.NOT_FOUND_ERROR]: '404 Not Found',
  [ERROR_CODE.UNAUTHORIZED]: '未经授权',
  [ERROR_CODE.FORBIDDEN]: '禁止',
  [ERROR_CODE.SERVER_ERROR]: '服务器错误',
}

/** 
 * @function errorHandler 错误信息处理中间件 
 * @example 触发该中间件的方法
    app.get('/2', (_, __, next) => {
      const err = new Error('Custom error')
      // @ts-ignore
      err.status = 500
      next(err)
    })
 */
export const errorHandler = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  const statusCode = err.statusCode ? err.statusCode : 500

  if (errorCodeMap[statusCode]) {
    res.status(err.status || 500)
    res.render('error', {
      code: statusCode,
      msg: err.message || errorCodeMap[statusCode],
      data: {
        message: err.message,
        stackTrace: err.stack,
      },
    })
  } else {
    console.log('没有错误,All good')
  }
}

/** 404 未找到该资源中间件 */
export const error404Handler = (
  _: Request,
  ___: Response,
  next: NextFunction,
) => {
  next(createError(404))
}
