/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 11:58:33
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-23 18:00:54
 * @ Description: 推送通知
 */

import express from 'express'
import { WebPushController } from './controllers/webPushControlles'

const router = express.Router()
const webPushController = new WebPushController()

router.route('/check').post(webPushController.checkPushSubscriptionHandler)
router.route('/subscribe').post(webPushController.pushMessageHandler)

export default router
