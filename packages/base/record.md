---
Author: willy
CreateTime: 2022-10-10 09:05:41
Modifier: willy
ModifierTime: 2024-05-31 17:46:27
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

## 2024年9月19日
  - feat(layout): 当前路由的标题显示到头部导航栏中
  - feat(demo): [CssEffects] 萤火虫特效

## 2024年8月23日
  - feat(hooks): [handler] computedWithControl 响应式实现computed的非响应式数据变化
  - feat(demo): [views/demo/CssEffects] DestructionStyleClock 破坏风时钟

## 2024年6月18日
  - fix(layout): 修复在不显示音乐模块时仍然显示出定义基础地址的页面

## 2024年6月17日
  - feat(vite): [plugin] vitePluginSummary 按文件后缀名对文件分类记录，并统计代码行数

## 2024年6月6日
  - refactor(base): 重构页面框架布局、自动引入组件
  - feat(base): 优化 MP 页面样式
  - style(base): 调整 menuList 顺序 & 移除无用代码
  - feat(base): [layout] 菜单栏显隐可控

## 2024年6月4日
  - feat(comp): [Dialog] JS方法拉起弹窗

## 2024年6月3日
  - feat(comp): [Dialog] 弹窗
  - feat(router): 使用 Hash 路由模式

## 2024年5月31日
  - feat(comp): [Dialog] mask-layer 遮罩层

## 2024年5月31日
  - refactor(base): 整合 @willy/mp（music-player）子项目的内容到 @willy/base

## 2024年5月16日
  - fix(mp): 修复文件中 ts 类型导致报错问题

## 2024年5月13日
  - fix(mp): 修复格式校验问题

## 2024年5月9日
  - feat(mp): [split-view] 拆分视图

## 2024年5月9日
  - feat(mp): [Dragger] 原生拖拽组件

## 2023年9月23日17点34分
  - feat(hooks/core/vuex): VUEX 原理

## 2023年9月11日12点51分
  - chore(rollup-plugin-visualizer): 包分析

## 2023年6月26日10点43分
  - feat(hooks/core/immer): React Immer 核心原理
  - feat(utils): 16进制颜色值 和 RGB 互转

## 2023年6月1日10点22分
  - feat(hooks/core/reactive): VUE3 reactive 响应式原理
  - bug(hooks/tracker): 会多次触发事件(需要优化,限制执行次数)

## 2023年5月26日12点55分
  - bug(husky): 无法在提交时进行信息限制，并在 eslint 触发错误时不进行提交

## 2023年5月24日20点56分
  - feat(hooks -> tracker): 前端监控埋点hooks

## 2023年4月18日10:32:58
  - feat(router): 更改默认显示的路由

## 2023年4月10日15:06:18、2023年4月10日16:43:59、2023年4月10日18:12:50
  - ci(pnpm i unplugin-vue-macros -D): 引入自定义组件名称插件
  - feat(pages): defineOptions 自定义组件名称
  - feat(pages): 修复类型约束报错问题
  - feat(layout): 路由组件缓存
  - feat(layout -> header -> themeSetting): 可手动设置需要缓存的路由组件 ComponentCacheSetting
  - bug(src\hooks\useRouteCache.ts):
      - 问题描述：当前仅能设置一个缓存的数组，所以会导致一级路由与二级路由共用同一个记录
      - 场景复现：可查看 (src\App.vue) 与 (src\components\layout\main\index.vue) 中的 getCache 是获取同一个记录
      - 问题导致：会导致不合理的组件缓存增加（一级跟二级路由共用同一个数据）

## 2023年3月30日17:28:34
  - chore(vite): 更新 vite 打包配置

## 2023年3月27日09:39:16
  - refactor(routes): 修改 demo 相关路由位置
  - refactor(layout): 页面优化(若为案例相关路由，则不显示底部播放栏)

## 2023年3月10日11:37:02
  - ci(pnpm i vite-plugin-compression -D): 打包文件压缩
  - chore(vite): vite打包优化，使用 gzip 压缩文件

## 2023年3月9日19:21:54
  - feat(demo -> virtualList -> VirtualList): Item不定高度的虚拟列表

## 2023年3月8日14:57:45
  - refactor(demo): 移至 pages

## 2023年2月22日16:39:34
  - feat(demo -> virtualList -> VirtualList): Item固定高度的虚拟列表

## 2023年2月20日11:30:14
  - feat(demo -> IndexedDB): 封装 IndexedDB 数据库操作帮手 hooks
