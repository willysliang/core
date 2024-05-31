/**
 * @ Author: willysliang
 * @ Create Time: 2022-11-18 09:57:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-21 16:15:48
 * @ Description: 案例模块多语言
 */

export default {
  /** Zip */
  zip: {
    zipContentTip: 'An instance of JSZip represents a set of files. You can add them, delete them, and modify them. You can also import an existing zip file or generate one.',
    zipDownloadTip: 'FileSaver API is applicable to firefox, chrome, opera >= 15 and IE >= 10 (but not for compatibility view).',
    zipExportScene: 'Export compressed file scene: It is usually used to select some files and compress them for export, such as batch export of compressed image files from Blue Lake.',
  },

  /** 复制文本模块 */
  copyText: {
    copyTextContent: '文本复制常用于多数据拼接或者长文本内容复制场景。', // 复制文本使用场景
    clipboardJsTip: 'Copying text to the clipboard shouldn’t be hard. It shouldn’t require dozens of steps to configure or hundreds of KBs to load. But most of all, it shouldn’t depend on Flash or any bloated framework. That’s why clipboard.js exists.', // clipboardJs 框架描述
    execCommandCopyTextTip: 'The copy of execCommand text mainly depends on "document. execCommand (" copy ")" (but it is not recommended in MDN)', // execCommand 复制文本描述
    clipboardjsCopyTextTip: 'The copy of clipboardjs text mainly depends on the clipboardjs plug-in (but if there are too few references in the project, it will be wasteful because the introduction of plug-ins increases the project volume)', // clipboardjs 复制文本描述
  },
}
