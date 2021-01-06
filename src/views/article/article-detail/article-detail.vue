<template>
  <div class="d-container">
    <div class="action-wrap">
      <ul class="action-list">
        <li @click="linkTo">
          <a-icon class="action-icon" theme="filled" type="edit"/>
        </li>
      </ul>
    </div>
    <a-spin :spinning="loading">
      <h2 class="article-title">
        {{ article.title }}
      </h2>
      <p class="summary">{{ article.summary }}</p>
      <div class="markdown-body" v-html="markedContent"></div>
    </a-spin>
  </div>
</template>

<script>
import api from '@/utils/api'
import marked from 'marked'
import _ from 'lodash'

export default {
  name: 'edit-blog',
  data() {
    return {
      articleId: this.$route.query.articleId,
      article: {},
      loading: false,
    }
  },
  computed: {
    markedContent() {
      return _.isEmpty(this.article.content) ? '' : marked(this.article.content)
    },
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    async getArticleDetail() {
      this.loading = true
      let article = await api.getArticleDetail(this.articleId)
      this.article = article
      this.loading = false
    },
    linkTo() {
      this.$router.push({
        path: '/article/article-editor',
        query: {
          articleId: this.articleId
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.article-title {
  text-align: center;
}

.summary {
  font-size: 14px;
  color: $font-200;
  padding: 0 0 8px 0;
  font-style: italic;
}

.action-wrap {
  position: fixed;
  left: 50vw;
  bottom: 60px;
  transform: translateX(440px);
  margin: 0;
  padding: 0;
  z-index: 1;

  .action-list {
    padding: 10px;

    li {
      @include center;
      background: $theme-primary;
      box-shadow: $box-shadow;
      border-radius: 15px;
      min-width: 30px;
      height: 30px;
      color: $white;
      cursor: pointer;
      transition: all .3s;

      .hover-show {
        display: none;
      }

      &:hover {
        .hover-show {
          display: block;
          margin: 0 0 0 5px;
        }
      }
    }

    .action-icon {
      font-size: 18px;
    }
  }
}
</style>
