<template>
  <div>
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '@/views/login/cpns/config/rules'
import type { FormRules, FormInstance } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'login-account',
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<FormInstance>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('loginModule/accountLoginAction', account)
        }
      })
    }
    // loginAction()
    const rules = reactive<FormRules>(accountRules)

    return { rules, account, formRef, loginAction }
  }
})
</script>

<style scoped></style>
