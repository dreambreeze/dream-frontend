<template>
  <div class="d-modal">
    <div class="mask"></div>
    <div
      class="login-modal"
    >
      <div>
        <a-button class="close-btn" icon="close-circle" shape="circle" size="large" @click.native="cancel"/>
        <a-form-model :modal="userInfo" :span="12">
          <a-form-model-item has-feedback prop="name">
            <a-input v-model="userInfo.name" autocomplete="off" size="large"/>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="password">
            <a-input-password v-model="userInfo.password" size="large"/>
          </a-form-model-item>
        </a-form-model>
        <div class="btn-box">
          <d-button button-type="outline-primary" @click.native="submit">{{ title }}</d-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-modal',
  data() {
    return {
      isSignIn: true,
      userInfo: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    title() {
      return this.isSignIn ? this.$t('signIn') : this.$t('signUp')
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      this.isSignIn ? this.signIn() : this.signUp()
    },
    signIn() {
    },
    signUp() {
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
.d-modal {
  @include fullFixed;

  .mask {
    @include mask;
  }

  .login-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 400px;
    background: $white;
    box-shadow: $pop-shadow;
    border-radius: 5px;
    padding: 40px 16px 20px;
    @include center;

    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
      border: 0;
    }

    .header {
      text-align: center;
    }

    ::v-deep .ant-form {
      .ant-form-item {
        margin-bottom: 20px;
      }
    }

    .btn-box {
      color: $theme-primary;
      @include center;
    }
  }
}
</style>