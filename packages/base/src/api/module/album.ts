/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 14:23:50
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 17:27:46
 * @ Description: 专辑详情页页的接口
 */

import type { Album } from '@/types/album'
import type { Song } from '@/types/song'
import http from '@/utils/http'

/* 获取专辑内容 */
export const useAlbum = async (id: number) => {
  const { album, songs } = await http.get<{ album: Album; songs: Song[] }>({
    url: '/api/album',
    params: { id },
  })

  return { album, songs }
}
