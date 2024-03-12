/***
 * 最热查询详情接口
*/
export interface SearchHotDetail {
  searchWord: string
  score: number
  content: string
  source: number
  iconType: number
  iconUrl?: string
  url: string
  alg: string
}
export interface SearchSuggestAlbumsArtist {
  id: number
  name: string
  picUrl: string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  alia: string[]
  trans?: unknown
}
export interface SearchSuggestAlbums {
  id: number
  name: string
  artist: SearchSuggestAlbumsArtist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}
export interface SearchSuggestArtists {
  id: number
  name: string
  picUrl: string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  transNames: string[]
  alia: string[]
  trans: string
}
export interface SearchSuggestSongsArtists {
  id: number
  name: string
  picUrl?: unknown
  alias: unknown[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans?: unknown
}
export interface SearchSuggestSongsAlbumArtist {
  id: number
  name: string
  picUrl?: unknown
  alias: unknown[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans?: unknown
}
export interface SearchSuggestSongsAlbum {
  id: number
  name: string
  artist: SearchSuggestSongsAlbumArtist
  publishTime: number
  size: number
  copyrightId: number
  status: number
  picId: number
  mark: number
}
export interface SearchSuggestSongs {
  id: number
  name: string
  artists: SearchSuggestSongsArtists[]
  album: SearchSuggestSongsAlbum
  duration: number
  copyrightId: number
  status: number
  alias: unknown[]
  rtype: number
  ftype: number
  mvid: number
  fee: number
  rUrl?: unknown
  mark: number
}
export interface SearchSuggestPlaylists {
  id: number
  name: string
  coverImgUrl: string
  creator?: unknown
  subscribed: boolean
  trackCount: number
  userId: number
  playCount: number
  bookCount: number
  specialType: number
  officialTags?: unknown
  action?: unknown
  actionType?: unknown
  description?: unknown
  highQuality: boolean
}

export interface SearchSuggest {
  albums: SearchSuggestAlbums[]
  artists: SearchSuggestArtists[]
  songs: SearchSuggestSongs[]
  playlists: SearchSuggestPlaylists[]
  order: string[]
}
