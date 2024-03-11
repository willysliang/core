/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-11 17:31:20
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 19:21:16
 * @ Description: 音乐馆的数据约束集合
 */

/** 排行榜详情 */
export interface TopListDetail {
  subscribers: any[]
  subscribed?: any
  creator?: any
  artists?: any
  tracks: {
    first: string
    second: string
  }[]
  updateFrequency: string
  backgroundCoverId: number
  backgroundCoverUrl?: any
  titleImage: number
  titleImageUrl?: any
  englishTitle?: any
  opRecommend: boolean
  recommendInfo?: any
  subscribedCount: number
  cloudTrackCount: number
  userId: number
  highQuality: boolean
  createTime: number
  specialType: number
  coverImgId: number
  newImported: boolean
  anonimous: boolean
  updateTime: number
  trackCount: number
  coverImgUrl: string
  commentThreadId: string
  trackUpdateTime: number
  totalDuration: number
  privacy: number
  playCount: number
  trackNumberUpdateTime: number
  adType: number
  description: string
  ordered: boolean
  tags: any[]
  status: number
  name: string
  id: number
  coverImgId_str: string
  ToplistType: string
}

/** 独家放送 */
export interface PersonalizedPrivateContent {
  id: number
  url: string
  picUrl: string
  sPicUrl: string
  type: number
  copywriter: string
  name: string
  time: number
}

/** 推荐电台 */
export interface DjProgram {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime?: any
}
