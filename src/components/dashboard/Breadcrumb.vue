<script setup lang="ts">
import {type RouteLocation, type RouteLocationMatched, useRoute} from "vue-router";
import router from "@/router";
import {ElMessage} from "element-plus";

const route = useRoute()
const toPush = (item: RouteLocationMatched) => {
  if (item.components) {
    router.push(item.path)
  } else {
    ElMessage({
      message: "无此路由！",
      type: "warning",
      duration: 2000
    })
  }
}
</script>

<template>
  <div class="breadcrumb">
    <div class="breadcrumb-item" @click="toPush(item)" v-for="item in route.matched">
      <div v-if="item.components">
        {{ item.meta.title }} <span style="color:var(--main-color)">/</span>
      </div>
      <div v-else>
        {{ item.meta.title }} <span style="color:var(--main-color)">/</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  color: var(--default-color);
  font-weight: bold;
  display: flex;

  .breadcrumb-item {
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      color: var(--main-color);
    }
  }
}
</style>