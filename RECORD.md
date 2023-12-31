---
Author: willy
CreateTime: 2023-10-27 18:48:47
Modifier: willy
ModifierTime: 2023-11-07 19:48:07
Description: 日志记录
---

# 更新规则
  - feat 增加新功能
  - fix 修复问题/BUG
  - style 代码风格相关无影响运行结果的
  - perf 优化/性能提升
  - refactor 重构
  - revert 撤销修改
  - test 测试相关
  - docs 文档/注释
  - chore 依赖更新/脚手架配置修改等
  - workflow 工作流改进
  - ci 持续集成
  - types 类型定义文件更改
  - wip 开发中
  - bug 发现但未修复的bug


# 更新记录


## 2024年1月7日19点38分
  - fix(comp): 更改文件驼峰命名

## 2024年1月5日20点22分
  - feat(comp): ['WPicker'] 选择器定义类型、选择器操作区
  - chore(eslint): 兼容在 vue 文件中使用 JSX/TSX 语法

## 2024年1月4日21点49分
  - fix(comp): ['WPopover']
    - 修复在 'positionMode=fixed' 时的宽度限制
    - 修复在未定义 'slot=default' 内容时点击 'slot=content' 的内容会关闭

## 2024年1月4日17点34分
  - feat(comp): ['WPopover'] - 兼容 positionMode 为 'absolute' | 'fixed' 两种情况

## 2024年1月3日21点10分
  - chore(vite): 支持 tsx 语法
  - feat(utils): ['createBEM'、'Type'] 添加新工具类
  - style(var): 修改公共变量
  - feat(comp): ['WPopover'、'WSelect'] 弹出层、选择器

## 2023年12月29日19点30分
  - style: 规范化样式、样式变量化
  - feat(utils): 添加工具类
  - feat(comp): 添加组件入口
  - wip(comp): ['WSelect'] 选择器定义类型

## 2023年12月22日17点25分
  - feat: 首页样式实现
  - feat: 集成工具类
  - fix: 修复首页样式表现

## 2023年11月28日21点18分
  - feat: 设置正式/预发布/测试环境
  - fix: 修复打包后请求 md 文件路径错误问题

## 2023年11月28日16点52分
  - docs: 更新 blog md 文档的图片格式与标题格式
  - workflow: github 工作流更改
  - fix: 修复md文档显示错误问题

## 2023年11月28日10点11分
  - feat: 本地 md 文档解析打包
  - docs: 更新 blog

## 2023年11月7日18点04分
  - feat: md 文件在页面上预览
      - [v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh/)
      - $ pnpm i @kangc/v-md-editor highlight.js
      - 隐藏了编辑区域和操作区域
  - docs(all): 上传 blog
  - docs(README): 删除冗余且引起报错的信息

## 2023年11月6日20点39分
  - feat: 获取 blog 文件夹的 md 文件

## 2023年11月3日11点59分
  - feat: 样式提取 & blog首页

## 2023年11月1日15点03分
  - workflow(github): 自动化构建项目

## 2023年10月27日18点51分
- init(template): 初始化项目
- docs(record): 添加项目描述