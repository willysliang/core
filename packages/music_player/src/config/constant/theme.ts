/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-20 17:23:52
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-11 18:02:03
 * @ Description: 主题配置的常量
 */

import {
  themeDark,
  themeLight,
  themeRealDark,
  menuSide,
  menuTop,
} from '@/assets/icons/theme'

interface Theme {
  label: string // 显示的提示
  value: any // 要展现的内容
  key?: number | string // 关键词
}

/** 导航模式枚举对象 */
export enum ThemeStype {
  THEME_DARK,
  THEME_LIGHT,
  THEME_REAL_DARK,
}
/** 主题风格 */
export const themeStyle: Theme[] = [
  {
    label: '亮色主题风格',
    value: themeLight,
    key: ThemeStype.THEME_LIGHT,
  },
  {
    label: '暗色主题风格',
    value: themeDark,
    key: ThemeStype.THEME_DARK,
  },
  {
    label: '暗黑模式',
    value: themeRealDark,
    key: ThemeStype.THEME_REAL_DARK,
  },
]

/** 导航模式枚举对象 */
export enum ThemeLayout {
  MENU_SIDE,
  MENU_TOP,
}
/** 导航模式（布局方式） */
export const themeLayout: Theme[] = [
  {
    label: '侧边菜单布局',
    value: menuSide,
    key: ThemeLayout.MENU_SIDE,
  },
  {
    label: '顶部菜单布局',
    value: menuTop,
    key: ThemeLayout.MENU_TOP,
  },
]

/** 主题颜色 */
export const themeColors = [
  {
    title: '拂晓蓝（默认）',
    key: 'daybreak',
    value: 'rgb(24, 144, 255)',
  },
  {
    title: '薄暮',
    key: 'dust',
    value: 'rgb(245, 34, 45)',
  },
  {
    title: '火山',
    key: 'volcano',
    value: 'rgb(250, 84, 28)',
  },
  {
    title: '日暮',
    key: 'sunset',
    value: 'rgb(250, 173, 20)',
  },
  {
    title: '明青',
    key: 'cyan',
    value: 'rgb(19, 194, 194)',
  },
  {
    title: '极光绿',
    key: 'green',
    value: 'rgb(82, 196, 26)',
  },
  {
    title: '极客蓝',
    key: 'geekblue',
    value: 'rgb(47, 84, 235)',
  },
  {
    title: '酱紫',
    key: 'purple',
    value: 'rgb(114, 46, 209)',
  },
  {
    title: '雅黑',
    key: 'black',
    value: 'rgb(0, 0, 0)',
  },
] as const
