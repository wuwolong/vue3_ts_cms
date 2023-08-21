<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
    />
    <page-content
      @updateUsersData="updateUsersData"
      @createUsersData="createUsersData"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
    />
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      page-name="role"
      ><div class="menu-tree">
        <el-tree
          ref="treeRef"
          :data="userMenuList"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :default-checked-keys="checkKeys"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheck"
        /></div
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'

import pageContent from '@/components/page-content'
import pageSearch from '@/components/page-search'
import pageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'

//获取数据中被选中的id，并组成一个数组
import { menusMapCheckKeys } from '@/utils/map-menu'
export default defineComponent({
  name: 'role',
  components: { pageContent, pageSearch, pageModal },
  setup() {
    const [pageContentRef, handleQueryClick] = usePageSearch()
    const [pageModalRef, createUsersData, updateUsersData, defaultInfo] =
      usePageModal(undefined, editCallBackFn)

    const store = useStore()
    const userMenuList = computed(() => {
      return store.state.entireMenus
    })
    type Tree = {
      checkedNodes: any
      checkedKeys: any
      halfCheckedNodes: any
      halfCheckedKeys: any
    }
    const otherInfo = ref({})
    function handleCheck(data1: any, data2: Tree) {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    //数据回显逻辑
    function editCallBackFn(item: any) {
      const { menuList } = item
      checkKeys.value = [...menusMapCheckKeys(menuList)]
    }
    const checkKeys = ref<any[]>([])
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleQueryClick,
      pageModalRef,
      createUsersData,
      updateUsersData,
      defaultInfo,
      modalConfig,
      userMenuList,
      handleCheck,
      otherInfo,
      checkKeys
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 25px;
}
</style>
