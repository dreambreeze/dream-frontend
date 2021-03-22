<template>
  <a-modal
    :title="$t('saying_list')"
    :visible="visible"
    :width="modalWidth.md"
    @cancel="close"
  >
    <a-table
      :columns="columns"
      :dataSource="sayings"
      :loading="loading"
      :pagination="pagination"
    >
      <template slot="action" slot-scope="text, record, index">
        <a-button
          :size="iconButtonSize"
          class="mr-8"
          icon="edit"
          shape="circle"
          type="dashed"
          @click="handleEdit(record, text, index)"
        ></a-button>
        <a-button
          :size="iconButtonSize"
          icon="delete"
          shape="circle"
          type="dashed"
          @click="handleDelete(record)"
        ></a-button>
      </template>
    </a-table>
    <saying-modal
      :isShow="isShowEditModal"
      :saying="saying"
      @close="isShowEditModal = false"
      @success="getSayingList"
    ></saying-modal>
    <template slot="footer">
      <a-button
        type="primary"
        @click="close"
      >{{ $t('ok') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import api from '@/utils/api'
import sayingModal from './saying-modal'
import { iconButtonSize, modalWidth } from "@/utils/enum";
import ruleMixin from '@/mixin/rules.mixin'

export default {
  name: "saying-list",
  mixins: [ruleMixin],
  components: { sayingModal },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      modalWidth,
      iconButtonSize,
      visible: false,
      isShowEditModal: false,
      columns: [
        {
          title: this.$t('author'),
          dataIndex: 'author',
          width: 100
        },
        {
          title: this.$t('content'),
          dataIndex: 'content',
          width: 500,
          ellipsis: true,
        },
        {
          title: this.$t('action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: false,
      pagination: false,
      sayings: [],
      saying: {}
    }
  },
  watch: {
    isShow(val) {
      if (val) this.getSayingList()
      this.visible = this.isShow
    },
  },
  methods: {
    close() {
      this.$emit('update:isShow', false)
      this.$emit('close')
    },
    getSayingList() {
      this.loading = true
      api.getSayingList().then(res => {
        this.sayings = res.map(item => {
          item.key = item.sayingId
          return item
        })
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit(record) {
      this.saying = record
      this.isShowEditModal = true
    },
    handleDelete(record) {
      api.deleteSaying(record.sayingId).then(() => {
        this.successHandler()
        this.getSayingList()
      })
    }
  },
}
</script>