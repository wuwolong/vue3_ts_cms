<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="LOGO" class="img" />
      <span v-if="!isCollapse" class="title">VUE3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      :default-active="activeMenus"
      :collapse="isCollapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <!-- 一级菜单 -->
          <template #title>
            <el-icon>
              <component :is="getIconName(item.icon)"></component>
            </el-icon>
            <!-- <i :class="item.icon"></i> -->
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id">
            <!-- 二级菜单 -->
            <el-menu-item :index="subitem.id + ''" @click="push(subitem.url)">
              <template #title
                ><span>{{ subitem.name }}</span></template
              >
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { pathMapToMenu } from '@/utils/map-menu'
export default defineComponent({
  props: { isCollapse: { type: Boolean, default: false } },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = computed(() => store.state.loginModule.userMenus)
    function getIconName(iconStr: string): string {
      return iconStr.split('-').splice(2).join('-')
    }
    function push(url: string) {
      router.push({
        path: url
      })
    }
    const menu = pathMapToMenu(route.path, userMenus.value)

    const activeMenus = ref(menu?.id + '')
    return { userMenus, getIconName, push, activeMenus }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
