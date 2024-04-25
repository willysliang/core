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


## 2024年4月25日
  - feat(utils): [hooks/tracker] Tracker 日志埋点上报

## 2024年4月22日
  - chore(server): 引入 pm2 服务

## 2024年4月21日
  - chore(blog): 设置忽略的 md 文件名的名单

## 2024年4月20日
  - fix(utils): [FetchRequest] 修复query-string报错

## 2024年4月14日
  - refactor(utils): [all] 重构 - 优化文件结构

## 2024年4月12日
  - feat(utils): [algorithm/Classic/KMeans] 聚类算法 - K 均值
  - feat(utils): [utils/app/favion] 网站图标类

## 2024年4月11日
  - feat(utils): [http] [FetchRequest] 封装fetch网络请求
  - feat(next): 添加 Nextjs Demo
  - fix(base): [Picker] 修复打包报错问题
  - build(ci/cd): 添加可触发 CI/CD 的分支

## 2024年3月29日
  - style(all): [editorconfig] 配置文件格式化

## 2024年3月28日
  - style(MP): [all] 代码格式化

## 2024年3月21日
  - feat(utils): [algorithm] 添加算法子模块

## 2024年3月14日
  - fix(MP): 添加catch捕获防止运行报错
  - chore(all): [stylelint] 添加scss ignoreAtRules
  - fix(base): [styles/funcs] 修复样式命名规范报错

## 2024年3月12日
  - fix(all): [pnpm] 安装依赖问题修复

## 2024年3月11日
  - feat(MP): 迁移 music-player 子项目

## 2024年3月8日
  - feat(utils): [excel] ReadExcelUtils、ExportExcelUtils 读写excel

## 2024年3月6日
  - fix(utils): [file]
    baseFileUtils、classMixinUtils 通用方法迁移
    classMixinUtils/Mixins 修复Mixins方法无法给函数使用async语法糖

## 2024年3月5日
  - feat(utils): [indexedDB] IndexedDBHelper indexedDB操作帮手类

## 2024年3月4日
  - feat(utils): [classUtils] applyMixins/Mixins混入模式实现继承多个父类

## 2024年3月1日
  - feat(utils): [fileUtils] 文件类
    - FileConvertFormatUtils 文件转换格式类
    - FileConvertFormatUtils 文件加载类
    - FileConvertFormatUtils 文件优化类
    - FileAllUtils 使用混合模式继承上述所有基础文件类

## 2024年2月29日
  - fix(blog): 修复博客拉起编辑错误问题
  - feat(server): 添加 file 文件上传路由、添加变量类型定义、controllers文件夹位置移动

## 2024年2月28日
  - feat(blog): 博客首页调整
  - docs(all): [README] 添加README描述信息
  - feat(all): [husky] 增加 Git Message 提交前校验信息
  - fix(all): [husky] 修改文件编码格式为 utf-8、不格式化md文件
  - docs(all): 还原MD文档格式化内容

## 2024年2月27日
  - feat(blog): 使用 vuepress 打包搭建静态博客
  - build(blog): 修改blog ci/cd 流程
  - build(blog): 修改 blog 打包的基础地址

## 2024年2月26日
  - feat(utils): 移植通用方法
  - refactor: 重构项目结构，页面迁移至 packages/base
  - refactor(base): 修改子项目 public 路径
  - chore(blog): 设置 blog 子项目
  - perf(base): 优化提取 packages/base 的 vite 配置项

## 2024年2月24日10点53分
  - perf(server): 优化封装MongooseConnect类

## 2024年2月23日18点54分
  - feat(utils): 添加通用方法子模块
  - feat(server): webPush消息推送、调整调用通用方法、优化 public/webPush 方法

## 2024年2月22日21点19分
  - feat(server): 联系人模块、优化错误处理中间件

## 2024年2月21日21点29分
  - feat(server): 错误中间件、链接mongoose(用户信息模块)

## 2024年2月20日21点36分
  - feat(server): 服务分层、TOKEN鉴权、用户相关

## 2024年2月19日20点27分
  - feat(public): ServiceWorker
  - feat(server): 服务器搭建

## 2024年2月19日09点03分
  - chore(pnpm-lock): 依赖更新

## 2024年2月7日19点04分
  - build: 添加 CI/CD 构建工具

## 2024年2月1日21点39分
  - feat(comp): [Select] 组件抽离、递归获取选中的item、展示label的值

## 2024年1月27日21点22分
  - feat(utils): [file] 添加文件类

## 2024年1月22日21点33分
  - feat(utils): [common]
    - deepEqual 深度对比两个值是否相等
    - removeDuplicates 删除数组的重复项对象

## 2024年1月20日19点58分
  - feat(comp): [Select] deepFindActItem 递归获取选中的item

## 2024年1月19日18点45分
  - feat(comp): [Picker、Select] 选项展示

## 2024年1月19日10点09分
  - feat(utils): [format] generateRandomChina 生成随机中文字符串

## 2024年1月12日
  - feat(utils): [scroll] EventHandler - 事件帮手类  16点52分
  - feat(comp): [Picker] WPickerOptions - 选择列的样式

## 2024年1月9日19点54分
  - feat(utils): [common] 通用工
  具类整合
  - chore: [github-ci/cd] dev可进行工作流
  - chore: [github-ci/cd] 移除dev触发CI/CD打包流程(github-pages设定develop不允许进行打包部署)

## 2024年1月7日23:10:22
  - feat(utils): [dom] DOM相关工具类整理
  - chore(stylelint): 修改stylelint格式化

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
