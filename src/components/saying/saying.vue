<template>
  <div
    v-show="isShowSaying"
    ref="transitionWrap"
    :style="{ height: wrapHeight }"
    class="saying-wrap"
  >
    <div ref="heightAutoWrap" class="height-auto-wrap">
      <div class="saying-header">
        <p>{{ $t('proverbs') }}</p>
        <div class="saying-action">
          <a-button
            icon="more"
            shape="circle"
            size="small"
            @click="isShowSayings = true"
          ></a-button>
          <a-button
            icon="close"
            shape="circle"
            size="small"
            @click="isShowSaying = false"
          ></a-button>
        </div>
      </div>
      <pre class="markdown-body" v-html="marked(saying.content)"></pre>
      <p class="text-right">--{{ saying.author }}</p>
      <div class="action-wrap">
        <a-button
          icon="double-left"
          shape="circle"
          size="small"
          type="dashed"
          @click="showPreSaying"
        ></a-button>
        <a-button
          icon="sync"
          shape="circle"
          size="small"
          type="dashed"
          @click="getSayingRandom"
        ></a-button>
        <a-button
          icon="copy"
          shape="circle"
          size="small"
          @click="copySaying"
        ></a-button>
      </div>
    </div>
    <saying-list :isShow.sync="isShowSayings"></saying-list>
  </div>
</template>

<script>
import marked from 'marked'
import api from '@/utils/api'
import clipboardCopy from 'clipboard-copy'
import sayingList from './saying-list'

export default {
  name: 'saying',
  components: { sayingList },
  data() {
    return {
      isShowSaying: false,
      isShowSayings: false,
      saying: {
        author: '佚名',
        content: '生而孤独，活且坚强',
      },
      preSaying: {},
      timer: null,
      wrapHeight: '',
      randomTime: 60 * 1000,
    }
  },
  watch: {
    saying() {
      this.$nextTick(() => {
        this.clearTimer()
        this.timer = setInterval(this.getSayingRandom, this.randomTime)
        this.transitionHeight()
      })
    },
  },
  created() {
    this.getSayingRandom()
  },
  methods: {
    marked,
    async getSayingRandom() {
      this.preSaying = this.$lodash.cloneDeep(this.saying)
      const res = await api.getSayingRandom()
      if (this.$lodash.isEqual(this.saying, res)) {
        await this.getSayingRandom()
      } else {
        this.saying = this.$lodash.isEmpty(res) ? this.saying : res
      }
    },
    showPreSaying() {
      if (this.$lodash.isEqual(this.saying, this.preSaying)) {
        this.$message.info({
          content: this.$t('once_missed_may_be_eternal'),
        })
        return
      }
      this.saying = this.preSaying
    },
    copySaying() {
      clipboardCopy(this.saying.content).then(() => {
        this.$message.success({
          content: this.$t('copy_successfully'),
        })
      })
    },
    transitionHeight() {
      this.wrapHeight = `${ document.querySelector('.height-auto-wrap').clientHeight + 18 }px`
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.saying-wrap {
  position: fixed;
  bottom: 48px;
  right: 12px;
  background: $background-100;
  border-radius: 5px;
  box-shadow: $box-shadow-sm;
  width: 300px;
  height: 100px;
  transition: all 0.3s;
  padding: 8px 16px;
  z-index: 1;

  .height-auto-wrap {
    height: auto;
  }

  .markdown-body {
    max-height: 60vh;
    overflow-y: auto;
  }

  .saying-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 8px;
  }

  .saying-action {
    button {
      margin: 0 0 0 8px;
      border: none;
    }
  }

  .text-right {
    text-align: right;
  }

  .action-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      margin: 0 8px;
    }
  }
}
</style>
