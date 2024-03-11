<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-16 12:01:44
 * @ Modified by: willysliang
 * @ Modified time: 2022-12-06 14:05:21
 * @ Description: 上传 eXCEL
 -->
<template>
  <el-card>
    <div>
      <span>上传excel文件并预览场景</span>
      <el-divider></el-divider>
    </div>
    <div class="section">
      <el-upload
        ref="uploadRef"
        style="width: 100%"
        :accept="accept"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-icon :size="35">
          <el-icon-upload />
        </el-icon>
        <div class="el-upload__text mt-4">
          将文件拖到此处，或<em>点击上传</em>
        </div>

        <template #tip>
          <div class="el-upload__tip text-center">点击文件进行预览</div>
        </template>
      </el-upload>

      <el-table
        v-loading="loading"
        :data="excelData"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="item in header"
          :key="item"
          :prop="item"
          :label="item"
        >
        </el-table-column>
      </el-table>
    </div>
    <el-button
      type="success"
      plain
      class="mt-2 w-full"
      @click="handleSubmitUpload"
    >
      确认上传
    </el-button>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { useReadRawData } from './useReadExcel'

interface stateTypes {
  excelData: any[]
  header: string[]
  fileList: { name: string; url: string }[]
  loading: boolean
}
export default defineComponent({
  setup () {
    const disabled = ref(false)
    const uploadRef = ref()
    const accept = ref('.xls,.xlsx')
    const state = reactive<stateTypes>({
      excelData: [],
      header: [],
      fileList: [],
      loading: false,
    })
    const toPreviewExcelData = async (rawFile: File) => {
      const { excelData, header } = await useReadRawData(rawFile)
      state.excelData = excelData
      state.header = header
      state.loading = false
    }

    const handlePreview = (file) => {
      state.loading = true
      toPreviewExcelData(file.raw)
    }
    const handleSubmitUpload = () => {
      uploadRef.value.submit()
      ElMessage.success('上传成功')
    }

    return {
      uploadRef,
      accept,
      disabled,
      handlePreview,
      handleSubmitUpload,
      ...toRefs(state),
    }
  },
})
</script>
