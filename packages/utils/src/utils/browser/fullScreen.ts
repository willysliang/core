/**
 * @ Author: willy
 * @ CreateTime: 2024-06-05 11:51:57
 * @ Modifier: willy
 * @ ModifierTime: 2024-06-05 11:52:11
 * @ Description: 全屏 - fullScreen
 */

declare global {
  interface Document {
    fullscreenElement?: Element | null
    mozFullScreenElement?: Element | null
    webkitFullscreenElement?: Element | null
    msFullscreenElement?: Element | null

    mozCancelFullScreen?: () => Promise<void>
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
  }

  interface HTMLElement {
    requestFullscreen?: () => Promise<void>
    mozRequestFullScreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
  }
}

/** 全屏展示/关闭 */
export const toggleFullScreen = (element: HTMLElement | any) => {
  const launchFullScreen = () => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen()
    } else {
      console.error('Fullscreen API is not supported.')
    }
  }

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen()
    } else {
      console.error('Fullscreen API is not supported.')
    }
  }

  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    launchFullScreen()
  } else {
    exitFullScreen()
  }
}
