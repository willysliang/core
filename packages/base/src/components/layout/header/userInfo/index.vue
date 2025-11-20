<!--
 * @ Author: willysliang
 * @ CreateTime: 2022-11-11 10:01:13
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-05-26 18:02:37
 * @ Description: 登录页
 -->

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import LoginQrcode from './LoginQrcode.vue'
import LoginForm from './LoginForm.vue'
import { useUserStore } from '@/store/user'
import { avactor } from '@/assets/images'

const { isLogin, profile, showLogin } = storeToRefs(useUserStore())

/***
 * 控制弹层模块切换
 */
const LOGIN_TYPES = ['扫码登录', '账号登录']
const dialogCurrent = ref<number>(0)
</script>

<template>
  <div v-if="isLogin" class="text-sm flex flex-row items-center mx-2">
    <el-avatar
      :src="profile?.avatarUrl || avactor"
      class="mr-1 object-scale-down"
    />
    <span> {{ profile?.nickname ?? 'willysliang' }}</span>
  </div>
  <span
    v-else
    class="text-sm mx-2 cursor-pointer hover:text-red-600"
    @click="showLogin = true"
  >
    点击登录
  </span>

  <el-dialog
    v-model="showLogin"
    append-to-body
    center
    draggable
    align-center
    destroy-on-close
    width="500px"
  >
    <template #header="{ titleClass }">
      <div
        class="flex flex-row justify-around items-center"
        :class="titleClass"
      >
        <div
          v-for="(item, index) in LOGIN_TYPES"
          :key="index"
          :class="{
            'border-b-2 border-solid border-red-600': dialogCurrent === index,
            'px-4 py-2 text-lg': true,
          }"
          @click="dialogCurrent = index"
        >
          {{ item }}
        </div>
      </div>
    </template>

    <LoginQrcode v-show="dialogCurrent === 0" />
    <LoginForm v-show="dialogCurrent === 1" />
  </el-dialog>
</template>
