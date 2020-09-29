<template>
  <a-drawer
    :closable="false"
    :visible="visible"
    @close="close"
  >
    <ul class="action-list">
      <li class="action-item">
        <a-button
          button-type="outline-primary"
          class="action-button"
          @click.native="logout"
        >
          {{ $t('logout') }}
          <a-icon type="logout"/>
        </a-button>
      </li>
    </ul>
  </a-drawer>
</template>

<script>
import api from "@/utils/api";
import storeMixin from '@/mixin/store.mixin'

export default {
  name: "user-action",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  mixins: [storeMixin],
  data() {
    return {
      visible: false
    }
  },
  watch: {
    isShow(newValue) {
      this.visible = newValue
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    logout() {
      api.logout().then(() => {
        this.setHasLogin(false)
        this.setUserInfo(null)
        window.location.reload()
        this.close()
      })
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.action-list {
  width: 100%;
  padding: 0;

  .action-item {
    width: 100%;
    padding: 0;
    border-bottom: $border 1px solid;

    .action-button {
      border: 0;
      padding: 0;
      width: 100%;
      box-shadow: none !important;

      display: flex;
      align-items: center;
      justify-content: space-between;

      &:after {
        content: none;
      }
    }
  }
}


</style>