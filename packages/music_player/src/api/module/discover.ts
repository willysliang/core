/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-08 18:32:34
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 18:10:23
 * @ Description: 推荐页的接口
 */

import type {
  Banner,
  PersonalizedMv,
  PersonalizedNewSong,
  PersonalizedSongList,
} from '@/types/discover'
import http from '@/utils/http'

/* 获取 banner( 轮播图 ) 数据 */
export const useBanner = async () => {
  const { banners } = await http.get<{ banners: Banner[] }>({
    url: '/api/banner',
    params: {
      type: 0,
    },
  })
  return banners
}

/* 获取推荐歌单 */
export const usePersonalizedSongList = async () => {
  const { result } = await http.get<{ result: PersonalizedSongList[] }>({
    url: '/api/personalized',
    params: { limit: 30 },
  })
  return result
}

/** 获取推荐最新音乐 */
export async function usePersonalizedNewSong () {
  const { result } = await http.get<{ result: PersonalizedNewSong[] }>({
    url: '/api/personalized/newsong',
  })
  return result
}

/** 推荐MV */
export async function usePersonalizedMv () {
  const { result } = await http.get<{ result: PersonalizedMv[] }>({
    url: '/api/personalized/mv',
  })
  return result
}
