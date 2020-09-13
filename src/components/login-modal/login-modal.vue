<template>
  <d-modal
    :title="title"
    :width="'400px'"
    @close="cancel"
    class="login-modal"
  >
    <div class="login-form"></div>
    <template #footer>
      <div class="btn-box">
        <d-button @click.native="cancel" button-type="outline-secondary">{{$t('cancel')}}</d-button>
        <d-button>{{title}}</d-button>
      </div>
    </template>
  </d-modal>
</template>

<script>
export default {
  name: 'login-modal',
  data () {
    return {
      isLogin: true
    }
  },
  computed: {
    title () {
      return this.isLogin ? this.$t('signIn') : this.$t('signUp')
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
  
</style>