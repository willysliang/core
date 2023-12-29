/**
 * @ Author: willy
 * @ CreateTime: 2023-12-24 16:39:57
 * @ Modifier: willy
 * @ ModifierTime: 2023-12-24 16:41:31
 * @ Description: 通用类
 */

import { logger } from './utils'

export const catchFunc = (error) => {
  logger.error(error)
}
