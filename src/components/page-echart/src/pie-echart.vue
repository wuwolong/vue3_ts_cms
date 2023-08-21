<template>
  <div>
    <wl-echart :option="option"></wl-echart>
  </div>
</template>

<script setup lang="ts">
import wlEchart from '@/base-ui/echart'
import { defineProps, withDefaults, computed } from 'vue'
import { IDataType } from '../type'
const props = withDefaults(defineProps<{ pieData?: IDataType[] }>(), {
  pieData: () => []
})
const option = computed(() => ({
  title: {
    text: '各商品销售数量情况',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
// setTimeout(() => {
//   console.log(props.pieData)
// }, 0)
</script>
<style scoped></style>
