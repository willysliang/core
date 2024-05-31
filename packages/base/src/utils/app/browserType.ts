/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-12 14:55:29
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-12 18:14:39
 * @ Description: 判定 客户端/浏览器 的系统信息
 */

/**
 * @description 获取用户浏览器版本及系统信息 & 中英文处理
 * @param {string='zh-cn' | 'en'} lang 返回中文的信息还是英文的
 * @constructor
 * @return 根据中英文返回使用的浏览器信息
 */
function browserType (lang: 'zh-cn' | 'en' = 'en') {
  /***
   * 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
   */
  const userAgent = navigator.userAgent.toLocaleLowerCase()
  /** 判定系统正则真假 */
  const testUserAgent = (regexp) => regexp.test(userAgent)
  const testVersion = (regexp) =>
    userAgent
      .match(regexp)
      ?.toString()
      .replace(/[^0-9|_.]/, '')
      .replace(/_/g, '.')

  /***
   * @module 系统类型
   * - 若为已知系统判定，则获取 Map 中的 true 属性即可
   * - 若都为 false，则为位置的系统
   */
  const systemType =
    new Map([
      [testUserAgent(/windows|win32|win64|wow32|wow64/g), 'windows'], // windows系统
      [testUserAgent(/macintosh|macintel/g), 'macos'], // macos系统
      [testUserAgent(/x11/g), 'linux'], // linux系统
      [testUserAgent(/android|adr/g), 'android'], // android系统
      [testUserAgent(/ios|iphone|ipad|ipod|iwatch/g), 'ios'], // ios系统
    ]).get(true) || 'unknow'

  /***
   * @module 系统版本
   * - 根据系统类型来判定系统版本号
   */
  const systemVersion =
    new Map([
      [
        'windows',
        new Map([
          [testUserAgent(/windows nt 5.0|windows 2000/g), '2000'], // windows 2000
          [testUserAgent(/windows nt 5.1|windows xp/g), 'xp'], // windows xp
          [testUserAgent(/windows nt 5.2|windows 2003/g), '2003'], // windows 2003
          [testUserAgent(/windows nt 6.0|windows vista/g), 'vista'], // windows vista
          [testUserAgent(/windows nt 6.1|windows 7/g), '7'], // win 7
          [testUserAgent(/windows nt 6.2|windows 8/g), '8'], // win 8
          [testUserAgent(/windows nt 6.3|windows 8.1/g), '8.1'], // win 8.1
          [testUserAgent(/windows nt 10.0|windows 10/g), '10'], // win 10
        ]).get(true),
      ],
      ['macos', testUserAgent(/os x [\d._]+/g)], // mac
      ['android', testUserAgent(/android [\d._]+/g)], // 安卓
      ['ios', testUserAgent(/os [\d._]+/g)], // ios
    ]).get(systemType) || 'unknow'

  /***
   * @module 系统平台
   * - 根据系统类型来判定系统平台
   */
  let systemPlatform = 'unknow'
  if (
    systemType === 'windows' ||
    systemType === 'macos' ||
    systemType === 'linux'
  ) {
    systemPlatform = 'desktop' // 桌面端
  } else if (
    systemType === 'android' ||
    systemType === 'ios' ||
    testUserAgent(/mobile/g)
  ) {
    systemPlatform = 'mobile' // 移动端
  }

  /***
   * @module 系统内核和载体
   */
  const [engine = 'unknow', supporter = 'unknow'] = new Map([
    [
      testUserAgent(/applewebkit/g),
      [
        'webkit',
        new Map([
          // webkit内核
          [testUserAgent(/safari/g), 'safari'], // safari浏览器
          [testUserAgent(/chrome/g), 'chrome'], // chrome浏览器
          [testUserAgent(/opr/g), 'opera'], // opera浏览器
          [testUserAgent(/edge/g), 'edge'], // edge浏览器
        ]).get(true),
      ] || 'unknow',
    ], // [webkit内核, xxx浏览器]
    [
      testUserAgent(/gecko/g) && testUserAgent(/firefox/g),
      ['gecko', 'firefox'],
    ], // [gecko内核,firefox浏览器]
    [testUserAgent(/presto/g), ['presto', 'opera']], // [presto内核,opera浏览器]
    [testUserAgent(/trident|compatible|msie/g), ['trident', 'iexplore']], // [trident内核,iexplore浏览器]
  ]).get(true) || ['unknow', 'unknow']

  /** 内核版本 */
  const engineVs =
    new Map([
      ['webkit', testVersion(/applewebkit\/[\d._]+/g)],
      ['gecko', testVersion(/gecko\/[\d._]+/g)],
      ['presto', testVersion(/presto\/[\d._]+/g)],
      ['trident', testVersion(/trident\/[\d._]+/g)],
    ]).get(engine) || 'unknow'

  /** 载体版本 */
  const supporterVs =
    new Map([
      ['firefox', testVersion(/firefox\/[\d._]+/g)],
      ['opera', testVersion(/opr\/[\d._]+/g)],
      ['iexplore', testVersion(/(msie [\d._]+)|(rv:[\d._]+)/g)],
      ['edge', testVersion(/edge\/[\d._]+/g)],
      ['safari', testVersion(/version\/[\d._]+/g)],
      ['chrome', testVersion(/chrome\/[\d._]+/g)],
    ]).get(supporter) || 'unknow'

  /***
   * @module 外壳和外壳版本
   */
  const [shell = 'none', shellVs = 'unknow'] = new Map([
    [
      testUserAgent(/micromessenger/g),
      ['wechat', testVersion(/micromessenger\/[\d._]+/g)],
    ], // [微信浏览器,]
    [testUserAgent(/qqbrowser/g), ['qq', testVersion(/qqbrowser\/[\d._]+/g)]], // [QQ浏览器,]
    [testUserAgent(/ucbrowser/g), ['uc', testVersion(/ucbrowser\/[\d._]+/g)]], // [UC浏览器,]
    [testUserAgent(/qihu 360se/g), ['360', 'unknow']], // [360浏览器(无版本),]
    [
      testUserAgent(/2345explorer/g),
      ['2345', testVersion(/2345explorer\/[\d._]+/g)],
    ], // [2345浏览器,]
    [testUserAgent(/metasr/g), ['sougou', 'unknow']], // [搜狗浏览器(无版本),]
    [testUserAgent(/lbbrowser/g), ['liebao', 'unknow']], // [猎豹浏览器(无版本),]
    [testUserAgent(/maxthon/g), ['maxthon', testVersion(/maxthon\/[\d._]+/g)]], // [遨游浏览器,]
  ]).get(true) || ['none', 'unknow']

  return {
    'zh-cn': Object.assign(
      {
        内核: engine, // 内核: webkit gecko presto trident
        内核版本: engineVs, // 内核版本
        平台: systemPlatform, // 平台: desktop mobile
        载体: supporter, // 载体: chrome safari firefox opera iexplore edge
        载体版本: supporterVs, // 载体版本
        系统: systemType, // 系统: windows macos linux android ios
        系统版本: systemVersion, // 系统版本
      },
      shell === 'none'
        ? {}
        : {
            外壳: shell, // 外壳: wechat qq uc 360 2345 sougou liebao maxthon
            外壳版本: shellVs, // 外壳版本
          },
    ),
    en: Object.assign(
      {
        engine, // 内核: webkit gecko presto trident
        engineVs, // 内核版本
        systemPlatform, // 平台: desktop mobile
        supporter, // 载体: chrome safari firefox opera iexplore edge
        supporterVs, // 载体版本
        systemType, // 系统: windows macos linux android ios
        systemVersion, // 系统版本
      },
      shell === 'none'
        ? {}
        : {
            shell, // 外壳: wechat qq uc 360 2345 sougou liebao maxthon
            shellVs, // 外壳版本
          },
    ),
  }[lang]
}

export default browserType
