<template>
  <div class="content">
    <wl-table
      :dataList="dataList"
      v-bind="contentTableConfig"
      :dataCount="dataCount"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="createUsersData"
          >新建用户</el-button
        >
      </template>
      <template #enable="{ enable }">
        <el-button plain size="small" :type="enable ? 'success' : 'danger'">{{
          enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="{ createAt }">
        <span>{{ $filters.formatTime(createAt) }}</span>
      </template>
      <template #updateAt="{ updateAt }">
        <span>{{ $filters.formatTime(updateAt) }}</span>
      </template>
      <template
        v-for="propsItem in otherPropList"
        :key="propsItem.prop"
        #[propsItem.slotName]="row"
      >
        <slot :name="propsItem.slotName" v-bind="row"></slot>
      </template>
      <template #handler="row">
        <div>
          <el-button size="small" v-if="isUpdate" @click="updateUsersData(row)"
            ><el-icon><Edit></Edit></el-icon> 编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            v-if="isDelete"
            @click="deletePageDataById(row)"
            ><el-icon><Delete></Delete></el-icon>删除</el-button
          >
        </div>
      </template>
    </wl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import wlTable from '@/base-ui/table'
import { useStore } from '@/store'
import usePremission from '@/hooks/use-premission'
export default defineComponent({
  components: { wlTable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ['createUsersData', 'updateUsersData'],
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({ pageCurrent: 1, pageSize: 10 })
    // 0.获取操作的权限
    const isCreate = usePremission(props.pageName!, 'create')
    const isUpdate = usePremission(props.pageName!, 'update')
    const isDelete = usePremission(props.pageName!, 'delete')
    const isQuery = usePremission(props.pageName!, 'query')
    const getData = (queryInfo: any = {}) => {
      // console.log(queryInfo)
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.pageCurrent - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getData()
    watch(pageInfo, () => {
      getData()
    })
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageCountData'](props.pageName)
    )
    const otherPropList: any[] =
      (props.contentTableConfig?.propList).filter((item: any) => {
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }) ?? []

    //删除操作
    function deletePageDataById(value: any) {
      store.dispatch('system/deletePageDataById', {
        pageName: props.pageName,
        id: value.id,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.pageCurrent - 1),
          size: pageInfo.value.pageSize
        }
      })
    }
    //新建用户操作
    function createUsersData() {
      emit('createUsersData')
    }
    //编辑操作
    function updateUsersData(value: any) {
      // console.log(value)
      emit('updateUsersData', value)
    }
    return {
      dataList,
      getData,
      dataCount,
      pageInfo,
      otherPropList,
      isCreate,
      isUpdate,
      isDelete,
      deletePageDataById,
      createUsersData,
      updateUsersData
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
