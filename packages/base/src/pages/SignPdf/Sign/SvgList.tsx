/**
 * @ Author: willysliang
 * @ CreateTime: 2025-07-10 14:31:27
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-10 14:44:21
 * @ Description: 所需的 svg 组件
 */

/** 画笔颜色 */
export const SvgStrockColor = ({ strokeStyle = '#34495e' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"></path>
    </svg>
  )
}

/** 画笔粗细 */
export const SvgStrockBrush = ({ strokeStyle = '#34495e' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  )
}

/** 签名操作 */
export const SvgSignatureAction = ({ strokeStyle = '#34495e' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

/** 清除签名 */
export const SvgClear = ({ strokeStyle = '#fff' }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

/** 保存签名 */
export const SvgSave = ({ strokeStyle = '#fff' }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  )
}

/** 清除签名 */
export const SvgExport = ({ strokeStyle = '#fff' }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeStyle}
      stroke-width="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )
}
