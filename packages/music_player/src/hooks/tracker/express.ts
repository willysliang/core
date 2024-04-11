/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @ Author: willy <willysliang@qq.com>
 * @ Create Time: 2023-05-23 10:48:33
 * @ Modifier by: willy <willysliang@qq.com>
 * @ Modifier time: 2023-05-24 20:54:03
 * @ Description: 后端配置
 */

const express = require('express')
const router = express.Router()

router.get('/tracker/track.gif', (_, res, next) => {
  try {
    // 处理埋点数据
    // ...

    // 返回 1x1像素的透明 gif 图像
    const buffer = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64',
    )
    res.writeHead(200, {
      ContentType: 'image/gif',
      ContentLength: buffer.length,
    })
    console.log('buffer', buffer)
    res.end(buffer)
  } catch (err) {
    next(err)
  }
})

router.post('/tracker', (req, res) => {
  console.log(req.body)
  res.send(200)
})

module.exports = router