## 2023年2月13日15:49:37
  - feat(views -> demo -> FileUpload): FileChunkUpload 文件切块上传

## 2023年1月24日14:30:53
  - feat(views -> demo -> CssEffects): TextReflection 文字倒影

## 2023年1月19日18:12:09
  - feat(views -> demo -> PictureEffects): 图片特效：图片库、悬浮分割、饼图、多图嵌套

## 2023年1月14日18:33:52
  - feat(views -> demo -> FileChunkUpload): 文件切片上传

## 2023年1月13日15:23:32
  - feat(public/serviceWorker、index.html): serviceWorker请求中转、缓存数据

## 2023年1月12日15:42:18、2023年1月12日18:51:32
  - feat(views -> demo -> WaterMark): 页面水印（可防删除水印）
  - chore(pnpm i godb): 引入对 IndexedDB 的封装库
  - feat(views -> demo -> IndexedDB): IndexedDB 本地数据库

## 2023年1月9日11:05:06
  - feat(views -> demo -> ParticleAnimation): ParticlePicture 图片粒子化
  - feat(views -> demo -> ParticleAnimation): ParticleCountdown 粒子动画倒计时
      - 注意：在倒计时，本应是粒子化的倒计时，然后倒计时数字更新时会散开该聚合的数字，然后重新组合（但未成功实现）

## 2023年1月6日07:47:39、2023年1月6日18:18:07
  - feat(views -> demo -> CssEffects): Css特效 - Lantern 灯笼动画
  - feat(views -> demo -> CssEffects): HeartSwitch 心形开关
  - chore(pnpm i -S gasp): 引入 H5 动画库
  - feat(views -> demo -> ParticleAnimation): ParticlePicture 图片粒子化

## 2023年1月5日15:34:09
  - chore(pnpm i tslib): 引入 tslib 适配ES7装饰器Decorator
  - feat(layout): 格子背景色、ts适配ES7装饰器Decorator
  - feat(views -> demo -> Communication): Web Worker 线程

## 2022年12月14日10:17:14
  - feat(views -> demo -> Lottery -> RoundLottery): 转盘抽奖

## 2022年12月10日08:48:28
  - feat(views -> demo -> Communication): 兄弟组件通信
  - perf(router -> routes -> demoRoutes): 优化 demo 组件的自引入路由
  - types(types): *d.ts 文件整合

## 2022年12月9日15:28:58
  - feat(views -> demo -> LazyLoading): 图片滚动底部懒加载效果
  - chore(pnpm i -S mitt): 引入事件总线
  - feat(hooks -> useEventbus): 事件总线方法的封装

## 2022年12月7日13:19:45
  - fix(hooks -> event -> useEventListener): 解决监听函数中的数据缓存上次结果问题（必须限制使用防抖）
  - feat(views -> demo -> Lottery -> CellLottery): 九宫格抽奖组件

## 2022年12月6日18:14:24
  - feat(views -> demo -> Lottery): 抽奖组件

## 2022年12月5日15:21:21
  - chore(pnpm i -S echarts): 引入数据可视化图表库
  - feat(views -> demo -> Dashboard -> useEcharts): echarts hooks图表封装
  - feat(views -> demo -> Dashboard): 仪表盘组件
  - refactor(components -> common -> Title): 使用 tsx 语法重新构建组件
  - feat(hooks -> event -> useEventListener): 间断性事件监听函数

## 2022年12月2日15:39:00
  - chore(pnpm i -S vue3-video-play): 视频播放插件引入
  - feat(views -> demo -> Barrage -> videosPlay): 视频组件
  - feat(views -> demo -> Emoji): 表情包组件
  - perf(views -> demo): 案例目录内容存放优化

## 2022年12月1日11:28:44
  - chore(pnpm i -S vuedraggable@next): vue3的拖拽插件
  - feat(views -> demo -> Dragger): 拖拽组件
  - feat(views -> demo -> Editor): 富文本编辑器
  - feat(views -> demo -> Barrage -> videoBarrage): 视频弹幕

## 2022年11月25日10:57:05
  - feat(views -> system -> NotFound): 404页面 & 配置路由404
  - chore(pnpm i -S sortablejs): 拖拽库
  - feat(views -> demo -> Dragger): 拖拽组件

## 2022年11月24日10:32:11
  - chore(pnpm i cropperjs -S): 引入图片裁剪插件 cropperjs
  - feat(views -> demo -> Cropper): 图片裁剪

