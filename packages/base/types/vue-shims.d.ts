declare module '*.vue' {
  import { type Component } from 'vue'
  const component: Component | JSX.Element | JSX.IntrinsicElements | any
  export default component
}
