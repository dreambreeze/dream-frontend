<template>
  <div class="entity-sort">
    <ul class="sort-list">
      <li v-for="(item, index) in sortList" :key="index" class="sort-item">
        <a-button
          :class="index === current ? 'active-sort' : ''"
          class="mr-8"
          type="link"
          @click.native="sort(item, index)"
        >
          {{ item.sortName }}
        </a-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { sortEnum } from '@/utils/enum'
import api from '@/utils/api'

export default {
  name: 'entity-sort',
  props: {
    type: {
      type: Number,
      default: sortEnum.article,
    },
  },
  data() {
    return {
      sortList: [
        {
          sortName: '全部',
          sortId: ''
        }
      ],
      current: 0,
    }
  },
  created() {
    this.getSortList()
  },
  methods: {
    sort(item, index) {
      this.current = index
      this.$emit('sort', item)
    },
    async getSortList() {
      let res = await api.getSortList({ type: this.type })
      this.sortList = [...this.sortList, ...res]
    },
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.entity-sort {
  .sort-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 0;

    .sort-item {
      margin: 8px 0;

      button {
        &.active-sort,
        &:hover {
          background: $background-200;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
