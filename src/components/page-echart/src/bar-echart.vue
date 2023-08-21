<template>
  <div>
    <wl-echart :option="option"></wl-echart>
  </div>
</template>

<script setup lang="ts">
import wlEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
const props = defineProps<{ name: string[]; value: any[]; title: string }>()
const option = computed(() => ({
  title: [
    {
      text: props.title
    }
  ],
  polar: {
    radius: [30, '80%']
  },
  angleAxis: {
    max: Math.max(...props.value),
    startAngle: 75
  },
  radiusAxis: {
    type: 'category',
    data: props.name
  },
  tooltip: {},
  series: {
    type: 'bar',
    data: props.value,
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  }
}))
// setTimeout(() => {
//   console.log(props.pieData)
// }, 0)
</script>
<style scoped></style>
