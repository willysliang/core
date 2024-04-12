/**
 * @ Author: willy
 * @ CreateTime: 2024-04-12 19:01:02
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-12 19:58:20
 * @ Description: 网站图标
 */

/**
 * @class Favicon 网站图标类
 * @memberof Favicon.setFavicon 设置网站图标
 * @memberof Favicon.useEmojiFavicon 使用表情符号作为网站图
 */
export class Favicon {
  /** 设置网站图标 */
  public setFavicon(url: string): void {
    const favicon = document.querySelector(
      'link[rel="icon"]',
    ) as HTMLLinkElement | null
    if (favicon) favicon.href = url
    else {
      const link = document.createElement('link')
      link.rel = 'icon'
      link.href = url

      document.head.appendChild(link)
    }
  }

  /** 使用表情符号作为网站图标 */
  public useEmojiFavicon(emoji: string = '🎉'): void {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64

    const context = canvas.getContext('2d')
    context!.font = '64px serif'
    context!.fillText(emoji, 0, 64)

    const url = canvas.toDataURL()

    this.setFavicon(url)
  }
}
