<template>
  <div>
    <mavon-editor :toolbars="editorToolbars" v-model="blogInfo" />
  </div>
</template>

<script>
import storeMixin from '@/mixin/store.mixin'
export default {
  name: 'edit-blog',
  mixins: [storeMixin],
  data() {
    return {
      blogInfo: '',
    }
  },
}
</script>

<style scoped></style>
