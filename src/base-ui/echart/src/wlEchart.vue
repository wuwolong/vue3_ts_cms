<template>
  <div class="wl-echart">
    <div ref="echartsRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watchEffect, withDefaults } from 'vue'
import useEcharts from '@/base-ui/echart/hooks/useEcharts'
const echartsRef = ref<HTMLElement>()
const props = withDefaults(
  defineProps<{ option: any; width?: string; height?: string }>(),
  { width: '100%', height: '600px' }
)
onMounted(() => {
  const { setOption } = useEcharts(echartsRef.value!)
  // console.log(setOption)
  watchEffect(() => {
    const { option } = props
    // 使用刚指定的配置项和数据显示图表。
    setOption(option)
  })
})
</script>

<style scoped></style>
