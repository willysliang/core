<!--
 * @ Author: willy
 * @ Create Time: 2023-11-03 12:01:59
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-28 10:09:14
 * @ Description: md 文档页
 -->
<script setup lang="ts">
import { useReadPathFiles } from '@/hooks/useReadPathFiles'
import { reactive, ref } from 'vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
// import '@kangc/v-md-editor/lib/theme/style/github.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// highlightjs
// import Hljs from 'highlight.js'
import Prism from 'prismjs'

VMdEditor.use(vuepressTheme, {
  // Hljs,
  Prism,
  codeHighlightExtensionMap: {
    vue: 'html',
  },
})

const markdown = ref('')

const VMdEditorConfig = reactive({
  text: markdown.value,
  // 模式。可选值：edit(纯编辑模式) editable(编辑与预览模式) preview(纯预览模式)
  mode: 'editable',
  height: '90vh',
  // 编辑和预览时制表符的长度
  'tab-size': 4,
  // 目录导航是否在右侧
  'toc-nav-position-right': true,
  // 是否默认显示目录导航
  'default-show-toc': true,
  // 编辑器加载完是否自动聚焦
  autofocus: true,
  // 是否默认开启全屏
  'default-fullscreen': false,
  // 目录导航生成时包含的标题。默认包含 2 级、3 级标题。
  'include-level': [1, 2, 3, 4, 5],
  // 左侧工具栏，默认：undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save
  'left-toolbar': '',
  // 右侧工具栏，preview toc sync-scroll fullscreen
  'right-toolbar': 'toc sync-scroll fullscreen',
})

const { fileMap } = useReadPathFiles()

console.log('fileMap', fileMap)
const blogFile = reactive(fileMap?.blog?.children ?? fileMap)

const getMD = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tempFilePath = blogFile['前端基础']!.children!.Nodejs!
    .filePath as string

  fetch(tempFilePath)
    .then(async (res) => await res.text())
    .then((data) => {
      markdown.value = data
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="btn" @click="getMD">按钮</div>
  <div class="ui-md">
    <VMdEditor v-model="markdown" v-bind="VMdEditorConfig" />
  </div>
</template>

<style lang="scss">
@import '@/styles/funs.scss';

.ui-md {
  font-size: p2r(12);
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}

.v-md-editor__editor-wrapper {
  width: 0;
  flex: 0;
}

// .v-md-editor__left-area-title {
//   height: 0 !important;
//   line-height: 0 !important;
//   overflow: hidden;
// }

pre {
  @include scrollbar();
  &::-webkit-scrollbar {
    /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
    height: p2r(8);
  }

  /*定义滚动条轨道（凹槽）样式*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 p2r(6) transparent; /* 较少使用 */
    border-radius: p2r(4);
    height: p2r(8);
  }

  /*定义滑块 样式*/
  &::-webkit-scrollbar-thumb {
    width: p2r(10);
    border-radius: p2r(10);
    height: p2r(8);
  }
}
</style>
