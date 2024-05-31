<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-06 09:35:20
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-06 10:13:19
 * @ Description: HeartSwitch 心形开关
 -->
<script setup lang="ts"></script>

<template>
  <div class="HeartSwitch-pages">
    <!-- 复选框，有选中状态 -->
    <input type="checkbox" />
    <!-- 心形图标 -->
    <svg viewBox="0 0 33 23" fill="pink">
      <path
        d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss">
.HeartSwitch-pages {
	cursor: pointer;
	transition: transform 0.2s;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20rem;
	height: 14rem;

	/* 点击时，缩小一圈 */
	&:active {
		transform: scale(0.95);
	}

	input {
		appearance: none;
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0 1rem 2rem rgb(0 0 0 / 20%);
		cursor: pointer;
		position: absolute;
		top: .6rem;
		left: .6rem;
		animation: animate-off 0.3s linear forwards;

		/* 开关打开时，使用打开动画，然后停在打开的位置 */
		&:checked {
			animation: animate-on 0.3s linear forwards;
		}

		/* 开关打开时修改心形图标颜色 */
		&:checked+svg {
			fill: #e68;
			stroke: #e47;
		}
	}

	/* 中间心形图标的宽高，撑开整个开关区域 */
	svg {
		width: 20rem;
		height: 15rem;
		fill: #fff;
		stroke: #d6d6ee;
		stroke-linejoin: round;
		transition: all 0.4s;
	}

	/* 动画就是简单的位置变换 */
	@keyframes animate-on {
		0% {
			top: .7rem;
			left: .7rem;
		}

		25% {
			top: 5.5vmin;
			left: 5vmin;
		}

		/* 到正中间时圆大一小圈 */
		50% {
			top: 3rem;
			left: 5rem;
			transform: scale(1.05);
		}

		75% {
			top: 5.5vmin;
			left: 15vmin;
		}

		100% {
			top: .7rem;
			left: 9.2rem;
		}
	}

	/* 关闭的动画 */
	@keyframes animate-off {
		0% {
			top: .7rem;
			left: 9.2rem;
		}

		25% {
			top: 5.5vmin;
			left: 15vmin;
		}

		50% {
			top: 3rem;
			left: 5rem;
			transform: scale(1.05);
		}

		75% {
			top: 5.5vmin;
			left: 5vmin;
		}

		100% {
			top: .7rem;
			left: .7rem;
		}
	}
}
</style>
