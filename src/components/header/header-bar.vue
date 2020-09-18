<template>
  <header class="header">
    <div class="title-wrap" @click="linkTo('/home')">
      <div class="img-wrap">
        <img
          alt="dream-logo"
          class="logo-img"
          src="../../assets/images/dreambreeze.png"
        />
      </div>
      <div class="website-name">
        <vue-typer
          :pre-type-delay="500"
          :repeat="0"
          :text="$t('dream_breeze')"
          :type-delay="200"
        ></vue-typer>
      </div>
    </div>
    <ul class="menu-list">
      <li v-for="(item, index) in menuList" :key="index" class="menu-item">
        <a
          :class="isActiveLink(item.link)"
          class="menu-link"
          @click="linkTo(item.link)"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
    <ul class="action-list">
      <li class="action-item">
        <d-button
          v-if="!hasLogin"
          button-type="outline-primary"
          class="login-btn"
          @click.native="setShowLoginModal"
        >
          {{ $t('sign_in') }}
        </d-button>
        <d-button
          v-else
          button-type="outline-primary"
          class="login-btn"
          @click.native="logout"
        >
          {{ $t('logout') }}
        </d-button>
      </li>
      <li class="action-item">
        <d-button
          button-type="text"
          class="change-lang"
          @click.native="changeLanguage"
        >
          {{ currentLanguage() }}
        </d-button>
      </li>
    </ul>
    <login-modal
      v-if="showLoginModal"
      @close="closeLogin"
    ></login-modal>
  </header>
</template>
<script>
import {VueTyper} from 'vue-typer'
import loginModal from '../login-modal/login-modal'
import storeMixin from '@/mixin/store.mixin'
import api from '@/utils/api'

export default {
  name: 'header-bar',
  components: {
    VueTyper,
    loginModal,
  },
  mixins: [storeMixin],
  data() {
    return {
      language: {
        cn: 'En',
        en: '中',
      },
    }
  },
  computed: {
    menuList() {
      return [
        {
          label: this.$t('home'),
          link: '/home',
        },
        {
          label: this.$t('blog'),
          link: '/article',
        },
        {
          label: this.$t('code'),
          link: '/codes',
        },
        {
          label: this.$t('link'),
          link: '/links',
        },
        {
          label: this.$t('about'),
          link: '/about',
        },
      ]
    },
  },
  methods: {
    closeLogin() {
      this.setShowLoginModal(false)
    },
    currentLanguage() {
      return this.language[this.locale]
    },
    changeLanguage() {
      let locale = this.locale === 'cn' ? 'en' : 'cn'
      this.setLocale(locale)
      this.$i18n.locale = locale
    },
    isActiveLink(link) {
      return this.$route.path.indexOf(link) !== -1 ? 'active-link' : ''
    },
    linkTo(link) {
      if (this.$route.path !== link) this.$router.push(link)
    },
    logout() {
      api.logout().then(() => {
        this.setHasLogin(false)
        this.setUserInfo(null)
        window.location.reload()
      })
    }
  },
}
</script>
<style lang="scss" scoped type="text/scss">
.header {
  position: sticky;
  top: 0;
  height: 58px;
  z-index: 800;
  @include left;
  box-shadow: $box-shadow;
  background: $white;

  .title-wrap {
    @include left;
    cursor: pointer;
    width: 220px;

    .img-wrap {
      padding: 8px 15px;

      .logo-img {
        height: 40px;
      }
    }
  }

  .website-name {
    font-size: 20px;

    .vue-typer {
      cursor: pointer;
    }
  }

  .menu-list {
    list-style: none;
    flex: 1;
    @include left;

    .menu-item {
      .menu-link {
        display: inline-block;
        margin: 0 16px 0 0;
        padding: 4px 16px;
        border-radius: 5px;
        text-decoration: none;
        color: $font-400;
        border: 2px solid transparent;

        &.active-link {
          background: $theme-primary;
          color: $white;
        }

        &:hover {
          background: $theme-primary;
          color: $white;
        }

        &:active {
          border: $border 2px solid;
        }
      }
    }
  }

  .action-list {
    padding: 0 16px;
    @include center;

    .action-item {
      margin: 0 0 0 16px;

      .change-lang {
        border: 1px solid $font-400;
        color: $font-400;
        border-radius: 50%;
        padding: 0 0;
        font-size: 14px;
        width: 30px;
        min-width: 30px;
        height: 30px;
        text-decoration: none;

        &:hover,
        &:active {
          text-decoration: none;
          border: 1px solid $font-500;
          color: $font-500;
        }
      }

      .login-btn {
        height: 30px;
        font-size: 14px;
      }
    }
  }
}
</style>