## 2022年11月23日09:37:46
  - chore(pnpm i driver.js -S): 引入页面分页指导插件 driver.js
  - feat(views -> header -> guide): 页面指引组件
  - chore(pnpm i -S @types/qrcode qrcode): 引入生成二维码插件 qrcode
  - feat(views -> demo -> Qrcode): 生成二维码组件 & 下载二维码图片

## 2022年11月22日10:01:06
  - feat(views -> demo -> copyText -> TableCopy): 复制文本模块 - 多数据拼接复制
  - feat(views -> demo -> copyText -> useClipboardDirective): 自定义指令 - 复制文本

## 2022年11月21日16:27:00
  - chore(pnpm i clipboard -S): 引入复制文本插件 clipboard
  - feat(views -> demo -> copyText): 复制文本模块

## 2022年11月18日17:59:44
  - chore(pnpm i -S jszip jszip-utils): 引入批量导出 zip 压缩包插件
  - feat(locales -> lang): 压缩包模块多语言
  - feat(views -> demo -> Zip): 压缩包模块

## 2022年11月17日10:35:48
  - feat(views -> demo -> Zip): 压缩包模块

## 2022年11月16日12:10:55
  - chore(pnpm i -S xlsx file-saver): 引入 excel 文件处理工具（转换excel、识别Excel文件）
  - feat(views -> demo -> excel): 表格转换excel文件
  - feat(views -> demo -> excel -> uploadExcel): 解析Excel文件内容

## 2022年11月15日09:38:09
  - feat(views -> demo): 案例配置

## 2022年11月14日09:59:36
  - feat(router): 路由信息配置
  - feat(views -> system): 系统页面配置
  - chore(pnpm i vite-plugin-top-level-await -D): 引入插件解决打包时因使用 await 而无法继续打包问题

## 2022年11月11日17:18:00
  - feat(layout -> header -> userInfo -> LoginQrcode): 二维码登录
  - feat(views -> musicHall -> categoryList): 音乐馆分类歌单
  - feat(views -> musicHall -> toplist): 音乐馆排行榜
  - feat(views -> musicHall -> picked): 音乐馆精选（独家放送 & 推荐电台）

## 2022年11月10日11:14:52
  - feat(components -> songlist -> Comments): 评论通用组件
  - feat(views -> album): 专辑评论
  - feat(views -> playlist): 歌单评论
  - feat(views -> discover -> PersonalizedSongList): 推荐新音乐
  - feat(views -> discover -> PersonalizedMv): 推荐MV
  - feat(views -> musicHall): 音乐馆页菜单构建

## 2022年11月9日09:06:07
  - feat(views -> artist -> ArtistDesc): 歌手信息描述模块
  - feat(components -> songlist -> SongOperation): 歌曲列表操作组件
  - perf(views -> artist): 优化歌手信息模块

## 2022年11月8日17:54:44
  - chore(pnpm i dayjs -S): 引入 dayjs 日期格式化
  - feat(utils -> globalExtend): 全局 & 原型 中集成的工具类
  - feat(views -> artist -> ArtistAlbum): 歌手专辑模块组件实现

## 2022年11月7日11:22:40
  - feat(views -> mv): MV详情页
  - feat(views -> artist): 歌手视频模块
  - feat(components -> songlist -> Paging): 加载更多数据组件

## 2022年11月4日10:58:12
  - feat(views -> header -> lockscreen -> ChargeHuawei): 锁屏的华为充电组件实现
  - perf(view -> header): 降低头部父子组件间的耦合性（提取整合到一个模块中）
  - chore(引入 @vueuse/core 基于 Composition API 的常用函数工具库)
  - feat(views -> header -> fullScreen): 屏幕缩放组件实现
  - chore(pnpm i unplugin-vue-define-options -D): 引入 definedOption 定义组件 name 属性
  - perf(config -> plugins): 提取整合入口文件的配置信息

## 2022年11月3日11:47:11
  - feat(hooks -> useBattery): 获取设备电池信息（如当前电量、是否在充电）的函数
  - feat(views -> header -> lockscreen -> ChargeXiaomi): 锁屏的小米充电组件实现

## 2022年10月31日17:33:10
  - style(router -> constant): 路由常量配置调整
  - feat(views -> header -> lockscreen): 锁屏功能
  - feat(hooks -> useTime): 获取本地时间函数 hooks
  - feat(hooks -> useOnline): 系统网络连接状态检测函数 hooks
  - feat(router -> routerGuards): 路由 loading

## 2022年10月28日17:55:04
  - feat(locales、layout->header->headerLocale): 国际化语言配置

