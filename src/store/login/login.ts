import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router/router'
import mapMenusToRoutes, { menusMapPermissions } from '@/utils/map-menu'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    },
    getUserInfo(state, payload) {
      state.userInfo = payload
    },
    getUserMenus(state, payload) {
      state.userMenus = payload
      const routes = mapMenusToRoutes(payload)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      state.permissions = menusMapPermissions(payload)
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload) {
      //1.登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult?.data
      commit('getToken', token)
      localCache.setCache('token', token)
      //

      dispatch('getInitialDataAction', null, { root: true })

      //2.获取用户信息逻辑
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('getUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('getUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      //4.跳转到首页
      router.push('/main')
    },
    loadLocalCache({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('getToken', token)
        // dispatch('getInitalDataAction', null, { root: true })
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('getUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('getUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
