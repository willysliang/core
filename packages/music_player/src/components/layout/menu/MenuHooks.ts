import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuList } from '@/router/constant'
import { ThemeLayout } from '@/config/constant/theme'
import { useThemeStore } from '@store/app/theme'
import { storeToRefs } from 'pinia'

export function useMenuHooks() {
  /***
   * 判断主题是否为横栏
   */
  const { themeLayoutCurrent } = storeToRefs(useThemeStore())
  /** 判断主题是否为横栏 */
  const themeLayoutIsVertical = computed<boolean>(
    () => themeLayoutCurrent.value === ThemeLayout.MENU_TOP,
  )

  /** 获取路由 */
  const route = useRoute()
  const router = useRouter()

  /** 当前所选中的菜单项 */
  const currentMenuKey = ref<string>((route.meta?.name || '') as string)
  watch(
    () => route.meta.name,
    (newVal) => {
      currentMenuKey.value = newVal as string
    },
  )

  /** 选择菜单项 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMenuSelect = (name, indexPath) => {
    if (name !== 'logo') {
      router.push({ name, replace: false, query: { indexPath } })
    }
  }

  return {
    themeLayoutIsVertical,
    menuList,
    currentMenuKey,
    handleMenuSelect,
  }
}
