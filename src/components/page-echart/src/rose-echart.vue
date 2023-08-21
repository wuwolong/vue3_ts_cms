<template>
  <div>
    <wl-echart :option="option"></wl-echart>
  </div>
</template>

<script setup lang="ts">
import wlEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { IDataType } from '../type'
const props = defineProps<{ roseData?: IDataType[] }>()
const option = computed(() => ({
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.roseData
    }
  ]
}))
// setTimeout(() => {
//   console.log(props.pieData)
// }, 0)
</script>
<style scoped></style>
