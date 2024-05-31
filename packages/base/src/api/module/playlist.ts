/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-09 13:31:15
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 15:56:20
 * @ Description: 歌单列表详情页的接口
 */

import type { PlayListDetail } from '@/types/playlist'
import type { Song } from '@/types/song'
import http from '@/utils/http'

/* 获取歌单详情 */
export const usePlayListDetail = async (id: number, s = 8) => {
  const { playlist } = await http.get<{ playlist: PlayListDetail }>({
    url: '/api/playlist/detail',
    params: {
      id,
      s,
    },
  })
  return playlist
}

/* 获取歌单所有歌曲 */
export const usePlayListTrackAll = async (id: number) => {
  const { songs } = await http.get<{ songs: Song[] }>({
    url: '/api/playlist/track/all',
    params: { id },
  })
  return songs
}
