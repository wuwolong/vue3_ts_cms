<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <wl-card
          ><pie-echart :pieData="categoryGoodsCount"></pie-echart
        ></wl-card>
      </el-col>
      <el-col :span="10"
        ><wl-card>
          <map-echart
            :mapData="addressGoodsSale"
            title="不同城市商品销量"
          ></map-echart></wl-card
      ></el-col>
      <el-col :span="7"
        ><wl-card
          ><rose-echart :roseData="categoryGoodsCount"></rose-echart
        ></wl-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12"
        ><wl-card title="分类商品的销量"
          ><line-echart :="categoryGoodsSale"></line-echart></wl-card
      ></el-col>
      <el-col :span="12">
        <wl-card title="分类商品的收藏"
          ><bar-echart
            :="categoryGoodsFavor"
            title="分类商品的收藏"
          ></bar-echart
        ></wl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  pieEchart,
  roseEchart,
  lineEchart,
  barEchart,
  mapEchart
} from '@/components/page-echart'
import wlCard from '@/base-ui/card'
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()
store.dispatch('analysis/getDashboardDataAction')

const categoryGoodsCount = computed(() => {
  return store.state.analysis.categoryGoodsCount.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})
// console.log(categoryGoodsCount.value)
const categoryGoodsFavor = computed(() => {
  const barData: { name: string[]; value: any[] } = { name: [], value: [] }
  barData.name = store.state.analysis.categoryGoodsFavor.map((item) => {
    return item.name
  })
  barData.value = store.state.analysis.categoryGoodsFavor.map((item) => {
    return item.goodsFavor
  })
  return barData
})
const categoryGoodsSale = computed(() => {
  const roseData: { name: string[]; value: any[] } = { name: [], value: [] }
  roseData.name = store.state.analysis.categoryGoodsSale.map((item) => {
    return item.name
  })
  roseData.value = store.state.analysis.categoryGoodsSale.map((item) => {
    return item.goodsCount
  })
  return roseData
})
const addressGoodsSale = computed(() => {
  return store.state.analysis.addressGoodsSale.map((item: any) => {
    return { name: item.address, value: item.count }
  })
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
