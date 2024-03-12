<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-23 17:45:49
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-24 18:26:53
 * @ Description: 图片裁剪
 -->

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { avactor } from '@/assets/images'
import { ElMessage } from 'element-plus'
import IconPark from '@comp/common/IconPark.vue'
import {
  AddPicture,
  Save,
  Refresh,
  FriendsCircle,
  ZoomIn,
  ZoomOut,
  Redo,
  Undo,
  AutoHeightOne,
  AutoWidthOne,
} from '@icon-park/vue-next'

const image = ref()
const imageSrc = ref<any>(avactor)
const cropper = ref<Cropper>()

/** 挂载 Cropper 实例 */
onMounted(() => {
  cropper.value = new Cropper(image.value, {
    viewMode: 0,
    dragMode: 'move',
    background: true,
    preview: '.preview',
    autoCropArea: 1,
    checkOrientation: true,
    zoomOnWheel: true,
    center: true,
  })
})

/** 打开文件 */
const fileRef = ref()
const openFile = () => {
  fileRef.value.dispatchEvent(new MouseEvent('click'))
}
const chooseImage = (): boolean => {
  const inputFile = fileRef.value.files[0]
  if (inputFile) {
    if (!/(gif|png|jpg|jpeg)$/i.test(inputFile.type)) {
      ElMessage.warning('上传头像图片只能是gif|png|jpg|jpeg 格式!')
      return false
    }
    const reader = new FileReader()
    reader.readAsDataURL(inputFile)
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      imageSrc.value = ev?.target?.result ?? ''
      cropper.value?.replace(String(ev?.target?.result || ''))
    }
    return true
  }
  return false
}

/** 保存 */
const handleSave = () => {
  const dataURLtoBlob = (dataurl: string) => {
    const arr = dataurl.split(',')
    const mime = arr[0]?.match(/:(.*?);/)?.[1]
    const bstr = window.atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const downloadFile = (url: string, name = 'defaultFileName') => {
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', name)
    a.setAttribute('target', '_blank')
    const clickEvent = document.createEvent('MouseEvents')
    clickEvent.initEvent('click', true, true)
    a.dispatchEvent(clickEvent)
  }

  const downloadFileByBase64 = (base64: string, name: string | undefined) => {
    const myBlob = dataURLtoBlob(base64)
    const myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl, name)
  }

  const getCutImg = (): string => {
    return (
      cropper.value
        ?.getCroppedCanvas({
          imageSmoothingQuality: 'high', // 图片质量
        })
        .toDataURL() || ''
    ) // 设置图片格式
  }

  downloadFileByBase64(getCutImg(), 'cropImg')
}

/** 处理后的图片 */
// const cropImg = ref()
const cropShotImg = ref()

/** 重做 */
const handleReset = () => {
  cropper.value?.reset()
}

/** 快照 */
const handleShot = () => {
  cropShotImg.value = cropper.value
    ?.getCroppedCanvas({
      imageSmoothingQuality: 'high',
    })
    .toDataURL('image/jpeg')
}

/** 缩小/放大 */
const handleZoom = (percent: number) => {
  cropper.value?.zoom(percent)
}

/** 旋转 */
const handleRotate = (deg: number) => {
  cropper.value?.rotate(deg)
}

/** 翻转 */
const flipY = ref()
const flipX = ref()
const handleFlip = (axis: 'X' | 'Y') => {
  const dom = axis === 'Y' ? flipY.value : flipX.value
  let scale = dom.getAttribute('data-scale')
  scale = scale ? -scale : -1
  if (axis === 'Y') {
    cropper.value?.scaleY(scale)
  } else {
    cropper.value?.scaleX(scale)
  }
  dom.setAttribute('data-scale', scale)
  cropper.value?.rotate(180)
}
</script>

