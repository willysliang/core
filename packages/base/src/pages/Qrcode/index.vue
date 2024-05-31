<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-23 17:35:29
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 17:36:52
 * @ Description: 生成二维码
 -->

<script setup lang="ts">
import { Qrcode } from './index'
import { reactive, ref } from 'vue'

const userInfo = reactive({
  url: 'willysliang@qq.com',
  username: 'willysliang',
})

const img = ref('')
const getUrl = (val) => {
  img.value = val
}

const qrcode = ref()
const downPic = () => {
  qrcode.value.saveQrcode()
}

const qrcodes = ref([])
const qrcodeList = reactive([
  { id: 1, label: '山卡拉OK' },
  { id: 2, label: '伍六七' },
  { id: 3, label: '梅小姐' },
  { id: 4, label: '鸡大保' },
  { id: 5, label: '小飞鸡' },
])
const downloadAll = () => {
  qrcodes.value.forEach((item: any) => {
    item.saveQrcode()
  })
}
</script>

<template>
  <el-card>
    <el-input v-model="userInfo.url">
      <template #prepend>更新二维码图片</template>
      <template #append>
        <el-button @click="downPic">保存二维码图片</el-button>
      </template>
    </el-input>
    <Qrcode
      ref="qrcode"
      :qr-url="userInfo.url"
      :qr-text="userInfo.username"
      @get-url="getUrl"
    />
  </el-card>

  <el-card class="mt-2">
    <el-button @click="downloadAll">保存所有二维码图片</el-button>
    <div class="flex flex-row items-center flex-wrap">
      <Qrcode
        v-for="item in qrcodeList"
        ref="qrcodes"
        :key="item.id"
        :qr-url="item.label"
        :qr-text="item.label"
      />
    </div>
  </el-card>
</template>
