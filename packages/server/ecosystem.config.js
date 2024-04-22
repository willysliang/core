module.exports = {
  apps: [
    {
      name: 'server', // 启动项目的别名
      script: 'nodemon --exec ts-node ./app.ts', // 项目的启动文件
      cwd: './', // 项目的目录位置
      kill_timeout: 10000,
      args: '-e development', // 传递给脚本的参数
      interpreter: '', // 指定的脚本解释器
      interpreter_args: '', // 传递给解释器的参数
      wait_ready: true,
      watch: true, // 是否监听文件改动，而重新启动服务
      ignore_watch: ['node_modules', 'public', './node_modules', './data'], // 忽略监听的目录
      exec_mode: 'cluster_mode', // 应用启动模式，支持 fork 和 cluster 模式
      instances: 'max', // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
      error_file: './logs/app-err.log', // 错误日志文件
      out_file: './logs/app-out.log', // 正常日志文件
      merge_logs: true, // 设置追加日志而不是新建日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
      min_uptime: '60s', // 应用运行少于时间被认为是异常启动
      max_restarts: 30, // 最大异常重启次数
      autorestart: true, // 默认为 true, 发生异常的情况下自动重启
      restart_delay: '60', // 异常重启情况下，延时重启时间
      env: {
        NODE_ENV: 'production', // 环境参数，当前指定为生产环境
        REMOTE_ADDR: '',
        PM2_SERVE_PATH: '.', //静态服务路径
        PM2_SERVE_PORT: 3000, //静态服务器访问端口
      },
      env_dev: {
        NODE_ENV: 'development', // 环境参数，当前指定为开发环境
        REMOTE_ADDR: '',
        PM2_SERVE_PATH: '.', //静态服务路径
        PM2_SERVE_PORT: 3000, //静态服务器访问端口
      },
      env_test: {
        // 环境参数，当前指定为测试环境
        NODE_ENV: 'test',
        REMOTE_ADDR: '',
      },
    },
  ],
}