<template>
  <div class="crop-image w-full h-full">
    <!-- 操作栏 -->
    <div class="inline-block bg-gray-500 box-border p-1 rounded-t-md">
      <div class="flex flex-row items-center">
        <el-tooltip content="打开" placement="top" effect="dark">
          <div class="operator cursor-pointer" @click="openFile">
            <IconPark :icon="AddPicture" size="18" :stroke-width="4" />
            <input
              ref="fileRef"
              style="display: none"
              type="file"
              accept="image/*"
              @change="chooseImage"
            />
          </div>
        </el-tooltip>
        <el-tooltip content="保存" placement="top" effect="dark">
          <IconPark
            :icon="Save"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleSave"
          />
        </el-tooltip>
        <el-tooltip content="重做" placement="top" effect="dark">
          <IconPark
            :icon="Refresh"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleReset"
          />
        </el-tooltip>
        <el-tooltip content="快照" placement="top" effect="dark">
          <IconPark
            :icon="FriendsCircle"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleShot"
          />
        </el-tooltip>
        <el-tooltip content="缩小" placement="top" effect="dark">
          <IconPark
            :icon="ZoomOut"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleZoom(-0.2)"
          />
        </el-tooltip>
        <el-tooltip content="放大" placement="top" effect="dark">
          <IconPark
            :icon="ZoomIn"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleZoom(0.2)"
          />
        </el-tooltip>
        <el-tooltip content="正向旋转+90" placement="top" effect="light">
          <IconPark
            :icon="Redo"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleRotate(90)"
          />
        </el-tooltip>
        <el-tooltip content="反向旋转-90" placement="top" effect="light">
          <IconPark
            :icon="Undo"
            size="18"
            :stroke-width="4"
            class="operator cursor-pointer"
            @click="handleRotate(-90)"
          />
        </el-tooltip>
        <el-tooltip content="上下翻转" placement="top" effect="light">
          <div
            ref="flipY"
            class="operator cursor-pointer"
            @click="handleFlip('Y')"
          >
            <IconPark :icon="AutoHeightOne" size="18" :stroke-width="4" />
          </div>
        </el-tooltip>
        <el-tooltip content="左右翻转" placement="top" effect="light">
          <div
            ref="flipX"
            class="operator cursor-pointer"
            @click="handleFlip('X')"
          >
            <IconPark :icon="AutoWidthOne" size="18" :stroke-width="4" />
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="w-full flex flex-row items-center justify-between">
      <!-- 裁剪区域 -->
      <div class="w-8/12 h-96 border border-dashed border-gray-400">
        <img
          ref="image"
          :src="imageSrc"
          alt=""
          class="w-full h-full block max-w-full"
        />
      </div>

      <div class="flex-1">
        <div class="h-56 w-full flex flex-col justify-around items-center">
          <div class="text-lg font-bold">预览</div>
          <div class="preview"></div>
        </div>

        <div class="h-56 w-full flex flex-col justify-around items-center">
          <div class="text-lg font-bold mt-3">快照</div>
          <img
            v-if="cropShotImg"
            :src="cropShotImg"
            alt="快照"
            style="height: calc(20rem * (9 / 16))"
            class="w-4/5 overflow-hidden object-scale-down border-2 border-solid border-gray-500"
          />
          <div v-else style="height: calc(20rem * (9 / 16)); margin: auto;" class="w-4/5 border-2 border-solid border-gray-500"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.crop-image {
	width: 100%;
	height: 100%;
	background-image: linear-gradient(
		90deg,
		rgb(50 0 0 / 5%) 3%,
		rgb(0 0 0 / 0%) 3%
	),
		linear-gradient(360deg, rgb(50 0 0 / 5%) 3%, rgb(0 0 0 / 0%) 3%);
	background-size: 20px 20px;
	background-repeat: repeat;
	background-position: center center;

	.preview {
		width: 100%;
		height: calc(20rem * (9 / 16));
		overflow: hidden;
	}

	.operator {
		@apply cursor-pointer transition-colors duration-300;
		@apply hover:bg-gray-300 hover:text-gray-100;
		@apply flex flex-row items-center justify-center;
		@apply box-border p-2;
		@apply rounded;
		@apply text-gray-200;
	}
}
</style>
