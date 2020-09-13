<template>
  <header class="header">
    <div @click="linkTo('/home')" class="title-wrap">
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
      <li :key="index" class="menu-item" v-for="(item, index) in menuList">
        <a
          :class="isActiveLink(item.link)"
          @click="linkTo(item.link)"
          class="menu-link"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
    <ul class="action-list">
      <li class="action-item">
        <d-button @click.native="showLoginModal = true" button-type="outline-secondary" class="login-btn">
          {{ $t('signIn') }}
        </d-button>
      </li>
      <li class="action-item">
        <d-button @click.native="changeLanguage" button-type="text" class="change-lang">
          {{ currentLanguage() }}
        </d-button>
      </li>
    </ul>
    <login-modal
      @cancel="showLoginModal = false"
      v-if="showLoginModal"
    ></login-modal>
  </header>
</template>
<script>
import { VueTyper } from 'vue-typer'
import loginModal from '../login-modal/login-modal'

export default {
  name: 'header-bar',
  components: {
    VueTyper,
    loginModal
  },
  data () {
    return {
      menuList: [
        {
          label: this.$t('home'),
          link: '/home'
        },
        {
          label: this.$t('blog'),
          link: '/article/article-list'
        },
        {
          label: this.$t('code'),
          link: '/codes'
        },
        {
          label: this.$t('link'),
          link: '/links'
        },
        {
          label: this.$t('about'),
          link: '/about'
        }
      ],
      language: {
        cn: 'En',
        en: '中'
      },
      localLang: localStorage.getItem('local') || 'cn',
      showLoginModal: false
    }
  },
  created () {
  },
  methods: {
    currentLanguage () {
      return this.language[this.localLang]
    },
    changeLanguage () {
      let local = this.localLang === 'cn' ? 'en' : 'cn'
      localStorage.setItem('local', local)
      this.$i18n.locale = local
      window.location.reload()
    },
    isActiveLink (link) {
      return this.$route.path === link ? 'active-link' : ''
    },
    linkTo (link) {
      if (this.$route.path !== link) this.$router.push(link)
    }
  }
}
</script>
<style lang="scss" scoped type="text/scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 58px;
    z-index: 2009;
    @include left;
    box-shadow: $box-shadow;
    background: #CFCCC9 url('../../assets/images/texture.png');
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
          padding: 8px 16px;
          border-radius: 5px;
          text-decoration: none;
          color: $font-400;
          border: 2px solid transparent;
          &.active-link {
            background: rgb(167, 168, 189);
            color: $white;
          }
          &:hover {
            background: rgb(167, 168, 189);
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
