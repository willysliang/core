/**
 * @ Author: willy
 * @ CreateTime: 2024-05-31 17:26:31
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-09-19 11:02:38
 * @ Description: 菜单的配置
 */

import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { menuListMap, type IPages } from '@mp/router/constant'
import { ThemeLayout } from '@/config/constant/theme'
import { useThemeStore } from '@store/app/theme'
import { useSettingStore } from '@store/app/setting'

/** 菜单的配置 */
export function useMenuConfig() {
  const route = useRoute()
  const router = useRouter()
  const { showPlayerModule } = storeToRefs(useSettingStore())

  /***
   * 判断主题是否为横栏
   */
  const { themeLayoutCurrent } = storeToRefs(useThemeStore())
  /** 判断主题是否为横栏 */
  const themeLayoutIsVertical = computed<boolean>(
    () => themeLayoutCurrent.value === ThemeLayout.MENU_TOP,
  )

  /**
   * 菜单的标题
   */
  const menuTitle = computed<string>(() =>
    showPlayerModule.value ? 'WILLY云音乐' : 'WILLY DEMO',
  )

  /**
   * 显示的菜单列表
   */
  const menuList = computed<IPages[]>(() => {
    let result: IPages[] = []
    result = result.concat(menuListMap.DEMO.list)
    if (showPlayerModule.value) result = result.concat(menuListMap.MUSIC.list)
    return result
  })

  /** 当前所选中的菜单项 */
  const currentMenuKey = ref<string>((route.meta?.name || '') as string)
  watch(
    () => route.meta.name,
    (newVal) => {
      currentMenuKey.value = newVal as string
    },
    { immediate: true },
  )

  /** 选择菜单项 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMenuSelect = (name, indexPath) => {
    if (name !== 'logo') {
      router.push({
        name,
        replace: false,
        query: { indexPath: encodeURIComponent(indexPath.join('/')) },
      })
    }
  }

  return {
    themeLayoutIsVertical,
    menuTitle,
    menuList,
    currentMenuKey,
    handleMenuSelect,
  }
}
