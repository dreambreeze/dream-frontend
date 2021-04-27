<template>
  <div class="d-container">
    <div class="flex-wrap">
      <div class="flex-item"></div>
      <div class="flex-item"></div>
      <div class="flex-item"></div>
      <div class="flex-item"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style>
.flex-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex-item {
  background: red;
  width: 30%;
  height: 100px;
  margin: 0 0 16px;
}
</style>