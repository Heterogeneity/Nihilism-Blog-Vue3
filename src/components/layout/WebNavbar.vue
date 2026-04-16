<script setup lang="ts">

import AuthPopover from "@/components/common/AuthPopover.vue";
import Logo from "@/components/common/Logo.vue";
import {onMounted, onUnmounted, onUpdated, ref, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useLayoutStore} from "@/stores/layout.ts";

interface MenuItem {
  title: string;
  name: string;
}

const menuList: MenuItem[] = [
  {
    title: "首页",
    name: "/index"
  },
  {
    title: "搜索",
    name: "/search"
  },
  {
    title: "新闻",
    name: "/news"
  },
  {
    title: "友链",
    name: "/links"
  },
  {
    title: "关于",
    name: "/about"
  },
]

const isShow = ref<boolean>(false)
const pure = ref<boolean>(false)
const route = useRoute()
const scroll = () => {
  let top = document.documentElement.scrollTop
  isShow.value = top >= 700
}
const layout = useLayoutStore()
onUnmounted(() => {

})
watchEffect(() => {
  if (route.name !== "index" && route.name !== "article") {
    isShow.value = false
    pure.value = false
    window.removeEventListener("scroll", scroll)
  }

  if (layout.state.swiper && route.name === "index" || route.name === "article") {
    pure.value = true
    isShow.value = true
    window.addEventListener("scroll", scroll)
  } else {
    isShow.value = false
    pure.value = false
    window.removeEventListener("scroll", scroll)
  }
})
</script>

<template>
  <div :class="{'web-navbar':true,'show':isShow,'no-pure':pure}">
    <div class="container">
      <Logo/>
      <div class="web-menu">
        <el-menu active-text-color="var(--main-color)" mode="horizontal" :ellipsis="false" :router="true"
                 :default-active="route.path">
          <template v-for="item in menuList">
            <el-menu-item style="font-size: 1.5rem" :index="item.name">
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <AuthPopover/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.web-navbar {
  max-width: 1420px;
  margin: 0 auto -80px;
  padding: 10px 30px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px var(--main-color);
  display: flex;
  justify-content: center;
  z-index: 1000;
  background-color: var(--bc-color);
  --el-menu-text-color: var(--default-color);
  width: 100%;
  transition: all .8s ease;
  transform: translate(0, 0);

  &.no-pure {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    padding: 10px 30px;
    backdrop-filter: blur(20px);
    background-color: transparent;
  }

  &.show {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);

  }

  .container {
    display: flex;
    justify-content: space-between;
    max-width: 1480px;
    width: 100%;
    margin-top: 8px;

    .logo {
      height: 60px;
      width: 20%;
    }

    .web-menu {
      width: 60%;
      max-width: 650px;

      .el-menu {
        background-color: transparent;
        border-bottom: none;
        --el-menu-item-font-size: 20px;
      }

      .el-menu-item {
        border-bottom: none;
        background-color: transparent;
      }
    }
  }


}
</style>