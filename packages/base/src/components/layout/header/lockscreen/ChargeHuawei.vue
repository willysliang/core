<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-03 11:38:44
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-08 18:00:53
 * @ Description: 充电组件 & 仿制华为充电样式
 -->

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Battery, BatterStatus } from '@/hooks/useBattery'
import { useBatteryHooks } from '@/hooks/useBattery'

export default /* #__PURE__ */ defineComponent({
  name: 'ChargeHuawei',
  props: {
    /** 电池对象 */
    battery: {
      type: Object as PropType<Battery>,
      default: () => ({}),
    },

    /** 电池状态 */
    batteryStatus: {
      type: String,
      default: '直连电源',
      validator: (val: BatterStatus) =>
        ['充电中', '已充满', '已断开电源', '直连电源'].includes(val),
    },
  },
  setup (props) {
    const { calcFormmatTime } = useBatteryHooks()

    const calcDischargingTime = computed(() =>
      calcFormmatTime(props.battery.dischargingTime),
    )
    const calcChargingTime = computed(() =>
      calcFormmatTime(props.battery.chargingTime),
    )

    return {
      calcDischargingTime,
      calcChargingTime,
    }
  },
})
</script>

<template>
  <div class="charge-huawei">
    <!-- 电量 -->
    <div class="power">
      {{ battery.level.toFixed(0) || '100' }}<span class="text-3xl">%</span>
    </div>

    <!-- 图像制作 -->
    <div class="contrast">
      <!-- 内圈 -->
      <div class="circle"></div>

      <!-- 泡泡 -->
      <div class="bubbles">
        <li v-for="index in 15" :key="index"></li>
      </div>
    </div>

    <!-- 设备电量信息 charging -->
    <div class="text-xl text-center">
      <div>{{ batteryStatus }}</div>
      <div v-show="calcDischargingTime != 0" class="mt-2">
        剩余可使用时间：{{ calcDischargingTime }}
      </div>
      <div v-show="calcChargingTime != 0" class="mt-2">
        距离电池充满需要：{{ calcChargingTime }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.charge-huawei {
	position: absolute;
	bottom: 20vh;
	left: 50vw;
	width: 300px;
	height: 400px;
	transform: translateX(-50%);

	@keyframes huerotate {
		100% {
			filter: contrast(15) hue-rotate(360deg);
		}
	}

	@keyframes trotate {
		50% {
			border-radius: 45% / 42% 38% 58% 49%;
		}

		100% {
			transform: translate(-50%, -50%) rotate(720deg);
		}
	}

	@keyframes movetotop {
		90% {
			opacity: 1;
		}

		100% {
			opacity: 0.1;
			transform: translate(-50%, -180px);
		}
	}

	/* 图像制作 */
	.contrast {
		width: 300px;
		height: 400px;
		overflow: hidden;
		background-color: #000;
		filter: contrast(15) hue-rotate(0);
		animation: huerotate 10s infinite linear;

		/* 圆圈 */
		.circle {
			position: relative;
			width: 300px;
			height: 300px;
			filter: blur(8px);
			box-sizing: border-box;

			/* 外圈 + 不规则变化 + 旋转 */
			&::after {
				position: absolute;
				top: 40%;
				left: 50%;
				width: 200px;
				height: 200px;
				background-color: #00ff6f;
				border-radius: 42% 38% 62% 49% / 45%;
				content: '';
				transform: translate(-50%, -50%) rotate(0);
				animation: trotate 10s infinite linear;
			}

			/* 内圈 + 旋转 */
			&::before {
				position: absolute;
				top: 40%;
				left: 50%;
				z-index: 10;
				width: 174px;
				height: 174px;
				background-color: #000;
				border-radius: 50%;
				content: '';
				transform: translate(-50%, -50%);
			}
		}

		/* 泡泡 */
		.bubbles {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 100px;
			height: 40px;
			background-color: #00ff6f;
			border-radius: 100px 100px 0 0;
			filter: blur(5px);
			transform: translate(-50%, 0);

			li {
				position: absolute;
				background: #00ff6f;
				border-radius: 50%;
			}
		}

		@for $i from 0 through 15 {
			li:nth-child(#{$i}) {
				/* stylelint-disable-next-line scss/no-global-function-names */
				$width: 15 + random(15) + px;
				top: 50%;
				/* stylelint-disable-next-line scss/no-global-function-names */
				left: 15 + random(70) + px;
				width: $width;
				height: $width;
				transform: translate(-50%, -50%);
				/* stylelint-disable-next-line scss/no-global-function-names */
				animation: movetotop (round((random(6) + 3)) + s)  ease-in-out (random(5) + s) infinite;

				// animation: movetotop (round((random(6) + 3)) + s)  ease-in-out (-(random(5000)/1000) + s) infinite;
			}
		}
	}

	/* 电量 */
	.power {
		position: absolute;
		top: 27%;
		z-index: 10;
		width: 300px;
		font-size: 32px;
		color: #fff;
		text-align: center;
	}
}
</style>
