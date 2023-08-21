<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      v-bind="childrenProps"
      border
    >
      <el-table-column
        v-if="showSelectColumn"
        align="center"
        type="selection"
      />
      <el-table-column
        v-if="showIndexColumn"
        align="center"
        type="index"
        label="序号"
        width="80"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          header-align="center"
          align="center"
          v-bind="propItem"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <slot :name="propItem.slotName" v-bind="row">{{
              row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page?.pageCurrent"
          :page-size="page?.pageSize"
          :page-sizes="[1, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    dataList: {
      type: Array as PropType<any[]>,
      require: true
    },
    propList: {
      type: Array as PropType<any[]>,
      require: true
    },
    showSelectColumn: {
      type: Boolean,
      deflaut: false
    },
    showIndexColumn: {
      type: Boolean,
      deflaut: false
    },
    title: {
      type: String
      // default: '用户列表'
    },
    dataCount: {
      type: Number
    },
    page: {
      type: Object,
      require: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (pageCurrent: number) => {
      emit('update:page', { ...props.page, pageCurrent })
    }
    return { handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
    // float: right;
  }
}
</style>
