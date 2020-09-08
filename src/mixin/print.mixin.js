import Print from '../utils/print'

export default {
  directives: {
    'print': {
      bind (el, binding, vnode) {
        let vue = vnode.context
        let closeBtn = true
        let id = ''
        el.addEventListener('click', () => {
          vue.$nextTick(() => {
            if (typeof binding.value === 'string') {
              id = binding.value
            } else if (typeof binding.value === 'object' && !!binding.value.id) {
              id = binding.value.id
              let ids = id.replace(new RegExp('#', 'g'), '')
              let elsdom = document.getElementById(ids)
              if (!elsdom) console.log('id in Error'), id = ''
            }
            if (id) {
              localPrint()
            } else {
              window.print()
            }
          })
        })
        const localPrint = () => {
          if (closeBtn) {
            closeBtn = false
            new Print({
              ids: id,
              standard: '',
              extraHead: binding.value.extraHead,
              extraCss: binding.value.extraCss,
              popTitle: binding.value.popTitle,
              endCallback () {
                closeBtn = true
              }
            })
          }
        }
      }
    }
  }
}
