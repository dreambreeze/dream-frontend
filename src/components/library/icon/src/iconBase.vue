<script>
import icon from './icons.js'
import _ from 'lodash'
export default {
  name: 'DIcon',
  props: {
    iconName: {
      type: String,
      default: 'icon',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
    iconPath: {
      type: String,
      default: '',
    },
    rotate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      iconVM: null,
    }
  },
  created() {
    this.iconVM = this.iconPath ? this.iconPath : icon[this.iconName]
  },
  watch: {
    iconName(val) {
      this.iconVM = icon[val]
    },
  },
  render(h) {
    const title = h('title', {
      attrs: {
        lang: 'en',
        id: `d-${this.iconName}-${_.uniqueId()}`,
      },
      domProps: {
        innerHTML: `${this.iconName} icon`,
      },
    })

    const g = h(
      'g',
      {
        attrs: { fill: this.iconColor },
        domProps: { innerHTML: this.iconVM },
      },
      this.$slots.default
    )

    const svg = h(
      'svg',
      {
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: this.width,
          height: this.height,
          role: 'presentation',
        },
      },
      [title, g]
    )

    const span = h(
      'span',
      {
        class: {
          's-icon': true,
          's-icon-rotate': this.rotate,
        },
        style: {
          lineHeight: this.height + 'px',
          height: this.height + 'px',
          width: this.width + 'px',
        },
      },
      [svg]
    )

    return span
  },
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}

.s-icon {
  position: relative;
  display: inline-block;
  font-style: normal;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  &.s-icon-rotate {
    animation: loadingCircle 1s infinite linear;
  }
  &::before {
    content: '\00a0';
  }
  > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
