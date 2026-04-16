<script setup lang="ts">

import Logo from "@/components/common/Logo.vue";
import DashboardMenu from "@/components/dashboard/DashboardMenu.vue";
import AuthPopover from "@/components/common/AuthPopover.vue";
import Breadcrumb from "@/components/dashboard/Breadcrumb.vue";
import DashboardTag from "@/components/dashboard/DashboardTag.vue";
import ChangeTheme from "@/components/layout/ChangeTheme.vue";
import FixedMenu from "@/components/common/FixedMenu.vue";
import {onMounted} from "vue";
import {useLayoutStore} from "@/stores/layout.ts";

const layoutStore = useLayoutStore()
onMounted(() => {
  layoutStore.state.isSnowShow = false
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-left">
      <div class="dashboard-img">
        <Logo/>
      </div>
      <div class="dashboard-list">
        <dashboard-menu/>
      </div>
    </div>
    <div class="dashboard-right">
      <div class="right-header">
        <div class="right-header-top">
          <breadcrumb/>
          <auth-popover/>
        </div>
        <dashboard-tag/>
      </div>
      <div class="right-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: flex;
  max-width: 100vw;
  width: 100%;
  background-color: var(--bc-color);
  padding-bottom: 5px;

  .dashboard-left {
    box-shadow: 0 0 10px var(--main-color);
    border-radius: 20px;
    height: calc(100vh - 25px);
    margin: 10px 0 0 5px;
    width: 15%;

    .dashboard-list {
      overflow-y: auto;
      height: 87%;
      scrollbar-width: none;
      scroll-behavior: smooth; /* 平滑滚动 (适用于点击锚点或JS) */
    }

    .dashboard-img {
      margin: 10px;
      padding: 10px;
      border-radius: 20px;
      background-color: var(--bc-color);
      box-shadow: 0 0 10px var(--main-color);
    }
  }

  .dashboard-right {
    width: 85%;

    .right-header {
      margin: 10px 10px 0;
      border-radius: 20px;
      height: 120px;
      box-shadow: 0 0 10px var(--main-color);

      .right-header-top {
        margin: 0 auto;
        width: 95%;
        border-bottom: 2px solid var(--main-color);
        padding: 10px 5px 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .right-main {
      margin: 10px;
      border-radius: 20px;
      height: calc(100vh - 155px);
      box-shadow: 0 0 10px var(--main-color);
    }

  }
}
</style>