<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="{ imgUrl }">
        <el-image
          style="width: 60px; height: 60px"
          :src="imgUrl"
          :preview-src-list="[imgUrl]"
          preview-teleported
        ></el-image> </template
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'goods',
  components: { pageContent },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
