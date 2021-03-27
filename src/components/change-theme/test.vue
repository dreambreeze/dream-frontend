<template
>
  <div>
    <s-button button-type="outline-primary" @click.native="isShowModal = true">
      Change Theme
    </s-button>
    <s-modal
      :visible="isShowModal"
      size="lg"
      title="Change Theme"
      @close="handleClose"
    >
      <ul class="color-list">
        <li v-for="item in themeColors" :key="item.key" class="color-item">
          <span>{{ item.label }}</span>
          <div
            v-click-outside="handleHidePicker"
            @click.stop="handleShowColorPicker(item)"
          >
            <s-button button-type="outline-primary" size="sm">
              <span
                :style="{ backgroundColor: item.colors.hex }"
                class="color-square"
              ></span>
            </s-button>
            <color-picker
              v-if="item.visible"
              v-model="item.colors"
              class="color-picker"
            ></color-picker>
          </div>
        </li>
      </ul>
      <template #footer>
        <div class="footer-action">
          <s-button button-type="primary" @click.native="handleSave"
          >Save
          </s-button>
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script>
import { Photoshop } from 'vue-color'
import _ from 'lodash'
import clickOutside from 'vue-click-outside'

export default {
  name: 'change-theme',
  components: { colorPicker: Photoshop, },
  data() {
    return {
      isShowModal: true,
      themeColors: [],
    }
  },
  watch: {
    themeColors: {
      handler() {
        this.$forceUpdate()
        this.normalizeThemeConfigs()
      }, deep: true
    }
  },
  created() {
    this.normalizeThemeColors()
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
    handleClose() { this.isShowModal = false },
    handleSave() { this.handleClose() },
  },
  directives: { clickOutside }
}
</script>

<style lang="scss" scoped>
.color-list {
  min-height: 400px;
  list-style: none;

  .color-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 16px;
    position: relative;
  }

  .color-square {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 5px;
  }

  .color-picker {
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 2;

    &:before {
      position: absolute;
      top: -10px;
      right: 10px;
      display: block;
      width: 0px;
      height: 0px;
      border: 40px solid;
      border-color: #06a43a transparent transparent;
    }
  }
}
</style>
