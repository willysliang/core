/**
 * @ Author: willy
 * @ CreateTime: 2024-04-17 22:03:54
 * @ Modifier: willy
 * @ ModifierTime: 2024-04-17 22:05:57
 * @ Description: 构建一个虚拟 DOM
 */

interface IVNode {
  type: string
  props: {
    /** key 属性用于优化列表的处理 */
    key?: string | number
    [key: string]: string | unknown
  }
  children: (IVNode | string)[]
}

/**
 * @class VirtualDOM 虚拟DOM 实现原理
 * @memberof VirtualDOM#createElement 创建虚拟DOM节点
 * @memberof VirtualDOM#render 将 虚拟DOM 渲染成 真实DOM 节点
 * @memberof VirtualDOM#mount 将 虚拟DOM 生成的 DOM节点 渲染到指定容器中
 * @memberof VirtualDOM#updateProps 更新属性节点
 * @memberof VirtualDOM#updateChildren 递归更新子节点
 * @memberof VirtualDOM#useKeyUpdateChildren 新旧节点对比来更新子节点 （TODO--）
 * @memberof VirtualDOM#update 更新虚拟DOM节点
 */
export class VirtualDOM {
  private rootElement: HTMLElement

  constructor(rootElement: HTMLElement = document.body) {
    this.rootElement = rootElement
  }

  /**
   * @memberof VirtualDOM#createElement 创建虚拟DOM节点
   */
  public createElement(
    type: IVNode['type'],
    props: IVNode['props'] = {},
    ...children: IVNode['children']
  ): IVNode {
    return { type, props, children }
  }

