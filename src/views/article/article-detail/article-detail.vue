<template>
  <div class="d-article-container">

  </div>
</template>

<script>
import api from '@/utils/api'

export default {
  name: 'edit-blog',
  data() {
    return {
      articleId: this.$route.params.articleId,
      article: {},
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    async getArticleDetail() {
      let article = await api.getArticleDetail(this.articleId)
      this.article = article
    }
  },
}
</script>

<style scoped></style>
