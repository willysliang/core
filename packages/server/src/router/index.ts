import express from 'express'
import userRoutes from './userRoutes'
import contactRoutes from './contactRoutes'
import webPushRoutes from './webPushRoutes'

const router = express.Router()

router.get('/', (_, res) => {
  res.render('index', { title: 'Express' })
})

router.use('/webPush', webPushRoutes)
router.use('/user', userRoutes)
router.use('/contact', contactRoutes)

export default router