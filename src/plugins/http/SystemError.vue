<template>
  <div>
    <h4 class="error-title">{{ message }}</h4>
    <div class="error-info mt-4" v-if="requestId || code">
      <strong>Request Id:</strong>
      {{ requestId }}
      <br />
      <strong>Code:</strong>
      {{ code }}
    </div>
    <s-button
      class="mt-4"
      v-if="requestId || code"
      size="sm"
      @click.native="copy"
      button-type="outline-primary"
      >Copy</s-button
    >
  </div>
</template>

<script>
export default {
  name: 'SystemError',
  props: {
    message: {
      type: String,
      default: '',
    },
    requestId: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
  },
  methods: {
    copy() {
      this.$copyText(`Request Id: ${this.requestId} Code: ${this.code}`).then(
        () => {
          this.$s_toast({
            type: 'success',
            message: 'Copy Success!',
            placement: 'top',
            closeTime: 5000,
          })
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.error-title {
  margin: 0;
}
.error-info {
  font-size: 14px;
  color: #888;
  background: #eee;
  border-radius: 3px;
  padding: 4px 8px;
  margin-bottom: 4px;
  margin-top: 8px;
}
</style>
