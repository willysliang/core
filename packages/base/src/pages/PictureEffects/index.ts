/**
 * @ Author: willysliang
 * @ Create Time: 2023-01-05 21:30:43
 * @ Modified by: willysliang
 * @ Modified time: 2023-01-19 17:09:30
 * @ Description: PictureEffects 图片特效
 */

import PictureLibrary from './PictureLibrary.vue'
import PictureClip from './PictureClip.vue'
import PicturePie from './PicturePie.vue'
import PicturesNesting from './PicturesNesting.vue'

export const list = [
  { title: '图片库', components: PictureLibrary },
  { title: '图片悬浮分割', components: PictureClip },
  { title: '图片饼图', components: PicturePie },
  { title: '多图嵌套', components: PicturesNesting },
]
