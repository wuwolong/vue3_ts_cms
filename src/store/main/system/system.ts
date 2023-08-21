import { IRootState } from './../../type'
import { ISystemState, IqueryInfoType } from './types'
import { Module } from 'vuex'

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      queryInfo: {}
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
    changeQueryInfo(state, payload) {
      state.queryInfo = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const result = await getPageListData(
        `/${payload.pageName}/list`,
        payload.queryInfo
      )
      // console.log(payload)
      const changePageName =
        (payload.pageName as string).charAt(0).toLocaleUpperCase() +
        (payload.pageName as string).slice(1)
      const { list, totalCount } = result.data
      commit('changeQueryInfo', payload.queryInfo)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataById(context, payload) {
      const { pageName, id } = payload
      const queryIfo = context.state.queryInfo
      await deletePageData(`/${pageName}/${id}`)
      context.dispatch('getPageListAction', { pageName, queryIfo })
    },
    async createPageDataAction(context, payload: IqueryInfoType) {
      const { pageName, createData } = payload
      console.log(pageName, createData)
      await createPageData(`/${pageName}`, createData)
      const queryIfo = context.state.queryInfo
      context.dispatch('getPageListAction', { pageName, queryIfo })
    },
    async editPageDataAction(context, payload: IqueryInfoType) {
      const { pageName, editData, id } = payload
      await editPageData(`/${pageName}/${id}`, editData)
      const queryIfo = context.state.queryInfo
      context.dispatch('getPageListAction', { pageName, queryIfo })
    }
  },
  getters: {
    pageListData(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return function (pageName: string) {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default systemModule
