/**
 * @ Author: willysliang
 * @ CreateTime: 2025-04-03 19:41:23
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 14:38:09
 * @ Description: 根据视频dom播放的实时帧检测黑屏(所以需要播放视频来处理)
 */

interface ICheckConfig {
  /** 黑色占比，-1 则关闭检查 */
  blackScreenParam: number
  /** 检查次数 */
  checkCount: number
  /** 检查时间周期毫秒 */
  checkInterval: number
  /** 纳入查色块范围 */
  color: number // 如color=10，则为 rgb(10, 10, 10) 到 rgb(0, 0, 0)
}

/**
 * @class CheckBlackVideo 检查是否是黑屏
 * @description 需要视频处于播放状态，然后再获取实时的帧画面来处理
 * @example
    const handleCheckBlackVideo = () => {
      const videoDom = document.getElementById('video') as HTMLVideoElement
      if (!videoDom) return
      if (videoDom.paused) videoDom.play()
      const instance = new CheckBlackVideo(videoDom)
      instance.check().then((result) => {
        console.log('检测结果：', result ? '黑屏' : '非黑屏')
        console.log('检测帧率结果：', instance.checkResult)
      })
    }
 */
export class CheckBlackVideo {
  /** 视频dom */
  videoDom: HTMLVideoElement
  /** 检查配置项 */
  config: ICheckConfig
  checkResult: string[]

  constructor(videoDom: HTMLVideoElement) {
    this.config = {
      blackScreenParam: 0.68,
      checkCount: 2,
      checkInterval: 1000,
      color: 10,
    }
    this.videoDom = videoDom
    this.checkResult = []
  }

  /** 开始检测，返回是否为黑屏的布尔值 */
  check(): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (this.config.blackScreenParam === -1) {
        resolve(false)
      }

      try {
        const isBlack = await this.useCanvasCheck()
        resolve(isBlack)
      } catch {
        // 报错则非黑屏
        resolve(false)
      }
    })
  }

  /** 使用 canvas 检查视频是否黑屏 */
  useCanvasCheck(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      let count = 0

      const { color, blackScreenParam, checkCount, checkInterval } = this.config

      /** 遍历 canvas 输出的像素值 */
      const loopCheckFn = () => {
        count++

        canvas.width = this.videoDom.videoWidth
        canvas.height = this.videoDom.videoHeight

        // 将视频绘制到 canvas 上
        ctx.drawImage(this.videoDom, 0, 0)
        // 获取 canvas 的像素数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        ctx.putImageData(imageData, 0, 0)
        const data = imageData.data

        let blackPixels = 0

        // 一个像素占4位，rgba 顺序分布
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          if (r < color && g < color && b < color) {
            blackPixels++
          }
        }

        this.checkResult.push(
          `黑色像素比: ${(blackPixels * 4) / data.length}, 次数: ${count}`,
        )

        // 大于基准值，则认为是黑屏，少于则不是（黑屏的点在数据总数中超出基准值）
        if ((blackPixels * 4) / data.length > blackScreenParam) {
          // 只要有一次黑屏，则认为黑屏
          resolve(true)
        } else if (count < checkCount) {
          setTimeout(loopCheckFn, checkInterval)
        } else {
          // 次数结束则非黑屏
          resolve(false)
        }
      }

      // 初始化检查
      try {
        setTimeout(loopCheckFn, checkInterval)
      } catch (err) {
        reject(err)
      }
    })
  }
}
