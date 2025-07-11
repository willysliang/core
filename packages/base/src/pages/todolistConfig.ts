/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-11 14:32:12
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 17:06:46
 * @ Description: todolist 配置项
 */

import {
  Dianziqian,
  FileEditing,
  FilePdfOne,
  Install,
} from '@icon-park/vue-next'
import { demoPages } from './constant'
import type { ITodoListProps } from '@/components/TodoList/type.d'

/**
 * SignPdf - pdf电子签名
 */
export const SignPdfTodo: ITodoListProps = {
  title: 'PDF电子签名解决方案',
  todos: [
    {
      taskName: '电子签字组件',
      taskDesc:
        '基于Canvas实现的电子签名功能，支持鼠标和触摸设备操作，提供清晰的电子签名生成体验。',
      features: [
        '支持鼠标和触摸屏签名',
        '可调整画笔粗细和颜色',
        '签名数据导出功能',
        '支持高清屏幕显示',
      ],
      tags: ['Canvas API', 'Vue3', '响应式设计'],
      progressNum: 95,
      icon: Dianziqian,
    },
    {
      taskName: 'PDF展示组件',
      taskDesc:
        '在浏览器中直接渲染PDF文档，无需外部插件或下载，完全基于DOM和前端技术实现。',
      features: [
        '纯前端PDF渲染方案',
        '支持页面缩放和导航',
        '文本选择和搜索功能',
        '多页面无缝加载',
      ],
      tags: ['PDF.js', 'Web Worker', 'HTML5'],
      progressNum: 80,
      icon: FilePdfOne,
    },
    {
      taskName: '动态PDF签字',
      taskDesc:
        '通过在PDF文档上自由选择位置来放置电子签名，提供直观的拖动和放置体验。',
      features: [
        '拖放签名到任意位置',
        '签名缩放和旋转功能',
        '实时预览效果',
        '多签名位置标记',
      ],
      tags: ['位置坐标映射', 'SVG', 'JS'],
      progressNum: 65,
      icon: FileEditing,
    },
    {
      taskName: '签字PDF导出/下载',
      taskDesc:
        '将签署完成的PDF文档输出为可下载的文件格式，保持原始格式并添加数字签名数据。',
      features: ['PDF文档合成', '签名水印处理', '文件大小优化'],
      todoFeatures: ['批量导出功能'],
      tags: ['PDF-LIB', '文件流', 'Blob URL'],
      progressNum: 55,
      icon: Install,
    },
  ],
}

/**
 * todolist配置项 Map 对象
 */
export const todoListConfigMap: Record<string, ITodoListProps> = {
  [demoPages.SIGN_PDF.path]: SignPdfTodo,
}
