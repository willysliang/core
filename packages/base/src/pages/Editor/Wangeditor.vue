<!--
 * @ Author: willysliang
 * @ Create Time: 2022-11-17 15:42:06
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-17 16:58:33
 * @ Description: wangeditor 编辑器
 -->

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, computed, shallowRef } from 'vue'

const props = defineProps<{
  /** 内容 HTML  */
  modelValue: string
}>()
const emits = defineEmits(['update:modelValue'])
const valueHtml = computed({
  get: () => (props.modelValue === '' ? '<p>hello</p>' : props.modelValue),
  set: (newVal) => emits('update:modelValue', newVal),
})

type InsertFnType = (url: string, poster: string) => void
const editorConfig = {
  placeholder: '请输出内容...', // 配置默认提醒
  MENU_CONF: {
    /** 代码高亮 */
    codeSelectLang: {
      codeLangs: [
        { text: 'CSS', value: 'css' },
        { text: 'HTML', value: 'html' },
        { text: 'XML', value: 'xml' },
      ],
    },

    /** 上传图片 */
    uploadImage: {
      // 小于该值就插入 base64 格局（而不上传），默认为 0
      base64LimitSize: 10 * 1024 * 1024, // 10MB
      maxFileSize: 1 * 1024 * 1024, // 单个文件的最大体积限度，默认为 2M
      maxNumberOfFiles: 5, // 最多可上传几个文件，默认为 100
      allowedFileTypes: ['image/*'], // 抉择文件时的类型限度，默认为 ['image/*'] 。如不想限度，则设置为 []
    },

    /** 上传视频 */
    uploadVideo: {
      async customUpload (file: File, insertFn: InsertFnType) {
        try {
          const reader = new FileReader()
          reader.onload = (event) => {
            insertFn(String(event?.target?.result), file.name)
          }
          reader.readAsDataURL(file)
        } catch {
          insertFn('', file.name)
        }
      },
    },
  },
}

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

/** 创立富文本编辑器 */
const handleCreated = (editor) => {
  editorRef.value = editor
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      mode="default"
    />
    <Editor
      v-model="valueHtml"
      mode="default"
      style="height: 20rem; overflow-y: hidden"
      :default-config="editorConfig"
      @on-created="handleCreated"
    />
  </div>
</template>
