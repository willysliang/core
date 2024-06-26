<!--
 * @ Author: willysliang
 * @ Create Time: 2023-03-21 23:34:12
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 15:26:59
 * @ Description: 虚拟列表
 -->

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, ref, onUnmounted, watch } from 'vue'
import { V_PROP_NAME, VirtualList } from './virtual-list.util'

type RenderList = Array<Record<string, any>>

interface IProps {
  /* 需要渲染的数据列表 */
  list: RenderList
}
const props = withDefaults(defineProps<IProps>(), {})

const V_LIST_ITEM_CLASS = 'virtual-list-item'

const listArea = ref<HTMLElement | null>(null)
let virtualList: VirtualList | null = null

const cacheList = ref<RenderList>(props.list)
watch(
  () => [...props.list],
  (newList) => {
    cacheList.value = newList
  },
)

const processToBeUpdatedItemQueue = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const toBeUpdateItemMap = virtualList!.getToBeUpdateItemMap()
  const mapKeys = Object.keys(toBeUpdateItemMap)
  if (!mapKeys.length) {
    return
  }
  const list = cacheList.value
  mapKeys.forEach((index) => {
    if (!cacheList.value[Number(index)]) {
      return
    }
    list[Number(index)][V_PROP_NAME] = toBeUpdateItemMap[index]
  })
}

onMounted(() => {
  virtualList = new VirtualList({
    listArea: listArea.value as unknown as HTMLElement,
    listItemSelector: `.${V_LIST_ITEM_CLASS}`,
    rootMargin: '0px',
    threshold: 0,
    cb: () => {
      processToBeUpdatedItemQueue()
    },
  })
})
onUnmounted(() => {
  virtualList?.disconnect()
})
</script>

<template>
  <div ref="listArea" class="virtual-list">
    <template v-for="(item, index) in cacheList" :key="index">
      <div
        :class="V_LIST_ITEM_CLASS"
        :style="{
          minHeight: `${
            item.$v?.state || !item.$v?.height ? '0.1px' : item.$v?.height
          }`,
        }"
        :data-virtual-list-item-index="index"
      >
        <template v-if="item.$v?.state !== 0 || !item.$v?.height">
          <!--真实元素-->
          <slot :name="`item${index}`"></slot>
        </template>
        <template v-else>
          <!--骨架-->
          <slot name="skeleton"></slot>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
$namespace: virtual-list;

.#{$namespace} {
  width: 100%;
  height: 100%;
  overflow: auto;
  .#{$namespace}-item {
    position: relative;
  }
}
</style>
