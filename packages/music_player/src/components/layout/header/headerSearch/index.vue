<!--
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 09:05:41
 * @ Modified by: willysliang
 * @ Modified time: 2023-04-10 15:15:51
 * @ Description: 头部搜索组件
 -->

<template>
  <div ref="searchRef" class="search flex-1 box-border mx-12">
    <el-popover
      v-model:visible="showSearchView"
      placement="bottom"
      popper-style="max-width:auto;padding:0;"
      :width="popoverWidth"
    >
      <template #reference>
        <el-input
          v-model="searchKeyword"
          placeholder="搜索音乐、MV、歌单"
          :prefix-icon="Search"
          maxlength="30"
          clearable
          @input="handleSearch"
          @focus="showSearchView = true"
          @focusout="showSearchView = false"
        />
      </template>
      <div class="h-96">
        <el-scrollbar>
          <!-- 热门搜索 -->
          <div v-if="!searchKeyword" class="pl-2 pr-3.5">
            <div class="py-2">热门搜索</div>
            <div
              v-for="(item, index) in searchHot"
              :key="index"
              class="flex justify-between items-center box-border py-2 cursor-pointer text-xs hover-text"
              @click="handleHot(item.searchWord)"
            >
              <div>
                <span>{{ index + 1 }}.</span>
                <span>{{ item.searchWord }}</span>
              </div>
              <div class="tool-main">{{ formatQuantity(item.score) }}</div>
            </div>
          </div>

          <!-- 关键词搜索 -->
          <SearchSuggestDOM
            v-else
            v-model:show-search-view="showSearchView"
            :suggest-data="suggestData"
          />
        </el-scrollbar>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import SearchSuggestDOM from './SearchSuggest.vue'
// import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'
// import { debounce, throttle } from 'lodash'
import { ref, onBeforeMount, onMounted } from 'vue'
import { debounce } from 'lodash'
import type {
  SearchHotDetail,
  SearchSuggest as typeSearchSuggest,
} from '@/types/search'
import { useSearchHotDetail, useSearchSuggest } from '@api/search'
import { formatQuantity } from '@/utils/format'
import { useEventListener } from '@/hooks/event/useEventListener'

/***
 * @description 计算 input 框的长度，来让下拉框响应式显示宽度
 * @getSearchWidth 动态监听屏幕的宽度变化，来响应式改变弹层大小
 * - 在挂载页面前，添加监听方法
 * - 在挂载页面后，获取 input 框的宽度进行赋值（因为 resize 只有在改变页面大小时才会触发，所以一般情况下是不会调用的，此时则需要赋初值）
 * - 在销毁页面前，移除所添加的监听方法
 */
const searchRef = ref<HTMLElement>()
const popoverWidth = ref<string | number>('250px')
const getSearchWidth = () => {
  // return throttle(
  //   () => {
  //     popoverWidth.value = searchRef.value?.offsetWidth || '250px'
  //   },
  //   500,
  //   { trailing: true },
  // )
  popoverWidth.value = searchRef.value?.offsetWidth || '250px'
}

// onBeforeMount(() => {
//   window.addEventListener('resize', getSearchWidth())
// })
onMounted(() => {
  useEventListener({
    el: window,
    name: 'resize',
    listener: () => {
      getSearchWidth()
    },
    isDebounce: true,
    wait: 200,
    autoRemove: true,
  })
  popoverWidth.value = searchRef.value?.offsetWidth || '250px'
})
// onUnmounted(() => {
//   window.removeEventListener('resize', getSearchWidth())
// })

/***
 * 搜索
 */
const searchKeyword = ref<string>('') // 搜索关键字
const showSearchView = ref<boolean>(false) // 控制展现搜索内容弹层的开关
const suggestData = ref<typeSearchSuggest>({} as typeSearchSuggest) // 请求的搜索数据
/* 请求搜索接口 */
const getSuggest = async () => {
  try {
    suggestData.value = await useSearchSuggest(searchKeyword.value)
  } catch {}
}
/***
 * 节流获取搜索内容
 * - 输入内容，使用节流进行获取搜索内容
 */
const handleSearch = debounce(getSuggest, 500, {
  maxWait: 1000,
})

/***
 * 热门搜索
 */
const searchHot = ref<SearchHotDetail[]>([])
onBeforeMount(async () => {
  try {
    searchHot.value = await useSearchHotDetail()
  } catch {}
})

/***
 * 热门搜索内容点击
 */
const handleHot = (text: string) => {
  searchKeyword.value = text
  getSuggest()
  showSearchView.value = true
}
</script>

<style lang="scss" scoped>
.search {
	:deep(.el-input__wrapper) {
		@apply rounded-full text-xs bg-slate-100;
	}
}
</style>
