# willys-core 核心库

## 基建
- git message 提交校验
- 项目打包校验项目格式是否正确，不合规则中断打包
- git 提交预先校验所提交内容，不合规则终端提交


## 博客(网站入口) index.html
- 自动读取项目中设定目录的 md 文档转化为 html 内容
- 自动打包 Html 文件然后上传到 github.io 上
- 开发成类似 vuepress 的页面，可配置显示
    - 左边导航栏
    - 顶部搜索栏
    - 右边 md 文档的标题


## 工具库 case.html
- utils 的工具类收集
    - 内容转换 format

- styles 的样式集合

- types 内容约束定义

- components 通用组件封装
    - 悬浮提示 Tips
    - 根据内容弹性修改背景图尺寸 BoxContainer
    - 日历组件 Calendar
    - 下拉选择组件 Select

- demos 案例收集
    - 上下滚动加载

- hooks 通用Hooks

- router 路由收集
    - 封装通用路由
    - 路由导航守卫
