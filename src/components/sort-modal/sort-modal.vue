<template>
  <a-modal
    v-model="visible"
    :title="title"
    @cancel="close"
    @close="close"
    @ok="submit"
  >
    <a-form-model ref="form" :model="sort">
      <a-form-model-item
        ref="sortName"
        :rules="[{ required: true, message: $t('this_field_can_not_blank') }]"
        prop="sortName"
      >
        <a-input
          v-model="sort.sortName"
          :placeholder="$t('please_enter_sort_name')"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item prop="parentId">
        <a-select
          v-model="sort.parentId"
          :placeholder="$t('please_select_parent_sort')"
          autocomplete="off"
        >
          <a-select-option key="0" :label="$t('none')" :value="0"
          >{{ $t('none') }}
          </a-select-option>
          <a-select-option
            v-for="item in sortList"
            :key="item.sortId"
            :label="item.sortName"
            :value="item.sortId"
          >{{ item.sortName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <template #footer>
      <a-button @click.native="close">{{ $t('cancel') }}</a-button>
      <a-button :loading="loading" type="primary" @click.native="submit">
        {{ $t('submit') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import _ from 'lodash'
import {sortEnum} from '@/utils/enum'
import storeMixin from '@/mixin/store.mixin'
import api from '@/utils/api'

export default {
  name: 'sort-modal',
  mixins: [storeMixin],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    sortType: {
      type: Number,
      default: sortEnum.article,
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
      sort: {
        sortName: '',
        parentId: 0,
        sortType: this.sortType,
      },
    }
  },
  computed: {
    isEdit() {
      return _.has(this.sort, 'sortId')
    },
    title() {
      return this.isEdit ? this.$t('edit_sort') : this.$t('add_sort')
    },
  },
  watch: {
    isShow(newValue) {
      this.visible = newValue
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          this.isEdit ? await api.updateSort(this.sort) : await api.addSort(this.sort)
          this.loading = false
          this.close()
          await this.getSortList()
        }
      })
    },
  },
}
</script>

<style scoped></style>
