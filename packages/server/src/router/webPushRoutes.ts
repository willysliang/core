/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 11:58:33
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:13:52
 * @ Description: 推送通知
 */

import express, { Router } from 'express'
import { WebPushController } from '../controllers/webPushControlles'

const router: Router = express.Router()
const webPushController = new WebPushController()

router.route('/check').post(webPushController.checkPushSubscriptionHandler)
router.route('/subscribe').post(webPushController.pushMessageHandler)

export default router
