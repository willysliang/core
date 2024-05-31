/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-28 12:03:44
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-28 18:07:57
 * @ Description: 使用国际化多语言的函数
 */

import { useAppStoreWithOut } from '@/store/app'
import { computed, unref } from 'vue'
import { i18n } from './'
import { LocaleType } from './config'
import { loadLocalePool, setHtmlPageLang } from './helper'

/** 设置 i18n 多语言 */
export function setI18nLanguage (locale: LocaleType) {
  const appStore = useAppStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    (i18n.global.locale as any).value = locale
  }

  appStore.setLocale(locale)
  setHtmlPageLang(locale)
}

/** 国际化多语言 hooks */
export function useLocaleHook () {
  const appStore = useAppStoreWithOut()

  /** 获取当前所选择的语言 */
  const getLocale = computed(() => appStore.getLocale)

  /** 设置 elementUi-plus 的语言 */
  const getElLocale = computed(
    () =>
      i18n.global.getLocaleMessage<{ EleLocale: any }>(unref(getLocale))
        .EleLocale,
  )

  /** 切换语言 */
  async function toggleLocale (locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = (await import(`./lang/${locale}.ts`)).default

    if (!langModule) return undefined

    const { message } = langModule
    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)

    return locale
  }

  return {
    getLocale,
    getElLocale,
    toggleLocale,
  }
}
