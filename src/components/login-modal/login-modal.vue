<template>
  <div class="d-modal">
    <div class="mask"></div>
    <div class="login-modal">
      <div>
        <h3 class="modal-header">{{ title }}</h3>
        <a-button
          class="close-btn"
          icon="close-circle"
          shape="circle"
          size="large"
          @click.native="cancel"
        />
        <a-form-model
          ref="formModal"
          :model="modal"
          :rules="rules"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item :span="24" has-feedback prop="name">
            <a-input
              v-model="modal.name"
              :placeholder="$t('please_enter_user_name')"
              autocomplete="off"
              size="large"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback prop="password">
            <a-input-password
              v-model="modal.password"
              :placeholder="$t('please_enter_password')"
              size="large"
            />
          </a-form-model-item>
        </a-form-model>
        <div class="btn-box">
          <d-button
            :loading="loading"
            button-type="outline-primary"
            @click.native="submit"
          >{{ title }}
          </d-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../utils/api'
import storeMixin from '../../mixin/store.mixin'
import ruleMixin from '../../mixin/rules.mixin'

export default {
  name: 'login-modal',
  mixins: [storeMixin, ruleMixin],
  data() {
    return {
      wrapperCol: {span: 24},
      isSignIn: true,
      loading: false,
      modal: {
        name: '',
        password: '',
      },
    }
  },
  computed: {
    rules() {
      return {
        name: [this.validRequire(this.$t('please_enter_user_name'))],
        password: [this.validRequire(this.$t('please_enter_password'))],
      }
    },
    title() {
      return this.isSignIn ? this.$t('signIn') : this.$t('signUp')
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    submit() {
      this.isSignIn ? this.signIn() : this.signUp()
    },
    signIn() {
      this.$refs.formModal.validate((valid) => {
        if (!valid) return
        this.loading = true
        api
          .signIn(this.modal)
          .then((res) => {
            this.setUserInfo(res)
            this.cancel()
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    signUp() {
      this.$refs.formModal.validate((valid) => {
        if (!valid) return
        this.loading = true
        api
          .signIn(this.modal)
          .then((res) => {
            this.setUserInfo(res)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
  },
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
    padding: 20px 16px;
    @include center;

    .modal-header {
      color: $theme-primary;
      text-align: center;
      padding: 0 0 18px 0;
      font-size: 18px;
    }

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
