/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-04 15:33:02
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-04 16:51:32
 * @ Description: 多语言函数
 */

import type { Composer } from 'vue-i18n'
import { i18n } from '@/locales'

type I18nGlobalTranslation = Composer['t']
type I18nTranslationRestParameters = [string, any]

const getKey = (namespace: string | undefined, key: string) => {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

/** 多语言函数 hooks */
export function useI18nHooks (namespace?: string): {
  t: I18nGlobalTranslation
} {
  /** 默认函数 */
  const normalFn = {
    t: (key: string) => {
      return getKey(namespace, key)
    },
  }

  /** 如果 i18n 函数失效，则返回默认函数 */
  if (!i18n) {
    return normalFn
  }

  /** 获取 i18n 中的 t() 函数 */
  const { t } = i18n.global

  /** i81n 处理函数 */
  const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
    if (!key) return ''
    if (!key.includes('.') && !namespace) return key
    return t(getKey(namespace, key), ...(arg as I18nTranslationRestParameters))
  }

  /** 覆盖 i18n 中存储的值 */
  return Object.assign(i18n.global, { t: tFn })
}
