<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 18:06:45
 * @ Description: 推荐页
 -->

<script lang="ts" setup>
import Banner from './Banner.vue'
import PersonalizedSongList from './PersonalizedSongList.vue'
import PersonalizedNewSong from './PersonalizedNewSong.vue'
import PersonalizedMv from './PersonalizedMv.vue'
</script>

<template>
  <div class="text-3xl py-4 font-bold">推荐</div>

  <!-- 轮播图 -->
  <Banner />

  <!-- 个性化歌单 -->
  <PersonalizedSongList />

  <!-- 推荐新音乐 -->
  <PersonalizedNewSong />

  <!-- 推荐MV -->
  <PersonalizedMv />
</template>
