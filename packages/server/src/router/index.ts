import express from 'express'
import userRoutes from './userRoutes'

const router = express.Router()

router.get('/', (_, res) => {
  res.render('index', { title: 'Express' })
})

// router.use('/webPush', require('./webPush'))
router.use('/user', userRoutes)

export default router
