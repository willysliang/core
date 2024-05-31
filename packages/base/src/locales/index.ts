/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-26 16:53:02
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-28 12:03:08
 * @ Description: vue-i18n 配置国际化多语言
 */

import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStoreWithOut } from '@store/app'
import { setHtmlPageLang, setLocalePool } from './helper'
import { localeMap } from './config'

/** 国际化容器的配置项 */
async function createI18nOptions () {
  const appStore = useAppStoreWithOut()
  // const locale = appStore.getLocale()
  const locale = appStore.localeType
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
    locale,
    defaultLocal,
    messages: {
      [locale]: message as { [key: string]: string },
    },
    fallbackLocale: localeMap.zh_CN,
    legacy: false,
    silentTranslationWarn: true, // 是否禁止本地化失败警告
    silentFallbackWarn: true, // 仅在根本没有可用的转换时生成警告，而不是在回退时
    globalInjection: true, // 全局生效$t
    missingWarn: false,
  }
}

const options = await createI18nOptions()

/** i18n 实例 */
export const i18n = createI18n(options)

/** 把国际化实例挂载到 app 上 */
export async function setupI18n (app: App) {
  app.use(i18n)
}
