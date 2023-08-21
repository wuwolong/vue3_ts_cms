import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'

import loginModule from './login/login'
import system from './main/system/system'
import analysis from './main/analysis/analysis'

import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 123,
      entireDepartment: [],
      entireRole: [],
      entireMenus: []
    }
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeEntireMenus(state, payload) {
      state.entireMenus = payload
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const {
        data: { list: department }
      } = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const {
        data: { list: role }
      } = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const {
        data: { list: menus }
      } = await getPageListData('menu/list', {})
      //保存数据
      commit('changeEntireDepartment', department)
      commit('changeEntireRole', role)
      commit('changeEntireMenus', menus)
    }
  },
  modules: { loginModule, system, analysis }
})
export function geLocalCache() {
  store.dispatch('loginModule/loadLocalCache')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
