<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-07 10:58:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-08 11:47:37
 * @ Description: 九宫格抽奖
 -->

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  demoLotteryItem1,
  demoLotteryItem2,
  demoLotteryStart,
} from '@/assets/images'
import { useEventListener } from '@/hooks/event/useEventListener'

const lotterylist = reactive([
  { id: 1, pic: demoLotteryItem1, title: '谢谢参与' },
  { id: 2, pic: demoLotteryItem2, title: '美女一个' },
  { id: 3, pic: demoLotteryItem1, title: '宝马一辆' },
  { id: 4, pic: demoLotteryItem2, title: '单车一辆' },
  { id: 5, pic: demoLotteryItem1, title: '鸡蛋一蓝' },
  { id: 6, pic: demoLotteryItem2, title: '500红包' },
  { id: 7, pic: demoLotteryItem1, title: '靓号一个' },
  { id: 8, pic: demoLotteryItem2, title: '鲜花一蓝' },
])

/** 添加中心的开始抽奖按钮 */
const startBtn = {
  id: 0,
  title: '开始按钮',
  pic: demoLotteryStart,
}

interface IPrize {
  /** 当前转到到的位置 & 起点位置 */
  currentIndex: number
  /** 总共有多少个位置 */
  count: number
  /** 每次转动轮盘的定时器 */
  // eslint-disable-next-line no-undef
  timer: NodeJS.Timeout | null
  /** 初始转动速度 */
  speed: number
  /** 已跑次数 */
  currentRunCount: number
  /** 转动基本次数：即至少需要转动多少次再进入抽奖环节 */
  totalRunCount: number
  /** 中奖位置 */
  prizeIndex: number
  /** 是否触发转动 */
  unClick: boolean
  /** 是否显示中奖弹窗 */
  isShowToast: boolean
}
const prizeState = reactive<IPrize>({
  currentIndex: -1,
  count: 8,
  timer: null,
  speed: 200,
  currentRunCount: 0,
  totalRunCount: 50,
  prizeIndex: -1,
  unClick: true,
  isShowToast: false,
})

/** 每次转动 */
const onRoll = () => {
  prizeState.currentIndex += 1
  if (prizeState.currentIndex > prizeState.count - 1) {
    prizeState.currentIndex = 0
  }
}

/** 开始转动 */
const startRoll = () => {
  prizeState.currentRunCount += 1
  onRoll()

  /** 如果当前转动次数达到要求 && 目前转到的位置是中奖位置 */
  if (
    prizeState.currentRunCount > prizeState.totalRunCount + 10 &&
    prizeState.prizeIndex === prizeState.currentIndex
  ) {
    prizeState.timer && clearTimeout(prizeState.timer)
    const params = {
      speed: 200,
      currentRunCount: 0,
      totalRunCount: 50,
      isClick: true,
    }
    Object.assign(prizeState, params)
    setTimeout(() => {
      prizeState.isShowToast = true
    }, 500)
  } else {
    if (prizeState.currentRunCount < prizeState.totalRunCount) {
      /** 如果还没到达基本转动次数，则会加快转动速度 */
      prizeState.speed -= 10
    } else if (prizeState.currentRunCount === prizeState.totalRunCount) {
      /** 随机获得一个中奖位置 */
      prizeState.prizeIndex = Math.floor(
        Math.random() * (prizeState.count - 1) || 0,
      )
      if (prizeState.prizeIndex > 7) prizeState.prizeIndex = 7
    } else if (
      prizeState.currentRunCount > prizeState.totalRunCount + 10 &&
      ((prizeState.prizeIndex === 0 && prizeState.currentIndex === 7) ||
        prizeState.prizeIndex === prizeState.currentIndex + 1)
    ) {
      prizeState.speed += 100
    } else {
      prizeState.speed += 20
    }

    /** 防止速度切换过慢 */
    if (prizeState.speed < 40) {
      prizeState.speed = 40
    }

    /** 因为还没打到抽奖的转动次数，需要继续转动一圈 */
    prizeState.timer = setTimeout(startRoll, prizeState.speed)
  }
}

/** 开始抽奖 */
const startLottery = () => {
  if (prizeState.unClick) startRoll()
}

/** 根据屏幕抽奖div的宽度来计算水平方向的点点 */
const lotteryRef = ref()
const dotLen = ref<number>(20)
const dotArr = computed(() => new Array(dotLen.value).fill(''))
const getLotteryWidth = () => {
  dotLen.value = Math.floor(
    Number.parseInt(lotteryRef.value?.offsetWidth || 500) / 32,
  )
}
/** 监听抽奖div的宽度 */
useEventListener({
  el: window,
  name: 'resize',
  listener: () => {
    getLotteryWidth()
  },
  isDebounce: true,
  wait: 50,
  autoRemove: true,
})

/** 关闭弹层 */
const hiddenToast = () => {
  prizeState.isShowToast = false
  prizeState.prizeIndex = -1
}
</script>

