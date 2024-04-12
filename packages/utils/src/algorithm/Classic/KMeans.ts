/**
 * @ Author: willy
 * @ CreateTime: 2024-04-12 18:07:05
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-12 19:55:53
 * @ Description: KMeans - K 均值
 */

import { logger } from '../../utils'

/** 单个点的坐标的接口 */
type IPoint = number[]

/** 单个簇的接口 */
interface ICluster {
  centroid: IPoint
  points: IPoint[]
}

/**
 * @class KMeans K均值
 * @memberof KMeans.constructor KMeans 类的构造函数接收数据点、簇的数量 k，以及最大迭代次数 maxIterations（可选）作为参数，并存储为实例属性
 * @memberof KMeans.euclideanDistance 计算两个点之间的欧几里得距离
 * @memberof KMeans.initializeCentroids 初始化质心，简单地从数据点中随机选择
 * @memberof KMeans.assignPointsToCentroids 将点分配给最近的质心，形成簇
 * @memberof KMeans.recalculateCentroids 重新计算质心
 * @memberof KMeans.centroidsChanged 检查质心是否变化
 * @memberof KMeans.run 运行算法(心脏): 先初始化质心，然后不断迭代更新簇和质心，直到质心不再变化或达到最大迭代次数为止。最终返回形成的簇数组
 */
export class KMeans {
  /** 一个包含多个点的数组，其中每个点是一个数值数组，表示在多维空间中的坐标 */
  private points: IPoint[]
  /** 存储最终形成的簇 */
  private clusters: ICluster[]
  /** 要将数据分成的簇的数量 */
  private k: number
  /** 算法迭代的最大次数，默认值为100 */
  private maxIterations: number

  constructor(points: IPoint[], k: number, maxIterations: number = 100) {
    this.points = points
    this.k = k
    this.maxIterations = maxIterations
    this.clusters = []
  }

  /**
   * @method euclideanDistance 计算两个点之间的欧几里得距离
   * @description 通过对两点各维度的差值的平方求和，然后取平方根来实现欧几里得距离计算。
   */
  private static euclideanDistance(point1: IPoint, point2: IPoint): number {
    return Math.sqrt(
      point1.reduce(
        (sum, current, i) => sum + Math.pow(current - point2[i], 2),
        0,
      ),
    )
  }

  /**
   * @method initializeCentroids 随机初始化质心
   * @description 先将输入的点随机打乱，然后选择前 k 个点作为初始质心。这是 K-means 算法中的一个简单但不够理想的质心初始化方法
   */
  private initializeCentroids(): IPoint[] {
    const shuffled = [...this.points].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, this.k)
  }

  /**
   * @method assignPointsToCentroids 将点分配给最近的质心，形成簇
   * @description 对于每个点，该方法计算其与各质心的距离，并将其分配给最近的质心所代表的簇
   */
  private assignPointsToCentroids(centroids: IPoint[]): void {
    this.clusters = centroids.map((centroid) => ({ centroid, points: [] }))

    this.points.forEach((point) => {
      let closest = Number.MAX_VALUE
      let index = 0
      centroids.forEach((centroid, i) => {
        const distance = KMeans.euclideanDistance(point, centroid)
        if (distance < closest) {
          closest = distance
          index = i
        }
      })
      this.clusters[index].points.push(point)
    })
  }

  /**
   * @method recalculateCentroids 重新计算簇的质心
   * @description 通过计算每个簇中所有点在每个维度上的平均值来实现的，从而得到新的质心
   */
  private recalculateCentroids(): IPoint[] {
    return this.clusters.map((cluster) => {
      const meanPoint = cluster.points[0].map(
        (_, i) =>
          cluster.points.reduce((acc, point) => acc + point[i], 0) /
          cluster.points.length,
      )
      return meanPoint
    })
  }

  /**
   * @method centroidsChanged 检查质心是否变化
   * @description 如果新计算的质心与旧质心在任一位置存在差异
   * @returns {boolean} 如果质心发生了变化，则返回 true；否则返回 false
   */
  private centroidsChanged(
    oldCentroids: IPoint[],
    newCentroids: IPoint[],
  ): boolean {
    return oldCentroids.some(
      (centroid, i) => KMeans.euclideanDistance(centroid, newCentroids[i]) > 0,
    )
  }

  /**
   * @method run K均值算法的核心逻辑 (KMeans 类的心脏)
   * @description 通过初始化质心，然后不断地将点分配给最近的质心并重新计算质心，直到质心不再变化或达到最大迭代次数，这个过程形成了最终的簇。
   * @returns {ICluster[]} 返回形成的簇的数组，供外部使用
   */
  public run(): ICluster[] {
    let centroids = this.initializeCentroids()
    let iterations = 0
    do {
      this.assignPointsToCentroids(centroids)
      const newCentroids = this.recalculateCentroids()
      if (
        !this.centroidsChanged(centroids, newCentroids) ||
        iterations >= this.maxIterations
      ) {
        break
      }

      centroids = newCentroids
      iterations++
    } while (true)

    return this.clusters
  }
}

/** K均值示例 */
logger.warn('K均值', KMeans.name)
const points: IPoint[] = [
  [1, 2],
  [1, 4],
  [1, 0],
  [10, 2],
  [10, 4],
  [10, 0],
]
const k = 2
const kMeans = new KMeans(points, k)
const clusters = kMeans.run()
console.log(clusters)
