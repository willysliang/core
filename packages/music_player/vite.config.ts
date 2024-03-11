/**
 * @ Author: willy
 * @ Create Time: 2023-06-25 19:21:38
 * @ Modifier by: willy
 * @ Modifier time: 2023-09-23 21:51:23
 * @ Description: vitets 构建文件
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import * as fs from 'fs'

/** 自定义组件name属性 */
// import DefineOptions from 'unplugin-vue-define-options/vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// eslint
import eslintPlugin from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

// element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// mockjs
import { viteMockServe } from 'vite-plugin-mock'

// vite 打包压缩 gzip
import viteCompression from 'vite-plugin-compression'

import server from './config/vite/server'

/** 包分析 */
// import { visualizer } from 'rollup-plugin-visualizer'

/**
 * 读取指定目录下的所有 HTML 文件，并将它们的文件名作为键，文件路径作为值，存储到一个名为 pages 的对象中。
 */
function getEntries(): { [entryAlias: string]: string } {
  const pages = {}
  const pageDir = path.join(__dirname, './')
  fs.readdirSync(pageDir).forEach((file) => {
    if (file.endsWith('.html')) {
      const name = file.replace(/\.html$/, '')
      const filePath = path.join(pageDir, file)
      console.log(filePath)
      pages[name] = filePath
    }
  })
  return pages
}

export default defineConfig({
  base: './',
  // root: path.resolve(__dirname, 'src'),
  root: '.',
  // cacheDir: 'node_modules/.pnpm/.vite', // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite
  publicDir: './public',
  build: {
    target: 'es2020', // es2020 支持 import.meta 语法
    outDir: './dist', // 指定输出路径
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    cssCodeSplit: true, // 启用 CSS 代码拆分
    cssTarget: '', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
    sourcemap: false, // 构建后是否生成 source map 文件
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
      input: getEntries(),
    },
  },
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types'),
      '@comp': path.resolve(__dirname, 'src/components'),
      '@view': path.resolve(__dirname, 'src/views'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@api': path.resolve(__dirname, 'src/api/module'),
      '@util': path.resolve(__dirname, 'src/utils'),
    },
    //  默认：['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']导入时想要忽略的扩展名列表 导入时想要省略的扩展名列表。不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    vue(),
    vueJsx(),
    // DefineOptions(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    /* eslint取消缓存 */
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
    }),
    /* eslint自动校检 */
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,vue}"',
      },
    }),
    /* 配置 element-plus */
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
    viteCompression({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 文件类型
    }),
    /** 包分析 */
    // visualizer({ open: true }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/var.scss";',
      },
    },
  },
  server,
})
