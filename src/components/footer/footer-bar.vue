<template>
  <footer class="footer">
    <p>由 dream breeze 设计开发 <span class="red-font">❤❤❤</span></p>
  </footer>
</template>
<script>
export default {
  name: 'footer-bar',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped type="text/scss">
  .footer {
    height: 60px;
    @include center;
    background: #2D2E36 url('../../assets/images/texture.png');
    color: $white;
  }
  .red-font {
    color: $red;
  }
</style>
