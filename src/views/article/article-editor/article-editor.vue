<template>
  <a-row align="top" class="d-container" justify="center" type="flex">
    <a-col class="article-editor" flex="auto">
      <a-form-model
        ref="formModal"
        :model="modal"
        :rules="rules"
        layout="vertical"
      >
        <a-form-item class="inline-wrap">
          <a-form-model-item
            :label="$t('article_title')"
            class="inline-form-item"
            has-feedback
            prop="title"
            size="large"
          >
            <a-input
              v-model="modal.title"
              :placeholder="$t('article_title')"
              autocomplete="off"
            />
          </a-form-model-item>
          <a-form-model-item
            :label="$t('article_sort')"
            class="inline-form-item sort-form-item"
            has-feedback
            prop="sort"
            size="large"
          >
            <a-select
              v-model="modal.sort"
              :placeholder="$t('article_sort')"
              autocomplete="off"
              mode="multiple"
            >
              <a-select-option
                v-for="item in sortList"
                :key="item.sortId"
                :allowClear="true"
                :value="item.sortId"
              >
                {{ item.sortName }}
              </a-select-option>
            </a-select>
            <a-tooltip :title="$t('add_sort')" class="add-sort-btn">
              <a-button
                icon="plus"
                type="primary"
                @click.native="isShowSortModal = true"
              ></a-button>
            </a-tooltip>
          </a-form-model-item>
        </a-form-item>
        <a-form-model-item
          :label="$t('article_summary')"
          has-feedback
          prop="summary"
          size="large"
        >
          <a-input
            v-model="modal.summary"
            :placeholder="$t('article_summary')"
            autocomplete="off"
            type="textarea"
          />
        </a-form-model-item>
      </a-form-model>
      <a-row>
        <mavon-editor v-model="modal.content" :toolbars="toolbars"/>
      </a-row>
      <a-row class="article-footer">
        <a-button v-if="isShowDraft" @click.native="saveDraft">保存草稿</a-button>
        <a-button type="primary" @click.native="saveArticle">发布文章</a-button>
      </a-row>
    </a-col>
    <sort-modal :isShow="isShowSortModal" @close="isShowSortModal=false"></sort-modal>
  </a-row>
</template>

<script>
import api from '@/utils/api'
import ruleMixin from '@/mixin/rules.mixin'
import sortModal from '@/components/sort-modal/sort-modal'
import storeMixin from '@/mixin/store.mixin'
import _ from 'lodash'

export default {
  name: 'article-editor',
  mixins: [ruleMixin, storeMixin],
  components: {
    sortModal,
  },
  data() {
    return {
      modal: {
        articleId: null,
        content: '',
        title: '',
        sendIp: '',
        status: 1,
        summary: this.$t('writing_just_for_better_thinking'),
      },
      isShowDraft: false,
      articleId: this.$route.query.articleId,
      rules: {
        title: this.validRequire(this.$t('please_enter_article_title')),
        sort: this.validRequire(this.$t('please_select_article_sort')),
        summary: this.validRequire(this.$t('please_enter_article_summary')),
      },
      isShowSortModal: false,
      loading: false,
      toolbars: {
        bold: true,
        italic: false,
        header: false,
        underline: true,
        strikethrough: false,
        mark: true,
        superscript: false,
        subscript: false,
        quote: true,
        ol: true,
        ul: false,
        link: true,
        imagelink: false,
        code: true,
        table: false,
        subfield: false,
        fullscreen: true,
        readmodel: false,
        htmlcode: false,
        help: true
      }
    }
  },
  created() {
    this.getArticleDetail()
    this.getSortList()
  },
  methods: {
    saveDraft() {
      this.modal.status = 0
      this.saveArticle()
    },
    async getArticleDetail() {
      if (_.isEmpty(this.articleId)) return
      this.loading = true
      const article = await api.getArticleDetail(this.articleId)
      article.sort = article.sortList.map(item => item.sortId)
      this.modal = article
      this.loading = false
    },
    saveArticle() {
      const methods = this.modal.articleId ? 'updateArticle' : 'addArticle'
      api[methods](this.modal).then((res) => {
        this.successHandler()
        this.modal = res
        this.$router.push({
          path: '/article/article-detail',
          query: {
            articleId: res.articleId
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.inline-wrap {
  margin: 0 0;
}

.inline-form-item {
  display: inline-block;
  width: calc(40% - 56px);
  margin: 0 0;
}

.add-sort-btn {
  position: absolute;
  margin: 0 0 0 8px;
}

.inline-form-item:first-child {
  width: calc(60% - 16px);
  margin: 0 32px 0 0;
}

.article-editor {
  width: 100%;

  ::v-deep .markdown-body {
    min-height: calc(100vh - 382px);
    min-width: 100%;
  }

  .article-footer {
    margin: 24px 0 0;
    @include right;

    button {
      margin: 0 0 0 16px;
    }
  }
}
</style>
