<template>
  <div class="nav-header">
    <el-icon :size="30">
      <component
        :is="isFold ? 'right' : 'Back'"
        @click="handleFoldClick"
      ></component>
    </el-icon>
    <div class="content">
      <wl-breadcrumb :breadcrumbNames="breadcrumbNames" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import WlBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menu'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    userInfo,
    WlBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const route = useRoute()
    const store = useStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    const breadcrumbNames = pathMapBreadcrumbs(route.path, userMenus.value)
    let isFold = ref(false)
    function handleFoldClick() {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { isFold, handleFoldClick, breadcrumbNames }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