<template>
  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">九宫格抽奖 Lottery</span>
        </template>

        <!-- 抽奖容器 -->
        <div class="cell-lottery-container">
          <!-- 四边点点 -->
          <div class="dots-container dots-left">
            <div v-for="(item, index) in 13" :key="index" class="dot"></div>
          </div>
          <div class="dots-container dots-right">
            <div v-for="(item, index) in 13" :key="index" class="dot"></div>
          </div>
          <div class="dots-container dots-top">
            <div v-for="(item, index) in dotArr" :key="index" class="dot"></div>
          </div>
          <div class="dots-container dots-bottom">
            <div v-for="(item, index) in dotArr" :key="index" class="dot"></div>
          </div>

          <!-- 抽奖主体 -->
          <div ref="lotteryRef" class="cell-lottery">
            <div
              class="cell-lottery-item w-full h-32 relative cursor-pointer border border-solid border-gray-500"
              @click="startLottery"
            >
              <img
                :src="startBtn.pic"
                alt="抽奖图"
                class="h-5/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <span
                v-if="false"
                class="absolute left-1/2 transform -translate-x-1/2 bottom-1"
              >
                {{ startBtn.title }}
              </span>
            </div>
            <div
              v-for="(lotteryItem, index) in lotterylist.slice(0, 8)"
              :key="index"
              class="cell-lottery-item w-full h-32 relative cursor-pointer border border-solid border-gray-500"
              :class="{
                'cell-lottery-item-active': index === prizeState.currentIndex,
              }"
            >
              <img
                :src="lotteryItem.pic"
                alt="抽奖图"
                class="h-5/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
              <span
                class="absolute left-1/2 transform -translate-x-1/2 bottom-1"
              >
                {{ lotteryItem.title }}
              </span>
            </div>
          </div>

          <!-- 中奖弹窗 -->
          <!-- <div
            v-if="prizeState.isShowToast"
            class="w-full h-full absolute z-10 inset-0 bg-opacity-25 bg-gray-300"
          ></div> -->
          <div
            v-if="prizeState.isShowToast"
            class="w-full h-full absolute z-20 inset-0 bg-opacity-50 bg-blue-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-white"
          >
            <div class="text-3xl font-black">恭喜您</div>
            <img :src="lotterylist[prizeState.prizeIndex].pic" alt="" />
            <div class="text-xl font-bold">
              获得{{ lotterylist[prizeState.prizeIndex].title }}
            </div>
            <div
              class="toast-btn text-lg font-bold box-border py-1 w-1/3 text-center cursor-pointer rounded mt-7"
              @click="hiddenToast"
            >
              确定
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
/* 主容器 */
.cell-lottery-container {
	@apply box-border p-6 relative overflow-hidden;
	border-radius: 1rem;
	background-color: #9ad3ff;
	box-shadow: 0.28rem 0.6rem 0.1rem #9ad3ff91;
}

@keyframes twinkleOdd {
	0% {
		background-color: #fff;
	}

	50% {
		background-color: #e2f2d3;
	}

	100% {
		background-color: #fff;
	}
}

@keyframes twinkleEven {
	0% {
		background-color: #e2f2d3;
	}

	50% {
		background-color: #fff;
	}

	100% {
		background-color: #e2f2d3;
	}
}

.dots-container {
	@apply flex items-center justify-around;
	@apply absolute;

	.dot {
		@apply w-4 h-4 rounded-full;

		&:nth-child(odd) {
			animation: twinkleOdd 0.5s infinite linear;
		}

		&:nth-child(even) {
			animation: twinkleEven 0.5s infinite linear;
			animation-delay: 0.1s;
		}
	}
}

.dots-left {
	@apply flex-col left-0 top-0 bottom-0;
	@apply w-6 py-4;
}

.dots-right {
	@apply flex-col right-0 top-0 bottom-0;
	@apply w-6 py-4;
}

.dots-top {
	@apply flex-row left-0 right-0 top-0;
	@apply h-6 px-3;
}

.dots-bottom {
	@apply flex-row left-0 right-0 bottom-0;
	@apply h-6 px-3;
}

/* 抽奖主体 */
.cell-lottery {
	@apply w-full h-full;
	@apply box-border p-4;
	background-color: #61a2fc;
	border-radius: 1rem;
	display: grid;
	grid-auto-flow: row dense;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-row-gap: 1rem;
	grid-column-gap: 1rem;

	&-item-active {
		background-color: #ff3a59 !important;
		box-shadow: 0.28rem 0.6rem 0.1rem #ff3a577b !important;
	}

	&-item {
		border-radius: 1rem;
		background-color: #fff;
		box-shadow: 0.28rem 0.6rem 0.1rem #9ad3ff;
		border: none;
	}

	// 开始按钮居于网格中间
	&-item:first-child {
		grid-column-start: 2;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 2;
	}

	// 4 放在第二行第三列
	&-item:nth-child(5) {
		grid-column-start: 3;
		grid-column-end: 3;
		grid-row-end: 3;
	}

	// 5 放在第三行第三列
	&-item:nth-child(6) {
		grid-column-start: 3;
		grid-column-end: 3;
		grid-row-end: 4;
	}

	// 6 放在第三行第二列
	&-item:nth-child(7) {
		grid-column-start: 2;
		grid-column-end: 2;
		grid-row-end: 4;
	}

	// 7 放在第三行第一列
	&-item:nth-child(8) {
		grid-column-start: 1;
		grid-column-end: 1;
		grid-row-end: 4;
	}
}

.toast-btn {
	background: linear-gradient(
		180deg,
		rgb(213 60 63 / 100%) 0%,
		rgb(201 20 24 / 100%) 100%
	);
}
</style>
