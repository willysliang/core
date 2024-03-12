import http from '@/utils/http'
import type { SongUrl, Song } from '@/types/song'
import { first } from 'lodash'

/* 获取音乐url */
export async function useSongUrl (id: number) {
  const { data } = await http.get<{ data: SongUrl[] }>({
    url: '/api/song/url',
    params: {
      id,
    },
  })
  return first(data)
}

/* 获取歌曲详情 */
export const useSongDetail = async (id: number) => {
  const { songs } = await http.get<{ songs: Song[] }>({
    url: '/api/song/detail',
    params: {
      ids: id,
    },
  })
  return first(songs)
}
