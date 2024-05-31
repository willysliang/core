<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-17 11:44:25
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-17 12:31:03
 * @ Description: PictureClip 图片悬浮分割
 -->
<script setup lang="ts">
import { PictureLibrary1, PictureLibrary4 } from '@/assets/images'
</script>

<template>
  <div class="pictureClip-pages">
    <img :src="PictureLibrary1" alt="..." />
    <img :src="PictureLibrary4" alt="..." />
  </div>
</template>

<style lang="scss">
.pictureClip-pages {
	--g: 0.5rem; /* the gap */
	width: 100%; /* the size */
	box-sizing: border-box;
	padding: 0.6rem;
	border-radius: 0.5rem;
	background-color: #82a8b9;
	display: grid;

	img {
		--p: calc(-1 * var(--g));
		width: 100%;
		height: 100%;
		grid-area: 1 / 1;
		transition: 0.4s 0.1s;

		&:first-child {
			clip-path: polygon(0 0, calc(100% + var(--p)) 0, 0 calc(100% + var(--p)));
		}

		&:last-child {
			clip-path: polygon(
				100% 100%,
				100% calc(0% - var(--p)),
				calc(0% - var(--p)) 100%
			);
		}
	}

	&:hover {
		img:last-child,
		img:first-child:hover {
			--p: calc(50% - var(--g));
		}

		img:first-child,
		img:first-child:hover + img {
			--p: calc(-50% - var(--g));
		}
	}
}
</style>
