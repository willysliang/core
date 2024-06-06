/**
 * @ Author: willy
 * @ Create Time: 2023-10-27 10:40:11
 * @ Modifier by: willy
 * @ Modifier time: 2023-11-28 20:23:46
 * @ Description: vite 构建文件
 */

/**
 * vue 解析核心
 */
import { defineConfig, loadEnv } from 'vite'
import { baseVuePlugin } from './config/vite/plugin/base'
import { mdPlugins } from './config/vite/plugin/mdPlugin'
import { eslintPlugins } from './config/vite/plugin/eslintPlugins'
import { buildPlugins } from './config/vite/plugin/buildPlugin'
import { elementUiPlugins } from './config/vite/plugin/elementUiPlugin'
import { getAllBuildHtml } from './config/vite/utils'
import { cssConfig } from './config/vite/css'
import { serverConfig } from './config/vite/server'

/**
 * vite 构建优化
 */
import fs from 'fs'
import path from 'path'

// mockjs
import { viteMockServe } from 'vite-plugin-mock'

/** 读取 package.json 文件内容 */
const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'),
)

// serve

export default defineConfig(({ mode }) => {
  /** 简化 import.meta.env 的读取 */
  const importMetaEnv = loadEnv(mode, process.cwd(), '')
  /** 是否在调试模式（非正式环境） */
  const viteAppIsDev = importMetaEnv.VITE_APP_ENV !== 'production'

  return {
    base: packageJSON.path,
    // root: path.resolve(__dirname, 'src'),
    root: '.',
    // cacheDir: 'node_modules/.pnpm/.vite', // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite
    publicDir: './public',
    build: {
      target: 'esnext', // es2020 支持 import.meta 语法
      outDir: '../../dist', // 指定输出路径
      assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
      cssCodeSplit: true, // 启用 CSS 代码拆分
      cssTarget: '', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      sourcemap: viteAppIsDev, // 构建后是否生成 source map 文件
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
        // external: [/\blog\/.*\.(png|jpe?g|gif|svg|webp)$/i],
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
        '@styles': path.resolve(__dirname, 'src/styles'),

        '@mp': path.resolve(__dirname, 'src/entries/music-player'),
      },
      //  导入时想要忽略的扩展名列表 导入时想要省略的扩展名列表。不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    css: cssConfig(),
    plugins: [
      ...baseVuePlugin(importMetaEnv, packageJSON),
      ...mdPlugins(),
      ...eslintPlugins(),
      ...buildPlugins(),
      ...elementUiPlugins(),
      /* 配置 mockjs */
      viteMockServe({
        mockPath: './mock',
        localEnabled: true,
        prodEnabled: false, // 实际开发请关闭，会影响打包体积
        // https://github.com/anncwb/vite-plugin-mock/issues/9
        injectCode: `
       import { setupProdMockServer } from './mock/_createProdMockServer';
       setupProdMockServer();
       `,
      }),
    ],
    server: serverConfig(importMetaEnv.VITE_PORT),
  }
})
