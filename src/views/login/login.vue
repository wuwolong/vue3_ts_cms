<template>
  <div class="login">
    <login-panal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import loginPanal from '@/views/login/cpns/login-panal.vue'
export default defineComponent({
  components: {
    loginPanal
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
