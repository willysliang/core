/**
 * @ Author: willysliang
 * @ CreateTime: 2022-10-08 18:41:13
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 18:00:12
 * @ Description:推荐页存储的数据
 */

import { useBanner, usePersonalizedSongList } from '@/api/module/discover'
import { Banner, PersonalizedSongList } from '@/types/discover'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDiscoverStore = defineStore('discover', () => {
  /***
   * 轮播图
   */
  const banners = ref<Banner[]>([]) // 轮播图数据
  const getBanners = async () => {
    if (banners.value.length > 0) return undefined
    try {
      banners.value = await useBanner()
    } catch {}
  }

  /***
   * 推荐歌单
   */
  const personalizedSongList = ref<PersonalizedSongList[]>([]) // 推荐歌单数据
  const getPersonalizedSongList = async () => {
    if (personalizedSongList.value.length > 0) return undefined
    try {
      personalizedSongList.value = await usePersonalizedSongList()
    } catch {}
  }

  return {
    /* 轮播图 */
    banners,
    getBanners,

    /* 推荐歌单 */
    personalizedSongList,
    getPersonalizedSongList,
  }
})
