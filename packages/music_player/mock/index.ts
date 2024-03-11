import { MockMethod } from 'vite-plugin-mock'

import user from './user'

export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => ({
      code: 0,
      message: 'ok',
      data: ['aa', 'bb']
    })
  },
  ...user,
] as MockMethod[]
