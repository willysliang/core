<!--
 * @ Author: willysliang
 * @ Create Time: 2023-01-19 18:15:35
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-20 08:37:53
 * @ Description: TextReflection 文字倒影
 -->

<template>
  <div class="TextReflection-pages">
    <p v-for="(item, index) in 17" :key="index" content="Reflect">Reflect</p>
  </div>
</template>

<style lang="scss">
.TextReflection-pages {
	min-height: 30rem;

	p {
		position: relative;
		text-align: center;
		min-height: 10rem;
		font-size: 72px;
		font-weight: bold;
		background: url(https://s1.ax1x.com/2023/01/12/pSu1YNR.png);
		background-size: cover;
		background-clip: text;
		color: transparent;

		&::before {
			content: attr(content);
			position: absolute;
			inset: 0;
			transform: rotateX(180deg) translateY(24px);
			transform-origin: 50% 100%;
			white-space: nowrap;
			background: inherit;
			background-size: cover;
			background-clip: text;
			color: transparent;
		}

		&:nth-child(2)::before {
			mask: linear-gradient(transparent, #000);
		}

		&:nth-child(3)::before {
			mask: repeating-linear-gradient(
				transparent,
				transparent 3px,
				white 3px,
				white 4px
			);
		}

		&:nth-child(4)::before {
			mask: repeating-linear-gradient(
				transparent,
				transparent 3px,
				white 3px,
				white 4px
			),
				linear-gradient(transparent 40%, white 90%);
		}

		&:nth-child(5)::before {
			mask: repeating-linear-gradient(
				35deg,
				transparent,
				transparent 2px,
				white 2px,
				white 4px
			),
				linear-gradient(-90deg, transparent 40%, white 95%);
		}

		&:nth-child(6)::before {
			mask: repeating-linear-gradient(
				35deg,
				transparent,
				transparent 2px,
				white 2px,
				white 4px
			),
				linear-gradient(-90deg, transparent 40%, white 95%);
			mask-composite: xor;
		}

		&:nth-child(7)::before {
			mask: linear-gradient(transparent 20%, rgb(255 255 255 / 70%) 95%);
			transform: rotateX(180deg) translateY(24px) skew(135deg) translateX(-15px);
		}

		&:nth-child(8)::before {
			mask: linear-gradient(
				-135deg,
				transparent 5%,
				rgb(255 255 255 / 50%) 95%
			);
			transform: rotateX(180deg) translateY(24px) skew(135deg) translateX(-15px);
		}

		&:nth-child(9)::before {
			mask: repeating-linear-gradient(
				35deg,
				transparent,
				transparent 2px,
				white 2px,
				white 4px
			),
				repeating-linear-gradient(
				-35deg,
				transparent,
				transparent 2px,
				white 2px,
				white 4px
			),
				linear-gradient(transparent 30%, white 95%);
			transform: rotateX(180deg) translateY(24px) skew(135deg) translateX(-15px);
		}

		&:nth-child(10)::before {
			transform: rotateX(180deg) translateY(24px);
			filter: blur(9px) brightness(1.5);
		}

		&:nth-child(11)::before {
			transform: rotateX(180deg) translateY(24px);
			filter: blur(4px);
			mask: linear-gradient(transparent 30%, white 90%);
		}

		&:nth-child(12)::before {
			mask: linear-gradient(transparent 5%, rgb(255 255 255 / 90%) 99%);
			transform: rotateX(180deg) translateY(6px) skew(135deg) translateX(-8px);
			filter: blur(8px);
		}

		&:nth-child(13)::before {
			background: linear-gradient(deeppink, yellowgreen);
			background-clip: text;
			color: transparent;
			transform: rotateX(180deg) translateY(24px);
			mask: linear-gradient(
				90deg,
				transparent,
				rgb(255 255 255 / 1%) 25%,
				white,
				rgb(255 255 255 / 1%) 75%,
				transparent
			);
		}

		&:nth-child(14)::before {
			background: linear-gradient(deeppink, yellowgreen);
			background-clip: text;
			color: transparent;
			transform: rotateX(180deg) translateY(24px);
			mask: linear-gradient(
				90deg,
				rgb(255 255 255 / 50%),
				rgb(255 255 255 / 50%)
			);
		}

		&:nth-child(15)::before {
			background: linear-gradient(deeppink, yellowgreen);
			background-clip: text;
			color: transparent;
			transform: rotateX(180deg) translateY(24px);
			mask: linear-gradient(
				90deg,
				rgb(255 255 255 / 50%),
				rgb(255 255 255 / 50%)
			);
			filter: blur(3px);
		}

		&:nth-child(16)::before {
			background: linear-gradient(deeppink, yellowgreen);
			background-clip: text;
			transform: rotateX(180deg) translateY(24px);
			mask: linear-gradient(
				90deg,
				transparent,
				rgb(255 255 255 / 1%) 25%,
				white,
				rgb(255 255 255 / 1%) 75%,
				transparent
			);
		}

		&:nth-child(17) {
			&::before {
				mask: linear-gradient(transparent 5%, rgb(255 255 255 / 90%) 95%);
				transform: rotateX(180deg) translateY(24px) skew(125deg)
					translateX(-20px);
				background: #333;
				color: transparent;
				background-clip: text;
				z-index: 1;
			}

			&::after {
				content: attr(content);
				position: absolute;
				inset: 0;
				transform-origin: 50% 100%;
				white-space: nowrap;
				transform: rotateX(180deg) translateY(24px) skew(-125deg)
					translateX(20px);
				background: #ddd;
				color: transparent;
				background-clip: text;
				mask: linear-gradient(transparent 5%, rgb(255 255 255 / 90%) 95%);
			}
		}
	}
}
</style>
