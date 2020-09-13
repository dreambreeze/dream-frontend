import DButton from './button/d-button'
import DIcon from './icon/d-icon'
import DModal from './modal/d-modal'

const components = [
  DButton,
  DIcon,
  DModal
]

const install = function (Vue) {
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default install
