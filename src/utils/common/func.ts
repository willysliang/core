/**
 * @ Author: willy
 * @ CreateTime: 2024-01-09 20:02:48
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-09 20:03:00
 * @ Description: 通用函数类
 */

import { logger } from './index'

export const catchFunc = (error) => {
  logger.error(error)
}
