/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 13:59:31
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 09:29:01
 * @ Description: 专辑相关的数据集
 */

import type { Artist } from './artist'

/* 专辑详情数据 */
export interface Album {
  songs: any[]
  paid: boolean
  onSale: boolean
  mark: number
  blurPicUrl: string
  companyId: number
  alias: string[]
  artists: Artist[]
  copyrightId: number
  picId: number
  artist: Artist
  publishTime: number
  company: string
  briefDesc: string
  picUrl: string
  commentThreadId: string
  pic: number
  tags: string
  description: string
  status: number
  subType: string
  name: string
  id: number
  type: string
  size: number
  picId_str: string
  info: {
    likedCount: number // 喜欢数
    shareCount: number // 分享数
    commentCount: number // 评论数
  }
}
