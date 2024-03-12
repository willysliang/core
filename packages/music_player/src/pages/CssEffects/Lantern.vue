<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-05 21:31:42
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-06 09:27:43
 * @ Description: Lantern - 灯笼动画
 -->
<script setup lang="ts"></script>

<template>
  <div class="lantern-page">
		<!-- 头部线条 -->
		<span class="head-line"></span>

    <!-- 灯笼主体 -->
    <div class="center">
      <div class="center-line">
        <span>春节快乐</span>
      </div>

      <!-- 底部线条 -->
      <span class="footer-line"></span>
    </div>
  </div>
</template>

<style lang="scss">
.lantern-page {
	$line-color: #ecaa2f;
	$bg: #f00;
	box-sizing: border-box;
	margin: auto;
	margin-top: 7rem;
	margin-bottom: 13rem;
	width: 22rem;
	height: 15rem;
	position: relative;
	animation: swing 8s infinite ease-in-out;

	/* 左右摇摆动画 */
	@keyframes swing {
		0%,
		100% {
			transform: rotate(-10deg);
		}

		50% {
			transform: rotate(10deg);
		}
	}

	/* 头部线条 */
	.head-line {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -6rem;
		width: 0.35rem;
		height: 6rem;
		background-color: $line-color;
	}

	/* 底部线条 */
	.footer-line {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -5rem;
		width: 0.35rem;
		height: 5rem;
		background-color: $line-color;

		/* 底部线条细须 */
		&::after {
			content: '';
			position: absolute;
			bottom: -8rem;
			left: 50%;
			transform: translateX(-50%);
			width: 1.6rem;
			height: 8rem;
			background: linear-gradient(
				#f00,
				#e36d00 3px,
				#fbd342 5px,
				#e36d00 8px,
				#e36d00 12px,
				#f00 16px,
				rgb(255 0 0 / 80%) 26px,
				rgb(255 0 0 / 60%)
			);
			border-radius: 0.5rem 0.5rem 0 0;
		}
	}

	/* 灯笼主体 */
	.center {
		position: relative;
		width: 100%;
		height: 100%;
		background: $bg;
		border-radius: 11rem;
		box-shadow: 0 0 8rem -1rem $bg;
		animation: swing 3s infinite ease-in-out;
		transform-origin: top center;

		/* 灯笼头部盖 */
		&::before {
			content: '';
			width: 7rem;
			height: 0.7rem;
			background: $line-color;
			border-radius: 0.5rem 0.5rem 0 0;
			position: absolute;
			top: -0.7rem;
			left: 50%;
			transform: translateX(-50%);
			z-index: 2;
		}

		/* 灯笼底部盖 */
		&::after {
			content: '';
			width: 7rem;
			height: 0.7rem;
			background: $line-color;
			border-radius: 0 0 0.5rem 0.5rem;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -0.7rem;
			z-index: 2;
		}

		/* 灯笼内部 */
		.center-line {
			width: 100%;
			height: 100%;

			/* 灯笼内部线条 */
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: calc(50% - 8rem);
				width: 16rem;
				height: 100%;
				border: 2px solid $line-color;
				border-radius: 50%;
			}

			/* 灯笼内部核心线条 */
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: calc(50% - 3.5rem);
				width: 7rem;
				height: 100%;
				border: 2px solid $line-color;
				border-radius: 50%;
			}

			/* 灯笼中心字体 */
			span {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 1.2rem;
				writing-mode: sideways-rl;
				font-size: 1.5rem;
				line-height: 2rem;
				color: $line-color;
				font-weight: bold;
			}
		}
	}
}
</style>
