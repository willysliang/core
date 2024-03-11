<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-25 09:41:15
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-25 10:56:48
 * @ Description: 404 页面
 -->

<script setup lang="ts">
import { systemNotfound, systemNotfoundCloud } from '@/assets/images'
</script>

<template>
  <div class="w-full h-full relative inset not-found">
    <img
      :src="systemNotfound"
      alt="404"
      style="max-width: 90%; max-height: 90%"
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
    <img
      :src="systemNotfoundCloud"
      alt="404动画图"
      class="not-found-animation animation1"
    />
    <img
      :src="systemNotfoundCloud"
      alt="404动画图"
      class="not-found-animation animation2"
    />
    <img
      :src="systemNotfoundCloud"
      alt="404动画图"
      class="not-found-animation animation3"
    />
  </div>
</template>

<style lang="scss">
.not-found {
	&-animation {
		position: absolute;
		opacity: 0;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
	}

	.animation1 {
		width: 4.8rem;
		animation-name: cloudLeft;
		animation-delay: 1s;
		animation-duration: 2s;
	}

	.animation2 {
		width: 4.2rem;
		animation-name: cloudMiddle;
		animation-delay: 1.2s;
		animation-duration: 1.8s;
	}

	.animation3 {
		width: 4.4rem;
		animation-name: cloudRight;
		animation-delay: 1.1s;
		animation-duration: 2.1s;
	}

	@keyframes cloudLeft {
		0% {
			left: 65%;
			top: 10%;
			opacity: 0;
		}

		30% {
			left: 50%;
			top: 26%;
			opacity: 1;
		}

		68% {
			left: 30%;
			top: 50%;
			opacity: 1;
		}

		100% {
			left: 20%;
			top: 60%;
			opacity: 0;
		}
	}

	@keyframes cloudMiddle {
		0% {
			left: 74%;
			top: 12%;
			opacity: 0;
		}

		40% {
			left: 54%;
			top: 34%;
			opacity: 1;
		}

		80% {
			left: 34%;
			top: 54%;
			opacity: 1;
		}

		100% {
			left: 24%;
			top: 64%;
			opacity: 0;
		}
	}

	@keyframes cloudRight {
		0% {
			left: 78%;
			top: 28%;
			opacity: 0;
		}

		20% {
			left: 68%;
			top: 38%;
			opacity: 1;
		}

		80% {
			left: 38%;
			top: 58%;
			opacity: 1;
		}

		100% {
			left: 28%;
			top: 68%;
			opacity: 0;
		}
	}
}
</style>
