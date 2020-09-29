<template>
  <div class="entity-sort">
    <ul class="sort-list">
      <li class="sort-item">
        <a-button type="link"></a-button>
      </li>
    </ul>
  </div>
</template>

<script>
import {sortEnum} from '@/utils/enum'

export default {
  name: "entity-sort",
  props: {
    sortType: {
      type: Number,
      default: sortEnum.article
    },
  },
  data() {
    return {
      sortList: [],
    }
  },
  methods: {
    name() {

    }
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.entity-sort {
  .sort-list {
    .sort-item {

    }
  }
}
</style>