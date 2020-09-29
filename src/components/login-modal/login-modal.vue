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
          @click.native="close"
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
              @keydown.enter="submit"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback prop="password">
            <a-input-password
              v-model="modal.password"
              :placeholder="$t('please_enter_password')"
              size="large"
              @keydown.enter="submit"
            />
          </a-form-model-item>
          <a-form-model-item v-if="!isSignIn" has-feedback prop="confirm">
            <a-input-password
              v-model="modal.confirm"
              :placeholder="$t('please_confirm_password')"
              size="large"
              @keydown.enter="submit"
            />
          </a-form-model-item>
        </a-form-model>
        <div class="btn-box">
          <d-button
            :loading="loading"
            button-type="text"
            class="to-btn"
            @click.native="isSignIn = !isSignIn"
          >{{ goToText }}
          </d-button>
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
import crypt from '@/utils/crypt'
import _ from 'lodash'

export default {
  name: 'login-modal',
  mixins: [storeMixin, ruleMixin],
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(
          new Error(_.toString(this.$t('please_enter_password')))
        )
      } else {
        if (this.modal.confirm !== '') {
          this.$refs.formModal.validateField('confirm')
        }
        callback()
      }
    }
    const confirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(_.toString(this.$t('please_input_the_password_again'))))
      } else if (value !== this.modal.password) {
        callback(
          new Error(_.toString(this.$t('two_inputs_dont_match')))
        )
      } else {
        callback()
      }
    }
    return {
      wrapperCol: {span: 24},
      isSignIn: true,
      loading: false,
      modal: {
        name: '',
        password: '',
        confirm: '',
      },
      rules: {
        name: [this.validRequire(this.$t('please_enter_user_name')), {
          min: 2,
          max: 16,
          message: 'Length should be 3 to 16',
          trigger: 'blur'
        },],
        password: [{validator: validatePass, trigger: 'change'}],
        confirm: [{validator: confirmPass, trigger: 'change'}],
      },
    }
  },
  computed: {
    title() {
      return this.isSignIn ? this.$t('sign_in') : this.$t('sign_up')
    },
    goToText() {
      return !this.isSignIn ? this.$t('to_sign_in') : this.$t('to_sign_up')
    },
    saveModal() {
      let user = {...this.modal}
      delete user.confirm
      user.password = crypt.encrypt(_.trim(user.password)).toString()
      return user
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.isSignIn ? this.signIn() : this.signUp()
    },
    signIn() {
      this.$refs.formModal.validate((valid) => {
        if (!valid) return
        this.loading = true
        api
          .signIn(this.saveModal)
          .then((res) => {
            res.password = crypt.decrypt(res.password)
            this.setUserInfo(res)
            this.setHasLogin(true)
            window.location.reload()
            this.close()
          })
          .finally(() => {
            this.setHasLogin(true)
            this.modal.password = ''
            this.loading = false
          })
      })
    },
    signUp() {
      this.$refs.formModal.validate((valid) => {
        if (!valid) return
        this.loading = true
        api
          .signUp(this.saveModal)
          .then(res => {
            this.$message.success({
              content: this.$t('successful_operation')
            })
            res.password = crypt.decrypt(res.password)
            this.signIn(res)
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

    .to-btn {
      font-size: 14px;
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
