/**
 * @ Author: willy
 * @ CreateTime: 2023-11-28 20:52:16
 * @ Modifier: willy
 * @ ModifierTime: 2023-11-28 20:57:36
 * @ Description: URL 相关
 */

/** 当前环境是否为开发环境 */
export const isEnvDev = import.meta.env.VITE_APP_ENV === 'development'

/** 当前环境是否为正式环境 */
export const isEnvProd = import.meta.env.VITE_APP_ENV === 'production'
