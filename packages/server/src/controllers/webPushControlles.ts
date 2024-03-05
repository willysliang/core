/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 21:28:01
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:25:36
 * @ Description: web-push 控制器
 */

import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { WebPushService } from '../services/app/webPushService'

const webPushService = new WebPushService()

export class WebPushController {
  /** web 端 serviceWork 就绪时检查 pushSubscription */
  async checkPushSubscriptionHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      //   const ip = req.ip // 获取客户端的 IP 地址
      const pushSubscription = req.body.pushSubscription
      const ip = req.body.ip

      const result = await webPushService.checkPushSubscription(
        ip,
        pushSubscription,
      )
      res.json({
        code: 200,
        msg: 'success',
        data: result,
      })
    } catch (error) {
      const errorData = {
        code: 500,
        msg: '检查 pushSubscription 失败~',
        error,
      }
      res.status(errorData.code)
      next(createError(errorData.code, errorData.msg))
    }
  }

  /** 向web端发送消息 */
  async pushMessageHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const pushSubscription = req.body.pushSubscription
      const ip = req.body.ip

      await webPushService.savePushSubscription(pushSubscription, ip)

      const message = { title: 'Hello', body: 'Hello, world!' }
      res.status(201).json({})
      await webPushService.pushMessage(message, pushSubscription, ip)
    } catch (error) {
      const errorData = {
        code: 500,
        msg: '推送消息失败~',
        error,
      }
      next(createError(errorData.code, errorData.msg))
    }
  }
}
