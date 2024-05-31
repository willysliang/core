/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-27 18:22:31
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-28 12:03:22
 * @ Description: 国际化语言帮手
 */

import { LocaleType } from './config'

/** 设置网页的语言 */
export function setHtmlPageLang (locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

/** 加载的语言池 */
export const loadLocalePool: LocaleType[] = []

/** 语言设置池 */
export function setLocalePool (
  callback: (loadLocalePool: LocaleType[]) => void,
) {
  callback(loadLocalePool)
}
