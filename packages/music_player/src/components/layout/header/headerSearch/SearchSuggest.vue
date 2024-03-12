<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-31 17:27:44
 * @ Description: 页面框头部搜索 -> 关键词搜索
 -->

<template>
  <template v-if="suggestData?.order?.length > 0">
    <div v-for="order in suggestData.order" :key="order">
      <div class="p-2 flex items-center">
        <el-icon>
          <Bicycle v-if="order === 'songs'" />
          <Avatar v-else-if="order === 'artists'" />
          <Monitor v-else-if="order === 'albums'" />
          <TakeawayBox v-else-if="order === 'playlists'" />
        </el-icon>
        <span class="ml-1">
          {{ getTitle(order) }}
        </span>
      </div>

      <!-- 单曲 -->
      <template v-if="suggestData?.songs?.length > 0 && order === 'songs'">
        <div
          v-for="item in suggestData.songs"
          :key="item.id"
          class="hover-bg-main hover-text search-item"
          @click="getPlay(item.id)"
        >
          <span>{{ item.name }}</span>
          <span> - </span>
          <span class="pl-1 tool-main">
            {{ first(item.artists)?.name }}
          </span>
        </div>
      </template>

      <!-- 专辑 -->
      <template v-if="suggestData?.albums?.length > 0 && order === 'albums'">
        <div
          v-for="item in suggestData.albums"
          :key="item.id"
          class="hover-bg-main hover-text search-item"
          @click="handleRouterPush(Pages.ALBUM, item.id)"
        >
          <span>{{ item.name }}</span>
          <span> - </span>
          <span class="pl-1 tool-main">
            {{ item.artist.name }}
          </span>
        </div>
      </template>

      <!-- 歌手 -->
      <template v-if="suggestData?.artists?.length > 0 && order === 'artists'">
        <div
          v-for="item in suggestData.artists"
          :key="item.id"
          class="hover-bg-main hover-text search-item"
          @click="handleRouterPush(Pages.ARTIST, item.id)"
        >
          <el-avatar size="small" :src="item.img1v1Url" />
          <span class="tool-main ml-2">
            {{ item.name }}
          </span>
        </div>
      </template>

      <!-- 歌单 -->
      <template
        v-if="suggestData?.playlists?.length > 0 && order === 'playlists'"
      >
        <div
          v-for="item in suggestData.playlists"
          :key="item.id"
          class="hover-bg-main hover-text search-item"
          @click="handleRouterPush(Pages.PLAYLIST, item.id)"
        >
          <el-avatar size="small" :src="item.coverImgUrl" />
          <div class="tool-main ml-2 truncate flex-1 w-1">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </template>
</template>

<script setup lang="ts">
import { first } from 'lodash'
import type { SearchSuggest } from '@/types/search'
import { usePlayerStore } from '@store/player'
import { useRouter } from 'vue-router'
import { Pages } from '@/router/constant'
import type { IPages } from '@/router/constant'

defineProps<{
  suggestData: SearchSuggest // 展现的搜索数据
  showSearchView: boolean // 控制展现搜索内容弹层的开关
}>()

/***
 * 根据标题类型赋值
 */
const getTitle = (name: string) => {
  switch (name) {
    case 'songs':
      return '单曲'
    case 'albums':
      return '专辑'
    case 'artists':
      return '歌手'
    case 'playlists':
      return '歌单'
    default:
      return name
  }
}

/***
 * 播放选中的音乐
 */
const { getPlay } = usePlayerStore()

/***
 * 路由跳转
 */
const router = useRouter()
const emits = defineEmits(['update:showSearchView'])
const handleRouterPush = (pageType: IPages, id: number) => {
  router
    .push({ name: pageType.name, query: { id, key: pageType.key } })
    .then(() => {
      emits('update:showSearchView', false)
    })
}
</script>

<style lang="scss" scoped>
.search-item {
	@apply py-1.5 pl-2.5 pr-3.5 text-xs cursor-pointer;
	@apply flex flex-row items-center justify-between;
}
</style>
