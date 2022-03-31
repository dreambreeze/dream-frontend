<template>
  <a-result
    status="403"
    sub-title="Sorry, you are not authorized to access this page."
    title="403"
  >
    <template #extra>
      <a-button type="primary">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
