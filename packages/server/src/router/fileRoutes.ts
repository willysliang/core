/**
 * @ Author: willy
 * @ CreateTime: 2024-02-29 14:18:05
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:34:37
 * @ Description: 文件类相关路由
 */

import express, { Router } from 'express'
import { FileController } from '../controllers/fileControlles'

const router: Router = express.Router()
const fileController = new FileController()

/** 上传文件类 */
router.route('/upload_base64').post(fileController.uploadBase64FilePostHandler)

export default router
