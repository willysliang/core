<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-09 15:26:12
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-09 15:31:13
 * @ Description: 图片滚动底部懒加载
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  systemNotfound,
  avactor,
  code,
  demoLotteryItem1,
  demoLotteryItem2,
  demoLotteryStart,
  opticalDisk,
  demoJpg,
} from '@/assets/images'

const imgRef = ref([])

const imgUrl = ref([
  'https://img2.baidu.com/it/u=617579813,2960860841&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  'https://img2.baidu.com/it/u=1003272215,1878948666&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  'https://img1.baidu.com/it/u=2995157981,91041597&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750',
  'https://img2.baidu.com/it/u=1395980100,2999837177&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=675',
  'https://img0.baidu.com/it/u=925843206,3288141497&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=769',
  'https://img1.baidu.com/it/u=1300668939,1504410366&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=858',
  'https://img0.baidu.com/it/u=4008146120,512111027&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  'https://img1.baidu.com/it/u=3622442929,3246643478&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
  'http://t13.baidu.com/it/u=230088816,2918366315&fm=224&app=112&f=JPEG?w=250&h=500',
  'https://img2.baidu.com/it/u=3038223445,2416689412&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
  avactor,
  code,
  demoLotteryItem1,
  demoLotteryItem2,
  demoLotteryStart,
  opticalDisk,
  demoJpg,
])

onMounted(() => {
  const options = {
    root: null,
    // 这里是一个数组可以指定多个比例类似[0.25, 0.5, 0.75, 1]
    threshold: [0], // 交会处
    rootMargin: '0px', // 对视口进行收缩和扩张
  }
  const lazyIntersection = new IntersectionObserver((entires) => {
    // entires为监听的节点数组对象
    entires.forEach((item: any) => {
      // isIntersecting是当前监听元素交叉区域是否在可视区域指定的阈值内返回的是一个布尔值
      if (item.isIntersecting) {
        item.target.src = item.target?.getAttribute('data-src')
        // 这里资源加载后就停止进行观察
        lazyIntersection.unobserve(item.target)
      }
    })
  }, options)

  /** observe用来观察指定的DOM节点 */
  imgRef.value.forEach((item) => {
    lazyIntersection.observe(item)
  })
})
</script>

<template>
  <img
    v-for="(item, index) in imgUrl"
    :key="index"
    ref="imgRef"
    :src="systemNotfound"
    :data-src="imgUrl[index]"
    class="h-96"
  />
</template>
