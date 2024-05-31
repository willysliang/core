<!--
 * @ Author: willysliang
 * @ Create Time: 2023-02-22 16:08:26
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-09 19:20:31
 * @ Description: virtualList 虚拟列表
 -->

<script setup lang="ts">
import { ref } from 'vue'
import VirtualList1 from './VirtualList.vue'
import VirtualList from './virtual-list.vue'

const list1 = ref(
  new Array(268435)
    .fill({ name: 'willy', id: 0 })
    .map((item, i) => ({ name: `${item.name}${i}`, id: i })),
)

const list: any[] = Array.from({ length: 10000 })
  .fill({ text: '元素' })
  .map((item: any) => ({ ...item, height: 200 * (Math.random() * 0.5 + 0.5) }))
</script>

<template>
  <el-row class="mb-4">
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">Item固定高度的虚拟列表</span>
        </template>
        <div class="flex flex-col items-center justify-center h-80">
          <VirtualList1 :listdata="list1" :item-size="100" />
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="mb-4">
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">Item不定高度的虚拟列表</span>
        </template>
        <div class="fill">
          <div class="list-wrapper">
            <virtual-list :list="list">
              <template
                v-for="(item, index) in list"
                :key="index"
                #[`item${index}`]
              >
                <div
                  class="real-list-item"
                  :style="{ height: `${item.height}px` }"
                >
                  <span>{{ item.text }}{{ index }}</span>
                </div>
              </template>
              <template #skeleton>
                <div class="skeleton">骨架</div>
              </template>
            </virtual-list>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.list-wrapper {
	width: 100%;
	height: 500px;
}

.real-list-item {
	border: 1px solid #333;
	box-sizing: border-box;
	margin-top: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.skeleton {
	margin-top: 16px;
	background-color: #ccc;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
