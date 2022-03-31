<template>
  <div id="app">
    <header-bar></header-bar>
    <div class="app-content" @scroll="handleScroll($event)">
      <sidebar v-if="showSideBar"></sidebar>
      <router-view></router-view>
      <saying></saying>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import headerBar from './components/header/header-bar'
import footerBar from './components/footer/footer-bar'
import sidebar from './components/sidebar/sidebar'
import storeMixin from './mixin/store.mixin'
import saying from '@/components/saying/saying'
import _ from 'lodash'

export default {
  name: 'app',
  components: {
    headerBar,
    footerBar,
    sidebar,
    saying,
  },
  mixins: [storeMixin],
  methods: {
    handleScroll: _.throttle(function () {
      //Todo 滚动隐藏header & footer
    }, 160),
  },
}
</script>

<style lang="scss">
@import "assets/style/var-variables.css";
@import './assets/style/global.scss';

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  background: $month-white;
  flex: 1;
  height: 0;
  overflow-y: auto;

  .v-note-wrapper {
    z-index: 1;
  }
}
</style>
