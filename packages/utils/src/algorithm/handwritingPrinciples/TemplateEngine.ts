/**
 * @ Author: willy
 * @ CreateTime: 2024-05-13 14:02:39
 * @ Modifier: willy
 * @ ModifierTime: 2024-05-13 14:33:12
 * @ Description: JS模板引擎 - TemplateEngine
 */

import { logger } from '../../utils'

export const templateEngine = (html, options) => {
  // re 用于捕获所有以 <% 开头并以 %> 结尾的部分
  const re = /<%(.+?)%>/g
  const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g
  // 最终函数体为拼接完的 code，代码在 with 内运行。注意，严格模式下无法使用 with
  let code = 'var r=[];\n'
  let cursor = 0
  let match

  // 添加函数，推入非模板包裹内容到数组r，对于JS语法执行不推入数组
  const add = (line, js = false) => {
    if (js) {
      code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n'
    } else {
      code +=
        line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : ''
    }
    return add
  }

  // 使用 exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
  // 循环调用 add 函数分离文本内容和模板语法
  while ((match = re.exec(html))) {
    // html.slice(cursor, match.index) 用于截取没有被 <% %> 包裹的元素
    // match[1] 获取被 <% %> 包裹内的 JS 代码
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
  }

  // 处理剩余的html内容
  add(html.substr(cursor, html.length - cursor))

  // 完成代码字符串构建，并去除不必要的空白字符
  code = (code + 'return r.join("");').replace(/[\r\t\n]/g, '')

  let result
  try {
    // 使用Function构造函数创建新函数，并应用options
    // eslint-disable-next-line no-new-func
    result = new Function('obj', code).apply(options, [options])
  } catch (err: any) {
    console.error(`'${err.message}'`, ' in \n\nCode:\n', code, '\n')
  }
  return result
}

/** 案例 */
const data = {
  title: 'Sample Page',
  name: 'User',
  showList: true,
  list: ['Apple', 'Banana', 'Cherry'],
}
const htmlTemplate = `
<html>
<head>
    <title><%this.title%></title>
</head>
<body>
    <h1>Welcome, <%this.name%></h1>
    <% if(this.showList) { %>
        <ul>
            <% for(var i=0; i<this.list.length; i++) { %>
                <li><%this.list[i]%></li>
            <% } %>
        </ul>
    <% } %>
</body>
</html>
`
const renderedHtml = templateEngine(htmlTemplate, data)
logger.info('JS模板引擎', templateEngine.name)
console.log(renderedHtml)
