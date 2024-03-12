<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-23 11:56:21
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 13:48:17
 * @ Description: 生成二维码组件
 * @ Install: pnpm i -S @types/qrcode qrcode
 -->

<script setup lang="ts">
import QRCode from 'qrcode'
import { ref, onMounted, watch } from 'vue'
import { ElNotification } from 'element-plus'

const props = defineProps({
  // 二维码存储内容
  qrUrl: {
    type: String,
    default: 'Hello World',
  },
  // canvas width
  width: {
    type: Number,
    default: 150,
  },
  // canvas height
  height: {
    type: Number,
    default: 150,
  },
  // 二维码尺寸（正方形 长宽相同）
  qrSize: {
    type: Number,
    default: 150,
  },
  // 二维码底部文字
  qrText: {
    type: String,
    default: 'Hello World',
  },
  // 底部说明文字字号
  qrTextSize: {
    type: Number,
    default: 12,
  },
})

const canvas = ref<HTMLCanvasElement>()
const emits = defineEmits(['getUrl'])

/**
 * @description 生成二维码
 * @argument qrUrl        二维码内容
 * @argument qrSize       二维码大小
 * @argument qrText       二维码中间显示文字
 * @argument qrTextSize   二维码中间显示文字大小(默认16px)
 */
const handleQrcode = async () => {
  const dom = canvas.value as HTMLCanvasElement
  const qrCodeOption: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    width: props.qrSize,
    version: 7,
    type: 'image/jpeg',
  }
  QRCode.toDataURL(props.qrUrl, qrCodeOption)
    .then((url: string) => {
      const ctx = dom.getContext('2d') as CanvasRenderingContext2D
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      emits('getUrl', url)
      image.onload = () => {
        ctx.drawImage(
          image,
          (props.width - props.qrSize) / 2,
          0,
          props.qrSize,
          props.qrSize,
        )
        if (props.qrText) {
          // 设置字体
          ctx.font = `bold ${props.qrTextSize}px Arial`
          const tw = ctx.measureText(props.qrText).width // 文字真实宽度
          const ftop = props.qrSize - props.qrTextSize // 根据字体大小计算文字top
          const fleft = (props.width - tw) / 2 // 根据字体大小计算文字left
          ctx.fillStyle = '#fff'
          ctx.textBaseline = 'top' // 设置绘制文本时的文本基线。
          ctx.fillStyle = 'green'
          ctx.fillText(props.qrText, fleft, ftop)
        }
      }
    })
    .catch((err: Error) => {
      ElNotification.error(JSON.stringify(err))
    })
}

/** 因为 canvas 需要挂载到页面上，必须在让 canvas 生成到 dom 上才可以操作 */
onMounted(handleQrcode)
watch([() => props.qrUrl, () => props.qrText], handleQrcode)

/**
 * @description 二维码下载/保存
 */
const saveQrcode = () => {
  const dom = canvas.value as HTMLCanvasElement
  const a = document.createElement('a')
  // 将二维码面板处理为图片
  a.href = dom.toDataURL('image/png', 0.5)
  a.download = props.qrUrl + '.png'
  a.click()
}
defineExpose({ saveQrcode })
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>
