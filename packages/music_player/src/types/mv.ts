/**
 * @ Author: willysliang
 * @ Create Time: 2022-10-11 09:30:11
 * @ Modified by: willysliang
 * @ Modified time: 2022-10-11 09:31:33
 * @ Description: MV 相关的数据集
 */

import type { Artist } from "./artist"

/** MV 信息 */
export interface Mv {
  id: number
  name: string
  status: number
  artistName: string
  artist: Artist
  imgurl16v9: string
  imgurl: string
  duration: number
  playCount: number
  publishTime: string
  subed: boolean
}

/** MV 详情 */
export interface MvUrl {
	id: number;
	url: string;
	r: number;
	size: number;
	md5: string;
	code: number;
	expi: number;
	fee: number;
	mvFee: number;
	st: number;
	promotionVo?: any;
	msg: string;
}
