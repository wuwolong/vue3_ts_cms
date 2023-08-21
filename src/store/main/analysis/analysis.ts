import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor
} from '@/service/main/analysis/analysis'

import { Module } from 'vuex'
import { IRootState } from '@/store/type'
import { IAnalysisState } from './type'
const analysis: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, payload) {
      state.categoryGoodsCount = payload
    },
    changeCategoryGoodsFavor(state, payload) {
      state.categoryGoodsFavor = payload
    },
    changeCategoryGoodsSale(state, payload) {
      state.categoryGoodsSale = payload
    },
    changeAddressGoodsSale(state, payload) {
      state.addressGoodsSale = payload
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)
      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}
export default analysis
