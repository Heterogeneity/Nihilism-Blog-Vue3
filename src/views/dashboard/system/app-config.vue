<script setup lang="ts">
import router from "@/router";
import {useRoute} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()

interface MenuItem {
  title: string;
  name: string;
}

const menuList: MenuItem[] = [
  {
    title: "网站配置",
    name: "site-config",
  },
  {
    title: "系统配置",
    name: "system-config",
  },
  {
    title: "邮箱配置",
    name: "email-config",
  },
  {
    title: "QQ登录配置",
    name: "qq-config",
  },
  {

    title: "七牛云配置",
    name: "qiniu-config",
  },
  {
    title: "jwt配置",
    name: "jwt-config",
  },
  {
    title: "高德配置",
    name: "gaode-config",
  }
]

const changePath = (item: MenuItem) => {
  router.push(`/dashboard/system/app-config/${item.name}`)
}
onMounted(() => {
  changePath({
    title: "网站配置",
    name: "site-config",
  })
})
</script>

<template>
  <div class="site-main">
    <div class="site-header">
      <div :class="{'site-item':true,'select':route.path.includes(item.name)}" v-for="item in menuList" :key="item.name"
           @click="changePath(item)">
        <div>{{ item.title }}</div>
      </div>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.site-main {
  padding: 20px;

  .site-header {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    .select {
      background-color: var(--main-color);
      color: var(--select-text-color);
    }
  }


  .site-item {
    cursor: pointer;
    width: 100px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 2px;
    margin-right: 5px;
    font-weight: bold;
    border: 1px solid var(--main-color);
    transition: all 0.3s ease;
    color: var(--default-color);

    &:hover {
      box-shadow: 0 0 20px var(--main-color);
    }
  }
}
</style>