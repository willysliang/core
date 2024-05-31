<!--
 * @ Author: willysliang
 * @ Create Time: 2023-02-22 13:52:15
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-22 16:40:13
 * @ Description: VirtualList Item固定高度的虚拟列表
 -->

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    listdata: any[]
    itemSize: number
  }>(),
  {
    listdata: () => [],
    itemSize: 200,
  },
)

interface IState {
  /** 可视区域高度 */
  screenHeight: number
  /** 偏移量 */
  startOffset: number
  /** 起始索引 */
  start: number
  /** 结束索引 */
  end: null | number
}
const state = reactive<IState>({
  screenHeight: 0,
  startOffset: 0,
  start: 0,
  end: null,
})

/** 列表总高度 */
const listHeight = computed(() => props.listdata.length * props.itemSize)
/** 可显示的列表项数 */
const visibleCount = computed(() =>
  Math.ceil(state.screenHeight / props.itemSize),
)
/** 偏移量对应的 style */
const getTransform = computed(() => `translate3d(0, ${state.startOffset}px, 0)`)
/** 获取真实显示列表数据 */
const visibleData = computed(() =>
  props.listdata.slice(
    state.start,
    Math.min(state.end as number, props.listdata.length),
  ),
)

const listRef = ref<HTMLDivElement>()
onMounted(() => {
  state.screenHeight = listRef.value?.clientHeight || 0
  state.start = 0
  state.end = state.start + visibleCount.value
})

const scrollEvent = () => {
  // 当前滚动位置
  const scrollTop = listRef.value?.scrollTop || 0
  // 此时的开始索引
  state.start = Math.floor(scrollTop / props.itemSize)
  // 此时的结束索引
  state.end = state.start + visibleCount.value
  // 此时的偏移量
  state.startOffset = scrollTop - (scrollTop % props.itemSize)
}
</script>

<template>
  <div ref="listRef" class="infinite-list-container" @scroll="scrollEvent">
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        v-for="item in visibleData"
        ref="items"
        :key="item.id"
        class="infinite-list-item"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.infinite-list-container {
	/* min-height: 30rem; */
	width: 100%;
	height: 100%;
	overflow: auto;
	position: relative;
	-webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	z-index: -1;
}

.infinite-list {
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
	text-align: center;
}

.infinite-list-item {
	padding: 1rem;
	color: #555;
	box-sizing: border-box;
	border-bottom: 1px solid #999;
}
</style>
