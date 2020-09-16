<template>
  <footer class="footer">
    <p>由 dream breeze 设计开发 <span class="red-font">❤❤❤</span></p>
  </footer>
</template>
<script>
export default {
  name: 'footer-bar',
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped type="text/scss">
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  @include center;
  box-shadow: 0 -5px 10px 0 rgba(31, 45, 61, 0.1);
  background: $white;
}

.red-font {
  color: $red;
}
</style>
