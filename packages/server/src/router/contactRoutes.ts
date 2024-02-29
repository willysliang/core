/**
 * @ Author: willy
 * @ CreateTime: 2024-02-22 10:11:24
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-29 14:13:25
 * @ Description: 联系人路由
 */

import express, { Router } from 'express'
import { validateToken } from '../middleware/tokenMiddleware'
import {
  searchContactHandler,
  createContactHandler,
  searchContactByIdHandler,
  putContactByIdHandler,
  deleteContactByIdHandler,
} from '../controllers/contactControlles'

const router: Router = express.Router()

router.use(validateToken)

router.route('/').get(searchContactHandler).post(createContactHandler)
router
  .route('/:id')
  .get(searchContactByIdHandler)
  .put(putContactByIdHandler)
  .delete(deleteContactByIdHandler)

export default router
