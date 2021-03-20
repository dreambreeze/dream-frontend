<template>
  <a-modal
    v-model="visible"
    :title="title"
    @cancel="close"
    @close="close"
    @ok="submit"
  >
    <a-row class="mb-16">
      <a-input
        v-model="modal.author"
        :placeholder="$t('author')"
        autocomplete="off"
      />
    </a-row>
    <a-row>
      <mavon-editor v-model="modal.content" :subfield="false" :toolbars="toolbars"></mavon-editor>
    </a-row>
    <template #footer>
      <a-button @click.native="close">{{ $t('cancel') }}</a-button>
      <a-button :loading="loading" type="primary" @click.native="submit">
        {{ $t('submit') }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import api from "@/utils/api";
import _ from "lodash";

export default {
  name: "add-saying",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    saying: {
      type: Object,
      default: () => {
        return {
          author: '佚名',
          content: ''
        }
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      modal: {},
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
  computed: {
    isEdit() {
      return _.has(this.modal, 'sayingId')
    },
    title() {
      return this.isEdit ? this.$t('edit_saying') : this.$t('add_saying')
    },
  },
  watch: {
    isShow(newValue) {
      this.modal = _.cloneDeep(this.saying)
      this.visible = newValue
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async submit() {
      this.loading = true
      this.isEdit ? await api.updateSaying(this.modal) : await api.addSaying(this.modal)
      this.loading = false
      this.close()
      this.$emit('success')
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">

</style>