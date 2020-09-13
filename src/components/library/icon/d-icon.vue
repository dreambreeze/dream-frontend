<template>
  <i
    :class="{ 'd-icon-rotate': rotate}"
    :style="{width:width+'px',height: height+'px', fontSize: width+ 'px'}"
    class="d-icon icon iconfont"
  >
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'DIcon',
  props: {
    iconCode: {
      type: String,
      default: 'icon'
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    rotate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      iconVM: null
    }
  }
}
</script>

<style lang="scss" scoped>
  @-webkit-keyframes loadingCircle {
    100% {
      transform: rotate(360deg);
      transform-origin: 50% 50%;
    }
  }
  .d-icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: none;
    text-rendering: optimizeLegibility;
    &.d-icon-rotate {
      animation: loadingCircle 1s infinite linear;
    }
    &::before {
      content: '';
    }
    > svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
