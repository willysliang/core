export class CacheUtils {
  /** 检测 API 是否在浏览器中实现 */
  get isSupport(): boolean {
    if ('caches' in window) return true
    else {
      console.warn('该浏览器版本不支持 Cache API')
      return false
    }
  }
}
