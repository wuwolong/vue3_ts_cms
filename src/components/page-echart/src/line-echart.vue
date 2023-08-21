<template>
  <div>
    <wl-echart :option="option"></wl-echart>
  </div>
</template>

<script setup lang="ts">
import wlEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { IDataType } from '../type'
const props = defineProps<{ name: string[]; value: any[] }>()
const option = computed(() => ({
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.name
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.value,
      type: 'line',
      areaStyle: {}
    }
  ]
}))
// setTimeout(() => {
//   console.log(props.pieData)
// }, 0)
</script>
<style scoped></style>
