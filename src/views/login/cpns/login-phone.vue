<template>
  <div>
    <el-form ref="formRef" :rules="phoneRule">
      <el-form-item label="手机号" prop="phone">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input></el-input
          ><el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { phoneRule } from './config/rules'
export default defineComponent({
  name: 'login-phone',
  setup() {
    return { phoneRule }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  justify-content: space-around;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
