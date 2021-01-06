<template>
  <div class="d-container">
    <entity-sort @sort="getArticleList"></entity-sort>
    <a-list
      :data-source="articleList"
      :loading="loading"
      class="article-list"
      item-layout="vertical"
      size="large"
    >
      <a-list-item
        key="item.title"
        slot="renderItem"
        slot-scope="item"
        class="article-item"
      >
        <template v-for="action in item.actions" slot="actions">
          <span :key="action.type" @click="actionEvent(action,item)">
            <a-icon :type="action.type" style="margin-right: 8px;"/>
            {{ action.text }}
          </span>
        </template>
        <a-list-item-meta :description="item.description">
          <a slot="title" @click="linkToDetail(item)">{{ item.title }}</a>
          <a-avatar slot="avatar" :src="item.avatar"/>
        </a-list-item-meta>
        <p class="summary">{{ item.summary }}</p>
        <div class="markdown-body" @click="linkToDetail(item)" v-html="marked(item.content)"></div>
        <div slot="extra" class="img-wrap">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            @click="linkToDetail(item)"
          />
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import entitySort from '@/components/entity-sort/entity-sort'
import api from '@/utils/api'
import marked from 'marked'
import ruleMixin from '@/mixin/rules.mixin'

export default {
  name: 'article-list',
  mixins: [ruleMixin],
  components: {
    entitySort,
  },
  data() {
    return {
      loading: false,
      articleList: [],
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList(sort) {
      this.loading = true
      const params = {
        sortId: sort?.sortId || '',
        searchKey: '',
        pageNum: 1,
        pageSize: 20,
      }
      let res = await api.getArticleList(params)
      this.articleList = res.items.map(item => {
        item.actions = [
          {type: 'star-o', text: '156'},
          {type: 'like-o', text: '156'},
          {type: 'message', text: '2'},
          {type: 'delete', text: ''},
        ]
        return item
      })
      this.loading = false
    },
    deleteArticle(articleId) {
      this.$confirm({
        title: this.$t('do_you_want_to_delete_this_item'),
        cancelText: this.$t('cancel'),
        okText: this.$t('ok'),
        onOk() {
          api.deleteArticle(articleId).then(() => {
            this.successHandler()
            this.getArticleList()
          })
        }
      })
    },
    actionEvent(action, article) {
      if (action.type === 'delete') {
        this.deleteArticle(article.articleId)
      }
    },
    marked(content) {
      return marked(content)
    },
    linkToDetail(item) {
      this.$router.push({
        path: '/article/article-detail',
        query: {
          articleId: item.articleId,
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.article-list {
  min-height: 300px;

  ::v-deep .article-item {
    .ant-list-item-main {
      display: flex;
      flex-direction: column;
      align-content: space-between;

      .ant-list-item-meta {
        max-height: 32px;
      }

      .summary {
        @include ellipsis;
        font-size: 14px;
        font-style: italic;
        color: $font-200;
        padding: 0 0 12px 0;
      }

      .markdown-body {
        flex: 1;
        @include ellipsis2(2);
      }
    }

    .ant-list-item-extra {
      img {
        height: 180px;
        object-fit: cover;
        width: 280px;
      }
    }
  }
}
</style>
