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
        @click="linkToDetail(item)"
      >
        <template v-for="action in item.actions" slot="actions">
          <span :key="action.type" class="article-action" @click.stop="actionEvent(action,item)">
            <a-icon :type="action.type" class="mr-4"/>
            {{ action.text }}
          </span>
        </template>
        <a-list-item-meta :description="item.description">
          <a slot="title" @click="linkToDetail(item)">{{ item.title }}</a>
          <a-avatar slot="avatar" :src="item.avatar"/>
        </a-list-item-meta>
        <p class="summary">{{ item.summary }}</p>
        <div slot="extra" class="img-wrap">
          <img
            :src="item.imgUrl"
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
import { marked } from 'marked'
import ruleMixin from '@/mixin/rules.mixin'
import storeMixin from '@/mixin/store.mixin'

export default {
  name: 'article-list',
  mixins: [ruleMixin, storeMixin],
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
        item.imgUrl = item.imgUrl || this.randomSkyImg
        item.avatar = item.avatar || this.defaultAvatar
        item.actions = [
          { type: 'star-o', text: item.starNum },
          { type: 'like-o', text: item.likeNum },
          { type: 'message', text: item.commentNum },
          { type: 'delete', text: '' },
        ]
        return item
      })
      this.loading = false
    },
    deleteArticle(articleId) {
      const _this = this
      this.$confirm({
        title: this.$t('do_you_want_to_delete_this_item'),
        cancelText: this.$t('cancel'),
        okText: this.$t('ok'),
        onOk() {
          api.deleteArticle(articleId).then(() => {
            _this.successHandler()
            _this.getArticleList()
          })
        },
      })
    },
    actionEvent(action, article) {
      if (action.type === 'delete') {
        this.deleteArticle(article.articleId)
      }
    },
    marked(content) {
      return marked.parse(content)
    },
    linkToDetail(item) {
      this.$router.push({
        path: '/article/article-detail',
        query: {
          articleId: item.articleId,
        },
      }).catch(e => {
        console.log(e)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.article-list {
  ::v-deep .article-item {
    @include betweenCenter;

    .ant-list-item-main {
      display: flex;
      flex-direction: column;
      align-content: space-between;
      flex: 1;
      width: 0;

      .ant-list-item-meta {
        max-height: 32px;
      }

      .summary {
        @include ellipsis2(3);
        font-size: 14px;
        color: $font-400;
        padding: 0 8px 12px;
        height: 110px;
      }

    }

    .article-action {
      &:hover {
        color: $font-400;
        cursor: pointer;
      }
    }

    .ant-list-item-extra {
      img {
        height: 200px;
        object-fit: cover;
        width: 280px;
      }
    }
  }
}
</style>
