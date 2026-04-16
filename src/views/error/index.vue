<script setup lang="ts">
import router from "@/router";
import ChangeTheme from "@/components/layout/ChangeTheme.vue";
import WebNavbar from "@/components/layout/WebNavbar.vue";
import WebFooter from "@/components/layout/WebFooter.vue";

const goHome = () => {
  router.push({name:"index"})
}
</script>

<template>
  <div>
    <web-navbar/>
    <div class="notfound_view">
      <img src="/404.svg" alt="404">
      <div class="msg">页面找不到了！点击【返回首页】按钮回到主页！</div>
      <div class="btn">
        <button class="btn-item" @click="goHome">返回首页</button>
      </div>
    </div>
    <web-footer/>
  </div>

</template>

<style scoped lang="scss">
.notfound_view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bc-color);

  img {
    padding-top: 150px;
    width: 400px;
    -webkit-filter: drop-shadow(0 0 20px var(--main-color));
  }

  .btn {
    margin-top: 30px;
    margin-bottom: 70px;
    .btn-item {
      font-weight: bold;
      cursor: pointer;
      border-radius: 2rem;
      font-size: 1.5rem;
      color: var(--main-color);
      border: 2px solid var(--main-color);
      padding: 10px 30px;
      background-color: transparent;
      transition: all .5s ease;

      &:hover {
        box-shadow: 0 0 10px var(--main-color);
      }
    }
  }

  .msg {
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
  }
}
</style>