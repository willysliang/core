/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 09:35:48
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-09 09:47:39
 * @ Description: 歌手详情的接口
 */
import type { ArtistDesc, ArtistDetail } from '@/types/artist'
import type { Mv } from '@/types/mv'
import type { Song } from '@/types/song'
import type { Album } from '@/types/album'
import http from '@/utils/http'

/***
 * 歌手详情信息
 */
export const useArtistDetail = async (id: number) => {
  const { data } = await http.get<{ data: ArtistDetail }>({
    url: '/api/artist/detail',
    params: { id },
  })
  return data
}

/***
 * 歌手全部歌曲
 */
export const useArtistSongs = async (
  id: number,
  order = 'time',
  limit = 10,
  offset = 0,
) => {
  const { songs, total } = await http.get<{ songs: Song[]; total?: number }>({
    url: '/api/artist/songs',
    params: {
      id,
      order,
      limit,
      offset,
    },
  })
  return { songs, total }
}

/**
 * 获取歌手 mv
 */
export const useArtistMv = async (id: number, limit = 10, offset = 0) => {
  return await http.get<{ mvs: Mv[] }>({
    url: '/api/artist/mv',
    params: { id, limit, offset },
  })
}

/** 获取歌手专辑 */
export const useArtistAlbum = async (id: number, limit = 10, offset = 0) => {
  return await http.get<{ hotAlbums: Album[] }>({
    url: '/api/artist/album',
    params: { id, limit, offset },
  })
}

/** 获取歌手描述 */
export async function useArtistDesc (id: number) {
  return await http.get<ArtistDesc>({
    url: '/api/artist/desc',
    params: { id },
  })
}

/** 获取歌手热门 50 首歌曲 */
export async function useArtistTopSong (id: number) {
  const { songs } = await http.get<{ songs: Song[] }>({
    url: '/api//artist/top/song',
    params: { id },
  })
  return songs
}
