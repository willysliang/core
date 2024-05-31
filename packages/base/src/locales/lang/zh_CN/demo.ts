/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-18 09:57:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-21 16:15:24
 * @ Description: 案例模块多语言
 */

export default {
  /** Zip */
  zip: {
    zipContentTip: 'JSZip的实例表示一组文件。您可以添加它们、删除它们、修改它们。您还可以导入现有的zip文件或生成一个。',
    zipDownloadTip: 'FileSaver API适用于firefox、chrome、opera >= 15、IE >= 10(但不适用于兼容性视图)。', // 下载提示
    zipExportScene: '导出压缩文件场景：通常用于选择某些文件，并将其压缩导出的场景，比如蓝湖批量导出压缩图片文件等。', // 导出场景
  },

  /** 复制文本模块 */
  copyText: {
    copyTextContent: '文本复制常用于多数据拼接或者长文本内容复制场景。', // 复制文本使用场景
    clipboardJsTip: '将文本复制到剪贴板并不难。它不需要几十个步骤来配置，也不需要加载数百KB。但最重要的是，它不应该依赖于Flash或任何臃肿的框架。这就是为什么 clipboard.js 存在。', // clipboardJs 框架描述
    execCommandCopyTextTip: 'execCommand 复制文本主要依赖于 "document.execCommand("copy")" 来实现（但在 MDN 中不推荐该做法）', // execCommand 复制文本描述
    clipboardjsCopyTextTip: 'clipboardjs 复制文本主要依赖于 clipboardjs 插件来实现（但若在项目中引用过少，则会因为引入插件提高了项目体积而显得比较浪费）', // clipboardjs 复制文本描述
  },
}
