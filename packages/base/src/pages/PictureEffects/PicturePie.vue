<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-17 12:33:55
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-18 12:11:49
 * @ Description: PicturePie 图片饼图
 -->

<script setup lang="ts">
import {
  PictureLibrary1,
  PictureLibrary2,
  PictureLibrary3,
  PictureLibrary4,
} from '@/assets/images'
</script>

<template>
  <div class="PicturePie-pages">
    <img :src="PictureLibrary1" alt="..." />
    <img :src="PictureLibrary2" alt="..." />
    <img :src="PictureLibrary3" alt="..." />
    <img :src="PictureLibrary4" alt="..." />
  </div>
</template>

<style lang="scss">
.PicturePie-pages {
	--g: 0.5rem; /* the gap */
	width: 50%; /* the size */
	margin: auto;
	box-sizing: border-box;
	padding: 0.6rem;
	background-color: #82a8b9;
	aspect-ratio: 1;
	display: grid;

	img {
		--p: calc(-1 * var(--g));
		width: 100%;
		height: 100%;
		border-radius: 100%;
		grid-area: 1 / 1;
		transition: transform 0.2s, clip-path 0.3s 0.2s, z-index 0s;

		&:hover {
			--i: 1;
		}

		&:nth-child(1) {
			clip-path: polygon(
				50% 50%,
				calc(50% * var(--i, 0)) calc(120% * var(--i, 0)),
				0 calc(100% * var(--i, 0)),
				0 0,
				100% 0,
				100% calc(100% * var(--i, 0)),
				calc(100% - 50% * var(--i, 0)) calc(120% * var(--i, 0))
			);
		}
	}
}
</style>
