/**
 * @ Author: willy
 * @ CreateTime: 2024-01-04 17:21:38
 * @ Modifier: willy
 * @ ModifierTime: 2024-01-04 17:24:04
 * @ Description: 工具类
 */

import type { IContentInfoType, IStyleType } from './types'

/**
 * @description 计算在固定定位下弹层的位置
 */
export const calcFixedLocation = (placement: string): IStyleType => {
  const locationObj: IStyleType = {}

  if (
    placement.includes('bottom') ||
    ['right-end', 'left-end'].some((str) => placement.endsWith(str))
  ) {
    locationObj.bottom = 0
  }

  if (
    placement.includes('top') ||
    ['right-start', 'left-start'].some((str) => placement.endsWith(str))
  ) {
    locationObj.top = 0
  }

  if (
    placement.includes('right') ||
    ['bottom-end', 'top-end', 'center-end'].some((str) =>
      placement.endsWith(str),
    )
  ) {
    locationObj.right = 0
  }

  if (
    placement.includes('left') ||
    ['bottom-start', 'top-start', 'center-start'].some((str) =>
      placement.endsWith(str),
    )
  ) {
    locationObj.left = 0
  }

  if (placement.endsWith('--bottom') || placement.endsWith('--top')) {
    locationObj.left = '50%'
    locationObj.transform = 'translateX(-50%)'
  }

  if (
    ['--center-start', '--center-end', '--left', '--right'].some((str) =>
      placement.endsWith(str),
    )
  ) {
    locationObj.top = '50%'
    locationObj.transform = 'translateY(-50%)'
  }

  if (['--center'].some((str) => placement.endsWith(str))) {
    locationObj.top = '50%'
    locationObj.left = '50%'
    locationObj.transform = 'translate(-50%, -50%)'
  }

  return locationObj
}

/**
 * @description 计算在绝对定位下弹层的位置
 */
export const calcAbsoluteLocation = (
  placement: string,
  {
    contentHeight = 0,
    arrowHeight = 5,
    contentWidth = 0,
    unit = 'px',
  }: IContentInfoType,
): IStyleType => {
  const locationObj: IStyleType = {}

  // 主轴核心方位
  if (placement.includes('bottom')) {
    locationObj.top = contentHeight + arrowHeight + unit
  }
  if (placement.includes('top')) {
    locationObj.bottom = contentHeight + arrowHeight + unit
  }
  if (placement.includes('left')) {
    locationObj.right = contentWidth + arrowHeight + unit
  }
  if (placement.includes('right')) {
    locationObj.left = contentWidth + arrowHeight + unit
  }

  // 侧轴方位（四角 start end）
  if (['bottom-start', 'top-start'].some((str) => placement.endsWith(str))) {
    locationObj.left = 0
  }
  if (['bottom-end', 'top-end'].some((str) => placement.endsWith(str))) {
    locationObj.right = 0
  }
  if (['left-start', 'right-start'].some((str) => placement.endsWith(str))) {
    locationObj.top = 0
  }
  if (['left-end', 'right-end'].some((str) => placement.endsWith(str))) {
    locationObj.bottom = 0
  }

  // 侧轴方位（中间 center）
  if (['--bottom', '--top'].some((str) => placement.endsWith(str))) {
    locationObj.left = '50%'
    locationObj.transform = 'translateX(-50%)'
  }
  if (['--left', '--right'].some((str) => placement.endsWith(str))) {
    locationObj.top = '50%'
    locationObj.transform = 'translateY(-50%)'
  }

  return locationObj
}
