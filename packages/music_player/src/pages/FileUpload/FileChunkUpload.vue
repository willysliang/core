<!--
 * @ Author: willysliang
 * @ Create Time: 2023-02-13 15:45:10
 * @ Modified by: willysliang
 * @ Modified time: 2023-02-13 15:48:47
 * @ Description: FileChunkUpload 文件切块上传
 -->

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, computed, watch } from 'vue'

const SIZE = 10 * 1024 * 1024
const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading',
}

const container = reactive({
  file: null as any,
  hash: '',
  worker: null as Worker | null,
})
const state = reactive({
  hashPercentage: 0,
  status: Status.wait,
  fakeUploadPercentage: 0,
  requestList: [] as any[],
  data: [] as any[],
})

const uploadDisabled = computed(
  () =>
    !container.file || [Status.pause, Status.uploading].includes(state.status),
)
const uploadPercentage = computed(() => {
  if (!container.file || !state.data.length) return 0
  const loaded = state.data
    .map((item) => item.size * item.percentage)
    .reduce((acc, cur) => acc + cur)
  return Number.parseInt((loaded / container.file?.size || 0).toFixed(2))
})
watch(
  uploadPercentage,
  (now) => {
    if (now > state.fakeUploadPercentage) {
      state.fakeUploadPercentage = now
    }
  },
  { immediate: true },
)

interface IFileChunk {
  file: any
}

interface IHTTPParams {
  url: string
  method?: string
  data?: any
  headers?: Record<string, string>
  onProgress?: any
  requestList?: any[]
}
const request = <T = any>({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress = (e) => e,
  requestList,
}: IHTTPParams): Promise<{ data: T }> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.open(method, url)
    Object.keys(headers).forEach((key) =>
      xhr.setRequestHeader(key, headers[key]),
    )
    xhr.send(data)
    xhr.onload = (e) => {
      // 将请求成功的 xhr 从列表中删除
      if (requestList) {
        const xhrIndex = requestList.findIndex((item) => item === xhr)
        requestList.splice(xhrIndex, 1)
      }
      try {
        resolve({
          data: JSON.parse((e as any).target.response),
        })
      } catch (error: any) {
        resolve({ data: error })
      }
    }
    // 暴露当前 xhr 给外部
    requestList?.push(xhr)
  })
}

/** 删除 */
const handleDelete = async () => {
  try {
    const { data } = await request<{ code: number; message: string }>({
      url: 'http://localhost:4000/delete',
    })
    if (data?.code === 200) {
      ElMessage.success(data.message)
    }
  } catch {
    ElMessage.error('delete error')
  }
}

/** 重置请求列表的数据 */
const resetData = () => {
  state.requestList.forEach((xhr) => xhr?.abort())
  state.requestList = []
  if (container.worker) {
    container.worker.onmessage = null
  }
}

const handlePause = () => {
  state.status = Status.pause
  resetData()
}

/** 根据 hash 验证文件是否曾经已经被上传过，没有才进行上传 */
const verifyUpload = async (
  fileName: string,
  fileHash: string,
): Promise<{ uploadedList: any[]; shouldUpload: boolean }> => {
  try {
    const { data } = await request({
      url: 'http://localhost:4000/verify',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        fileName,
        fileHash,
      }),
    })
    return data
  } catch (err) {
    return { shouldUpload: false, uploadedList: [] }
  }
}

// 用闭包保存每个 chunk 的进度数据
const createProgressHandler = (item) => {
  return (e) => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100))
  }
}

// 通知服务端合并切片
const mergeRequest = async () => {
  await request({
    url: 'http://localhost:4000/merge',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      size: SIZE,
      fileHash: container.hash,
      fileName: container.file.name,
    }),
  })
  ElMessage.success('upload success, check /target directory')
  state.status = Status.wait
}

/** 上传切片，同时过滤已上传的切片 */
const uploadChunks = async (uploadedList: any[] = []) => {
  const requestList = state.data
    .filter(({ hash }) => !uploadedList.includes(hash))
    .map(({ chunk, hash, index }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('fileName', container.file.name)
      formData.append('fileHash', container.hash)
      return { formData, index }
    })
    .map(({ formData, index }) =>
      request({
        url: 'http://localhost:4000',
        data: formData,
        onProgress: createProgressHandler(state.data[index]),
        requestList: state.requestList,
      }),
    )

  await Promise.all(requestList)

  // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时合并切片
  if (uploadedList.length + requestList.length === state.data.length) {
    await mergeRequest()
  }
}

const handleResume = async () => {
  state.status = Status.uploading
  const { uploadedList } = await verifyUpload(
    container.file.name,
    container.hash,
  )
  await uploadChunks(uploadedList)
}

/** 文件改变 */
const handleFileChange = (e) => {
  const [file] = e.target.files
  if (!file) return undefined
  resetData()
  container.file = file
}

/** 文件切片 */
const createFileChunk = (file: File, size = SIZE): IFileChunk[] => {
  const fileChunkList: any[] = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}

/** 使用 webWorker 生成文件 hash */
const calculateHash = (fileChunkList: IFileChunk[]): Promise<string> =>
  new Promise((resolve) => {
    container.worker = new Worker('/hash.js')
    container.worker.postMessage({ fileChunkList })
    container.worker.onmessage = (e) => {
      const { percentage, hash } = e.data
      state.hashPercentage = percentage
      if (hash) resolve(hash)
    }
  })

/** 文件上传 */
const handleUpload = async () => {
  if (!container.file) return false
  state.status = Status.uploading
  const fileChunkList = createFileChunk(container.file)
  container.hash = await calculateHash(fileChunkList)

  const { shouldUpload, uploadedList } = await verifyUpload(
    container.file.name,
    container.hash,
  )
  if (!shouldUpload) {
    ElMessage.success(
      'skip upload：file upload success, check /target directory',
    )
    state.status = Status.wait
    return false
  }

  state.data = fileChunkList.map(({ file }, index) => ({
    fileHash: container.hash,
    index,
    hash: container.hash + ' - ' + index,
    chunk: file,
    size: file.size,
    percentage: uploadedList.includes(index) ? 100 : 0,
  }))

  await uploadChunks(uploadedList)
}
</script>

<template>
  <div>
    <input
      type="file"
      :disabled="state.status !== Status.wait"
      @change="handleFileChange"
    />
    <el-button :disabled="uploadDisabled" @click="handleUpload">
      upload
    </el-button>
    <el-button v-if="state.status === Status.pause" @click="handleResume">
      resume
    </el-button>
    <el-button
      v-else
      :disabled="state.status !== Status.uploading || !container.hash"
      @click="handlePause"
    >
      pause
    </el-button>
    <el-button @click="handleDelete">delete</el-button>
  </div>
  <div class="w-full">
    <div class="w-full">
      <div>calculate chunk hash</div>
      <el-progress :percentage="state.hashPercentage"></el-progress>
    </div>
    <div class="w-full">
      <div>percentage</div>
      <el-progress :percentage="state.fakeUploadPercentage"></el-progress>
    </div>
  </div>
  <el-table :data="state.data">
    <el-table-column prop="hash" label="chunk hash" align="center" />
    <el-table-column label="size(KB)" align="center" width="120">
      <template #default="{ row }">
        {{ Number((row.size / 1024).toFixed(0)) }}
      </template>
    </el-table-column>
    <el-table-column label="percentage" align="center">
      <template #default="{ row }">
        <el-progress :percentage="row.percentage" color="#909399" />
      </template>
    </el-table-column>
  </el-table>
</template>
