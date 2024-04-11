'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

/**
 * @method StyledComponentsRegistry 为使用 styled-components 库的 React 组件提供服务端渲染支持
 * @description
    ServerStyleSheet 对象用于收集在服务端渲染期间生成的 CSS 样式，并在客户端渲染时将其注入到页面中。
    在组件的 useServerInsertedHTML 钩子中，使用 styledComponentsStyleSheet.getStyleElement() 方法来获取收集到的 CSS 样式，并将其插入到页面中。
    注意，我们在插入样式后调用了 styledComponentsStyleSheet.instance.clearTag() 方法来清空 ServerStyleSheet 对象中的样式，以避免在客户端渲染时重复插入样式。
    最后，如果代码运行在客户端环境中，组件会直接返回 children，否则会返回一个包裹了 children 的 StyleSheetManager 组件，以确保在服务端渲染期间能够正确地收集 CSS 样式。
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
