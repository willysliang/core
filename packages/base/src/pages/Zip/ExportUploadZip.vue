<!-- eslint-disable no-use-before-define -->
<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-17 10:05:58
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-23 11:59:24
 * @ Description: 压缩文件下载
 -->

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'

type TableItemType = {
  fileName: string
  fileUrl: string
  uploadTime: string
  uploadUser: string
}
const tableData = ref<TableItemType[]>([
  {
    fileName: 'ava1.png',
    fileUrl:
      'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    uploadTime: '2021-07-02',
    uploadUser: 'MrZip',
  },
  {
    fileName: 'package.zip',
    fileUrl: './test/package.zip',
    uploadTime: '2021-07-01',
    uploadUser: 'MrZip',
  },
  {
    fileName: 'jszip.js',
    fileUrl: './test/jszip.js',
    uploadTime: '2021-07-02',
    uploadUser: 'MrZip',
  },
  {
    fileName: 'style.css',
    fileUrl: './test/style.css',
    uploadTime: '2021-07-03',
    uploadUser: 'MrCss',
  },
])

const downloadSelectZip = ref<JSZip>(new JSZip())
const multipleSelection = ref<TableItemType[]>([] as TableItemType[])

/** 文件路径转化为数据流 */
const urlToPromise = (url: string) =>
  new Promise((resolve) => {
    try {
      JSZipUtils.getBinaryContent(url, (err: any, data: unknown) => {
        if (err) {
          resolve('')
        } else {
          resolve(data)
        }
      })
    } catch {
      resolve('')
    }
  })

/***
 * @description 下载压缩文件
 */
const handleDownloadSelectFile = async () => {
  if (multipleSelection.value.length < 1) {
    ElMessage.warning('请先选择需要下载的文件')
    return undefined
  }

  try {
    /** 循环把文件路径转化为数据流 */
    for (let i = 0; i < multipleSelection.value.length; i++) {
      const tempUrl = await urlToPromise(multipleSelection.value[i].fileUrl)
      downloadSelectZip.value.file(
        multipleSelection.value[i].fileName,
        tempUrl as ArrayBuffer | string,
      )
    }

    /** 计算下载文件进度 */
    const blob = await downloadSelectZip.value.generateAsync(
      { type: 'blob' },
      (metadata) => {
        percentage.value = metadata.percent
      },
    )

    /** 下载文件 */
    saveAs(blob, 'example.zip')
  } catch (err) {
    ElNotification.error('下载压缩文件失败')
  }
}

/** 文件下载进度控制 */
const percentage = ref<number>(0)
const handleSelectionChange = (val: any) => {
  if (percentage.value > 0) {
    percentage.value = 0
  }
  multipleSelection.value = val
}
</script>

<template>
  <!-- 下载压缩已上传文件的zip场景 -->
  <el-row>
    <el-col :offset="1" :span="22">
      <el-card>
        <el-row :gutter="10" class="mb-2">
          <el-col :span="6" :offset="18">
            <el-button type="success" plain @click="handleDownloadSelectFile">
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
          下载压缩已上传文件的zip场景
        </el-divider>

        <el-progress
          :text-inside="true"
          :stroke-width="15"
          :percentage="percentage"
          status="success"
        />

        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="fileName" label="文件名称" />
          <el-table-column prop="uploadTime" label="上传时间" />
          <el-table-column
            prop="uploadUser"
            label="上传人"
            show-overflow-tooltip
          />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
