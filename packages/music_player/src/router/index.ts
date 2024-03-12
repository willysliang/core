/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-18 11:38:30
 * @ Description: 路由配置
 */

import { demoPages } from '@/pages/constant'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { IPages, Pages } from './constant'
import { createRouterGuards } from './routerGuards'
import { demoRoutes } from './routes/demoRoutes'

// 如果不使用TS扩展 将会是unknow 类型
declare module 'vue-router' {
  interface RouteMeta extends IPages {
    title: string
    keepAlive?: boolean
    requireAuth?: boolean
  }
}

/** 路由 */
const routes: Array<RouteRecordRaw> = [
  {
    path: Pages.LOGIN.path,
    name: Pages.LOGIN.name,
    meta: {
      ...Pages.LOGIN,
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('../views/system/Login.vue'),
  },
  {
    path: '/',
    name: Pages.INDEX.name,
    meta: {
      ...Pages.INDEX,
      keepAlive: true,
      requireAuth: true,
    },
    redirect: { name: demoPages.TEST.name },
    component: () => import('../views/system/root.vue'),
    children: [
      /**
       * 404 页面
       */
      {
        path: Pages.NOT_FOUND.path,
        name: Pages.NOT_FOUND.name,
        component: () => import('../views/system/NotFound.vue'),
        meta: {
          ...Pages.NOT_FOUND,
          keepAlive: true,
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: Pages.NOT_FOUND.name,
        component: () => import('../views/system/NotFound.vue'),
        meta: {
          ...Pages.NOT_FOUND,
          keepAlive: true,
        },
      },

      /***
       * 推荐模块
       */
      /** 推荐页 */
      {
        path: Pages.DISCOVER.path,
        name: Pages.DISCOVER.name,
        component: () => import('../views/discover/index.vue'),
        meta: {
          ...Pages.DISCOVER,
          keepAlive: true,
        },
      },
      /** 歌曲页 */
      {
        path: Pages.PLAYLIST.path,
        name: Pages.PLAYLIST.name,
        component: () => import('../views/playlist/index.vue'),
        meta: {
          ...Pages.PLAYLIST,
        },
      },
      /** 专辑详情页 */
      {
        path: Pages.ALBUM.path,
        name: Pages.ALBUM.name,
        component: () => import('../views/album/index.vue'),
        meta: {
          ...Pages.ALBUM,
        },
      },
      /** 歌手详情页 */
      {
        path: Pages.ARTIST.path,
        name: Pages.ARTIST.name,
        component: () => import('../views/artist/index.vue'),
        meta: {
          ...Pages.ARTIST,
        },
      },
      /** MV详情页 */
      {
        path: Pages.MV.path,
        name: Pages.MV.name,
        component: () => import('../views/mv/index.vue'),
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
        component: () => import('../views/musicHall/index.vue'),
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
            component: () => import('../views/musicHall/picked/index.vue'),
            meta: {
              ...Pages.PICKED,
            },
          },
          /** 排行榜 */
          {
            path: Pages.TOPLIST.path,
            name: Pages.TOPLIST.name,
            component: () => import('../views/musicHall/toplist/index.vue'),
            meta: {
              ...Pages.TOPLIST,
            },
          },
          /** 分类歌单 */
          {
            path: Pages.CATEGORY_SONGLIST.path,
            name: Pages.CATEGORY_SONGLIST.name,
            component: () =>
              import('../views/musicHall/categoryList/index.vue'),
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
        component: () => import('../views/video/index.vue'),
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
        component: () => import('../views/dj/index.vue'),
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
        component: () =>
          import('../views/oneselfMusic/oneselfLoveMusic/index.vue'),
        meta: {
          ...Pages.ONESELF_LOVE_MUSIC,
        },
      },
      /** 本地歌曲 */
      {
        path: Pages.LOCAL_MUSIC.path,
        name: Pages.LOCAL_MUSIC.name,
        component: () => import('../views/oneselfMusic/localMusic/index.vue'),
        meta: {
          ...Pages.LOCAL_MUSIC,
        },
      },
      /** 下载歌曲 */
      {
        path: Pages.DOWNLOAD_MUSIC.path,
        name: Pages.DOWNLOAD_MUSIC.name,
        component: () =>
          import('../views/oneselfMusic/downloadMusic/index.vue'),
        meta: {
          ...Pages.DOWNLOAD_MUSIC,
        },
      },
      /** 最近播放 */
      {
        path: Pages.RECENTLY_MUSIC.path,
        name: Pages.RECENTLY_MUSIC.name,
        component: () =>
          import('../views/oneselfMusic/recentlyMusic/index.vue'),
        meta: {
          ...Pages.RECENTLY_MUSIC,
        },
      },

      /** demo 相关 */
      ...demoRoutes,
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH as string),
  scrollBehavior () {
    return {
      top: 0,
    }
  },
  routes,
})

createRouterGuards(router)

export default router
