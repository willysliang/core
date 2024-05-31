<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-02 17:14:58
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-03 11:50:27
 * @ Description: 充电组件 & 仿制小米充电样式
 -->

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Battery } from '@/hooks/useBattery'

export default /* #__PURE__ */ defineComponent({
  name: 'ChargeXiaomi',
  props: {
    /** 电池对象 */
    battery: {
      type: Object as PropType<Battery>,
      default: () => ({}),
    },
  },
})
</script>

<template>
  <div class="charge-xiaomi">
    <!-- 外环三个线圈 -->
    <div class="outer">
      <div
        v-for="index in 3"
        :key="index"
        class="circle"
        :style="{ transform: `scale(${1.01 - 0.04 * (index - 1)})` }"
      ></div>
    </div>

    <!-- 内心 -->
    <div class="outer" style="transform: scale(0.68); z-index: 2">
      <div class="circle circle-blur" style="padding: 30px"></div>
    </div>

    <!-- 内心旋转 -->
    <div
      v-for="index in 4"
      :key="index"
      class="outer"
      style="transform: scale(0.68); z-index: 2"
    >
      <div
        class="circle-white"
        :style="{
          transform: `scale(${1 - 0.02 * (index - 1)})`,
          animationDuration: `${500 - 20 * (index - 1)}ms`,
        }"
      ></div>
    </div>

    <!-- 电量 -->
    <div class="outer">
      <div class="power">
        {{ battery.level.toFixed(0) || '100' }}<span class="text-3xl">%</span>
      </div>
    </div>

    <!-- 下方能量线条 -->
    <div class="line-box">
      <div class="line-left"></div>

      <!-- 中间的能量线条 & 动画 -->
      <div class="line-center line-center-left-2"></div>
      <div class="line-center line-center-left-1"></div>
      <div class="line-center"></div>
      <div class="line-center line-center-right-1"></div>
      <div class="line-center line-center-right-2"></div>

      <div class="line-left line-right"></div>
    </div>

    <div class="light"></div>
  </div>
</template>

<style lang="scss">
.charge-xiaomi {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 80vh;
	height: 80vh;
	display: flex;
	justify-content: center;

	/* 圆圈旋转动画 */
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* 能量线条动画 */
	@keyframes up {
		0% {
			transform: translateY(80px);
		}

		100% {
			transform: translateY(-400px);
		}
	}

	@keyframes light {
		0% {
			opacity: 0.3;
			transform: scale(0.3);
		}

		40% {
			opacity: 0.6;
			transform: scale(1);
		}

		100% {
			opacity: 0;
			transform: scale(0.3);
		}
	}

	// 外环
	.outer {
		position: absolute;
		bottom: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 圆圈
	.circle {
		position: absolute;
		width: 286px;
		height: 286px;
		box-sizing: border-box;
		padding: 3px;
		background: linear-gradient(#c71ff1, #2554ea);
		border-radius: 50%;

		&::after {
			display: block;
			width: 100%;
			height: 100%;
			background: #000;
			border-radius: 50%;
			content: ' ';
		}
	}

	.circle-blur {
		filter: blur(5px);
		animation: rotate 5s linear infinite;
	}

	.circle-white {
		position: absolute;
		width: 220px;
		height: 220px;
		border-top: solid 1px rgb(255 255 255 / 6%);
		border-bottom: solid 1px rgb(255 255 255 / 8%);
		border-radius: 50%;
		animation: rotate 500ms linear infinite;
	}

	/* 电量 */
	.power {
		position: absolute;
		z-index: 2;
		width: 200px;
		height: 80px;
		font-size: 70px;
		line-height: 80px;
		color: turquoise;
		text-align: center;
	}

	/* 进入时亮灯 */
	.light {
		position: absolute;
		bottom: -150px;
		width: 300px;
		height: 350px;
		background: radial-gradient(#2554ea, transparent 60%);
		border-radius: 50%;
		animation: light 1.2s linear 1 forwards;
	}

	/* 能量线条 */
	.line-box {
		position: absolute;
		bottom: 0;
		width: 80px;
		height: 400px;
		overflow: hidden;
		background: #000;
		z-index: 1;

		/* 左边的能量线条 & 上方三个线条 */
		.line-left {
			position: absolute;
			bottom: 0;
			left: -20px;
			width: 30px;
			height: 271px;
			border-top: solid 2px #2554ea;
			border-right: solid 2px #2554ea;
			border-top-right-radius: 30px;
			box-sizing: border-box;

			&::before {
				position: absolute;
				top: -8px;
				left: 0;
				width: 30px;
				height: 100%;
				border-top: solid 2px #2554ea;
				border-right: solid 2px #2554ea;
				border-top-right-radius: 50px;
				content: '';
				transform: scaleY(0.96);
				box-sizing: border-box;
				transform-origin: center top;
			}

			&::after {
				position: absolute;
				top: -14px;
				left: 0;
				width: 30px;
				height: 100%;
				border-top: solid 2px #2554ea;
				border-right: solid 2px #2554ea;
				border-top-right-radius: 60px;
				content: '';
				transform: scaleY(0.92);
				box-sizing: border-box;
				transform-origin: center top;
			}
		}

		/* 右边的能量线条（克隆左边的能量线条，通过翻转 & 移动获取） */
		.line-right {
			transform: scaleX(-1); // 水平方向上翻转
			transform-origin: 60px;
		}

		/* 中间的能量线条 */
		.line-center {
			position: absolute;
			top: 0;
			left: 39px;
			width: 2px;
			height: 100%;
			background: #231779;

			&::before {
				position: absolute;
				bottom: 10px;
				width: 2px;
				height: 80px;
				background: linear-gradient(#79ccea, transparent);
				border-top-right-radius: 2px;
				border-top-left-radius: 2px;
				content: '';
				animation: up 700ms linear infinite;
			}
		}

		.line-center-left-1 {
			transform: translateX(-9px);

			&::before {
				animation-delay: -200ms;
			}
		}

		.line-center-left-2 {
			transform: translateX(-18px);

			&::before {
				animation-delay: -400ms;
			}
		}

		.line-center-right-1 {
			transform: translateX(9px);

			&::before {
				animation-delay: -300ms;
			}
		}

		.line-center-right-2 {
			transform: translateX(18px);

			&::before {
				animation-delay: -500ms;
			}
		}
	}
}
</style>
