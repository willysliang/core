/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-26 17:05:13
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-26 17:06:51
 * @ Description: 国际化语言配置
 */

/** 国际化语言类型 */
export const localeMap = {
  zh_CN: 'zh_CN',
  en_US: 'en_US',
} as const

/** 国际化语言类型约束 */
export type LocaleType = keyof typeof localeMap

/** 国际化语言列表 */
export const localeList = [
  {
    lang: localeMap.en_US,
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  {
    lang: localeMap.zh_CN,
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
] as const
