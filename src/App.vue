<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="app-content">
      <sidebar v-if="showSideBar"></sidebar>
      <router-view></router-view>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import headerBar from './components/header/header-bar'
import footerBar from './components/footer/footer-bar'
import sidebar from './components/sidebar/sidebar'
import storeMixin from './mixin/store.mixin'

export default {
  name: 'app',
  components: {
    headerBar,
    footerBar,
    sidebar
  },
  mixins: [storeMixin],
}
</script>

<style lang="scss">
@import './assets/style/global.scss';

#app {
  position: relative;
  width: 100vw;
  min-height: 100vh;
}

.app-content {
  @include center;
  background: $month-white;
  min-height: calc(100vh - 118px);

  .v-note-wrapper {
    z-index: 1;
  }
}


</style>
