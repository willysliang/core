/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-07 10:58:32
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-07 11:04:36
 * @ Description: mv 页
 */

import { MvUrl } from '@type/mv'
import http from '@/utils/http'

/** 获取 MV 路径 */
export async function useMvUrl (id: number) {
  const { data } = await http.get<{ data: MvUrl }>({
    url: '/api/mv/url',
    params: { id },
  })
  return data
}
