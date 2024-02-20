/**
 * @ Author: willy
 * @ CreateTime: 2024-02-20 10:07:41
 * @ Modifier: willy
 * @ ModifierTime: 2024-02-20 19:51:05
 * @ Description: 数据库连接配置项
 */

export const DBConfig = {
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test', // 前面建的user表位于些数据库中
    port: 3306,
  },
  mongodb: {
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: '27027',
    database: 'test',
    authSource: 'admin',
    replicaSet: {
      name: '',
      members: [
        {
          host: 'localhost',
          port: '27017',
        },
        {
          host: 'localhost',
          port: '27027',
        },
        {
          host: 'localhost',
          port: '27037',
        },
      ],
    },
  },
} as const

export const mongodbConfig = {
  user: '',
  password: '',
  host: '127.0.0.1',
  port: '27017',
  database: 'test',
  authSource: 'admin',
  replicaSet: {
    name: '',
    members: [
      {
        host: 'localhost',
        port: '27017',
      },
      {
        host: 'localhost',
        port: '27027',
      },
      {
        host: 'localhost',
        port: '27037',
      },
    ],
  },
}

export const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test', // 前面建的user表位于些数据库中
  port: 3306,
}
