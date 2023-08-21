<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="name in breadcrumbNames" :key="name">{{
        name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    breadcrumbNames: {
      type: Array
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
