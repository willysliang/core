/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-07 11:13:30
 * @ Description: 歌曲播放信息持久化缓存
 */

import { defineStore, storeToRefs } from 'pinia'
import type { Song, SongUrl } from '@/types/song'
import { sample, findIndex, first, last, filter } from 'lodash'
import { useSongUrl, useSongDetail } from '@/api/module/player'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, onUnmounted, watch } from 'vue'
import { Storage } from '@util/cache'
import { PLAYER_CONTROLLER_KEY } from '@/config/constant/cache'

/***
 * 音乐播放器功能控制
 */
/** 音乐播放器功能接口 */
export interface IPlayerController {
  /** 当前播放时间 */
  currentTime: number
  /** 总播放时长 */
  duration: number
  /** 是否播放中 */
  isPlaying: boolean
  /** 是否正在拖动进度条 */
  sliderInput: boolean
  /** 是否播放结束 */
  ended: boolean
  /** 是否静音 */
  muted: false
  /** 循环模式 0 单曲循环 1 列表循环 2随机播放 */
  loopType: number
  /** 音量 */
  volume: number
}
/** 音乐播放器功能控制默认值 */
const playerController: IPlayerController = {
  currentTime: 0, // 当前播放时间
  duration: 0, // 总播放时长
  sliderInput: false, // 是否正在拖动进度条
  isPlaying: false, // 是否播放中
  ended: false, // 是否播放结束
  muted: false, // 是否静音
  loopType: 0, // 循环模式 0 单曲循环 1 列表循环 2随机播放
  volume: 60, // 音量
}
/** 获取音乐播放器缓存设置 */
const getLocalPlayerContronllerConfig = (): Partial<IPlayerController> => {
  try {
    const defaultValue = JSON.stringify(playerController)
    return {
      ...playerController,
      ...JSON.parse(Storage.get(PLAYER_CONTROLLER_KEY, defaultValue)),
    }
  } catch {
    return playerController
  }
}

/** 接口音频 */
export interface IPlayerStore extends IPlayerController {
  /** 歌曲详情信息 */
  song: Song
  /** 歌曲地址 */
  songUrl: SongUrl
  /** 当前播放的音频 */
  audio: HTMLAudioElement
  /** 播放列表 */
  playList: Song[]
  /** 所在播放的音乐 id 序号 */
  playId: number

  /** 歌曲列表的弹层显隐控制 */
  showPlayList: boolean
}

