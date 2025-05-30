<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-05-29 10:06:29
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-30 08:42:01
 * @ Description: dplayer 插件
 -->

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Hls from 'hls.js'
import Flv from 'flv.js'
import DPlayer from 'dplayer'
import { avactor, demoJpg } from '@/assets/images'
import thumbnail from './assets/thumbnails.jpg'
import mp4Video from './assets/demo.mp4'

let dp: DPlayer | null = null

const dplayerRef = ref<HTMLVideoElement>()
const initPlayer = () => {
  /**
   * @see https://dplayer.diygod.dev/zh/
   */
  dp = new DPlayer({
    container: dplayerRef.value,
    autoplay: false, // 是否自动播放
    live: false, // 是否直播
    theme: '#b7daff', // 主题色 底部进度条相关颜色
    loop: false, // 是否循环播放
    lang: 'zh-cn', // 语言
    screenshot: true, // 开启截图，如果开启，视频和视频封面需要允许跨域
    hotkey: true, // 开启热键，支持快进、快退、音量控制、播放暂停
    preload: 'auto', // 视频预加载，可选值: 'none', 'metadata', 'auto'
    volume: 60, // 初始化音量
    playbackSpeed: [0.5, 1, 2, 4, 8], // 播放速度
    mutex: false, // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    preventClickToggle: false, // 阻止点击播放器时候自动切换播放/暂停
    logo: avactor, // 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
    video: {
      pic: demoJpg, // 视频封面
      defaultQuality: 0,
      thumbnails: thumbnail, // 视频缩略图(聚焦进度条显示预览图)，可以使用 DPlayer-thumbnails生成

      url: mp4Video, // 视频链接
      type: 'auto', // 可选值: 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或其他自定义类型
      // url: 'http://example.com/stream.m3u8',
      // type: 'customHls',
      customType: {
        // 自定义播放类型文件《type需要设置为'customHls'》
        customHls: (video, player) => {
          const hls = new Hls()
          hls.loadSource(video.src)
          hls.attachMedia(video)
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS错误:', event, data)
            player.notice('播放错误')
            dp.emit('error')
          })
        },
        // 自定义播放类型文件《type需要设置为'customFlv'》
        customFlv: (video, player) => {
          const flvPlayer = Flv.createPlayer({
            type: 'flv',
            url: video.src,
          })
          flvPlayer.attachMediaElement(video)
          flvPlayer.load()
          flvPlayer.on('error', () => {
            player.notice('FLV错误')
            dp.emit('error')
          })
        },
      },
    },
  })

  // 考虑隐私问题，初始化时把音量设为0,才可自动播放
  // dp.volume(percentage: number, nostorage: boolean, nonotice: boolean): 设置视频音量
  dp.volume(0, true, true)
  // 视频组件加载完成后自动播放
  dp.on('loadedmetadata', () => {
    dp.play()
  })

  // 视频流出问题时触发
  let retryCount = 0
  dp.on('error', () => {
    if (retryCount < 3) {
      const currentTime = dp.video.currentTime
      retryCount++
      setTimeout(() => {
        dp.video.src = dp.options.video.url // 重新设置源
        dp.video.load()
        dp.on('loadeddata', () => {
          dp.seek(currentTime)
          dp.play()
        })
      }, 2000)
    } else {
      console.error('重试次数过多，请检查网络或视频源')
    }
  })
}

onMounted(initPlayer)
onBeforeUnmount(() => {
  dp && dp.destroy()
})
</script>

<template>
  <div ref="dplayerRef" class="dplayer video-box"></div>
</template>

<style scoped lang="scss">
/* 由于不能通过设置参数去禁用底部操作按钮只能靠css实现 */
.video-box {
  width: 100%;
}

/* 禁用视频右键菜单 */
::v-deep(.dplayer-menu),
::v-deep(.dplayer-mask) {
  display: none !important;
}

/* 隐藏底部操作栏 */
/* ::v-deep(.dplayer-controller) {
  opacity: 0;
  transition: opacity 0.3s;
}
::v-deep(.dplayer-controller:hover) {
  opacity: 1;
} */
</style>
