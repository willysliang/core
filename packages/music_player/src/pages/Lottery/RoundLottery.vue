<!--
 * @ Author: willysliang
 * @ Create Time: 2022-12-11 15:05:43
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-14 09:23:48
 * @ Description: 转盘抽奖
 -->

<script setup lang="ts">
import { ref } from 'vue'

const pricelist = ref([
  '谢谢参与',
  '50积分',
  '谢谢参与',
  '100元话费',
  '50积分',
  '谢谢参与',
  '100元话费',
  '谢谢参与',
  '50积分',
  '10元话费',
])
console.log(pricelist.value)
</script>

<template>
  <div class="warning">
    <div class="sector"></div>
    <div class="sector"></div>
    <div class="sector"></div>
  </div>

  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <template #header>
          <span class="text-base">转盘抽奖</span>
        </template>

        <div class="wrapper">
          <div v-for="(item, i) in 10" :key="i" class="light"></div>

          <div class="panel">
            <div v-for="(price, i) in pricelist" :key="i" class="sector">
              <span>{{ price }}</span>
            </div>

            <div class="pointer">开始抽奖</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss">
.wrapper {
	@apply relative w-96 h-96 box-border p-2 m-2 bg-red-500 rounded-full shadow;

	.light {
		@apply absolute w-3 h-3 rounded-full bg-orange-200;
		top: 0.4rem;
		left: 50%;
		transform-origin: 0 11.5rem;

		&:nth-child(2n) {
			background-color: #fafce7;
		}

		&:nth-child(2n + 1) {
			background-color: #ffe58b;
		}

		@for $i from 2 through 10 {
			&:nth-child(#{$i}) {
				$deg: ($i - 1) * 36 + deg;
				transform: rotate($deg);
			}
		}
	}

	.sector {
		width: 21rem;
		height: 21rem;
		position: absolute;
		clip: rect(0 21rem 21rem 10.5rem); /* 上右下左 顺时针顺序 */
		// background: #fef6e0;
		overflow: hidden;
		border: 10.5rem solid rgb(0 0 0 / 0%);
		border-radius: 50%;

		@for $i from 1 through 10 {
			&:nth-child(#{$i}) {
				$deg: ($i - 1) * 30 + deg;
				transform: rotate($deg);
			}
		}

		&:nth-child(2n) {
			// background-color: #fafce7;
			border-right-color: #fafce7;
		}

		&:nth-child(2n + 1) {
			// background-color: #ffe58b;
			border-right-color: #ffe58b;
		}

		// &::after {
		// 	content: '';
		// 	width: 100%;
		// 	height: 100%;
		// 	position: absolute;
		// 	border-radius: 50%;
		// 	background: #fff;
		// 	clip: rect(0 10.5rem 10.5rem 0);
		// 	transform: rotate(60deg);
		// }
	}
}

.panel {
	@apply relative rounded-full bg-gray-200;
	@apply transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
	width: 21rem;
	height: 21rem;

	// overflow: hidden;
}

.pointer {
	@apply w-16 h-16 rounded-full box-border p-3;
	@apply text-orange-200 text-lg font-bold leading-5 bg-red-500;
	@apply border border-solid border-red-600;
	@apply flex flex-col flex-wrap items-center justify-center;
	@apply absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;

	&::after {
		content: '';
		position: absolute;
		left: 1.4rem;
		top: -1.9rem;
		border-width: 1rem 0.5rem;
		border-style: solid;
		border-color: transparent;
		border-bottom-color: #c0381f;
	}
}
</style>
