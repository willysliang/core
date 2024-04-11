/**
 * @ Author: willy
 * @ CreateTime: 2024-04-08 16:48:54
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-08 16:50:11
 * @ Description: 扩展声明
 */

declare namespace NodeJS {
  interface ProcessEnv {
    /** 基础路径 */
    NEXT_PUBLIC_BASEURL: string
  }
}

// 外部模块声明，已支持未使用Typescript的第三方库
declare module 'react-beautiful-dnd'

// 在window上添加自定义属性
declare interface Window {
  custom: any
}
