<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @handleQueryClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @createUsersData="createUsersData"
      @updateUsersData="updateUsersData"
    ></page-content>

    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import wlForm from '@/base-ui/form'
import pageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import usePageSearch from '@/hooks/use-page-search'
import usePageModal from '@/hooks/use-page-modal'

import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    wlForm,
    pageModal
  },
  setup() {
    // const cns = getCurrentInstance()
    // cns?.appContext.config.globalProperties.$filters.formatTime()
    //搜索操作
    const [pageContentRef, handleQueryClick] = usePageSearch()
    //新建操作
    const [pageModalRef, createUsersData, updateUsersData, defaultInfo] =
      usePageModal(createCbFn, updateCbFn)

    function createCbFn() {
      const passwordItem = modalConfigRef.value.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = false
    }
    function updateCbFn() {
      const passwordItem = modalConfigRef.value.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = true
    }

    const modalConfigRef = computed(() => {
      const store = useStore()
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentItem?.options) {
        departmentItem.options = store.state.entireDepartment.map((item) => {
          return { label: item.name, value: item.id }
        })
      }
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (roleItem?.options) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { label: item.name, value: item.id }
        })
      }
      // console.log(roleItem?.options, departmentItem?.options)
      return modalConfig
    })
    return {
      searchFormConfig,
      contentTableConfig,
      handleQueryClick,
      pageContentRef,
      pageModalRef,
      modalConfig,
      createUsersData,
      updateUsersData,
      defaultInfo,
      modalConfigRef
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
