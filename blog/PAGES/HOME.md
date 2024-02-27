---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue 驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 会为每个页面生成预渲染的静态 HTML，同时在页面被加载的时候，将作为 SPA 运行。
---

# Hello VuePress

这里是正文内容，你可以像编写普通的 Markdown 内容一样编写。





![VuePress Logo](./images/hero.png)


## 自定义容器
```ts
::: <type> [title]
[content]
:::
```


::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::


::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码

```ts
console.log('你好，VuePress！')
```

:::



:::: code-group
::: code-group-item FOO

```ts
const foo = 'foo'
```

:::

::: code-group-item BAR

```ts
const bar = 'bar'
```

:::
::::
