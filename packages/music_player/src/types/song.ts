/***
 * 歌曲播放详情接口
 */
export interface Song {
  name: string
  id: number
  pst: number
  t: number
  ar: {
    id: number
    name: string
    tns: any[]
    alias: any[]
  }[]
  alia: string[]
  pop: number
  st: number
  rt?: any
  fee: number
  v: number
  crbt?: any
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: any[]
    pic_str: string
    pic: number
  }
  dt: number
  h: {
    br: number
    fid: number
    size: number
    vd: number
  }
  m: {
    br: number
    fid: number
    size: number
    vd: number
  }
  l: {
    br: number
    fid: number
    size: number
    vd: number
  }
  a?: any
  cd: string
  no: number
  rtUrl?: any
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData?: any
  tagPicList?: any
  resourceState: boolean
  version: number
  songJumpInfo?: any
  entertainmentTags?: any
  single: number
  noCopyrightRcmd?: any
  rtype: number
  rurl?: any
  mst: number
  cp: number
  mv: number
  publishTime: number
  isLike?: boolean
}

/***
 * 歌曲路径接口
 */
export interface SongUrl {
  id: number
  url: string
  br: number
  size: number
  md5: string
  code: number
  expi: number
  type: string
  gain: number
  fee: number
  payed: number
  flag: number
  canExtend: boolean
  freeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
  }
  freeTimeTrialPrivilege: {
    resConsumable: boolean
    userConsumable: boolean
    type: number
    remainTime: number
  }
  urlSource: number
  freeTrialInfo: {
    start: number
    end: number
  }
}
