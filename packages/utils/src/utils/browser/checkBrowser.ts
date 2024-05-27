/**
 * @ Author: willysliang
 * @ CreateTime: 2024-04-13 13:37:54
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-04-13 14:31:35
 * @ Description: 检查浏览器环境
 */

/** 是否为浏览器环境 */
export const isBrowser = typeof window !== 'undefined'

/**
 * @description 当前容器是否为移动端
 */
export const isMobile: boolean =
  isBrowser &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent,
  )

/** 检查当前浏览器是否支持触摸事件 */
export const touchSupported = () => {
  const touchResult = {
    isSupportTouch: true,
    isEvent: 'touchstart',
  }
  touchResult.isSupportTouch = 'ontouchstart' in window
  touchResult.isEvent = touchResult.isSupportTouch ? 'touchstart' : 'click'
  return touchResult
}
