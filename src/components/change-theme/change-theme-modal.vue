<template>
  <a-modal
    v-model="visible"
    :title="$t('change-theme')"
    @cancel="close"
    @close="close"
    @ok="submit"
  >
    <a-row class="mb-16 content-wrap">
      <a-list :data-source="themeColors" item-layout="horizontal">
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          class="color-list-item"
        >
          <span>{{ $t(item.key) }}</span>
          <div
            v-click-outside="handleHidePicker"
            @click.stop="handleShowColorPicker(item)"
          >
          <span
            :style="{ backgroundColor: item.colors.hex   }"
            class="color-square"
          ></span>
            <div
              v-if="item.visible"
              class="color-picker"
            >
              <color-picker v-model="item.colors"></color-picker>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-row>
    <template #footer>
      <a-button @click.native="close">{{ $t('cancel') }}</a-button>
      <a-button :loading="loading" type="primary" @click.native="submit">
        {{ $t('submit') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { Chrome } from 'vue-color'
import clickOutside from "vue-click-outside";
import _ from "lodash";

export default {
  name: 'change-theme-modal.vue',
  components: { 'color-picker': Chrome },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      visible: false,
      currentColors: false,
      themeColors: [
        {
          key: 'primary',
          colors: {
            hex: '#2e317c'
          },
          visible: false,
        },
      ],
    }
  },
  watch: {
    isShow(newValue) {
      this.visible = newValue
    },
    themeColors: {
      handler(val) {
        for (let item of val) {
          document.body.style.setProperty(`--${ item.key }`, item.colors.hex)
        }
      },
      deep: true
    }
  },
  methods: {
    normalizeThemeColors() {
      const themeConfig = _.cloneDeep(this.$store.state.themeConfig)
      const themeColors = Object.keys(themeConfig).map((key) => {
        return {
          key,
          label: `${ _.startCase(key) } Color`,
          colors: { hex: themeConfig[key], },
          visible: false,
        }
      })
      this.$set(this, 'themeColors', themeColors)
    },
    normalizeThemeConfigs() {
      const themeColors = _.cloneDeep(this.themeColors)
      const themeConfig = {}
      themeColors.forEach((item) => {
        if (item.key === 'primary') {
          console.log(item.colors.hsl)
        }
        themeConfig[item.key] = item.colors.hex
      })
      this.$store.commit('setThemeConfig', themeConfig)
    },
    handleShowColorPicker(color) {
      const themeColors = this.themeColors
      for (const item of this.themeColors) {
        item.visible = item.key === color.key
      }
      this.$set(this, 'themeColors', themeColors)
    },
    handleHidePicker() {
      if (this.themeColors.every(item => item.isVisible === false)) return
      for (const item of this.themeColors) {
        item.visible = false
      }
    },
    close() {
      this.$emit('close')
    },
    submit() {
    },
    confirm() {
    },
  },
  directives: { clickOutside }
}
</script>

<style lang="scss" scoped type="text/scss">
.content-wrap {
  min-height: 500px;
}

.color-list-item {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .color-square {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.color-picker {
  position: absolute;
  right: 0;
  top: 40px;
  transform: translateX(-50%);
}
</style>
