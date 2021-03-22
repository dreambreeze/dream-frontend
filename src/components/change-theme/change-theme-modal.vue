<template>
  <a-modal
    v-model="visible"
    :title="$t('change-theme')"
    @cancel="close"
    @close="close"
    @ok="submit"
  >
    <a-row class="mb-16">
      <a-list :data-source="themeColors" item-layout="horizontal">
        <a-list-item
          slot="renderItem"
          slot-scope="item"
          class="color-list-item"
        >
          <span>{{ $t(item.key) }}</span>
          <span
            :style="{ backgroundColor: item.colors.hex   }"
            class="color-square"
          ></span>
        </a-list-item>
      </a-list>
    </a-row>
    <color-picker v-model="item.colors" class="color-picker"></color-picker>
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
          key: 'primary_color',
          colors: {
            hex: '#2e317c'
          },
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
        console.log(val)
        for (let item of val) {
          document.body.style.setProperty(`--${ item.key }`, item.colors.hex)
        }
      },
      deep: true
    }
  },
  created() {
    document.body.style.setProperty('primary_color', '#7C2E3B')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
    },
    confirm() {
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
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
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
