<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-16 23:38:43
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-17 12:27:20
 * @ Description: PictureLibrary 图片库
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
  <div class="gallery">
    <img :src="PictureLibrary1" alt="..." />
    <img :src="PictureLibrary2" alt="..." />
    <img :src="PictureLibrary3" alt="..." />
    <img :src="PictureLibrary4" alt="..." />
  </div>
</template>

<style lang="scss">
.gallery {
	--g: 0.5rem; /* the gap */
	width: 100%; /* the size */
	box-sizing: border-box;
	padding: 0.6rem;
	border-radius: 0.5rem;
	background-color: #82a8b9;
	display: grid;
	aspect-ratio: 16 / 9; /* equal height */
	gap: var(--g);

	/* grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: 1fr; */
	grid: auto-flow 1fr / repeat(3, 1fr); // 上述的缩写

	img {
		width: 100%;
		height: 100%;

		&:nth-child(2) {
			/* grid-row-start: 1; // 从第一行开始
      grid-column-start: 2; // 从第二列开始
      grid-row-end: span 2; // 占据两行
      grid-column-end: span 2; // 占据两列 */
			grid-area: 1 / 2 / span 2 / span 2; // 上述的缩写

			// 裁剪左下角
			clip-path: polygon(
				0 0,
				100% 0,
				100% 100%,
				calc(50% + var(--g) / 4) 100%,
				0 calc(50% - var(--g) / 4)
			);
		}

		// 裁剪右上角
		&:nth-child(3) {
			grid-area: 2 / 1 / span 2 / span 2;
			clip-path: polygon(
				0 0,
				calc(50% - var(--g) / 4) 0,
				100% calc(50% + var(--g) / 4),
				100% 100%,
				0 100%
			);
		}
	}
}
</style>
