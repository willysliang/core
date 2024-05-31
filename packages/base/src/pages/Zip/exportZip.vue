<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-17 10:05:58
 * @ Modified by: willysliang
 * @ Modified time: 2023-03-10 14:06:02
 * @ Description: ZIP 下载压缩文件
 -->

<script lang="ts" setup>
import Wangeditor from '../Editor/Wangeditor.vue'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import ExportUploadZip from './ExportUploadZip.vue'

/** 富文本值 */
const editorValue = ref('')

const fileTypeList = ref(['html', 'text'])
const downloadData = reactive({
  zipFileName: '',
  fileName: '',
  fileType: 'html',
})

/**
 * @description 下载文件
 */
const dowloadZip = ref<JSZip>(new JSZip())
const handleDownloadFile = async () => {
  dowloadZip.value.file(
    `${downloadData.fileName || 'default'}.${downloadData.fileType}`,
    editorValue.value,
  )
  dowloadZip.value
    .generateAsync({ type: 'blob' })
    .then((blob) => {
      saveAs(blob, `${downloadData.zipFileName || '压缩'}`)
      ElNotification.success('文件下载成功')
    })
    .catch((err) => {
      ElNotification.warning(`文件下载失败,${err}`)
    })
}
</script>

<template>
  <div class="w-full h-full">
    <el-divider content-position="left">导出压缩文件Zip</el-divider>
    <div class="mb-4">
      <span>{{ $t('demo.zip.zipExportScene') }}</span>
      <el-link
        type="success"
        href="https://stuk.github.io/jszip/documentation/examples.html"
      >
        JSZip
        <el-tooltip
          effect="dark"
          :content="$t('demo.zip.zipContentTip')"
          placement="top-start"
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </el-link>
    </div>

    <!--  下载生成编辑文件zip场景 -->
    <el-row>
      <el-col :offset="1" :span="22">
        <el-card>
          <el-row :gutter="10" class="mb-2">
            <el-col :span="4" :offset="6">
              <el-select
                v-model="downloadData.fileType"
                placeholder="请选择文件类型"
              >
                <el-option
                  v-for="item in fileTypeList"
                  :key="item"
                  :value="item"
                  :label="item"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="downloadData.zipFileName"
                placeholder="请输入zip压缩文件名"
                clearable
              />
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="downloadData.fileName"
                placeholder="请输入编辑文件名"
                clearable
              />
            </el-col>
            <el-col :span="6">
              <el-button type="success" plain @click="handleDownloadFile">
                下载 Zip (FileSaver API)
                <el-tooltip
                  effect="dark"
                  :content="$t('demo.zip.zipDownloadTip')"
                  placement="top-start"
                >
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-button>
            </el-col>
          </el-row>

          <el-divider content-position="left">
            下载生成编辑文件zip场景
          </el-divider>

          <Wangeditor v-model="editorValue" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 下载压缩已上传文件的zip场景 -->
    <ExportUploadZip />
  </div>
</template>