## 2022年10月26日09:56:35
  - feat(components -> base -> lockscreen): 屏幕锁屏
  - chore(引入 vue-i18n@next 国际化语言插件)
  - feat(locales): 国际化语言配置

## 2022年10月25日17:06:27
  - chore(引入 nprogress 进度条)
  - perf(router -> routerGuards): 设置路由守卫函数，页面加载时控制进度条展现

## 2022年10月21日11:53:12
  - feat(store -> player): 播放器状态缓存
  - perf(layout -> footer -> playerlist): 歌曲列表滚动条优化

## 2022年10月20日10:11:33
  - feat(layout -> menu -> menuHooks): 导航模式（布局方式）配置
  - refactor(config -> constant): 整合常量
  - feat(store -> app -> theme): 配置主题菜单色
  - feat(store -> app -> theme): 暗黑模式设置
  - feat(store -> app -> theme): 主题颜色设置


## 2022年10月19日08:55:16
  - chore(引入 js-md5 密码加密)
  - perf(优化 axios 请求)
  - feat(layout -> header -> headerSetting): 主题色配置

## 2022年10月14日16:07:26
  - chore(引进 @vitejs/plugin-vue-jsx，可以使用 jsx/tsx 组件)
  - chore(修改 build 项目的路由配置信息)

## 2022年10月13日13:53:35
  - feat(store -> app/theme): 主题色配置

## 2022年10月12日14:13:17
  - fix(components -> songlist): 修复歌曲列表位置错乱问题
  - feat(utils -> app/browserType)：判定 客户端/浏览器 的系统信息
  - feat(utils -> format/index): 文件大小格式化
  - feat(utils -> cache/storage): 有效时长的缓存类（包含 localStorage、sessionstorage、cookie）
  - feat(utils -> format/random): 随机生成颜色
  - feat(utils -> file/index): 复制文本

## 2022年10月11日11:37:16
  - feat(views -> artist): 歌手详情页实现
  - types(types -> constant): 添加常量定义接口
  - chore(vite.config.ts、tsconfig.json): 路径别名配置
  - perf(utils -> http): 优化 http 请求的错误提示
  - fix(views -> artist、album、playlist): 修复只更改路由参数的id，页面数据无重新请求
  - feat(views -> artist): 歌手详情页 -> 加载更多功能实现
  - feat(layout -> header): 完善头部搜索点击触发的事件

## 2022年10月10日18:02:27
  - feat(album): 专辑详情页实现
  - perf(components -> songlist): 封装歌单列表详情页组件
  - style(styles -> theme.scss): 主题色配置 - 样式统一化

## 2022年10月9日12:17:40
  - feat(discover -> PersonalizedSongList): 个性化歌单页实现
  - feat(components -> Collapses): 新增折叠面板组件
  - feat(playlist -> index): 歌单详情页实现
  - feat(playlist -> Songlist): 歌单列表歌曲页

## 2022年10月8日11:54:40
  - feat(layout -> footer): 歌曲列表模块
  - feat(layoout -> menu): 菜单模块开发
  - perf(layout): 完善页面总体框
  - chore(引入 swiper 轮播图插件)
  - feat(discover -> banner): 推荐页轮播图实现
  - style(新添代码头部注释说明)

## 2022年10月7日12:29:58
  - feat(页面内容大框): 脚部页面功能实现

## 2022年10月4日08:16:07
  - feat(页面内容大框): 脚部页面实现
  - chore(引入 icon-park 图标库)

## 2022年10月1日22:34:49
  - perf(优化 axios 请求)

## 2022年9月30日16:04:43
  - feat(页面内容大框)：头部搜索框接口

## 2022年9月29日17:52:37
  - feat(页面内容大框): 头部内容框页面效果
  - feat(http请求封装)

## 2022年9月27日17:32:51
  - wip(页面底部歌曲信息)

## 2022年9月15日11:21:24
  - chore(vite配置封装)
  - wip(页面内容大框)

## 2022年9月14日10:00:55
  - chore(更新 stylelint 配置信息)
  - chore(更新 eslint 自动校验配置)
  - chore(引入 tailwindcss ，并配置 css 自动格式化与校验，以及忽略设定文件)
  - chore(引入 lodash、uuid 工具库、element-plus UI组件库、mockjs模拟数据)

## 2022年9月13日17:56:23
  - init(初始化项目)
  - chore(引入eslint、prettirer、pinia、typescript、axios、commitizen)
  - chore(修改配置信息)
  - chore(引入stylelint)
