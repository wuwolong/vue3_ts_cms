<template>
  <div class="page-search">
    <wl-form :="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级搜索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </wl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import wlForm from '@/base-ui/form/index'
import { IForm } from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: { type: Object as PropType<IForm>, require: true }
  },
  components: {
    wlForm
  },
  emits: ['handleQueryClick'],
  setup(props, { emit }) {
    const formDataOriginal: any = {}
    for (const key of props.searchFormConfig?.formItems ?? []) {
      formDataOriginal[key.field] = ''
    }
    const formData = ref({ ...formDataOriginal })
    function handleResetClick() {
      formData.value = { ...formDataOriginal }
      emit('handleQueryClick')
    }
    function handleQueryClick() {
      emit('handleQueryClick', formData.value)
    }
    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
