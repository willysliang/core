/**
 * @ Author: willy
 * @ CreateTime: 2023-11-28 20:52:16
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-02 21:38:57
 * @ Description: URL 相关
 */

/**
 * @description 当前环境是否为开发环境
 */
export const isEnvDev = import.meta.env.VITE_APP_ENV === 'development'

/**
 * @description 当前环境是否为正式环境
 */
export const isEnvProd = import.meta.env.VITE_APP_ENV === 'production'

/**
 * @description 当前容器是否为移动端
 */
export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
