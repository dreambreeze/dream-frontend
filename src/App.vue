<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="app-content">
      <sidebar v-if="showSiderbar"></sidebar>
      <router-view></router-view>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import headerBar from './components/header/header-bar'
import footerBar from './components/footer/footer-bar'
import sidebar from './components/sidebar/sidebar'
export default {
  name: 'app',
  components: {
    headerBar,
    footerBar,
    sidebar,
  },
  data() {
    return {
      showSiderbar: false,
    }
  },
}
</script>

<style lang="scss">
@import './assets/style/global.scss';
.app-content {
  @include left;
}
</style>
