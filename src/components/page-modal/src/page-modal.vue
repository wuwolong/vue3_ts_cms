<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建用户"
      width="30%"
      center
    >
      <wl-form v-bind="modalConfig" v-model="formData"></wl-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import wlForm from '@/base-ui/form'
import { useStore } from '@/store'

import { IqueryInfoType } from './type'
export default defineComponent({
  components: { wlForm },
  props: {
    modalConfig: { type: Object, require: true },
    defaultInfo: { type: Object, require: true, default: () => ({}) },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object
    }
  },
  setup(props) {
    const centerDialogVisible = ref<boolean>(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // console.log(props.defaultInfo === newValue)
        for (const item of props.modalConfig?.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    //编辑修改数据
    const store = useStore()
    function handleConfirmClick() {
      centerDialogVisible.value = false
      const keys = Object.keys(props.defaultInfo!)
      if (keys.length) {
        const querInfo: IqueryInfoType = {
          pageName: props.pageName!,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        }
        store.dispatch('system/editPageDataAction', querInfo)
      } else {
        const querInfo: IqueryInfoType = {
          pageName: props.pageName!,
          createData: { ...formData.value, ...props.otherInfo }
        }
        store.dispatch('system/createPageDataAction', querInfo)
      }
    }
    return { centerDialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped></style>
