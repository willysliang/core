/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-10 14:00:34
 * @ Modified by: willysliang
 * @ Modified time: 2022-11-08 18:06:01
 * @ Description: 歌手相关的数据集
 */

/***
 * 歌手信息
 */
export interface Artist {
  albumSize: number
  alias: string[]
  briefDesc: string
  fansCount: number
  followed: boolean
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
}

export interface ArtistDetailIdentify {
  imageUrl?: any
  imageDesc: string
  actionUrl: string
}
export interface ArtistDetailArtistRank {
  rank: number
  type: number
}
export interface ArtistDetailArtist {
  id: number
  cover: string
  name: string
  transNames: string[]
  identities: string[]
  identifyTag?: any
  briefDesc: string
  rank: ArtistDetailArtistRank
  albumSize: number
  musicSize: number
  mvSize: number
}

export interface ArtistDetailSecondaryExpertIdentiy {
  expertIdentiyId: number
  expertIdentiyName: string
  expertIdentiyCount: number
}

/***
 * 歌手详情信息
 */
export interface ArtistDetail {
  videoCount: number
  identify: ArtistDetailIdentify
  artist: ArtistDetailArtist
  blacklist: boolean
  preferShow: number
  showPriMsg: boolean
  secondaryExpertIdentiy: ArtistDetailSecondaryExpertIdentiy[]
}

export interface ArtistDescTopicDataTopicContent {
  type: number
  id: number
  content: string
}
export interface ArtistDescTopicDataTopic {
  id: number
  addTime: number
  mainTitle: string
  title: string
  content: ArtistDescTopicDataTopicContent[]
  userId: number
  cover: number
  headPic: number
  shareContent: string
  wxTitle: string
  showComment: boolean
  status: number
  seriesId: number
  pubTime: number
  readCount: number
  tags: string[]
  pubImmidiatly: boolean
  auditor: string
  auditTime: number
  auditStatus: number
  startText: string
  delReason: string
  showRelated: boolean
  fromBackend: boolean
  rectanglePic: number
  updateTime: number
  reward: boolean
  summary: string
  memo?: any
  adInfo: string
  categoryId: number
  hotScore: number
  recomdTitle: string
  recomdContent: string
  number: number
}
export interface ArtistDescTopicDataCreatorExperts {
  1: string
}
export interface ArtistDescTopicDataCreator {
  userId: number
  userType: number
  nickname: string
  avatarImgId: number
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  signature: string
  createTime: number
  userName: string
  accountType: number
  shortUserName: string
  birthday: number
  authority: number
  gender: number
  accountStatus: number
  province: number
  city: number
  authStatus: number
  description?: any
  detailDescription?: any
  defaultAvatar: boolean
  expertTags?: any
  experts: ArtistDescTopicDataCreatorExperts
  djStatus: number
  locationStatus: number
  vipType: number
  followed: boolean
  mutual: boolean
  authenticated: boolean
  lastLoginTime: number
  lastLoginIP: string
  remarkName?: any
  viptypeVersion: number
  authenticationTypes: number
  avatarDetail?: any
  anchor: boolean
}

/** 歌手个人描述详情数据 */
export interface ArtistDescTopicData {
  topic: ArtistDescTopicDataTopic
  creator: ArtistDescTopicDataCreator
  shareCount: number
  commentCount: number
  likedCount: number
  liked: boolean
  rewardCount: number
  rewardMoney: number
  relatedResource?: any
  rectanglePicUrl: string
  coverUrl: string
  categoryId: number
  categoryName: string
  reward: boolean
  shareContent: string
  wxTitle: string
  addTime: number
  seriesId: number
  showComment: boolean
  showRelated: boolean
  memo?: any
  summary: string
  recmdTitle: string
  recmdContent: string
  commentThreadId: string
  mainTitle: string
  tags: string[]
  readCount: number
  url: string
  title: string
  id: number
  number: number
}

/** 歌手个人描述 */
export interface ArtistDesc {
  introduction: { ti: string; txt: string }[]
  briefDesc: string
  count: number
  topicData: ArtistDescTopicData[]
}
