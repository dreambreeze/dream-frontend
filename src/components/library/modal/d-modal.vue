<template>
  <div ref="modal" class="d-modal-wrap">
    <div class="d-modal-mask"></div>
    <div
      :style="{width: widthSize}"
      class="d-modal"
    >
      <div class="d-modal-header">
        <p>{{ title }}</p>
        <button class="close-btn iconfont " @click="close">&#xe967;</button>
      </div>
      <div class="d-modal-content">
        <slot></slot>
      </div>
      <div class="d-modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-modal',
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'sm'
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    widthSize() {
      return this.width ? this.width : this.sizeList[this.size]
    }
  },
  data() {
    return {
      sizeList: {
        sm: '40vw',
        md: '60vw',
        lg: '80vw'
      }
    }
  },
  methods: {
    close() {
      this.$refs.modal.$delete
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
.d-modal-wrap {
  @include fullFixed;
  min-width: 350px;
  z-index: 2009;

  .d-modal-mask {
    @include fullFixed;
    @include mask;
  }

  .d-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $white;
    box-shadow: $box-shadow;
    border-radius: 5px;

    .d-modal-content {
      @include scroll;
      max-height: calc(80vh - 200px);
      padding: 12px 16px;
    }

    .d-modal-header {
      border-bottom: 1px solid $border-200;
      padding: 12px 16px;
      @include betweenCenter ;

      .close-btn {
        border-radius: 3px;
        border: 1px solid transparent;
        background: $white;
        width: 24px;
        height: 24px;
        text-align: center;
        padding: 0 0;
        outline: none;
        color: $font-300;

        &:hover {
          background: #EEEEEE;
        }
      }
    }

    .d-modal-footer {
      padding: 12px 16px;
      border-top: 1px solid $border-200;

      .btn-box {
        @include right;

        button {
          margin: 0 0 0 16px;
        }
      }
    }
  }
}

</style>