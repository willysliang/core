/**
 * @ Author: willy
 * @ Create Time: 2023-10-27 10:40:11
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-07 17:56:19
 * @ Description: vite 构建文件
 */

/**
 * vue 解析核心
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

/**
 * vite 构建优化
 */
import fs from 'fs'
import path from 'path'
/** 获取 git 分支名 */
import { execSync } from 'child_process'
/** 顶层 await */
import topLevelAwait from 'vite-plugin-top-level-await'

/**
 * eslint 相关
 */
import eslintPlugin from 'vite-plugin-eslint'
import checkerEslint from 'vite-plugin-checker'

/**
 * 打包优化相关
 */
/** vite 打包压缩 gzip */
import viteCompression from 'vite-plugin-compression'

/**
 * postcss 解析
 */
import autoprefixer from 'autoprefixer'
import postCssPxToRem from 'postcss-pxtorem'

/** 读取 package.json 文件内容 */
const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'),
)

/** 获取 git 分支名 */
const getGitBranch = (): string => {
  /** git 分支名：默认为开发分支 */
  let branchName = 'development'
  try {
    branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch {}
  return branchName
}

/**
 * 优化：多页面应用，动态识别构建
 * 读取根目录下的所有 HTML 文件作为键值对存储，以便构建时动态输出
 */
const getAllBuildHtml = (): Record<string, string> => {
  const pages: Record<string, string> = {}
  const pageDir = path.join(__dirname, './')
  fs.readdirSync(pageDir).forEach((file) => {
    if (file.endsWith('.html')) {
      const name = file.replace(/\.html$/, '')
      const filePath = path.join(pageDir, file)
      pages[name] = filePath
    }
  })
  return pages
}

// serve
const API_BASE_URL = '/api'
const API_TARGET_URL = 'http://localhost:4000'

export default defineConfig(({ mode }) => {
  /** 简化 import.meta.env 的读取 */
  const importMetaEnv = loadEnv(mode, process.cwd(), '')
  /** 是否在调试模式（非正式环境） */
  const isProjDev = importMetaEnv.VITE_PROJ_ENV !== 'production'

  return {
    base: packageJSON.path,
    // root: path.resolve(__dirname, 'src'),
    root: '.',
    // cacheDir: 'node_modules/.pnpm/.vite', // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite
    build: {
      target: 'es2020', // es2020 支持 import.meta 语法
      outDir: 'core', // 指定输出路径
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
      cssCodeSplit: true, // 启用 CSS 代码拆分
      cssTarget: '', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      sourcemap: isProjDev, // 构建后是否生成 source map 文件
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件
      ssrManifest: false, // 构建不生成 SSR 的 manifest 文件
      ssr: undefined, // 生成面向 SSR 的构建
      minify: 'esbuild', // 指定使用哪种混淆器
      terserOptions: {}, // 传递给 Terser 的更多 minify 选项
      write: true, // 启用将构建后的文件写入磁盘
      emptyOutDir: true, // 构建时清空该目录
      // brotliSize: true, // 启用 brotli 压缩大小报告
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      watch: null, // 设置为 {} 则会启用 rollup 的监听器
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // input: {
        //   main: path.resolve(__dirname, 'index.html'),
        // },
        input: getAllBuildHtml(),
      },
    },
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types'),
        '@comp': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@api': path.resolve(__dirname, 'src/api/module'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@img': path.resolve(__dirname, 'src/assets'),
      },
      //  导入时想要忽略的扩展名列表 导入时想要省略的扩展名列表。不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
            ],
          }),
          postCssPxToRem({
            // 自适应，px>rem转换
            rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            selectorBlackList: ['.willy', '.px', 'body', 'html'], // 过滤掉 willy- 开头的 class，不进行rem转换
            exclude: '/node_modules', // 忽略包文件转换rem
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/var.scss";',
        },
      },
    },
    plugins: [
      /**
       * vue 解析核心
       */
      vue(),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
      ViteEjsPlugin({
        /** 项目运行模式 */
        PROJ_ENV: importMetaEnv.VITE_PROJ_ENV,
        /** 项目名称 */
        PROJ_TITLE: packageJSON.title,
        /** git 分支名 */
        BRANCH_NAME: getGitBranch(),
      }),

      /**
       * eslint 相关
       */
      /* eslint取消缓存 */
      eslintPlugin({
        cache: false, // 禁用 eslint 缓存
      }),
      /* eslint自动校检 */
      checkerEslint({
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,vue}"',
        },
      }),

      /**
       * 打包优化相关
       */
      viteCompression({
        verbose: true, // 默认即可
        disable: false, // 开启压缩(不禁用)，默认即可
        deleteOriginFile: false, // 删除源文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz', // 文件类型
      }),
    ],
    server: {
      // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      hmr: {
        overlay: false,
      },

      // 服务配置
      port: Number(importMetaEnv.VITE_PORT), // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动

      // 设置 https 代理
      proxy: {
        [API_BASE_URL]: {
          target: API_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
        },
      },
    },
  }
})
