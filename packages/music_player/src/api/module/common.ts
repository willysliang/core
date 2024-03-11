/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-10 15:55:50
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-10 15:59:02
 * @ Description: 通用接口
 */
import http from '@/utils/http'
import type { ICommentApi } from '@type/comments'

/** 获取评论 */
export const useComment = async (api: string, id: number, offset = 0, limit = 20) => {
  return await http.get<ICommentApi>({
    url: `/api${api}`,
    params: { id, limit, offset },
  })
}