/** 音乐播放器的全局状态管理 */
export const usePlayerStore = defineStore({
  id: 'player',
  state: (): IPlayerStore => ({
    /* 功能控制 */
    ...(getLocalPlayerContronllerConfig() as IPlayerController),

    /* 接口音频 */
    audio: new Audio(),
    song: {} as Song,
    songUrl: <SongUrl>{},
    playList: <Song[]>[],
    playId: 0,

    /* 歌曲列表 */
    showPlayList: false,
  }),

  getters: {
    /** 播放列表总数 */
    playListCount: (state) => state.playList.length,
    /** 当前播放的音乐所在索引 */
    currentSongIndex: (state): number => {
      return findIndex(state.playList, (song) => song.id === state.playId)
    },
    /** 下一首歌 */
    nextSong (state): Song {
      const { playListCount, currentSongIndex } = this
      if (currentSongIndex === playListCount - 1) {
        return first(state.playList)
      } else {
        const nextSongIndex: number = currentSongIndex + 1
        return state.playList[nextSongIndex]
      }
    },
    /** 上一首歌 */
    prevSong (state): Song | undefined {
      const { currentSongIndex } = this
      if (currentSongIndex === -1) return undefined
      if (currentSongIndex === 0) {
        return last(state.playList)
      } else {
        const prevSongIndex: number = currentSongIndex - 1
        return state.playList[prevSongIndex]
      }
    },
  },

  actions: {
    /***
     * 播放流程
     */
    /** 初始化播放 */
    init () {
      this.audio.volume = this.volume / 100
    },
    /** 播放定时器 */
    interval () {
      if (this.isPlaying && !this.sliderInput) {
        this.currentTime = Number.parseInt(this.audio.currentTime.toString())
        this.duration = Number.parseInt(this.audio.duration.toString())
        this.ended = this.audio.ended
      }
    },
    /** 播放结束 */
    playEnd () {
      switch (this.loopType) {
        case 0:
          this.replaySong()
          break
        case 1:
          this.toggleNextSong()
          break
        case 2:
          this.randomPlay()
          break
        default:
          ElMessage.error('尚未开发该模式')
      }
    },

    /***
     * 歌曲接口
     */
    /** 获取播放视频接口 */
    async getPlay (id: number) {
      if (id === this.playId || !id) return undefined
      this.isPlaying = false
      const res = await useSongUrl(id)
      this.audio.src = res.url
      this.audio.play().then(() => {
        this.isPlaying = true
        this.songUrl = res
        this.playId = id
        this.getSongDetail(id)
      })
    },
    /** 获取歌曲详情 */
    async getSongDetail (id: number) {
      // this.song = await useSongDetail(this.playId)
      this.song = await useSongDetail(id)
      this.pushPlayList(false, this.song)
    },
    /** 播放列表添加音乐 */
    pushPlayList (replace: boolean, ...list: Song[]) {
      if (replace || this.playListCount <= 0) {
        this.playList = list
        return undefined
      } else {
        list.forEach((song) => {
          if (filter(this.playList, (s) => s.id === song.id).length <= 0) {
            this.playList.push(song)
          }
        })
      }
    },

    /***
     * 播放图标触发事件
     */
    /** 切换循环模式 */
    toggleLoop () {
      if (this.loopType >= 2) {
        this.loopType = 0
      } else {
        this.loopType++
      }
    },
    /** 播放控制按钮：播放、暂停 */
    togglePlay () {
      if (!this.song.id) return undefined
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    togglePrevSong () {
      if (this.prevSong) {
        this.getPlay(this.prevSong?.id)
      }
    },
    /** 顺序播放：切换下一首歌 */
    toggleNextSong () {
      // 如果循环模式为随机播放，则在列表中随机寻找歌曲播放
      if (this.loopType === 2) {
        this.randomPlay()
      } else {
        this.getPlay(this.nextSong?.id)
        // this.getPlay(1985352742)
      }
    },
    /** 重新播放当前歌曲 */
    replaySong () {
      setTimeout(() => {
        this.currentTime = 0
        this.audio.play()
      }, 1000)
    },
    /***
     * @randomPlay 随机播放
     * 歌曲列表长度为 0 ，则不需要播放
     * 歌曲列表长度为 1 ，则重复播放该歌曲
     * 歌曲列表长度为 2 ，则随机播放歌曲
     */
    randomPlay () {
      switch (this.playListCount) {
        case 0:
          break
        case 1:
          this.replaySong()
          break
        default:
          this.getPlay(sample(this.playList).id)
      }
    },

    /***
     * 播放按钮
     */
    /** 播放全部 */
    playAll (list: Song[]) {
      this.pushPlayList(true, ...list)
      if (this.playListCount > 0) {
        this.getPlay(first(this.playList).id)
      }
    },
    /** 继续播放 */
    setPlay () {
      if (!this.song.id) return
      this.audio.play()
      this.isPlaying = true
    },
    /** 暂停播放 */
    setPause () {
      if (!this.song.id) return
      this.audio.pause()
      this.isPlaying = false
    },

    /***
     * 播放滚动条
     */
    /** 修改播放时间 */
    onSliderChange (val) {
      try {
        this.currentTime = val
        this.sliderInput = false
        this.audio.currentTime = val
      } catch {}
    },
    /** 播放时间拖动中 */
    onSliderInput () {
      this.sliderInput = true
    },

    /***
     * 歌曲列表
     */
    /** 清空歌曲列表 及 相关联的状态列表 */
    clearPlayList () {
      // 清空状态条
      this.currentTime = 0
      this.sliderInput = false
      this.isPlaying = false
      this.ended = false

      // 清空歌曲信息
      this.audio.load()
      this.playList = <Song[]>[]
      this.songUrl = <SongUrl>{}
      this.song = <Song>{}
      this.playId = 0

      setTimeout(() => {
        this.duration = 0
      }, 500)
    },
  },
})

/***
 * @usePlayerInit 播放初始化
 */
export const usePlayerInit = () => {
  let timer: NodeJS.Timer
  const { init, interval, playEnd } = usePlayerStore()
  const { ended } = storeToRefs(usePlayerStore())

  // 监听播放结束
  watch(ended, (ended) => {
    if (!ended) return
    playEnd()
  })

  // 启动定时器
  onMounted(() => {
    init()
    console.log('启动定时器')
    timer = setInterval(interval, 1000)
  })

  /** 保存持久化缓存 */
  const { currentTime, duration, muted, loopType, volume } = usePlayerStore()
  onBeforeUnmount(() => {
    Storage.set(
      PLAYER_CONTROLLER_KEY,
      JSON.stringify({ currentTime, duration, muted, loopType, volume }),
    )
  })

  // 清除定时器
  onUnmounted(() => {
    console.log('清除定时器')
    clearInterval(timer)
  })
}
