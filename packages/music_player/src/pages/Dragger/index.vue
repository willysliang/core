<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-25 11:07:23
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-01 11:27:21
 * @ Description: 拖拽组件
 -->

<script setup lang="ts">
import { reactive, ref } from 'vue'
import draggable from 'vuedraggable'
import IconPark from '@comp/common/IconPark.vue'
import { Bug } from '@icon-park/vue-next'

const tasklist = ref([
  {
    title: '待处理',
    list: [
      {
        taskName: '任务一',
        avatar:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        level: '中',
        desc: '作为超级管理员和权限管理员，可以读取所有用户信息，测试用例，界面设计',
      },
      {
        taskName: '任务二',
        avatar:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        level: '中',
        desc: '作息，测试用例，界面设计',
      },
    ],
  },
  {
    title: '设计中',
    list: [
      {
        taskName: '任务三',
        avatar:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        level: '中',
        desc: '户信息，测试用例，界面设计',
      },
      {
        taskName: '任务四',
        avatar:
          'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        level: '中',
        desc: '任务四描述',
      },
    ],
  },
])

const group = reactive({
  name: 'task',
  put: true,
  pull: true,
})
</script>

<template>
  <div class="board w-full h-full bg-white flex flex-row">
    <!-- 任务列表 -->
    <div
      v-for="(task, index) in tasklist"
      :key="index"
      class="task w-44 h-full mr-2 bg-gray-200 box-border py-2 flex flex-col"
    >
      <div class="mx-2 mb-4">
        <span class="font-bold">{{ task.title }}</span>
        <span class="font-bold ml-1">({{ task.list?.length }})</span>
      </div>

      <!-- 子任务列表 -->
      <div class="flex-1">
        <!-- 解决子任务为空时，其他列无法移入该列 -->
        <div class="task-item"></div>
        <draggable
          :list="task.list"
          :item-key="(key) => key"
          handle=".task-item"
          filter=".forbid"
          :force-fallback="true"
          animation="300"
          :group="group"
          :fallback-class="true"
          :fallback-on-body="true"
          :touch-start-threshold="50"
          :fallback-tolerance="50"
          :sort="false"
        >
          <template #item="{ element }">
            <div
              class="task-item w-full h-28 my-2 box-border p-2 border border-solid border-gray-400 bg-white cursor-move"
            >
              <!-- 子任务头部信息 -->
              <div class="h-7 flex flex-row items-center justify-between">
                <div class="flex flex-row items-center">
                  <IconPark
                    :icon="Bug"
                    size="14"
                    :stroke-width="4"
                    class="cursor-pointer mr-1 box-border p-1 bg-green-500 text-white"
                  />
                  <span>{{ element.taskName }}</span>
                </div>
                <img
                  :src="element.avatar"
                  alt="头像"
                  class="h-full rounded-full"
                />
              </div>

              <!-- 子任务状态 -->
              <div class="my-2">
                <span class="bg-yellow-500 text-white box-border p-1">
                  {{ task.title }}
                </span>
                <span class="bg-blue-100 text-blue-500 mx-2 box-border p-1">
                  {{ element.level }}
                </span>
              </div>

              <!-- 子任务描述 -->
              <div class="task-desc leading-4 mt-3">
                {{ element.desc }}
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.board {
	background-color: #fff;

	.task {
		min-height: 35rem;

		.task-desc {
			overflow: hidden; // 超出的隐藏显示
			text-overflow: ellipsis; // 省略号显示溢出部分
			display: flex;
			line-clamp: 2;
			-webkit-line-clamp: 2; // 限制在一个块元素显示的文本行数
			-webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列顺序
			word-wrap: break-word;
			line-height: 1rem;
			height: 2rem;
		}
	}
}
</style>