  /**
   * @memberof VirtualDOM#render 将 虚拟DOM 渲染成 真实DOM 节点
   */
  public render(vnode: IVNode | string): HTMLElement | Text {
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode)
    }

    // 创建 DOM 节点
    const el = document.createElement(vnode.type)

    // 设置属性
    for (const [key, value] of Object.entries(vnode.props)) {
      el.setAttribute(key, String(value))
    }

    // 递归渲染并添加子节点
    for (const child of vnode.children) {
      el.appendChild(this.render(child))
    }
    return el
  }

  /**
   * @memberof VirtualDOM#mount 将 虚拟DOM 生成的 DOM节点 渲染到指定容器中
   */
  public mount(vnode: IVNode, container: HTMLElement = this.rootElement) {
    container.appendChild(this.render(vnode))
  }

  /**
   * @memberof VirtualDOM#updateProps 更新属性节点
   */
  private updateProps(
    newProps: IVNode['props'],
    oldProps: IVNode['props'],
    element: HTMLElement,
  ) {
    // 删除或更新现有属性
    for (const propName in oldProps) {
      if (!(propName in newProps)) {
        element.removeAttribute(propName)
      } else if (oldProps[propName] !== newProps[propName]) {
        element.setAttribute(propName, String(newProps[propName]))
      }
    }

    // 添加新属性
    for (const propName in newProps) {
      if (!(propName in oldProps)) {
        element.setAttribute(propName, String(newProps[propName]))
      }
    }
  }

  /**
   * @memberof VirtualDOM#updateChildren 递归更新子节点
   */
  private updateChildren(
    newVChildren: IVNode['children'],
    oldVChildren: IVNode['children'],
    parentElement: HTMLElement,
  ) {
    const commonLength = Math.min(oldVChildren.length, newVChildren.length)
    // 更新现有节点
    for (let i = 0; i < commonLength; i++) {
      this.update(newVChildren[i], oldVChildren[i], parentElement, i)
    }

    // 移除多余的旧子节点
    if (oldVChildren.length > newVChildren.length) {
      for (let i = commonLength; i < oldVChildren.length; i++) {
        if (typeof oldVChildren[i] !== 'string') {
          const child = parentElement.querySelector(
            `[data-key="${(oldVChildren[i] as IVNode).props.key}"]`,
          )
          if (child) parentElement.removeChild(child)
        }
      }
    }

    // 添加新的子节点
    if (newVChildren.length > oldVChildren.length) {
      for (let i = commonLength; i < newVChildren.length; i++) {
        parentElement.appendChild(this.render(newVChildren[i]))
      }
    }
  }

  /**
   * @memberof VirtualDOM#useKeyUpdateChildren 新旧节点对比来更新子节点
   */
  public useKeyUpdateChildren(
    newVChildren: IVNode['children'],
    oldVChildren: IVNode['children'],
    parentElement: HTMLElement,
  ) {
    const oldKeysMap = {}
    oldVChildren.forEach((child, index) => {
      const key = typeof child === 'string' ? null : child.props.key
      if (key) {
        oldKeysMap[key] = { child, index }
      }
    })

    const maxIndex = oldVChildren.length - 1
    newVChildren.forEach((newChild, index) => {
      const newKey = typeof newChild === 'string' ? null : newChild.props.key
      if (newKey && oldKeysMap[newKey]) {
        const { child: oldChild, index: oldIndex } = oldKeysMap[newKey]
        if (index !== oldIndex) {
          // 如果新旧位置不同，则需要移动节点
          const actualOldNode = parentElement.children[oldIndex]
          const referenceNode =
            index >= maxIndex ? null : parentElement.children[index]
          if (actualOldNode && referenceNode !== actualOldNode) {
            parentElement.insertBefore(actualOldNode, referenceNode)
          }
        }
        // 更新节点
        this.update(newChild, oldChild, parentElement)
      } else {
        // 如果没有找到对应的旧节点，或者该节点没有key，直接创建新节点并插入
        const newNode = this.render(newChild)
        const referenceNode =
          index >= maxIndex ? null : parentElement.children[index]
        parentElement.insertBefore(newNode, referenceNode)
      }
    })

    // 移除多余的旧节点
    oldVChildren.forEach((oldChild, oldIndex) => {
      if (
        !newVChildren.find((nc) => {
          const newKey = typeof nc === 'string' ? null : nc.props.key
          return newKey === oldChild?.props?.key
        })
      ) {
        const nodeToRemove = parentElement.children[oldIndex]
        if (nodeToRemove) {
          parentElement.removeChild(nodeToRemove)
        }
      }
    })
  }

  /**
   * @memberof VirtualDOM#update 更新虚拟DOM节点
   * @description
   * 1. 旧DOM节点 不存在，则直接渲染挂载 新DOM节点 到容器
   * 2. 新DOM节点 不存在，则直接清空容器内容
   * 3. 新旧DOM节点 内容都为字符串，则直接更新容器里面的文本内容
   * 4. 新旧DOM节点 类型不同，则直接替换 新DOM节点 到容器
   * 5. 新旧DOM节点 类型相同，则进行深度比较和更新
   */
  public update(
    newNode: IVNode | string,
    oldNode: IVNode | string,
    container: HTMLElement = this.rootElement,
    childNodesIndex: number = 0,
  ) {
    const newNodeIsString = typeof newNode === 'string'
    const oldNodeIsString = typeof oldNode === 'string'

    if (!oldNode) {
      // 旧节点不存在
      container.innerHTML = '' // 清空容器
      this.mount(
        newNodeIsString ? this.createElement('span', {}, newNode) : newNode,
        container,
      )
    } else if (!newNode) {
      // 新节点不存在
      container.innerHTML = ''
    } else if (newNodeIsString || oldNodeIsString) {
      // 如果两个虚拟节点都为字符串，则判断是否相同，如果不是，则更新节点内容
      if (newNode !== oldNode) {
        container.textContent = newNodeIsString ? newNode : ''
      }
    } else if (newNode.type !== oldNode.type) {
      // 如果类型不同，则直接替换内容
      container.replaceChild(
        this.render(newNode),
        container.childNodes[childNodesIndex] as Node,
      )
    } else {
      // 类型相同，则进行深度比较和更新
      const element = container.childNodes[childNodesIndex] as HTMLElement
      this.updateProps(newNode.props, oldNode.props, element)
      this.updateChildren(newNode.children, oldNode.children, element)
    }
  }
}

/** 示例 */
setTimeout(() => {
  // 假设我们有一个id为"root"的div作为容器
  const rootElement = document.getElementById('root')

  if (rootElement) {
    const vDom = new VirtualDOM(rootElement)

    const initialVNode = vDom.createElement(
      'div',
      { id: 'app' },
      vDom.createElement('h1', {}, 'Hello, Virtual DOM'),
      vDom.createElement('p', {}, 'This is an example.'),
    )
    const list = {
      type: 'ul',
      props: { class: 'list' },
      children: [
        { type: 'li', props: {}, children: ['item 1'] },
        { type: 'li', props: {}, children: ['item 2'] },
      ],
    }

    // 首次挂载虚拟DOM到实际DOM
    vDom.mount(initialVNode)
    vDom.mount(list)

    // 创建更新后的虚拟DOM结构
    const updatedVNode = vDom.createElement(
      'div',
      { class: 'container' },
      vDom.createElement('h1', {}, 'Hello, Updated VDOM'),
      vDom.createElement('p', {}, 'This example now includes updates.'),
      vDom.createElement('p', {}, 'Another paragraph.'),
    )

    // 模拟某个事件（如用户交互）导致的更新
    setTimeout(() => {
      vDom.update(updatedVNode, initialVNode, rootElement)
    }, 2000)
  }
}, 200)
