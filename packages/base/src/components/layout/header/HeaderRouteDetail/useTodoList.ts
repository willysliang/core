/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-11 16:21:28
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 17:06:54
 * @ Description: todoList 弹窗相关(配置项/显隐)
 */

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { todoListConfigMap } from '@/pages/todolistConfig'
import type { ITodoListProps } from '@/components/TodoList/type.d'

/**
 * @desciption todoList 弹窗相关(配置项/显隐)
 */
export const useTodoList = () => {
  const route = useRoute()

  /**
   * 根据路由获取配置项
   */
  const todolistConfig = computed<ITodoListProps | undefined>(() => {
    // 根路由(包含二级路由)
    const curRootPath = route.path.match(/\/([^?]+)/)?.[1] ?? ''
    // 获取一级路由
    const level1Path = curRootPath.split('/')[0]

    return todoListConfigMap[level1Path]
  })

  /**
   * 弹窗显隐
   */
  const showTodoDialog = ref<boolean>(false)
  const handleShowTodoDrawer = () => {
    if (todolistConfig.value) showTodoDialog.value = true
  }

  return {
    todolistConfig,
    showTodoDialog,
    handleShowTodoDrawer,
  }
}
