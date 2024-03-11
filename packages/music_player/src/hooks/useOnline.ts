/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-01 17:04:54
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-02 17:11:32
 * @ Description: 系统网络连接状态检测函数
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

/***
 * @description 用户网络是否可用
 */
export function useOnlineHooks () {
  /** 系统网络是否可用 */
  const online = ref(true)

  /** 状态控制函数 */
  const showStatus = (status) => {
    online.value =
      typeof status === 'boolean' ? status : window.navigator.onLine

    if (online.value) {
      // ElMessage.success('网络连接正常！')
    } else {
      ElMessage.warning('网络中断！')
    }
  }

  /** 在页面加载后，设置正确的网络状态 */
  navigator.onLine ? showStatus(true) : showStatus(false)

  /** 页面挂载后监听网络状态的变化 */
  onMounted(() => {
    window.addEventListener('online', showStatus)
    window.addEventListener('offline', showStatus)
  })

  /** 页面销毁后移除监听网络状态的变化 */
  onUnmounted(() => {
    window.removeEventListener('online', showStatus)
    window.removeEventListener('offline', showStatus)
  })

  return { online }
}
