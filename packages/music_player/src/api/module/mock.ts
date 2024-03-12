import http from '@/utils/http'

export const useMock = async () => {
  return await http.get<{
    code: number
    cookie: string
    token: string
  }>({
    url: '/mock/api/testmock',
    params: { },
  })
}
