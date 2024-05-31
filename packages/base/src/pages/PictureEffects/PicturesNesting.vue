<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-18 12:08:07
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-19 18:10:18
 * @ Description:  PicturesNesting 多图嵌套
 -->
<script setup lang="ts">
import {
  PictureLibrary4,
  PictureLibrary5,
  PictureLibrary6,
  PictureLibrary7,
  PictureLibrary8,
} from '@/assets/images'
</script>

<template>
  <div class="PicturesNesting-pages">
    <img :src="PictureLibrary4" alt="..." />
    <img :src="PictureLibrary5" alt="..." />
    <img :src="PictureLibrary6" alt="..." />
    <img :src="PictureLibrary7" alt="..." />
    <img :src="PictureLibrary8" alt="..." />
  </div>
</template>

<style lang="scss">
.PicturesNesting-pages {
	width: 100%;
	display: grid;
	grid: repeat(2, 1fr) / repeat(4, 1fr);
	aspect-ratio: 2;

	img {
		width: 100%;
		height: 100%;
	}

	img:nth-child(1) {
		grid-area: 1/1 / span 2 / span 2;
		clip-path: polygon(0 0, 100% 0, 0 100%);
	}

	img:nth-child(2) {
		grid-area: 1/2 / span 2 / span 2;
		clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
	}

	img:nth-child(3) {
		grid-area: span 2 / span 2/-1/-1;
		clip-path: polygon(0 0, 100% 0, 100% 100%);
	}

	img:nth-child(4) {
		grid-area: 2/1 / span 1 / span 2;
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}

	img:nth-child(5) {
		grid-area: span 1 / span 2/-1/-1;
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}
}
</style>
