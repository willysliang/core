/**
 * @ Author: willy
 * @ CreateTime: 2024-06-06 14:49:07
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-06 14:57:22
 * @ Description: 音乐播放器相关路由
 */

import { Pages } from '@mp/router/constant'

export const MPRoutes = [
  /***
   * 推荐模块
   */
  /** 推荐页 */
  {
    path: Pages.DISCOVER.path,
    name: Pages.DISCOVER.name,
    component: () => import('./discover/index.vue'),
    meta: {
      ...Pages.DISCOVER,
      keepAlive: true,
    },
  },
  /** 歌曲页 */
  {
    path: Pages.PLAYLIST.path,
    name: Pages.PLAYLIST.name,
    component: () => import('./playlist/index.vue'),
    meta: {
      ...Pages.PLAYLIST,
    },
  },
  /** 专辑详情页 */
  {
    path: Pages.ALBUM.path,
    name: Pages.ALBUM.name,
    component: () => import('./album/index.vue'),
    meta: {
      ...Pages.ALBUM,
    },
  },
  /** 歌手详情页 */
  {
    path: Pages.ARTIST.path,
    name: Pages.ARTIST.name,
    component: () => import('./artist/index.vue'),
    meta: {
      ...Pages.ARTIST,
    },
  },
  /** MV详情页 */
  {
    path: Pages.MV.path,
    name: Pages.MV.name,
    component: () => import('./mv/index.vue'),
    meta: {
      ...Pages.MV,
    },
  },

  /***
   * 音乐馆模块
   */
  {
    path: Pages.MUSIC.path,
    name: Pages.MUSIC.name,
    component: () => import('./musicHall/index.vue'),
    meta: {
      ...Pages.MUSIC,
      keepAlive: true,
    },
    redirect: { name: Pages.PICKED.name },
    children: [
      /** 精选 */
      {
        path: Pages.PICKED.path,
        name: Pages.PICKED.name,
        component: () => import('./musicHall/picked/index.vue'),
        meta: {
          ...Pages.PICKED,
        },
      },
      /** 排行榜 */
      {
        path: Pages.TOPLIST.path,
        name: Pages.TOPLIST.name,
        component: () => import('./musicHall/toplist/index.vue'),
        meta: {
          ...Pages.TOPLIST,
        },
      },
      /** 分类歌单 */
      {
        path: Pages.CATEGORY_SONGLIST.path,
        name: Pages.CATEGORY_SONGLIST.name,
        component: () => import('./musicHall/categoryList/index.vue'),
        meta: {
          ...Pages.CATEGORY_SONGLIST,
        },
      },
    ],
  },

  /***
   * 视频模块
   */
  {
    path: Pages.VIDEO.path,
    name: Pages.VIDEO.name,
    component: () => import('./video/index.vue'),
    meta: {
      ...Pages.VIDEO,
      keepAlive: true,
    },
  },

  /***
   * 电台模块
   */
  {
    path: Pages.DJ.path,
    name: Pages.DJ.name,
    component: () => import('./dj/index.vue'),
    meta: {
      ...Pages.DJ,
      keepAlive: true,
    },
  },

  /***
   * 个人相关模块
   */
  /** 我喜欢 */
  {
    path: Pages.ONESELF_LOVE_MUSIC.path,
    name: Pages.ONESELF_LOVE_MUSIC.name,
    component: () => import('./oneselfMusic/oneselfLoveMusic/index.vue'),
    meta: {
      ...Pages.ONESELF_LOVE_MUSIC,
    },
  },
  /** 本地歌曲 */
  {
    path: Pages.LOCAL_MUSIC.path,
    name: Pages.LOCAL_MUSIC.name,
    component: () => import('./oneselfMusic/localMusic/index.vue'),
    meta: {
      ...Pages.LOCAL_MUSIC,
    },
  },
  /** 下载歌曲 */
  {
    path: Pages.DOWNLOAD_MUSIC.path,
    name: Pages.DOWNLOAD_MUSIC.name,
    component: () => import('./oneselfMusic/downloadMusic/index.vue'),
    meta: {
      ...Pages.DOWNLOAD_MUSIC,
    },
  },
  /** 最近播放 */
  {
    path: Pages.RECENTLY_MUSIC.path,
    name: Pages.RECENTLY_MUSIC.name,
    component: () => import('./oneselfMusic/recentlyMusic/index.vue'),
    meta: {
      ...Pages.RECENTLY_MUSIC,
    },
  },
]
